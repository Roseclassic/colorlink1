import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Layers,
  Droplets,
  Clock,
  Award,
  Calendar,
  Zap,
  HelpCircle,
  FileCheck,
  Check,
  ExternalLink,
  ChevronRight,
  PhoneCall,
  Download
} from 'lucide-react';
import {
  AiTechnicalAnalysis,
  ClientProjectInput,
  TechnicalRecommendation
} from '../../types';

interface StepSmartRecommendationCardProps {
  input: ClientProjectInput;
  aiAnalysis: AiTechnicalAnalysis;
  recommendation: TechnicalRecommendation;
  onNext: () => void;
  onBack: () => void;
  onScheduleVisit: () => void;
}

export const StepSmartRecommendationCard: React.FC<StepSmartRecommendationCardProps> = ({
  input,
  aiAnalysis,
  recommendation,
  onNext,
  onBack,
  onScheduleVisit
}) => {
  const [selectedNextStep, setSelectedNextStep] = useState<number>(0);

  const getComplexityBadge = (complexity: string) => {
    switch (complexity) {
      case 'Fácil (DIY)':
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
      case 'Moderado':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
      default:
        return 'bg-purple-500/10 text-purple-300 border-purple-500/30';
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Top Header */}
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
          <Award className="w-3.5 h-3.5 text-cyan-400" />
          <span>Prescripción Certificada Ecosistema Pintuco</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
          Tu recomendación <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-300">ColorLink</span>
        </h2>
        
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          Diseñada a la medida de tu espacio, sustrato y metraje. Garantiza adherencia perfecta, lavabilidad y protección duradera.
        </p>
      </div>

      {/* HERO RECOMMENDATION CARD (Diseño Premium Pintuco) */}
      <div className="relative rounded-3xl overflow-hidden border border-cyan-500/40 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950 shadow-2xl p-6 sm:p-8 space-y-7">
        
        {/* Glow Accent Effect */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Card Header: System Title & Badges */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-800 relative z-10">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 text-[11px] font-bold tracking-wide uppercase border border-cyan-500/30">
                {recommendation.solutionType}
              </span>
              <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${getComplexityBadge(recommendation.complexityLevel)}`}>
                Nivel: {recommendation.complexityLevel}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {recommendation.recommendedSystem}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {recommendation.systemSummary}
            </p>
          </div>

          <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-2 shrink-0 p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono">Garantía Certificada</span>
            <div className="flex items-center space-x-1.5 text-cyan-300 font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{recommendation.warrantyPeriod}</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Aplicación en ~{recommendation.estimatedLaborDays} días</span>
          </div>
        </div>

        {/* Products Matrix (Primer + Main Coating) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
          
          {/* Primer / Imprimación */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                Paso 1: Sellado / Imprimación
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                Dosis: {recommendation.calculatedPrimerLiters} L
              </span>
            </div>

            <div>
              <h4 className="text-base font-bold text-white">
                {recommendation.primerProduct.name}
              </h4>
              <p className="text-xs text-cyan-300/90 font-medium">
                {recommendation.primerProduct.type}
              </p>
            </div>

            <ul className="space-y-1 text-xs text-slate-300">
              {recommendation.primerProduct.features.map((feat, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Coating Product */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-cyan-500/30 ring-1 ring-cyan-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-amber-300 font-bold uppercase tracking-wider">
                Paso 2: Capa de Acabado Premium
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono font-bold">
                {recommendation.calculatedGallons} Galones ({recommendation.calculatedLiters} L)
              </span>
            </div>

            <div>
              <h4 className="text-base font-bold text-white">
                {recommendation.mainCoatingProduct.name}
              </h4>
              <p className="text-xs text-amber-300/90 font-medium">
                Color: {recommendation.selectedColorName} ({recommendation.selectedColorCode})
              </p>
            </div>

            <ul className="space-y-1 text-xs text-slate-300">
              {recommendation.mainCoatingProduct.features.map((feat, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Quantities & Smart Dose Calculation */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center relative z-10">
          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-400 uppercase font-mono">Área calculada</span>
            <p className="text-base sm:text-lg font-bold text-white font-mono">{input.estimatedM2} m²</p>
          </div>

          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-400 uppercase font-mono">Volumen Acabado</span>
            <p className="text-base sm:text-lg font-bold text-cyan-400 font-mono">{recommendation.calculatedGallons} Gal</p>
          </div>

          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-400 uppercase font-mono">Acabado Sugerido</span>
            <p className="text-base sm:text-lg font-bold text-amber-300 truncate">{recommendation.suggestedFinish}</p>
          </div>

          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-400 uppercase font-mono">Presupuesto Estimado</span>
            <p className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
              ${recommendation.estimatedCostRange.min.toLocaleString()} COP
            </p>
          </div>
        </div>

        {/* Step-by-Step Surface Preparation Guide */}
        <div className="space-y-3 relative z-10">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Guía Técnica de Aplicación Recomendada (Paso a Paso):</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {recommendation.preparationSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start space-x-2.5"
              >
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps Carousel / Selector */}
        <div className="space-y-3 pt-2 border-t border-slate-800 relative z-10">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Próximo paso recomendado para avanzar:</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {recommendation.nextSteps.map((step, index) => {
              const isSelected = selectedNextStep === index;
              return (
                <div
                  key={index}
                  onClick={() => setSelectedNextStep(index)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all text-left space-y-2 ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-400 ring-1 ring-cyan-400/40 text-white shadow-lg'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">
                      {step.title}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                  </div>

                  <p className="text-[11px] text-slate-400 leading-snug">
                    {step.description}
                  </p>

                  <div className="pt-1 text-[11px] font-semibold text-cyan-300 flex items-center gap-1">
                    <span>{step.actionLabel}</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          onClick={onBack}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold transition-colors flex items-center justify-center space-x-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ajustar Simulación / Color</span>
        </button>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onScheduleVisit}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-colors flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>Agendar Asesor Pintuco</span>
          </button>

          <button
            id="btn-next-to-ficha"
            onClick={onNext}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Generar Ficha Inteligente & Enviar Solicitud</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
