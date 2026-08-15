import React, { useState } from 'react';
import { Home, Building2, User, Mail, Phone, MapPin, Briefcase, FileCheck, ArrowRight, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ClientProjectInput, ClientType } from '../../types';

interface StepClientTypeSelectionProps {
  input: ClientProjectInput;
  onChange: (updates: Partial<ClientProjectInput>) => void;
  onNext: () => void;
}

export const StepClientTypeSelection: React.FC<StepClientTypeSelectionProps> = ({
  input,
  onChange,
  onNext
}) => {
  const [selectedType, setSelectedType] = useState<ClientType>(input.clientType || 'particular');
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleSelectType = (type: ClientType) => {
    setSelectedType(type);
    setHasInteracted(true);
    if (type === 'particular') {
      onChange({
        clientType: 'particular',
        spaceType: input.spaceType === 'industria' ? 'hogar' : input.spaceType,
        housingType: input.housingType || 'Apartamento',
        housingGoal: input.housingGoal || 'Cambio de color'
      });
    } else {
      onChange({
        clientType: 'empresa',
        spaceType: input.spaceType === 'hogar' ? 'oficina' : input.spaceType,
        facilityType: input.facilityType || 'Oficina',
        projectType: input.projectType || 'Renovación comercial'
      });
    }
  };

  const isParticular = selectedType === 'particular';

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Intro Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Inicio de la Experiencia Personalizada</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display">
          ¿Qué tipo de cliente <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">eres?</span>
        </h1>
        
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Adaptamos el asistente técnico, la dosificación de producto y el proceso de atención según tu necesidad personal o corporativa.
        </p>
      </div>

      {/* Main Client Type Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
        
        {/* Particular Card */}
        <div
          id="card-client-particular"
          onClick={() => handleSelectType('particular')}
          className={`group relative p-6 sm:p-8 rounded-2xl cursor-pointer transition-all duration-300 border text-left overflow-hidden ${
            isParticular
              ? 'bg-slate-900/90 border-cyan-500 ring-2 ring-cyan-500/40 shadow-2xl shadow-cyan-500/15 transform -translate-y-1'
              : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70 hover:-translate-y-0.5'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

          <div className="relative z-10 space-y-5">
            <div className="flex items-start justify-between">
              <div className={`p-4 rounded-xl transition-all ${
                isParticular
                  ? 'bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-400/40'
                  : 'bg-slate-800/80 text-slate-400 group-hover:text-white group-hover:bg-slate-800'
              }`}>
                <Home className="w-8 h-8" />
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  Espacios Personales
                </span>
                {isParticular && (
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 animate-scale" />
                )}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white group-hover:text-cyan-200 transition-colors font-display">
                🏠 Cliente particular
              </h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                Para usuarios que quieren transformar, renovar o reparar sus espacios personales y familiares.
              </p>
            </div>

            {/* Scope items */}
            <div className="pt-3 border-t border-slate-800/80">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Espacios sugeridos:
              </p>
              <div className="flex flex-wrap gap-2">
                {['Casa', 'Apartamento', 'Habitación', 'Espacio personal / Finca'].map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/50"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-xs text-cyan-400/90 font-medium flex items-center gap-1.5 pt-1">
              <span>Formulario simplificado y asesoría amigable</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Empresa Card */}
        <div
          id="card-client-empresa"
          onClick={() => handleSelectType('empresa')}
          className={`group relative p-6 sm:p-8 rounded-2xl cursor-pointer transition-all duration-300 border text-left overflow-hidden ${
            !isParticular
              ? 'bg-slate-900/90 border-blue-500 ring-2 ring-blue-500/40 shadow-2xl shadow-blue-500/15 transform -translate-y-1'
              : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70 hover:-translate-y-0.5'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

          <div className="relative z-10 space-y-5">
            <div className="flex items-start justify-between">
              <div className={`p-4 rounded-xl transition-all ${
                !isParticular
                  ? 'bg-blue-500/20 text-blue-300 ring-1 ring-blue-400/40'
                  : 'bg-slate-800/80 text-slate-400 group-hover:text-white group-hover:bg-slate-800'
              }`}>
                <Building2 className="w-8 h-8" />
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  Corporativo & B2B
                </span>
                {!isParticular && (
                  <CheckCircle2 className="w-5 h-5 text-blue-400 animate-scale" />
                )}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors font-display">
                🏢 Empresa
              </h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                Para negocios, industrias, locales u obras que requieren fichas técnicas, normativas y alto desempeño.
              </p>
            </div>

            {/* Scope items */}
            <div className="pt-3 border-t border-slate-800/80">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Proyectos empresariales:
              </p>
              <div className="flex flex-wrap gap-2">
                {['Oficina', 'Local comercial', 'Industria', 'Proyecto constructivo'].map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/50"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-xs text-blue-400/90 font-medium flex items-center gap-1.5 pt-1">
              <span>Especificación técnica industrial y cotización formal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

      </div>

      {/* Adapted Registration Fields Section */}
      <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/70 border border-slate-800/90 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${isParticular ? 'bg-cyan-500/10 text-cyan-400' : 'bg-blue-500/10 text-blue-400'}`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {isParticular ? 'Datos de Contacto Particular' : 'Datos de la Empresa & Responsable'}
              </h3>
              <p className="text-xs text-slate-400">
                {isParticular 
                  ? 'Para personalizar tu bienvenida y enviarte la recomendación'
                  : 'Para facturación técnica, visitas periciales e informe comercial'}
              </p>
            </div>
          </div>

          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 self-start sm:self-auto">
            {isParticular ? 'Perfil Particular' : 'Perfil Empresa'}
          </span>
        </div>

        {/* Form Inputs based on client type */}
        {isParticular ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>Nombre completo *</span>
              </label>
              <input
                type="text"
                value={input.clientName}
                onChange={(e) => onChange({ clientName: e.target.value })}
                placeholder="Ej. María Fernández"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Correo electrónico *</span>
              </label>
              <input
                type="email"
                value={input.clientEmail}
                onChange={(e) => onChange({ clientEmail: e.target.value })}
                placeholder="maria.fernandez@email.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>Teléfono de contacto *</span>
              </label>
              <input
                type="tel"
                value={input.clientPhone}
                onChange={(e) => onChange({ clientPhone: e.target.value })}
                placeholder="+34 600 123 456"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ciudad / Ubicación *</span>
              </label>
              <input
                type="text"
                value={input.clientCity}
                onChange={(e) => onChange({ clientCity: e.target.value })}
                placeholder="Madrid, Chamartín"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                <span>Nombre de la Empresa *</span>
              </label>
              <input
                type="text"
                value={input.companyName || ''}
                onChange={(e) => onChange({ companyName: e.target.value, clientName: e.target.value })}
                placeholder="Ej. AutoTech Soluciones S.L."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>NIT / CIF *</span>
              </label>
              <input
                type="text"
                value={input.companyNit || ''}
                onChange={(e) => onChange({ companyNit: e.target.value })}
                placeholder="B-12345678"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-400" />
                <span>Persona Responsable *</span>
              </label>
              <input
                type="text"
                value={input.companyContactPerson || ''}
                onChange={(e) => onChange({ companyContactPerson: e.target.value })}
                placeholder="Ej. Ing. Carlos Mendoza"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>Correo corporativo *</span>
              </label>
              <input
                type="email"
                value={input.clientEmail}
                onChange={(e) => onChange({ clientEmail: e.target.value })}
                placeholder="contacto@autotech.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>Teléfono directo / PBX *</span>
              </label>
              <input
                type="tel"
                value={input.clientPhone}
                onChange={(e) => onChange({ clientPhone: e.target.value })}
                placeholder="+34 912 345 678"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Ciudad / Sede del proyecto *</span>
              </label>
              <input
                type="text"
                value={input.clientCity}
                onChange={(e) => onChange({ clientCity: e.target.value })}
                placeholder="Barcelona, Polígono Zona Franca"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all"
              />
            </div>
          </div>
        )}

      </div>

      {/* Continue Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md gap-4">
        <div className="flex items-center space-x-3 text-left">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <p className="text-xs sm:text-sm text-slate-300">
            Modo activo:{' '}
            <strong className="text-white">
              {isParticular ? '🏠 Cliente Particular' : '🏢 Empresa'}
            </strong>{' '}
            {input.clientName || input.companyName ? `(${input.clientName || input.companyName})` : ''}
          </p>
        </div>

        <button
          id="btn-client-type-continue"
          onClick={onNext}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all transform hover:scale-[1.02] cursor-pointer active:scale-95"
        >
          <span>Continuar a Selección de Espacio</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
