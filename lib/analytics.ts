'use client';

import posthog from 'posthog-js';
import { env } from './env';

export type AnalyticsEvent =
  | 'page_view'
  | 'cta_click'
  | 'lead_form_view'
  | 'lead_form_submit'
  | 'lead_form_success'
  | 'lead_form_error'
  | 'book_demo_click'
  | 'pricing_view'
  | 'experiment_exposure'
  | 'consent_given'
  | 'consent_denied';

export interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

let isInitialized = false;

/**
 * Initialize PostHog analytics.
 * Safe to call multiple times - will only initialize once.
 */
export function initAnalytics() {
  if (
    typeof window === 'undefined' ||
    isInitialized ||
    !env.NEXT_PUBLIC_POSTHOG_KEY
  ) {
    return;
  }

  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    loaded: (posthog) => {
      if (env.NODE_ENV === 'development') {
        posthog.debug();
      }
    },
    capture_pageview: false, // We'll handle this manually
    capture_pageleave: true,
    autocapture: false, // Explicit tracking only
  });

  isInitialized = true;
}

/**
 * Track an analytics event.
 * Gracefully handles cases where PostHog is not initialized.
 */
export function track(event: AnalyticsEvent, properties?: EventProperties) {
  if (!isInitialized || !env.NEXT_PUBLIC_POSTHOG_KEY) {
    if (env.NODE_ENV === 'development') {
      console.log('[Analytics] Event:', event, properties);
    }
    return;
  }

  posthog.capture(event, properties);
}

/**
 * Track a page view.
 */
export function trackPageView(path: string, properties?: EventProperties) {
  track('page_view', { path, ...properties });
}

/**
 * Identify a user.
 */
export function identify(userId: string, traits?: Record<string, unknown>) {
  if (!isInitialized || !env.NEXT_PUBLIC_POSTHOG_KEY) {
    return;
  }

  posthog.identify(userId, traits);
}

/**
 * Reset user identification (e.g., on logout).
 */
export function reset() {
  if (!isInitialized || !env.NEXT_PUBLIC_POSTHOG_KEY) {
    return;
  }

  posthog.reset();
}

/**
 * Check if analytics is enabled (user has consented).
 */
export function isAnalyticsEnabled(): boolean {
  if (typeof window === 'undefined') return false;

  const consent = localStorage.getItem('analytics_consent');
  return consent === 'granted';
}

/**
 * Enable analytics tracking.
 */
export function enableAnalytics() {
  if (typeof window === 'undefined') return;

  localStorage.setItem('analytics_consent', 'granted');

  if (isInitialized) {
    posthog.opt_in_capturing();
  }

  track('consent_given');
}

/**
 * Disable analytics tracking.
 */
export function disableAnalytics() {
  if (typeof window === 'undefined') return;

  localStorage.setItem('analytics_consent', 'denied');

  if (isInitialized) {
    posthog.opt_out_capturing();
  }

  track('consent_denied');
}

/**
 * Get the PostHog instance for advanced usage.
 */
export function getPostHog() {
  return posthog;
}
