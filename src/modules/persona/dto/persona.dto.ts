import { z } from 'zod';
import { commonSchemas } from '@/src/common/validation.utils';

/**
 * Esquemas de validación y DTOs para el Frontend (camelCase)
 */

export const contactoSchema = z.object({
  id: z.number().optional(),
  tipoContactoId: z.number(),
  ambitoContactoId: z.number(),
  valor: z.string().min(1, 'El valor de contacto es requerido'),
  esPrincipal: z.boolean().default(false),
  activo: z.boolean().default(true),
});

export const direccionSchema = z.object({
  id: z.number().optional(),
  tipoDireccionId: z.number(),
  calle: z.string().min(1, 'La calle es requerida'),
  numero: z.string().min(1, 'El número es requerido'),
  bloque: z.string().optional(),
  apartamento: z.string().optional(),
  localidadId: z.number(),
});

export const personaSchema = z.object({
  id: z.number().optional(),
  tipoIdentificacionId: z.number(),
  numeroIdentificacion: z.string().min(1, 'Número de identificación requerido'),
  nombres: z.string().min(1, 'Nombres requeridos'),
  apellidos: z.string().min(1, 'Apellidos requeridos'),
  fechaNacimiento: commonSchemas.date,
  nacionalidadId: z.number(),
  generoId: z.number(),
  estadoCivilId: z.number(),
  activo: z.boolean().default(true),
  contactos: z.array(contactoSchema).default([]),
  direcciones: z.array(direccionSchema).default([]),
});

export type ContactoDTO = z.infer<typeof contactoSchema>;
export type DireccionDTO = z.infer<typeof direccionSchema>;
export type PersonaDTO = z.infer<typeof personaSchema>;
