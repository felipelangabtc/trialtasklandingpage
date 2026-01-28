import { z } from 'zod';

const envSchema = z.object({
  // App
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url(),

  // Database
  DATABASE_URL: z.string().min(1),

  // Analytics
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z
    .string()
    .url()
    .optional()
    .or(z.literal('').transform(() => undefined)),

  // Error Tracking
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),
  SENTRY_ORG: z.string().optional(),
  SENTRY_PROJECT: z.string().optional(),

  // Email
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z
    .string()
    .email()
    .optional()
    .or(z.literal('').transform(() => undefined)),

  // CRM
  CRM_WEBHOOK_URL: z
    .string()
    .url()
    .optional()
    .or(z.literal('').transform(() => undefined)),

  // Rate Limiting
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(5),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000),

  // Security
  HONEYPOT_FIELD_NAME: z.string().default('website_url'),

  // GTM
  NEXT_PUBLIC_GTM_ID: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

/**
 * Validates and parses environment variables.
 * Throws if validation fails in production.
 * Logs warnings in development.
 */
function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;

    if (process.env.NODE_ENV === 'production') {
      console.error('❌ Invalid environment variables:', errors);
      throw new Error('Invalid environment variables');
    } else {
      console.warn('⚠️  Invalid environment variables:', errors);
      // Return a safe default in development
      return {
        NODE_ENV: 'development',
        NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
        DATABASE_URL: 'file:./dev.db',
        RATE_LIMIT_MAX_REQUESTS: 5,
        RATE_LIMIT_WINDOW_MS: 60000,
        HONEYPOT_FIELD_NAME: 'website_url',
      } as Env;
    }
  }

  return parsed.data;
}

export const env = validateEnv();
