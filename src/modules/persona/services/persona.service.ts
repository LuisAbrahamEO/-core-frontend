import apiClient from '@/src/common/api.client';
import { PersonaDTO, CatalogoDTO } from '../dto/persona.dto';

/**
 * Servicio de API para el Módulo de Personas
 * Sincronizado con los controladores de NestJS.
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

    // Nota: Si existen endpoints para países, se pueden agregar aquí.
    // Asumiendo /pais para paisOrigenId y paisResidenciaId si aplica.
    async getPaises(): Promise<CatalogoDTO[]> {
        try {
            const { data } = await apiClient.get('/pais');
            return data;
        } catch (e) {
            return []; // Fallback si no existe
        }
    },

    // Métodos para Contacto y Dirección
    async saveContacto(contacto: any): Promise<any> {
        const { data } = await apiClient.post('/contacto-persona', contacto);
        return data;
    },

    async saveDireccion(direccion: any): Promise<any> {
        const { data } = await apiClient.post('/direccion-persona', direccion);
        return data;
    }
};
