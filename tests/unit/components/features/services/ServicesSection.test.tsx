import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@/components/features/services/ServiceCard', () => ({
  ServiceCard: ({ title, number }: { title: string; number: string }) => (
    <article data-testid="service-card" data-number={number}>
      <span>{number}</span>
      <h3>{title}</h3>
    </article>
  ),
}));

import { ServicesSection } from '@/components/features/services/ServicesSection';
import { servicesData } from '@/data/services';

describe('ServicesSection', () => {
  it('renders the section heading', () => {
    render(<ServicesSection />);
    expect(
      screen.getByRole('heading', { level: 2, name: /Capacidades Logísticas|Grid de Servicios| Nuestros Servicios/i })
    ).toBeInTheDocument();
  });

  it('renders exactly 5 service cards from data', () => {
    render(<ServicesSection />);
    const cards = screen.getAllByTestId('service-card');
    expect(cards).toHaveLength(servicesData.length);
    expect(cards).toHaveLength(5);
  });

  it('renders cards for each service title from data', () => {
    render(<ServicesSection />);
    servicesData.forEach((service) => {
      expect(screen.getByRole('heading', { level: 3, name: service.title })).toBeInTheDocument();
    });
  });
});