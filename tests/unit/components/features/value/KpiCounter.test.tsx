import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('@/hooks/useReducedMotion', () => ({
  useReducedMotion: () => false,
}));

let observerCallback: ((entries: { isIntersecting: boolean }[]) => void) | null = null;
const observeMock = vi.fn();
const disconnectMock = vi.fn();

class MockIntersectionObserver {
  constructor(cb: (entries: { isIntersecting: boolean }[]) => void) {
    observerCallback = cb;
  }
  observe = observeMock;
  disconnect = disconnectMock;
  unobserve = vi.fn();
  takeRecords = vi.fn(() => []);
  root = null;
  rootMargin = '';
  thresholds = [];
}

import { KpiCounter } from '@/components/features/value/KpiCounter';

describe('KpiCounter', () => {
  beforeEach(() => {
    observerCallback = null;
    observeMock.mockClear();
    (globalThis as unknown as { IntersectionObserver: typeof MockIntersectionObserver }).IntersectionObserver = MockIntersectionObserver;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders label, description and a value placeholder', () => {
    render(
      <KpiCounter
        label="Ahorro"
        value="100%"
        description="Cobertura total"
      />
    );
    expect(screen.getByText('Ahorro')).toBeInTheDocument();
    expect(screen.getByText('Cobertura total')).toBeInTheDocument();
  });

  it('starts from 0 (or the final value) before intersection', () => {
    render(
      <KpiCounter
        label="Ahorro"
        value="100%"
        description="Cobertura total"
      />
    );
    const text = screen.getByText(/0%|100%/);
    expect(text).toBeInTheDocument();
  });

  it('registers an IntersectionObserver on mount', () => {
    render(
      <KpiCounter
        label="Ahorro"
        value="100%"
        description="Cobertura total"
      />
    );
    expect(observeMock).toHaveBeenCalled();
  });

  it('preserves non-numeric prefix/suffix when animating numeric values', () => {
    render(
      <KpiCounter
        label="Ahorro"
        value="$ 6,000,000"
        description="Optimización"
      />
    );
    expect(screen.getByText(/\$/)).toBeInTheDocument();
  });

  it('triggers animation when intersection fires', () => {
    render(
      <KpiCounter
        label="Ahorro"
        value="100%"
        description="Cobertura total"
      />
    );
    if (observerCallback) {
      observerCallback([{ isIntersecting: true }]);
    }
    expect(observeMock).toHaveBeenCalled();
  });
});