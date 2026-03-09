/**
 * Entidades de la base de datos para el módulo Empresa (snake_case)
 */

export interface RolEmpresaEntity {
  rol_empresa_id: number;
  codigo: string;
  descripcion: string;
}

export interface EmpresaRolEntity {
  empresa_rol_id: number;
  empresa_id: number;
  rol_empresa_id: number;
  fecha_asignacion: string;
}

export interface ContactoEmpresaEntity {
  contacto_empresa_id: number;
  empresa_id: number;
  tipo_contacto_id: number;
  valor_contacto: string;
  descripcion?: string;
  es_principal: boolean;
  fecha_creacion?: string;
}

export interface UbicacionEmpresaEntity {
  ubicacion_empresa_id: number;
  empresa_id: number;
  calle: string;
  numero: string;
  bloque?: string;
  apartamento?: string;
  localidad_id: number;
  fecha_creacion?: string;
}

export interface EmpresaEntity {
  empresa_id: number;
  nombre_comercial: string;
  rut_empresa: string;
  razon_social: string;
  sitio_web?: string;
  giro_actividad_id: number;
  tipo_sociedad_id: number;
  sector_economico_id: number;
  activo: boolean;
  
  // Relaciones
  roles?: EmpresaRolEntity[];
  contactos?: ContactoEmpresaEntity[];
  ubicaciones?: UbicacionEmpresaEntity[];
}
