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
      'Microburbs aggregates over 2 billion data points from authoritative sources including the Australian Bureau of Statistics Census, council records, planning zones, flood maps, crime statistics, school NAPLAN data, environmental reports, Google Maps, and infrastructure databases.',
  },
  {
    question: 'How often is the data updated?',
    answer:
      'Median house prices and development applications are updated weekly. Growth forecasts are rigorously backtested and continually updated. Demographic and census data is refreshed as new ABS releases become available.',
  },
  {
    question: 'What areas does Microburbs cover?',
    answer:
      'Microburbs covers Australian property markets with neighbourhood-level data. The platform has served over 5 million site visitors since 2014 and continues to expand coverage across capital cities and regional areas.',
  },
  {
    question: 'Who is Microburbs designed for?',
    answer:
      'Microburbs serves homebuyers seeking suburb confirmation, property investors maximizing capital growth, buyers agents who need client-ready analysis, and sophisticated investors looking for data that gives them an edge. There are dedicated pricing tiers for each audience.',
  },
  {
    question: 'What tools are included?',
    answer:
      'Key tools include DataExplorer with 5,000+ heatmap indicators, AI Property Finder, Suburb Finder, Liveability Scorecards, Property Reports, Suburb Reports, Automated Valuation Model (AVM), and Comparative Market Analysis (CMA).',
  },
  {
    question: 'What are Liveability Scorecards?',
    answer:
      'Liveability Scorecards rate neighbourhoods across six dimensions: convenience (transit, commute, shops), tranquility (density, noise, tree coverage), lifestyle (cafes, restaurants, gyms), family (school NAPLAN scores, childcare), affluence (income, education, employment), and community (volunteerism, cultural institutions).',
  },
  {
    question: 'How accurate are the growth forecasts?',
    answer:
      'Growth forecasts are rigorously backtested against historical data and continually updated. While no tool can predict every outcome, Microburbs surfaces objective, neighbourhood-level data points that suburb-level analysis misses.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Yes, new users get a 14-day free trial with full access to all features. No credit card required to start. After the trial, choose a plan that fits your needs — Basic, Advanced, or Portfolio Builder.',
  },
  {
    question: 'Do you offer quarterly billing?',
    answer:
      'Yes, quarterly billing is available with a 20% discount compared to monthly pricing. This applies to all plan tiers.',
  },
  {
    question: 'Can I get a one-on-one consultation?',
    answer:
      'Portfolio Builder plan subscribers get access to one-on-one consultations with Chief Data Scientist Luke Metcalfe, the founder of Microburbs with over 15 years of experience in data science and real estate forecasting.',
  },
];
