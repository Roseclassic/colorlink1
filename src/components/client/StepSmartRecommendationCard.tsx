import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Layers,
  Award,
  Calendar,
  ChevronRight,
  Check
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
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Moderado':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      default:
        return 'bg-blue-50 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-7 sm:space-y-8 animate-fadeIn text-slate-800">
      
      {/* Top Header */}
      <div className="text-center space-y-2.5 pt-1">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/70 text-amber-800 text-xs font-semibold">
          <Award className="w-3.5 h-3.5 text-amber-600" />
          <span>Paso 4: Prescripción Certificada Pintuco Colombia</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
          Tu recomendación <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600">ColorLink</span>
        </h2>
        
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Diseñada a la medida de tu espacio, sustrato y metraje. Garantiza máxima adherencia, protección y durabilidad Pintuco.
        </p>
      </div>

      {/* HERO RECOMMENDATION CARD (Diseño Blanco Premium Pintuco) */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 bg-white shadow-sm p-5 sm:p-8 space-y-6 sm:space-y-7">
        
        {/* Card Header: System Title & Badges */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100 relative z-10 text-left">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider border border-amber-200 font-mono">
                {recommendation.solutionType}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getComplexityBadge(recommendation.complexityLevel)}`}>
                Complejidad: {recommendation.complexityLevel}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              {recommendation.recommendedSystem}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              {recommendation.systemSummary}
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-500 font-mono">Garantía Pintuco</span>
            <div className="flex items-center space-x-1.5 text-amber-800 font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{recommendation.warrantyPeriod}</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Aplicación en ~{recommendation.estimatedLaborDays} días</span>
          </div>
        </div>

        {/* Products Matrix (Primer + Main Coating) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10 text-left">
          
          {/* Primer / Imprimación */}
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-blue-700 font-bold uppercase tracking-wider">
                Paso 1: Sellado / Imprimación
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700 font-mono font-semibold">
                Dosis: {recommendation.calculatedPrimerLiters} L
              </span>
            </div>

            <div>
              <h4 className="text-base font-bold text-slate-900">
                {recommendation.primerProduct.name}
              </h4>
              <p className="text-xs text-blue-700 font-medium">
                {recommendation.primerProduct.type}
              </p>
            </div>

            <ul className="space-y-1.5 text-xs text-slate-600">
              {recommendation.primerProduct.features.map((feat, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Coating Product */}
          <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-300 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-amber-800 font-bold uppercase tracking-wider">
                Paso 2: Acabado Premium Pintuco
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 font-mono font-bold">
                {recommendation.calculatedGallons} Galones ({recommendation.calculatedLiters} L)
              </span>
            </div>

            <div>
              <h4 className="text-base font-bold text-slate-900">
                {recommendation.mainCoatingProduct.name}
              </h4>
              <p className="text-xs text-amber-800 font-semibold">
                Color: {recommendation.selectedColorName} ({recommendation.selectedColorCode})
              </p>
            </div>

            <ul className="space-y-1.5 text-xs text-slate-600">
              {recommendation.mainCoatingProduct.features.map((feat, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Quantities & Smart Dose Calculation */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center relative z-10">
          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-500 uppercase font-mono">Área calculada</span>
            <p className="text-base sm:text-lg font-bold text-slate-900 font-mono">{input.estimatedM2} m²</p>
          </div>

          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-500 uppercase font-mono">Volumen Acabado</span>
            <p className="text-base sm:text-lg font-bold text-amber-800 font-mono">{recommendation.calculatedGallons} Gal</p>
          </div>

          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-500 uppercase font-mono">Acabado Sugerido</span>
            <p className="text-base sm:text-lg font-bold text-slate-800 truncate">{recommendation.suggestedFinish}</p>
          </div>

          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-500 uppercase font-mono">Presupuesto Estimado</span>
            <p className="text-base sm:text-lg font-bold text-emerald-700 font-mono">
              ${recommendation.estimatedCostRange.min.toLocaleString()} COP
            </p>
          </div>
        </div>

        {/* Step-by-Step Surface Preparation Guide */}
        <div className="space-y-3 relative z-10 text-left">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-2 font-mono">
            <Layers className="w-4 h-4 text-amber-600" />
            <span>Guía Técnica de Aplicación Recomendada (Paso a Paso):</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {recommendation.preparationSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed flex items-start space-x-2.5"
              >
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-mono font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps Carousel / Selector */}
        <div className="space-y-3 pt-3 border-t border-slate-100 relative z-10 text-left">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 font-mono">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Próximo paso recomendado:</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {recommendation.nextSteps.map((step, index) => {
              const isSelected = selectedNextStep === index;
              return (
                <div
                  key={index}
                  onClick={() => setSelectedNextStep(index)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all text-left space-y-2 active:scale-[0.98] ${
                    isSelected
                      ? 'bg-amber-50/70 border-amber-400 text-slate-900 shadow-xs'
                      : 'bg-slate-50/60 border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">
                      {step.title}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-amber-600" />}
                  </div>

                  <p className="text-[11px] text-slate-500 leading-snug">
                    {step.description}
                  </p>

                  <div className="pt-1 text-[11px] font-semibold text-amber-800 flex items-center gap-1">
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
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          onClick={onBack}
          className="w-full sm:w-auto min-h-[44px] px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ajustar Color</span>
        </button>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={onScheduleVisit}
            className="w-full sm:w-auto min-h-[44px] px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 text-amber-800 border border-amber-300 text-xs font-bold transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
          >
            <Calendar className="w-4 h-4 text-amber-600" />
            <span>Agendar Asesor Pintuco</span>
          </button>

          <button
            id="btn-next-to-ficha"
            onClick={onNext}
            className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Generar Ficha Inteligente & Guardar</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>
      </div>

    </div>
  );
};
