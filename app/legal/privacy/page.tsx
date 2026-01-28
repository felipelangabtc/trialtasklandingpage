import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Microburbs Privacy Policy - How we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-4xl font-bold">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground">
            <strong>Last updated:</strong> January 2024
          </p>

          <h2>1. Introduction</h2>
          <p>
            Microburbs ("we", "our", or "us") is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you use our website and
            services.
          </p>

          <h2>2. Information We Collect</h2>
          <h3>2.1 Personal Information</h3>
          <p>
            We collect information that you provide directly to us, including:
          </p>
          <ul>
            <li>Name and contact information (email, phone number)</li>
            <li>Account credentials</li>
            <li>
              Payment information (processed securely through third-party
              providers)
            </li>
            <li>Professional details (role, company)</li>
          </ul>

          <h3>2.2 Usage Information</h3>
          <p>
            We automatically collect certain information when you use our
            services:
          </p>
          <ul>
            <li>Log data (IP address, browser type, pages visited)</li>
            <li>Device information</li>
            <li>Cookies and similar tracking technologies</li>
            <li>Analytics data about how you use our platform</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send you technical notices, updates, and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Monitor and analyze trends, usage, and activities</li>
            <li>Detect, prevent, and address technical issues and fraud</li>
          </ul>

          <h2>4. Data Sharing and Disclosure</h2>
          <p>
            We do not sell your personal information. We may share your
            information:
          </p>
          <ul>
            <li>With service providers who perform services on our behalf</li>
            <li>In response to legal requirements</li>
            <li>To protect our rights and safety</li>
            <li>With your consent</li>
          </ul>

          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized access,
            alteration, disclosure, or destruction.
          </p>

          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Withdraw consent</li>
          </ul>

          <h2>7. Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity
            on our service. You can instruct your browser to refuse all cookies
            or to indicate when a cookie is being sent.
          </p>

          <h2>8. Compliance with Australian Privacy Laws</h2>
          <p>
            We comply with the Privacy Act 1988 (Cth) and the Australian Privacy
            Principles (APPs). We only use publicly available property data and
            do not store personal information about property owners.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last updated" date.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us
            at:
          </p>
          <p>
            Email:{' '}
            <a
              href="mailto:privacy@microburbs.com"
              className="text-primary hover:underline"
            >
              privacy@microburbs.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
