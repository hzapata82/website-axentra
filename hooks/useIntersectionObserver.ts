import { useState, useEffect, useRef, RefObject, RefCallback } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export function useIntersectionObserver<T extends Element = Element>(
  options: IntersectionObserverOptions = {}
): [RefCallback<T>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<T | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setRef: RefCallback<T> = (element) => {
    elementRef.current = element;

    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (element) {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry) {
            setIsIntersecting(entry.isIntersecting);
          }
        },
        {
          root: options.root ?? null,
          rootMargin: options.rootMargin ?? '0px',
          threshold: options.threshold ?? 0,
        }
      );

      observerRef.current = observer;
      observer.observe(element);
    }
  };

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return [setRef, isIntersecting];
}