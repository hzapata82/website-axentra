import { test, expect } from '@playwright/test';

test.describe('Landing page', () => {
  test('renders H1 and visible section headings', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1, name: 'COMANDA TU CARGA' })).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: 'Arquitectura de Ahorro Operativo' })
    ).toHaveCount(1);
    await expect(
      page.getByRole('heading', { level: 2, name: 'Grid de Servicios' })
    ).toHaveCount(1);
    await expect(
      page.getByRole('heading', { level: 2, name: 'Solicita tu Evaluación Estratégica' })
    ).toHaveCount(1);
  });

  test('hero CTA scrolls to contact section', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /SOLICITAR EVALUACIÓN ESTRATÉGICA/i }).click();

    await expect(page.locator('#contacto')).toBeInViewport();
  });

  test('contact form validates empty submit', async ({ page }) => {
    await page.goto('/');
    await page.locator('#contacto').scrollIntoViewIfNeeded();

    const submitButton = page.getByRole('button', { name: /SOLICITAR CONSULTA GRATUITA/i });
    await submitButton.click();

    await expect(page.getByText(/Formato de email inválido|requerido/i).first()).toBeVisible();
  });
});

test.describe('SEO', () => {
  test('has correct title and meta description', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Axentra Cargo/);
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /transporte multimodal/i);
  });

  test('exposes JSON-LD structured data', async ({ page }) => {
    await page.goto('/');

    const ldScripts = page.locator('script[type="application/ld+json"]');
    const allText = await ldScripts.allTextContents();
    const combined = allText.join(' ');

    expect(combined).toContain('"@type":"Organization"');
    expect(combined).toContain('"@type":"WebSite"');

    const serviceMatches = combined.match(/"@type":"Service"/g) ?? [];
    expect(serviceMatches.length).toBe(5);
  });
});

test.describe('Navigation', () => {
  test('header nav links work', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'Servicios', exact: true }).click();
    await expect(page.locator('#servicios')).toBeInViewport();
  });

  test('skip-to-content link is present', async ({ page }) => {
    await page.goto('/');

    const skipLink = page.getByRole('link', { name: /Saltar al contenido principal/i });
    await expect(skipLink).toHaveAttribute('href', '#main-content');
  });
});