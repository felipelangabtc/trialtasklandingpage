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
              A free, detailed, and authoritative resource for Australian
              property seekers — built to consolidate fragmented property
              research into a single, accessible format.
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
                Microburbs was founded in 2014 by Luke Metcalfe,
                Australia&apos;s leading data scientist and real estate
                forecasting expert, with 15 years of startup experience in
                reference publishing.
              </p>

              <p>
                Luke discovered that property buyers must laboriously research
                council documents, government data, crime statistics, planning
                information, and school performance separately. There was
                nothing that helped professionals understand the variation
                <em>within</em> suburbs — two streets in the same suburb can
                have completely different risk profiles.
              </p>

              <p>
                Microburbs was built to change that. By aggregating data from
                the Australian Bureau of Statistics, council records, planning
                zones, flood maps, environmental reports, and infrastructure
                databases — over 2 billion data points across 5,000+ heatmap
                indicators — we created a platform that shows
                neighbourhood-level reality, not suburb-level averages.
              </p>

              <p>
                Today, Microburbs serves over 10,000 members and has welcomed 5+
                million site visitors, helping homebuyers, buyers agents, and
                property investors across Australia make faster, more confident
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
              To be Australia&apos;s most comprehensive property data resource —
              making street-level intelligence accessible to every homebuyer,
              buyers agent, and investor, empowering them to transform uncertain
              property decisions into confident choices.
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
