'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormInput } from '@/lib/validations/contact-form';
import { contactFormConfig } from '@/data/contact-form';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (_data: ContactFormInput) => {
    setStatus('submitting');
    setServerError(null);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(_data),
      });
      if (!res.ok) {
        throw new Error('server-error');
      }
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
      setServerError(contactFormConfig.errorMessage);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
      aria-label="Formulario de contacto"
    >
      <Input
        id="email"
        label="Correo electrónico"
        type="email"
        autoComplete="email"
        required
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        id="company"
        label="Nombre de empresa"
        type="text"
        autoComplete="organization"
        required
        error={errors.company?.message}
        {...register('company')}
      />
      <Select
        id="volume"
        label="Volumen semanal"
        required
        defaultValue=""
        error={errors.volume?.message}
        {...register('volume')}
        options={[
          { value: '', label: 'Selecciona un rango' },
          ...contactFormConfig.volumeOptions,
        ]}
      />
      <Textarea
        id="details"
        label="Detalles de la operación"
        rows={4}
        required
        error={errors.details?.message}
        {...register('details')}
      />

      <p className="text-xs text-slate-light">{contactFormConfig.privacyText}</p>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting || status === 'submitting'}
        className="w-full"
      >
        {status === 'submitting' ? 'ENVIANDO…' : 'SOLICITAR CONSULTA GRATUITA Y EVALUACIÓN'}
      </Button>

      {status === 'success' && (
        <div
          role="status"
          className="rounded-md border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-emerald-300"
        >
          {contactFormConfig.successMessage}
        </div>
      )}

      {status === 'error' && serverError && (
        <div
          role="alert"
          className="rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300"
        >
          {serverError}
        </div>
      )}
    </form>
  );
}