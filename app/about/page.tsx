import React from 'react';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Users, Lightbulb, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Microburbs - Our Mission and Values',
  description:
    'Microburbs is on a mission to make street-level property intelligence accessible to every buyers agent and investor in Australia.',
};

const VALUES = [
  {
    icon: Target,
    title: 'Precision',
    description:
      'We believe in street-level accuracy, not suburb-level guesswork. Every data point matters.',
  },
  {
    icon: Users,
    title: 'Transparency',
    description:
      'We show you the data, the sources, and the methods. No black boxes, no hidden scores.',
  },
  {
    icon: Lightbulb,
    title: 'Simplicity',
    description:
      'Complex analysis should be simple to use. We make powerful tools accessible to everyone.',
  },
  {
    icon: Shield,
    title: 'Integrity',
    description:
      'We handle data responsibly, comply with privacy laws, and never compromise on quality.',
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-b from-background to-secondary/20 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6" variant="secondary">
              About Us
            </Badge>

            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
              Making property intelligence accessible
            </h1>

            <p className="text-lg text-muted-foreground">
              We built Microburbs because we saw buyers agents and investors
              wasting hours on research, using 10+ different tools, and still
              missing critical street-level risks.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold">Our Story</h2>

            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>
                Microburbs was founded in 2023 by a team of property professionals,
                data scientists, and engineers who saw a gap in the market.
              </p>

              <p>
                While there were plenty of tools for suburb-level analysis, there
                was nothing that helped professionals understand the variation
                <em>within</em> suburbs. Two streets in the same suburb can have
                completely different risk profiles—yet most tools treat the whole
                suburb as one homogeneous area.
              </p>

              <p>
                We set out to change that. By combining multiple authoritative data
                sources with spatial analysis and intuitive visualizations, we've
                created a platform that shows street-level reality, not
                suburb-level averages.
              </p>

              <p>
                Today, Microburbs serves buyers agents and property investors
                across Australia, helping them make faster, more confident
                decisions based on hyper-local intelligence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/30 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Our Values</h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we build
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, index) => (
              <Card key={index}>
                <CardContent className="pt-6 text-center">
                  <value.icon className="mx-auto mb-4 h-10 w-10 text-primary" />
                  <h3 className="mb-2 text-xl font-semibold">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              To make street-level property intelligence accessible to every
              buyers agent and investor in Australia, empowering them to make
              better decisions faster.
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-2xl font-bold">Get in touch</h2>
            <p className="mb-6 text-muted-foreground">
              Questions? Feedback? Partnership opportunities? We'd love to hear
              from you.
            </p>
            <p className="text-sm">
              <a
                href="mailto:hello@microburbs.com"
                className="text-primary hover:underline"
              >
                hello@microburbs.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
