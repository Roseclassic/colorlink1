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
  const [quoteAmount, setQuoteAmount] = useState(request.quotedAmount || request.recommendation.estimatedCostRange.min);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-fadeIn text-slate-800">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8 text-left">
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                {request.code}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Registrado {request.createdAt}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              {request.input.specificSpaceSubtype || request.input.specificArea} ({request.input.estimatedM2} m²) - {request.client.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50/50 space-x-4">
          <button
            onClick={() => setActiveTab('diagnosis')}
            className={`py-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'diagnosis' ? 'border-amber-500 text-amber-800' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Diagnóstico IA & Visión
          </button>
          <button
            onClick={() => setActiveTab('quote')}
            className={`py-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'quote' ? 'border-amber-500 text-amber-800' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Presupuesto & Productos
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`py-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'photos' ? 'border-amber-500 text-amber-800' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Fotografía con HUD
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Client summary row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block">Cliente</span>
              <span className="font-semibold text-slate-900">{request.client.name}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Teléfono</span>
              <span className="font-mono text-amber-800 font-bold">{request.client.phone}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Ubicación</span>
              <span className="text-slate-700">{request.client.city}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Estado Actual</span>
              <span className="capitalize font-bold text-amber-700">{request.status.replace('_', ' ')}</span>
            </div>
          </div>

          {activeTab === 'diagnosis' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[11px] font-mono text-amber-800 uppercase font-semibold">
                    1. Sustrato & Patología
                  </span>
                  <p className="text-sm font-bold text-slate-900">
                    {request.aiAnalysis.detectedSurface}
                  </p>
                  <p className="text-xs text-rose-700 font-medium">
                    {request.aiAnalysis.primaryProblem}
                  </p>
                  <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                    {request.aiAnalysis.secondaryObservations.map((obs, idx) => (
                      <div key={idx}>• {obs}</div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[11px] font-mono text-emerald-700 uppercase font-semibold">
                    2. Sistema Recomendado
                  </span>
                  <p className="text-sm font-bold text-slate-900">
                    {request.recommendation.recommendedSystem}
                  </p>
                  <p className="text-xs text-slate-600">
                    {request.recommendation.systemSummary}
                  </p>
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500">Confianza IA:</span>
                    <span className="text-emerald-700 font-bold">{request.aiAnalysis.overallConfidence}%</span>
                  </div>
                </div>
              </div>

              {/* Client description */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">
                  Descripción original del cliente:
                </span>
                <p className="text-xs sm:text-sm text-slate-700 italic">
                  "{request.input.description || 'Sin notas adicionales'}"
                </p>
              </div>
            </div>
          )}

          {activeTab === 'quote' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 font-display">
                    Desglose de Materiales & Dosificación
                  </h4>
                  <span className="text-xs font-mono text-amber-800 font-bold">
                    {request.input.estimatedM2} m² calculados
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {request.recommendation.calculatedPrimerLiters > 0 && (
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200">
                      <span className="text-slate-800">{request.recommendation.primerProduct.name}</span>
                      <span className="font-mono text-slate-600">{request.recommendation.calculatedPrimerLiters} L</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200">
                    <span className="text-slate-800">{request.recommendation.mainCoatingProduct.name}</span>
                    <span className="font-mono text-slate-600">{request.recommendation.calculatedLiters} L</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Rango orientativo Pintuco:</span>
                  <span className="font-mono text-emerald-700 font-bold">
                    ${request.recommendation.estimatedCostRange.min.toLocaleString()} COP
                  </span>
                </div>
              </div>

              {/* Adjust Quote Input */}
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3">
                <label className="block text-xs font-bold text-amber-900 uppercase">
                  Ajustar Presupuesto Final para el Cliente (COP):
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold font-mono text-slate-800">$</span>
                  <input
                    type="number"
                    value={quoteAmount}
                    onChange={(e) => setQuoteAmount(Number(e.target.value) || 0)}
                    className="w-48 px-3 py-2 rounded-xl bg-white border border-slate-300 text-base font-mono font-bold text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-xs text-slate-500">COP • Garantía Pintuco</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
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
                    className="absolute border-2 border-amber-400 bg-amber-500/20 rounded-lg shadow-sm"
                  >
                    <div className="absolute -top-3 left-1 px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-amber-500 text-slate-950">
                      {area.label} ({area.confidence}%)
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technician Internal Notes */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <label className="block text-xs font-semibold text-slate-700">
              Notas internas del perito / inspector:
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Añadir observaciones sobre acceso, tipo de superficie o muestras de color..."
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-amber-400"
            />
          </div>

        </div>

        {/* Modal Footer with Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            {statusUpdatedSuccess ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Estado actualizado correctamente
              </span>
            ) : (
              <span>Acciones del flujo operativo:</span>
            )}
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            {request.status !== 'revision_tecnica' && (
              <button
                onClick={() => handleSave('revision_tecnica')}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                🔵 Pasar a Revisión Técnica
              </button>
            )}

            {request.status !== 'recomendacion_lista' && (
              <button
                onClick={() => handleSave('recomendacion_lista')}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer shadow-xs"
              >
                🟡 Emitir Recomendación Lista
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-xs transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
