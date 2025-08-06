import React, { useState } from 'react';

interface YouTubeDownloaderProps {
  theme: 'light' | 'dark';
}

export function YouTubeDownloader({ theme }: YouTubeDownloaderProps) {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!youtubeUrl) {
      setDownloadStatus('Please enter a valid YouTube URL');
      return;
    }

    setIsDownloading(true);
    setDownloadStatus(null);

    try {
      // Note: This is a mock implementation
      // In a real app, you'd need a backend service to handle YouTube downloads
      // due to CORS and API limitations in the browser
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setDownloadStatus('Download completed! (This is a demo - no actual download occurred)');
    } catch (error) {
      setDownloadStatus('Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6 mt-6">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
        YouTube Video Downloader
      </h2>
      
      <form onSubmit={handleDownload} className="space-y-4">
        <div>
          <label htmlFor="youtube-url" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            YouTube Video URL
          </label>
          <input
            type="url"
            id="youtube-url"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-slate-700 dark:text-white"
            disabled={isDownloading}
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isDownloading}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
        >
          {isDownloading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Downloading...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Video
            </>
          )}
        </button>
      </form>

      {downloadStatus && (
        <div className={`mt-4 p-3 rounded-md text-sm ${
          downloadStatus.includes('completed') 
            ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
            : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
        }`}>
          {downloadStatus}
        </div>
      )}

      <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>Note:</strong> This is a demo implementation. Real YouTube downloading requires server-side processing and compliance with YouTube's Terms of Service.
        </p>
      </div>
    </div>
  );
}