import React, { useState } from 'react';
import {
  Sparkles,
  Home,
  Building2,
  Hammer,
  ArrowRight,
  CheckCircle2,
  Bed,
  Sofa,
  Droplets,
  Sun,
  Briefcase,
  Store,
  Factory,
  Layers,
  Shield,
  Car,
  CheckCircle,
  Building,
  Check
} from 'lucide-react';
import { ClientProjectInput, TransformationTarget } from '../../types';
import { TRANSFORMATION_TARGETS } from '../../data/mockData';

interface StepTransformationTypeProps {
  input: ClientProjectInput;
  onChange: (updates: Partial<ClientProjectInput>) => void;
  onNext: () => void;
}

export const StepTransformationType: React.FC<StepTransformationTypeProps> = ({
  input,
  onChange,
  onNext
}) => {
  const [selectedTarget, setSelectedTarget] = useState<TransformationTarget>(
    input.transformationTarget || 'hogar'
  );
  const [selectedSubspace, setSelectedSubspace] = useState<string>(
    input.specificSpaceSubtype || 'Sala / Comedor'
  );

  const currentCategory = TRANSFORMATION_TARGETS.find(t => t.id === selectedTarget) || TRANSFORMATION_TARGETS[0];

  const handleSelectTarget = (target: TransformationTarget) => {
    setSelectedTarget(target);
    const category = TRANSFORMATION_TARGETS.find(t => t.id === target) || TRANSFORMATION_TARGETS[0];
    const defaultSub = category.subspaces[0];
    setSelectedSubspace(defaultSub.label);

    onChange({
      transformationTarget: target,
      clientType: target === 'hogar' ? 'particular' : target === 'empresa' ? 'empresa' : 'constructor',
      spaceType: target === 'hogar' ? 'hogar' : target === 'empresa' ? 'oficina' : 'constructivo',
      specificSpaceSubtype: defaultSub.label,
      specificArea: defaultSub.description,
      estimatedM2: defaultSub.estimatedArea
    });
  };

  const handleSelectSubspace = (subspaceLabel: string, area: number, desc: string) => {
    setSelectedSubspace(subspaceLabel);
    onChange({
      specificSpaceSubtype: subspaceLabel,
      specificArea: desc,
      estimatedM2: area
    });
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bed': return <Bed className="w-4 h-4" />;
      case 'Sofa': return <Sofa className="w-4 h-4" />;
      case 'Droplets': return <Droplets className="w-4 h-4" />;
      case 'Sun': return <Sun className="w-4 h-4" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4" />;
      case 'Store': return <Store className="w-4 h-4" />;
      case 'Factory': return <Factory className="w-4 h-4" />;
      case 'Layers': return <Layers className="w-4 h-4" />;
      case 'Shield': return <Shield className="w-4 h-4" />;
      case 'Car': return <Car className="w-4 h-4" />;
      case 'Building': return <Building className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Hero / Tagline Header */}
      <div className="text-center space-y-3.5 pt-2">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Ecosistema Inteligente de Pinturas Pintuco</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display">
          ¿Qué quieres <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-300">transformar?</span>
        </h1>
        
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
          "Antes de elegir una pintura, entiende tu espacio."
          <span className="block text-sm text-slate-400 mt-1">
            Personalizamos el diagnóstico de superficie, la protección y el color ideal según tu tipo de proyecto.
          </span>
        </p>
      </div>

      {/* Primary 3 Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {TRANSFORMATION_TARGETS.map((target) => {
          const isSelected = selectedTarget === target.id;
          const TargetIcon = target.id === 'hogar' ? Home : target.id === 'empresa' ? Building2 : Hammer;

          return (
            <div
              key={target.id}
              id={`card-target-${target.id}`}
              onClick={() => handleSelectTarget(target.id)}
              className={`group relative p-6 sm:p-7 rounded-2xl cursor-pointer transition-all duration-300 border text-left overflow-hidden ${
                isSelected
                  ? 'bg-slate-900/90 border-cyan-400 ring-2 ring-cyan-400/40 shadow-2xl shadow-cyan-500/15 transform -translate-y-1'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70 hover:-translate-y-0.5'
              }`}
            >
              {/* Subtle background glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${target.accentGradient} opacity-50 group-hover:opacity-100 transition-opacity`} />

              <div className="relative z-10 space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`p-3.5 rounded-xl transition-all ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-400/40'
                      : 'bg-slate-800/80 text-slate-400 group-hover:text-white group-hover:bg-slate-800'
                  }`}>
                    <TargetIcon className="w-7 h-7" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{target.emoji}</span>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 animate-scale" />
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors font-display">
                    {target.title}
                  </h3>
                  <p className="text-xs font-medium text-cyan-400/90 mt-0.5">
                    {target.tagline}
                  </p>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-2">
                    {target.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] font-semibold text-slate-400 group-hover:text-slate-200 transition-colors">
                  <span>{target.subspaces.length} espacios adaptados</span>
                  <span className={`px-2 py-0.5 rounded-full ${isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
                    {isSelected ? 'Seleccionado' : 'Elegir'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Subspace Selection Panel Adapted Dynamically */}
      <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800/90 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Paso 1 de 2: Espacio específico
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              ¿Cuál de estos espacios en <span className="text-cyan-300">{currentCategory.title.toLowerCase()}</span> vas a intervenir?
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Área estimada y productos adaptados
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {currentCategory.subspaces.map((sub) => {
            const isSubSelected = selectedSubspace === sub.label;

            return (
              <div
                key={sub.id}
                id={`btn-subspace-${sub.id}`}
                onClick={() => handleSelectSubspace(sub.label, sub.estimatedArea, sub.description)}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 text-left flex items-start space-x-3.5 ${
                  isSubSelected
                    ? 'bg-slate-800/90 border-cyan-500 ring-1 ring-cyan-500/40 text-white'
                    : 'bg-slate-900/40 border-slate-800/80 text-slate-300 hover:bg-slate-800/50 hover:border-slate-700'
                }`}
              >
                <div className={`p-2.5 rounded-lg shrink-0 mt-0.5 ${
                  isSubSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  {renderIcon(sub.icon)}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm truncate text-white">
                      {sub.label}
                    </span>
                    {isSubSelected && <Check className="w-4 h-4 text-cyan-400 shrink-0" />}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                    {sub.description}
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                      ~{sub.estimatedArea} m²
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-medium truncate">
                      {sub.recommendedProduct}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="text-xs text-slate-400 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            Has seleccionado: <strong className="text-white">{currentCategory.title}</strong> &gt; <strong className="text-cyan-300">{selectedSubspace}</strong>
          </span>
        </div>

        <button
          id="btn-next-to-capture"
          onClick={onNext}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer"
        >
          <span>Continuar: Muéstranos tu espacio</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
