import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display hero section', async ({ page }) => {
    await page.goto('/');

    // Check for hero heading
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    await expect(heading).toContainText(/street-level|risks/i);
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');

    // Check navigation links
    await expect(page.locator('nav a[href="/buyers-agents"]')).toBeVisible();
    await expect(page.locator('nav a[href="/investors"]')).toBeVisible();
    await expect(page.locator('nav a[href="/pricing"]')).toBeVisible();
  });

  test('should display CTA buttons', async ({ page }) => {
    await page.goto('/');

    // Check for CTA buttons
    const ctaButtons = page.locator('button, a').filter({ hasText: /trial|demo/i });
    await expect(ctaButtons.first()).toBeVisible();
  });

  test('should have accessible skip link', async ({ page }) => {
    await page.goto('/');

    // Tab to skip link
    await page.keyboard.press('Tab');
    const skipLink = page.locator('.skip-to-content');
    await expect(skipLink).toBeFocused();
  });

  test('should display social proof section', async ({ page }) => {
    await page.goto('/');

    // Check for social proof
    const socialProof = page.locator('text=/trusted by/i');
    await expect(socialProof).toBeVisible();
  });

  test('should display FAQ section', async ({ page }) => {
    await page.goto('/');

    // Scroll to FAQ
    await page.locator('text=/frequently asked/i').scrollIntoViewIfNeeded();
    await expect(page.locator('text=/frequently asked/i')).toBeVisible();
  });
});
