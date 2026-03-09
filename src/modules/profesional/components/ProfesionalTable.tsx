import React from 'react';
import { ProfesionalDTO } from '../dto/profesional.dto';
import { Edit2, Trash2, Briefcase, Calendar, ExternalLink, ShieldCheck } from 'lucide-react';

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
            <th className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Cargo / Área</th>
            <th className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Contrato</th>
            <th className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Seguridad Social</th>
            <th className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Ingreso</th>
            <th className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {profesionales.map((prof) => (
            <tr key={prof.id} className="hover:bg-zinc-50/50 transition-colors group">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-zinc-900">{prof.cargoNombre || `Cargo ID: ${prof.cargoId}`}</div>
                    <div className="text-xs text-zinc-500">Estado: {prof.estadoDescripcion || 'N/A'}</div>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <div className="text-sm text-zinc-600">{prof.tipoContratoNombre || `ID: ${prof.tipoContratoId}`}</div>
                {prof.cvLink && (
                  <a href={prof.cvLink} target="_blank" rel="noopener noreferrer" className="text-[10px] text-indigo-500 flex items-center gap-1 hover:underline">
                    <ExternalLink size={10} /> Ver CV
                  </a>
                )}
              </td>
              <td className="p-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1 text-xs text-zinc-600">
                    <ShieldCheck size={12} className="text-emerald-500" />
                    AFP: {prof.afpNombre || prof.afpId}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-zinc-600">
                    <ShieldCheck size={12} className="text-emerald-500" />
                    Salud: {prof.previsionNombre || prof.previsionSaludId}
                  </div>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2 text-sm text-zinc-600">
                  <Calendar size={14} />
                  {prof.fechaIngreso}
                </div>
              </td>
              <td className="p-4 text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(prof)}
                    className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => prof.id && onDelete(prof.id)}
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
