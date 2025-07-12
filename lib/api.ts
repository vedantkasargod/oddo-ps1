// Utility to get the API base URL depending on environment
export function getApiBaseUrl() {
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_API_BASE_URL || '';
  }
  // On client, use the current origin but force port 5000 for API
  return window.location.origin.replace(/:[0-9]+$/, ':5000');
} 