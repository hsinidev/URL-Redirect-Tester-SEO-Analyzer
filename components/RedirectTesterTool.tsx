
import React, { useState, useCallback } from 'react';
import { traceRedirects } from '../services/redirectService';
import { RedirectResult, RedirectStep } from '../types';

const getStatusColor = (status: number): string => {
  if (status >= 200 && status < 300) return 'text-green-400';
  if (status >= 300 && status < 400) {
      if (status === 301) return 'text-green-400'; // Permanent redirects are a good signal
      return 'text-yellow-400';
  }
  if (status >= 400) return 'text-red-400';
  return 'text-gray-400';
};

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center space-x-2">
    <div className="w-4 h-4 rounded-full animate-pulse bg-purple-400"></div>
    <div className="w-4 h-4 rounded-full animate-pulse bg-purple-400" style={{animationDelay: '0.2s'}}></div>
    <div className="w-4 h-4 rounded-full animate-pulse bg-purple-400" style={{animationDelay: '0.4s'}}></div>
    <span className="ml-2 text-gray-300">Analyzing redirect path...</span>
  </div>
);

const ResultItem: React.FC<{ step: RedirectStep; index: number }> = ({ step, index }) => (
    <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 font-mono text-sm">
      <div className="flex items-center mb-2">
        <span className="text-purple-400 font-bold mr-3 text-lg">{index + 1}</span>
        <span className={`font-bold text-lg ${getStatusColor(step.statusCode)}`}>
          {step.statusCode} {step.statusText}
        </span>
      </div>
      <div className="break-all text-gray-300">
        <span className="text-gray-500">From:</span> {step.url}
      </div>
      {step.location && (
        <div className="mt-1 break-all text-gray-300">
          <span className="text-gray-500">To:</span> {step.location}
        </div>
      )}
    </div>
);


const RedirectTesterTool: React.FC = () => {
  const [url, setUrl] = useState<string>('https://google.com');
  const [result, setResult] = useState<RedirectResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!url) {
      setError('Please enter a URL to test.');
      return;
    }
    setIsLoading(true);
    setResult(null);
    setError(null);
    
    const traceResult = await traceRedirects(url);

    if(traceResult.error) {
        setError(traceResult.error);
    }
    setResult(traceResult);
    setIsLoading(false);
  }, [url]);

  return (
    <section className="max-w-4xl mx-auto">
      <div className="p-[2px] rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-2xl shadow-purple-900/40">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              <label htmlFor="url-input" className="block text-lg font-medium text-gray-300 mb-2">Enter URL to Trace</label>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  id="url-input"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="e.g., https://example.com"
                  className="flex-grow bg-gray-800 border border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  Trace Redirects
                </button>
              </div>
            </form>

            <div className="mt-8 min-h-[100px]">
              {isLoading && <LoadingSpinner />}
              
              {error && !isLoading && (
                <div className="text-center p-4 rounded-lg bg-red-900/50 border border-red-500 text-red-300">
                  <strong>Error:</strong> {error}
                </div>
              )}

              {result && !isLoading && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Final URL</h3>
                        <p className="font-mono text-lg break-all text-purple-300">{result.finalUrl}</p>
                    </div>
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Final Status</h3>
                        <p className={`font-mono text-lg font-bold ${getStatusColor(result.finalStatusCode)}`}>{result.finalStatusCode}</p>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-gray-200 pt-4">Redirect Chain ({result.steps.length} hops)</h2>
                  <div className="space-y-3">
                    {result.steps.map((step, index) => (
                      <ResultItem key={index} step={step} index={index} />
                    ))}
                  </div>
                </div>
              )}
            </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>
    </section>
  );
};

export default RedirectTesterTool;
