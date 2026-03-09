import { BaseMapper } from '@/src/common/base.mapper';
import { PersonaEntity, ContactoEntity, DireccionPersonaEntity } from '../types/persona.types';
import { PersonaDTO, ContactoDTO, DireccionDTO } from '../dto/persona.dto';

export class PersonaMapper implements BaseMapper<PersonaEntity, PersonaDTO> {
  
  toDTO(entity: PersonaEntity): PersonaDTO {
    return {
      id: entity.persona_id,
      tipoIdentificacionId: entity.tipo_identificacion_id,
      numeroIdentificacion: entity.numero_identificacion,
      nombres: entity.nombres_persona,
      apellidos: entity.apellidos_persona,
      fechaNacimiento: entity.fecha_nacimiento,
      nacionalidadId: entity.nacionalidad_id,
      generoId: entity.genero_id,
      estadoCivilId: entity.estado_civil_id,
      activo: entity.activo,
      contactos: entity.contactos?.map(this.mapContactoToDTO) || [],
      direcciones: entity.direcciones?.map(this.mapDireccionToDTO) || [],
    };
  }

  toEntity(dto: PersonaDTO): PersonaEntity {
    return {
      persona_id: dto.id || 0,
      tipo_identificacion_id: dto.tipoIdentificacionId,
      numero_identificacion: dto.numeroIdentificacion,
      nombres_persona: dto.nombres,
      apellidos_persona: dto.apellidos,
      fecha_nacimiento: dto.fechaNacimiento,
      nacionalidad_id: dto.nacionalidadId,
      genero_id: dto.generoId,
      estado_civil_id: dto.estadoCivilId,
      activo: dto.activo,
      contactos: dto.contactos.map(c => this.mapContactoToEntity(c, dto.id || 0)),
      direcciones: dto.direcciones.map(d => this.mapDireccionToEntity(d, dto.id || 0)),
    };
  }

  private mapContactoToDTO(c: ContactoEntity): ContactoDTO {
    return {
      id: c.contacto_persona_id,
      tipoContactoId: c.tipo_contacto_id,
      ambitoContactoId: c.ambito_contacto_id,
      valor: c.valor_contacto,
      esPrincipal: c.principal,
      activo: c.activo,
    };
  }

  private mapContactoToEntity(dto: ContactoDTO, personaId: number): ContactoEntity {
    return {
      contacto_persona_id: dto.id || 0,
      persona_id: personaId,
      tipo_contacto_id: dto.tipoContactoId,
      ambito_contacto_id: dto.ambitoContactoId,
      valor_contacto: dto.valor,
      principal: dto.esPrincipal,
      activo: dto.activo,
    };
  }

  private mapDireccionToDTO(d: DireccionPersonaEntity): DireccionDTO {
    return {
      id: d.direccion_persona_id,
      tipoDireccionId: d.tipo_direccion_id,
      calle: d.calle,
      numero: d.numero,
      bloque: d.bloque,
      apartamento: d.apartamento,
      localidadId: d.localidad_id,
    };
  }

  private mapDireccionToEntity(dto: DireccionDTO, personaId: number): DireccionPersonaEntity {
    return {
      direccion_persona_id: dto.id || 0,
      persona_id: personaId,
      tipo_direccion_id: dto.tipoDireccionId,
      calle: dto.calle,
      numero: dto.numero,
      bloque: dto.bloque,
      apartamento: dto.apartamento,
      localidad_id: dto.localidadId,
    };
  }
}

export const personaMapper = new PersonaMapper();
