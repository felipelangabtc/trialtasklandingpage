import pino from 'pino';
import { env } from './env';

/**
 * Structured logger using pino.
 * Configured for development and production environments.
 */
export const logger = pino({
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport:
    env.NODE_ENV === 'development'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        }
      : undefined,
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
  base: {
    env: env.NODE_ENV,
  },
});

/**
 * Create a child logger with additional context
 */
export function createLogger(context: Record<string, unknown>) {
  return logger.child(context);
}

/**
 * Log an error with full stack trace and context
 */
export function logError(
  error: Error | unknown,
  context?: Record<string, unknown>
) {
  if (error instanceof Error) {
    logger.error(
      {
        ...context,
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
      },
      error.message
    );
  } else {
    logger.error(
      {
        ...context,
        error,
      },
      'Unknown error occurred'
    );
  }
}
