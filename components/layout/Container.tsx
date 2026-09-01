import { HTMLAttributes, forwardRef } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

interface SectionProps extends HTMLAttributes<HTMLElement> {}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={`py-16 sm:py-20 lg:py-24 ${className}`}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';