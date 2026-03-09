import { BaseMapper } from '@/src/common/base.mapper';
import { ProfesionalEntity } from '../types/profesional.types';
import { ProfesionalDTO } from '../dto/profesional.dto';

export class ProfesionalMapper implements BaseMapper<ProfesionalEntity, ProfesionalDTO> {
  
  toDTO(entity: ProfesionalEntity): ProfesionalDTO {
    return {
      id: entity.profesional_id,
      personaId: entity.profesional_id, // Asumiendo relación 1:1 con Persona
      empresaId: entity.empresa_id,
      fechaIngreso: entity.fecha_ingreso,
      fechaTermino: entity.fecha_termino,
      estadoId: entity.rrhh_estado_profesional_id,
      tipoContratoId: entity.tipo_contrato_id,
      cargoId: entity.profesional_cargo_id,
      areaId: entity.profesional_area_id,
      jefaturaId: entity.profesional_jefatura_id,
      cvId: entity.profesional_link_cv_id,
      previsionSaludId: entity.rrhh_prevision_salud_id,
      afpId: entity.rrhh_afp_id,
      cajaCompensacionId: entity.rrhh_caja_compensacion_id,
      activo: entity.activo,
      
      // Mapeo de descriptores legibles desde relaciones
      estadoDescripcion: entity.estado?.descripcion,
      cargoNombre: entity.cargo?.nombre_cargo,
      tipoContratoNombre: entity.tipo_contrato?.nombre,
      afpNombre: entity.afp?.nombre,
      previsionNombre: entity.prevision?.nombre,
      cvLink: entity.cv?.link_cv,
    };
  }

  toEntity(dto: ProfesionalDTO): ProfesionalEntity {
    return {
      profesional_id: dto.id || dto.personaId || 0,
      fecha_ingreso: dto.fechaIngreso,
      fecha_termino: dto.fechaTermino || undefined,
      rrhh_estado_profesional_id: dto.estadoId,
      tipo_contrato_id: dto.tipoContratoId,
      profesional_cargo_id: dto.cargoId,
      profesional_area_id: dto.areaId,
      profesional_jefatura_id: dto.jefaturaId || undefined,
      profesional_link_cv_id: dto.cvId || undefined,
      rrhh_prevision_salud_id: dto.previsionSaludId,
      rrhh_afp_id: dto.afpId,
      rrhh_caja_compensacion_id: dto.cajaCompensacionId,
      empresa_id: dto.empresaId,
      activo: dto.activo,
    };
  }
}

export const profesionalMapper = new ProfesionalMapper();
