import apiClient from '@/src/common/api.client';
import { ApiResponse, PaginatedResponse } from '@/src/common/base.types';
import { EmpresaEntity } from '../types/empresa.types';
import { EmpresaDTO } from '../dto/empresa.dto';
import { empresaMapper } from '../mapper/empresa.mapper';

export const empresaService = {
  async getAll(params?: any): Promise<PaginatedResponse<EmpresaDTO>> {
    const { data } = await apiClient.get<PaginatedResponse<EmpresaEntity>>('/empresas', { params });
    return {
      ...data,
      data: data.data.map(e => empresaMapper.toDTO(e)),
    };
  },

  async getById(id: number): Promise<ApiResponse<EmpresaDTO>> {
    const { data } = await apiClient.get<ApiResponse<EmpresaEntity>>(`/empresas/${id}`);
    return {
      ...data,
      data: empresaMapper.toDTO(data.data),
    };
  },

  async create(empresa: EmpresaDTO): Promise<ApiResponse<EmpresaDTO>> {
    const entity = empresaMapper.toEntity(empresa);
    const { data } = await apiClient.post<ApiResponse<EmpresaEntity>>('/empresas', entity);
    return {
      ...data,
      data: empresaMapper.toDTO(data.data),
    };
  },

  async update(id: number, empresa: EmpresaDTO): Promise<ApiResponse<EmpresaDTO>> {
    const entity = empresaMapper.toEntity(empresa);
    const { data } = await apiClient.put<ApiResponse<EmpresaEntity>>(`/empresas/${id}`, entity);
    return {
      ...data,
      data: empresaMapper.toDTO(data.data),
    };
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/empresas/${id}`);
  },
};
