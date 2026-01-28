import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

/**
 * GET /api/health
 * Health check endpoint for monitoring and deployment verification.
 */
export async function GET() {
  const checks: Record<string, boolean> = {
    server: true,
    database: false,
  };

  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    checks.database = true;
  } catch (error) {
    logger.error({ error }, 'Database health check failed');
  }

  const isHealthy = Object.values(checks).every((check) => check === true);
  const status = isHealthy ? 200 : 503;

  return NextResponse.json(
    {
      status: isHealthy ? 'healthy' : 'degraded',
      checks,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}
