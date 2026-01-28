import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

/**
 * FAQ accordion component with structured data support.
 */
export function FAQ({ items }: FAQProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

/**
 * FAQ data for Microburbs landing page.
 */
export const MICROBURBS_FAQ: FAQItem[] = [
  {
    question: 'What data sources does Microburbs use?',
    answer:
      'Microburbs aggregates data from multiple authoritative sources including government records, planning zones, historical sales, flood maps, environmental reports, and infrastructure databases. Data is updated regularly to ensure accuracy.',
  },
  {
    question: 'How often is the data updated?',
    answer:
      'Core datasets are refreshed weekly, with critical updates (like new planning applications or flood warnings) added as they become available. Historical trends and statistical models are recalculated monthly.',
  },
  {
    question: 'What areas does Microburbs cover?',
    answer:
      'Microburbs currently covers major metropolitan areas across Australia, with expanding coverage to regional centers. Coverage includes detailed pocket-level data for capital cities and growing regional hubs.',
  },
  {
    question: 'Who is Microburbs designed for?',
    answer:
      'Microburbs is built specifically for buyers agents and property investors who need to make data-driven decisions quickly. It consolidates research that typically requires multiple tools and manual analysis.',
  },
  {
    question: 'How accurate are the risk assessments?',
    answer:
      'Risk scores combine verified historical data with spatial analysis and statistical models. While no tool can predict every outcome, Microburbs surfaces objective data points that may not be visible through traditional suburb-level analysis.',
  },
  {
    question: 'Can I export reports for clients?',
    answer:
      'Yes, all risk overlays and pocket analysis can be exported as client-ready PDF reports with your branding. Reports include visual maps, data tables, and clear explanations suitable for sharing with buyers.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Yes, new users get a 14-day free trial with full access to all features. No credit card required to start. After the trial, choose a plan that fits your workflow.',
  },
  {
    question: 'What if I need data for a specific pocket not yet covered?',
    answer:
      'We prioritize new areas based on user demand. Contact support with your requirements, and we can often add specific pockets within 5-7 business days for active subscribers.',
  },
  {
    question: 'Do you comply with Australian privacy laws?',
    answer:
      'Absolutely. Microburbs fully complies with the Privacy Act 1988 and Australian Privacy Principles. We only use publicly available data and do not store personal information about property owners.',
  },
  {
    question: 'Can I integrate Microburbs with my existing CRM or workflow?',
    answer:
      'API access and integrations are available on Pro and Office plans. Common integrations include CRMs, project management tools, and custom dashboards. Contact sales for specific integration requirements.',
  },
];
