# Microburbs Landing Page

Production-grade landing page for Microburbs, a street-level property intelligence platform for buyers agents and property investors in Australia.

## Features

- **Next.js 14** with App Router and TypeScript
- **Tailwind CSS** for styling with shadcn/ui components
- **Analytics & Experimentation**: PostHog integration with A/B testing
- **Lead Capture**: Form validation, spam protection, and CRM webhooks
- **SEO Optimized**: Metadata, OpenGraph, JSON-LD, sitemap
- **Accessibility**: WCAG 2.1 AA compliant, keyboard navigation
- **Performance**: Lighthouse score 90+, image optimization
- **Testing**: Vitest (unit) and Playwright (E2E)
- **Database**: SQLite with Prisma ORM
- **Error Tracking**: Sentry integration
- **Blog**: MDX-powered blog with static generation

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd microburbs-landing

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your values

# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Environment Variables

See [`.env.example`](.env.example) for all required variables:

- `NEXT_PUBLIC_APP_URL`: Your app URL (required)
- `DATABASE_URL`: Database connection string (required)
- `NEXT_PUBLIC_POSTHOG_KEY`: PostHog analytics key (optional)
- `RESEND_API_KEY`: Email service API key (optional)
- `CRM_WEBHOOK_URL`: Webhook for lead forwarding (optional)
- `NEXT_PUBLIC_SENTRY_DSN`: Sentry error tracking (optional)

## Available Scripts

```bash
# Development
npm run dev                 # Start dev server
npm run build              # Build for production
npm run start              # Start production server

# Testing
npm run test:unit          # Run unit tests
npm run test:e2e           # Run E2E tests
npm run test:e2e:ui        # Run E2E tests with UI

# Code Quality
npm run lint               # Run ESLint
npm run format             # Format with Prettier
npm run format:check       # Check formatting
npm run type-check         # TypeScript type checking

# Database
npm run db:generate        # Generate Prisma client
npm run db:push            # Push schema to database
npm run db:studio          # Open Prisma Studio
npm run db:migrate         # Run migrations

# Analysis
npm run analyze            # Bundle size analysis
```

## Project Structure

```
.
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   ├── legal/             # Legal pages
│   └── ...                # Other pages
├── components/            # React components
│   ├── ui/               # Base UI components (shadcn/ui)
│   └── ...               # Custom components
├── lib/                   # Utilities and libraries
│   ├── analytics.ts      # PostHog integration
│   ├── experiments.ts    # A/B testing
│   ├── env.ts            # Environment validation
│   ├── logger.ts         # Pino logging
│   ├── rate-limit.ts     # API rate limiting
│   ├── prisma.ts         # Database client
│   ├── validations.ts    # Zod schemas
│   └── utils.ts          # Common utilities
├── content/blog/          # MDX blog posts
├── tests/                 # Test files
│   ├── unit/             # Unit tests (Vitest)
│   └── e2e/              # E2E tests (Playwright)
├── docs/                  # Documentation
├── prisma/                # Database schema
└── public/                # Static assets
```

## A/B Testing

The site runs two experiments:

1. **Headline Test**: Two variants of the hero headline
2. **CTA Test**: Two variants of the CTA button text

Variants are assigned client-side and tracked via PostHog. See [`lib/experiments.ts`](lib/experiments.ts).

## Lead Capture Flow

1. User fills form → Client-side validation (Zod)
2. Submit to `/api/lead` → Server-side validation
3. Honeypot check → Rate limiting
4. Save to database (Prisma)
5. Forward to CRM webhook (optional)
6. Send confirmation email (optional)
7. Redirect to `/thank-you`

## Analytics Events

Tracked events:
- `page_view`
- `cta_click` (location, page, variant)
- `lead_form_view`
- `lead_form_submit`
- `lead_form_success` / `lead_form_error`
- `book_demo_click`
- `pricing_view`
- `experiment_exposure`

See [`docs/ANALYTICS.md`](docs/ANALYTICS.md) for details.

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Docker

```bash
# Build
docker build -t microburbs-landing .

# Run
docker run -p 3000:3000 --env-file .env microburbs-landing
```

### Manual

```bash
# Build
npm run build

# Start
npm run start
```

## Performance Targets

- Lighthouse Performance: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

## Accessibility

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators
- Color contrast (WCAG AA)
- Skip to content link
- Reduced motion support

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari (iOS 12+)
- Mobile Chrome (Android 8+)

## Documentation

- [`docs/DECISIONS.md`](docs/DECISIONS.md) - Architecture decisions and library justifications
- [`docs/ANALYTICS.md`](docs/ANALYTICS.md) - Analytics events and tracking
- [`docs/EXPERIMENTS.md`](docs/EXPERIMENTS.md) - A/B testing documentation

## Contributing

1. Create a feature branch
2. Make changes
3. Run tests: `npm run test:unit && npm run test:e2e`
4. Run linting: `npm run lint && npm run format:check`
5. Commit with conventional commits
6. Submit a pull request

## License

Proprietary - All rights reserved

## Support

For issues or questions:
- Email: support@microburbs.com
- GitHub Issues: [Repository Issues](https://github.com/microburbs/landing/issues)
