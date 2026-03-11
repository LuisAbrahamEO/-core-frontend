import { z } from 'zod';

/**
 * Esquemas de validación y DTOs sincronizados con el Backend (NestJS/Prisma)
 * Siguiendo estrictamente los nombres de campos del SQL y DTOs del servidor.
 */

export const personaSchema = z.object({
    id: z.number().optional(),
    tipoIdentificacionId: z.number(),
    numeroIdentificacion: z.string()
        .min(1, 'Número de identificación es requerido')
        .max(50, 'Máximo 50 caracteres'),
    nombresPersona: z.string()
        .min(1, 'Nombres son requeridos')
        .max(255, 'Máximo 255 caracteres'),
    primerApellido: z.string()
        .min(1, 'Primer apellido es requerido')
        .max(255, 'Máximo 255 caracteres'),
    segundoApellido: z.string()
        .max(255, 'Máximo 255 caracteres')
        .optional()
        .nullable(),
    fechaNacimiento: z.string()
        .optional()
        .nullable(),
    nacionalidadId: z.number()
        .optional()
        .nullable(),
    generoId: z.number()
        .optional()
        .nullable(),
    estadoCivilId: z.number()
        .optional()
        .nullable(),
    paisOrigenId: z.number()
        .optional()
        .nullable(),
    paisResidenciaId: z.number()
        .optional()
        .nullable(),
    active: z.boolean(),
    
    // Campos extendidos para Contacto y Dirección (se procesan en el submit)
    email: z.string().email('Email inválido').max(255).optional().nullable(),
    telefono: z.string().max(20, 'Máximo 20 caracteres').optional().nullable(),
    calle: z.string().max(255).optional().nullable(),
    numero: z.string().max(50).optional().nullable(),
    localidadId: z.number().optional().nullable(),
});

export type PersonaDTO = z.infer<typeof personaSchema>;

// DTOs para catálogos
export interface CatalogoDTO {
    id: number;
    descripcion?: string;
    nombre?: string;
    codigo?: string;
}
