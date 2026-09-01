import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { HeroCTAs } from '@/components/features/hero/HeroCTAs';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

// Mock the hook
const mockSmoothScroll = vi.fn();

vi.mock('@/hooks/useSmoothScroll', () => ({
  useSmoothScroll: () => mockSmoothScroll,
}));

describe('HeroCTAs', () => {
  beforeEach(() => {
    mockSmoothScroll.mockClear();
    vi.clearAllMocks();

    // Create target elements in DOM
    const contactoElement = document.createElement('div');
    contactoElement.id = 'contacto';
    contactoElement.focus = vi.fn();
    document.body.appendChild(contactoElement);

    const valorElement = document.createElement('div');
    valorElement.id = 'valor';
    valorElement.focus = vi.fn();
    document.body.appendChild(valorElement);
  });

  afterEach(() => {
    vi.clearAllMocks();
    document.getElementById('contacto')?.remove();
    document.getElementById('valor')?.remove();
  });

  it('renders both CTA buttons', () => {
    render(<HeroCTAs ctaPrimary={{ label: 'Primary', href: '#contacto' }} ctaSecondary={{ label: 'Secondary', href: '#valor' }} />);
    expect(screen.getByRole('button', { name: 'Primary' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Secondary' })).toBeInTheDocument();
  });

  it('calls smooth scroll on primary CTA click', () => {
    render(<HeroCTAs ctaPrimary={{ label: 'Primary', href: '#contacto' }} ctaSecondary={{ label: 'Secondary', href: '#valor' }} />);
    fireEvent.click(screen.getByRole('button', { name: 'Primary' }));
    expect(mockSmoothScroll).toHaveBeenCalledWith(document.getElementById('contacto'));
  });

  it('calls smooth scroll on secondary CTA click', () => {
    render(<HeroCTAs ctaPrimary={{ label: 'Primary', href: '#contacto' }} ctaSecondary={{ label: 'Secondary', href: '#valor' }} />);
    fireEvent.click(screen.getByRole('button', { name: 'Secondary' }));
    expect(mockSmoothScroll).toHaveBeenCalledWith(document.getElementById('valor'));
  });

  it('applies primary variant to primary CTA', () => {
    render(<HeroCTAs ctaPrimary={{ label: 'Primary', href: '#contacto' }} ctaSecondary={{ label: 'Secondary', href: '#valor' }} />);
    const primaryBtn = screen.getByRole('button', { name: 'Primary' });
    expect(primaryBtn).toHaveClass('bg-accent-blue');
  });

  it('applies secondary variant to secondary CTA', () => {
    render(<HeroCTAs ctaPrimary={{ label: 'Primary', href: '#contacto' }} ctaSecondary={{ label: 'Secondary', href: '#valor' }} />);
    const secondaryBtn = screen.getByRole('button', { name: 'Secondary' });
    expect(secondaryBtn).toHaveClass('border-slate-border');
  });

  it('focuses target element after scroll', async () => {
    render(<HeroCTAs ctaPrimary={{ label: 'Primary', href: '#contacto' }} ctaSecondary={{ label: 'Secondary', href: '#valor' }} />);
    fireEvent.click(screen.getByRole('button', { name: 'Primary' }));

    await waitFor(() => {
      expect(document.getElementById('contacto')?.focus).toHaveBeenCalled();
    });
  });
});