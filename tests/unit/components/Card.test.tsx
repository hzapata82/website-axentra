import { render, screen } from '@testing-library/react';
import { Card } from '@/components/ui/Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies base styles', () => {
    render(<Card data-testid="card">Card</Card>);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('border');
    expect(card).toHaveClass('border-slate-border');
    expect(card).toHaveClass('rounded-lg');
    expect(card).toHaveClass('shadow-sm');
  });

  it('applies hover elevation', () => {
    render(<Card data-testid="card">Card</Card>);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('hover:shadow-md');
  });

  it('applies focus-visible-ring when interactive', () => {
    render(<Card interactive data-testid="card">Card</Card>);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('focus-visible-ring');
  });

  it('does not apply focus-visible-ring when not interactive', () => {
    render(<Card data-testid="card">Card</Card>);
    const card = screen.getByTestId('card');
    expect(card).not.toHaveClass('focus-visible-ring');
  });

  it('applies custom className', () => {
    render(<Card className="custom-class" data-testid="card">Card</Card>);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('custom-class');
  });
});