'use client';

import { track } from './analytics';

export interface Experiment {
  id: string;
  variants: readonly string[];
}

export const EXPERIMENTS = {
  HEADLINE: {
    id: 'headline_test',
    variants: ['control', 'variant_a'],
  },
  CTA: {
    id: 'cta_test',
    variants: ['control', 'variant_a'],
  },
} as const;

export const HEADLINE_VARIANTS = {
  control: 'See street-level risks before you buy',
  variant_a: 'Stop missing hidden risks on the wrong streets',
} as const;

export const CTA_VARIANTS = {
  control: 'Start free trial',
  variant_a: 'Get office access',
} as const;

/**
 * Get the variant for a given experiment.
 * Uses localStorage for consistency across sessions.
 * Falls back to random assignment if not stored.
 */
export function getVariant(experiment: Experiment): string {
  if (typeof window === 'undefined') {
    return experiment.variants[0]; // SSR fallback
  }

  const storageKey = `experiment_${experiment.id}`;
  const stored = localStorage.getItem(storageKey);

  if (stored && experiment.variants.includes(stored)) {
    return stored;
  }

  // Random assignment
  const variant =
    experiment.variants[Math.floor(Math.random() * experiment.variants.length)];

  localStorage.setItem(storageKey, variant);

  // Track exposure
  track('experiment_exposure', {
    experiment_id: experiment.id,
    variant,
  });

  return variant;
}

/**
 * Get the headline text based on A/B test variant.
 */
export function getHeadline(): string {
  const variant = getVariant(EXPERIMENTS.HEADLINE);
  return HEADLINE_VARIANTS[variant as keyof typeof HEADLINE_VARIANTS];
}

/**
 * Get the CTA text based on A/B test variant.
 */
export function getCTAText(): string {
  const variant = getVariant(EXPERIMENTS.CTA);
  return CTA_VARIANTS[variant as keyof typeof CTA_VARIANTS];
}

/**
 * Get all active experiment variants for the current user.
 */
export function getActiveVariants(): Record<string, string> {
  return {
    headline: getVariant(EXPERIMENTS.HEADLINE),
    cta: getVariant(EXPERIMENTS.CTA),
  };
}
