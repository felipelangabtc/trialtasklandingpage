'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import {
  CheckCircle,
  Calendar,
  Clock,
  Users,
  MapPin,
  Zap,
  Shield,
} from 'lucide-react';

const demoFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100).trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
  phone: z.string().optional(),
  company: z.string().max(200).optional(),
  role: z.enum(['buyers_agent', 'investor', 'other'], {
    required_error: 'Please select your role',
  }),
  teamSize: z.enum(['1', '2-5', '6-10', '11+'], {
    required_error: 'Please select your team size',
  }),
  message: z.string().max(1000).optional(),
  preferredTime: z.enum(['morning', 'afternoon', 'evening'], {
    required_error: 'Please select a preferred time',
  }),
  marketingConsent: z.boolean().default(false),
  website_url: z.string().max(0).optional(),
});

type DemoFormData = z.infer<typeof demoFormSchema>;

const DEMO_BENEFITS = [
  {
    icon: MapPin,
    title: 'Live Pocket Analysis',
    description:
      'See real street-level risk data for any Australian suburb during the demo.',
  },
  {
    icon: Zap,
    title: 'Workflow Integration',
    description:
      'Learn how Microburbs fits into your existing property research workflow.',
  },
  {
    icon: Shield,
    title: 'Risk Layer Deep Dive',
    description:
      'Explore flood, noise, crime, and public housing overlays with a product expert.',
  },
  {
    icon: Users,
    title: 'Team Onboarding',
    description:
      'Get a tailored plan for rolling out Microburbs across your team.',
  },
];

const DEMO_STATS = [
  { value: '30 min', label: 'Demo Duration' },
  { value: 'Free', label: 'No Obligation' },
  { value: '1-on-1', label: 'Personalised' },
  { value: '24h', label: 'Booking Confirmation' },
];

export default function BookDemoPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DemoFormData>({
    resolver: zodResolver(demoFormSchema),
  });

  const onSubmit = async (data: DemoFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          role: data.role,
          message: `[DEMO REQUEST] Company: ${data.company || 'N/A'} | Team Size: ${data.teamSize} | Preferred Time: ${data.preferredTime} | ${data.message || ''}`,
          marketingConsent: data.marketingConsent,
          website_url: data.website_url,
          source: 'book-demo',
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to submit');
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto max-w-lg text-center"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="mb-4 text-3xl font-bold">Demo Booked!</h1>
            <p className="mb-8 text-lg text-muted-foreground">
              We&apos;ll get back to you within 24 hours to confirm your demo
              time. Check your email for a confirmation.
            </p>
            <Button size="lg" onClick={() => router.push('/')}>
              Back to Home
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Book a personalised demo
              </h1>
              <p className="text-lg text-muted-foreground">
                See how Microburbs can transform your property research with
                street-level risk analysis. Get a 1-on-1 walkthrough tailored to
                your needs.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {DEMO_STATS.map((stat, index) => (
                <div
                  key={index}
                  className="rounded-lg border bg-card p-4 text-center"
                >
                  <p className="text-2xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form + Benefits */}
      <section className="pb-20 lg:pb-32">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="mb-2 text-2xl font-bold">
                What you&apos;ll see in the demo
              </h2>
              <p className="mb-8 text-muted-foreground">
                A 30-minute personalised walkthrough covering everything you
                need to make smarter property decisions.
              </p>

              <div className="space-y-6">
                {DEMO_BENEFITS.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{benefit.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Testimonial */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-10 rounded-xl border bg-card p-6"
              >
                <p className="text-sm italic text-muted-foreground">
                  &quot;The demo showed me exactly how to use risk layers to
                  shortlist properties 10x faster. I signed up the same
                  day.&quot;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 font-semibold text-primary">
                    AC
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Adam Cooper</p>
                    <p className="text-xs text-muted-foreground">
                      Buyers Agent
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Demo Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardContent className="p-6 lg:p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <Calendar className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="text-xl font-semibold">
                        Schedule your demo
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Fill in your details and we&apos;ll arrange a time
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Honeypot */}
                    <input
                      type="text"
                      {...register('website_url')}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    {/* Name */}
                    <div>
                      <label
                        htmlFor="demo-name"
                        className="mb-1 block text-sm font-medium"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register('name')}
                        id="demo-name"
                        type="text"
                        placeholder="Your full name"
                        className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="demo-email"
                        className="mb-1 block text-sm font-medium"
                      >
                        Work Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register('email')}
                        id="demo-email"
                        type="email"
                        placeholder="you@company.com"
                        className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="demo-phone"
                        className="mb-1 block text-sm font-medium"
                      >
                        Phone (Optional)
                      </label>
                      <input
                        {...register('phone')}
                        id="demo-phone"
                        type="tel"
                        placeholder="0400 000 000"
                        className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label
                        htmlFor="demo-company"
                        className="mb-1 block text-sm font-medium"
                      >
                        Company / Agency (Optional)
                      </label>
                      <input
                        {...register('company')}
                        id="demo-company"
                        type="text"
                        placeholder="Your company name"
                        className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    {/* Role + Team Size */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="demo-role"
                          className="mb-1 block text-sm font-medium"
                        >
                          I am a <span className="text-red-500">*</span>
                        </label>
                        <select
                          {...register('role')}
                          id="demo-role"
                          className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                          <option value="">Select role</option>
                          <option value="buyers_agent">Buyers Agent</option>
                          <option value="investor">Property Investor</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.role && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.role.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="demo-teamSize"
                          className="mb-1 block text-sm font-medium"
                        >
                          Team Size <span className="text-red-500">*</span>
                        </label>
                        <select
                          {...register('teamSize')}
                          id="demo-teamSize"
                          className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                          <option value="">Select size</option>
                          <option value="1">Just me</option>
                          <option value="2-5">2-5 people</option>
                          <option value="6-10">6-10 people</option>
                          <option value="11+">11+ people</option>
                        </select>
                        {errors.teamSize && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.teamSize.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Preferred Time */}
                    <div>
                      <p className="mb-1 text-sm font-medium">
                        Preferred Time <span className="text-red-500">*</span>
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          {
                            value: 'morning',
                            label: 'Morning',
                            time: '9am - 12pm',
                          },
                          {
                            value: 'afternoon',
                            label: 'Afternoon',
                            time: '12pm - 5pm',
                          },
                          {
                            value: 'evening',
                            label: 'Evening',
                            time: '5pm - 8pm',
                          },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex cursor-pointer flex-col items-center rounded-lg border p-3 text-center transition-colors hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                          >
                            <input
                              type="radio"
                              {...register('preferredTime')}
                              value={option.value}
                              className="sr-only"
                            />
                            <Clock className="mb-1 h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              {option.label}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {option.time}
                            </span>
                          </label>
                        ))}
                      </div>
                      {errors.preferredTime && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.preferredTime.message}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="demo-message"
                        className="mb-1 block text-sm font-medium"
                      >
                        Anything specific you&apos;d like to see? (Optional)
                      </label>
                      <textarea
                        {...register('message')}
                        id="demo-message"
                        rows={3}
                        placeholder="E.g., specific suburbs, risk types, or workflows you want to explore..."
                        className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    {/* Consent */}
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        {...register('marketingConsent')}
                        className="mt-1 h-4 w-4 rounded border-gray-300"
                      />
                      <span className="text-xs text-muted-foreground">
                        I agree to receive product updates and marketing
                        communications
                      </span>
                    </label>

                    {/* Error */}
                    {error && (
                      <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                        {error}
                      </div>
                    )}

                    {/* Submit */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Booking...' : 'Book My Free Demo'}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      No credit card required. We&apos;ll confirm your demo
                      within 24 hours.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
