import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  Share2,
  Download,
  Send,
  MessageCircle,
  Sparkles,
  Phone,
  Mail,
  User,
  MapPin,
  Building2,
  Calendar,
  Layers,
  ShieldCheck,
  ArrowLeft,
  RotateCcw,
  Check,
  Copy
} from 'lucide-react';
import {
  AiTechnicalAnalysis,
  ClientProjectInput,
  TechnicalRecommendation
} from '../../types';

interface StepSmartFichaProps {
  input: ClientProjectInput;
  aiAnalysis: AiTechnicalAnalysis;
  recommendation: TechnicalRecommendation;
  onChange: (updates: Partial<ClientProjectInput>) => void;
  onSendToDashboard: () => void;
  onScheduleVisit: () => void;
  onRestart: () => void;
  isSyncedToDashboard: boolean;
  onBack: () => void;
}

export const StepSmartFicha: React.FC<StepSmartFichaProps> = ({
  input,
  aiAnalysis,
  recommendation,
  onChange,
  onSendToDashboard,
  onScheduleVisit,
  onRestart,
  isSyncedToDashboard,
  onBack
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const requestCode = 'CLK-' + Math.floor(8500 + Math.random() * 999);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(requestCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleExportFicha = () => {
    setIsDownloadingPdf(true);
    setTimeout(() => {
      setIsDownloadingPdf(false);
      window.print();
    }, 600);
  };

  const whatsappMessage = encodeURIComponent(
    `Hola Asesor ColorLink Pintuco, acabo de generar mi diagnóstico IA para mi espacio (${input.specificSpaceSubtype || 'Hogar'}). Código de solicitud: ${requestCode}. Sistema recomendado: ${recommendation.recommendedSystem}. Quisiera validar la atención técnica.`
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Ficha Técnica Digital Generada Automáticamente</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
          Ficha Inteligente <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400">ColorLink</span>
        </h2>
        
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          Tu diagnóstico, simulación visual y prescripción técnica están consolidados para atención inmediata por el equipo de ingeniería comercial Pintuco.
        </p>
      </div>

      {/* Quick Contact Micro-Form (Ligero, sin fricción) */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3.5 text-left">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            <span>Datos de contacto para entrega y seguimiento comercial:</span>
          </span>
          <span className="text-[10px] text-slate-400">Sin formularios largos</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Nombre o Empresa:</label>
            <input
              type="text"
              value={input.clientName}
              onChange={(e) => onChange({ clientName: e.target.value })}
              placeholder="Ej: Laura Mejía"
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Teléfono / WhatsApp:</label>
            <input
              type="tel"
              value={input.clientPhone}
              onChange={(e) => onChange({ clientPhone: e.target.value })}
              placeholder="+57 312 000 0000"
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Ciudad en Colombia:</label>
            <input
              type="text"
              value={input.clientCity}
              onChange={(e) => onChange({ clientCity: e.target.value })}
              placeholder="Bogotá / Medellín / Cali"
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* THE OFFICIAL DIGITAL TECHNICAL FICHA CARD */}
      <div id="ficha-tecnica-printable" className="p-6 sm:p-8 rounded-3xl bg-slate-950 border-2 border-slate-800 shadow-2xl space-y-6 text-left relative overflow-hidden">
        
        {/* Watermark Logo Accent */}
        <div className="absolute top-4 right-4 text-right opacity-80">
          <span className="text-[10px] font-mono text-cyan-400 block">ColorLink by Pintuco</span>
          <span className="text-xs font-mono font-bold text-white tracking-widest">{requestCode}</span>
        </div>

        {/* Ficha Header */}
        <div className="space-y-1 pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              Ficha Prescriptiva Lista para Ejecución
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
            Expediente de Transformación de Superficie
          </h3>
        </div>

        {/* Section 1: Client & Space Profile */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Cliente / Titular</span>
            <strong className="text-white font-medium block truncate">{input.clientName || 'Cliente Particular'}</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Espacio & Tipo</span>
            <strong className="text-cyan-300 font-medium block truncate">{input.transformationTarget?.toUpperCase()} &gt; {input.specificSpaceSubtype}</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Metraje Estimado</span>
            <strong className="text-white font-mono font-bold block">{input.estimatedM2} m²</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Ubicación</span>
            <strong className="text-white font-medium block truncate">{input.clientCity || 'Colombia'}</strong>
          </div>
        </div>

        {/* Section 2: Before & After Visual Evidence */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block font-mono">
            Evidencia Fotográfica & Simulación:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-mono">1. Fotografía Actual (Sustrato Base):</span>
              <div className="h-44 rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
                <img
                  src={input.imageUrl}
                  alt="Estado actual"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-cyan-400 font-mono">2. Simulación Pintuco ({recommendation.selectedColorName}):</span>
              <div className="h-44 rounded-xl overflow-hidden border border-cyan-500/40 bg-slate-900 relative">
                <img
                  src={input.afterImageUrl || recommendation.mainCoatingProduct.features[0] ? input.afterImageUrl || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80' : input.imageUrl}
                  alt="Simulación Pintuco"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 text-[10px] text-white font-mono border border-slate-700">
                  {recommendation.suggestedFinish}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: AI Diagnosis Summary */}
        <div className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 text-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono block">
            Diagnóstico de Laboratorio IA:
          </span>
          <p className="text-slate-200 leading-relaxed italic">
            "{aiAnalysis.conversationalSummary}"
          </p>
          <div className="flex flex-wrap gap-4 pt-1 text-[11px] text-slate-400 font-mono">
            <span>• Sustrato: <strong className="text-slate-200">{aiAnalysis.detectedSurface}</strong></span>
            <span>• Humedad: <strong className="text-amber-300">{aiAnalysis.moistureIndex}%</strong></span>
            <span>• Adherencia: <strong className="text-emerald-300">{aiAnalysis.adhesionScore}%</strong></span>
          </div>
        </div>

        {/* Section 4: Prescribed System and Dosages */}
        <div className="space-y-3 bg-gradient-to-br from-cyan-950/30 to-slate-900/70 p-5 rounded-2xl border border-cyan-500/30 text-xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
              Solución Técnica Pintuco Prescrita:
            </span>
            <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold text-[10px]">
              Garantía: {recommendation.warrantyPeriod}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-200">
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[10px] text-cyan-400 font-mono uppercase">Imprimación / Barrera:</span>
              <p className="font-bold text-white text-xs">{recommendation.primerProduct.name}</p>
              <p className="text-[11px] text-slate-400">Cantidad recomendada: {recommendation.calculatedPrimerLiters} Litros</p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[10px] text-amber-300 font-mono uppercase">Pintura de Acabado:</span>
              <p className="font-bold text-white text-xs">{recommendation.mainCoatingProduct.name}</p>
              <p className="text-[11px] text-slate-400">
                Cantidad: {recommendation.calculatedGallons} Galones • Color: {recommendation.selectedColorName}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Action Buttons & Transmission to Commercial / WhatsApp */}
      <div className="space-y-4 pt-2">
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Send to Commercial Dashboard */}
          <button
            id="btn-send-ficha-dashboard"
            onClick={onSendToDashboard}
            className={`p-3.5 rounded-xl font-semibold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer ${
              isSyncedToDashboard
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-lg shadow-cyan-500/20 hover:scale-[1.02]'
            }`}
          >
            {isSyncedToDashboard ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Solicitud Registrada (Estado: Recibida)</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Transmitir a Atención Técnica</span>
              </>
            )}
          </button>

          {/* WhatsApp Direct Link */}
          <a
            href={`https://wa.me/573001234567?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consultar por WhatsApp</span>
          </a>

          {/* Export PDF / Print */}
          <button
            onClick={handleExportFicha}
            className="p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>{isDownloadingPdf ? 'Generando PDF...' : 'Descargar / Imprimir Ficha'}</span>
          </button>

        </div>

        {/* Secondary Restart / Back navigation */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={onBack}
            className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white text-xs font-medium flex items-center space-x-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a Recomendación</span>
          </button>

          <button
            onClick={onRestart}
            className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-cyan-300 text-xs font-medium flex items-center space-x-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Iniciar Nueva Transformación</span>
          </button>
        </div>

      </div>

    </div>
  );
};
