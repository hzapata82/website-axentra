import type { ContactFormConfig } from '@/types/contact-form';

export const contactFormConfig: ContactFormConfig = {
  volumeOptions: [
    { value: '1-5', label: '1 - 5 TEUs/FEUs' },
    { value: '6-20', label: '6 - 20 TEUs/FEUs' },
    { value: '21-50', label: '21 - 50 TEUs/FEUs' },
    { value: '50+', label: '+50 TEUs/FEUs' },
  ],
  privacyText: 'Tus datos están protegidos bajo estricto acuerdo de confidencialidad industrial.',
  successMessage: 'Solicitud recibida. Nuestro equipo le contactará en <24h',
  errorMessage: 'Error temporal. Intente nuevamente o escríbanos a ventas@axentracargo.com',
};