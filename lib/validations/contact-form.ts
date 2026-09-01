import { z } from 'zod';

export const contactFormSchema = z.object({
  email: z.string().email('Formato de email inválido'),
  company: z.string().min(2, 'Nombre de empresa requerido'),
  volume: z.enum(['1-5', '6-20', '21-50', '50+'], {
    required_error: 'Seleccione un rango de volumen',
  }),
  details: z.string().min(10, 'Describa su operación (mínimo 10 caracteres)'),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;