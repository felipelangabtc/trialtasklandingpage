import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

/**
 * Testimonial card component for displaying customer feedback.
 */
export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="h-full transition-shadow hover:shadow-lg">
      <CardContent className="p-6">
        <Quote className="mb-4 h-8 w-8 text-primary/20" />

        <blockquote className="mb-6 text-base leading-relaxed text-muted-foreground">
          "{testimonial.quote}"
        </blockquote>

        <div className="flex items-center gap-4">
          {testimonial.avatar ? (
            <img
              src={testimonial.avatar}
              alt={testimonial.author}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <span className="text-lg font-semibold">
                {testimonial.author.charAt(0)}
              </span>
            </div>
          )}

          <div>
            <p className="font-semibold">{testimonial.author}</p>
            <p className="text-sm text-muted-foreground">
              {testimonial.role}
              {testimonial.company && `, ${testimonial.company}`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Grid of testimonials with responsive layout.
 */
interface TestimonialGridProps {
  testimonials: Testimonial[];
}

export function TestimonialGrid({ testimonials }: TestimonialGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard key={index} testimonial={testimonial} />
      ))}
    </div>
  );
}
