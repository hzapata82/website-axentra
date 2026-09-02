import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@/components/features/hero/HeroCTAs', () => ({
  HeroCTAs: ({ ctaPrimary, ctaSecondary }: { ctaPrimary: { label: string }; ctaSecondary: { label: string } }) => (
    <div data-testid="hero-ctas">
      <button>{ctaPrimary.label}</button>
      <button>{ctaSecondary.label}</button>
    </div>
  ),
}));

import { HeroContent } from '@/components/features/hero/HeroContent';
import { heroData } from '@/data/hero';

describe('HeroContent', () => {
  it('renders the H1 with the hero title from data', () => {
    render(<HeroContent />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(heroData.title);
  });

  it('renders the subtitle paragraph', () => {
    render(<HeroContent />);
    expect(screen.getByText(heroData.subtitle)).toBeInTheDocument();
  });

  it('passes ctaPrimary and ctaSecondary data to HeroCTAs', () => {
    render(<HeroContent />);
    expect(screen.getByRole('button', { name: heroData.ctaPrimary.label })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: heroData.ctaSecondary.label })).toBeInTheDocument();
  });
});