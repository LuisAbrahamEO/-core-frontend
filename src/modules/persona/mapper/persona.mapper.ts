import { BaseMapper } from '@/src/common/base.mapper';
import { PersonaEntity } from '../types/persona.types';
import { PersonaDTO } from '../dto/persona.dto';

export class PersonaMapper implements BaseMapper<PersonaEntity, PersonaDTO> {
  
  toDTO(entity: PersonaEntity): PersonaDTO {
    return {
      persona_id: entity.persona_id,
      tipo_identificacion_id: entity.tipo_identificacion_id,
      numero_identificacion: entity.numero_identificacion,
      nombres_persona: entity.nombres_persona,
      primer_apellido: entity.primer_apellido,
      segundo_apellido: entity.segundo_apellido,
      fecha_nacimiento: entity.fecha_nacimiento,
      nacionalidad_id: entity.nacionalidad_id,
      genero_id: entity.genero_id,
      estado_civil_id: entity.estado_civil_id,
      pais_origen_id: entity.pais_origen_id,
      pais_residencia_id: entity.pais_residencia_id,
      active: entity.active,
    };
  }

  toEntity(dto: PersonaDTO): PersonaEntity {
    return {
      persona_id: dto.persona_id || 0,
      tipo_identificacion_id: dto.tipo_identificacion_id,
      numero_identificacion: dto.numero_identificacion || '', // Fallback safe
      nombres_persona: dto.nombres_persona,
      primer_apellido: dto.primer_apellido,
      segundo_apellido: dto.segundo_apellido || undefined,
      fecha_nacimiento: dto.fecha_nacimiento || undefined,
      nacionalidad_id: dto.nacionalidad_id || undefined,
      genero_id: dto.genero_id || undefined,
      estado_civil_id: dto.estado_civil_id || undefined,
      pais_origen_id: dto.pais_origen_id || undefined,
      pais_residencia_id: dto.pais_residencia_id || undefined,
      active: dto.active ?? true,
    };
  }
}

export const personaMapper = new PersonaMapper();
