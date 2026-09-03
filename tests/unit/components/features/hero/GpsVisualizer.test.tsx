/// <reference types="vitest/globals" />
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

vi.mock('lottie-web', () => ({
  default: {
    loadAnimation: vi.fn(() => ({})),
  },
}));

vi.mock('@/hooks/useReducedMotion');

import { GpsVisualizer } from '@/components/features/hero/GpsVisualizer';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const mockedUseReducedMotion = vi.mocked(useReducedMotion);

describe('GpsVisualizer', () => {
  beforeEach(() => {
    mockedUseReducedMotion.mockReturnValue(false);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders fallback image when reduced motion is true', () => {
    mockedUseReducedMotion.mockReturnValue(true);

    render(
      <GpsVisualizer
        animationUrl="/images/hero-gps-animation.lottie.json"
        fallbackImage="/images/hero-gps-fallback.webp"
        altText="Mapa de rutas logísticas"
      />
    );

    expect(screen.getByAltText('Mapa de rutas logísticas')).toBeInTheDocument();
  });

  it('renders the gps-animation container when reduced motion is false', () => {
    mockedUseReducedMotion.mockReturnValue(false);

    const { container } = render(
      <GpsVisualizer
        animationUrl="/images/hero-gps-animation.lottie.json"
        fallbackImage="/images/hero-gps-fallback.webp"
        altText="Mapa de rutas logísticas"
      />
    );

    expect(container.querySelector('#gps-animation')).toBeInTheDocument();
  });

  it('applies correct alt text', () => {
    mockedUseReducedMotion.mockReturnValue(true);

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
    mockedUseReducedMotion.mockReturnValue(true);

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