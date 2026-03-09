import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profesionalService } from '../services/profesional.service';
import { ProfesionalDTO } from '../dto/profesional.dto';

export const useProfesionales = (params?: any) => {
  return useQuery({
    queryKey: ['profesionales', params],
    queryFn: () => profesionalService.getAll(params),
  });
};

export const useProfesional = (id: number) => {
  return useQuery({
    queryKey: ['profesional', id],
    queryFn: () => profesionalService.getById(id),
    enabled: !!id,
  });
};

export const useCreateProfesional = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (profesional: ProfesionalDTO) => profesionalService.create(profesional),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profesionales'] });
    },
  });
};

export const useUpdateProfesional = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, profesional }: { id: number; profesional: ProfesionalDTO }) => 
      profesionalService.update(id, profesional),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['profesionales'] });
      queryClient.invalidateQueries({ queryKey: ['profesional', variables.id] });
    },
  });
};

export const useDeleteProfesional = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => profesionalService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profesionales'] });
    },
  });
};
