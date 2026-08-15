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
  Plus,
  Palette,
  Check,
  FileText
} from 'lucide-react';
import { ProjectRequest } from '../../types';
import { PROCESS_STAGES, ProcessStageConfig, normalizeRequestStatus } from '../../data/mockData';

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
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filteredRequests = requests.filter((req) => {
    const norm = normalizeRequestStatus(req.status);
    const matchesFilter = selectedStatusFilter === 'all' || norm === selectedStatusFilter;
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

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn text-slate-800 text-left">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono font-bold">
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            <span>Mi Espacio • Seguimiento en Vivo</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">
            Mis Solicitudes & Proyectos Pintuco
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Sigue el estado en tiempo real del diagnóstico IA, validación de peritaje técnico y despacho de recubrimientos certificados.
          </p>
        </div>

        <button
          onClick={onNewRequest}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center space-x-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Crear Nueva Solicitud</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por código de solicitud o espacio..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-slate-400 uppercase font-mono shrink-0">Etapa:</span>
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
          >
            <option value="all">Todas las etapas ({requests.length})</option>
            {PROCESS_STAGES.map((st) => (
              <option key={st.key} value={st.key}>
                {st.stepNumber}. {st.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Dual Layout: List + Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Request Cards (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-600 font-mono uppercase">
              Expedientes ({filteredRequests.length})
            </span>
            <span className="text-[11px] text-slate-400">Pintuco Colombia</span>
          </div>

          {filteredRequests.length === 0 ? (
            <div className="p-8 rounded-3xl bg-white border border-dashed border-slate-300 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">No encontramos solicitudes con este filtro</h4>
              <p className="text-xs text-slate-500">Prueba cambiando los términos de búsqueda o crea una nueva.</p>
              <button
                onClick={onNewRequest}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs cursor-pointer"
              >
                Comenzar proyecto
              </button>
            </div>
          ) : (
            filteredRequests.map((req) => {
              const norm = normalizeRequestStatus(req.status);
              const stage = PROCESS_STAGES.find((s) => s.key === norm) || PROCESS_STAGES[0];
              const isSelected = selectedRequestForDetail?.id === req.id;
              const isCompany = req.clientType === 'empresa';
              const displayName = req.client?.name || req.input?.clientName || 'Cliente';
              const company = req.client?.companyName || req.input?.companyName;

              return (
                <div
                  key={req.id}
                  onClick={() => setSelectedRequestForDetail(req)}
                  className={`p-4 rounded-3xl border transition-all cursor-pointer space-y-3 text-left ${
                    isSelected
                      ? 'bg-white border-amber-400 shadow-md ring-2 ring-amber-400/30'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
                        {req.code}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {req.createdAt}
                      </span>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border font-mono ${stage.badgeBg}`}>
                      {stage.stepNumber}. {stage.shortLabel}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                      {req.input?.specificSpaceSubtype || req.input?.specificArea} ({req.input?.estimatedM2} m²)
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {isCompany && company ? `${company} • ` : ''}{req.client?.city || 'Colombia'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <div className="flex items-center space-x-2 text-slate-600 font-mono text-[11px]">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>{req.recommendation?.pintucoFamilyName?.split(' ')[0]} Pintuco</span>
                    </div>

                    <span className="font-mono font-bold text-slate-900">
                      ${(req.quotedAmount || req.recommendation?.estimatedCostRange?.min || 0).toLocaleString('es-CO')} COP
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Active Request Detail & 7-Stage Timeline (7 Cols) */}
        <div className="lg:col-span-7">
          {selectedRequestForDetail ? (
            <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 text-left">
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                      {selectedRequestForDetail.code}
                    </span>
                    <button
                      onClick={() => handleCopyCode(selectedRequestForDetail.code)}
                      className="text-[10px] text-slate-400 hover:text-slate-700 underline cursor-pointer"
                    >
                      {copiedCode === selectedRequestForDetail.code ? '¡Copiado!' : 'Copiar código'}
                    </button>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mt-1">
                    {selectedRequestForDetail.input?.specificSpaceSubtype || selectedRequestForDetail.input?.specificArea}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Registrado el {selectedRequestForDetail.createdAt} en {selectedRequestForDetail.client?.city}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Presupuesto Oficial</span>
                  <span className="text-lg sm:text-xl font-extrabold font-mono text-slate-900">
                    ${(selectedRequestForDetail.quotedAmount || selectedRequestForDetail.recommendation?.estimatedCostRange?.min || 0).toLocaleString('es-CO')} <span className="text-xs text-slate-500 font-normal">COP</span>
                  </span>
                </div>
              </div>

              {/* 7-STAGE FRIENDLY PROGRESS TIMELINE */}
              <div className="space-y-3 p-5 rounded-3xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 font-mono uppercase tracking-wider">
                    Ciclo de Transformación (7 Etapas)
                  </span>
                  <span className="text-xs text-amber-800 font-semibold">
                    Etapa {PROCESS_STAGES.find((s) => s.key === normalizeRequestStatus(selectedRequestForDetail.status))?.stepNumber || 1} de 7
                  </span>
                </div>

                {/* Progress bar line */}
                <div className="relative pt-2 pb-2">
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-blue-600 transition-all duration-500 rounded-full"
                      style={{
                        width: `${Math.max(14, ((PROCESS_STAGES.findIndex((s) => s.key === normalizeRequestStatus(selectedRequestForDetail.status)) + 1) / 7) * 100)}%`
                      }}
                    />
                  </div>
                </div>

                {/* Stages List */}
                <div className="space-y-2 pt-2">
                  {PROCESS_STAGES.map((st, idx) => {
                    const currentNorm = normalizeRequestStatus(selectedRequestForDetail.status);
                    const currentIdx = PROCESS_STAGES.findIndex((s) => s.key === currentNorm);
                    const isCompleted = idx < currentIdx;
                    const isCurrent = idx === currentIdx;

                    return (
                      <div
                        key={st.key}
                        className={`p-3 rounded-2xl border transition-all flex items-start space-x-3 ${
                          isCurrent
                            ? `${st.badgeBg} ring-1 ring-amber-400/50 shadow-xs`
                            : isCompleted
                            ? 'bg-white border-slate-200 text-slate-700 opacity-90'
                            : 'bg-slate-100/50 border-slate-200/60 text-slate-400'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                          isCompleted
                            ? 'bg-emerald-600 text-white'
                            : isCurrent
                            ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300 animate-pulse'
                            : 'bg-slate-200 text-slate-500'
                        }`}>
                          {isCompleted ? <Check className="w-3.5 h-3.5" /> : st.stepNumber}
                        </div>

                        <div className="space-y-0.5 flex-1">
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-bold ${isCurrent ? 'text-slate-900' : isCompleted ? 'text-slate-800' : 'text-slate-500'}`}>
                              {st.label}
                            </span>
                            {isCurrent && (
                              <span className="text-[10px] font-bold uppercase font-mono px-2 py-0.2 rounded bg-amber-400 text-slate-950">
                                En Progreso
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500">
                            {st.clientLabel}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recommended Solution Card */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <h3 className="text-sm font-bold text-slate-900 font-display">
                      Solución Formulada por IA & Pintuco
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {selectedRequestForDetail.aiAnalysis?.overallConfidence}% Confianza
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Línea de Recubrimiento</span>
                    <p className="font-bold text-slate-900">{selectedRequestForDetail.recommendation?.recommendedSystem}</p>
                    <p className="text-[11px] text-slate-500">{selectedRequestForDetail.recommendation?.systemSummary}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Cálculo de Material</span>
                    <p className="font-bold text-slate-900 font-mono">
                      {selectedRequestForDetail.recommendation?.calculatedLiters} Litros ({selectedRequestForDetail.recommendation?.calculatedGallons} Galones)
                    </p>
                    <p className="text-[11px] text-slate-500">Rendimiento para 2 manos con acabado {selectedRequestForDetail.recommendation?.suggestedFinish}</p>
                  </div>
                </div>

                {/* Color Swatch */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-8 h-8 rounded-xl border border-slate-300 shadow-xs"
                      style={{ backgroundColor: selectedRequestForDetail.recommendation?.selectedColorHex || '#E5A93C' }}
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        {selectedRequestForDetail.recommendation?.selectedColorName}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        Código Pintuco: {selectedRequestForDetail.recommendation?.selectedColorCode}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-amber-900 block">
                      {selectedRequestForDetail.recommendation?.warrantyPeriod}
                    </span>
                    <span className="text-[10px] text-slate-500">Garantía certificada</span>
                  </div>
                </div>

                {/* Technician Notes (if any) */}
                {selectedRequestForDetail.technicianNotes && (
                  <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200 text-xs space-y-1">
                    <span className="text-[10px] font-bold font-mono uppercase text-blue-900 block">
                      Nota de Asesor Técnico Pintuco:
                    </span>
                    <p className="text-blue-950 italic">
                      "{selectedRequestForDetail.technicianNotes}"
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => onSelectRequest(selectedRequestForDetail)}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver Ficha Técnica Completa</span>
                </button>

                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <a
                    href={`https://wa.me/573001234567?text=Hola%20ColorLink%2C%20quisiera%20asesor%C3%ADa%20sobre%20mi%20solicitud%20${selectedRequestForDetail.code}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all flex items-center justify-center space-x-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Hablar con Asesor</span>
                  </a>
                </div>
              </div>

            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-white border border-slate-200 text-center text-slate-400">
              Selecciona una solicitud para ver el desglose en tiempo real.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
