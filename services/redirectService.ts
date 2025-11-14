
import { RedirectResult } from '../types';

export const traceRedirects = async (url: string): Promise<RedirectResult> => {
  const startTime = Date.now();
  
  // Simulate network delay
  await new Promise(res => setTimeout(res, 1000 + Math.random() * 1000));

  try {
    // Basic URL validation
    if (!url || (!url.startsWith('http://') && !url.startsWith('https://'))) {
      throw new Error('Invalid URL. Please include http:// or https://');
    }
    const urlObj = new URL(url);

    const endTime = Date.now();
    const totalTime = endTime - startTime;

    // Example 1: a good redirect chain (common case)
    if (urlObj.hostname.includes('google.com') || urlObj.hostname.includes('youtube.com')) {
      const initialProtocolUrl = `http://${urlObj.hostname}${urlObj.pathname}`;
      const httpsUrl = `https://${urlObj.hostname}${urlObj.pathname}`;
      const wwwUrl = `https://www.${urlObj.hostname.replace('www.','')}${urlObj.pathname}`;

      return {
        steps: [
          { url: initialProtocolUrl, statusCode: 301, statusText: 'Moved Permanently', location: httpsUrl },
          { url: httpsUrl, statusCode: 302, statusText: 'Found', location: wwwUrl },
          { url: wwwUrl, statusCode: 200, statusText: 'OK' }
        ],
        finalUrl: wwwUrl,
        finalStatusCode: 200,
        totalTime,
      };
    }

    // Example 2: a redirect loop
    if (urlObj.hostname.includes('loop.com')) {
      return {
        steps: [
          { url: 'https://loop.com/page-a', statusCode: 302, statusText: 'Found', location: 'https://loop.com/page-b' },
          { url: 'https://loop.com/page-b', statusCode: 302, statusText: 'Found', location: 'https://loop.com/page-c' },
          { url: 'https://loop.com/page-c', statusCode: 301, statusText: 'Moved Permanently', location: 'https://loop.com/page-a' },
        ],
        error: 'Redirect loop detected. Tracing stopped.',
        finalUrl: 'https://loop.com/page-a',
        finalStatusCode: 301,
        totalTime,
      };
    }

    // Example 3: a 404 Not Found
     if (urlObj.hostname.includes('notfound.com') || urlObj.pathname.includes('broken-link')) {
      return {
        steps: [
          { url: url, statusCode: 404, statusText: 'Not Found' }
        ],
        finalUrl: url,
        finalStatusCode: 404,
        totalTime,
      };
    }
    
    // Example 4: a 500 Server Error
    if (urlObj.hostname.includes('server-error.com')) {
      return {
        steps: [
          { url: url, statusCode: 500, statusText: 'Internal Server Error' }
        ],
        finalUrl: url,
        finalStatusCode: 500,
        totalTime,
        error: 'The server returned a 500 error.'
      };
    }

    // Default case: no redirect, just a 200 OK
    return {
      steps: [{ url: url, statusCode: 200, statusText: 'OK' }],
      finalUrl: url,
      finalStatusCode: 200,
      totalTime,
    };

  } catch (e) {
    const endTime = Date.now();
    const error = e instanceof Error ? e.message : 'An unknown error occurred.';
    return {
      steps: [],
      finalUrl: url,
      finalStatusCode: 0,
      error: error,
      totalTime: endTime - startTime,
    };
  }
};
