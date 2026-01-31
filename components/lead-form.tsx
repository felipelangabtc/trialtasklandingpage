'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leadFormSchema, type LeadFormData } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { track } from '@/lib/analytics';
import { getActiveVariants } from '@/lib/experiments';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface LeadFormProps {
  title?: string;
  description?: string;
  source?: string;
}

/**
 * Lead capture form with validation, spam protection, and analytics tracking.
 */
export function LeadForm({
  title = 'Start your free trial',
  description = 'No credit card required. Full access for 14 days.',
  source = 'home',
}: LeadFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
  });

  const role = watch('role');
  const marketingConsent = watch('marketingConsent');

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Track form submission attempt
      const variants = getActiveVariants();
      track('lead_form_submit', {
        source,
        role: data.role,
        ...variants,
      });

      // Submit to API
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          source,
          variant: variants.cta,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit form');
      }

      // Track success
      track('lead_form_success', {
        source,
        role: data.role,
      });

      // Redirect to thank you page
      router.push('/thank-you');
    } catch (err) {
      console.error('Form submission error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );

      track('lead_form_error', {
        source,
        error: err instanceof Error ? err.message : 'Unknown error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name (optional) */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="John Smith"
              aria-invalid={errors.name ? 'true' : 'false'}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="john@example.com"
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role">
              I am a <span className="text-destructive">*</span>
            </Label>
            <Select
              value={role}
              onValueChange={(value) =>
                setValue('role', value as LeadFormData['role'])
              }
            >
              <SelectTrigger
                id="role"
                aria-invalid={errors.role ? 'true' : 'false'}
              >
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buyers_agent">Buyers Agent</SelectItem>
                <SelectItem value="investor">Property Investor</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm text-destructive">{errors.role.message}</p>
            )}
          </div>

          {/* Collapsed optional fields */}
          {!showMore && (
            <button
              type="button"
              className="text-sm text-muted-foreground underline hover:text-primary"
              onClick={() => setShowMore(true)}
            >
              Add more details (optional)
            </button>
          )}

          {showMore && (
            <div className="space-y-4">
              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  placeholder="0400 000 000"
                  aria-invalid={errors.phone ? 'true' : 'false'}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  {...register('message')}
                  placeholder="Tell us about your needs..."
                  rows={3}
                />
                {errors.message && (
                  <p className="text-sm text-destructive">
                    {errors.message.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Marketing Consent */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="marketingConsent"
              checked={marketingConsent}
              onCheckedChange={(checked) =>
                setValue('marketingConsent', checked as boolean)
              }
            />
            <Label
              htmlFor="marketingConsent"
              className="cursor-pointer text-sm font-normal leading-tight"
            >
              I agree to receive product updates and marketing communications
            </Label>
          </div>

          {/* Honeypot field - hidden from users */}
          <input
            type="text"
            {...register('website_url')}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Error message */}
          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Start Free Trial'
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            By submitting this form, you agree to our{' '}
            <a href="/legal/terms" className="underline hover:text-primary">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/legal/privacy" className="underline hover:text-primary">
              Privacy Policy
            </a>
            .
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
