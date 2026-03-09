import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profesionalSchema, ProfesionalDTO } from '../dto/profesional.dto';
import { Save, X, Briefcase, FileText, Landmark } from 'lucide-react';

interface ProfesionalFormProps {
  initialData?: Partial<ProfesionalDTO>;
  onSubmit: (data: ProfesionalDTO) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ProfesionalForm: React.FC<ProfesionalFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfesionalDTO>({
    resolver: zodResolver(profesionalSchema),
    defaultValues: {
      activo: true,
      ...initialData,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-black/5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Sección Laboral */}
        <div className="col-span-full flex items-center gap-2 text-zinc-900 border-b pb-2">
          <Briefcase size={20} className="text-indigo-600" />
          <h3 className="text-lg font-bold">Información Laboral</h3>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-700">Fecha Ingreso</label>
          <input
            type="date"
            {...register('fechaIngreso')}
            className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
          {errors.fechaIngreso && <p className="text-xs text-red-500">{errors.fechaIngreso.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-700">Cargo (ID)</label>
          <input
            type="number"
            {...register('cargoId', { valueAsNumber: true })}
            className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-700">Tipo Contrato (ID)</label>
          <input
            type="number"
            {...register('tipoContratoId', { valueAsNumber: true })}
            className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>

        {/* Sección Previsión y Seguridad Social */}
        <div className="col-span-full flex items-center gap-2 text-zinc-900 border-b pb-2 pt-4">
          <Landmark size={20} className="text-indigo-600" />
          <h3 className="text-lg font-bold">Seguridad Social y Previsión</h3>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-700">AFP (ID)</label>
          <input
            type="number"
            {...register('afpId', { valueAsNumber: true })}
            className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-700">Previsión Salud (ID)</label>
          <input
            type="number"
            {...register('previsionSaludId', { valueAsNumber: true })}
            className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-700">Caja Compensación (ID)</label>
          <input
            type="number"
            {...register('cajaCompensacionId', { valueAsNumber: true })}
            className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>

        {/* Sección Documentación */}
        <div className="col-span-full flex items-center gap-2 text-zinc-900 border-b pb-2 pt-4">
          <FileText size={20} className="text-indigo-600" />
          <h3 className="text-lg font-bold">Documentación</h3>
        </div>

        <div className="col-span-full space-y-1">
          <label className="text-sm font-medium text-zinc-700">Link CV / Documento</label>
          <input
            type="text"
            {...register('cvLink')}
            placeholder="https://..."
            className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-6 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 px-6 py-2 rounded-xl border border-zinc-200 text-zinc-600 hover:bg-zinc-50 transition-all"
        >
          <X size={18} /> Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md shadow-indigo-200"
        >
          <Save size={18} /> {isLoading ? 'Guardando...' : 'Guardar Profesional'}
        </button>
      </div>
    </form>
  );
};
