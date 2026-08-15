import React from 'react';
import {
  Droplets,
  AlertTriangle,
  Sparkles,
  ShieldAlert,
  Flame,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Ruler,
  Activity,
  Layers,
  HelpCircle
} from 'lucide-react';
import { SPACE_OPTIONS } from '../../data/mockData';
import { ClientProjectInput, FinishType, SurfaceCondition, TrafficLevel } from '../../types';

interface StepSurfaceAndSpecsProps {
  input: ClientProjectInput;
  onChange: (updates: Partial<ClientProjectInput>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const StepSurfaceAndSpecs: React.FC<StepSurfaceAndSpecsProps> = ({
  input,
  onChange,
  onNext,
  onPrev
}) => {
  const currentSpaceConfig = SPACE_OPTIONS.find((s) => s.id === input.spaceType) || SPACE_OPTIONS[0];

  const surfaceConditions: {
    id: SurfaceCondition;
    label: string;
    description: string;
    icon: React.ReactNode;
    severityColor: string;
  }[] = [
    {
      id: 'bueno',
      label: 'Buen estado / Estético',
      description: 'Superficie lisa y firme, cambio de color o actualización decorativa.',
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
      severityColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
    },
    {
      id: 'humedad',
      label: 'Humedad o filtraciones',
      description: 'Manchas de agua, eflorescencias salinas o zócalos abombados.',
      icon: <Droplets className="w-5 h-5 text-cyan-400" />,
      severityColor: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10'
    },
    {
      id: 'desconchado',
      label: 'Descascarillado o ampollas',
      description: 'Pintura vieja que se desprende al raspar o capas sueltas.',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
      severityColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10'
    },
    {
      id: 'moho',
      label: 'Moho, hongos o manchas negras',
      description: 'Zonas con condensación excesiva, baño o poca ventilación.',
      icon: <ShieldAlert className="w-5 h-5 text-purple-400" />,
      severityColor: 'border-purple-500/30 text-purple-400 bg-purple-500/10'
    },
    {
      id: 'fisuras',
      label: 'Fisuras o grietas visibles',
      description: 'Microfisuras en yeso, juntas dilatadas o mortero agrietado.',
      icon: <Layers className="w-5 h-5 text-orange-400" />,
      severityColor: 'border-orange-500/30 text-orange-400 bg-orange-500/10'
    },
    {
      id: 'oxido',
      label: 'Óxido / Desgaste industrial',
      description: 'Metales con corrosión o soleras de concreto con aceites.',
      icon: <Flame className="w-5 h-5 text-rose-400" />,
      severityColor: 'border-rose-500/30 text-rose-400 bg-rose-500/10'
    }
  ];

  const trafficLevels: { id: TrafficLevel; label: string; sub: string }[] = [
    { id: 'bajo', label: 'Bajo', sub: 'Dormitorios, techos' },
    { id: 'medio', label: 'Medio', sub: 'Salones, despachos' },
    { id: 'alto', label: 'Alto', sub: 'Pasillos, tiendas' },
    { id: 'extremo', label: 'Extremo', sub: 'Industria, carretillas' }
  ];

  const finishOptions: { id: FinishType; label: string; desc: string }[] = [
    { id: 'mate', label: 'Mate Elegante', desc: 'Disimula imperfecciones, estética sobria' },
    { id: 'satinado', label: 'Satinado Sedoso', desc: 'Fácil lavado, sutil reflejo de luz' },
    { id: 'brillante', label: 'Brillo / Espejo', desc: 'Máxima reflectividad y protección' }
  ];

  const areaPresets = [15, 30, 60, 120, 250];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Step Header */}
      <div className="space-y-2 text-left sm:text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
          Paso 2 de 4 • Diagnóstico del Sustrato
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          Detalles del espacio y estado de la superficie
        </h2>
        <p className="text-sm text-slate-400 max-w-xl sm:mx-auto">
          Ayuda a la IA a calibrar la resistencia química, tipo de fijador y rendimiento de litros.
        </p>
      </div>

      {/* Sub-zone selector pills */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <label className="block text-sm font-semibold text-white">
          1. ¿Qué zona específica vas a tratar?
        </label>
        <div className="flex flex-wrap gap-2">
          {currentSpaceConfig.subtypes.map((sub) => {
            const isSelected = input.specificArea === sub;
            return (
              <button
                key={sub}
                type="button"
                onClick={() => onChange({ specificArea: sub })}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                }`}
              >
                {sub}
              </button>
            );
          })}
        </div>
      </div>

      {/* Surface condition cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-semibold text-white">
            2. ¿En qué estado se encuentra la superficie actual?
          </label>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" /> La IA lo verificará con tu foto
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {surfaceConditions.map((cond) => {
            const isSelected = input.currentCondition === cond.id;
            return (
              <div
                key={cond.id}
                id={`card-condition-${cond.id}`}
                onClick={() => onChange({ currentCondition: cond.id })}
                className={`p-4 rounded-xl cursor-pointer transition-all border text-left flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900/90 border-cyan-400 ring-2 ring-cyan-400/30 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg ${cond.severityColor}`}>
                      {cond.icon}
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <h4 className="text-sm font-bold text-white font-display">
                    {cond.label}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {cond.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Surface Area (m²) & Traffic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Surface Area Slider & Input */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Ruler className="w-4 h-4 text-cyan-400" />
              <label className="text-sm font-semibold text-white">
                3. Superficie estimada (m²)
              </label>
            </div>
            <div className="flex items-center space-x-1.5 px-3 py-1 bg-slate-800 rounded-lg border border-slate-700">
              <input
                id="input-m2-number"
                type="number"
                min="5"
                max="2000"
                value={input.estimatedM2}
                onChange={(e) => onChange({ estimatedM2: Number(e.target.value) || 0 })}
                className="w-16 bg-transparent text-right font-mono font-bold text-white text-base focus:outline-none"
              />
              <span className="text-xs font-mono text-cyan-400">m²</span>
            </div>
          </div>

          <input
            id="slider-m2"
            type="range"
            min="5"
            max="300"
            step="5"
            value={input.estimatedM2}
            onChange={(e) => onChange({ estimatedM2: Number(e.target.value) })}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span>Presets rápidos:</span>
            <div className="flex gap-1.5">
              {areaPresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => onChange({ estimatedM2: preset })}
                  className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
                    input.estimatedM2 === preset
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white'
                  }`}
                >
                  {preset}m²
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Traffic Level & Finish */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <label className="text-sm font-semibold text-white">
              4. Nivel de tránsito / Exigencia
            </label>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {trafficLevels.map((lvl) => {
              const isSelected = input.trafficLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => onChange({ trafficLevel: lvl.id })}
                  className={`p-2.5 rounded-xl text-left transition-all border ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-500 text-cyan-300 shadow-sm'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="text-xs font-bold text-white capitalize">{lvl.label}</div>
                  <div className="text-[10px] text-slate-400">{lvl.sub}</div>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800/60">
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Acabado visual preferido:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {finishOptions.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => onChange({ preferredFinish: f.id })}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                    input.preferredFinish === f.id
                      ? 'bg-slate-700 text-cyan-300 border border-cyan-400/40 font-bold'
                      : 'bg-slate-800/40 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {f.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          id="btn-specs-prev"
          onClick={onPrev}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-medium text-sm transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al espacio</span>
        </button>

        <button
          id="btn-specs-next"
          onClick={onNext}
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 transition-all cursor-pointer active:scale-95"
        >
          <span>Continuar a fotos e IA</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
