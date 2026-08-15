import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Droplets,
  Clock,
  Layers,
  CheckCircle2,
  Calendar,
  Download,
  Send,
  MessageSquare,
  ArrowRight,
  RefreshCw,
  Calculator,
  Award,
  ChevronRight,
  FileCheck,
  Check,
  Palette
} from 'lucide-react';
import { COLOR_PALETTES } from '../../data/mockData';
import {
  AiTechnicalAnalysis,
  ClientProjectInput,
  TechnicalRecommendation
} from '../../types';

interface StepRecommendationResultProps {
  input: ClientProjectInput;
  aiAnalysis: AiTechnicalAnalysis;
  recommendation: TechnicalRecommendation;
  onSendToInternalDashboard: () => void;
  onScheduleVisit: () => void;
  onRestart: () => void;
  isSyncedToDashboard: boolean;
}

export const StepRecommendationResult: React.FC<StepRecommendationResultProps> = ({
  input,
  aiAnalysis,
  recommendation,
  onSendToInternalDashboard,
  onScheduleVisit,
  onRestart,
  isSyncedToDashboard
}) => {
  const [selectedColor, setSelectedColor] = useState(recommendation.selectedColorHex || COLOR_PALETTES[0].hex);
  const [activeTab, setActiveTab] = useState<'system' | 'prep' | 'specs'>('system');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showPdfMock, setShowPdfMock] = useState(false);

  const currentColorObj = COLOR_PALETTES.find((c) => c.hex === selectedColor) || COLOR_PALETTES[0];

  const handleShareDossier = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Top Banner with Confirmation & Sync State */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-cyan-500/30 shadow-2xl relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Diagnóstico IA Validado • Confianza {aiAnalysis.overallConfidence}%</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display tracking-tight">
              {recommendation.recommendedSystem}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {recommendation.systemSummary}
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex sm:flex-col justify-between sm:justify-center items-end bg-slate-950/80 p-4 sm:p-5 rounded-2xl border border-slate-800 shrink-0">
            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase font-mono text-slate-400 font-semibold">Inversión Estimada</span>
              <div className="text-2xl font-extrabold font-mono text-cyan-400">
                {recommendation.estimatedCostRange.min}€ - {recommendation.estimatedCostRange.max}€
              </div>
              <span className="text-[11px] text-slate-400">Materiales + Aplicación profesional</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Technical Coating Breakdown (Left 7 cols) & Smart Actions / Color Visualizer (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Products & Technical Specs (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Navigation Subtabs */}
          <div className="flex border-b border-slate-800 space-x-2">
            <button
              onClick={() => setActiveTab('system')}
              className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
                activeTab === 'system'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              1. Productos & Dosificación
            </button>
            <button
              onClick={() => setActiveTab('prep')}
              className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
                activeTab === 'prep'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              2. Protocolo de Preparación
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
                activeTab === 'specs'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              3. Ficha Técnica & Garantía
            </button>
          </div>

          {/* Subtab 1: Products & Dosage */}
          {activeTab === 'system' && (
            <div className="space-y-4 text-left animate-fadeIn">
              
              {/* Primer / Base Product Card */}
              {recommendation.calculatedPrimerLiters > 0 && (
                <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      Capa 1: Imprimación & Anclaje
                    </span>
                    <span className="text-xs font-mono text-cyan-300 font-bold">
                      {recommendation.calculatedPrimerLiters} Litros calculados
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white font-display">
                      {recommendation.primerProduct.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {recommendation.primerProduct.type} • Base {recommendation.primerProduct.base}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-xs">
                    <div className="p-2 rounded-lg bg-slate-950/60">
                      <span className="text-[10px] text-slate-500 block">Rendimiento</span>
                      <span className="font-mono text-slate-200">{recommendation.primerProduct.yieldM2PerLiter} m²/L</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-950/60">
                      <span className="text-[10px] text-slate-500 block">Secado al tacto</span>
                      <span className="font-mono text-slate-200">{recommendation.primerProduct.dryingTimeHours} horas</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-950/60">
                      <span className="text-[10px] text-slate-500 block">Capas</span>
                      <span className="font-mono text-slate-200">1 mano cruzada</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Main Coating Product Card */}
              <div className="p-5 rounded-2xl bg-slate-900/70 border border-cyan-500/30 space-y-3 shadow-lg shadow-cyan-500/5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    Capa 2 & 3: Revestimiento de Acabado
                  </span>
                  <span className="text-xs font-mono text-cyan-300 font-bold">
                    {recommendation.calculatedLiters} Litros calculados
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white font-display">
                    {recommendation.mainCoatingProduct.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {recommendation.mainCoatingProduct.type} • Acabado {input.preferredFinish}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {recommendation.mainCoatingProduct.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-cyan-950/40 text-cyan-300 border border-cyan-500/20"
                    >
                      ✓ {feat}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-xs">
                  <div className="p-2 rounded-lg bg-slate-950/60">
                    <span className="text-[10px] text-slate-500 block">Rendimiento</span>
                    <span className="font-mono text-slate-200">{recommendation.mainCoatingProduct.yieldM2PerLiter} m²/L</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/60">
                    <span className="text-[10px] text-slate-500 block">Capas</span>
                    <span className="font-mono text-slate-200">{recommendation.mainCoatingProduct.recommendedCoats} manos</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/60">
                    <span className="text-[10px] text-slate-500 block">Durabilidad</span>
                    <span className="font-mono text-emerald-400 font-bold">{recommendation.warrantyPeriod}</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Subtab 2: Preparation Steps */}
          {activeTab === 'prep' && (
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-slate-800 text-left space-y-4 animate-fadeIn">
              <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 uppercase font-semibold">
                <Layers className="w-4 h-4" />
                <span>Protocolo de Ejecución Garantizado ColorLink</span>
              </div>

              <div className="space-y-3">
                {recommendation.preparationSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 leading-relaxed">
                <strong>Consejo del Inspector:</strong> {recommendation.technicalAdvice}
              </div>
            </div>
          )}

          {/* Subtab 3: Technical Specs & Warranty */}
          {activeTab === 'specs' && (
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-slate-800 text-left space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase">
                  Garantía Oficial por Escrito
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold">
                  {recommendation.warrantyPeriod}
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <p>• Homologación de acuerdo a la norma europea EN 13300 para resistencia al frote húmedo Clase 1.</p>
                <p>• Fórmula con bajo índice VOC (&lt; 5 g/L), apta para ocupación inmediata tras aplicación.</p>
                <p>• Diagnóstico respaldado por informe fotográfico e historial digital en ColorLink CRM.</p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Código de Ficha: <strong>CLK-DOSSIER-{(input.estimatedM2 * 47).toString(16).toUpperCase()}</strong></span>
                <button
                  onClick={() => setShowPdfMock(!showPdfMock)}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>{showPdfMock ? 'Ocultar Dossier' : 'Ver Ficha Completa'}</span>
                </button>
              </div>

              {showPdfMock && (
                <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs font-mono space-y-1 text-slate-300">
                  <div className="text-cyan-400 font-bold">--- COLORLINK DOSSIER TÉCNICO OFICIAL ---</div>
                  <div>Cliente: {input.clientName || 'Solicitud Digital'} | Ciudad: {input.clientCity || 'Madrid'}</div>
                  <div>Superficie: {input.estimatedM2} m² | Sustrato: {aiAnalysis.detectedSurface}</div>
                  <div>Sistema: {recommendation.recommendedSystem}</div>
                  <div>Presupuesto Orientativo: {recommendation.estimatedCostRange.min}€ - {recommendation.estimatedCostRange.max}€</div>
                </div>
              )}
            </div>
          )}

          {/* Color & Finish Simulator */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 text-left space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Palette className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-semibold text-white font-display">
                  Selector de Tono & Acabado
                </span>
              </div>
              <span className="text-xs font-mono text-cyan-300">
                {currentColorObj.name} ({currentColorObj.code})
              </span>
            </div>

            <div className="flex items-center space-x-3">
              {/* Color swatch circle with live visual check */}
              <div
                style={{ backgroundColor: selectedColor }}
                className="w-12 h-12 rounded-xl shadow-lg border-2 border-white/20 shrink-0 flex items-center justify-center"
              >
                <Check className="w-5 h-5 text-slate-900 drop-shadow" />
              </div>

              {/* Color pills palette */}
              <div className="flex flex-wrap gap-2">
                {COLOR_PALETTES.map((color) => (
                  <button
                    key={color.code}
                    onClick={() => setSelectedColor(color.hex)}
                    style={{ backgroundColor: color.hex }}
                    className={`w-8 h-8 rounded-lg transition-transform cursor-pointer border ${
                      selectedColor === color.hex
                        ? 'scale-110 ring-2 ring-cyan-400 border-white'
                        : 'border-slate-700 hover:scale-105'
                    }`}
                    title={`${color.name} - ${color.group}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Next Steps & CRM Sync (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Main Action Box: 1-Click Sync to CRM & Quote */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-cyan-500/40 shadow-2xl space-y-5 text-left">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                Próximo Paso Inmediato
              </span>
              <h3 className="text-xl font-bold text-white font-display">
                Enviar a Gestión & Cotización Oficial
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Nuestros ingenieros de recubrimiento validarán tu informe y generarán el presupuesto final con aplicador certificado.
              </p>
            </div>

            {/* Sync State Button */}
            <button
              id="btn-sync-to-crm"
              onClick={onSendToInternalDashboard}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg ${
                isSyncedToDashboard
                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-emerald-500/20'
                  : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-500/30 active:scale-95'
              }`}
            >
              {isSyncedToDashboard ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>¡Solicitud Sincronizada en Gestión Interna!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Validar & Enviar a Gestión Interna</span>
                </>
              )}
            </button>

            {/* WhatsApp Contact */}
            <a
              href={`https://wa.me/?text=Hola%20ColorLink,%20he%20generado%20un%20diagn%C3%B3stico%20IA%20para%20${encodeURIComponent(input.specificArea)}%20(${input.estimatedM2}m2).%20Sistema:%20${encodeURIComponent(recommendation.recommendedSystem)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center justify-center space-x-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Consultar por WhatsApp con Técnico</span>
            </a>

            {/* Schedule Visit */}
            <button
              id="btn-schedule-visit"
              onClick={onScheduleVisit}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800/80 text-slate-300 border border-slate-800 font-semibold text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>Agendar Visita Técnica Presencial</span>
            </button>

            {/* Share / Copy Link */}
            <button
              onClick={handleShareDossier}
              className="w-full py-2.5 px-3 rounded-lg text-[11px] font-mono text-slate-400 hover:text-cyan-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{copiedLink ? '✓ Enlace copiado al portapapeles' : 'Compartir informe digital (PDF / Link)'}</span>
            </button>

          </div>

          {/* New Search Action */}
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">¿Deseas evaluar otra estancia?</span>
            <button
              onClick={onRestart}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Nueva consulta</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
