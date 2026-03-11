import { BaseMapper } from '@/src/common/base.mapper';
import { PersonaEntity } from '../types/persona.types';
import { PersonaDTO } from '../dto/persona.dto';

export class PersonaMapper implements BaseMapper<PersonaEntity, PersonaDTO> {
  
  toDTO(entity: PersonaEntity): PersonaDTO {
    return {
      id: entity.persona_id,
      tipoIdentificacionId: entity.tipo_identificacion_id,
      numeroIdentificacion: entity.numero_identificacion,
      nombresPersona: entity.nombres_persona,
      primerApellido: entity.primer_apellido,
      segundoApellido: entity.segundo_apellido,
      fechaNacimiento: entity.fecha_nacimiento,
      nacionalidadId: entity.nacionalidad_id,
      generoId: entity.genero_id,
      estadoCivilId: entity.estado_civil_id,
      paisOrigenId: entity.pais_origen_id,
      paisResidenciaId: entity.pais_residencia_id,
      active: entity.active,
    };
  }

  toEntity(dto: PersonaDTO): PersonaEntity {
    return {
      persona_id: dto.id || 0,
      tipo_identificacion_id: dto.tipoIdentificacionId,
      numero_identificacion: dto.numeroIdentificacion,
      nombres_persona: dto.nombresPersona,
      primer_apellido: dto.primerApellido,
      segundo_apellido: dto.segundoApellido || undefined,
      fecha_nacimiento: dto.fechaNacimiento || undefined,
      nacionalidad_id: dto.nacionalidadId || undefined,
      genero_id: dto.generoId || undefined,
      estado_civil_id: dto.estadoCivilId || undefined,
      pais_origen_id: dto.paisOrigenId || undefined,
      pais_residencia_id: dto.paisResidenciaId || undefined,
      active: dto.active ?? true,
    };
  }
}

export const personaMapper = new PersonaMapper();
