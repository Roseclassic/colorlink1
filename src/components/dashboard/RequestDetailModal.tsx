import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Calendar,
  Layers,
  Sparkles,
  User,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  DollarSign,
  Palette,
  Crosshair
} from 'lucide-react';
import { ProjectRequest, RequestStatus } from '../../types';

interface RequestDetailModalProps {
  request: ProjectRequest;
  onClose: () => void;
  onUpdateStatus: (id: string, newStatus: RequestStatus, technicianNotes?: string, quotedAmount?: number) => void;
}

export const RequestDetailModal: React.FC<RequestDetailModalProps> = ({
  request,
  onClose,
  onUpdateStatus
}) => {
  const [notes, setNotes] = useState(request.technicianNotes || '');
  const [quoteAmount, setQuoteAmount] = useState(request.quotedAmount || request.recommendation.estimatedCostRange.min + 50);
  const [activeTab, setActiveTab] = useState<'diagnosis' | 'quote' | 'photos'>('diagnosis');
  const [statusUpdatedSuccess, setStatusUpdatedSuccess] = useState(false);

  const handleSave = (nextStatus: RequestStatus) => {
    onUpdateStatus(request.id, nextStatus, notes, quoteAmount);
    setStatusUpdatedSuccess(true);
    setTimeout(() => {
      setStatusUpdatedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 text-left">
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                {request.code}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Registrado {request.createdAt}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
              {request.input.specificArea} ({request.input.estimatedM2} m²) - {request.client.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex border-b border-slate-800 px-6 bg-slate-950/50 space-x-4">
          <button
            onClick={() => setActiveTab('diagnosis')}
            className={`py-3 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'diagnosis' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Diagnóstico IA & Visión
          </button>
          <button
            onClick={() => setActiveTab('quote')}
            className={`py-3 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'quote' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Presupuesto & Productos
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`py-3 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'photos' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Fotografía con HUD
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Client summary row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs">
            <div>
              <span className="text-slate-500 block">Cliente</span>
              <span className="font-semibold text-white">{request.client.name}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Teléfono</span>
              <span className="font-mono text-cyan-300">{request.client.phone}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Ubicación</span>
              <span className="text-slate-200">{request.client.city}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Estado Actual</span>
              <span className="capitalize font-bold text-amber-400">{request.status.replace('_', ' ')}</span>
            </div>
          </div>

          {activeTab === 'diagnosis' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <span className="text-[11px] font-mono text-cyan-400 uppercase font-semibold">
                    1. Sustrato & Patología
                  </span>
                  <p className="text-sm font-bold text-white">
                    {request.aiAnalysis.detectedSurface}
                  </p>
                  <p className="text-xs text-rose-300">
                    {request.aiAnalysis.primaryProblem}
                  </p>
                  <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-400 space-y-1">
                    {request.aiAnalysis.secondaryObservations.map((obs, idx) => (
                      <div key={idx}>• {obs}</div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <span className="text-[11px] font-mono text-emerald-400 uppercase font-semibold">
                    2. Sistema Recomendado
                  </span>
                  <p className="text-sm font-bold text-white">
                    {request.recommendation.recommendedSystem}
                  </p>
                  <p className="text-xs text-slate-300">
                    {request.recommendation.systemSummary}
                  </p>
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Confianza IA:</span>
                    <span className="text-emerald-400 font-bold">{request.aiAnalysis.overallConfidence}%</span>
                  </div>
                </div>
              </div>

              {/* Client description */}
              <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">
                  Descripción original del cliente:
                </span>
                <p className="text-xs sm:text-sm text-slate-300 italic">
                  "{request.input.description || 'Sin notas adicionales'}"
                </p>
              </div>
            </div>
          )}

          {activeTab === 'quote' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white font-display">
                    Desglose de Materiales & Dosificación
                  </h4>
                  <span className="text-xs font-mono text-cyan-400">
                    {request.input.estimatedM2} m² calculados
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {request.recommendation.calculatedPrimerLiters > 0 && (
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900">
                      <span>{request.recommendation.primerProduct.name}</span>
                      <span className="font-mono text-slate-200">{request.recommendation.calculatedPrimerLiters} L</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900">
                    <span>{request.recommendation.mainCoatingProduct.name}</span>
                    <span className="font-mono text-slate-200">{request.recommendation.calculatedLiters} L</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Rango orientativo sugerido por IA:</span>
                  <span className="font-mono text-cyan-300 font-bold">
                    {request.recommendation.estimatedCostRange.min}€ - {request.recommendation.estimatedCostRange.max}€
                  </span>
                </div>
              </div>

              {/* Adjust Quote Input */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/30 space-y-3">
                <label className="block text-xs font-semibold text-cyan-300 uppercase">
                  Ajustar Presupuesto Final para el Cliente (€):
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold font-mono text-white">€</span>
                  <input
                    type="number"
                    value={quoteAmount}
                    onChange={(e) => setQuoteAmount(Number(e.target.value) || 0)}
                    className="w-48 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-lg font-mono font-bold text-cyan-300 focus:outline-none focus:border-cyan-400"
                  />
                  <span className="text-xs text-slate-400">Incluye IVA y garantía por escrito</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                <img
                  src={request.input.imageUrl}
                  alt="Superficie analizada"
                  className="w-full h-80 object-cover"
                />

                {/* Bounding boxes */}
                {request.aiAnalysis.detectionAreas.map((area) => (
                  <div
                    key={area.id}
                    style={{
                      left: `${area.x}%`,
                      top: `${area.y}%`,
                      width: `${area.width}%`,
                      height: `${area.height}%`
                    }}
                    className="absolute border-2 border-cyan-400/90 bg-cyan-500/10 rounded-lg shadow-lg"
                  >
                    <div className="absolute -top-3 left-1 px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-cyan-500 text-slate-950">
                      {area.label} ({area.confidence}%)
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technician Internal Notes */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <label className="block text-xs font-semibold text-slate-300">
              Notas internas del perito / inspector:
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Añadir observaciones sobre acceso, tipo de andamio o muestras a llevar..."
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

        </div>

        {/* Modal Footer with Actions */}
        <div className="p-6 bg-slate-950/90 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            {statusUpdatedSuccess ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Estado actualizado correctamente
              </span>
            ) : (
              <span>Acciones del flujo operativo:</span>
            )}
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            {request.status !== 'revision_tecnica' && (
              <button
                onClick={() => handleSave('revision_tecnica')}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                🔵 Pasar a Revisión Técnica
              </button>
            )}

            {request.status !== 'recomendacion_lista' && (
              <button
                onClick={() => handleSave('recomendacion_lista')}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                🟣 Emitir Recomendación Lista
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
