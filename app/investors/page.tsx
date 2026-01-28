import React from 'react';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { LeadForm } from '@/components/lead-form';
import { TrendingUp, MapPin, AlertTriangle, BarChart, Eye, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'For Property Investors - Find Undervalued Pockets',
  description:
    'Microburbs helps property investors identify undervalued streets, avoid hidden risks, and make data-driven investment decisions.',
};

const INVESTOR_BENEFITS = [
  {
    icon: MapPin,
    title: 'Find Undervalued Pockets',
    description:
      'Identify streets with strong fundamentals that the market hasn't priced in yet.',
  },
  {
    icon: AlertTriangle,
    title: 'Avoid Hidden Risks',
    description:
      'Spot capital growth risks like planning changes, infrastructure, and environmental factors.',
  },
  {
    icon: BarChart,
    title: 'Data-Driven Decisions',
    description:
      'Replace gut feel with objective street-level data and historical trends.',
  },
  {
    icon: Eye,
    title: 'Track Multiple Markets',
    description:
      'Monitor dozens of pockets simultaneously across different cities and suburbs.',
  },
  {
    icon: TrendingUp,
    title: 'Spot Emerging Trends',
    description:
      'See infrastructure, zoning, and demographic changes before they affect prices.',
  },
  {
    icon: Zap,
    title: 'Move Fast',
    description:
      'Make confident decisions quickly when opportunities arise in competitive markets.',
  },
];

const INVESTMENT_CRITERIA = [
  {
    criterion: 'Capital Growth Potential',
    how: 'Compare pocket-level demographics, zoning, and infrastructure plans.',
  },
  {
    criterion: 'Risk Assessment',
    how: 'Check flood, fire, noise, and public housing proximity for each street.',
  },
  {
    criterion: 'Market Timing',
    how: 'Spot pockets before planning approvals or infrastructure completion.',
  },
  {
    criterion: 'Portfolio Diversification',
    how: 'Analyze multiple markets side-by-side to balance risk.',
  },
];

export default function InvestorsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-b from-background to-secondary/20 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6" variant="secondary">
              For Property Investors
            </Badge>

            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Find undervalued pockets before the market does
            </h1>

            <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
              Make data-driven investment decisions with street-level intelligence.
              Identify hidden opportunities and avoid costly mistakes.
            </p>

            <Button size="xl" asChild>
              <a href="#lead-form">Start 14-day free trial</a>
            </Button>

            <p className="mt-4 text-sm text-muted-foreground">
              No credit card required · Full access for 14 days
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Invest smarter with street-level data
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to identify opportunities and manage risk
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {INVESTOR_BENEFITS.map((benefit, index) => (
              <Card key={index} className="transition-shadow hover:shadow-lg">
                <CardContent className="pt-6">
                  <benefit.icon className="mb-4 h-10 w-10 text-primary" />
                  <h3 className="mb-2 text-xl font-semibold">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Criteria */}
      <section className="bg-muted/30 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold sm:text-4xl">
              Analyze what matters for returns
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              {INVESTMENT_CRITERIA.map((item, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <h3 className="mb-3 text-lg font-semibold">
                      {item.criterion}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.how}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Investor Story */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border bg-card p-8 lg:p-12">
              <Badge className="mb-4">Investor Story</Badge>
              <h2 className="mb-4 text-2xl font-bold">
                "I found a pocket overlooked by the market"
              </h2>
              <p className="mb-6 text-muted-foreground">
                An investor in Melbourne was researching suburbs with upcoming
                infrastructure projects. Using Microburbs, they identified a
                specific pocket three streets away from a planned train station—far
                enough to have lower current prices, but close enough to benefit
                from the infrastructure uplift. The pocket had low flood risk and
                strong demographics that weren't reflected in the suburb average.
              </p>
              <p className="font-semibold text-primary">
                Result: Purchased two properties in that pocket 18 months before
                station completion. Both have increased in value beyond the suburb
                median.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Start finding hidden opportunities
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join investors who are using street-level data to make smarter
              decisions.
            </p>

            <div id="lead-form" className="mx-auto max-w-lg">
              <LeadForm source="investors" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
