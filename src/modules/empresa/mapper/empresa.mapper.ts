import { BaseMapper } from '@/src/common/base.mapper';
import { EmpresaEntity, ContactoEmpresaEntity, UbicacionEmpresaEntity, EmpresaRolEntity } from '../types/empresa.types';
import { EmpresaDTO, ContactoEmpresaDTO, UbicacionEmpresaDTO } from '../dto/empresa.dto';

export class EmpresaMapper implements BaseMapper<EmpresaEntity, EmpresaDTO> {
  
  toDTO(entity: EmpresaEntity): EmpresaDTO {
    return {
      id: entity.empresa_id,
      nombreComercial: entity.nombre_comercial,
      rut: entity.rut_empresa,
      razonSocial: entity.razon_social,
      sitioWeb: entity.sitio_web,
      giroActividadId: entity.giro_actividad_id,
      tipoSociedadId: entity.tipo_sociedad_id,
      sectorEconomicoId: entity.sector_economico_id,
      activo: entity.activo,
      contactos: entity.contactos?.map(this.mapContactoToDTO) || [],
      ubicaciones: entity.ubicaciones?.map(this.mapUbicacionToDTO) || [],
      rolesIds: entity.roles?.map(r => r.rol_empresa_id) || [],
    };
  }

  toEntity(dto: EmpresaDTO): EmpresaEntity {
    const empresaId = dto.id || 0;
    return {
      empresa_id: empresaId,
      nombre_comercial: dto.nombreComercial,
      rut_empresa: dto.rut,
      razon_social: dto.razonSocial,
      sitio_web: dto.sitioWeb,
      giro_actividad_id: dto.giroActividadId,
      tipo_sociedad_id: dto.tipoSociedadId,
      sector_economico_id: dto.sectorEconomicoId,
      activo: dto.activo,
      contactos: dto.contactos.map(c => this.mapContactoToEntity(c, empresaId)),
      ubicaciones: dto.ubicaciones.map(u => this.mapUbicacionToEntity(u, empresaId)),
      roles: dto.rolesIds.map(rolId => ({
        empresa_rol_id: 0,
        empresa_id: empresaId,
        rol_empresa_id: rolId,
        fecha_asignacion: new Date().toISOString(),
      })),
    };
  }

  private mapContactoToDTO(c: ContactoEmpresaEntity): ContactoEmpresaDTO {
    return {
      id: c.contacto_empresa_id,
      tipoContactoId: c.tipo_contacto_id,
      valor: c.valor_contacto,
      descripcion: c.descripcion,
      esPrincipal: c.es_principal,
    };
  }

  private mapContactoToEntity(dto: ContactoEmpresaDTO, empresaId: number): ContactoEmpresaEntity {
    return {
      contacto_empresa_id: dto.id || 0,
      empresa_id: empresaId,
      tipo_contacto_id: dto.tipoContactoId,
      valor_contacto: dto.valor,
      descripcion: dto.descripcion,
      es_principal: dto.esPrincipal,
    };
  }

  private mapUbicacionToDTO(u: UbicacionEmpresaEntity): UbicacionEmpresaDTO {
    return {
      id: u.ubicacion_empresa_id,
      calle: u.calle,
      numero: u.numero,
      bloque: u.bloque,
      apartamento: u.apartamento,
      localidadId: u.localidad_id,
    };
  }

  private mapUbicacionToEntity(dto: UbicacionEmpresaDTO, empresaId: number): UbicacionEmpresaEntity {
    return {
      ubicacion_empresa_id: dto.id || 0,
      empresa_id: empresaId,
      calle: dto.calle,
      numero: dto.numero,
      bloque: dto.bloque,
      apartamento: dto.apartamento,
      localidad_id: dto.localidadId,
    };
  }
}

export const empresaMapper = new EmpresaMapper();
