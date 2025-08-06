
import React, { useState, useCallback, useEffect } from 'react';
import { URLInputForm } from './components/URLInputForm';
import { OutputPanel } from './components/OutputPanel';
import { YouTubeDownloader } from './components/YouTubeDownloader';
import { cloneWebsite } from './services/geminiService';
import type { Tab } from './types';
import { GithubIcon, SunIcon, MoonIcon } from './components/icons/index';

type Theme = 'light' | 'dark';

export default function App(): React.ReactNode {
  const [url, setUrl] = useState<string>('https://tailwindcss.com/docs/installation');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [previewHtml, setPreviewHtml] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('preview');
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // On mount, sync React state with the theme set by the inline script in index.html
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    // This effect runs whenever the theme state changes
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      setError('Please enter a valid URL.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedCode('');
    setPreviewHtml('');
    setActiveTab('preview');

    try {
      const result = await cloneWebsite(url);
      if (result.tsxCode && result.previewHtml) {
        setGeneratedCode(result.tsxCode);
        setPreviewHtml(result.previewHtml);
      } else {
         throw new Error("The AI response was empty or invalid. Please try a different URL.");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      console.error(err);
      setError(`Failed to clone website. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      <header className="flex-shrink-0 bg-white/80 dark:bg-slate-900/70 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700/50 shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              AI Website Cloner
            </h1>
            <div className="flex items-center gap-2 sm:gap-4">
               <button
                onClick={toggleTheme}
                className="text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full p-2 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </button>
              <a
                href="https://github.com/google/prompt-gallery/tree/main/third_party/aistudio.google.com/WebsiteCloner"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="View on GitHub"
              >
                <GithubIcon className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24">
              <URLInputForm
                url={url}
                setUrl={setUrl}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
              <YouTubeDownloader theme={theme} />
            </div>
          </aside>
          
          <div className="lg:col-span-8 xl:col-span-9">
            <OutputPanel
              code={generatedCode}
              html={previewHtml}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isLoading={isLoading}
              error={error}
              theme={theme}
            />
          </div>
        </div>
      </main>
    </div>
  );
}