import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { empresaService } from '../services/empresa.service';
import { EmpresaDTO } from '../dto/empresa.dto';

export const useEmpresas = (params?: any) => {
  return useQuery({
    queryKey: ['empresas', params],
    queryFn: () => empresaService.getAll(params),
  });
};

export const useEmpresa = (id: number) => {
  return useQuery({
    queryKey: ['empresa', id],
    queryFn: () => empresaService.getById(id),
    enabled: !!id,
  });
};

export const useCreateEmpresa = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (empresa: EmpresaDTO) => empresaService.create(empresa),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['empresas'] });
    },
  });
};

export const useUpdateEmpresa = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, empresa }: { id: number; empresa: EmpresaDTO }) => 
      empresaService.update(id, empresa),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['empresas'] });
      queryClient.invalidateQueries({ queryKey: ['empresa', variables.id] });
    },
  });
};

export const useDeleteEmpresa = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => empresaService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['empresas'] });
    },
  });
};
