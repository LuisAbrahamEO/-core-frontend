import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { personaService } from '../services/persona.service';
import { PersonaDTO } from '../dto/persona.dto';

export const usePersonas = (params?: any) => {
  return useQuery({
    queryKey: ['personas', params],
    queryFn: () => personaService.getAll(params),
  });
};

export const usePersona = (id: number) => {
  return useQuery({
    queryKey: ['persona', id],
    queryFn: () => personaService.getById(id),
    enabled: !!id,
  });
};

export const useCreatePersona = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (persona: PersonaDTO) => personaService.create(persona),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personas'] });
    },
  });
};

export const useUpdatePersona = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, persona }: { id: number; persona: PersonaDTO }) => 
      personaService.update(id, persona),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['personas'] });
      queryClient.invalidateQueries({ queryKey: ['persona', variables.id] });
    },
  });
};

export const useDeletePersona = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => personaService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personas'] });
    },
  });
};
