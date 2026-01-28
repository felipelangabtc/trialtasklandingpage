'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';
import { enableAnalytics, disableAnalytics } from '@/lib/analytics';

/**
 * Cookie consent banner with opt-in/out controls.
 */
export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('analytics_consent');
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    enableAnalytics();
    setShow(false);
  };

  const handleDecline = () => {
    disableAnalytics();
    setShow(false);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <Card className="container mx-auto max-w-4xl border-2 p-6 shadow-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <h3 className="mb-2 font-semibold">Cookie Preferences</h3>
            <p className="text-sm text-muted-foreground">
              We use cookies and analytics to improve your experience and understand how
              our site is used. You can choose to accept or decline non-essential
              cookies.{' '}
              <a
                href="/legal/privacy"
                className="underline hover:text-primary"
              >
                Learn more
              </a>
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button
              variant="outline"
              onClick={handleDecline}
              className="whitespace-nowrap"
            >
              Decline
            </Button>
            <Button onClick={handleAccept} className="whitespace-nowrap">
              Accept
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 sm:static"
            onClick={handleDecline}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
