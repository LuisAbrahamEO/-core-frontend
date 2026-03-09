import apiClient from '@/src/common/api.client';
import { ApiResponse, PaginatedResponse } from '@/src/common/base.types';
import { ProfesionalEntity } from '../types/profesional.types';
import { ProfesionalDTO } from '../dto/profesional.dto';
import { profesionalMapper } from '../mapper/profesional.mapper';

export const profesionalService = {
  async getAll(params?: any): Promise<PaginatedResponse<ProfesionalDTO>> {
    const { data } = await apiClient.get<PaginatedResponse<ProfesionalEntity>>('/profesionales', { params });
    return {
      ...data,
      data: data.data.map(p => profesionalMapper.toDTO(p)),
    };
  },

  async getById(id: number): Promise<ApiResponse<ProfesionalDTO>> {
    const { data } = await apiClient.get<ApiResponse<ProfesionalEntity>>(`/profesionales/${id}`);
    return {
      ...data,
      data: profesionalMapper.toDTO(data.data),
    };
  },

  async create(profesional: ProfesionalDTO): Promise<ApiResponse<ProfesionalDTO>> {
    const entity = profesionalMapper.toEntity(profesional);
    const { data } = await apiClient.post<ApiResponse<ProfesionalEntity>>('/profesionales', entity);
    return {
      ...data,
      data: profesionalMapper.toDTO(data.data),
    };
  },

  async update(id: number, profesional: ProfesionalDTO): Promise<ApiResponse<ProfesionalDTO>> {
    const entity = profesionalMapper.toEntity(profesional);
    const { data } = await apiClient.put<ApiResponse<ProfesionalEntity>>(`/profesionales/${id}`, entity);
    return {
      ...data,
      data: profesionalMapper.toDTO(data.data),
    };
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/profesionales/${id}`);
  },
};
