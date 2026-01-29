import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

export interface PricingTier {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
  ctaHref: string;
}

interface PricingCardProps {
  tier: PricingTier;
  onClick?: () => void;
}

/**
 * Pricing card component with feature list and CTA.
 */
export function PricingCard({ tier, onClick }: PricingCardProps) {
  return (
    <Card
      className={`relative flex h-full flex-col transition-all hover:shadow-xl ${
        tier.highlighted
          ? 'border-primary shadow-lg ring-2 ring-primary ring-offset-2'
          : ''
      }`}
    >
      {tier.highlighted && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
          Most Popular
        </Badge>
      )}

      <CardHeader className="space-y-2 text-center">
        <h3 className="text-2xl font-bold">{tier.name}</h3>
        <p className="text-sm text-muted-foreground">{tier.description}</p>
        <div className="pt-4">
          <span className="text-4xl font-bold">${tier.price}</span>
          <span className="text-muted-foreground">/{tier.period}</span>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <ul className="space-y-3">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          size="lg"
          variant={tier.highlighted ? 'default' : 'outline'}
          onClick={onClick}
        >
          {tier.cta}
        </Button>
      </CardFooter>
    </Card>
  );
}

/**
 * Pricing tiers data for Microburbs.
 */
export const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Basic',
    price: 95,
    period: 'month',
    description: 'For homebuyers and investors',
    features: [
      'Property reports and suburb reports',
      'Liveability scorecards',
      'DataExplorer heatmap access',
      'Weekly data updates',
      'Neighbourhood insights',
      'Email support',
    ],
    cta: 'Start 14-day trial',
    ctaHref: '#lead-form',
  },
  {
    name: 'Advanced',
    price: 170,
    period: 'month',
    description: 'For investors maximizing capital growth and yield',
    features: [
      'Everything in Basic',
      'Backtested growth forecasts',
      'AI Property Finder',
      'Suburb Finder with advanced filters',
      'Automated Valuation Model (AVM)',
      'Comparative Market Analysis (CMA)',
      'Development application tracking',
      'Priority support',
    ],
    highlighted: true,
    cta: 'Start 14-day trial',
    ctaHref: '#lead-form',
  },
  {
    name: 'Portfolio Builder',
    price: 390,
    period: 'month',
    description: 'For sophisticated investors and buyers agents',
    features: [
      'Everything in Advanced',
      'Unlimited property reports',
      'One-on-one consultation with Chief Data Scientist',
      'Custom data analysis',
      'Dedicated account manager',
      'Enterprise integrations',
      'Team collaboration features',
      'SLA guarantee',
    ],
    cta: 'Contact sales',
    ctaHref: '#contact',
  },
];
