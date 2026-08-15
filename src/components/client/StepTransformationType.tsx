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
  Building,
  Check,
  Award,
  Heart
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
    <div className="max-w-5xl mx-auto space-y-7 sm:space-y-8 animate-fadeIn text-slate-800">
      
      {/* Header / Inspiration Greeting */}
      <div className="text-center space-y-3 pt-1">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/70 text-amber-800 text-xs font-semibold">
          <Award className="w-3.5 h-3.5 text-amber-600" />
          <span>Paso 1: Asesoría & Diagnóstico de Espacio</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
          ¿Qué espacio deseas <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600">renovar hoy?</span>
        </h1>
        
        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          "Cada ambiente tiene una historia y una necesidad de protección única."
          <span className="block text-xs sm:text-sm text-slate-500 mt-1">
            Selecciona la categoría para calibrar el tipo de pintura (Viniltex®, Koraza®, Sellomax®) y rendimiento necesario.
          </span>
        </p>
      </div>

      {/* Primary 3 Categories (Crisp White Cards with Soft Glow and Borders) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
        {TRANSFORMATION_TARGETS.map((target) => {
          const isSelected = selectedTarget === target.id;
          const TargetIcon = target.id === 'hogar' ? Home : target.id === 'empresa' ? Building2 : Hammer;

          return (
            <div
              key={target.id}
              id={`card-target-${target.id}`}
              onClick={() => handleSelectTarget(target.id)}
              className={`group relative p-5 sm:p-6 rounded-3xl cursor-pointer transition-all duration-200 text-left overflow-hidden select-none min-h-[170px] flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-50/60 border-2 border-amber-500 shadow-md shadow-amber-500/10 transform -translate-y-0.5'
                  : 'bg-white border border-slate-200/90 hover:border-amber-300 hover:shadow-sm active:scale-[0.99]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-2xl transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'bg-slate-100 text-slate-700 group-hover:text-amber-700 group-hover:bg-amber-100/50'
                  }`}>
                    <TargetIcon className="w-6 h-6" />
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <span className="text-2xl">{target.emoji}</span>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-amber-600" />
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-amber-800 transition-colors font-display">
                    {target.title}
                  </h3>
                  <p className="text-xs font-semibold text-amber-700 mt-0.5">
                    {target.tagline}
                  </p>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
                    {target.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-500">
                <span>{target.subspaces.length} ambientes</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  isSelected ? 'bg-amber-200 text-amber-900' : 'bg-slate-100 text-slate-600'
                }`}>
                  {isSelected ? '✓ Seleccionado' : 'Elegir'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Subspace Selection Panel in Clean White */}
      <div className="p-5 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4 sm:space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 font-mono">
              Ambiente Específico
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
              ¿Cuál de estos espacios en <span className="text-amber-700">{currentCategory.title.toLowerCase()}</span> quieres renovar?
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            Recomendación y cálculo a la medida
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
                className={`p-4 rounded-2xl border cursor-pointer transition-all text-left flex items-start space-x-3.5 min-h-[76px] active:scale-[0.98] ${
                  isSubSelected
                    ? 'bg-amber-50/70 border-amber-400 text-slate-900 shadow-sm'
                    : 'bg-slate-50/70 border-slate-200/80 text-slate-700 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                  isSubSelected ? 'bg-amber-500 text-slate-950 shadow-xs' : 'bg-white text-slate-600 border border-slate-200'
                }`}>
                  {renderIcon(sub.icon)}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm truncate text-slate-900">
                      {sub.label}
                    </span>
                    {isSubSelected && <Check className="w-4 h-4 text-amber-600 shrink-0" />}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                    {sub.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 font-mono">
                      ~{sub.estimatedArea} m²
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-semibold truncate">
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
        <div className="text-xs text-slate-600 flex items-center space-x-2 text-center sm:text-left">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Espacio listo: <strong className="text-slate-900">{currentCategory.title}</strong> &gt; <strong className="text-amber-800">{selectedSubspace}</strong>
          </span>
        </div>

        <button
          id="btn-next-to-capture"
          onClick={onNext}
          className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 cursor-pointer"
        >
          <span>Siguiente: Subir Foto de tu Muro</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </button>
      </div>

    </div>
  );
};
