import React from 'react';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { LeadForm } from '@/components/lead-form';
import { Clock, Users, FileText, Shield, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'For Buyers Agents - Street-Level Property Intelligence',
  description:
    'Microburbs helps buyers agents save 5-10 hours per week on research, present visual recommendations to clients, and avoid hidden street-level risks.',
};

const BENEFITS = [
  {
    icon: Clock,
    title: 'Save 5-10 Hours Per Week',
    description:
      'Replace 10+ separate tools with one platform. What used to take hours now takes minutes.',
  },
  {
    icon: FileText,
    title: 'Client-Ready Reports',
    description:
      'Export branded PDF reports with maps and data your clients understand instantly.',
  },
  {
    icon: Shield,
    title: 'Avoid Hidden Risks',
    description:
      'Spot flood zones, public housing, noise, and zoning issues before making recommendations.',
  },
  {
    icon: Target,
    title: 'Faster Shortlisting',
    description:
      'Compare dozens of properties quickly with pocket-level data at your fingertips.',
  },
  {
    icon: Users,
    title: 'Build Client Trust',
    description:
      'Show clients visual, data-backed analysis that explains exactly why you recommend a property.',
  },
];

const WORKFLOW = [
  'Client provides target suburbs and budget',
  'You search those suburbs in Microburbs',
  'Toggle risk layers to filter out problem streets',
  'Export shortlist with pocket analysis',
  'Present client-ready reports with visual proof',
  'Close deals faster with confident recommendations',
];

export default function BuyersAgentsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-b from-background to-secondary/20 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6" variant="secondary">
              For Buyers Agents
            </Badge>

            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Close deals with street-level intelligence
            </h1>

            <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
              Save hours on research, build client trust with visual analysis,
              and avoid recommending properties with hidden risks.
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
              Built for your workflow
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything a buyers agent needs to deliver exceptional service
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((benefit, index) => (
              <Card key={index} className="transition-shadow hover:shadow-lg">
                <CardContent className="pt-6">
                  <benefit.icon className="mb-4 h-10 w-10 text-primary" />
                  <h3 className="mb-2 text-xl font-semibold">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Typical Workflow */}
      <section className="bg-muted/30 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-3xl font-bold sm:text-4xl">
              How buyers agents use Microburbs
            </h2>

            <div className="space-y-4">
              {WORKFLOW.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-lg border bg-background p-4"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
                    {index + 1}
                  </div>
                  <p className="pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Example */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border bg-card p-8 lg:p-12">
              <Badge className="mb-4">Real Example</Badge>
              <h2 className="mb-4 text-2xl font-bold">
                "I avoided a flood-risk property my client almost bought"
              </h2>
              <p className="mb-6 text-muted-foreground">
                A buyers agent in Brisbane was researching properties in a
                popular suburb. Standard reports showed no issues. But
                Microburbs revealed that the specific street had historical
                flooding and was adjacent to a designated flood zone—information
                not visible in suburb-level averages.
              </p>
              <p className="font-semibold text-primary">
                Result: Client avoided a $50k+ loss and purchased a safer
                property two streets over.
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
              Start delivering better service today
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join buyers agents who are saving time, building trust, and
              closing deals with Microburbs.
            </p>

            <div id="lead-form" className="mx-auto max-w-lg">
              <LeadForm source="buyers-agents" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
