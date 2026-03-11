import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profesionalSchema, ProfesionalDTO } from '../dto/profesional.dto';
import { PersonaDTO } from '../../persona/dto/persona.dto';
import { EmpresaDTO } from '../../empresa/dto/empresa.dto';
import { Save, X, Briefcase, FileText, Landmark, User, Building } from 'lucide-react';

interface ProfesionalFormProps {
  initialData?: Partial<ProfesionalDTO>;
  onSubmit: (data: ProfesionalDTO) => void;
  onCancel: () => void;
  isLoading?: boolean;
  personas?: PersonaDTO[];
  empresas?: EmpresaDTO[];
}

export const ProfesionalForm: React.FC<ProfesionalFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
  personas = [],
  empresas = [],
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 bg-white p-10 rounded-[2rem]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Vinculación Core */}
        <div className="col-span-full flex items-center gap-3 text-[#1A1A1A] border-b border-black/5 pb-4">
          <User size={24} className="text-[#E31D4A]" />
          <h3 className="text-xl font-black tracking-tight">Vinculación de Entidades</h3>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-[#8E8E8E] uppercase tracking-widest">Seleccionar Persona</label>
          <select
            {...register('personaId', { valueAsNumber: true })}
            className="w-full px-5 py-3 rounded-2xl border border-black/5 bg-[#F8F9FC] focus:ring-2 focus:ring-[#E31D4A] outline-none transition-all font-bold text-sm"
          >
            <option value="">-- Seleccione una Persona --</option>
            {personas.map(p => (
              <option key={p.id} value={p.id}>{p.nombresPersona} {p.primerApellido} ({p.numeroIdentificacion})</option>
            ))}
          </select>
          {errors.personaId && <p className="text-[10px] font-bold text-[#E31D4A] uppercase mt-1">{errors.personaId.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-[#8E8E8E] uppercase tracking-widest">Empresa Asignada</label>
          <select
            {...register('empresaId', { valueAsNumber: true })}
            className="w-full px-5 py-3 rounded-2xl border border-black/5 bg-[#F8F9FC] focus:ring-2 focus:ring-[#E31D4A] outline-none transition-all font-bold text-sm"
          >
            <option value="">-- Seleccione una Empresa --</option>
            {empresas.map(e => (
              <option key={e.id} value={e.id}>{e.nombreComercial}</option>
            ))}
          </select>
          {errors.empresaId && <p className="text-[10px] font-bold text-[#E31D4A] uppercase mt-1">{errors.empresaId.message}</p>}
        </div>

        {/* Sección Laboral */}
        <div className="col-span-full flex items-center gap-3 text-[#1A1A1A] border-b border-black/5 pb-4 pt-4">
          <Briefcase size={24} className="text-[#5135A1]" />
          <h3 className="text-xl font-black tracking-tight">Información Laboral</h3>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-[#8E8E8E] uppercase tracking-widest">Fecha Ingreso</label>
          <input
            type="date"
            {...register('fechaIngreso')}
            className="w-full px-5 py-3 rounded-2xl border border-black/5 bg-[#F8F9FC] focus:ring-2 focus:ring-[#E31D4A] outline-none transition-all font-bold text-sm"
          />
          {errors.fechaIngreso && <p className="text-[10px] font-bold text-[#E31D4A] uppercase mt-1">{errors.fechaIngreso.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-[#8E8E8E] uppercase tracking-widest">Cargo (ID)</label>
          <input
            type="number"
            {...register('cargoId', { valueAsNumber: true })}
            className="w-full px-5 py-3 rounded-2xl border border-black/5 bg-[#F8F9FC] focus:ring-2 focus:ring-[#E31D4A] outline-none transition-all font-bold text-sm"
          />
        </div>

        {/* Sección Previsión */}
        <div className="col-span-full flex items-center gap-3 text-[#1A1A1A] border-b border-black/5 pb-4 pt-4">
          <Landmark size={24} className="text-[#E31D4A]" />
          <h3 className="text-xl font-black tracking-tight">Seguridad Social</h3>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-[#8E8E8E] uppercase tracking-widest">AFP (ID)</label>
          <input
            type="number"
            {...register('afpId', { valueAsNumber: true })}
            className="w-full px-5 py-3 rounded-2xl border border-black/5 bg-[#F8F9FC] focus:ring-2 focus:ring-[#E31D4A] outline-none transition-all font-bold text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-[#8E8E8E] uppercase tracking-widest">Previsión Salud (ID)</label>
          <input
            type="number"
            {...register('previsionSaludId', { valueAsNumber: true })}
            className="w-full px-5 py-3 rounded-2xl border border-black/5 bg-[#F8F9FC] focus:ring-2 focus:ring-[#E31D4A] outline-none transition-all font-bold text-sm"
          />
        </div>

        <div className="col-span-full space-y-2">
          <label className="text-xs font-black text-[#8E8E8E] uppercase tracking-widest">Link CV / Documento</label>
          <div className="relative">
            <FileText size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8E8E8E]" />
            <input
              type="text"
              {...register('cvLink')}
              placeholder="https://..."
              className="w-full pl-12 pr-5 py-3 rounded-2xl border border-black/5 bg-[#F8F9FC] focus:ring-2 focus:ring-[#E31D4A] outline-none transition-all font-bold text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-10 border-t border-black/5">
        <button
          type="button"
          onClick={onCancel}
          className="px-8 py-3 rounded-2xl border border-black/10 text-[#8E8E8E] font-black uppercase text-[10px] tracking-widest hover:bg-[#F8F9FC] transition-all"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-10 py-3 rounded-2xl bg-gradient-to-r from-[#E31D4A] to-[#5135A1] text-white font-black uppercase text-[10px] tracking-widest hover:opacity-90 disabled:opacity-50 transition-all shadow-xl shadow-[#E31D4A]/20 flex items-center gap-2"
        >
          <Save size={16} /> {isLoading ? 'Guardando...' : 'Guardar Profesional'}
        </button>
      </div>
    </form>
  );
};
