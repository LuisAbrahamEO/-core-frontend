import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { empresaSchema, EmpresaDTO } from '../dto/empresa.dto';
import { Save, X, Building2, MapPin, Phone, Plus, Trash2 } from 'lucide-react';

interface EmpresaFormProps {
  initialData?: Partial<EmpresaDTO>;
  onSubmit: (data: EmpresaDTO) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const EmpresaForm: React.FC<EmpresaFormProps> = ({
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
  } = useForm<EmpresaDTO>({
    resolver: zodResolver(empresaSchema),
    defaultValues: {
      activo: true,
      contactos: [],
      ubicaciones: [],
      rolesIds: [],
      ...initialData,
    },
  });

  const { fields: ubicacionFields, append: appendUbicacion, remove: removeUbicacion } = useFieldArray({
    control,
    name: 'ubicaciones',
  });

  const { fields: contactoFields, append: appendContacto, remove: removeContacto } = useFieldArray({
    control,
    name: 'contactos',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-black/5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-full flex items-center gap-2 text-zinc-900 border-b pb-2">
          <Building2 size={20} className="text-indigo-600" />
          <h3 className="text-lg font-bold">Datos de la Empresa</h3>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-700">Nombre Comercial</label>
          <input
            {...register('nombreComercial')}
            className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
          {errors.nombreComercial && <p className="text-xs text-red-500">{errors.nombreComercial.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-700">RUT</label>
          <input
            {...register('rut')}
            placeholder="12.345.678-9"
            className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
          {errors.rut && <p className="text-xs text-red-500">{errors.rut.message}</p>}
        </div>

        <div className="col-span-full space-y-1">
          <label className="text-sm font-medium text-zinc-700">Razón Social</label>
          <input
            {...register('razonSocial')}
            className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
          {errors.razonSocial && <p className="text-xs text-red-500">{errors.razonSocial.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-700">Sitio Web</label>
          <input
            {...register('sitioWeb')}
            placeholder="https://..."
            className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
          {errors.sitioWeb && <p className="text-xs text-red-500">{errors.sitioWeb.message}</p>}
        </div>
      </div>

      {/* Gestión de Ubicaciones */}
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <div className="flex items-center gap-2 text-zinc-900">
            <MapPin size={20} className="text-indigo-600" />
            <h3 className="text-lg font-bold">Ubicaciones</h3>
          </div>
          <button
            type="button"
            onClick={() => appendUbicacion({ calle: '', numero: '', localidadId: 1 })}
            className="flex items-center gap-2 text-sm bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            <Plus size={16} /> Agregar Ubicación
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {ubicacionFields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-zinc-50 p-4 rounded-xl border border-zinc-100">
              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-medium text-zinc-500">Calle</label>
                <input
                  {...register(`ubicaciones.${index}.calle`)}
                  className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-500">Número</label>
                <input
                  {...register(`ubicaciones.${index}.numero`)}
                  className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 text-sm"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => removeUbicacion(index)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gestión de Contactos */}
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <div className="flex items-center gap-2 text-zinc-900">
            <Phone size={20} className="text-indigo-600" />
            <h3 className="text-lg font-bold">Contactos Empresa</h3>
          </div>
          <button
            type="button"
            onClick={() => appendContacto({ tipoContactoId: 1, valor: '', esPrincipal: false })}
            className="flex items-center gap-2 text-sm bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            <Plus size={16} /> Agregar Contacto
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {contactoFields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-zinc-50 p-4 rounded-xl border border-zinc-100">
              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-medium text-zinc-500">Valor (Email/Tel/Web)</label>
                <input
                  {...register(`contactos.${index}.valor`)}
                  className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 text-sm"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
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
            </div>
          ))}
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
          <Save size={18} /> {isLoading ? 'Guardando...' : 'Guardar Empresa'}
        </button>
      </div>
    </form>
  );
};
