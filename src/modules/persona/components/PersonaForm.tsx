import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personaSchema, PersonaDTO } from '../dto/persona.dto';
import { Plus, Trash2, Save, User, Phone, MapPin, Calendar, Fingerprint } from 'lucide-react';

interface PersonaFormProps {
  initialData?: Partial<PersonaDTO>;
  onSubmit: (data: PersonaDTO) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const PersonaForm: React.FC<PersonaFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonaDTO>({
    resolver: zodResolver(personaSchema),
    defaultValues: {
      activo: true,
      contactos: [],
      direcciones: [],
      ...initialData,
    },
  });

  const { fields: contactoFields, append: appendContacto, remove: removeContacto } = useFieldArray({
    control,
    name: 'contactos',
  });

  const { fields: direccionFields, append: appendDireccion, remove: removeDireccion } = useFieldArray({
    control,
    name: 'direcciones',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 bg-white p-10 rounded-[2rem]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="col-span-full flex items-center gap-3 text-[#1A1A1A] border-b border-black/5 pb-4">
          <User size={24} className="text-[#E31D4A]" />
          <h3 className="text-xl font-black tracking-tight">Identidad Personal</h3>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-black text-[#8E8E8E] uppercase tracking-widest">Nombres</label>
          <input
            {...register('nombres')}
            className="w-full px-5 py-3 rounded-2xl border border-black/5 bg-[#F8F9FC] focus:ring-2 focus:ring-[#E31D4A] outline-none transition-all font-bold text-sm"
            placeholder="Ej: Juan"
          />
          {errors.nombres && <p className="text-[10px] font-bold text-[#E31D4A] uppercase mt-1">{errors.nombres.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-[#8E8E8E] uppercase tracking-widest">Apellidos</label>
          <input
            {...register('apellidos')}
            className="w-full px-5 py-3 rounded-2xl border border-black/5 bg-[#F8F9FC] focus:ring-2 focus:ring-[#E31D4A] outline-none transition-all font-bold text-sm"
            placeholder="Ej: Pérez"
          />
          {errors.apellidos && <p className="text-[10px] font-bold text-[#E31D4A] uppercase mt-1">{errors.apellidos.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-[#8E8E8E] uppercase tracking-widest">N° Identificación</label>
          <div className="relative">
            <Fingerprint size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8E8E8E]" />
            <input
              {...register('numeroIdentificacion')}
              className="w-full pl-12 pr-5 py-3 rounded-2xl border border-black/5 bg-[#F8F9FC] focus:ring-2 focus:ring-[#E31D4A] outline-none transition-all font-bold text-sm"
            />
          </div>
          {errors.numeroIdentificacion && <p className="text-[10px] font-bold text-[#E31D4A] uppercase mt-1">{errors.numeroIdentificacion.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-[#8E8E8E] uppercase tracking-widest">Fecha Nacimiento</label>
          <div className="relative">
            <Calendar size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8E8E8E]" />
            <input
              type="date"
              {...register('fechaNacimiento')}
              className="w-full pl-12 pr-5 py-3 rounded-2xl border border-black/5 bg-[#F8F9FC] focus:ring-2 focus:ring-[#E31D4A] outline-none transition-all font-bold text-sm"
            />
          </div>
          {errors.fechaNacimiento && <p className="text-[10px] font-bold text-[#E31D4A] uppercase mt-1">{errors.fechaNacimiento.message}</p>}
        </div>
      </div>

      {/* Sección Contactos */}
      <div className="space-y-6">
        <div className="flex justify-between items-center border-b border-black/5 pb-4">
          <div className="flex items-center gap-3 text-[#1A1A1A]">
            <Phone size={24} className="text-[#5135A1]" />
            <h3 className="text-xl font-black tracking-tight">Canales de Contacto</h3>
          </div>
          <button
            type="button"
            onClick={() => appendContacto({ tipoContactoId: 1, ambitoContactoId: 1, valor: '', esPrincipal: false, activo: true })}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-[#F8F9FC] text-[#5135A1] px-4 py-2 rounded-xl hover:bg-[#5135A1] hover:text-white transition-all border border-[#5135A1]/10"
          >
            <Plus size={14} /> Agregar Contacto
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {contactoFields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-[#F8F9FC] p-6 rounded-2xl border border-black/5">
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-[#8E8E8E] uppercase tracking-widest">Valor (Email/Tel)</label>
                <input
                  {...register(`contactos.${index}.valor`)}
                  className="w-full px-4 py-2 rounded-xl border border-black/5 bg-white focus:ring-2 focus:ring-[#E31D4A] outline-none transition-all font-bold text-sm"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input type="checkbox" {...register(`contactos.${index}.esPrincipal`)} className="w-5 h-5 rounded-lg border-black/10 text-[#E31D4A] focus:ring-[#E31D4A]" />
                  <label className="text-[10px] font-black text-[#8E8E8E] uppercase tracking-widest">Principal</label>
                </div>
                <button
                  type="button"
                  onClick={() => removeContacto(index)}
                  className="text-[#E31D4A] hover:bg-[#E31D4A]/10 p-3 rounded-xl transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sección Direcciones */}
      <div className="space-y-6">
        <div className="flex justify-between items-center border-b border-black/5 pb-4">
          <div className="flex items-center gap-3 text-[#1A1A1A]">
            <MapPin size={24} className="text-[#E31D4A]" />
            <h3 className="text-xl font-black tracking-tight">Ubicaciones</h3>
          </div>
          <button
            type="button"
            onClick={() => appendDireccion({ tipoDireccionId: 1, calle: '', numero: '', localidadId: 1 })}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-[#F8F9FC] text-[#E31D4A] px-4 py-2 rounded-xl hover:bg-[#E31D4A] hover:text-white transition-all border border-[#E31D4A]/10"
          >
            <Plus size={14} /> Agregar Dirección
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {direccionFields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-[#F8F9FC] p-6 rounded-2xl border border-black/5">
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-[#8E8E8E] uppercase tracking-widest">Calle</label>
                <input
                  {...register(`direcciones.${index}.calle`)}
                  className="w-full px-4 py-2 rounded-xl border border-black/5 bg-white focus:ring-2 focus:ring-[#E31D4A] outline-none transition-all font-bold text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#8E8E8E] uppercase tracking-widest">Número</label>
                <input
                  {...register(`direcciones.${index}.numero`)}
                  className="w-full px-4 py-2 rounded-xl border border-black/5 bg-white focus:ring-2 focus:ring-[#E31D4A] outline-none transition-all font-bold text-sm"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => removeDireccion(index)}
                  className="text-[#E31D4A] hover:bg-[#E31D4A]/10 p-3 rounded-xl transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
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
          <Save size={16} /> {isLoading ? 'Guardando...' : 'Guardar Persona'}
        </button>
      </div>
    </form>
  );
};
