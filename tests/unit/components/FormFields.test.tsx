import { render, screen, fireEvent } from '@testing-library/react';
import { Input, Textarea, Select } from '@/components/ui/Input';

describe('Input', () => {
  it('renders with label', () => {
    render(<Input label="Email" id="email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('shows error message with aria-invalid', () => {
    render(<Input label="Email" id="email" error="Invalid email" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('applies required attribute', () => {
    render(<Input label="Email" id="email" required />);
    expect(screen.getByLabelText('Email')).toBeRequired();
  });

  it('applies disabled state', () => {
    render(<Input label="Email" id="email" disabled />);
    expect(screen.getByLabelText('Email')).toBeDisabled();
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Input label="Email" id="email" ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('calls onChange handler', () => {
    const handleChange = vi.fn();
    render(<Input label="Email" id="email" onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalled();
  });
});

describe('Textarea', () => {
  it('renders with label', () => {
    render(<Textarea label="Details" id="details" />);
    expect(screen.getByLabelText('Details')).toBeInTheDocument();
  });

  it('shows error message with aria-invalid', () => {
    render(<Textarea label="Details" id="details" error="Too short" />);
    const textarea = screen.getByLabelText('Details');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Too short')).toBeInTheDocument();
  });

  it('applies required attribute', () => {
    render(<Textarea label="Details" id="details" required />);
    expect(screen.getByLabelText('Details')).toBeRequired();
  });

  it('applies disabled state', () => {
    render(<Textarea label="Details" id="details" disabled />);
    expect(screen.getByLabelText('Details')).toBeDisabled();
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Textarea label="Details" id="details" ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});

describe('Select', () => {
  const options = [
    { value: '1-5', label: '1 - 5 TEUs/FEUs' },
    { value: '6-20', label: '6 - 20 TEUs/FEUs' },
  ];

  it('renders with label', () => {
    render(<Select label="Volume" id="volume" options={options} />);
    expect(screen.getByLabelText('Volume')).toBeInTheDocument();
  });

  it('renders options', () => {
    render(<Select label="Volume" id="volume" options={options} />);
    expect(screen.getByRole('option', { name: '1 - 5 TEUs/FEUs' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '6 - 20 TEUs/FEUs' })).toBeInTheDocument();
  });

  it('shows error message with aria-invalid', () => {
    render(<Select label="Volume" id="volume" options={options} error="Required" />);
    const select = screen.getByLabelText('Volume');
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('applies required attribute', () => {
    render(<Select label="Volume" id="volume" options={options} required />);
    expect(screen.getByLabelText('Volume')).toBeRequired();
  });

  it('applies disabled state', () => {
    render(<Select label="Volume" id="volume" options={options} disabled />);
    expect(screen.getByLabelText('Volume')).toBeDisabled();
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Select label="Volume" id="volume" options={options} ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('calls onChange handler', () => {
    const handleChange = vi.fn();
    render(<Select label="Volume" id="volume" options={options} onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText('Volume'), { target: { value: '6-20' } });
    expect(handleChange).toHaveBeenCalled();
  });
});