import { z } from 'zod';

/**
 * Esquemas de validación y DTOs sincronizados con el Backend (NestJS/Prisma)
 * Siguiendo estrictamente los nombres de campos del SQL y DTOs del servidor.
 */

export const personaSchema = z.object({
    persona_id: z.number().optional(),
    tipo_identificacion_id: z.number(),
    numero_identificacion: z.string()
        .min(1, 'Número de identificación es requerido')
        .max(50, 'Máximo 50 caracteres'),
    nombres_persona: z.string()
        .min(1, 'Nombres son requeridos')
        .max(255, 'Máximo 255 caracteres'),
    primer_apellido: z.string()
        .min(1, 'Primer apellido es requerido')
        .max(255, 'Máximo 255 caracteres'),
    segundo_apellido: z.string()
        .max(255, 'Máximo 255 caracteres')
        .optional()
        .nullable(),
    fecha_nacimiento: z.string()
        .optional()
        .nullable(),
    nacionalidad_id: z.number()
        .optional()
        .nullable(),
    genero_id: z.number()
        .optional()
        .nullable(),
    estado_civil_id: z.number()
        .optional()
        .nullable(),
    pais_origen_id: z.number()
        .optional()
        .nullable(),
    pais_residencia_id: z.number()
        .optional()
        .nullable(),
    active: z.boolean(),
    
    // Campos extendidos para Contacto y Dirección (se procesan en el submit)
    email: z.string().email('Email inválido').max(255).optional().nullable(),
    telefono: z.string().max(20, 'Máximo 20 caracteres').optional().nullable(),
    calle: z.string().max(255).optional().nullable(),
    numero: z.string().max(50).optional().nullable(),
    localidad_id: z.number().optional().nullable(),
});

export type PersonaDTO = z.infer<typeof personaSchema>;

// DTOs para catálogos
export interface CatalogoDTO {
    id: number;
    descripcion?: string;
    nombre?: string;
    codigo?: string;
}
