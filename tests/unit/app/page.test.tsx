import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@/components/features/hero/HeroSection', () => ({
  HeroSection: () => <section id="hero" data-testid="hero-section" />,
}));
vi.mock('@/components/features/value/ValueSection', () => ({
  ValueSection: () => <section id="valor" data-testid="value-section" />,
}));
vi.mock('@/components/features/services/ServicesSection', () => ({
  ServicesSection: () => <section id="servicios" data-testid="services-section" />,
}));
vi.mock('@/components/features/contact/ContactSection', () => ({
  ContactSection: () => <section id="contacto" data-testid="contact-section" />,
}));

import HomePage from '@/app/page';

describe('HomePage', () => {
  it('renders the main landmark', () => {
    render(<HomePage />);
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
  });

  it('renders all four sections in order', () => {
    render(<HomePage />);
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('value-section')).toBeInTheDocument();
    expect(screen.getByTestId('services-section')).toBeInTheDocument();
    expect(screen.getByTestId('contact-section')).toBeInTheDocument();
  });
});