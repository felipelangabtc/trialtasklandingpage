# Analytics Documentation

This document describes the analytics implementation, tracked events, and how to use the data.

## Analytics Stack

- **Primary**: PostHog (self-hostable, privacy-friendly)
- **Fallback**: Can integrate Google Tag Manager via `NEXT_PUBLIC_GTM_ID`

## Event Tracking

### Core Events

#### page_view
Triggered automatically on route changes.

```typescript
{
  event: 'page_view',
  properties: {
    path: string,         // e.g., "/pricing"
    referrer?: string,
    ...experimentVariants
  }
}
```

#### cta_click
Triggered when any CTA button is clicked.

```typescript
{
  event: 'cta_click',
  properties: {
    location: string,     // e.g., "hero", "pricing-section"
    page: string,         // e.g., "/", "/buyers-agents"
    variant?: string,     // A/B test variant if applicable
  }
}
```

**Locations tracked**:
- `hero` - Hero section CTA
- `header` - Header CTA
- `buyers-agents-section` - Buyers agents section
- `investors-section` - Investors section
- `pricing-{tier}` - Pricing card (tier = solo/pro/office)

#### lead_form_view
Triggered when lead form scrolls into viewport.

```typescript
{
  event: 'lead_form_view',
  properties: {
    source: string,       // Page where form is viewed
  }
}
```

#### lead_form_submit
Triggered when user submits the form (before validation).

```typescript
{
  event: 'lead_form_submit',
  properties: {
    source: string,
    role: string,         // buyers_agent | investor | other
    ...experimentVariants
  }
}
```

#### lead_form_success
Triggered after successful form submission and save to database.

```typescript
{
  event: 'lead_form_success',
  properties: {
    source: string,
    role: string,
  }
}
```

#### lead_form_error
Triggered if form submission fails (validation or server error).

```typescript
{
  event: 'lead_form_error',
  properties: {
    source: string,
    error: string,        // Error message
  }
}
```

#### book_demo_click
Triggered when user clicks "Book a Demo" button.

```typescript
{
  event: 'book_demo_click',
  properties: {
    page: string,
  }
}
```

#### pricing_view
Triggered when user interacts with pricing cards.

```typescript
{
  event: 'pricing_view',
  properties: {
    tier: string,         // "Solo" | "Pro" | "Office"
  }
}
```

#### experiment_exposure
Triggered when a user is assigned an A/B test variant.

```typescript
{
  event: 'experiment_exposure',
  properties: {
    experiment_id: string,  // e.g., "headline_test"
    variant: string,        // e.g., "control" | "variant_a"
  }
}
```

#### consent_given / consent_denied
Triggered when user accepts or rejects cookie consent.

```typescript
{
  event: 'consent_given' | 'consent_denied',
  properties: {}
}
```

## Conversion Funnel

Track the full conversion funnel:

1. `page_view` (landing page)
2. `cta_click` (user clicks CTA)
3. `lead_form_view` (form scrolled into view)
4. `lead_form_submit` (form submitted)
5. `lead_form_success` (lead saved)
6. `page_view` (/thank-you)

## User Identification

When a lead is captured, we identify the user:

```typescript
identify(leadId, {
  email: string,
  name: string,
  role: string,
  source: string,
});
```

This allows tracking their journey post-signup.

## Privacy & Consent

Users can opt-in or opt-out of analytics via the cookie consent banner.

**Consent states**:
- `granted` - Full tracking enabled
- `denied` - No tracking (PostHog calls disabled)

Consent state stored in `localStorage` as `analytics_consent`.

## How to Add New Events

1. Add event name to `AnalyticsEvent` type in `lib/analytics.ts`:

```typescript
export type AnalyticsEvent =
  | 'page_view'
  | 'your_new_event'
  // ...
```

2. Track the event:

```typescript
import { track } from '@/lib/analytics';

track('your_new_event', {
  property1: 'value',
  property2: 123,
});
```

3. Document the event in this file.

## Event Properties Best Practices

- **Be specific**: Use descriptive location names (e.g., `pricing-card-pro` not `button-1`)
- **Be consistent**: Use same property names across events
- **Be minimal**: Only track properties you'll use for analysis
- **Be privacy-conscious**: Never track PII without consent

## Debugging Analytics

### Development
In development, PostHog is in debug mode and logs all events to console.

### Check if tracking works:
```javascript
// In browser console
localStorage.getItem('analytics_consent')  // Should be "granted"
```

### View events in PostHog:
1. Go to PostHog dashboard
2. Click "Events" in sidebar
3. Filter by event name or user

## Common Queries

### Conversion Rate
```
(lead_form_success count) / (page_view count where page = "/")
```

### CTA Click-Through Rate
```
(cta_click count) / (page_view count)
```

### Form Abandonment Rate
```
(lead_form_view count - lead_form_submit count) / (lead_form_view count)
```

### A/B Test Winner
Compare conversion rates by variant:
```
lead_form_success where variant = "control"
lead_form_success where variant = "variant_a"
```

## Data Retention

PostHog retains data for:
- **Events**: Unlimited (self-hosted)
- **Session recordings**: 90 days
- **User properties**: Unlimited

## Export & Integration

### Export Data
PostHog data can be exported via:
- API
- CSV download
- BigQuery (enterprise)

### Webhook to CRM
Lead data is forwarded to CRM via webhook (see `CRM_WEBHOOK_URL` in env vars).

## Monitoring

Check analytics health:
- PostHog dashboard: Verify events are flowing
- Sentry: Check for tracking errors
- Health check endpoint: `/api/health`

## Compliance

- **GDPR**: Users can opt-out via cookie banner
- **CCPA**: Do Not Track honored
- **Australian Privacy Act**: Compliant (no PII stored without consent)
