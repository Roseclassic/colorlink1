import React from 'react';
import { Home, Building2, Store, Factory, ArrowRight, ArrowLeft, Sparkles, CheckCircle2, Paintbrush, Hammer, Wrench, Shield, Clock, Award } from 'lucide-react';
import { ClientProjectInput, SpaceType } from '../../types';

interface StepSpaceSelectionProps {
  input: ClientProjectInput;
  onChange: (updates: Partial<ClientProjectInput>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const StepSpaceSelection: React.FC<StepSpaceSelectionProps> = ({
  input,
  onChange,
  onNext,
  onPrev
}) => {
  const isParticular = input.clientType === 'particular';

  // Personalized Greeting
  const displayName = isParticular
    ? (input.clientName ? input.clientName.split(' ')[0] : 'Particular')
    : (input.companyName || input.clientName || 'Empresa');

  const greetingTitle = isParticular
    ? `Hola ${displayName}, cuéntanos qué espacio quieres transformar`
    : `Hola ${displayName}, iniciemos el análisis técnico de tu proyecto`;

  // Space options tailored for segment
  const particularSpaces: {
    id: SpaceType;
    housingOption: 'Casa' | 'Apartamento' | 'Habitación' | 'Espacio personal / Finca';
    title: string;
    description: string;
    icon: React.ReactNode;
    areas: string[];
    gradient: string;
  }[] = [
    {
      id: 'hogar',
      housingOption: 'Casa',
      title: 'Casa Unifamiliar / Chalet',
      description: 'Salones, fachadas exteriores, terrazas, dormitorios y techos.',
      icon: <Home className="w-7 h-7" />,
      areas: ['Salón / Comedor', 'Fachada exterior', 'Cocina & Baños', 'Dormitorios'],
      gradient: 'from-cyan-500/15 via-blue-500/5 to-transparent'
    },
    {
      id: 'hogar',
      housingOption: 'Apartamento',
      title: 'Apartamento / Piso',
      description: 'Paredes interiores, zócalos, pasillos y áreas con luz natural.',
      icon: <Building2 className="w-7 h-7" />,
      areas: ['Paredes interiores', 'Pasillo / Entrada', 'Zócalos y molduras', 'Balcón'],
      gradient: 'from-blue-500/15 via-indigo-500/5 to-transparent'
    },
    {
      id: 'hogar',
      housingOption: 'Habitación',
      title: 'Habitación / Estancia individual',
      description: 'Dormitorio principal, cuarto infantil o estudio privado con pinturas lavables.',
      icon: <Paintbrush className="w-7 h-7" />,
      areas: ['Pared cabecera', 'Techo / Cielorraso', 'Armarios empotrados', 'Estudio'],
      gradient: 'from-emerald-500/15 via-teal-500/5 to-transparent'
    },
    {
      id: 'hogar',
      housingOption: 'Espacio personal / Finca',
      title: 'Espacio personal / Finca / Garaje',
      description: 'Muros perimetrales, garaje residencial, barbacoa o porches de madera/metal.',
      icon: <Wrench className="w-7 h-7" />,
      areas: ['Muro perimetral', 'Suelo de garaje', 'Pérgola / Forja', 'Bodega'],
      gradient: 'from-amber-500/15 via-orange-500/5 to-transparent'
    }
  ];

  const empresaSpaces: {
    id: SpaceType;
    facilityOption: 'Oficina' | 'Local comercial' | 'Industria' | 'Proyecto constructivo';
    title: string;
    description: string;
    icon: React.ReactNode;
    areas: string[];
    gradient: string;
  }[] = [
    {
      id: 'oficina',
      facilityOption: 'Oficina',
      title: 'Oficina & Corporativo',
      description: 'Pintura ecológica cero olores A+, secado express en horario no laboral.',
      icon: <Building2 className="w-7 h-7" />,
      areas: ['Open space', 'Salas de reuniones', 'Recepción / Lobby', 'Pasillos de alto paso'],
      gradient: 'from-blue-500/15 via-indigo-500/5 to-transparent'
    },
    {
      id: 'comercio',
      facilityOption: 'Local comercial',
      title: 'Local Comercial / Retail & Horeca',
      description: 'Alta lavabilidad, resistencia a manchas continuas y tonos de identidad de marca.',
      icon: <Store className="w-7 h-7" />,
      areas: ['Fachada comercial', 'Sala de ventas', 'Cocina / Almacén', 'Probadores'],
      gradient: 'from-amber-500/15 via-orange-500/5 to-transparent'
    },
    {
      id: 'industria',
      facilityOption: 'Industria',
      title: 'Industria, Naves & Pavimentos',
      description: 'Sistemas epóxicos 2K, poliuretanos anti-abrasión y resistencia a químicos.',
      icon: <Factory className="w-7 h-7" />,
      areas: ['Suelo de nave industrial', 'Muros perimetrales', 'Estructuras metálicas', 'Zonas de carga'],
      gradient: 'from-rose-500/15 via-purple-500/5 to-transparent'
    },
    {
      id: 'industria',
      facilityOption: 'Proyecto constructivo',
      title: 'Proyecto Constructivo / Obra Nueva',
      description: 'Especificación de imprimaciones de gran formato, selladores y certificaciones LEED.',
      icon: <Award className="w-7 h-7" />,
      areas: ['Edificio completo', 'Sótanos / Parking', 'Zonas comunes', 'Fachada ventilada'],
      gradient: 'from-cyan-500/15 via-blue-500/5 to-transparent'
    }
  ];

  const goalsParticular: ('Cambio de color' | 'Renovación' | 'Reparación')[] = [
    'Cambio de color',
    'Renovación',
    'Reparación'
  ];

  const projectTypesEmpresa: ('Proyecto nuevo' | 'Mantenimiento' | 'Renovación comercial' | 'Tratamiento técnico especializado')[] = [
    'Proyecto nuevo',
    'Mantenimiento',
    'Renovación comercial',
    'Tratamiento técnico especializado'
  ];

  const empresaRequirements = [
    'Cero olor / Bajo VOC A+',
    'Secado ultra-rápido en fin de semana',
    'Máxima lavabilidad (Norma EN 13300)',
    'Antideslizante homologado',
    'Resistencia química a aceites / ácidos',
    'Ignífugo / Certificación de fuego'
  ];

  const toggleSpecialRequirement = (req: string) => {
    const current = input.specialRequirements || [];
    const exists = current.includes(req);
    const updated = exists ? current.filter((r) => r !== req) : [...current, req];
    onChange({ specialRequirements: updated });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Conversational Intro with Personalized Greeting */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Experiencia Adaptada para {isParticular ? 'Particular' : 'Empresa'}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
          {greetingTitle}
        </h1>
        
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {isParticular
            ? 'Selecciona el tipo de vivienda o estancia para que la IA proponga el acabado y rendimiento ideal.'
            : 'Selecciona la infraestructura a intervenir para calibrar requerimientos normativos, tránsito y resistencia.'}
        </p>
      </div>

      {/* Visual Space Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        {isParticular ? (
          particularSpaces.map((opt) => {
            const isSelected = input.housingType === opt.housingOption;
            return (
              <div
                key={opt.housingOption}
                id={`card-space-${opt.housingOption}`}
                onClick={() => {
                  onChange({
                    spaceType: opt.id,
                    housingType: opt.housingOption,
                    specificArea: opt.areas[0]
                  });
                }}
                className={`group relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border text-left overflow-hidden ${
                  isSelected
                    ? 'bg-slate-900/90 border-cyan-500 ring-2 ring-cyan-500/40 shadow-2xl shadow-cyan-500/10 transform -translate-y-1'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70 hover:-translate-y-0.5'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${opt.gradient} opacity-50 group-hover:opacity-90 transition-opacity`} />

                <div className="relative z-10 space-y-3.5">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl transition-all ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-400/40'
                        : 'bg-slate-800/80 text-slate-400 group-hover:text-white group-hover:bg-slate-800'
                    }`}>
                      {opt.icon}
                    </div>

                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 animate-scale" />
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-200 transition-colors font-display">
                      {opt.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {opt.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/70">
                    <div className="flex flex-wrap gap-1.5">
                      {opt.areas.map((area, i) => (
                        <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          empresaSpaces.map((opt) => {
            const isSelected = input.facilityType === opt.facilityOption;
            return (
              <div
                key={opt.facilityOption}
                id={`card-facility-${opt.facilityOption}`}
                onClick={() => {
                  onChange({
                    spaceType: opt.id,
                    facilityType: opt.facilityOption,
                    specificArea: opt.areas[0]
                  });
                }}
                className={`group relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border text-left overflow-hidden ${
                  isSelected
                    ? 'bg-slate-900/90 border-blue-500 ring-2 ring-blue-500/40 shadow-2xl shadow-blue-500/10 transform -translate-y-1'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70 hover:-translate-y-0.5'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${opt.gradient} opacity-50 group-hover:opacity-90 transition-opacity`} />

                <div className="relative z-10 space-y-3.5">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl transition-all ${
                      isSelected
                        ? 'bg-blue-500/20 text-blue-300 ring-1 ring-blue-400/40'
                        : 'bg-slate-800/80 text-slate-400 group-hover:text-white group-hover:bg-slate-800'
                    }`}>
                      {opt.icon}
                    </div>

                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-blue-400 animate-scale" />
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-200 transition-colors font-display">
                      {opt.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {opt.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/70">
                    <div className="flex flex-wrap gap-1.5">
                      {opt.areas.map((area, i) => (
                        <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Goal / Project Type Selector based on Segment */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <label className="block text-sm font-semibold text-white">
          {isParticular ? '¿Cuál es el objetivo principal de este proyecto?' : '¿Qué tipo de intervención requiere la empresa?'}
        </label>
        
        {isParticular ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {goalsParticular.map((goal) => {
              const isSelected = input.housingGoal === goal;
              return (
                <button
                  key={goal}
                  type="button"
                  onClick={() => onChange({ housingGoal: goal })}
                  className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-500 text-white font-semibold ring-1 ring-cyan-500/30'
                      : 'bg-slate-800/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="text-sm">{goal}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {projectTypesEmpresa.map((pt) => {
              const isSelected = input.projectType === pt;
              return (
                <button
                  key={pt}
                  type="button"
                  onClick={() => onChange({ projectType: pt })}
                  className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-500/20 border-blue-500 text-white font-semibold ring-1 ring-blue-500/30'
                      : 'bg-slate-800/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="text-sm">{pt}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                </button>
              );
            })}
          </div>
        )}

        {/* Extra company special requirements chips */}
        {!isParticular && (
          <div className="pt-3 border-t border-slate-800/80 space-y-2">
            <label className="block text-xs font-semibold text-slate-300">
              Requerimientos técnicos especiales (opcional):
            </label>
            <div className="flex flex-wrap gap-2">
              {empresaRequirements.map((req) => {
                const isSelected = (input.specialRequirements || []).includes(req);
                return (
                  <button
                    key={req}
                    type="button"
                    onClick={() => toggleSpecialRequirement(req)}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-500/30 border-blue-400 text-blue-200 font-medium'
                        : 'bg-slate-800/70 border-slate-700/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {req}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          id="btn-space-prev"
          onClick={onPrev}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-medium text-sm transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Atrás</span>
        </button>

        <button
          id="btn-space-continue"
          onClick={onNext}
          className="inline-flex items-center space-x-2 px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all transform hover:scale-[1.02] cursor-pointer active:scale-95"
        >
          <span>Continuar a Estado de Superficie</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
