/**
 * Representación exacta de las tablas en la base de datos (snake_case)
 */

export interface ContactoEntity {
  contacto_persona_id: number;
  persona_id: number;
  tipo_contacto_id: number;
  ambito_contacto_id: number;
  valor_contacto: string;
  principal: boolean;
  activo: boolean;
  fecha_creacion?: string;
  fecha_actualizacion?: string;
}

export interface DireccionPersonaEntity {
  direccion_persona_id: number;
  persona_id: number;
  tipo_direccion_id: number;
  calle: string;
  numero: string;
  bloque?: string;
  apartamento?: string;
  localidad_id: number;
  fecha_creacion?: string;
  fecha_actualizacion?: string;
}

export interface PersonaEntity {
  persona_id: number;
  tipo_identificacion_id: number;
  numero_identificacion: string;
  nombres_persona: string;
  primer_apellido: string;
  segundo_apellido?: string;
  fecha_nacimiento?: string;
  nacionalidad_id?: number;
  genero_id?: number;
  estado_civil_id?: number;
  pais_origen_id?: number;
  pais_residencia_id?: number;
  active: boolean;
  fecha_creacion?: string;
  fecha_actualizacion?: string;
  created_by?: string;
  updated_by?: string;
}
