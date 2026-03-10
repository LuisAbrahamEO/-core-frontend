import { z } from 'zod';
import { commonSchemas } from '@/src/common/validation.utils';

/**
 * DTOs y Esquemas para el Frontend (camelCase)
 */

export const contactoEmpresaSchema = z.object({
  id: z.number().optional(),
  tipoContactoId: z.number(),
  valor: z.string().min(1, 'Valor de contacto requerido'),
  descripcion: z.string().optional(),
  esPrincipal: z.boolean(),
});

export const ubicacionEmpresaSchema = z.object({
  id: z.number().optional(),
  calle: z.string().min(1, 'Calle requerida'),
  numero: z.string().min(1, 'Número requerido'),
  bloque: z.string().optional(),
  apartamento: z.string().optional(),
  localidadId: z.number().positive('Localidad requerida'),
});

export const empresaSchema = z.object({
  id: z.number().optional(),
  nombreComercial: z.string().min(1, 'Nombre comercial requerido'),
  rut: commonSchemas.rut,
  razonSocial: z.string().min(1, 'Razón social requerida'),
  sitioWeb: z.string().url('URL inválida').optional().or(z.literal('')),
  giroActividadId: z.number(),
  tipoSociedadId: z.number(),
  sectorEconomicoId: z.number(),
  activo: z.boolean(),
  
  contactos: z.array(contactoEmpresaSchema),
  ubicaciones: z.array(ubicacionEmpresaSchema),
  rolesIds: z.array(z.number()),
});

export type ContactoEmpresaDTO = z.infer<typeof contactoEmpresaSchema>;
export type UbicacionEmpresaDTO = z.infer<typeof ubicacionEmpresaSchema>;
export type EmpresaDTO = z.infer<typeof empresaSchema>;
