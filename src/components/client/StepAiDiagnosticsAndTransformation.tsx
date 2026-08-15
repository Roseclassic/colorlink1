import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Sliders,
  CheckCircle2,
  ShieldCheck,
  Droplets,
  Sun,
  Layers,
  HelpCircle,
  Eye,
  RotateCcw,
  Palette,
  Check,
  Cpu,
  Info,
  Maximize2
} from 'lucide-react';
import {
  AiTechnicalAnalysis,
  ClientProjectInput,
  TechnicalRecommendation,
  TransformationStyleOption
} from '../../types';
import { TRANSFORMATION_STYLES } from '../../data/mockData';

interface StepAiDiagnosticsAndTransformationProps {
  input: ClientProjectInput;
  aiAnalysis: AiTechnicalAnalysis;
  recommendation: TechnicalRecommendation;
  onChange: (updates: Partial<ClientProjectInput>) => void;
  onAnswerSmartQuestion?: (questionId: string, answer: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepAiDiagnosticsAndTransformation: React.FC<StepAiDiagnosticsAndTransformationProps> = ({
  input,
  aiAnalysis,
  recommendation,
  onChange,
  onAnswerSmartQuestion,
  onNext,
  onBack
}) => {
  // Slider position (percentage 0 to 100)
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [answeredQuestion, setAnsweredQuestion] = useState<string | null>(
    input.aiFollowUpAnswer || null
  );

  // Selected Style for transformation
  const [selectedStyleId, setSelectedStyleId] = useState<string>(
    input.selectedStyle || TRANSFORMATION_STYLES[0].id
  );

  const activeStyle =
    TRANSFORMATION_STYLES.find((s) => s.id === selectedStyleId) || TRANSFORMATION_STYLES[0];

  const beforeImage = input.imageUrl;
  const afterImage = input.afterImageUrl || activeStyle.afterImageUrl;

  const handleStyleSelect = (style: TransformationStyleOption) => {
    setSelectedStyleId(style.id);
    onChange({
      selectedStyle: style.id,
      selectedColorHex: style.colorHex,
      selectedColorName: style.colorName,
      selectedColorCode: style.colorCode,
      afterImageUrl: style.afterImageUrl
    });
  };

  const handleQuestionAnswer = (optionLabel: string) => {
    setAnsweredQuestion(optionLabel);
    onChange({ aiFollowUpAnswer: optionLabel });
    if (aiAnalysis.smartFollowUp && onAnswerSmartQuestion) {
      onAnswerSmartQuestion(aiAnalysis.smartFollowUp.id, optionLabel);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Intro Header */}
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>Diagnóstico de Visión IA & Simulación de Transformación</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
          Entendiendo tu espacio <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-300 to-emerald-400">antes de pintar</span>
        </h2>
        
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Nuestra IA procesó la estructura del muro y los factores climáticos. Desliza la cortina para comparar el estado actual con la simulación renovada.
        </p>
      </div>

      {/* AI Conversational Diagnostic Bubble (Empático & Profesional) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/95 to-slate-900/90 border border-cyan-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-start space-x-3.5">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-400/30 shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5 text-cyan-300 animate-pulse" />
          </div>

          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Dictamen Técnico del Asistente Digital
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                Confianza IA: {aiAnalysis.overallConfidence}%
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
              "{aiAnalysis.conversationalSummary}"
            </p>

            {/* Diagnostic Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800/80 text-xs">
              <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-mono">Sustrato detectado</span>
                <strong className="text-slate-200 text-xs truncate block">{aiAnalysis.detectedSurface}</strong>
              </div>

              <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-mono">Patología principal</span>
                <strong className="text-amber-300 text-xs truncate block">{aiAnalysis.primaryProblem}</strong>
              </div>

              <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-mono">Índice de Humedad</span>
                <strong className={`text-xs block ${aiAnalysis.moistureIndex > 30 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {aiAnalysis.moistureIndex}% ({aiAnalysis.moistureIndex > 30 ? 'Humedad presente' : 'Normal seco'})
                </strong>
              </div>

              <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-mono">Complejidad</span>
                <strong className="text-cyan-300 text-xs block">{aiAnalysis.complexityLevel}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Question (Only if applicable) */}
      {aiAnalysis.smartFollowUp && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-left space-y-2.5 animate-fadeIn">
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-300">
            <HelpCircle className="w-4 h-4" />
            <span>Pregunta de Calibración Técnica:</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 font-medium">
            {aiAnalysis.smartFollowUp.question}
          </p>
          <p className="text-[11px] text-slate-400">
            {aiAnalysis.smartFollowUp.explanation}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {aiAnalysis.smartFollowUp.options.map((opt, i) => {
              const isSelected = answeredQuestion === opt.label;
              return (
                <button
                  key={i}
                  onClick={() => handleQuestionAnswer(opt.label)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all text-left flex items-center space-x-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* INNOVATIVE BEFORE / AFTER SPLIT SLIDER */}
      <div className="space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-cyan-400" />
              <span>Simulación Visual de Transformación</span>
            </h3>
            <p className="text-xs text-slate-400">
              Desliza el controlador central para ver la comparación interactiva Antes y Después.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Antes: Foto Real
            </span>
            <span className="text-cyan-400 font-bold">vs</span>
            <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              Después: {activeStyle.colorName}
            </span>
          </div>
        </div>

        {/* Interactive Split Viewport */}
        <div
          className="relative w-full aspect-video sm:aspect-[21/9] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 select-none cursor-ew-resize group"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          onMouseMove={(e) => {
            if (isDragging || e.buttons === 1) {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
              setSliderPosition((x / rect.width) * 100);
            }
          }}
          onTouchMove={(e) => {
            const touch = e.touches[0];
            const rect = e.currentTarget.getBoundingClientRect();
            const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
            setSliderPosition((x / rect.width) * 100);
          }}
        >
          {/* AFTER IMAGE (Transformed state - Full base) */}
          <img
            src={afterImage}
            alt="Espacio transformado con Pintuco"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />

          {/* BEFORE IMAGE (Clipped overlay) */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none transition-none"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={beforeImage}
              alt="Estado actual del espacio"
              className="absolute inset-y-0 left-0 w-full h-full object-cover max-w-none"
              style={{ width: '100%', minWidth: '100%', height: '100%' }}
            />
            
            {/* Dark gradient shadow on cut */}
            <div className="absolute inset-0 bg-slate-950/10 pointer-events-none" />
          </div>

          {/* SPLIT DIVIDER LINE & HANDLE */}
          <div
            className="absolute inset-y-0 w-1 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Center Draggable Circle Badge */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-950 text-white border-2 border-white shadow-xl flex items-center justify-center pointer-events-none">
              <Sliders className="w-4 h-4 text-cyan-400 rotate-90" />
            </div>
          </div>

          {/* Overlaid Badges */}
          <div className="absolute top-3 left-3 pointer-events-none">
            <span className="px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-xs font-bold text-slate-200 border border-slate-700 shadow-md">
              📷 Estado Actual (Antes)
            </span>
          </div>

          <div className="absolute top-3 right-3 pointer-events-none">
            <span className="px-3 py-1 rounded-lg bg-cyan-950/80 backdrop-blur-md text-xs font-bold text-cyan-300 border border-cyan-500/50 shadow-md flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Transformado con Pintuco</span>
            </span>
          </div>

          {/* Bottom Banner with Current Applied Transformation Attributes */}
          <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center space-x-2.5">
              <div
                className="w-4 h-4 rounded-full border border-white/50 shadow-inner"
                style={{ backgroundColor: activeStyle.colorHex }}
              />
              <span className="text-white font-semibold">
                Color: {activeStyle.colorName} ({activeStyle.colorCode})
              </span>
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <span>Acabado: <strong className="text-cyan-300">{activeStyle.finish}</strong></span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Estilo: <strong className="text-amber-300">{activeStyle.name}</strong></span>
            </div>
          </div>
        </div>

        {/* Range Slider controller for accessibility */}
        <div className="flex items-center space-x-3 px-2 pt-1">
          <span className="text-xs text-slate-400 font-mono">Antes (0%)</span>
          <input
            type="range"
            min={0}
            max={100}
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="flex-1 accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />
          <span className="text-xs text-cyan-400 font-mono">Después (100%)</span>
        </div>

      </div>

      {/* Style & Color Transformation Palettes Picker */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
            <Palette className="w-4 h-4 text-cyan-400" />
            <span>Elige el estilo y paleta recomendada para tu espacio:</span>
          </label>
          <span className="text-[11px] text-slate-400">
            Colección Inspiración Colombia
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TRANSFORMATION_STYLES.map((style) => {
            const isSelected = selectedStyleId === style.id;
            return (
              <div
                key={style.id}
                onClick={() => handleStyleSelect(style)}
                className={`p-3 rounded-xl border cursor-pointer transition-all text-left flex items-start space-x-3 ${
                  isSelected
                    ? 'bg-slate-800/90 border-cyan-500 ring-1 ring-cyan-500/50 shadow-md'
                    : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
                }`}
              >
                <div
                  className="w-8 h-8 rounded-lg shrink-0 border border-white/20 shadow-md mt-0.5"
                  style={{ backgroundColor: style.colorHex }}
                />

                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate">
                      {style.name}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                  </div>

                  <p className="text-[11px] text-cyan-300 font-medium truncate">
                    {style.colorName} • {style.finish}
                  </p>

                  <p className="text-[10px] text-slate-400 leading-tight line-clamp-2">
                    {style.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          onClick={onBack}
          className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold transition-colors flex items-center space-x-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Modificar Foto / Datos</span>
        </button>

        <button
          id="btn-next-to-recommendation"
          onClick={onNext}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center space-x-2 cursor-pointer"
        >
          <span>Ver "Tu recomendación ColorLink"</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
