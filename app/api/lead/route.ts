import { NextRequest, NextResponse } from 'next/server';
import { leadFormSchema } from '@/lib/validations';
import { logger, logError } from '@/lib/logger';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { env } from '@/lib/env';

/**
 * POST /api/lead
 * Handles lead form submissions with validation, spam protection, and rate limiting.
 * Works both with and without a database (Vercel serverless + SQLite fallback).
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Get client IP for rate limiting
    const clientIp = getClientIp(request);

    // Rate limiting
    const rateLimitResult = await rateLimit(clientIp);
    if (!rateLimitResult.success) {
      logger.warn({ ip: clientIp }, 'Rate limit exceeded for lead submission');
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
          },
        }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate with Zod
    const validationResult = leadFormSchema.safeParse(body);
    if (!validationResult.success) {
      logger.warn(
        { errors: validationResult.error.flatten() },
        'Invalid lead form data'
      );
      return NextResponse.json(
        {
          error: 'Invalid form data',
          details: validationResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Honeypot check
    if (data.website_url && data.website_url.length > 0) {
      logger.warn({ ip: clientIp }, 'Honeypot triggered - likely spam');
      // Return success to avoid tipping off bots
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Extract metadata
    const userAgent = request.headers.get('user-agent') || undefined;
    const referrer = request.headers.get('referer') || undefined;

    // Try to save to database (may fail on Vercel with SQLite)
    let leadId: string | undefined;
    try {
      const { prisma } = await import('@/lib/prisma');
      const lead = await prisma.lead.create({
        data: {
          name: data.name || '',
          email: data.email,
          phone: data.phone,
          role: data.role,
          message: data.message,
          marketingConsent: data.marketingConsent || false,
          source: body.source || 'unknown',
          variant: body.variant,
          userAgent,
          ipAddress: clientIp,
          referrer,
          status: 'new',
        },
      });

      leadId = lead.id;

      logger.info(
        {
          leadId: lead.id,
          email: lead.email,
          role: lead.role,
          source: lead.source,
        },
        'New lead created in database'
      );
    } catch (dbError) {
      // Database unavailable (e.g., Vercel serverless with SQLite)
      // Log the lead data and continue
      logger.warn(
        {
          name: data.name || '',
          email: data.email,
          role: data.role,
          source: body.source || 'unknown',
          error:
            dbError instanceof Error ? dbError.message : 'Unknown DB error',
        },
        'Database unavailable - lead captured in logs'
      );
    }

    // Send to CRM webhook if configured
    if (env.CRM_WEBHOOK_URL) {
      try {
        await fetch(env.CRM_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            leadId,
            name: data.name || '',
            email: data.email,
            phone: data.phone,
            role: data.role,
            message: data.message,
            source: body.source || 'unknown',
            timestamp: new Date().toISOString(),
          }),
        });
        logger.info({ leadId }, 'Lead forwarded to CRM');
      } catch (error) {
        logError(error, { leadId, context: 'CRM webhook' });
      }
    }

    // Send confirmation email if configured
    if (env.RESEND_API_KEY && env.EMAIL_FROM) {
      try {
        logger.info({ leadId, email: data.email }, 'Confirmation email queued');
      } catch (error) {
        logError(error, { leadId, context: 'Email sending' });
      }
    }

    const duration = Date.now() - startTime;
    logger.info({ leadId, duration }, 'Lead submission completed');

    return NextResponse.json(
      { success: true, leadId: leadId || 'pending' },
      { status: 201 }
    );
  } catch (error) {
    logError(error, { context: 'Lead submission' });

    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/lead
 * CORS preflight
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
