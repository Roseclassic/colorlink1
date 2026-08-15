import React, { useEffect, useState } from 'react';
import {
  Sparkles,
  Scan,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Activity,
  ArrowRight,
  ShieldCheck,
  Zap,
  Eye,
  Crosshair
} from 'lucide-react';
import { AiTechnicalAnalysis, ClientProjectInput, TechnicalRecommendation } from '../../types';

interface StepLiveAiScannerProps {
  input: ClientProjectInput;
  aiAnalysis: AiTechnicalAnalysis;
  recommendation: TechnicalRecommendation;
  onCompleteAnalysis: () => void;
}

export const StepLiveAiScanner: React.FC<StepLiveAiScannerProps> = ({
  input,
  aiAnalysis,
  recommendation,
  onCompleteAnalysis
}) => {
  const [progress, setProgress] = useState(15);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [activeBoxIndex, setActiveBoxIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const stages = [
    { title: 'Segmentación de imagen por redes neuronales', sub: 'Extracción de mapas de relieve, textura y reflectancia...' },
    { title: 'Identificación de sustrato & grado de porosidad', sub: 'Clasificando enlucido, hormigón o metal...' },
    { title: 'Detección de patologías & humedad residual', sub: 'Calculando eflorescencias, descascarillado y riesgo...' },
    { title: 'Cálculo químico & prescripción de sistema', sub: 'Generando fórmula de sellador, manos y rendimiento...' }
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(40);
      setCurrentStageIndex(1);
    }, 700);

    const timer2 = setTimeout(() => {
      setProgress(75);
      setCurrentStageIndex(2);
      setActiveBoxIndex(1);
    }, 1500);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setCurrentStageIndex(3);
      setIsFinished(true);
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-7 animate-fadeIn">
      
      {/* Top Banner Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Cpu className="w-5 h-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm sm:text-base font-bold text-white font-display">
                Motor de Visión Artificial ColorLink Neural
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                EN VIVO
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              {isFinished ? 'Diagnóstico completado con éxito' : stages[currentStageIndex]?.title}
            </p>
          </div>
        </div>

        {/* Global Confidence Score badge */}
        <div className="flex items-center space-x-3 bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800">
          <div className="text-right">
            <div className="text-[10px] uppercase font-semibold text-slate-400">Confianza IA</div>
            <div className="text-lg font-mono font-extrabold text-emerald-400 flex items-center gap-1 justify-end">
              <ShieldCheck className="w-4 h-4" />
              <span>{aiAnalysis.overallConfidence}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Visual Scanning HUD & Real-Time Diagnostics Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Interactive Image Scanner with Visual HUD (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="relative rounded-2xl overflow-hidden border border-cyan-500/40 bg-slate-950 shadow-2xl group min-h-[320px]">
            
            {/* Background Image */}
            <img
              src={input.imageUrl}
              alt="Análisis IA"
              className="w-full h-80 sm:h-96 object-cover filter contrast-[1.05]"
            />

            {/* Neural scan grid overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/30 pointer-events-none" />
            
            {/* Live laser scanline */}
            {!isFinished && (
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-scanline" />
            )}

            {/* Interactive AI Detection Bounding Boxes */}
            {aiAnalysis.detectionAreas.map((area, idx) => {
              const isHigh = area.severity === 'alta' || area.severity === 'critica';
              return (
                <div
                  key={area.id}
                  style={{
                    left: `${area.x}%`,
                    top: `${area.y}%`,
                    width: `${area.width}%`,
                    height: `${area.height}%`
                  }}
                  className={`absolute rounded-lg border-2 transition-all duration-500 ${
                    isHigh
                      ? 'border-rose-400/90 bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                      : 'border-cyan-400/90 bg-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                  }`}
                >
                  {/* Tag label */}
                  <div className={`absolute -top-3.5 left-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap shadow-md ${
                    isHigh ? 'bg-rose-500 text-slate-950' : 'bg-cyan-500 text-slate-950'
                  }`}>
                    <Crosshair className="w-2.5 h-2.5" />
                    <span>{area.label} • {area.confidence}%</span>
                  </div>

                  {/* Corner targets */}
                  <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-white" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-white" />
                  <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-white" />
                  <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-white" />
                </div>
              );
            })}

            {/* Bottom HUD bar on image */}
            <div className="absolute bottom-0 inset-x-0 p-3 bg-slate-950/85 backdrop-blur-md border-t border-slate-800 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center space-x-2 text-slate-300">
                <Scan className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                <span>Superficie: <strong className="text-white">{aiAnalysis.detectedSurface.split(' ')[0]}</strong></span>
              </div>
              <div className="text-slate-400">
                Tiempo: <span className="text-cyan-300">{aiAnalysis.processingTimeMs}ms</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right: Technical AI Metrics & Diagnostics Breakdown (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Diagnostic Cards */}
          <div className="space-y-3">
            
            {/* Detected Surface Card */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-left space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-mono font-semibold text-cyan-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> 1. Superficie Detectada
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300">
                  99.1% match
                </span>
              </div>
              <p className="text-sm font-bold text-white font-display">
                {aiAnalysis.detectedSurface}
              </p>
            </div>

            {/* Primary Problem & Severity Card */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-left space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-mono font-semibold text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> 2. Patología & Problema
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300">
                  Complejidad {aiAnalysis.complexityLevel}
                </span>
              </div>
              <p className="text-sm font-bold text-white font-display">
                {aiAnalysis.primaryProblem}
              </p>
            </div>

            {/* Moisture & Adhesion Gauges */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-left space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Índice Humedad</div>
                <div className="text-base font-mono font-bold text-cyan-300">
                  {aiAnalysis.moistureIndex}%
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${aiAnalysis.moistureIndex}%` }}
                    className={`h-full ${aiAnalysis.moistureIndex > 30 ? 'bg-amber-400' : 'bg-cyan-400'}`}
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-left space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Adherencia Base</div>
                <div className="text-base font-mono font-bold text-emerald-400">
                  {aiAnalysis.adhesionScore}/100
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${aiAnalysis.adhesionScore}%` }}
                    className="h-full bg-emerald-400"
                  />
                </div>
              </div>
            </div>

            {/* Recommendation Preview Pill */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-500/30 text-left space-y-1.5">
              <span className="text-[11px] uppercase font-mono font-semibold text-cyan-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" /> 3. Sistema Técnico Prescrito
              </span>
              <p className="text-sm font-bold text-cyan-100">
                {recommendation.recommendedSystem}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                {recommendation.systemSummary}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Progress & Action trigger */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-1/2 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300">
              {isFinished ? '✓ Análisis de visión completado' : 'Procesando diagnóstico...'}
            </span>
            <span className="font-mono text-cyan-400 font-bold">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 transition-all duration-300"
            />
          </div>
        </div>

        <button
          id="btn-view-recommendation"
          onClick={onCompleteAnalysis}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all cursor-pointer transform hover:scale-[1.02] active:scale-95"
        >
          <span>Ver Recomendación & Presupuesto Técnico</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
