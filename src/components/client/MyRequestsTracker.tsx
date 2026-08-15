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
      dotColor: 'bg-emerald-400',
      badgeClass: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      stepIndex: 1,
      desc: 'Expediente registrado en el ecosistema ColorLink Pintuco.'
    },
    analizando: {
      label: 'Analizando',
      dotColor: 'bg-amber-400',
      badgeClass: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      stepIndex: 2,
      desc: 'Motor neural de visión procesando patología, humedad y sustrato.'
    },
    revision_tecnica: {
      label: 'Revisión técnica',
      dotColor: 'bg-blue-400',
      badgeClass: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
      stepIndex: 3,
      desc: 'Ingeniero de recubrimientos Pintuco validando la prescripción.'
    },
    recomendacion_lista: {
      label: 'Recomendación lista',
      dotColor: 'bg-purple-400',
      badgeClass: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
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
    <div className="max-w-6xl mx-auto space-y-7 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/30 border border-slate-800 shadow-xl gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>Seguimiento de Expedientes Técnicos Pintuco</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 font-display">
            Mis Solicitudes & Proyectos
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Rastrea en tiempo real el estado de diagnóstico, revisión de perito y cotizaciones de recubrimiento.
          </p>
        </div>

        <button
          onClick={onNewRequest}
          className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all transform hover:scale-[1.02] cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Transformación IA</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setSelectedStatusFilter('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedStatusFilter === 'all'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
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
                className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  isSelected
                    ? `${statusConfig[st].badgeClass} font-bold ring-1 ring-cyan-400/40`
                    : 'bg-slate-800/80 text-slate-300 border-slate-700/60 hover:bg-slate-800'
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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por código, cliente o espacio..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:outline-none text-xs text-white placeholder:text-slate-500"
          />
        </div>

      </div>

      {/* Main Grid: Request List + Live Timeline Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Request Cards (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          {filteredRequests.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
              <p className="text-sm text-slate-400">No se encontraron solicitudes con los filtros aplicados.</p>
              <button
                onClick={() => {
                  setSelectedStatusFilter('all');
                  setSearchQuery('');
                }}
                className="text-xs text-cyan-400 underline font-semibold"
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
                  className={`group p-5 rounded-2xl border transition-all duration-200 cursor-pointer text-left space-y-3 relative overflow-hidden ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500/80 ring-2 ring-cyan-500/20 shadow-xl shadow-cyan-500/10'
                      : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-900/90 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    
                    <div className="flex items-start space-x-3.5">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-slate-700">
                        <img
                          src={imageUrl}
                          alt={clientName}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                        <div className="absolute top-1 left-1 p-0.5 rounded bg-slate-950/80 text-white">
                          {isParticular ? <Home className="w-3 h-3 text-cyan-400" /> : <Building2 className="w-3 h-3 text-blue-400" />}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-mono font-bold text-cyan-400">
                            {req.code || req.id}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            • {req.createdAt}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors">
                          {companyName ? `${companyName} (${clientName})` : clientName}
                        </h3>

                        <p className="text-xs text-slate-400">
                          {req.input?.transformationTarget?.toUpperCase() || 'HOGAR'} • {specificArea} ({areaM2} m²)
                        </p>
                      </div>
                    </div>

                    {/* Status badge */}
                    <div className="text-right">
                      <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border ${cfg.badgeClass}`}>
                        <span className={`w-2 h-2 rounded-full ${cfg.dotColor}`} />
                        <span>{cfg.label}</span>
                      </span>
                    </div>

                  </div>

                  {/* Summary & Price strip */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400 truncate max-w-[280px]">
                      {req.recommendation?.recommendedSystem || 'Sistema Pintuco Personalizado'}
                    </span>
                    <span className="font-mono font-bold text-emerald-400">
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
            <div className="sticky top-20 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6 text-left">
              
              {/* Top Details Card */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    EXPEDIENTE: {selectedRequestForDetail.code || selectedRequestForDetail.id}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">
                    {selectedRequestForDetail.client?.companyName || selectedRequestForDetail.client?.name || selectedRequestForDetail.input?.clientName}
                  </h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    <span>{selectedRequestForDetail.client?.city || selectedRequestForDetail.input?.clientCity || 'Colombia'}</span>
                  </p>
                </div>

                <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${statusConfig[selectedRequestForDetail.status].badgeClass}`}>
                  {statusConfig[selectedRequestForDetail.status].label}
                </span>
              </div>

              {/* Status Timeline Progress */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Línea de Tiempo del Proyecto
                </label>

                <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                  {getStatusSteps(selectedRequestForDetail.status).map((step, idx) => (
                    <div key={step.key} className="relative">
                      <div className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full flex items-center justify-center border transition-all ${
                        step.isCompleted
                          ? 'bg-cyan-500 border-cyan-400 text-slate-950'
                          : 'bg-slate-950 border-slate-700 text-slate-600'
                      }`}>
                        {step.isCompleted && <CheckCircle2 className="w-3 h-3" />}
                      </div>

                      <div className="space-y-0.5">
                        <p className={`text-xs font-bold ${step.isCompleted ? 'text-white' : 'text-slate-500'}`}>
                          {step.label}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {statusConfig[step.key as ProjectStatus].desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prescribed Solution Snapshot */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-semibold text-cyan-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Prescripción IA Aprobada:</span>
                </div>
                <p className="text-sm font-bold text-white">
                  {selectedRequestForDetail.recommendation.recommendedSystem}
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1 text-xs font-mono">
                  <div className="text-slate-400">
                    Volumen: <strong className="text-cyan-300">{selectedRequestForDetail.recommendation.calculatedGallons || selectedRequestForDetail.recommendation.calculatedLiters} Gal/L</strong>
                  </div>
                  <div className="text-slate-400">
                    Garantía: <strong className="text-emerald-300">{selectedRequestForDetail.recommendation.warrantyPeriod}</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => onSelectRequest(selectedRequestForDetail)}
                  className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver Expediente Completo en Gestor</span>
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
                  className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs border border-slate-700 transition-colors cursor-pointer"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Descargar Ficha Técnica & Presupuesto</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-slate-900/30 border border-slate-800 text-center text-slate-500 text-xs">
              Selecciona una solicitud para ver el desglose en vivo.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
