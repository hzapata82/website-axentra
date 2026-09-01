import { SVGAttributes } from 'react';

type SpinnerSize = 'sm' | 'md' | 'lg';
type SpinnerColor = 'navy' | 'white' | 'accent-blue';

interface SpinnerProps extends SVGAttributes<SVGSVGElement> {
  size?: SpinnerSize;
  color?: SpinnerColor;
  ariaLabel?: string;
}

const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
};

const colorClasses: Record<SpinnerColor, string> = {
  navy: 'border-navy border-t-transparent',
  white: 'border-white border-t-transparent',
  'accent-blue': 'border-accent-blue border-t-transparent',
};

export function Spinner({ size = 'md', color = 'navy', ariaLabel = 'Loading', className = '', ...props }: SpinnerProps) {
  return (
    <svg
      role="status"
      aria-label={ariaLabel}
      className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}