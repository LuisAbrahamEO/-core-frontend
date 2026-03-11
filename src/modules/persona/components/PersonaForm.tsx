import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personaSchema, PersonaDTO, CatalogoDTO } from '../dto/persona.dto';
import { personaService } from '../services/persona.service';
import { 
    Save, 
    User, 
    Calendar, 
    Fingerprint, 
    Globe, 
    Heart, 
    Users, 
    MapPin,
    AlertCircle,
    Mail,
    Phone,
    Loader2
} from 'lucide-react';

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
    // Estados para catálogos
    const [tiposIdentificacion, setTiposIdentificacion] = useState<CatalogoDTO[]>([]);
    const [generos, setGeneros] = useState<CatalogoDTO[]>([]);
    const [nacionalidades, setNacionalidades] = useState<CatalogoDTO[]>([]);
    const [estadosCiviles, setEstadosCiviles] = useState<CatalogoDTO[]>([]);
    const [paises, setPaises] = useState<CatalogoDTO[]>([]);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<PersonaDTO>({
        resolver: zodResolver(personaSchema),
        defaultValues: {
            active: true,
            ...initialData,
        },
    });

    // Carga de catálogos al montar el componente
    useEffect(() => {
        const loadCatalogs = async () => {
            try {
                const [tipos, gens, nacs, civils, ps] = await Promise.allSettled([
                    personaService.getTiposIdentificacion(),
                    personaService.getGeneros(),
                    personaService.getNacionalidades(),
                    personaService.getEstadosCiviles(),
                    personaService.getPaises()
                ]);

                if (tipos.status === 'fulfilled' && Array.isArray(tipos.value)) setTiposIdentificacion(tipos.value);
                if (gens.status === 'fulfilled' && Array.isArray(gens.value)) setGeneros(gens.value);
                if (nacs.status === 'fulfilled' && Array.isArray(nacs.value)) setNacionalidades(nacs.value);
                if (civils.status === 'fulfilled' && Array.isArray(civils.value)) setEstadosCiviles(civils.value);
                if (ps.status === 'fulfilled' && Array.isArray(ps.value)) setPaises(ps.value);
                
            } catch (error) {
                console.error('Error cargando catálogos:', error);
            }
        };
        loadCatalogs();
    }, []);

    return (
        <div className="relative">
            {isLoading && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-50 flex flex-col items-center justify-center rounded-[2rem]">
                    <Loader2 size={48} className="text-[#E31D4A] animate-spin mb-4" />
                    <p className="text-[#1A1A1A] font-black uppercase tracking-widest text-xs">Procesando Información...</p>
                </div>
            )}

            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="space-y-10 bg-[#F9FAFB] p-10 rounded-[2rem] shadow-lg border border-[#E5E7EB]"
            >
                {error && (
                    <div className="bg-red-50 border-l-4 border-[#E31D4A] p-4 flex items-center gap-3">
                        <AlertCircle className="text-[#E31D4A]" size={20} />
                        <p className="text-sm font-bold text-[#E31D4A] uppercase tracking-tight">{error}</p>
                    </div>
                )}

                {/* Header de Sección: Identidad */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="col-span-full flex items-center gap-3 text-[#111827] border-b-2 border-[#E31D4A] pb-4">
                    <User size={28} className="text-[#E31D4A]" />
                    <h3 className="text-2xl font-bold tracking-tight">Registro de Identidad Personal</h3>
                </div>

                {/* Tipo de Identificación */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#111827] uppercase tracking-widest flex items-center gap-2">
                        Tipo Identificación <span className="text-[#E31D4A]">*</span>
                    </label>
                    <select
                        {...register('tipoIdentificacionId', { valueAsNumber: true })}
                        className="w-full px-5 py-3 rounded-2xl border border-[#E5E7EB] bg-white focus:ring-2 focus:ring-[#E31D4A] outline-none transition-all font-medium text-sm shadow-sm"
                    >
                        <option value="">Seleccione tipo...</option>
                        {tiposIdentificacion?.map(t => (
                            <option key={t.id} value={t.id}>{t.descripcion || t.codigo}</option>
                        ))}
                    </select>
                    {errors.tipoIdentificacionId && (
                        <p className="text-[10px] font-bold text-[#E31D4A] uppercase mt-1 flex items-center gap-1">
                            <AlertCircle size={12} /> {errors.tipoIdentificacionId.message}
                        </p>
                    )}
                </div>

                {/* Número de Identificación */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#111827] uppercase tracking-widest flex items-center gap-2">
                        N° Identificación (RUT/DNI) <span className="text-[#E31D4A]">*</span>
                    </label>
                    <div className="relative">
                        <Fingerprint size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#5135A1]" />
                        <input
                            {...register('numeroIdentificacion')}
                            className="w-full pl-12 pr-5 py-3 rounded-2xl border border-[#E5E7EB] bg-white focus:ring-2 focus:ring-[#E31D4A] outline-none transition-all font-medium text-sm shadow-sm"
                            placeholder="Ej: 12345678-9"
                        />
                    </div>
                    {errors.numeroIdentificacion && (
                        <p className="text-[10px] font-bold text-[#E31D4A] uppercase mt-1 flex items-center gap-1">
                            <AlertCircle size={12} /> {errors.numeroIdentificacion.message}
                        </p>
                    )}
                </div>

                {/* Nombres */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#111827] uppercase tracking-widest flex items-center gap-2">
                        Nombres <span className="text-[#E31D4A]">*</span>
                    </label>
                    <input
                        {...register('nombresPersona')}
                        className="w-full px-5 py-3 rounded-2xl border border-[#E5E7EB] bg-white focus:ring-2 focus:ring-[#E31D4A] outline-none transition-all font-medium text-sm shadow-sm"
                        placeholder="Nombres completos"
                    />
                    {errors.nombresPersona && (
                        <p className="text-[10px] font-bold text-[#E31D4A] uppercase mt-1 flex items-center gap-1">
                            <AlertCircle size={12} /> {errors.nombresPersona.message}
                        </p>
                    )}
                </div>

                {/* Primer Apellido */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#111827] uppercase tracking-widest flex items-center gap-2">
                        Primer Apellido <span className="text-[#E31D4A]">*</span>
                    </label>
                    <input
                        {...register('primerApellido')}
                        className="w-full px-5 py-3 rounded-2xl border border-[#E5E7EB] bg-white focus:ring-2 focus:ring-[#E31D4A] outline-none transition-all font-medium text-sm shadow-sm"
                        placeholder="Apellido paterno"
                    />
                    {errors.primerApellido && (
                        <p className="text-[10px] font-bold text-[#E31D4A] uppercase mt-1 flex items-center gap-1">
                            <AlertCircle size={12} /> {errors.primerApellido.message}
                        </p>
                    )}
                </div>

                {/* Segundo Apellido */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#111827] uppercase tracking-widest">Segundo Apellido</label>
                    <input
                        {...register('segundoApellido')}
                        className="w-full px-5 py-3 rounded-2xl border border-[#E5E7EB] bg-white focus:ring-2 focus:ring-[#E31D4A] outline-none transition-all font-medium text-sm shadow-sm"
                        placeholder="Apellido materno"
                    />
                </div>

                {/* Fecha Nacimiento */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#111827] uppercase tracking-widest">Fecha de Nacimiento</label>
                    <div className="relative">
                        <Calendar size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#5135A1]" />
                        <input
                            type="date"
                            {...register('fechaNacimiento')}
                            className="w-full pl-12 pr-5 py-3 rounded-2xl border border-[#E5E7EB] bg-white focus:ring-2 focus:ring-[#E31D4A] outline-none transition-all font-medium text-sm shadow-sm"
                        />
                    </div>
                </div>

                {/* Header de Sección: Caracterización */}
                <div className="col-span-full flex items-center gap-3 text-[#111827] border-b-2 border-[#5135A1] pb-4 pt-6">
                    <Users size={28} className="text-[#5135A1]" />
                    <h3 className="text-2xl font-bold tracking-tight">Caracterización y Origen</h3>
                </div>

                {/* Género */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#111827] uppercase tracking-widest flex items-center gap-2">
                        Género
                    </label>
                    <select
                        {...register('generoId', { valueAsNumber: true })}
                        className="w-full px-5 py-3 rounded-2xl border border-[#E5E7EB] bg-white focus:ring-2 focus:ring-[#E31D4A] outline-none transition-all font-medium text-sm shadow-sm"
                    >
                        <option value="">Seleccione género...</option>
                        {generos?.map(g => (
                            <option key={g.id} value={g.id}>{g.descripcion || g.codigo}</option>
                        ))}
                    </select>
                </div>

                {/* Estado Civil */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#111827] uppercase tracking-widest flex items-center gap-2">
                        <Heart size={14} className="text-[#E31D4A]" /> Estado Civil
                    </label>
                    <select
                        {...register('estadoCivilId', { valueAsNumber: true })}
                        className="w-full px-5 py-3 rounded-2xl border border-[#E5E7EB] bg-white focus:ring-2 focus:ring-[#E31D4A] outline-none transition-all font-medium text-sm shadow-sm"
                    >
                        <option value="">Seleccione estado...</option>
                        {estadosCiviles?.map(ec => (
                            <option key={ec.id} value={ec.id}>{ec.descripcion}</option>
                        ))}
                    </select>
                </div>

                {/* Nacionalidad */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#111827] uppercase tracking-widest flex items-center gap-2">
                        <Globe size={14} className="text-[#5135A1]" /> Nacionalidad
                    </label>
                    <select
                        {...register('nacionalidadId', { valueAsNumber: true })}
                        className="w-full px-5 py-3 rounded-2xl border border-[#E5E7EB] bg-white focus:ring-2 focus:ring-[#E31D4A] outline-none transition-all font-medium text-sm shadow-sm"
                    >
                        <option value="">Seleccione nacionalidad...</option>
                        {nacionalidades?.map(n => (
                            <option key={n.id} value={n.id}>{n.nombre}</option>
                        ))}
                    </select>
                </div>

                {/* País de Residencia */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#111827] uppercase tracking-widest flex items-center gap-2">
                        <MapPin size={14} className="text-[#5135A1]" /> País de Residencia
                    </label>
                    <select
                        {...register('paisResidenciaId', { valueAsNumber: true })}
                        className="w-full px-5 py-3 rounded-2xl border border-[#E5E7EB] bg-white focus:ring-2 focus:ring-[#E31D4A] outline-none transition-all font-medium text-sm shadow-sm"
                    >
                        <option value="">Seleccione país...</option>
                        {paises?.map(p => (
                            <option key={p.id} value={p.id}>{p.nombre}</option>
                        ))}
                    </select>
                </div>

                {/* Header de Sección: Contacto */}
                <div className="col-span-full flex items-center gap-3 text-[#111827] border-b-2 border-[#E31D4A] pb-4 pt-6">
                    <Mail size={28} className="text-[#E31D4A]" />
                    <h3 className="text-2xl font-bold tracking-tight">Información de Contacto</h3>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#111827] uppercase tracking-widest flex items-center gap-2">
                        Email Principal
                    </label>
                    <div className="relative">
                        <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#E31D4A]" />
                        <input
                            {...register('email')}
                            className="w-full pl-12 pr-5 py-3 rounded-2xl border border-[#E5E7EB] bg-white focus:ring-2 focus:ring-[#E31D4A] outline-none transition-all font-medium text-sm shadow-sm"
                            placeholder="correo@ejemplo.com"
                        />
                    </div>
                    {errors.email && (
                        <p className="text-[10px] font-bold text-[#E31D4A] uppercase mt-1 flex items-center gap-1">
                            <AlertCircle size={12} /> {errors.email.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#111827] uppercase tracking-widest flex items-center gap-2">
                        Teléfono Móvil
                    </label>
                    <div className="relative">
                        <Phone size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#5135A1]" />
                        <input
                            {...register('telefono')}
                            className="w-full pl-12 pr-5 py-3 rounded-2xl border border-[#E5E7EB] bg-white focus:ring-2 focus:ring-[#E31D4A] outline-none transition-all font-medium text-sm shadow-sm"
                            placeholder="+56 9 1234 5678"
                        />
                    </div>
                </div>

                {/* Header de Sección: Dirección */}
                <div className="col-span-full flex items-center gap-3 text-[#111827] border-b-2 border-[#5135A1] pb-4 pt-6">
                    <MapPin size={28} className="text-[#5135A1]" />
                    <h3 className="text-2xl font-bold tracking-tight">Dirección de Residencia</h3>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#111827] uppercase tracking-widest flex items-center gap-2">
                        Calle / Avenida
                    </label>
                    <input
                        {...register('calle')}
                        className="w-full px-5 py-3 rounded-2xl border border-[#E5E7EB] bg-white focus:ring-2 focus:ring-[#E31D4A] outline-none transition-all font-medium text-sm shadow-sm"
                        placeholder="Ej: Av. Providencia"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#111827] uppercase tracking-widest flex items-center gap-2">
                        Número / Depto
                    </label>
                    <input
                        {...register('numero')}
                        className="w-full px-5 py-3 rounded-2xl border border-[#E5E7EB] bg-white focus:ring-2 focus:ring-[#E31D4A] outline-none transition-all font-medium text-sm shadow-sm"
                        placeholder="Ej: 1234, Of 501"
                    />
                </div>
            </div>

            {/* Acciones del Formulario */}
            <div className="flex justify-end gap-6 pt-10 border-t border-[#E5E7EB]">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-8 py-3 rounded-2xl border-2 border-[#E5E7EB] text-[#6B7280] font-bold uppercase text-xs tracking-widest hover:bg-[#F3F4F6] hover:text-[#111827] transition-all"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-12 py-3 rounded-2xl bg-gradient-to-r from-[#E31D4A] to-[#5135A1] text-white font-bold uppercase text-xs tracking-widest hover:opacity-90 disabled:opacity-50 transition-all shadow-xl shadow-[#E31D4A]/30 flex items-center gap-3"
                >
                    <Save size={18} /> 
                    {isLoading ? 'Procesando...' : 'Guardar Registro'}
                </button>
            </div>
        </form>
    </div>
    );
};
