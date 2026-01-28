import React from 'react';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { PricingCard, PRICING_TIERS } from '@/components/pricing-card';
import { FAQ } from '@/components/faq';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing - Transparent Plans for Every Need',
  description:
    'Choose the Microburbs plan that fits your workflow. 14-day free trial, no credit card required.',
};

const PRICING_FAQ = [
  {
    question: 'Can I change plans later?',
    answer:
      'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.',
  },
  {
    question: 'What happens after the free trial?',
    answer:
      'After your 14-day trial, you can choose to subscribe to a paid plan. If you do nothing, your account will be paused and your data will be retained for 30 days.',
  },
  {
    question: 'Do you offer annual billing?',
    answer:
      'Yes, annual billing is available with a 15% discount. Contact sales for annual pricing.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, Mastercard, Amex) and direct debit for Office plans.',
  },
  {
    question: 'Is there a contract or commitment?',
    answer:
      'No contracts. All plans are month-to-month and you can cancel anytime. Office plans have the option for annual contracts with discounts.',
  },
  {
    question: 'Can I add more users to my plan?',
    answer:
      'Solo and Pro plans are single-user. Office plans include up to 10 seats. Contact us for enterprise pricing with more seats.',
  },
];

const ALL_FEATURES = [
  'Unlimited pocket analysis',
  'All risk overlay layers (flood, fire, noise, public housing, zoning)',
  'Historical trend data',
  'Street-level demographics',
  'Planning zone information',
  'Infrastructure project tracking',
  'Sales history and comparables',
  'Mobile app access (iOS & Android)',
];

export default function PricingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-b from-background to-secondary/20 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6" variant="secondary">
              Pricing
            </Badge>

            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
              Simple, transparent pricing
            </h1>

            <p className="mb-8 text-lg text-muted-foreground">
              Choose the plan that fits your workflow. All plans include a 14-day
              free trial with full access.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {PRICING_TIERS.map((tier) => (
              <PricingCard key={tier.name} tier={tier} />
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-muted-foreground">
            All prices in AUD. Taxes may apply depending on your location.
          </p>
        </div>
      </section>

      {/* All Features */}
      <section className="bg-muted/30 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold sm:text-4xl">
              Every plan includes
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              {ALL_FEATURES.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-8 text-center lg:p-12">
            <h2 className="mb-4 text-2xl font-bold">Need more?</h2>
            <p className="mb-6 text-muted-foreground">
              Large teams, custom integrations, or enterprise requirements?
              Contact our sales team for custom pricing and dedicated support.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center text-primary hover:underline"
            >
              Contact sales →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/30 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-3xl font-bold sm:text-4xl">
              Pricing FAQ
            </h2>

            <FAQ items={PRICING_FAQ} />
          </div>
        </div>
      </section>
    </div>
  );
}
