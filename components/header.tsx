'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, MapPin } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import { track } from '@/lib/analytics';
import { getCTAText } from '@/lib/experiments';

const NAV_ITEMS = [
  { label: 'Buyers Agents', href: '/buyers-agents' },
  { label: 'Investors', href: '/investors' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
];

/**
 * Main site header with sticky navigation.
 */
export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTAClick = () => {
    track('cta_click', {
      location: 'header',
      page: pathname,
    });
  };

  const ctaText = getCTAText();

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      <header
        className={cn(
          'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
          scrolled && 'shadow-sm'
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold transition-opacity hover:opacity-80"
          >
            <MapPin className="h-6 w-6 text-primary" />
            <span>Microburbs</span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden items-center gap-6 md:flex"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 md:flex">
            <ThemeToggle />
            <Button variant="outline" size="sm" asChild>
              <Link href="/book-demo">Book Demo</Link>
            </Button>
            <Button size="sm" asChild onClick={handleCTAClick}>
              <Link href="#lead-form">{ctaText}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t md:hidden">
            <nav
              className="container mx-auto space-y-1 px-4 py-4"
              aria-label="Mobile navigation"
            >
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'block rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent',
                    pathname === item.href
                      ? 'bg-accent text-primary'
                      : 'text-muted-foreground'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="space-y-2 pt-4">
                <Button variant="outline" className="w-full" asChild>
                  <Link
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Book Demo
                  </Link>
                </Button>
                <Button
                  className="w-full"
                  asChild
                  onClick={() => {
                    handleCTAClick();
                    setMobileMenuOpen(false);
                  }}
                >
                  <Link href="#lead-form">{ctaText}</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
