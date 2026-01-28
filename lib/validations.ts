import { z } from 'zod';

/**
 * Lead form validation schema
 */
export const leadFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const cleaned = val.replace(/[\s\-()]/g, '');
        return /^(\+?61|0)[2-478]\d{8}$/.test(cleaned) || /^04\d{8}$/.test(cleaned);
      },
      {
        message: 'Please enter a valid Australian phone number',
      }
    ),
  role: z.enum(['buyers_agent', 'investor', 'other'], {
    required_error: 'Please select your role',
  }),
  message: z.string().max(1000, 'Message must be less than 1000 characters').optional(),
  marketingConsent: z.boolean().default(false),
  // Honeypot field - should be empty
  website_url: z.string().max(0, 'Invalid submission').optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

/**
 * Contact form validation schema (for general inquiries)
 */
export const contactFormSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().toLowerCase().trim(),
  subject: z.string().min(3).max(200).trim(),
  message: z.string().min(10).max(2000).trim(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Newsletter subscription schema
 */
export const newsletterSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;
