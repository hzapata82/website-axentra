import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@/components/features/value/KpiCallouts', () => ({
  KpiCallouts: ({ kpis }: { kpis: { label: string; value: string; description: string }[] }) => (
    <div data-testid="kpi-callouts">
      {kpis.map((kpi, idx) => (
        <article key={idx} data-testid={`kpi-${idx}`}>
          <p>{kpi.label}</p>
          <p>{kpi.value}</p>
          <p>{kpi.description}</p>
        </article>
      ))}
    </div>
  ),
}));

import { SavingsBlock } from '@/components/features/value/SavingsBlock';
import { kpisData } from '@/data/kpis';

describe('SavingsBlock', () => {
  it('renders the section heading', () => {
    render(<SavingsBlock />);
    expect(screen.getByRole('heading', { level: 2, name: /Arquitectura de Ahorro Operativo/i })).toBeInTheDocument();
  });

  it('renders descriptive text', () => {
    render(<SavingsBlock />);
    expect(screen.getByText(/Arquitectura logística/i)).toBeInTheDocument();
  });

  it('passes kpisData to KpiCallouts', () => {
    render(<SavingsBlock />);
    expect(screen.getByTestId('kpi-callouts')).toBeInTheDocument();
    const [first, second] = kpisData;
    expect(screen.getByText(first!.label)).toBeInTheDocument();
    expect(screen.getByText(second!.label)).toBeInTheDocument();
  });
});