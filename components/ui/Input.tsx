import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  id: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = '', disabled, required, ...props }, ref) => {
    const errorId = error ? `${id}-error` : undefined;
    const describedBy = errorId ? [errorId, props['aria-describedby']].filter(Boolean).join(' ') : props['aria-describedby'];

    return (
      <div className="w-full">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-navy mb-1.5"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          className={`
            w-full px-3 py-2
            border rounded-lg
            bg-white text-navy placeholder-slate-light
            focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent
            disabled:bg-slate-border/30 disabled:cursor-not-allowed
            transition-colors
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-border'}
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={describedBy}
          disabled={disabled}
          required={required}
          {...props}
        />
        {error && (
          <p
            id={errorId}
            className="mt-1.5 text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  id: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, className = '', disabled, required, ...props }, ref) => {
    const errorId = error ? `${id}-error` : undefined;
    const describedBy = errorId ? [errorId, props['aria-describedby']].filter(Boolean).join(' ') : props['aria-describedby'];

    return (
      <div className="w-full">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-navy mb-1.5"
        >
          {label}
        </label>
        <textarea
          ref={ref}
          id={id}
          className={`
            w-full px-3 py-2
            border rounded-lg
            bg-white text-navy placeholder-slate-light
            focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent
            disabled:bg-slate-border/30 disabled:cursor-not-allowed
            transition-colors
            resize-y min-h-[100px]
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-border'}
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={describedBy}
          disabled={disabled}
          required={required}
          {...props}
        />
        {error && (
          <p
            id={errorId}
            className="mt-1.5 text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  id: string;
  options: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, id, options, className = '', disabled, required, ...props }, ref) => {
    const errorId = error ? `${id}-error` : undefined;
    const describedBy = errorId ? [errorId, props['aria-describedby']].filter(Boolean).join(' ') : props['aria-describedby'];

    return (
      <div className="w-full">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-navy mb-1.5"
        >
          {label}
        </label>
        <select
          ref={ref}
          id={id}
          className={`
            w-full px-3 py-2
            border rounded-lg
            bg-white text-navy
            focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent
            disabled:bg-slate-border/30 disabled:cursor-not-allowed
            transition-colors
            appearance-none
            bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236C7A89' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")] bg-[length:1.5rem_1.5rem] bg-[right_0.5rem_center] bg-no-repeat pr-10
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-border'}
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={describedBy}
          disabled={disabled}
          required={required}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p
            id={errorId}
            className="mt-1.5 text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';