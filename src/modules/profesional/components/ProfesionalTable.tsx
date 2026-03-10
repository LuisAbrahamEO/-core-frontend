import React from 'react';
import { ProfesionalDTO } from '../dto/profesional.dto';
import { Edit2, Trash2, Briefcase, UserCheck, Landmark, FileText, ExternalLink } from 'lucide-react';

interface ProfesionalTableProps {
  profesionales: ProfesionalDTO[];
  onEdit: (profesional: ProfesionalDTO) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

export const ProfesionalTable: React.FC<ProfesionalTableProps> = ({
  profesionales,
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
            <th className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Profesional</th>
            <th className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Cargo / Área</th>
            <th className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Previsión / AFP</th>
            <th className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Estado</th>
            <th className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {profesionales.map((profesional) => (
            <tr key={profesional.id} className="hover:bg-zinc-50/50 transition-colors group">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                    <UserCheck size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-zinc-900">ID Persona: {profesional.personaId}</div>
                    <div className="text-xs text-zinc-500 flex items-center gap-1">
                      Ingreso: {profesional.fechaIngreso}
                    </div>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <Briefcase size={14} className="text-zinc-400" />
                  <div className="text-sm font-medium text-zinc-700">{profesional.cargoNombre || `Cargo ID: ${profesional.cargoId}`}</div>
                </div>
                <div className="text-xs text-zinc-500 ml-5">Área ID: {profesional.areaId}</div>
              </td>
              <td className="p-4">
                <div className="flex flex-col gap-1">
                  <div className="text-xs font-medium text-zinc-700 flex items-center gap-1">
                    <Landmark size={12} className="text-zinc-400" />
                    {profesional.afpNombre || `AFP ID: ${profesional.afpId}`}
                  </div>
                  <div className="text-xs text-zinc-500 flex items-center gap-1">
                    <div className="w-3" />
                    {profesional.previsionNombre || `Salud ID: ${profesional.previsionSaludId}`}
                  </div>
                </div>
              </td>
              <td className="p-4">
                <div className="flex flex-col gap-1">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block w-fit ${
                    profesional.activo ? 'bg-emerald-50 text-emerald-600' : 'bg-zinc-100 text-zinc-500'
                  }`}>
                    {profesional.activo ? 'Activo' : 'Inactivo'}
                  </span>
                  <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-tighter">
                    {profesional.estadoDescripcion || `Estado ID: ${profesional.estadoId}`}
                  </span>
                </div>
              </td>
              <td className="p-4 text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {profesional.cvLink && (
                    <a
                      href={profesional.cvLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                      title="Ver CV"
                    >
                      <FileText size={18} />
                    </a>
                  )}
                  <button
                    onClick={() => onEdit(profesional)}
                    className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => profesional.id && onDelete(profesional.id)}
                    className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {profesionales.length === 0 && (
            <tr>
              <td colSpan={5} className="p-12 text-center text-zinc-400 italic">
                No se encontraron profesionales registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
