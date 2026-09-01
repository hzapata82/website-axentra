import { render, screen } from '@testing-library/react';
import { Spinner } from '@/components/ui/Spinner';

describe('Spinner', () => {
  it('renders spinner', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders with custom size', () => {
    render(<Spinner size="lg" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('h-8');
    expect(spinner).toHaveClass('w-8');
  });

  it('renders with custom color', () => {
    render(<Spinner color="white" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('border-white');
  });

  it('has aria-label', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading');
  });

  it('has custom aria-label', () => {
    render(<Spinner ariaLabel="Saving" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Saving');
  });
});