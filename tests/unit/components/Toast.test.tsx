import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Toast, ToastProvider } from '@/components/ui/Toast';

describe('Toast', () => {
  const renderWithProvider = (ui: React.ReactNode) => {
    return render(<ToastProvider>{ui}</ToastProvider>);
  };

  it('renders success toast', () => {
    renderWithProvider(
      <Toast message="Success!" type="success" open onClose={vi.fn()} />
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('bg-green-50');
    expect(screen.getByRole('alert')).toHaveClass('text-green-800');
  });

  it('renders error toast', () => {
    renderWithProvider(
      <Toast message="Error!" type="error" open onClose={vi.fn()} />
    );
    expect(screen.getByRole('alert')).toHaveClass('bg-red-50');
    expect(screen.getByRole('alert')).toHaveClass('text-red-800');
  });

  it('can be dismissed by button click', () => {
    const onClose = vi.fn();
    renderWithProvider(
      <Toast message="Dismiss me" type="success" open onClose={onClose} />
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onClose).toHaveBeenCalled();
  });

  it('can be dismissed by keyboard', () => {
    const onClose = vi.fn();
    renderWithProvider(
      <Toast message="Dismiss me" type="success" open onClose={onClose} />
    );
    const toast = screen.getByRole('alert');
    fireEvent.keyDown(toast, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('does not render when closed', () => {
    renderWithProvider(
      <Toast message="Hidden" type="success" open={false} onClose={vi.fn()} />
    );
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('renders multiple toasts', () => {
    renderWithProvider(
      <>
        <Toast message="First" type="success" open onClose={vi.fn()} />
        <Toast message="Second" type="error" open onClose={vi.fn()} />
      </>
    );
    expect(screen.getAllByRole('alert')).toHaveLength(2);
  });
});