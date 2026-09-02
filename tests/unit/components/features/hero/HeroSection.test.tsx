import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@/components/features/hero/HeroContent', () => ({
  HeroContent: () => (
    <div data-testid="hero-content">
      <h1 id="hero-heading">COMANDA TU CARGA</h1>
    </div>
  ),
}));

vi.mock('@/components/features/hero/GpsVisualizer', () => ({
  GpsVisualizer: ({ altText }: { altText: string }) => (
    <div data-testid="gps-visualizer" data-alt={altText} />
  ),
}));

import { HeroSection } from '@/components/features/hero/HeroSection';

describe('HeroSection', () => {
  it('renders HeroContent', () => {
    render(<HeroSection />);
    expect(screen.getByTestId('hero-content')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'COMANDA TU CARGA' })).toBeInTheDocument();
  });

  it('renders GpsVisualizer with alt text from data', () => {
    render(<HeroSection />);
    const visualizer = screen.getByTestId('gps-visualizer');
    expect(visualizer).toBeInTheDocument();
    expect(visualizer.getAttribute('data-alt')).toMatch(/Mapa de rutas logísticas Axentra Cargo México-Estados Unidos/);
  });

  it('has hero section landmark with id #hero and labelled by heading', () => {
    render(<HeroSection />);
    const section = screen.getByRole('region', { name: /COMANDA TU CARGA/i });
    expect(section).toHaveAttribute('id', 'hero');
    expect(section).toHaveAttribute('aria-labelledby', 'hero-heading');
  });
});