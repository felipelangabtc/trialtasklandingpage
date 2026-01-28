'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PocketHeatmap } from '@/components/pocket-heatmap';
import { RiskOverlayDemo } from '@/components/risk-overlay-demo';
import { TestimonialGrid, type Testimonial } from '@/components/testimonial-card';
import { FAQ, MICROBURBS_FAQ } from '@/components/faq';
import { PricingCard, PRICING_TIERS } from '@/components/pricing-card';
import { LeadForm } from '@/components/lead-form';
import { track } from '@/lib/analytics';
import { getHeadline, getCTAText } from '@/lib/experiments';
import {
  MapPin,
  Target,
  Zap,
  Shield,
  FileText,
  Layers,
  Clock,
  TrendingUp,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

const SOCIAL_PROOF_LOGOS = [
  'Ray White',
  'McGrath Estate Agents',
  'Belle Property',
  'LJ Hooker',
  'Harcourts',
];

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Microburbs transformed how we shortlist properties. What used to take me 3 hours now takes 20 minutes, and I'm finding hidden risks I would have missed.",
    author: 'Sarah Mitchell',
    role: 'Senior Buyers Agent',
    company: 'Mitchell Property Group',
  },
  {
    quote:
      'The pocket-level data is a game changer. I can show my clients exactly why one street is a better investment than another with visual proof.',
    author: 'David Chen',
    role: 'Property Investment Advisor',
  },
  {
    quote:
      "I've avoided three bad purchases in the last quarter alone by spotting flood risk and public housing proximity that wasn't obvious from standard reports.",
    author: 'Emma Richardson',
    role: 'Buyers Agent',
    company: 'Richardson Advisory',
  },
];

const FEATURES = [
  {
    icon: MapPin,
    title: 'Pocket Heatmaps',
    description:
      'See street-by-street risk variation within suburbs. Identify safe pockets vs. risky pockets instantly.',
  },
  {
    icon: Layers,
    title: 'Risk Overlays',
    description:
      'Toggle flood zones, public housing, noise levels, fire risk, and zoning all in one view.',
  },
  {
    icon: FileText,
    title: 'Client-Ready Reports',
    description:
      'Export branded PDF reports with maps and data your clients can understand.',
  },
  {
    icon: Zap,
    title: 'Faster Shortlisting',
    description:
      'Replace 10 different tools and hours of research with one platform.',
  },
];

const HOW_IT_WORKS_STEPS = [
  {
    number: '01',
    title: 'Search Your Pocket',
    description:
      'Enter an address or area. Microburbs shows you the pocket-level boundaries.',
  },
  {
    number: '02',
    title: 'Toggle Risk Layers',
    description:
      'Turn on flood, noise, public housing, fire, or zoning overlays to see cumulative risk.',
  },
  {
    number: '03',
    title: 'Compare & Shortlist',
    description:
      'See which streets are safer investments and add them to your shortlist.',
  },
  {
    number: '04',
    title: 'Export Reports',
    description:
      'Generate client-ready reports with your branding in seconds.',
  },
];

const BUYERS_AGENT_OUTCOMES = [
  'Save 5-10 hours per week on property research',
  'Present visual, data-backed recommendations to clients',
  'Avoid properties with hidden street-level risks',
  'Close deals faster with confident shortlists',
  'Build trust with transparent, visual analysis',
];

const INVESTOR_OUTCOMES = [
  'Identify undervalued pockets before the market catches on',
  'Avoid streets with hidden capital growth risks',
  'Make data-driven decisions instead of gut feel',
  'Track multiple markets simultaneously',
  'Spot emerging risks early (planning changes, infrastructure)',
];

export default function HomePage() {
  const [headline, setHeadline] = useState('');
  const [ctaText, setCtaText] = useState('');

  useEffect(() => {
    setHeadline(getHeadline());
    setCtaText(getCTAText());
  }, []);

  const handleCTAClick = (location: string) => {
    track('cta_click', { location, page: 'home' });
  };

  const handleDemoClick = () => {
    track('book_demo_click', { page: 'home' });
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/20 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6" variant="secondary">
                For Buyers Agents & Property Investors
              </Badge>

              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {headline || 'See street-level risks before you buy'}
              </h1>

              <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
                Hyper-local risk and pocket analysis that helps buyers agents and
                investors avoid the wrong streets before buying. Not just
                suburb-level averages.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button
                  size="xl"
                  onClick={() => handleCTAClick('hero')}
                  asChild
                >
                  <a href="#lead-form">
                    {ctaText || 'Start free trial'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  onClick={handleDemoClick}
                  asChild
                >
                  <a href="#contact">Book a Demo</a>
                </Button>
              </div>

              <p className="mt-6 text-sm text-muted-foreground">
                14-day free trial · No credit card required · Full access
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Strip */}
      <section className="border-y bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <p className="mb-6 text-center text-sm text-muted-foreground">
            Trusted by professionals at leading agencies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            {SOCIAL_PROOF_LOGOS.map((logo) => (
              <div
                key={logo}
                className="text-lg font-semibold text-muted-foreground"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
              Suburb averages hide street-level reality
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Two streets in the same suburb can have completely different risk
              profiles. Flood zones, public housing proximity, noise levels, and
              zoning changes don&apos;t show up in suburb-level data. By the time you
              notice, it&apos;s too late.
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="mb-2 text-3xl font-bold text-destructive">
                    10+
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Tools to check manually
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="mb-2 text-3xl font-bold text-destructive">
                    5-8 hrs
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Per property research
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="mb-2 text-3xl font-bold text-destructive">
                    Hidden
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Street-level risks
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/30 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              How Microburbs Works
            </h2>
            <p className="text-lg text-muted-foreground">
              From search to client-ready report in minutes
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="mb-4 text-4xl font-bold text-primary/20">
                      {step.number}
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Everything you need in one platform
            </h2>
            <p className="text-lg text-muted-foreground">
              Replace multiple tools with comprehensive street-level intelligence
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <feature.icon className="mb-4 h-10 w-10 text-primary" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo - Pocket Heatmap */}
      <section className="bg-muted/30 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              See pocket-level variation
            </h2>
            <p className="text-lg text-muted-foreground">
              Every block has a unique risk profile
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <PocketHeatmap />
          </div>
        </div>
      </section>

      {/* Interactive Demo - Risk Overlays */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Toggle risk layers
            </h2>
            <p className="text-lg text-muted-foreground">
              Combine multiple data sources for comprehensive analysis
            </p>
          </div>

          <RiskOverlayDemo />
        </div>
      </section>

      {/* Buyers Agents Outcomes */}
      <section className="bg-muted/30 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge className="mb-4" variant="secondary">
                For Buyers Agents
              </Badge>
              <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
                Close deals with confidence
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Provide clients with visual, data-backed recommendations that
                build trust and speed up decision-making.
              </p>

              <ul className="space-y-4">
                {BUYERS_AGENT_OUTCOMES.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                className="mt-8"
                onClick={() => handleCTAClick('buyers-agents-section')}
                asChild
              >
                <a href="/buyers-agents">
                  Learn more for buyers agents
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
                alt="Buyers agent working with client"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Investors Outcomes */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop"
                alt="Property investment analysis"
                className="rounded-2xl shadow-2xl"
              />
            </div>

            <div className="order-1 lg:order-2">
              <Badge className="mb-4" variant="secondary">
                For Investors
              </Badge>
              <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
                Find undervalued pockets
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Identify streets with strong fundamentals that the market hasn't
                priced in yet. Make data-driven decisions, not guesses.
              </p>

              <ul className="space-y-4">
                {INVESTOR_OUTCOMES.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <TrendingUp className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                className="mt-8"
                onClick={() => handleCTAClick('investors-section')}
                asChild
              >
                <a href="/investors">
                  Learn more for investors
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/30 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Trusted by professionals
            </h2>
            <p className="text-lg text-muted-foreground">
              See what buyers agents and investors are saying
            </p>
          </div>

          <TestimonialGrid testimonials={TESTIMONIALS} />
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose the plan that fits your workflow
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {PRICING_TIERS.map((tier) => (
              <PricingCard
                key={tier.name}
                tier={tier}
                onClick={() => {
                  track('pricing_view', { tier: tier.name });
                  handleCTAClick(`pricing-${tier.name.toLowerCase()}`);
                }}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" asChild>
              <a href="/pricing">View detailed pricing</a>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/30 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                Frequently asked questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to know about Microburbs
              </p>
            </div>

            <FAQ items={MICROBURBS_FAQ} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-12 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Start seeing street-level risks today
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join buyers agents and investors who are making smarter property
              decisions with Microburbs.
            </p>

            <div id="lead-form" className="mx-auto max-w-lg">
              <LeadForm source="home" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
