import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Sliders,
  CheckCircle2,
  ShieldCheck,
  Eye,
  Palette,
  Check,
  HelpCircle,
  Award
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
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [answeredQuestion, setAnsweredQuestion] = useState<string | null>(
    input.aiFollowUpAnswer || null
  );

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
    <div className="max-w-5xl mx-auto space-y-7 sm:space-y-8 animate-fadeIn text-slate-800">
      
      {/* Intro Header */}
      <div className="text-center space-y-2.5 pt-1">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/70 text-amber-800 text-xs font-semibold">
          <Award className="w-3.5 h-3.5 text-amber-600" />
          <span>Paso 3: Diagnóstico Asistido por IA & Simulación</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
          Entendiendo tu espacio <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600">antes de pintar</span>
        </h2>
        
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Nuestra IA procesó la estructura del muro y los factores de humedad. Compara el estado actual con la simulación renovada con acabados Pintuco.
        </p>
      </div>

      {/* AI Conversational Diagnostic Card (Limpio, Cálido, Confiable) */}
      <div className="p-5 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm text-left space-y-4">
        
        <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="p-3 rounded-2xl bg-amber-500 text-slate-950 font-bold shadow-sm shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>

          <div className="space-y-2.5 flex-1 w-full">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 font-mono">
                Dictamen Técnico del Asistente Pintuco
              </span>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 font-bold">
                Certeza Diagnóstica: {aiAnalysis.overallConfidence}%
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
              "{aiAnalysis.conversationalSummary}"
            </p>

            {/* Diagnostic Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-100 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] text-slate-500 block font-mono">Sustrato detectado</span>
                <strong className="text-slate-900 text-xs truncate block mt-0.5">{aiAnalysis.detectedSurface}</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] text-slate-500 block font-mono">Condición principal</span>
                <strong className="text-amber-800 text-xs truncate block mt-0.5">{aiAnalysis.primaryProblem}</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] text-slate-500 block font-mono">Índice de Humedad</span>
                <strong className={`text-xs block mt-0.5 ${aiAnalysis.moistureIndex > 30 ? 'text-amber-700 font-bold' : 'text-emerald-700 font-bold'}`}>
                  {aiAnalysis.moistureIndex}% ({aiAnalysis.moistureIndex > 30 ? 'Humedad presente' : 'Normal seco'})
                </strong>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] text-slate-500 block font-mono">Nivel de Exposición</span>
                <strong className="text-blue-700 text-xs block mt-0.5">{aiAnalysis.complexityLevel}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Calibration Question (If needed) */}
      {aiAnalysis.smartFollowUp && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-left space-y-2.5 animate-fadeIn">
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-900 font-mono">
            <HelpCircle className="w-4 h-4 text-amber-700" />
            <span>PREGUNTA DE CALIBRACIÓN:</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-800 font-semibold">
            {aiAnalysis.smartFollowUp.question}
          </p>
          <p className="text-[11px] text-slate-600">
            {aiAnalysis.smartFollowUp.explanation}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {aiAnalysis.smartFollowUp.options.map((opt, i) => {
              const isSelected = answeredQuestion === opt.label;
              return (
                <button
                  key={i}
                  onClick={() => handleQuestionAnswer(opt.label)}
                  className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-all text-left flex items-center space-x-1.5 cursor-pointer active:scale-95 ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
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
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 font-display">
              <Eye className="w-5 h-5 text-amber-600" />
              <span>Simulación Visual de Transformación</span>
            </h3>
            <p className="text-xs text-slate-500">
              Desliza el controlador central para comparar el cambio con el color aplicado.
            </p>
          </div>

          {/* Quick 1-Tap Toggle Modes */}
          <div className="flex items-center space-x-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setSliderPosition(0)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                sliderPosition === 0 ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ver Antes
            </button>
            <button
              onClick={() => setSliderPosition(50)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                sliderPosition === 50 ? 'bg-amber-500 text-slate-950 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              50% Comparar
            </button>
            <button
              onClick={() => setSliderPosition(100)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                sliderPosition === 100 ? 'bg-blue-600 text-white font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ver Después
            </button>
          </div>
        </div>

        {/* Interactive Split Viewport */}
        <div
          className="relative w-full aspect-video sm:aspect-[21/9] rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 select-none cursor-ew-resize group"
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
          {/* AFTER IMAGE (Transformed state) */}
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
          </div>

          {/* SPLIT DIVIDER LINE & HANDLE */}
          <div
            className="absolute inset-y-0 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)] pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-slate-800 shadow-xl border border-slate-200 flex items-center justify-center pointer-events-none">
              <Sliders className="w-4 h-4 text-amber-600 rotate-90" />
            </div>
          </div>

          {/* Overlaid Badges */}
          <div className="absolute top-3 left-3 pointer-events-none">
            <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-xs font-semibold text-white shadow-sm">
              📷 Estado Actual
            </span>
          </div>

          <div className="absolute top-3 right-3 pointer-events-none">
            <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 backdrop-blur-md text-xs font-bold shadow-sm flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>Simulación con Pintuco</span>
            </span>
          </div>

          {/* Bottom Banner with Current Applied Transformation Attributes */}
          <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-md flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center space-x-2.5">
              <div
                className="w-4 h-4 rounded-full border border-slate-300 shadow-inner"
                style={{ backgroundColor: activeStyle.colorHex }}
              />
              <span className="text-slate-900 font-bold">
                Color: {activeStyle.colorName} ({activeStyle.colorCode})
              </span>
            </div>

            <div className="flex items-center gap-3 text-slate-600">
              <span>Acabado: <strong className="text-slate-900">{activeStyle.finish}</strong></span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Paleta: <strong className="text-amber-800">{activeStyle.name}</strong></span>
            </div>
          </div>
        </div>

        {/* Range Slider controller for accessibility */}
        <div className="flex items-center space-x-3 px-2 pt-1">
          <span className="text-xs text-slate-500 font-medium">Antes</span>
          <input
            type="range"
            min={0}
            max={100}
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="flex-1 accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
          />
          <span className="text-xs text-amber-800 font-bold">Después</span>
        </div>

      </div>

      {/* Style & Color Transformation Palettes Picker */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 font-mono">
            <Palette className="w-4 h-4 text-amber-600" />
            <span>Colección Inspiración Colombia (Pintuco):</span>
          </label>
          <span className="text-[11px] text-slate-500">
            Toca cualquier tono para actualizar la simulación
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TRANSFORMATION_STYLES.map((style) => {
            const isSelected = selectedStyleId === style.id;
            return (
              <div
                key={style.id}
                onClick={() => handleStyleSelect(style)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all text-left flex items-start space-x-3 active:scale-[0.98] ${
                  isSelected
                    ? 'bg-amber-50/70 border-amber-400 shadow-xs'
                    : 'bg-slate-50/60 border-slate-200 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div
                  className="w-9 h-9 rounded-xl shrink-0 border border-slate-300 shadow-xs mt-0.5"
                  style={{ backgroundColor: style.colorHex }}
                />

                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {style.name}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                  </div>

                  <p className="text-[11px] text-amber-800 font-semibold truncate">
                    {style.colorName} • {style.finish}
                  </p>

                  <p className="text-[10px] text-slate-500 leading-tight line-clamp-2">
                    {style.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          onClick={onBack}
          className="w-full sm:w-auto min-h-[44px] px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Cambiar Foto / Datos</span>
        </button>

        <button
          id="btn-next-to-recommendation"
          onClick={onNext}
          className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 cursor-pointer"
        >
          <span>Ver "Tu recomendación ColorLink"</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </button>
      </div>

    </div>
  );
};
