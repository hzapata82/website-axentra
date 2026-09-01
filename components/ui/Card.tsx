import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, interactive = false, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          border border-slate-border
          rounded-lg
          bg-white
          shadow-sm
          hover:shadow-md
          transition-shadow duration-200
          ${interactive ? 'focus-visible-ring cursor-pointer' : ''}
          ${className}
        `}
        tabIndex={interactive ? 0 : undefined}
        role={interactive ? 'button' : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';