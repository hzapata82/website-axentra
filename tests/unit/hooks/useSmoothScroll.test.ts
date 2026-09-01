import { renderHook, act } from '@testing-library/react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

describe('useSmoothScroll', () => {
  const setupMatchMedia = (matches: boolean) => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(() => ({
        matches,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });
  };

  beforeEach(() => {
    setupMatchMedia(false);
  });

  it('returns a function', () => {
    const { result } = renderHook(() => useSmoothScroll());
    expect(typeof result.current).toBe('function');
  });

  it('scrolls to element with smooth behavior by default', () => {
    const { result } = renderHook(() => useSmoothScroll());
    const element = document.createElement('div');
    element.id = 'test-target';
    document.body.appendChild(element);

    const scrollIntoViewSpy = vi.spyOn(element, 'scrollIntoView');

    act(() => {
      result.current(element);
    });

    expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start', inline: 'nearest' });

    document.body.removeChild(element);
    scrollIntoViewSpy.mockRestore();
  });

  it('scrolls instantly when reduced motion is preferred', () => {
    setupMatchMedia(true);

    const { result } = renderHook(() => useSmoothScroll());
    const element = document.createElement('div');
    element.id = 'test-target';
    document.body.appendChild(element);

    const scrollIntoViewSpy = vi.spyOn(element, 'scrollIntoView');

    act(() => {
      result.current(element);
    });

    expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: 'auto', block: 'start', inline: 'nearest' });

    document.body.removeChild(element);
    scrollIntoViewSpy.mockRestore();
  });

  it('accepts custom options', () => {
    const { result } = renderHook(() => useSmoothScroll());
    const element = document.createElement('div');
    document.body.appendChild(element);

    const scrollIntoViewSpy = vi.spyOn(element, 'scrollIntoView');

    act(() => {
      result.current(element, { block: 'center', inline: 'nearest' });
    });

    expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center', inline: 'nearest' });

    document.body.removeChild(element);
    scrollIntoViewSpy.mockRestore();
  });

  it('handles null element gracefully', () => {
    const { result } = renderHook(() => useSmoothScroll());

    act(() => {
      result.current(null);
    });

    // Should not throw
    expect(true).toBe(true);
  });
});