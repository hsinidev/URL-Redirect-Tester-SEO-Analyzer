
export interface RedirectStep {
  url: string;
  statusCode: number;
  statusText: string;
  location?: string;
}

export interface RedirectResult {
  steps: RedirectStep[];
  finalUrl: string;
  finalStatusCode: number;
  error?: string;
  totalTime: number;
}
