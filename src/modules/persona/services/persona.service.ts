import apiClient from '@/src/common/api.client';
import { PersonaDTO, CatalogoDTO } from '../dto/persona.dto';

/**
 * Servicio de API para el Módulo de Personas
 * Sincronizado con los controladores de NestJS y el esquema Prisma.
 * Implementa auditoría de nombres y tipos según ERD.
 */
export const personaService = {
    // Métodos para Personas
    async getAll(params?: any): Promise<any> {
        const { data } = await apiClient.get('/persona', { params });
        return data;
    },

    async getById(id: number): Promise<PersonaDTO> {
        const { data } = await apiClient.get(`/persona/${id}`);
        return data;
    },

    async create(persona: PersonaDTO): Promise<PersonaDTO> {
        const { data } = await apiClient.post('/persona', persona);
        return data;
    },

    async update(id: number, persona: PersonaDTO): Promise<PersonaDTO> {
        const { data } = await apiClient.put(`/persona/${id}`, persona);
        return data;
    },

    async delete(id: number): Promise<void> {
        await apiClient.delete(`/persona/${id}`);
    },

    // Métodos para Catálogos (Selectores Dinámicos)
    async getGeneros(): Promise<CatalogoDTO[]> {
        const { data } = await apiClient.get('/genero');
        return data;
    },

    async getNacionalidades(): Promise<CatalogoDTO[]> {
        const { data } = await apiClient.get('/nacionalidad');
        return data;
    },

    async getEstadosCiviles(): Promise<CatalogoDTO[]> {
        const { data } = await apiClient.get('/estado-civil');
        return data;
    },

    async getTiposIdentificacion(): Promise<CatalogoDTO[]> {
        const { data } = await apiClient.get('/tipo-identificacion');
        return data;
    },

    async getPaises(): Promise<CatalogoDTO[]> {
        const { data } = await apiClient.get('/pais');
        return data;
    },

    async getLocalidades(): Promise<CatalogoDTO[]> {
        const { data } = await apiClient.get('/localidad');
        return data;
    },

    // Métodos para Contacto y Dirección (Relaciones)
    async saveContacto(contacto: any): Promise<any> {
        const { data } = await apiClient.post('/contacto-persona', contacto);
        return data;
    },

    async saveDireccion(direccion: any): Promise<any> {
        const { data } = await apiClient.post('/direccion-persona', direccion);
        return data;
    }
};
