import React from 'react';
import type { Tab } from '../types';

interface OutputPanelProps {
  code: string;
  html: string;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  isLoading: boolean;
  error: string | null;
  theme: 'light' | 'dark';
}

export function OutputPanel({ 
  code, 
  html, 
  activeTab, 
  setActiveTab, 
  isLoading, 
  error,
  theme 
}: OutputPanelProps) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-8 flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Analyzing website and generating code...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-8">
        <div className="text-center text-red-600 dark:text-red-400">
          <p className="font-medium mb-2">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!code && !html) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-8 flex items-center justify-center min-h-96">
        <div className="text-center text-slate-500 dark:text-slate-400">
          <p>Enter a URL to start cloning a website</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="border-b border-slate-200 dark:border-slate-700">
        <nav className="flex space-x-8 px-6">
          <button
            onClick={() => setActiveTab('preview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'preview'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'code'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
            }`}
          >
            Code
          </button>
        </nav>
      </div>
      
      <div className="p-6">
        {activeTab === 'preview' && html && (
          <div className="border border-slate-200 dark:border-slate-600 rounded-lg overflow-hidden">
            <iframe
              srcDoc={html}
              className="w-full h-96 bg-white"
              title="Website Preview"
            />
          </div>
        )}
        
        {activeTab === 'code' && code && (
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 overflow-auto max-h-96">
            <pre className="text-sm text-slate-800 dark:text-slate-200">
              <code>{code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}