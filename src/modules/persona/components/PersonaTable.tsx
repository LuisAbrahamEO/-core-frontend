import React from 'react';
import { PersonaDTO } from '../dto/persona.dto';
import { Edit2, Trash2, User, Mail, Phone, MapPin, Calendar } from 'lucide-react';

interface PersonaTableProps {
  personas: PersonaDTO[];
  onEdit: (persona: PersonaDTO) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

export const PersonaTable: React.FC<PersonaTableProps> = ({
  personas,
  onEdit,
  onDelete,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-black/5">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-zinc-50 border-b border-zinc-100">
            <th className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Persona</th>
            <th className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Identificación</th>
            <th className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Contacto Principal</th>
            <th className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Estado</th>
            <th className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {personas.map((persona) => {
            return (
              <tr key={persona.persona_id} className="hover:bg-zinc-50/50 transition-colors group">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <User size={20} />
                    </div>
                    <div>
                      <div className="font-medium text-zinc-900">{persona.nombres_persona} {persona.primer_apellido}</div>
                      <div className="text-xs text-zinc-500 flex items-center gap-1">
                        <Calendar size={12} /> {persona.fecha_nacimiento || 'N/A'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm font-medium text-zinc-700">{persona.numero_identificacion}</div>
                  <div className="text-xs text-zinc-500">Tipo ID: {persona.tipo_identificacion_id}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-zinc-600">
                    Nacionalidad ID: {persona.nacionalidad_id || 'N/A'}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    persona.active ? 'bg-emerald-50 text-emerald-600' : 'bg-zinc-100 text-zinc-500'
                  }`}>
                    {persona.active ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit(persona)}
                      className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => persona.persona_id && onDelete(persona.persona_id)}
                      className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
          {personas.length === 0 && (
            <tr>
              <td colSpan={5} className="p-12 text-center text-zinc-400 italic">
                No se encontraron personas registradas.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
