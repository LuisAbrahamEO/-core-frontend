import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personaSchema, PersonaDTO } from '../dto/persona.dto';
import { Plus, Trash2, Save, X } from 'lucide-react';

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-6 rounded-2xl shadow-sm border border-black/5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <h3 className="col-span-full text-lg font-semibold text-zinc-900 border-b pb-2">Datos Personales</h3>
        
        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-700">Nombres</label>
          <input
            {...register('nombres')}
            className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="Ej: Juan"
          />
          {errors.nombres && <p className="text-xs text-red-500">{errors.nombres.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-700">Apellidos</label>
          <input
            {...register('apellidos')}
            className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="Ej: Pérez"
          />
          {errors.apellidos && <p className="text-xs text-red-500">{errors.apellidos.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-700">N° Identificación</label>
          <input
            {...register('numeroIdentificacion')}
            className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
          {errors.numeroIdentificacion && <p className="text-xs text-red-500">{errors.numeroIdentificacion.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-700">Fecha Nacimiento</label>
          <input
            type="date"
            {...register('fechaNacimiento')}
            className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
          {errors.fechaNacimiento && <p className="text-xs text-red-500">{errors.fechaNacimiento.message}</p>}
        </div>
      </div>

      {/* Sección Contactos */}
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-lg font-semibold text-zinc-900">Contactos</h3>
          <button
            type="button"
            onClick={() => appendContacto({ tipoContactoId: 1, ambitoContactoId: 1, valor: '', esPrincipal: false, activo: true })}
            className="flex items-center gap-2 text-sm bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            <Plus size={16} /> Agregar Contacto
          </button>
        </div>
        
        {contactoFields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-zinc-50 p-4 rounded-xl border border-zinc-100">
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-500">Valor (Email/Tel)</label>
              <input
                {...register(`contactos.${index}.valor`)}
                className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 text-sm"
              />
            </div>
            <div className="flex items-center gap-2 pb-2">
              <input type="checkbox" {...register(`contactos.${index}.esPrincipal`)} className="rounded border-zinc-300 text-indigo-600" />
              <label className="text-xs text-zinc-600">Principal</label>
            </div>
            <button
              type="button"
              onClick={() => removeContacto(index)}
              className="text-red-500 hover:text-red-700 p-2"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
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
          <Save size={18} /> {isLoading ? 'Guardando...' : 'Guardar Persona'}
        </button>
      </div>
    </form>
  );
};
