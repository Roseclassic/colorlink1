import React from 'react';
import { Home, Building2, Store, Factory, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { SPACE_OPTIONS } from '../../data/mockData';
import { SpaceType } from '../../types';

interface StepSpaceSelectionProps {
  selectedSpace: SpaceType;
  onSelectSpace: (space: SpaceType) => void;
  onNext: () => void;
}

export const StepSpaceSelection: React.FC<StepSpaceSelectionProps> = ({
  selectedSpace,
  onSelectSpace,
  onNext
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return <Home className="w-8 h-8" />;
      case 'Building2':
        return <Building2 className="w-8 h-8" />;
      case 'Store':
        return <Store className="w-8 h-8" />;
      case 'Factory':
        return <Factory className="w-8 h-8" />;
      default:
        return <Home className="w-8 h-8" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Conversational Intro */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Asistente Técnico Digital ColorLink</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display">
          ¿Qué espacio quieres <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">transformar?</span>
        </h1>
        
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Sin formularios aburridos. Selecciona tu tipo de proyecto y nuestro motor de IA evaluará la superficie exacta, patologías y el sistema técnico idóneo.
        </p>
      </div>

      {/* Visual Interactive Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
        {SPACE_OPTIONS.map((option) => {
          const isSelected = selectedSpace === option.id;

          return (
            <div
              key={option.id}
              id={`card-space-${option.id}`}
              onClick={() => onSelectSpace(option.id)}
              className={`group relative p-6 sm:p-7 rounded-2xl cursor-pointer transition-all duration-300 border text-left overflow-hidden ${
                isSelected
                  ? 'bg-slate-900/90 border-cyan-500 ring-2 ring-cyan-500/40 shadow-2xl shadow-cyan-500/10 transform -translate-y-1'
                  : 'bg-slate-900/50 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/80 hover:-translate-y-0.5'
              }`}
            >
              {/* Background ambient gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-40 group-hover:opacity-70 transition-opacity`} />

              <div className="relative z-10 space-y-4">
                {/* Header row with Icon & Badge */}
                <div className="flex items-start justify-between">
                  <div className={`p-3.5 rounded-xl transition-all ${
                    isSelected 
                      ? 'bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-400/30' 
                      : 'bg-slate-800/80 text-slate-300 group-hover:text-white group-hover:bg-slate-800'
                  }`}>
                    {getIcon(option.iconName)}
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/60">
                      {option.popularBadge}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 animate-scale" />
                    )}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors font-display">
                    {option.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                    {option.subtitle}
                  </p>
                </div>

                {/* Subtypes preview pills */}
                <div className="pt-2 border-t border-slate-800/60">
                  <p className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider mb-2">
                    Áreas típicas:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {option.subtypes.slice(0, 3).map((sub, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/70 text-slate-300 group-hover:border-slate-700/70 border border-transparent"
                      >
                        {sub}
                      </span>
                    ))}
                    {option.subtypes.length > 3 && (
                      <span className="text-[11px] px-1.5 py-0.5 rounded-md text-slate-500">
                        +{option.subtypes.length - 3} más
                      </span>
                    )}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Continue Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md gap-4">
        <div className="flex items-center space-x-3 text-left">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <p className="text-xs sm:text-sm text-slate-300">
            Has seleccionado: <span className="font-semibold text-white capitalize">{SPACE_OPTIONS.find(s => s.id === selectedSpace)?.title}</span>
          </p>
        </div>

        <button
          id="btn-space-continue"
          onClick={onNext}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 transition-all duration-200 cursor-pointer active:scale-95"
        >
          <span>Continuar con especificaciones</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
