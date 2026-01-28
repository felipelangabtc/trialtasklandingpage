import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Microburbs Terms of Service - Legal agreement for using our platform.',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-4xl font-bold">Terms of Service</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground">
            <strong>Last updated:</strong> January 2024
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Microburbs ("the Service"), you accept and
            agree to be bound by these Terms of Service ("Terms"). If you do not
            agree to these Terms, do not use the Service.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            Microburbs provides street-level property intelligence, risk
            analysis, and data visualization tools for buyers agents and
            property investors in Australia.
          </p>

          <h2>3. User Accounts</h2>
          <h3>3.1 Registration</h3>
          <p>
            You must create an account to access certain features. You agree to
            provide accurate, current, and complete information and to update it
            as necessary.
          </p>

          <h3>3.2 Account Security</h3>
          <p>
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activities under your account.
          </p>

          <h2>4. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Service for any illegal purpose</li>
            <li>Violate any laws in your jurisdiction</li>
            <li>Infringe on intellectual property rights</li>
            <li>Transmit viruses or malicious code</li>
            <li>Attempt to gain unauthorized access to the Service</li>
            <li>Resell or redistribute data without permission</li>
            <li>Use automated tools to scrape or extract data</li>
          </ul>

          <h2>5. Data and Content</h2>
          <h3>5.1 Our Data</h3>
          <p>
            All data, maps, reports, and analysis provided by Microburbs are
            owned by us or our licensors. You receive a limited license to use
            this data as part of the Service.
          </p>

          <h3>5.2 Data Accuracy</h3>
          <p>
            While we strive for accuracy, we do not guarantee that all data is
            error-free or up-to-date. You should verify critical information
            independently.
          </p>

          <h3>5.3 Your Data</h3>
          <p>
            You retain ownership of any data you upload. By uploading data, you
            grant us a license to use it to provide the Service.
          </p>

          <h2>6. Payment and Subscriptions</h2>
          <h3>6.1 Fees</h3>
          <p>
            Access to certain features requires a paid subscription. Fees are
            billed in advance on a monthly or annual basis.
          </p>

          <h3>6.2 Cancellation</h3>
          <p>
            You may cancel your subscription at any time. Cancellations take
            effect at the end of the current billing period. No refunds for
            partial months.
          </p>

          <h3>6.3 Free Trials</h3>
          <p>
            Free trials are available for new users. If you do not cancel before
            the trial ends, you will be charged for a subscription.
          </p>

          <h2>7. Intellectual Property</h2>
          <p>
            All content, trademarks, and data on this platform, including but
            not limited to software, databases, text, graphics, icons, and
            logos, are the property of Microburbs or our licensors.
          </p>

          <h2>8. Disclaimer of Warranties</h2>
          <p>
            THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND,
            EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE
            UNINTERRUPTED OR ERROR-FREE.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, MICROBURBS SHALL NOT BE
            LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
            PUNITIVE DAMAGES ARISING OUT OF YOUR USE OF THE SERVICE.
          </p>

          <h2>10. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Microburbs from any claims,
            damages, or expenses arising from your use of the Service or
            violation of these Terms.
          </p>

          <h2>11. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your account if you
            violate these Terms or engage in fraudulent or harmful activity.
          </p>

          <h2>12. Governing Law</h2>
          <p>
            These Terms are governed by the laws of Australia. Any disputes will
            be resolved in the courts of [State/Territory].
          </p>

          <h2>13. Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of the
            Service after changes constitutes acceptance of the new Terms.
          </p>

          <h2>14. Contact</h2>
          <p>For questions about these Terms, contact us at:</p>
          <p>
            Email:{' '}
            <a
              href="mailto:legal@microburbs.com"
              className="text-primary hover:underline"
            >
              legal@microburbs.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
