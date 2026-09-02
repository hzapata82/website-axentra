import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ContactForm } from '@/components/features/contact/ContactForm';
import { contactFormConfig } from '@/data/contact-form';

describe('ContactForm', () => {
  it('renders all four form fields with labels', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/correo electr[oó]nico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/empresa/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/volumen/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/detalles|operaci[oó]n/i)).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<ContactForm />);
    expect(screen.getByRole('button', { name: /solicitar|enviar|consulta/i })).toBeInTheDocument();
  });

  it('renders privacy text', () => {
    render(<ContactForm />);
    expect(screen.getByText(contactFormConfig.privacyText)).toBeInTheDocument();
  });

  it('shows validation errors for empty submit', async () => {
    render(<ContactForm />);
    const submit = screen.getByRole('button', { name: /solicitar|enviar|consulta/i });
    fireEvent.click(submit);

    await waitFor(() => {
      expect(screen.getAllByRole('alert').length).toBeGreaterThan(0);
    });
  });
});