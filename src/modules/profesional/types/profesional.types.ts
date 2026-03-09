/**
 * Entidades de tablas maestras y auxiliares (snake_case)
 */

export interface EstadoProfesionalEntity {
  rrhh_estado_profesional_id: number;
  codigo: string;
  descripcion: string;
}

export interface TipoContratoEntity {
  rrhh_tipo_contrato_id: number;
  nombre: string;
  descripcion: string;
  activo: boolean;
}

export interface ProfesionalCargoEntity {
  profesional_cargo_id: number;
  nombre_cargo: string;
  descripcion: string;
  activo: boolean;
}

export interface PrevisionSaludEntity {
  rrhh_prevision_salud_id: number;
  nombre: string;
  tipo: string;
  activo: boolean;
}

export interface AfpEntity {
  rrhh_afp_id: number;
  nombre: string;
  activo: boolean;
}

export interface CajaCompensacionEntity {
  rrhh_caja_compensacion_id: number;
  nombre: string;
  activo: boolean;
}

export interface ProfesionalCvEntity {
  profesional_link_cv_id: number;
  link_cv: string;
}

/**
 * Entidad Principal Profesional (snake_case)
 */
export interface ProfesionalEntity {
  profesional_id: number;
  fecha_ingreso: string;
  fecha_termino?: string;
  rrhh_estado_profesional_id: number;
  tipo_contrato_id: number;
  profesional_cargo_id: number;
  profesional_area_id: number;
  profesional_jefatura_id?: number;
  profesional_link_cv_id?: number;
  rrhh_prevision_salud_id: number;
  rrhh_afp_id: number;
  rrhh_caja_compensacion_id: number;
  empresa_id: number;
  activo: boolean;
  
  // Relaciones cargadas (opcionales para el mapper)
  estado?: EstadoProfesionalEntity;
  cargo?: ProfesionalCargoEntity;
  tipo_contrato?: TipoContratoEntity;
  afp?: AfpEntity;
  prevision?: PrevisionSaludEntity;
  caja?: CajaCompensacionEntity;
  cv?: ProfesionalCvEntity;
}
