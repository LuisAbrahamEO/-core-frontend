import apiClient from '@/src/common/api.client';
import { ApiResponse, PaginatedResponse } from '@/src/common/base.types';
import { PersonaEntity } from '../types/persona.types';
import { PersonaDTO } from '../dto/persona.dto';
import { personaMapper } from '../mapper/persona.mapper';

export const personaService = {
  async getAll(params?: any): Promise<PaginatedResponse<PersonaDTO>> {
    const { data } = await apiClient.get<PaginatedResponse<PersonaEntity>>('/personas', { params });
    return {
      ...data,
      data: data.data.map(p => personaMapper.toDTO(p)),
    };
  },

  async getById(id: number): Promise<ApiResponse<PersonaDTO>> {
    const { data } = await apiClient.get<ApiResponse<PersonaEntity>>(`/personas/${id}`);
    return {
      ...data,
      data: personaMapper.toDTO(data.data),
    };
  },

  async create(persona: PersonaDTO): Promise<ApiResponse<PersonaDTO>> {
    const entity = personaMapper.toEntity(persona);
    const { data } = await apiClient.post<ApiResponse<PersonaEntity>>('/personas', entity);
    return {
      ...data,
      data: personaMapper.toDTO(data.data),
    };
  },

  async update(id: number, persona: PersonaDTO): Promise<ApiResponse<PersonaDTO>> {
    const entity = personaMapper.toEntity(persona);
    const { data } = await apiClient.put<ApiResponse<PersonaEntity>>(`/personas/${id}`, entity);
    return {
      ...data,
      data: personaMapper.toDTO(data.data),
    };
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/personas/${id}`);
  },
};
