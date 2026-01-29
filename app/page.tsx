'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PocketHeatmap } from '@/components/pocket-heatmap';
import { RiskOverlayDemo } from '@/components/risk-overlay-demo';
import { PropertiesForSaleMap } from '@/components/properties-for-sale-map';
import {
  TestimonialGrid,
  type Testimonial,
} from '@/components/testimonial-card';
import { FAQ, MICROBURBS_FAQ } from '@/components/faq';
import { PricingCard, PRICING_TIERS } from '@/components/pricing-card';
import { LeadForm } from '@/components/lead-form';
import { track } from '@/lib/analytics';
import { getHeadline, getCTAText } from '@/lib/experiments';
import {
  MapPin,
  Zap,
  FileText,
  Layers,
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
      "That big red tells me yeah, don't touch it... within seconds, I can do a screenshot and send it to the client. It's a game-changer.",
    author: 'Adam Cooper',
    role: 'Buyers Agent',
  },
  {
    quote:
      "I can see that there's a pocket which is 64% in last 10 years, and then there's a pocket which is 22%... Microburbs makes it all visible.",
    author: 'Melanie Cuthberts',
    role: 'Webinar Attendee',
  },
  {
    quote:
      'Microburbs made the data so clear — I finally know exactly what to look for and where the real opportunities are.',
    author: 'Kavita',
    role: 'Property Investor',
  },
];

const FEATURES = [
  {
    icon: MapPin,
    title: 'Pocket Heatmaps',
    description:
      'Access 5,000+ heatmap indicators at the street level. See risk variation within suburbs — not just averages.',
  },
  {
    icon: Layers,
    title: 'Risk Overlays',
    description:
      'Toggle bushfire, flood, public housing, noise, and zoning layers. Development applications tracked weekly.',
  },
  {
    icon: FileText,
    title: 'Liveability Scorecards',
    description:
      'Scores for convenience, tranquility, lifestyle, family-friendliness, affluence, and community — all in one report.',
  },
  {
    icon: Zap,
    title: 'AI Property Finder',
    description:
      'Find top-performing for-sale properties and high-growth suburbs with data-driven filtering.',
  },
];

const HOW_IT_WORKS_STEPS = [
  {
    number: '01',
    title: 'Search Any Address',
    description:
      'Enter an address or suburb. Microburbs shows you neighbourhood-level boundaries and pocket data.',
  },
  {
    number: '02',
    title: 'Explore DataExplorer',
    description:
      'Access 5,000+ heatmap indicators — flood, noise, public housing, bushfire, zoning, demographics, and more.',
  },
  {
    number: '03',
    title: 'Compare & Shortlist',
    description:
      'Use Suburb Finder and AI Property Finder to filter high-growth areas and top-performing properties.',
  },
  {
    number: '04',
    title: 'Export Reports',
    description:
      'Generate property reports, suburb reports, and liveability scorecards with detailed data layers.',
  },
];

const BUYERS_AGENT_OUTCOMES = [
  'Consolidate council documents, crime stats, and planning data in one platform',
  'Present visual, data-backed recommendations with liveability scorecards',
  'Spot bushfire, flood, public housing, and noise risks at the street level',
  'Shortlist faster with AI Property Finder and Suburb Finder',
  'Build trust with transparent, pocket-level analysis clients can see',
];

const INVESTOR_OUTCOMES = [
  'Identify undervalued pockets with backtested growth forecasts',
  'Avoid streets with hidden capital growth risks using 5,000+ indicators',
  'Make data-driven decisions with weekly updated median house prices',
  'Track multiple markets with Suburb Finder and DataExplorer',
  'Spot emerging risks early — development applications tracked weekly',
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
                Australia&apos;s most comprehensive property data — 2+ billion
                data points and 5,000+ heatmap indicators that go deeper than
                suburb-level averages. Built for buyers agents and investors.
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
            Trusted by 10,000+ members and 5+ million site visitors since 2014
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
              zoning changes don&apos;t show up in suburb-level data. Microburbs
              aggregates council documents, government data, crime statistics,
              school performance, and planning information into one view — so
              nothing gets missed.
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="mb-2 text-3xl font-bold text-destructive">
                    4-5 hrs
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Wasted per day checking 50 properties
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="mb-2 text-3xl font-bold text-destructive">
                    $200K
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Price gap you could have spotted
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="mb-2 text-3xl font-bold text-destructive">
                    25-30%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Public housing you didn&apos;t see
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Real Customer Pain Points */}
      <section className="bg-muted/30 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              What Buyers & Agents Are Really Saying
            </h2>
            <p className="text-lg text-muted-foreground">
              Real feedback from property professionals like you
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            <Card className="border-l-4 border-primary">
              <CardContent className="pt-6">
                <p className="mb-4 text-lg font-medium italic">
                  &quot;That big red tells me yeah, don&apos;t touch it...
                  within seconds, I can do a screenshot and send it to the
                  client.&quot;
                </p>
                <p className="text-sm text-muted-foreground">
                  — Adam Cooper, Buyer&apos;s Agent
                </p>
                <p className="mt-2 text-xs text-primary">
                  Visual clarity that drives decisions
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-primary">
              <CardContent className="pt-6">
                <p className="mb-4 text-lg font-medium italic">
                  &quot;I can see that there&apos;s a pocket which is 64% in
                  last 10 years, and then there&apos;s a pocket which is 22%...
                  so much variation. Microburbs makes it all visible.&quot;
                </p>
                <p className="text-sm text-muted-foreground">
                  — Melanie Cuthberts, Webinar Attendee
                </p>
                <p className="mt-2 text-xs text-primary">
                  Street-level insights unlock value
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-primary">
              <CardContent className="pt-6">
                <p className="mb-4 text-lg font-medium italic">
                  &quot;Microburbs made the data so clear — I finally know
                  exactly what to look for and where the real opportunities
                  are.&quot;
                </p>
                <p className="text-sm text-muted-foreground">
                  — Kavita, Property Investor
                </p>
                <p className="mt-2 text-xs text-primary">
                  Actionable insights, not data overwhelm
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-primary">
              <CardContent className="pt-6">
                <p className="mb-4 text-lg font-medium italic">
                  &quot;Before Microburbs, I was spending hours on research. Now
                  I shortlist properties in minutes with full confidence in the
                  risk profile.&quot;
                </p>
                <p className="text-sm text-muted-foreground">
                  — Daniel Rourke, Property Investor
                </p>
                <p className="mt-2 text-xs text-primary">
                  Hours of research reduced to minutes
                </p>
              </CardContent>
            </Card>
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
              Our data goes deeper than anyone else
            </h2>
            <p className="text-lg text-muted-foreground">
              2+ billion data points across 5,000+ indicators, updated weekly
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
              Neighbourhood-level data reveals what suburb averages hide
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
              Bushfire, flood, public housing, noise, and zoning — all from
              authoritative government sources
            </p>
          </div>

          <RiskOverlayDemo />
        </div>
      </section>

      {/* Properties For Sale Section */}
      <section className="bg-muted/30 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <Badge className="mb-4" variant="secondary">
              Live Properties
            </Badge>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Properties for sale with risk analysis
            </h2>
            <p className="text-lg text-muted-foreground">
              Real Melbourne properties with comprehensive risk scores and
              market data
            </p>
          </div>

          <PropertiesForSaleMap />
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
                Consolidate council documents, government data, crime
                statistics, and planning information into visual, client-ready
                analysis.
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
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
                Use rigorously backtested growth forecasts and 5,000+ heatmap
                indicators to find streets the market hasn&apos;t priced in yet.
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
              Join 10,000+ members using Australia&apos;s most comprehensive
              property data to make smarter decisions.
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
