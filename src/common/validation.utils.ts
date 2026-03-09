import { z } from 'zod';

export const commonSchemas = {
  id: z.number().positive('El ID debe ser un número positivo'),
  uuid: z.string().uuid('Formato de UUID inválido'),
  email: z.string().email('Correo electrónico inválido'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Número de teléfono inválido (formato E.164)'),
  rut: z.string().min(8, 'RUT muy corto').max(12, 'RUT muy largo'), // Validación básica de RUT
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Fecha inválida',
  }),
  requiredString: (fieldName: string) => 
    z.string().min(1, `${fieldName} es requerido`),
};

export const paginationSchema = z.object({
  page: z.number().default(1),
  limit: z.number().default(10),
  search: z.string().optional(),
});
