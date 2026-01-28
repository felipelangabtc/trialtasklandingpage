# Setup Guide

Complete setup instructions for running the Microburbs landing page locally and deploying to production.

## Prerequisites

- **Node.js** 18.0.0 or higher ([Download](https://nodejs.org/))
- **npm** 9.0.0 or higher (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

Optional:
- **Docker** for containerized deployment ([Download](https://www.docker.com/))
- **Make** for convenience commands (pre-installed on macOS/Linux, [Windows](http://gnuwin32.sourceforge.net/packages/make.htm))

## Local Development Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd microburbs-landing
```

### 2. Install Dependencies

```bash
npm install
```

This will install all dependencies and set up Husky pre-commit hooks.

### 3. Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
# Required
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL="file:./dev.db"

# Optional (can be added later)
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
RESEND_API_KEY=your_resend_key
CRM_WEBHOOK_URL=https://your-crm-webhook.com
```

**Note**: The app will run without optional keys using safe fallbacks.

### 4. Set Up Database

```bash
npm run db:generate  # Generate Prisma client
npm run db:push      # Create database schema
```

This creates a SQLite database at `prisma/dev.db`.

### 5. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

The server will hot-reload as you make changes.

## Verify Setup

1. **Home page loads**: Visit http://localhost:3000
2. **Navigation works**: Click links in header
3. **Form validation works**: Try submitting the lead form with invalid data
4. **Analytics logs to console**: Open browser DevTools → Console → Look for [Analytics] logs
5. **Database works**: Fill and submit the lead form, then run:
   ```bash
   npm run db:studio
   ```
   Check the `Lead` table for your submission.

## Running Tests

### Unit Tests (Vitest)

```bash
npm run test:unit
```

### E2E Tests (Playwright)

First time only:
```bash
npx playwright install
```

Run tests:
```bash
npm run test:e2e
```

Run with UI:
```bash
npm run test:e2e:ui
```

## Code Quality Checks

```bash
npm run lint          # ESLint
npm run format:check  # Prettier
npm run type-check    # TypeScript
```

Auto-fix issues:
```bash
npm run format        # Format all files
```

## Database Management

```bash
npm run db:studio     # Open Prisma Studio (GUI)
npm run db:generate   # Regenerate Prisma client
npm run db:push       # Push schema changes
npm run db:migrate    # Create migration (production)
```

## Building for Production

```bash
npm run build
npm run start
```

This creates an optimized production build in `.next/`.

## Docker Setup

### Option 1: Docker Compose (Recommended)

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Option 2: Docker Build

```bash
# Build image
docker build -t microburbs-landing .

# Run container
docker run -p 3000:3000 --env-file .env microburbs-landing
```

## Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Set environment variables in Vercel dashboard under Settings → Environment Variables

5. Add production domain in Vercel dashboard

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- **Netlify**: https://www.netlify.com/
- **Railway**: https://railway.app/
- **Fly.io**: https://fly.io/
- **AWS Amplify**: https://aws.amazon.com/amplify/
- **Self-hosted**: Use Docker or PM2

## Production Checklist

Before deploying to production:

- [ ] Set `NODE_ENV=production`
- [ ] Configure all environment variables
- [ ] Set up PostHog or analytics platform
- [ ] Configure Sentry for error tracking
- [ ] Set up email service (Resend/SendGrid)
- [ ] Configure CRM webhook for lead forwarding
- [ ] Test lead form end-to-end
- [ ] Run production build locally: `npm run build && npm start`
- [ ] Check Lighthouse score (target: 90+)
- [ ] Test on mobile devices
- [ ] Verify all links work
- [ ] Test dark mode
- [ ] Review legal pages (privacy/terms)
- [ ] Set up monitoring and alerts
- [ ] Configure database backups (if using SQLite in production)
- [ ] Set up CDN for static assets (optional)

## Database Migration (SQLite → Postgres)

When you're ready to scale:

1. Set up Postgres database (e.g., on Supabase, Railway, or Neon)

2. Update `DATABASE_URL` in `.env`:
   ```
   DATABASE_URL="postgresql://user:pass@host:5432/dbname"
   ```

3. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"  // Changed from "sqlite"
     url      = env("DATABASE_URL")
   }
   ```

4. Run migration:
   ```bash
   npm run db:migrate
   ```

## Troubleshooting

### Port 3000 already in use
```bash
# Kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Prisma client errors
```bash
npm run db:generate
```

### Build errors
```bash
rm -rf .next node_modules
npm install
npm run build
```

### TypeScript errors
```bash
npm run type-check
```

### Test failures
```bash
# Clear cache
rm -rf node_modules/.cache

# Reinstall Playwright
npx playwright install --force
```

## Getting Help

- **Documentation**: See [`/docs`](./docs) folder
- **Issues**: GitHub Issues (if repository is public)
- **Email**: support@microburbs.com

## What to Demo

For trial presentations, showcase:

1. **Homepage**: Full landing experience with all sections
2. **Interactive demos**:
   - Pocket heatmap visualization
   - Risk overlay toggles
3. **Lead form**: Fill out and submit (check `/thank-you` page)
4. **Responsive design**: Open DevTools → Toggle device toolbar → Test mobile view
5. **Dark mode**: Click theme toggle in header
6. **A/B testing**: Clear `localStorage` and reload to see different variants
7. **Analytics**: Open browser console → See event tracking logs
8. **Performance**: Run Lighthouse audit (DevTools → Lighthouse)
9. **Accessibility**: Navigate with keyboard (Tab, Enter, Escape)
10. **Blog**: Visit `/blog` and open a post
11. **Database**: Open Prisma Studio (`npm run db:studio`) to show lead storage

## Next Steps

After setup:

1. Review [`docs/DECISIONS.md`](docs/DECISIONS.md) for architecture understanding
2. Read [`docs/ANALYTICS.md`](docs/ANALYTICS.md) for analytics setup
3. Check [`docs/EXPERIMENTS.md`](docs/EXPERIMENTS.md) for A/B testing
4. Customize content in components and pages
5. Replace placeholder images with real assets
6. Set up production services (PostHog, Sentry, Resend)
7. Configure CRM integration
8. Launch! 🚀
