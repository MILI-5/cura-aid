// Basic analytics integration utility

/**
 * Track a page view or event (placeholder for Google Analytics, Plausible, etc.)
 * @param event - The event name or page path
 * @param data - Additional event data
 */
export function trackEvent(event: string, data?: Record<string, any>) {
  // Example: Google Analytics
  // window.gtag && window.gtag('event', event, data);

  // Example: Plausible
  // window.plausible && window.plausible(event, { props: data });

  // Placeholder: log to console
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event, data);
  }
} 