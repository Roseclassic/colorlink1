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
  Calendar,
  Layers,
  ShieldCheck,
  ArrowLeft,
  RotateCcw,
  Check,
  Award
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
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn text-slate-800">
      
      {/* Header */}
      <div className="text-center space-y-2.5 pt-1">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Ficha Técnica Digital Generada Automáticamente</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
          Ficha Inteligente <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600">ColorLink</span>
        </h2>
        
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Tu diagnóstico, simulación visual y prescripción técnica están listos para ser atendidos por asesores técnicos y tiendas Pintuco en Colombia.
        </p>
      </div>

      {/* Quick Contact Micro-Form */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3.5 text-left">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 font-mono">
            <User className="w-3.5 h-3.5 text-amber-600" />
            <span>Datos de contacto para seguimiento y entrega:</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Sin trámites complejos</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-[11px] text-slate-600 block mb-1 font-medium">Nombre o Empresa:</label>
            <input
              type="text"
              value={input.clientName}
              onChange={(e) => onChange({ clientName: e.target.value })}
              placeholder="Ej: Laura Mejía"
              className="w-full bg-slate-50 border border-slate-200 focus:border-amber-400 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-600 block mb-1 font-medium">Teléfono / WhatsApp:</label>
            <input
              type="tel"
              value={input.clientPhone}
              onChange={(e) => onChange({ clientPhone: e.target.value })}
              placeholder="+57 312 000 0000"
              className="w-full bg-slate-50 border border-slate-200 focus:border-amber-400 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none font-mono transition-all"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-600 block mb-1 font-medium">Ciudad en Colombia:</label>
            <input
              type="text"
              value={input.clientCity}
              onChange={(e) => onChange({ clientCity: e.target.value })}
              placeholder="Bogotá / Medellín / Cali"
              className="w-full bg-slate-50 border border-slate-200 focus:border-amber-400 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* THE OFFICIAL DIGITAL TECHNICAL FICHA CARD */}
      <div id="ficha-tecnica-printable" className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6 text-left relative overflow-hidden">
        
        {/* Watermark Logo Accent */}
        <div className="absolute top-5 right-6 text-right">
          <span className="text-[11px] font-mono text-amber-800 font-bold block">ColorLink by Pintuco</span>
          <span className="text-xs font-mono font-bold text-slate-700 tracking-widest">{requestCode}</span>
        </div>

        {/* Ficha Header */}
        <div className="space-y-1 pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-emerald-800 font-bold uppercase tracking-wider">
              Ficha Prescriptiva Lista para Ejecución
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            Expediente de Transformación de Espacio Pintuco
          </h3>
        </div>

        {/* Section 1: Client & Space Profile */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-mono block">Cliente / Titular</span>
            <strong className="text-slate-900 font-semibold block truncate mt-0.5">{input.clientName || 'Cliente Particular'}</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-mono block">Espacio & Tipo</span>
            <strong className="text-amber-800 font-semibold block truncate mt-0.5">{input.transformationTarget?.toUpperCase()} &gt; {input.specificSpaceSubtype}</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-mono block">Metraje Estimado</span>
            <strong className="text-slate-900 font-mono font-bold block mt-0.5">{input.estimatedM2} m²</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-mono block">Ubicación</span>
            <strong className="text-slate-900 font-semibold block truncate mt-0.5">{input.clientCity || 'Colombia'}</strong>
          </div>
        </div>

        {/* Section 2: Before & After Visual Evidence */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block font-mono">
            Evidencia Fotográfica & Simulación Pintuco:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-500 font-mono">1. Fotografía Actual (Sustrato Base):</span>
              <div className="h-44 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <img
                  src={input.imageUrl}
                  alt="Estado actual"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-amber-800 font-mono font-bold">2. Simulación Pintuco ({recommendation.selectedColorName}):</span>
              <div className="h-44 rounded-2xl overflow-hidden border border-amber-300 bg-slate-100 relative">
                <img
                  src={input.afterImageUrl || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'}
                  alt="Simulación Pintuco"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-white/95 text-[10px] text-slate-800 font-semibold border border-slate-200 shadow-xs">
                  {recommendation.suggestedFinish}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: AI Diagnosis Summary */}
        <div className="space-y-2 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80 text-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 font-mono block">
            Diagnóstico Técnico de Laboratorio:
          </span>
          <p className="text-slate-700 leading-relaxed italic">
            "{aiAnalysis.conversationalSummary}"
          </p>
          <div className="flex flex-wrap gap-4 pt-1 text-[11px] text-slate-500 font-mono">
            <span>• Sustrato: <strong className="text-slate-900">{aiAnalysis.detectedSurface}</strong></span>
            <span>• Humedad: <strong className="text-amber-800">{aiAnalysis.moistureIndex}%</strong></span>
            <span>• Adherencia: <strong className="text-emerald-700">{aiAnalysis.adhesionScore}%</strong></span>
          </div>
        </div>

        {/* Section 4: Prescribed System and Dosages */}
        <div className="space-y-3 bg-amber-50/40 p-5 rounded-2xl border border-amber-200/80 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 font-mono">
              Solución Técnica Pintuco Prescrita:
            </span>
            <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] border border-amber-200">
              Garantía: {recommendation.warrantyPeriod}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
              <span className="text-[10px] text-blue-700 font-mono uppercase font-bold">Imprimación / Barrera:</span>
              <p className="font-bold text-slate-900 text-xs">{recommendation.primerProduct.name}</p>
              <p className="text-[11px] text-slate-500">Cantidad recomendada: {recommendation.calculatedPrimerLiters} Litros</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
              <span className="text-[10px] text-amber-800 font-mono uppercase font-bold">Pintura de Acabado:</span>
              <p className="font-bold text-slate-900 text-xs">{recommendation.mainCoatingProduct.name}</p>
              <p className="text-[11px] text-slate-500">
                Cantidad: {recommendation.calculatedGallons} Galones • Color: {recommendation.selectedColorName}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Action Buttons & Transmission */}
      <div className="space-y-4 pt-2">
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Send to Commercial Dashboard */}
          <button
            id="btn-send-ficha-dashboard"
            onClick={onSendToDashboard}
            className={`min-h-[48px] p-3.5 rounded-2xl font-bold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-95 ${
              isSyncedToDashboard
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 shadow-lg shadow-amber-500/20 hover:scale-[1.01]'
            }`}
          >
            {isSyncedToDashboard ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Solicitud Recibida por Pintuco</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Enviar al Asesor Pintuco</span>
              </>
            )}
          </button>

          {/* WhatsApp Direct Link */}
          <a
            href={`https://wa.me/573001234567?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] p-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consultar por WhatsApp</span>
          </a>

          {/* Export PDF / Print */}
          <button
            onClick={handleExportFicha}
            className="min-h-[48px] p-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xs active:scale-95"
          >
            <Download className="w-4 h-4 text-amber-600" />
            <span>{isDownloadingPdf ? 'Generando PDF...' : 'Descargar / Imprimir Ficha'}</span>
          </button>

        </div>

        {/* Secondary Restart / Back navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            onClick={onBack}
            className="px-4 py-2.5 rounded-xl text-slate-500 hover:text-slate-900 text-xs font-medium flex items-center space-x-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a Recomendación</span>
          </button>

          <button
            onClick={onRestart}
            className="px-4 py-2.5 rounded-xl text-slate-500 hover:text-amber-700 text-xs font-medium flex items-center space-x-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Iniciar Nueva Transformación</span>
          </button>
        </div>

      </div>

    </div>
  );
};
