import { renderHook, act } from '@testing-library/react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

function createMockEntry(
  isIntersecting: boolean,
  target: Element
): IntersectionObserverEntry {
  return {
    isIntersecting,
    target,
    boundingClientRect: new DOMRectReadOnly(),
    intersectionRatio: isIntersecting ? 1 : 0,
    intersectionRect: new DOMRectReadOnly(),
    rootBounds: null,
    time: 0,
  } as IntersectionObserverEntry;
}

describe('useIntersectionObserver', () => {
  it('returns false initially', () => {
    const { result } = renderHook(() =>
      useIntersectionObserver({ threshold: 0.1 })
    );
    expect(typeof result.current[0]).toBe('function');
    expect(result.current[1]).toBe(false);
  });

  it('triggers when element enters viewport', () => {
    let observeCallback: IntersectionObserverCallback | null = null;
    const mockObserve = vi.fn();
    const mockUnobserve = vi.fn();

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      value: vi.fn().mockImplementation((callback) => {
        observeCallback = callback;
        return {
          observe: mockObserve,
          unobserve: mockUnobserve,
          disconnect: vi.fn(),
        };
      }),
    });

    const { result } = renderHook(() =>
      useIntersectionObserver({ threshold: 0.1 })
    );
    const [ref] = result.current;

    const element = document.createElement('div');
    ref(element);

    act(() => {
      observeCallback?.([createMockEntry(true, element)]);
    });

    expect(result.current[1]).toBe(true);
  });

  it('returns false when element leaves viewport', () => {
    let observeCallback: IntersectionObserverCallback | null = null;
    const mockObserve = vi.fn();

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      value: vi.fn().mockImplementation((callback) => {
        observeCallback = callback;
        return {
          observe: mockObserve,
          unobserve: vi.fn(),
          disconnect: vi.fn(),
        };
      }),
    });

    const { result } = renderHook(() =>
      useIntersectionObserver({ threshold: 0.1 })
    );
    const [ref] = result.current;

    const element = document.createElement('div');
    ref(element);

    act(() => {
      observeCallback?.([createMockEntry(true, element)]);
    });
    expect(result.current[1]).toBe(true);

    act(() => {
      observeCallback?.([createMockEntry(false, element)]);
    });
    expect(result.current[1]).toBe(false);
  });

  it('unobserves on unmount', () => {
    const mockDisconnect = vi.fn();

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      value: vi.fn().mockImplementation(() => ({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: mockDisconnect,
      })),
    });

    const { result, unmount } = renderHook(() =>
      useIntersectionObserver({ threshold: 0.1 })
    );
    const [ref] = result.current;
    const element = document.createElement('div');
    ref(element);
    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('accepts custom rootMargin and threshold', () => {
    const mockObserve = vi.fn();
    const mockDisconnect = vi.fn();

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      value: vi.fn().mockImplementation((callback, options) => {
        expect(options?.rootMargin).toBe('50px');
        expect(options?.threshold).toBe(0.5);
        return {
          observe: mockObserve,
          unobserve: vi.fn(),
          disconnect: mockDisconnect,
        };
      }),
    });

    renderHook(() =>
      useIntersectionObserver({ rootMargin: '50px', threshold: 0.5 })
    );
  });
});