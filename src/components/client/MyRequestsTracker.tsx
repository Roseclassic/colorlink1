import React, { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  FileDown,
  Building2,
  Home,
  Layers,
  ChevronRight,
  Filter,
  Search,
  Sparkles,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Zap,
  ArrowRight,
  Plus
} from 'lucide-react';
import { ProjectRequest, ProjectStatus } from '../../types';

interface MyRequestsTrackerProps {
  requests: ProjectRequest[];
  onSelectRequest: (req: ProjectRequest) => void;
  onNewRequest: () => void;
}

export const MyRequestsTracker: React.FC<MyRequestsTrackerProps> = ({
  requests,
  onSelectRequest,
  onNewRequest
}) => {
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRequestForDetail, setSelectedRequestForDetail] = useState<ProjectRequest | null>(
    requests[0] || null
  );

  const statusConfig: Record<
    ProjectStatus,
    { label: string; dotColor: string; badgeClass: string; stepIndex: number; desc: string }
  > = {
    recibida: {
      label: 'Recibida',
      dotColor: 'bg-emerald-500',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      stepIndex: 1,
      desc: 'Expediente registrado en el ecosistema ColorLink Pintuco.'
    },
    analizando: {
      label: 'Analizando',
      dotColor: 'bg-amber-500',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
      stepIndex: 2,
      desc: 'Motor neural de visión procesando patología, humedad y sustrato.'
    },
    revision_tecnica: {
      label: 'Revisión técnica',
      dotColor: 'bg-blue-500',
      badgeClass: 'bg-blue-50 text-blue-800 border-blue-200',
      stepIndex: 3,
      desc: 'Ingeniero de recubrimientos Pintuco validando la prescripción.'
    },
    recomendacion_lista: {
      label: 'Recomendación lista',
      dotColor: 'bg-amber-500',
      badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
      stepIndex: 4,
      desc: 'Fórmula química, rendimiento en galones y presupuesto finalizados.'
    }
  };

  const filteredRequests = requests.filter((req) => {
    const matchesFilter = selectedStatusFilter === 'all' || req.status === selectedStatusFilter;
    const clientName = req.client?.name || req.input?.clientName || '';
    const companyName = req.client?.companyName || req.input?.companyName || '';
    const specificArea = req.input?.specificArea || req.input?.specificSpaceSubtype || '';
    const reqCode = req.code || req.id || '';

    const matchesSearch =
      searchQuery === '' ||
      reqCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      specificArea.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getStatusSteps = (currentStatus: ProjectStatus) => {
    const stepOrder: ProjectStatus[] = ['recibida', 'analizando', 'revision_tecnica', 'recomendacion_lista'];
    const currentIndex = statusConfig[currentStatus]?.stepIndex || 1;

    return stepOrder.map((st, index) => {
      const isCompleted = index + 1 <= currentIndex;
      const isCurrent = index + 1 === currentIndex;
      return {
        key: st,
        label: statusConfig[st].label,
        isCompleted,
        isCurrent
      };
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn text-slate-800">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm gap-4 text-left">
        <div>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono font-semibold">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Seguimiento de Expedientes Técnicos Pintuco</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-display">
            Mis Solicitudes & Proyectos
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Rastrea en tiempo real el estado de diagnóstico, revisión de perito y cotizaciones de recubrimiento Pintuco.
          </p>
        </div>

        <button
          onClick={onNewRequest}
          className="min-h-[48px] inline-flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 text-slate-950" />
          <span>Nueva Transformación</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
        
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setSelectedStatusFilter('all')}
            className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedStatusFilter === 'all'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Todos ({requests.length})
          </button>
          
          {(['recibida', 'analizando', 'revision_tecnica', 'recomendacion_lista'] as ProjectStatus[]).map((st) => {
            const count = requests.filter((r) => r.status === st).length;
            const isSelected = selectedStatusFilter === st;
            return (
              <button
                key={st}
                onClick={() => setSelectedStatusFilter(st)}
                className={`min-h-[38px] inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  isSelected
                    ? `${statusConfig[st].badgeClass} font-bold`
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${statusConfig[st].dotColor}`} />
                <span>{statusConfig[st].label} ({count})</span>
              </button>
            );
          })}
        </div>

        {/* Search Field */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por código o cliente..."
            className="w-full min-h-[40px] pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-amber-400 focus:bg-white focus:outline-none text-xs text-slate-800 placeholder:text-slate-400 transition-all"
          />
        </div>

      </div>

      {/* Main Grid: Request Cards + Live Timeline Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Request Cards (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          {filteredRequests.length === 0 ? (
            <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-3">
              <p className="text-sm text-slate-500">No se encontraron solicitudes con los filtros aplicados.</p>
              <button
                onClick={() => {
                  setSelectedStatusFilter('all');
                  setSearchQuery('');
                }}
                className="text-xs text-amber-800 underline font-semibold cursor-pointer"
              >
                Restablecer filtros
              </button>
            </div>
          ) : (
            filteredRequests.map((req) => {
              const isSelected = selectedRequestForDetail?.id === req.id;
              const cfg = statusConfig[req.status] || statusConfig.recibida;
              const isParticular = req.clientType === 'particular';
              const clientName = req.client?.name || req.input?.clientName || 'Cliente';
              const companyName = req.client?.companyName || req.input?.companyName;
              const imageUrl = req.input?.imageUrl || 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80';
              const specificArea = req.input?.specificSpaceSubtype || req.input?.specificArea || 'Espacio';
              const areaM2 = req.input?.estimatedM2 || 28;
              const formattedPrice = req.recommendation?.estimatedCostRange
                ? `$${req.recommendation.estimatedCostRange.min.toLocaleString()} COP`
                : '$180.000 COP';

              return (
                <div
                  key={req.id}
                  id={`request-card-${req.id}`}
                  onClick={() => setSelectedRequestForDetail(req)}
                  className={`group p-5 rounded-2xl border transition-all duration-200 cursor-pointer text-left space-y-3 relative overflow-hidden active:scale-[0.99] ${
                    isSelected
                      ? 'bg-amber-50/50 border-amber-400 shadow-sm'
                      : 'bg-white border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    
                    <div className="flex items-start space-x-3.5">
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                        <img
                          src={imageUrl}
                          alt={clientName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute top-1 left-1 p-1 rounded-lg bg-white/90 text-slate-800 shadow-xs">
                          {isParticular ? <Home className="w-3 h-3 text-amber-600" /> : <Building2 className="w-3 h-3 text-blue-600" />}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-mono font-bold text-amber-800">
                            {req.code || req.id}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            • {req.createdAt}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-800 transition-colors font-display">
                          {companyName ? `${companyName} (${clientName})` : clientName}
                        </h3>

                        <p className="text-xs text-slate-500">
                          {req.input?.transformationTarget?.toUpperCase() || 'HOGAR'} • {specificArea} ({areaM2} m²)
                        </p>
                      </div>
                    </div>

                    {/* Status badge */}
                    <div className="text-right">
                      <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${cfg.badgeClass}`}>
                        <span className={`w-2 h-2 rounded-full ${cfg.dotColor}`} />
                        <span>{cfg.label}</span>
                      </span>
                    </div>

                  </div>

                  {/* Summary & Price strip */}
                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 truncate max-w-[280px]">
                      {req.recommendation?.recommendedSystem || 'Sistema Pintuco Personalizado'}
                    </span>
                    <span className="font-mono font-bold text-emerald-700">
                      {formattedPrice}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Live Status Detail & Timeline Drawer (5 Cols) */}
        <div className="lg:col-span-5">
          {selectedRequestForDetail ? (
            <div className="sticky top-24 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6 text-left">
              
              {/* Top Details Card */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-800">
                    EXPEDIENTE: {selectedRequestForDetail.code || selectedRequestForDetail.id}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1 font-display">
                    {selectedRequestForDetail.client?.companyName || selectedRequestForDetail.client?.name || selectedRequestForDetail.input?.clientName}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>{selectedRequestForDetail.client?.city || selectedRequestForDetail.input?.clientCity || 'Colombia'}</span>
                  </p>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig[selectedRequestForDetail.status].badgeClass}`}>
                  {statusConfig[selectedRequestForDetail.status].label}
                </span>
              </div>

              {/* Status Timeline Progress */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 font-mono">
                  Línea de Tiempo del Proyecto
                </label>

                <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {getStatusSteps(selectedRequestForDetail.status).map((step, idx) => (
                    <div key={step.key} className="relative">
                      <div className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full flex items-center justify-center border transition-all ${
                        step.isCompleted
                          ? 'bg-amber-400 border-amber-500 text-slate-950 shadow-xs'
                          : 'bg-slate-100 border-slate-300 text-slate-400'
                      }`}>
                        {step.isCompleted && <CheckCircle2 className="w-3 h-3 text-slate-950" />}
                      </div>

                      <div className="space-y-0.5">
                        <p className={`text-xs font-bold ${step.isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                          {step.label}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {statusConfig[step.key as ProjectStatus].desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prescribed Solution Snapshot */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-semibold text-amber-800">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Prescripción Pintuco:</span>
                </div>
                <p className="text-sm font-bold text-slate-900">
                  {selectedRequestForDetail.recommendation.recommendedSystem}
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1 text-xs font-mono">
                  <div className="text-slate-500">
                    Volumen: <strong className="text-slate-900">{selectedRequestForDetail.recommendation.calculatedGallons || selectedRequestForDetail.recommendation.calculatedLiters} Gal/L</strong>
                  </div>
                  <div className="text-slate-500">
                    Garantía: <strong className="text-emerald-700">{selectedRequestForDetail.recommendation.warrantyPeriod}</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => onSelectRequest(selectedRequestForDetail)}
                  className="w-full min-h-[44px] inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer shadow-xs"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver Expediente Completo</span>
                </button>

                <button
                  onClick={() => {
                    const clientName = selectedRequestForDetail.client?.name || selectedRequestForDetail.input?.clientName || 'Cliente';
                    const blob = new Blob([
                      `INFORME TÉCNICO COLORLINK - ECOSISTEMA PINTUCO\n` +
                      `Expediente: ${selectedRequestForDetail.code || selectedRequestForDetail.id}\n` +
                      `Cliente: ${clientName}\n` +
                      `Espacio: ${selectedRequestForDetail.input?.specificSpaceSubtype || 'Espacio'} (${selectedRequestForDetail.input?.estimatedM2} m2)\n` +
                      `Diagnostico IA: ${selectedRequestForDetail.aiAnalysis?.conversationalSummary}\n` +
                      `Sistema Prescrito: ${selectedRequestForDetail.recommendation?.recommendedSystem}\n` +
                      `Garantia: ${selectedRequestForDetail.recommendation?.warrantyPeriod}\n`
                    ], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `ColorLink-Pintuco-${selectedRequestForDetail.code || selectedRequestForDetail.id}.txt`;
                    a.click();
                  }}
                  className="w-full min-h-[44px] inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-200 transition-colors cursor-pointer shadow-xs"
                >
                  <FileDown className="w-4 h-4 text-amber-600" />
                  <span>Descargar Ficha Técnica & Presupuesto</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center text-slate-400 text-xs">
              Selecciona una solicitud para ver el desglose en vivo.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
