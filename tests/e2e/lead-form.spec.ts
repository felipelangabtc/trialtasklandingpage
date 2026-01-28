import { test, expect } from '@playwright/test';

test.describe('Lead Form', () => {
  test('should validate required fields', async ({ page }) => {
    await page.goto('/');

    // Find the form
    await page.locator('#lead-form').scrollIntoViewIfNeeded();

    // Click submit without filling fields
    await page.locator('button[type="submit"]').last().click();

    // Should show validation errors
    await expect(page.locator('text=/required/i').first()).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('/');

    await page.locator('#lead-form').scrollIntoViewIfNeeded();

    // Fill with invalid email
    await page.fill('input[type="email"]', 'invalid-email');
    await page.locator('button[type="submit"]').last().click();

    // Should show email validation error
    await expect(page.locator('text=/valid email/i')).toBeVisible();
  });

  test('should submit form successfully', async ({ page }) => {
    await page.goto('/');

    await page.locator('#lead-form').scrollIntoViewIfNeeded();

    // Fill form
    await page.fill('input[id="name"]', 'Test User');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.selectOption('select[id="role"]', 'buyers_agent');

    // Submit
    await page.locator('button[type="submit"]').last().click();

    // Should redirect to thank you page or show success
    await page.waitForURL(/thank-you|\//, { timeout: 5000 });
  });
});
