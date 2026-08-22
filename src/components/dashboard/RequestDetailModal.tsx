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
  Crosshair,
  Building2,
  ArrowRight,
  ImageIcon,
  Check,
  UserCheck
} from 'lucide-react';
import { ProjectRequest, RequestStatus } from '../../types';
import { PROCESS_STAGES, normalizeRequestStatus } from '../../data/mockData';

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
  const normStatus = normalizeRequestStatus(request.status);
  const [selectedStatus, setSelectedStatus] = useState<RequestStatus>(normStatus as RequestStatus);
  const [technicianNotes, setTechnicianNotes] = useState(request.technicianNotes || '');
  const [quotedAmount, setQuotedAmount] = useState<number>(
    request.quotedAmount || request.recommendation?.estimatedCostRange?.min || 180000
  );
  const [activeTab, setActiveTab] = useState<'diagnosis' | 'quote' | 'photos' | 'workflow'>('diagnosis');
  const [statusUpdatedSuccess, setStatusUpdatedSuccess] = useState(false);

  const clientName = request.client?.name || request.input?.clientName || 'Cliente';
  const companyName = request.client?.companyName || request.input?.companyName;
  const isCompany = request.clientType === 'empresa';
  const phone = request.client?.phone || request.input?.clientPhone || '+57 300 000 0000';
  const city = request.client?.city || request.input?.clientCity || 'Colombia';
  const email = request.client?.email || 'cliente@pintuco.co';

  const handleSave = () => {
    onUpdateStatus(request.id, selectedStatus, technicianNotes, quotedAmount);
    setStatusUpdatedSuccess(true);
    setTimeout(() => {
      setStatusUpdatedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto animate-fadeIn text-slate-800">
      <div className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-6 text-left">
        
        {/* Modal Top Bar */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                EXPEDIENTE {request.code}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Registrado {request.createdAt}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              {isCompany && companyName ? `${companyName} • ` : ''}
              {request.input?.specificSpaceSubtype || request.input?.specificArea} ({request.input?.estimatedM2} m²)
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50 space-x-4 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('diagnosis')}
            className={`py-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'diagnosis' ? 'border-amber-500 text-amber-900 font-extrabold' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            1. Diagnóstico IA & Patología
          </button>
          <button
            onClick={() => setActiveTab('quote')}
            className={`py-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'quote' ? 'border-amber-500 text-amber-900 font-extrabold' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            2. Presupuesto & Dosificación
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`py-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'photos' ? 'border-amber-500 text-amber-900 font-extrabold' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            3. Evidencias & Visión IA
          </button>
          <button
            onClick={() => setActiveTab('workflow')}
            className={`py-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'workflow' ? 'border-blue-600 text-blue-900 font-extrabold' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            4. Gestión de Estado (7 Etapas)
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Client summary box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block text-[10px] font-mono uppercase">Cliente / Empresa</span>
              <span className="font-bold text-slate-900">{isCompany && companyName ? companyName : clientName}</span>
              {isCompany && <span className="text-[10px] text-slate-500 block">Contacto: {clientName}</span>}
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] font-mono uppercase">Teléfono / WhatsApp</span>
              <span className="font-mono text-amber-900 font-bold">{phone}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] font-mono uppercase">Ciudad</span>
              <span className="text-slate-800 font-medium">{city}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] font-mono uppercase">Estado Pipeline</span>
              <span className="font-mono font-bold text-blue-700">
                {PROCESS_STAGES.find((s) => s.key === normStatus)?.label || normStatus}
              </span>
            </div>
          </div>

          {/* TAB 1: DIAGNOSIS */}
          {activeTab === 'diagnosis' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[11px] font-mono text-amber-900 uppercase font-bold">
                    Sustrato & Patología Detectada
                  </span>
                  <p className="text-sm font-bold text-slate-900">
                    {request.aiAnalysis?.detectedSurface || 'Superficie de Mampostería / Concreto'}
                  </p>
                  <p className="text-xs text-rose-700 font-bold">
                    {request.aiAnalysis?.primaryProblem || 'Desgaste y necesidad de renovación'}
                  </p>
                  <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                    {request.aiAnalysis?.secondaryObservations?.map((obs, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span>{obs}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[11px] font-mono text-emerald-700 uppercase font-bold">
                    Sistema Técnico Formulado
                  </span>
                  <p className="text-sm font-bold text-slate-900">
                    {request.recommendation?.recommendedSystem}
                  </p>
                  <p className="text-xs text-slate-600">
                    {request.recommendation?.systemSummary}
                  </p>
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500">Confianza Red Neuronal:</span>
                    <span className="text-emerald-700 font-bold">{request.aiAnalysis?.overallConfidence}%</span>
                  </div>
                </div>
              </div>

              {/* Client Notes */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase font-mono">
                  Descripción capturada del cliente:
                </span>
                <p className="text-xs sm:text-sm text-slate-700 italic">
                  "{request.input?.description || 'Sin notas adicionales ingresadas.'}"
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: QUOTE & PRODUCTS */}
          {activeTab === 'quote' && (
            <div className="space-y-4">
              {/* Order & Cart Items Breakdown if present */}
              {request.cartItems && request.cartItems.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-300 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 font-mono flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-700" />
                      <span>Artículos en Carrito / Pedido ({request.cartItems.length})</span>
                    </h4>
                    {request.deliveryOption && (
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold capitalize">
                        Entrega: {request.deliveryOption.replace('_', ' ')}
                      </span>
                    )}
                  </div>

                  <div className="divide-y divide-amber-200/60 rounded-xl bg-white border border-amber-200 overflow-hidden text-xs">
                    {request.cartItems.map((item) => (
                      <div key={item.id} className="p-3 flex items-center justify-between gap-3">
                        <div className="flex items-center space-x-2.5 min-w-0">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-9 h-9 rounded-lg object-cover border border-slate-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 truncate">{item.name}</p>
                            <p className="text-[10px] text-slate-500">{item.presentation} • Cantidad: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-slate-900 shrink-0">
                          ${(item.unitPriceCOP * item.quantity).toLocaleString('es-CO')} COP
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 font-display">
                    Dosificación Oficial Pintuco
                  </h4>
                  <span className="text-xs font-mono text-amber-900 font-bold">
                    {request.input?.estimatedM2} m² calculados
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {request.recommendation?.calculatedPrimerLiters && request.recommendation.calculatedPrimerLiters > 0 && (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
                      <div>
                        <span className="font-bold text-slate-800 block">{request.recommendation?.primerProduct?.name || 'Imprimante Sellador'}</span>
                        <span className="text-[10px] text-slate-500">Base fijadora anti-alcalina</span>
                      </div>
                      <span className="font-mono text-slate-900 font-bold">{request.recommendation?.calculatedPrimerLiters} L</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
                    <div>
                      <span className="font-bold text-slate-800 block">{request.recommendation?.mainCoatingProduct?.name || request.recommendation?.pintucoFamilyName}</span>
                      <span className="text-[10px] text-slate-500">Recubrimiento de acabado ({request.recommendation?.suggestedFinish})</span>
                    </div>
                    <span className="font-mono text-slate-900 font-bold">{request.recommendation?.calculatedLiters} L ({request.recommendation?.calculatedGallons} Gal)</span>
                  </div>
                </div>

                {/* Color Swatch */}
                <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-7 h-7 rounded-lg border border-slate-300 shadow-inner"
                      style={{ backgroundColor: request.recommendation?.selectedColorHex || '#E5A93C' }}
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900">{request.recommendation?.selectedColorName}</span>
                      <span className="text-[10px] text-slate-500 block font-mono">Código: {request.recommendation?.selectedColorCode}</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                    Garantía {request.recommendation?.warrantyPeriod}
                  </span>
                </div>
              </div>

              {/* Adjust Quote Input */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-300/80 space-y-3">
                <label className="block text-xs font-bold text-amber-950 uppercase font-mono">
                  Presupuesto Final Liquidado (COP):
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold font-mono text-slate-800">$</span>
                  <input
                    type="number"
                    value={quotedAmount}
                    onChange={(e) => setQuotedAmount(Number(e.target.value) || 0)}
                    className="w-48 px-3 py-2 rounded-xl bg-white border border-slate-300 text-sm font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <span className="text-xs text-slate-600 font-medium">COP • Materiales + Logística Pintuco</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PHOTOS & HUD */}
          {activeTab === 'photos' && (
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 max-h-96">
                <img
                  src={request.input?.imageUrl || 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'}
                  alt="Superficie analizada"
                  className="w-full h-80 object-cover"
                />

                {/* Bounding boxes */}
                {request.aiAnalysis?.detectionAreas?.map((area) => (
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

              {/* Photo Evidence Table */}
              {request.input?.evidences && request.input.evidences.length > 0 && (
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-700 font-mono uppercase">
                    Objetos de Evidencia Registrados ({request.input.evidences.length})
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {request.input.evidences.map((ev) => (
                      <div key={ev.id} className="p-2 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                        <div className="truncate pr-2">
                          <span className="font-bold text-slate-900 block truncate">{ev.fileName}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{ev.fileType} • {ev.uploadDate}</span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {ev.isCriticalProblem ? '⚠️ Patología' : 'General'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: WORKFLOW & STAGE TRANSITION (7 Stages) */}
          {activeTab === 'workflow' && (
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-700 font-mono uppercase block">
                Selecciona la etapa de avance para esta solicitud:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PROCESS_STAGES.map((stage) => {
                  const isCurrent = selectedStatus === stage.key;
                  return (
                    <button
                      key={stage.key}
                      onClick={() => setSelectedStatus(stage.key as RequestStatus)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-start space-x-3 ${
                        isCurrent
                          ? `${stage.badgeBg} ring-2 ring-blue-500 shadow-sm`
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                        isCurrent ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {stage.stepNumber}
                      </div>
                      <div className="space-y-0.5">
                        <div className="font-bold text-xs text-slate-900">{stage.label}</div>
                        <p className="text-[11px] text-slate-500">{stage.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Perito Internal Notes */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <label className="block text-xs font-bold text-slate-700 font-mono uppercase">
              Notas internas del perito / inspector Pintuco:
            </label>
            <textarea
              rows={2}
              value={technicianNotes}
              onChange={(e) => setTechnicianNotes(e.target.value)}
              placeholder="Añadir observaciones sobre acceso, tipo de superficie o muestras de color..."
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>

        {/* Modal Footer with Save & Close Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            {statusUpdatedSuccess ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Expediente guardado exitosamente
              </span>
            ) : (
              <span>Modifica los valores y guarda para notificar al cliente</span>
            )}
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs transition-colors cursor-pointer"
            >
              Cancelar
            </button>

            <button
              onClick={handleSave}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-md shadow-blue-600/20 flex items-center justify-center space-x-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Guardar Cambios</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
