import React from 'react';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Mail, Calendar, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Thank You - Welcome to Microburbs',
  description: 'Thank you for your interest in Microburbs. Check your email for next steps.',
};

const NEXT_STEPS = [
  {
    icon: Mail,
    title: 'Check your email',
    description:
      'We've sent you a confirmation email with your trial access details.',
  },
  {
    icon: Calendar,
    title: 'Book onboarding (optional)',
    description:
      'Schedule a 15-minute call to get personalized setup help.',
  },
  {
    icon: FileText,
    title: 'Explore the platform',
    description:
      'Start analyzing pockets and see the difference street-level data makes.',
  },
];

export default function ThankYouPage() {
  return (
    <div className="flex flex-col">
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>
            </div>

            <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
              Thank you for your interest!
            </h1>

            <p className="mb-8 text-lg text-muted-foreground">
              We're excited to help you discover street-level property
              intelligence. Your trial access is being set up.
            </p>

            <div className="mb-12 rounded-lg border bg-muted/30 p-6">
              <p className="font-semibold">
                Your 14-day free trial starts now
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Full access to all features. No credit card required.
              </p>
            </div>

            <h2 className="mb-8 text-2xl font-bold">What happens next?</h2>

            <div className="grid gap-6 text-left md:grid-cols-3">
              {NEXT_STEPS.map((step, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <step.icon className="mb-4 h-8 w-8 text-primary" />
                    <h3 className="mb-2 font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <a href="/">Return to home</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/pricing">View pricing</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="border-t bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-2xl font-bold">
              Questions while you wait?
            </h2>
            <p className="mb-6 text-muted-foreground">
              Check out our FAQ or contact support anytime.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button variant="outline" asChild>
                <a href="/#faq">Read FAQ</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:support@microburbs.com">Contact Support</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
