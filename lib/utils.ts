import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with proper precedence.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string in a human-readable format.
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

/**
 * Sanitize user input to prevent XSS.
 * Basic implementation - use a library like DOMPurify for production.
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validate email format.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate Australian phone number format.
 */
export function isValidAustralianPhone(phone: string): boolean {
  // Remove spaces and common separators
  const cleaned = phone.replace(/[\s\-()]/g, '');

  // Check for valid Australian phone formats
  // Mobile: 04XX XXX XXX
  // Landline: (0X) XXXX XXXX
  // International: +61 X XXXX XXXX
  const mobileRegex = /^(04\d{8})$/;
  const landlineRegex = /^(0[2378]\d{8})$/;
  const internationalRegex = /^\+61[2-478]\d{8}$/;

  return (
    mobileRegex.test(cleaned) ||
    landlineRegex.test(cleaned) ||
    internationalRegex.test(cleaned)
  );
}

/**
 * Sleep for a given number of milliseconds.
 * Useful for rate limiting or testing.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Truncate text to a maximum length with ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Generate a random ID.
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

/**
 * Debounce a function.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Check if code is running on the server.
 */
export function isServer(): boolean {
  return typeof window === 'undefined';
}

/**
 * Check if code is running in development mode.
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}
