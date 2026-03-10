import { z } from 'zod';
import { commonSchemas } from '@/src/common/validation.utils';

/**
 * DTOs para el Frontend (camelCase)
 */

export const profesionalSchema = z.object({
  id: z.number().optional(),
  personaId: z.number().positive('Debe estar asociado a una persona'),
  empresaId: z.number().positive('Debe estar asociado a una empresa'),
  fechaIngreso: commonSchemas.date,
  fechaTermino: z.string().optional().nullable(),
  estadoId: z.number(),
  tipoContratoId: z.number(),
  cargoId: z.number(),
  areaId: z.number(),
  jefaturaId: z.number().optional().nullable(),
  cvId: z.number().optional().nullable(),
  previsionSaludId: z.number(),
  afpId: z.number(),
  cajaCompensacionId: z.number(),
  activo: z.boolean(),
  
  // Descriptores legibles (solo lectura para UI)
  estadoDescripcion: z.string().optional(),
  cargoNombre: z.string().optional(),
  tipoContratoNombre: z.string().optional(),
  afpNombre: z.string().optional(),
  previsionNombre: z.string().optional(),
  cvLink: z.string().optional(),
});

export type ProfesionalDTO = z.infer<typeof profesionalSchema>;
