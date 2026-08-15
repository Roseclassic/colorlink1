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
  List
} from 'lucide-react';
import { ProjectRequest, RequestStatus } from '../../types';
import { RequestDetailModal } from './RequestDetailModal';

interface InternalDashboardProps {
  requests: ProjectRequest[];
  onUpdateStatus: (id: string, newStatus: RequestStatus, technicianNotes?: string, quotedAmount?: number) => void;
  onCreateNewClientFlow: () => void;
}

export const InternalDashboard: React.FC<InternalDashboardProps> = ({
  requests,
  onUpdateStatus,
  onCreateNewClientFlow
}) => {
  const [selectedRequest, setSelectedRequest] = useState<ProjectRequest | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');

  const filteredRequests = requests.filter((req) => {
    const clientName = req.client?.name || req.input?.clientName || '';
    const city = req.client?.city || req.input?.clientCity || '';
    const specificArea = req.input?.specificArea || req.input?.specificSpaceSubtype || '';

    const matchSearch =
      clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      specificArea.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.toLowerCase().includes(searchTerm.toLowerCase());

    const spaceType = req.input?.transformationTarget || req.input?.spaceType || '';
    const matchCat = selectedCategory === 'todos' || spaceType.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchSearch && matchCat;
  });

  const columns: {
    status: RequestStatus;
    title: string;
    icon: React.ReactNode;
    badgeBg: string;
    accentColor: string;
    description: string;
  }[] = [
    {
      status: 'recibida',
      title: '1. Recibida',
      icon: <Inbox className="w-4 h-4 text-emerald-600" />,
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      accentColor: 'border-t-emerald-500',
      description: 'Solicitud entrante registrada'
    },
    {
      status: 'analizando',
      title: '2. Analizando',
      icon: <Cpu className="w-4 h-4 text-amber-600" />,
      badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
      accentColor: 'border-t-amber-500',
      description: 'IA procesando patología e imágenes'
    },
    {
      status: 'revision_tecnica',
      title: '3. Revisión Técnica',
      icon: <ShieldCheck className="w-4 h-4 text-blue-600" />,
      badgeBg: 'bg-blue-50 text-blue-800 border-blue-200',
      accentColor: 'border-t-blue-500',
      description: 'Perito Pintuco validando cálculo'
    },
    {
      status: 'recomendacion_lista',
      title: '4. Recomendación Lista',
      icon: <CheckCircle2 className="w-4 h-4 text-amber-600" />,
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
      accentColor: 'border-t-amber-400',
      description: 'Fórmula y presupuesto finalizados'
    }
  ];

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'recibida':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">🟢 Recibida</span>;
      case 'analizando':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">🟡 Analizando</span>;
      case 'revision_tecnica':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">🔵 Revisión técnica</span>;
      case 'recomendacion_lista':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-900 border border-amber-300">🟡 Recomendación lista</span>;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto animate-fadeIn text-slate-800">
      
      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm text-left space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-semibold uppercase font-mono">Expedientes Activos</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900">
            {requests.length}
          </div>
          <p className="text-[11px] text-emerald-700 flex items-center gap-1 font-mono">
            <TrendingUp className="w-3 h-3" /> +100% digitalizadas
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm text-left space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-semibold uppercase font-mono">Precisión Diagnóstica</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-700">
            98.6%
          </div>
          <p className="text-[11px] text-slate-500 font-mono">
            Validado por peritos Pintuco
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm text-left space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-semibold uppercase font-mono">Tiempo Prescripción</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-700">
            1.4 seg
          </div>
          <p className="text-[11px] text-slate-500 font-mono">
            vs 48 hrs tradicional
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm text-left space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-semibold uppercase font-mono">Ahorro Desplazamientos</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-800">
            78%
          </div>
          <p className="text-[11px] text-slate-500 font-mono">
            Filtro de visión previo
          </p>
        </div>

      </div>

      {/* Action and Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
        
        {/* Search & Category filter */}
        <div className="flex flex-1 items-center space-x-2.5">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por cliente, código o ciudad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full min-h-[40px] pl-10 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:bg-white transition-all"
            />
          </div>

          <div className="hidden sm:flex items-center space-x-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs">
            {['todos', 'hogar', 'empresa', 'proyecto'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-colors font-medium cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* View mode toggle & Create action */}
        <div className="flex items-center space-x-2">
          <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-2 rounded-lg cursor-pointer ${viewMode === 'kanban' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-500'}`}
              title="Vista Tablero Kanban"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg cursor-pointer ${viewMode === 'table' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-500'}`}
              title="Vista Lista Tabular"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onCreateNewClientFlow}
            className="min-h-[40px] inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Simular Solicitud Cliente</span>
          </button>
        </div>

      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((col) => {
            const columnRequests = filteredRequests.filter((r) => r.status === col.status);

            return (
              <div
                key={col.status}
                className={`flex flex-col rounded-3xl bg-slate-50/70 border border-slate-200 overflow-hidden border-t-4 ${col.accentColor} min-h-[460px]`}
              >
                {/* Column Header */}
                <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {col.icon}
                    <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
                      {col.title}
                    </h3>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${col.badgeBg}`}>
                    {columnRequests.length}
                  </span>
                </div>

                {/* Column Card List */}
                <div className="p-3 space-y-3 flex-1 overflow-y-auto max-h-[620px]">
                  {columnRequests.length === 0 ? (
                    <div className="h-32 flex flex-col items-center justify-center text-center p-4 border border-dashed border-slate-200 rounded-2xl bg-white">
                      <p className="text-xs text-slate-400">Sin solicitudes en esta etapa</p>
                    </div>
                  ) : (
                    columnRequests.map((req) => (
                      <div
                        key={req.id}
                        onClick={() => setSelectedRequest(req)}
                        className="group relative p-4 rounded-2xl bg-white hover:shadow-md border border-slate-200 hover:border-amber-300 transition-all cursor-pointer text-left space-y-3 active:scale-[0.98]"
                      >
                        {/* Thumbnail & Code */}
                        <div className="flex items-start justify-between">
                          <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            {req.code}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {req.createdAt}
                          </span>
                        </div>

                        {/* Title & Client */}
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-800 transition-colors font-display line-clamp-1">
                            {req.input?.specificSpaceSubtype || req.input?.specificArea || 'Espacio'} ({req.input?.estimatedM2 || 25} m²)
                          </h4>
                          <p className="text-xs text-slate-500 truncate mt-0.5">
                            {req.client?.name || req.input?.clientName || 'Cliente'} • {req.client?.city || req.input?.clientCity || 'Colombia'}
                          </p>
                        </div>

                        {/* Small Image Preview */}
                        <div className="relative h-20 rounded-xl overflow-hidden border border-slate-200">
                          <img
                            src={req.input?.imageUrl || 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'}
                            alt="Muestra"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent flex items-end p-1.5">
                            <span className="text-[9px] font-mono text-amber-200 bg-slate-900/80 px-1.5 py-0.5 rounded">
                              IA: {req.aiAnalysis?.detectedSurface?.split(' ')[0] || 'Mampostería'} ({req.aiAnalysis?.overallConfidence || 95}%)
                            </span>
                          </div>
                        </div>

                        {/* Recommendation brief */}
                        <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-200 leading-tight">
                          <strong className="text-amber-800">Sistema:</strong> {req.recommendation?.recommendedSystem?.split(' ')[1] || 'Viniltex Pro'}
                        </div>

                        {/* Card Footer */}
                        <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                          <span className="font-mono text-emerald-700 font-bold">
                            {req.quotedAmount ? `$${req.quotedAmount.toLocaleString()} COP` : `$${req.recommendation?.estimatedCostRange?.min?.toLocaleString() || '180.000'} COP`}
                          </span>
                          <span className="text-[10px] text-amber-800 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-bold">
                            Revisar <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>

                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden text-left shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 uppercase font-mono text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Código</th>
                  <th className="py-3.5 px-4 font-semibold">Cliente</th>
                  <th className="py-3.5 px-4 font-semibold">Espacio & Sustrato</th>
                  <th className="py-3.5 px-4 font-semibold">Diagnóstico IA</th>
                  <th className="py-3.5 px-4 font-semibold">Estado</th>
                  <th className="py-3.5 px-4 font-semibold">Presupuesto</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRequests.map((req) => (
                  <tr
                    key={req.id}
                    onClick={() => setSelectedRequest(req)}
                    className="hover:bg-amber-50/40 cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-800">
                      {req.code}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{req.client?.name || req.input?.clientName}</div>
                      <div className="text-[10px] text-slate-400">{req.client?.city || req.input?.clientCity}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-slate-800">{req.input?.specificSpaceSubtype || req.input?.specificArea}</div>
                      <div className="text-[10px] text-slate-400">{req.input?.estimatedM2} m² • {req.input?.transformationTarget}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-amber-800 font-medium">{req.aiAnalysis?.primaryProblem?.split(' ')[0]}...</div>
                      <div className="text-[10px] text-emerald-700 font-mono">Confianza {req.aiAnalysis?.overallConfidence}%</div>
                    </td>
                    <td className="py-3.5 px-4">
                      {getStatusBadge(req.status)}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">
                      {req.quotedAmount ? `$${req.quotedAmount.toLocaleString()} COP` : `$${req.recommendation?.estimatedCostRange?.min?.toLocaleString()} COP`}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs transition-colors font-medium">
                        Ver Ficha
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Inspection Modal */}
      {selectedRequest && (
        <RequestDetailModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onUpdateStatus={onUpdateStatus}
        />
      )}

    </div>
  );
};
