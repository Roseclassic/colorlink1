import React, { useState } from 'react';
import {
  Inbox,
  Cpu,
  CheckCircle2,
  Clock,
  Search,
  Layers,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  Plus,
  LayoutGrid,
  List,
  Filter,
  Users,
  AlertTriangle,
  FileText,
  DollarSign,
  Building2,
  User,
  ArrowRight,
  Check,
  Eye,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Activity,
  Zap,
  Tag
} from 'lucide-react';
import { ProjectRequest, RequestStatus, ClientType } from '../../types';
import { PROCESS_STAGES, ProcessStageConfig, normalizeRequestStatus } from '../../data/mockData';
import { RequestDetailModal } from './RequestDetailModal';

interface InternalDashboardProps {
  requests: ProjectRequest[];
  onUpdateStatus: (id: string, newStatus: RequestStatus, technicianNotes?: string, quotedAmount?: number) => void;
  onCreateNewClientFlow: () => void;
  activeTab?: 'pipeline' | 'clients' | 'metrics' | 'alerts';
  onTabChange?: (tab: 'pipeline' | 'clients' | 'metrics' | 'alerts') => void;
}

export const InternalDashboard: React.FC<InternalDashboardProps> = ({
  requests,
  onUpdateStatus,
  onCreateNewClientFlow,
  activeTab = 'pipeline',
  onTabChange
}) => {
  const [selectedRequest, setSelectedRequest] = useState<ProjectRequest | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [clientTypeFilter, setClientTypeFilter] = useState<string>('todos');
  const [priorityFilter, setPriorityFilter] = useState<string>('todos');
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [quickAdvanceSuccess, setQuickAdvanceSuccess] = useState<string | null>(null);

  // Normalized filtering
  const filteredRequests = requests.filter((req) => {
    const clientName = req.client?.name || req.input?.clientName || '';
    const companyName = req.client?.companyName || req.input?.companyName || '';
    const city = req.client?.city || req.input?.clientCity || '';
    const specificArea = req.input?.specificArea || req.input?.specificSpaceSubtype || '';
    const reqCode = req.code || req.id || '';
    const currentStatus = normalizeRequestStatus(req.status);

    const matchSearch =
      clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reqCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      specificArea.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = statusFilter === 'todos' || currentStatus === statusFilter;
    const matchClientType = clientTypeFilter === 'todos' || req.clientType === clientTypeFilter;
    const matchPriority =
      priorityFilter === 'todos' ||
      (priorityFilter === 'alta' && (req.input?.urgency === 'alta' || req.input?.hasMoisture || req.input?.hasCracks)) ||
      (priorityFilter === 'normal' && req.input?.urgency !== 'alta');

    return matchSearch && matchStatus && matchClientType && matchPriority;
  });

  // Calculate high-level KPIs
  const totalVolumeCOP = requests.reduce((acc, curr) => {
    return acc + (curr.quotedAmount || curr.recommendation?.estimatedCostRange?.min || 0);
  }, 0);

  const pendingTechnicalReviewCount = requests.filter((r) => {
    const st = normalizeRequestStatus(r.status);
    return st === 'nueva' || st === 'analizando' || st === 'validacion_tecnica';
  }).length;

  const moistureAlertCount = requests.filter((r) => r.input?.hasMoisture || (r.aiAnalysis?.moistureIndex && r.aiAnalysis.moistureIndex > 30)).length;

  const handleQuickAdvance = (req: ProjectRequest, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentNorm = normalizeRequestStatus(req.status);
    const currentIndex = PROCESS_STAGES.findIndex((s) => s.key === currentNorm);
    if (currentIndex >= 0 && currentIndex < PROCESS_STAGES.length - 1) {
      const nextStage = PROCESS_STAGES[currentIndex + 1];
      onUpdateStatus(req.id, nextStage.key as RequestStatus);
      setQuickAdvanceSuccess(`Solicitud ${req.code} avanzada a "${nextStage.label}"`);
      setTimeout(() => setQuickAdvanceSuccess(null), 2500);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto animate-fadeIn text-slate-800 text-left">
      
      {/* Top Professional Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-xl gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/60 text-blue-300 text-xs font-mono">
            <Activity className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>Consola de Operaciones & Asesoría Técnica Pintuco</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
            Gestión ColorLink • Control de Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Supervisa en tiempo real el flujo de 7 estados, diagnósticos de visión IA, formulación de recubrimientos y despacho comercial.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={onCreateNewClientFlow}
            className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Simular Solicitud Cliente</span>
          </button>
        </div>
      </div>

      {/* Quick Advance Toast Notification */}
      {quickAdvanceSuccess && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="flex items-center space-x-2 px-4 py-3 rounded-2xl bg-emerald-600 text-white text-xs font-bold shadow-xl">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{quickAdvanceSuccess}</span>
          </div>
        </div>
      )}

      {/* Corporate KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        
        {/* Metric 1: Solicitudes en Pipeline */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-semibold uppercase font-mono">Solicitudes Activas</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900">
            {requests.length}
          </div>
          <p className="text-[11px] text-emerald-700 flex items-center gap-1 font-mono font-medium">
            <TrendingUp className="w-3 h-3" /> {pendingTechnicalReviewCount} requieren peritaje
          </p>
        </div>

        {/* Metric 2: Precisión Diagnóstica IA */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-semibold uppercase font-mono">Precisión Red IA</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-700">
            98.6%
          </div>
          <p className="text-[11px] text-slate-500 font-mono">
            Calibrado con laboratorio Pintuco
          </p>
        </div>

        {/* Metric 3: Alertas Críticas */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-semibold uppercase font-mono">Alertas Patología</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-700">
            {moistureAlertCount}
          </div>
          <p className="text-[11px] text-rose-600 font-mono font-medium">
            Humedad / Capilaridad activa
          </p>
        </div>

        {/* Metric 4: Valor Total Cotizado */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-semibold uppercase font-mono">Valor Total Pipeline</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold font-mono text-amber-800 truncate">
            ${(totalVolumeCOP / 1000).toLocaleString('es-CO')}k <span className="text-xs font-normal text-slate-500">COP</span>
          </div>
          <p className="text-[11px] text-slate-500 font-mono">
            100% productos originales Pintuco
          </p>
        </div>

      </div>

      {/* Main Filter, Search & View Controls Bar */}
      <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por código, cliente, empresa, ciudad..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filters & View Toggles */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-between lg:justify-end">
            
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="todos">Todos los Estados (7)</option>
              {PROCESS_STAGES.map((st) => (
                <option key={st.key} value={st.key}>
                  {st.stepNumber}. {st.label}
                </option>
              ))}
            </select>

            {/* Client Type Filter */}
            <select
              value={clientTypeFilter}
              onChange={(e) => setClientTypeFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="todos">Todo tipo de cliente</option>
              <option value="particular">Particular / Hogar</option>
              <option value="empresa">Empresa / Comercial</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('kanban')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all cursor-pointer ${
                  viewMode === 'kanban' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Vista Kanban por Estados"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Kanban</span>
              </button>

              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all cursor-pointer ${
                  viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Vista Tabla Detallada"
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tabla</span>
              </button>
            </div>

          </div>

        </div>

        {/* Quick process stages horizontal ticker */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 pt-2 border-t border-slate-100 text-[11px] font-mono">
          <span className="text-slate-400 font-semibold uppercase pr-2 shrink-0">Etapas del Proceso:</span>
          {PROCESS_STAGES.map((st, idx) => {
            const count = requests.filter((r) => normalizeRequestStatus(r.status) === st.key).length;
            const isSelected = statusFilter === st.key;
            return (
              <button
                key={st.key}
                onClick={() => setStatusFilter(isSelected ? 'todos' : st.key)}
                className={`px-2.5 py-1 rounded-lg shrink-0 font-medium transition-all flex items-center space-x-1.5 cursor-pointer border ${
                  isSelected
                    ? `${st.badgeBg} font-bold ring-2 ring-blue-400 shadow-xs`
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${st.dotColor}`} />
                <span>{st.stepNumber}. {st.shortLabel}</span>
                <span className="px-1.5 py-0.2 rounded-md bg-white text-slate-800 font-bold text-[10px] shadow-xs">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* KANBAN VIEW */}
      {viewMode === 'kanban' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-700 font-mono uppercase tracking-wider">
              Pipeline de 7 Estados ({filteredRequests.length} solicitudes mostradas)
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              Haz clic en cualquier tarjeta para abrir peritaje completo
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-7 gap-3 overflow-x-auto pb-4">
            {PROCESS_STAGES.map((stage) => {
              const colRequests = filteredRequests.filter(
                (r) => normalizeRequestStatus(r.status) === stage.key
              );

              return (
                <div
                  key={stage.key}
                  className="flex flex-col bg-slate-100/80 rounded-3xl p-3 border border-slate-200 min-w-[280px] lg:min-w-0 min-h-[460px]"
                >
                  {/* Column Header */}
                  <div className={`p-3 rounded-2xl bg-white border-t-4 ${stage.borderColor} border border-slate-200/80 shadow-xs mb-3 space-y-1`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-slate-900 font-display">
                        {stage.stepNumber}. {stage.shortLabel}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-slate-100 text-slate-800">
                        {colRequests.length}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 line-clamp-1">
                      {stage.description}
                    </p>
                  </div>

                  {/* Cards Container */}
                  <div className="space-y-2.5 flex-1 overflow-y-auto">
                    {colRequests.length === 0 ? (
                      <div className="h-32 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 text-slate-400 text-center p-3">
                        <span className="text-xs">Sin solicitudes</span>
                        <span className="text-[10px] text-slate-400">en esta etapa</span>
                      </div>
                    ) : (
                      colRequests.map((req) => {
                        const isCompany = req.clientType === 'empresa';
                        const displayName = req.client?.name || req.input?.clientName || 'Cliente';
                        const company = req.client?.companyName || req.input?.companyName;
                        const evidenceCount = (req.input?.evidences?.length || 0) + (req.input?.imageUrl ? 1 : 0);

                        return (
                          <div
                            key={req.id}
                            onClick={() => setSelectedRequest(req)}
                            className="p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer space-y-2.5 group"
                          >
                            {/* Card Top Row: Code & Client Type */}
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                                {req.code}
                              </span>
                              <span className={`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded-md flex items-center gap-1 ${
                                isCompany ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-700'
                              }`}>
                                {isCompany ? <Building2 className="w-2.5 h-2.5" /> : <User className="w-2.5 h-2.5" />}
                                {isCompany ? 'Empresa' : 'Hogar'}
                              </span>
                            </div>

                            {/* Client & Space Title */}
                            <div>
                              <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                                {isCompany && company ? `${company} (${displayName})` : displayName}
                              </h4>
                              <p className="text-[11px] text-slate-500 line-clamp-1">
                                {req.input?.specificSpaceSubtype || req.input?.specificArea} • {req.input?.estimatedM2} m²
                              </p>
                            </div>

                            {/* AI Diagnostics Pill */}
                            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-[10px] space-y-1">
                              <div className="flex items-center justify-between text-slate-600">
                                <span className="font-semibold text-amber-800 truncate">
                                  {req.aiAnalysis?.primaryProblem?.split(' ')[0] || 'Diagnóstico'}...
                                </span>
                                <span className="font-mono text-emerald-700 font-bold">
                                  {req.aiAnalysis?.overallConfidence}% IA
                                </span>
                              </div>
                              <div className="text-slate-500 truncate font-mono text-[9px]">
                                {req.recommendation?.pintucoFamilyName?.split(' ')[0]} Pintuco
                              </div>
                            </div>

                            {/* Footer info: City, Photos count, Quick Advance button */}
                            <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] text-slate-500">
                              <span className="truncate">{req.client?.city || 'Colombia'}</span>
                              <div className="flex items-center space-x-1.5">
                                <span className="font-mono text-slate-600 font-medium">
                                  📷 {evidenceCount}
                                </span>
                                <button
                                  onClick={(e) => handleQuickAdvance(req, e)}
                                  className="p-1 rounded-lg bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 transition-colors cursor-pointer"
                                  title="Avanzar a siguiente estado"
                                >
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              </div>
                            </div>

                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-slate-700">
              Expedientes Técnicos Registrados ({filteredRequests.length})
            </span>
            <span className="text-xs text-slate-500">
              Selecciona una fila para abrir la ficha de validación
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-mono text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Código</th>
                  <th className="py-3 px-4">Cliente / Empresa</th>
                  <th className="py-3 px-4">Espacio / Metraje</th>
                  <th className="py-3 px-4">Patología & Base</th>
                  <th className="py-3 px-4">Confianza IA</th>
                  <th className="py-3 px-4">Estado Pipeline</th>
                  <th className="py-3 px-4">Presupuesto COP</th>
                  <th className="py-3 px-4 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredRequests.map((req) => {
                  const normStatus = normalizeRequestStatus(req.status);
                  const stageObj = PROCESS_STAGES.find((s) => s.key === normStatus) || PROCESS_STAGES[0];
                  const isCompany = req.clientType === 'empresa';
                  const displayName = req.client?.name || req.input?.clientName || 'Cliente';
                  const company = req.client?.companyName || req.input?.companyName;

                  return (
                    <tr
                      key={req.id}
                      onClick={() => setSelectedRequest(req)}
                      className="hover:bg-blue-50/40 transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        {req.code}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">
                          {isCompany && company ? company : displayName}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {req.client?.city} • {req.client?.phone}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900">
                          {req.input?.specificSpaceSubtype || req.input?.specificArea}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {req.input?.estimatedM2} m² • {req.input?.surfaceType}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs truncate">
                        <span className="text-slate-800 block truncate">
                          {req.aiAnalysis?.primaryProblem}
                        </span>
                        <span className="text-[10px] text-amber-800 font-mono block truncate">
                          {req.recommendation?.recommendedSystem}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-emerald-700 font-bold">
                        {req.aiAnalysis?.overallConfidence}%
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border font-mono ${stageObj.badgeBg}`}>
                          {stageObj.stepNumber}. {stageObj.shortLabel}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        ${(req.quotedAmount || req.recommendation?.estimatedCostRange?.min || 0).toLocaleString('es-CO')}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRequest(req);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 font-bold hover:bg-blue-600 hover:text-white transition-all text-xs cursor-pointer"
                        >
                          Ver Peritaje
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal for Detailed Peritaje, Photo Evidence HUD & Status Management */}
      {selectedRequest && (
        <RequestDetailModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onUpdateStatus={(id, newStatus, technicianNotes, quotedAmount) => {
            onUpdateStatus(id, newStatus, technicianNotes, quotedAmount);
            // update local selected request copy
            setSelectedRequest((prev) => prev ? {
              ...prev,
              status: newStatus,
              technicianNotes: technicianNotes !== undefined ? technicianNotes : prev.technicianNotes,
              quotedAmount: quotedAmount !== undefined ? quotedAmount : prev.quotedAmount
            } : null);
          }}
        />
      )}

    </div>
  );
};
