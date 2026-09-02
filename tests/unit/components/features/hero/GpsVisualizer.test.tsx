/// <reference types="vitest/globals" />
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { vi } from 'vitest';
import { GpsVisualizer } from '@/components/features/hero/GpsVisualizer';
import { useReducedMotion } from '@/hooks/useReducedMotion';

vi.mock('@/hooks/useReducedMotion');

describe('GpsVisualizer', () => {
  const mockReducedMotion = vi.fn();

  beforeEach(() => {
    (useReducedMotion as vi.Mock).mockReturnValue(mockReducedMotion);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders fallback image when reduced motion is true', () => {
    mockReducedMotion.mockReturnValue(true);

    render(
      <GpsVisualizer
        animationUrl="/images/hero-gps-animation.lottie.json"
        fallbackImage="/images/hero-gps-fallback.webp"
        altText="Mapa de rutas logísticas"
      />
    );

    expect(screen.getByAltText('Mapa de rutas logísticas')).toBeInTheDocument();
    expect(screen.getByAltText('Mapa de rutas logísticas')).toHaveAttribute(
      'src',
      expect.stringContaining('hero-gps-fallback.webp')
    );
  });

  it('renders fallback image when animation fails to load', async () => {
    mockReducedMotion.mockReturnValue(false);

    // Mock Image constructor to simulate load error
    const originalImage = global.Image;
    global.Image = vi.fn().mockImplementation(() => {
      setTimeout(() => {
        const img = { onerror: null, onload: null, src: '' };
        if (img.onerror) img.onerror(new Error('Failed to load'));
        return img;
      }, 0);
      return { onerror: null, onload: null, src: '' };
    });

    render(
      <GpsVisualizer
        animationUrl="/images/hero-gps-animation.lottie.json"
        fallbackImage="/images/hero-gps-fallback.webp"
        altText="Mapa de rutas logísticas"
      />
    );

    await waitFor(() => {
      expect(screen.getByAltText('Mapa de rutas logísticas')).toHaveAttribute(
        'src',
        expect.stringContaining('hero-gps-fallback.webp')
      );
    });

    global.Image = originalImage;
  });

  it('applies correct alt text', () => {
    mockReducedMotion.mockReturnValue(true);

    render(
      <GpsVisualizer
        animationUrl="/images/hero-gps-animation.lottie.json"
        fallbackImage="/images/hero-gps-fallback.webp"
        altText="Custom alt text"
      />
    );

    expect(screen.getByAltText('Custom alt text')).toBeInTheDocument();
  });

  it('applies fetchpriority high to fallback image', () => {
    mockReducedMotion.mockReturnValue(true);

    render(
      <GpsVisualizer
        animationUrl="/images/hero-gps-animation.lottie.json"
        fallbackImage="/images/hero-gps-fallback.webp"
        altText="Mapa de rutas logísticas"
      />
    );

    const img = screen.getByAltText('Mapa de rutas logísticas');
    expect(img).toHaveAttribute('fetchpriority', 'high');
  });
});