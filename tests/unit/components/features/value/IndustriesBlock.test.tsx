import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@/components/features/value/IndustryCard', () => ({
  IndustryCard: ({ name }: { name: string }) => (
    <article data-testid="industry-card" data-name={name}>
      {name}
    </article>
  ),
}));

import { IndustriesBlock } from '@/components/features/value/IndustriesBlock';
import { industriesData } from '@/data/industries';

describe('IndustriesBlock', () => {
  it('renders the section heading', () => {
    render(<IndustriesBlock />);
    expect(
      screen.getByRole('heading', { level: 2, name: /Industrias que Movemos/i })
    ).toBeInTheDocument();
  });

  it('renders exactly 6 industry cards from data', () => {
    render(<IndustriesBlock />);
    const cards = screen.getAllByTestId('industry-card');
    expect(cards).toHaveLength(industriesData.length);
    expect(cards).toHaveLength(6);
  });

  it('renders cards for each industry name from data', () => {
    render(<IndustriesBlock />);
    industriesData.forEach((industry) => {
      expect(screen.getByText(industry.name)).toBeInTheDocument();
    });
  });
});