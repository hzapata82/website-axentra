import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error';
  duration?: number;
}

interface ToastContextType {
  showToast: (_message: string, _type: 'success' | 'error', _duration?: number) => void;
  hideToast: (_id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'error', duration = 5000) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  const hideToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2" role="region" aria-label="Notifications">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={hideToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

interface ToastItemProps {
  toast: Toast;
  onClose: (_id: string) => void;
}

function ToastItem({ toast, onClose }: ToastItemProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, toast.duration);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  const typeStyles = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
  };

  return (
    <div
      className={`
        flex items-center gap-3 p-4 rounded-lg border shadow-lg
        min-w-[300px] max-w-md
        animate-slide-up
        ${typeStyles[toast.type]}
      `}
      role="alert"
      aria-live="polite"
      onKeyDown={(e) => e.key === 'Escape' && onClose(toast.id)}
      tabIndex={0}
    >
      <svg
        className="flex-shrink-0 h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        {toast.type === 'success' ? (
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        ) : (
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        )}
      </svg>
      <p className="text-sm font-medium flex-1">{toast.message}</p>
      <button
        onClick={() => onClose(toast.id)}
        className="flex-shrink-0 p-1 hover:opacity-70 transition-opacity"
        aria-label="Dismiss"
      >
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
        </svg>
      </button>
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export interface ToastProps {
  message: string;
  type: 'success' | 'error';
  open: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type, open, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [open, onClose, duration]);

  if (!open) return null;

  const typeStyles = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
  };

  return (
    <div
      className={`
        fixed bottom-4 right-4 z-50 flex items-center gap-3 p-4 rounded-lg border shadow-lg
        min-w-[300px] max-w-md
        animate-slide-up
        ${typeStyles[type]}
      `}
      role="alert"
      aria-live="polite"
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
      tabIndex={0}
    >
      <svg
        className="flex-shrink-0 h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        {type === 'success' ? (
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        ) : (
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        )}
      </svg>
      <p className="text-sm font-medium flex-1">{message}</p>
      <button
        onClick={onClose}
        className="flex-shrink-0 p-1 hover:opacity-70 transition-opacity"
        aria-label="Dismiss"
      >
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 11-1.414 1.414L10 10.414l-4.293 4.293a1 1 0 01-1.414-1.414L5.586 10 4.293 8.587a1 1 0 010-1.414z" />
        </svg>
      </button>
    </div>
  );
}