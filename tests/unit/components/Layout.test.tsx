import { render, screen } from '@testing-library/react';
import { Container, Section } from '@/components/layout/Container';

describe('Container', () => {
  it('renders children', () => {
    render(<Container>Container content</Container>);
    expect(screen.getByText('Container content')).toBeInTheDocument();
  });

  it('applies max-width and padding', () => {
    render(<Container data-testid="container">Container</Container>);
    const container = screen.getByTestId('container');
    expect(container).toHaveClass('max-w-7xl');
    expect(container).toHaveClass('mx-auto');
    expect(container).toHaveClass('px-4');
  });

  it('applies custom className', () => {
    render(<Container className="custom-class" data-testid="container">Container</Container>);
    const container = screen.getByTestId('container');
    expect(container).toHaveClass('custom-class');
  });
});

describe('Section', () => {
  it('renders children', () => {
    render(<Section>Section content</Section>);
    expect(screen.getByText('Section content')).toBeInTheDocument();
  });

  it('applies vertical padding', () => {
    render(<Section data-testid="section">Section</Section>);
    const section = screen.getByTestId('section');
    expect(section).toHaveClass('py-16');
    expect(section).toHaveClass('sm:py-20');
    expect(section).toHaveClass('lg:py-24');
  });

  it('applies custom className', () => {
    render(<Section className="custom-class" data-testid="section">Section</Section>);
    const section = screen.getByTestId('section');
    expect(section).toHaveClass('custom-class');
  });

  it('applies id when provided', () => {
    render(<Section id="test-section" data-testid="section">Section</Section>);
    const section = screen.getByTestId('section');
    expect(section).toHaveAttribute('id', 'test-section');
  });

  it('applies aria-labelledby when provided', () => {
    render(<Section aria-labelledby="heading" data-testid="section">Section</Section>);
    const section = screen.getByTestId('section');
    expect(section).toHaveAttribute('aria-labelledby', 'heading');
  });
});