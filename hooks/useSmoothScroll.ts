import { useReducedMotion } from './useReducedMotion';

interface ScrollOptions extends ScrollIntoViewOptions {}

export function useSmoothScroll() {
  const prefersReducedMotion = useReducedMotion();

  return (element: Element | null, options?: ScrollOptions) => {
    if (!element) return;

    const behavior = prefersReducedMotion ? 'auto' : 'smooth';

    element.scrollIntoView({
      behavior,
      block: options?.block ?? 'start',
      inline: options?.inline ?? 'nearest',
    });
  };
}