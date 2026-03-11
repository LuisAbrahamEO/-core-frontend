/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Building2, Users, Briefcase, X, LayoutDashboard, UserCheck } from 'lucide-react';

// Módulos
import { EmpresaTable } from './modules/empresa/components/EmpresaTable';
import { EmpresaForm } from './modules/empresa/components/EmpresaForm';
import { EmpresaDTO } from './modules/empresa/dto/empresa.dto';

import { PersonaTable } from './modules/persona/components/PersonaTable';
import { PersonaForm } from './modules/persona/components/PersonaForm';
import { PersonaDTO } from './modules/persona/dto/persona.dto';
import { personaService } from './modules/persona/services/persona.service';

import { ProfesionalTable } from './modules/profesional/components/ProfesionalTable';
import { ProfesionalForm } from './modules/profesional/components/ProfesionalForm';
import { ProfesionalDTO } from './modules/profesional/dto/profesional.dto';

// Configuración de TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

// --- MOCK DATA ---

const MOCK_EMPRESAS: EmpresaDTO[] = [
  {
    id: 1,
    nombreComercial: "Tech Solutions Global",
    rut: "76.123.456-K",
    razonSocial: "Tecnologías de la Información Solutions SpA",
    sitioWeb: "https://techsolutions.example.com",
    giroActividadId: 10,
    tipoSociedadId: 2,
    sectorEconomicoId: 5,
    activo: true,
    contactos: [{ id: 1, tipoContactoId: 1, valor: "contacto@techsolutions.com", esPrincipal: true }],
    ubicaciones: [{ id: 1, calle: "Av. Providencia", numero: "1234", localidadId: 1 }],
    rolesIds: [1, 2]
  },
  {
    id: 2,
    nombreComercial: "Logística del Sur",
    rut: "88.987.654-3",
    razonSocial: "Transportes y Logística Global Limitada",
    sitioWeb: "",
    giroActividadId: 15,
    tipoSociedadId: 1,
    sectorEconomicoId: 3,
    activo: false,
    contactos: [{ id: 2, tipoContactoId: 2, valor: "+56912345678", esPrincipal: true }],
    ubicaciones: [{ id: 3, calle: "Panamericana Norte", numero: "km 20", localidadId: 5 }],
    rolesIds: [3]
  },
  {
    id: 3,
    nombreComercial: "Innovación Médica",
    rut: "99.000.111-2",
    razonSocial: "Servicios de Salud e Innovación S.A.",
    sitioWeb: "https://salud-innovacion.example.com",
    giroActividadId: 5,
    tipoSociedadId: 3,
    sectorEconomicoId: 1,
    activo: true,
    contactos: [{ id: 3, tipoContactoId: 1, valor: "info@salud.example.com", esPrincipal: true }],
    ubicaciones: [{ id: 4, calle: "Vitacura", numero: "4500", localidadId: 3 }],
    rolesIds: [1]
  }
];

const MOCK_PERSONAS: PersonaDTO[] = [
  {
    persona_id: 1,
    tipo_identificacion_id: 1,
    numero_identificacion: "18.456.789-0",
    nombres_persona: "Juan Pablo",
    primer_apellido: "Soto",
    segundo_apellido: "Mayor",
    fecha_nacimiento: "1990-05-15",
    nacionalidad_id: 1,
    genero_id: 1,
    estado_civil_id: 2,
    active: true,
  },
  {
    persona_id: 2,
    tipo_identificacion_id: 1,
    numero_identificacion: "15.222.333-4",
    nombres_persona: "María Ignacia",
    primer_apellido: "López",
    segundo_apellido: "Jara",
    fecha_nacimiento: "1985-11-20",
    nacionalidad_id: 1,
    genero_id: 2,
    estado_civil_id: 1,
    active: true,
  },
  {
    persona_id: 3,
    tipo_identificacion_id: 1,
    numero_identificacion: "20.111.222-3",
    nombres_persona: "Carlos Andrés",
    primer_apellido: "Vicuña",
    segundo_apellido: "Mackenna",
    fecha_nacimiento: "1995-02-10",
    nacionalidad_id: 1,
    genero_id: 1,
    estado_civil_id: 1,
    active: false,
  }
];

const MOCK_PROFESIONALES: ProfesionalDTO[] = [
  {
    id: 1,
    personaId: 1,
    empresaId: 1,
    fechaIngreso: "2022-01-01",
    estadoId: 1,
    tipoContratoId: 1,
    cargoId: 1,
    areaId: 1,
    previsionSaludId: 1,
    afpId: 1,
    cajaCompensacionId: 1,
    activo: true,
    cargoNombre: "Ingeniero de Software Senior",
    afpNombre: "AFP Provida",
    previsionNombre: "Isapre Banmédica",
    estadoDescripcion: "Contratado",
    cvLink: "https://example.com/cv/juan-soto"
  },
  {
    id: 2,
    personaId: 2,
    empresaId: 1,
    fechaIngreso: "2023-06-15",
    estadoId: 1,
    tipoContratoId: 2,
    cargoId: 5,
    areaId: 2,
    previsionSaludId: 2,
    afpId: 3,
    cajaCompensacionId: 1,
    activo: true,
    cargoNombre: "Analista de Finanzas",
    afpNombre: "AFP Habitat",
    previsionNombre: "Fonasa",
    estadoDescripcion: "Contratado",
    cvLink: ""
  },
  {
    id: 3,
    personaId: 3,
    empresaId: 2,
    fechaIngreso: "2021-03-10",
    fechaTermino: "2023-12-31",
    estadoId: 3,
    tipoContratoId: 1,
    cargoId: 10,
    areaId: 3,
    previsionSaludId: 1,
    afpId: 2,
    cajaCompensacionId: 1,
    activo: false,
    cargoNombre: "Gerente de Operaciones",
    afpNombre: "AFP Capital",
    previsionNombre: "Isapre Colmena",
    estadoDescripcion: "Desvinculado"
  }
];

type TabType = 'empresas' | 'personas' | 'profesionales';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('personas');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Estados para edición
  const [selectedEmpresa, setSelectedEmpresa] = useState<EmpresaDTO | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<PersonaDTO | null>(null);
  const [selectedProfesional, setSelectedProfesional] = useState<ProfesionalDTO | null>(null);

  const handleOpenCreate = () => {
    setSelectedEmpresa(null);
    setSelectedPersona(null);
    setSelectedProfesional(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedEmpresa(null);
    setSelectedPersona(null);
    setSelectedProfesional(null);
  };

  const handleFormSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      if (activeTab === 'personas') {
        // 1. Crear Persona
        const persona = await personaService.create(data);
        const personaId = persona.persona_id!;

        // 2. Guardar Contacto si existe
        if (data.email || data.telefono) {
          await personaService.saveContacto({
            persona_id: personaId,
            tipo_contacto_id: 1, // Asumiendo 1 para Email/Teléfono general
            ambito_contacto_id: 1,
            valor_contacto: data.email || data.telefono,
            principal: true,
            activo: true
          });
        }

        // 3. Guardar Dirección si existe
        if (data.calle || data.numero) {
          await personaService.saveDireccion({
            persona_id: personaId,
            tipo_direccion_id: 1,
            calle: data.calle,
            numero: data.numero,
            localidad_id: data.localidad_id || 1
          });
        }
      } else {
        console.log(`Simulando envío al Backend (${activeTab}):`, JSON.stringify(data, null, 2));
      }
      
      alert(`¡Registro guardado con éxito!\n\nEl sistema ha procesado la información correctamente.`);
      handleCloseForm();
    } catch (error: any) {
      console.error('Error al guardar:', error);
      const errorMsg = error.response?.data?.message || 'Error inesperado al procesar la solicitud.';
      alert(`Error: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm(`¿Estás seguro de eliminar este registro (ID ${id})?`)) {
      console.log(`Eliminando ${activeTab} ID:`, id);
      alert(`Registro eliminado correctamente.`);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
        
        {/* Sidebar ACL Style */}
        <aside className="w-64 bg-gradient-to-b from-[#E31D4A] to-[#5135A1] text-white flex flex-col shadow-xl fixed h-full z-20">
          <div className="p-8 flex flex-col items-center border-b border-white/10">
            <div className="bg-white p-4 rounded-xl mb-4 shadow-lg flex items-center justify-center">
              <img src="https://www.acl.cl/wp-content/uploads/2024/01/logo-acl-dataart.png" alt="ACL Logo" className="h-10 object-contain" referrerPolicy="no-referrer" />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold tracking-tight">Gestión CORE</h2>
              <p className="text-white/60 text-[10px] uppercase font-bold tracking-widest mt-1">Powered by DataArt</p>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2 mt-4">
            <button 
              onClick={() => setActiveTab('empresas')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'empresas' ? 'bg-white/20 shadow-inner' : 'hover:bg-white/10'
              }`}
            >
              <Building2 size={20} /> Empresas
            </button>
            <button 
              onClick={() => setActiveTab('personas')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'personas' ? 'bg-white/20 shadow-inner' : 'hover:bg-white/10'
              }`}
            >
              <Users size={20} /> Personas
            </button>
            <button 
              onClick={() => setActiveTab('profesionales')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'profesionales' ? 'bg-white/20 shadow-inner' : 'hover:bg-white/10'
              }`}
            >
              <UserCheck size={20} /> Profesionales
            </button>
          </nav>

          <div className="p-6 border-t border-white/10">
            <div className="bg-white/10 p-4 rounded-2xl">
              <p className="text-[10px] text-white/50 uppercase font-bold mb-1">Usuario Activo</p>
              <p className="text-sm font-bold">Admin ACL</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-10">
          <div className="max-w-6xl mx-auto space-y-10">
            
            {/* Header Section */}
            <header className="flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-black text-[#1A1A1A] tracking-tight capitalize">
                  {activeTab}
                </h1>
                <div className="h-1 w-12 bg-[#E31D4A] mt-2 rounded-full"></div>
              </div>
              <button 
                onClick={handleOpenCreate}
                className="bg-[#E31D4A] text-white px-8 py-3 rounded-2xl text-sm font-black hover:bg-[#C2183F] transition-all shadow-lg shadow-[#E31D4A]/20 flex items-center gap-2 uppercase tracking-wider"
              >
                Nuevo Registro
              </button>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-[#E31D4A] flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-[#E31D4A]/5 flex items-center justify-center text-[#E31D4A]">
                  <Building2 size={28} />
                </div>
                <div>
                  <div className="text-3xl font-black text-[#1A1A1A]">{MOCK_EMPRESAS.length}</div>
                  <div className="text-[10px] text-[#8E8E8E] uppercase font-black tracking-widest">Empresas Registradas</div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-[#5135A1] flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-[#5135A1]/5 flex items-center justify-center text-[#5135A1]">
                  <Users size={28} />
                </div>
                <div>
                  <div className="text-3xl font-black text-[#1A1A1A]">{MOCK_PERSONAS.length}</div>
                  <div className="text-[10px] text-[#8E8E8E] uppercase font-black tracking-widest">Personas en Base</div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-[#E31D4A] flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-[#E31D4A]/5 flex items-center justify-center text-[#E31D4A]">
                  <Briefcase size={28} />
                </div>
                <div>
                  <div className="text-3xl font-black text-[#1A1A1A]">{MOCK_PROFESIONALES.length}</div>
                  <div className="text-[10px] text-[#8E8E8E] uppercase font-black tracking-widest">Profesionales Activos</div>
                </div>
              </div>
            </div>

            {/* Content Area with Fuchsia Accent */}
            <section className="bg-white rounded-2xl shadow-xl border border-black/5 overflow-hidden border-l-4 border-[#E31D4A]">
              <div className="p-8">
                {activeTab === 'empresas' && (
                  <EmpresaTable 
                    empresas={MOCK_EMPRESAS} 
                    onEdit={(e) => { setSelectedEmpresa(e); setIsFormOpen(true); }} 
                    onDelete={handleDelete} 
                    isLoading={false}
                  />
                )}
                {activeTab === 'personas' && (
                  <PersonaTable 
                    personas={MOCK_PERSONAS} 
                    onEdit={(p) => { setSelectedPersona(p); setIsFormOpen(true); }} 
                    onDelete={handleDelete} 
                    isLoading={false}
                  />
                )}
                {activeTab === 'profesionales' && (
                  <ProfesionalTable 
                    profesionales={MOCK_PROFESIONALES} 
                    onEdit={(p) => { setSelectedProfesional(p); setIsFormOpen(true); }} 
                    onDelete={handleDelete} 
                    isLoading={false}
                  />
                )}
              </div>
            </section>

            <footer className="pt-10 text-center text-[#8E8E8E] text-xs font-bold uppercase tracking-widest">
              &copy; 2024 ACL Powered by DataArt - Enterprise Management System
            </footer>
          </div>
        </main>

        {/* Modal ACL Style */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-[#1A1A1A]/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-300 border-l-[12px] border-[#E31D4A]">
              <div className="sticky top-0 bg-white px-10 py-6 border-b flex justify-between items-center z-10">
                <div>
                  <h2 className="text-2xl font-black text-[#1A1A1A] tracking-tight">
                    {activeTab === 'empresas' ? (selectedEmpresa ? 'Editar Empresa' : 'Nueva Empresa') :
                     activeTab === 'personas' ? (selectedPersona ? 'Editar Persona' : 'Nueva Persona') :
                     (selectedProfesional ? 'Editar Profesional' : 'Nuevo Profesional')}
                  </h2>
                  <p className="text-xs text-[#8E8E8E] font-bold uppercase tracking-widest mt-1">Formulario de Registro CORE</p>
                </div>
                <button 
                  onClick={handleCloseForm}
                  className="p-3 hover:bg-[#F8F9FC] rounded-2xl transition-colors text-[#8E8E8E] hover:text-[#E31D4A]"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-4">
                {activeTab === 'empresas' && (
                  <EmpresaForm 
                    initialData={selectedEmpresa || {}} 
                    onSubmit={handleFormSubmit} 
                    onCancel={handleCloseForm}
                    isLoading={isLoading}
                  />
                )}
                {activeTab === 'personas' && (
                  <PersonaForm 
                    initialData={selectedPersona || {}} 
                    onSubmit={handleFormSubmit} 
                    onCancel={handleCloseForm}
                    isLoading={isLoading}
                  />
                )}
                {activeTab === 'profesionales' && (
                  <ProfesionalForm 
                    initialData={selectedProfesional || {}} 
                    onSubmit={handleFormSubmit} 
                    onCancel={handleCloseForm}
                    personas={MOCK_PERSONAS}
                    empresas={MOCK_EMPRESAS}
                    isLoading={isLoading}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </QueryClientProvider>
  );
}
