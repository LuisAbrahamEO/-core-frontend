import React from 'react';
import { EmpresaDTO } from '../dto/empresa.dto';
import { Edit2, Trash2, Building2, Globe, MapPin, BadgeCheck } from 'lucide-react';

interface EmpresaTableProps {
  empresas: EmpresaDTO[];
  onEdit: (empresa: EmpresaDTO) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

export const EmpresaTable: React.FC<EmpresaTableProps> = ({
  empresas,
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
            <th className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Empresa</th>
            <th className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">RUT / Razón Social</th>
            <th className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Ubicaciones</th>
            <th className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Estado</th>
            <th className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {empresas.map((empresa) => (
            <tr key={empresa.id} className="hover:bg-zinc-50/50 transition-colors group">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-zinc-900">{empresa.nombreComercial}</div>
                    {empresa.sitioWeb && (
                      <a href={empresa.sitioWeb} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-500 flex items-center gap-1 hover:underline">
                        <Globe size={12} /> {new URL(empresa.sitioWeb).hostname}
                      </a>
                    )}
                  </div>
                </div>
              </td>
              <td className="p-4">
                <div className="text-sm font-medium text-zinc-700">{empresa.rut}</div>
                <div className="text-xs text-zinc-500 truncate max-w-[200px]">{empresa.razonSocial}</div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-1 text-sm text-zinc-600">
                  <MapPin size={14} className="text-zinc-400" />
                  {empresa.ubicaciones.length} {empresa.ubicaciones.length === 1 ? 'ubicación' : 'ubicaciones'}
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    empresa.activo ? 'bg-emerald-50 text-emerald-600' : 'bg-zinc-100 text-zinc-500'
                  }`}>
                    {empresa.activo ? 'Activo' : 'Inactivo'}
                  </span>
                  {empresa.rolesIds.length > 0 && (
                    <div className="flex -space-x-1">
                      {empresa.rolesIds.map((_, i) => (
                        <div key={i} className="w-4 h-4 rounded-full bg-indigo-100 border border-white flex items-center justify-center">
                          <BadgeCheck size={10} className="text-indigo-600" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </td>
              <td className="p-4 text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(empresa)}
                    className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => empresa.id && onDelete(empresa.id)}
                    className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {empresas.length === 0 && (
            <tr>
              <td colSpan={5} className="p-12 text-center text-zinc-400 italic">
                No se encontraron empresas registradas.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
