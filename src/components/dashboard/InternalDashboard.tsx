import React, { useState } from 'react';
import {
  Inbox,
  Cpu,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Layers,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Plus,
  LayoutGrid,
  List,
  AlertCircle,
  Eye
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
    const matchSearch =
      req.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.input.specificArea.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.client.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchCat = selectedCategory === 'todos' || req.input.spaceType === selectedCategory;

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
      icon: <Inbox className="w-4 h-4 text-emerald-400" />,
      badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      accentColor: 'border-t-emerald-500',
      description: 'Solicitud entrante registrada con éxito'
    },
    {
      status: 'analizando',
      title: '2. Analizando',
      icon: <Cpu className="w-4 h-4 text-amber-400" />,
      badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      accentColor: 'border-t-amber-500',
      description: 'Motor neural procesando patología e imágenes'
    },
    {
      status: 'revision_tecnica',
      title: '3. Revisión Técnica',
      icon: <ShieldCheck className="w-4 h-4 text-blue-400" />,
      badgeBg: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
      accentColor: 'border-t-blue-500',
      description: 'Perito especialista validando cálculo y sustrato'
    },
    {
      status: 'recomendacion_lista',
      title: '4. Recomendación Lista',
      icon: <CheckCircle2 className="w-4 h-4 text-purple-400" />,
      badgeBg: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
      accentColor: 'border-t-purple-500',
      description: 'Fórmula, rendimiento y presupuesto finalizados'
    }
  ];

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'recibida':
        return <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">🟢 Recibida</span>;
      case 'analizando':
        return <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">🟡 Analizando</span>;
      case 'revision_tecnica':
        return <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20">🔵 Revisión técnica</span>;
      case 'recomendacion_lista':
        return <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20">🟣 Recomendación lista</span>;
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-fadeIn">
      
      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-left space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Total Solicitudes</span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
            {requests.length}
          </div>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
            <TrendingUp className="w-3 h-3" /> +100% digitalizadas
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-left space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Precisión IA</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
            98.6%
          </div>
          <p className="text-[11px] text-slate-400 font-mono">
            Validado por peritos
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-left space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Tiempo Diagnóstico</span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400">
            1.4 seg
          </div>
          <p className="text-[11px] text-slate-400 font-mono">
            vs 48 hrs tradicional
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-left space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Ahorro en Desplazamientos</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-300">
            78%
          </div>
          <p className="text-[11px] text-slate-400 font-mono">
            Filtro de visión previo
          </p>
        </div>

      </div>

      {/* Action and Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        
        {/* Search & Category filter */}
        <div className="flex flex-1 items-center space-x-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por cliente, código o ciudad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="hidden sm:flex items-center space-x-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
            {['todos', 'hogar', 'oficina', 'industria', 'comercio'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg capitalize transition-colors ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* View mode toggle & Create action */}
        <div className="flex items-center space-x-2">
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg ${viewMode === 'kanban' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400'}`}
              title="Vista Tablero Kanban"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg ${viewMode === 'table' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400'}`}
              title="Vista Lista Tabular"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onCreateNewClientFlow}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Simular Solicitud Cliente</span>
          </button>
        </div>

      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {columns.map((col) => {
            const columnRequests = filteredRequests.filter((r) => r.status === col.status);

            return (
              <div
                key={col.status}
                className={`flex flex-col rounded-2xl bg-slate-900/50 border border-slate-800/90 overflow-hidden border-t-4 ${col.accentColor} min-h-[500px]`}
              >
                {/* Column Header */}
                <div className="p-4 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {col.icon}
                    <h3 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                      {col.title}
                    </h3>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-mono font-bold border ${col.badgeBg}`}>
                    {columnRequests.length}
                  </span>
                </div>

                {/* Column Card List */}
                <div className="p-3 space-y-3 flex-1 overflow-y-auto max-h-[620px]">
                  {columnRequests.length === 0 ? (
                    <div className="h-32 flex flex-col items-center justify-center text-center p-4 border border-dashed border-slate-800 rounded-xl">
                      <p className="text-xs text-slate-500">Sin solicitudes en esta etapa</p>
                    </div>
                  ) : (
                    columnRequests.map((req) => (
                      <div
                        key={req.id}
                        onClick={() => setSelectedRequest(req)}
                        className="group relative p-4 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800/90 hover:border-cyan-500/50 transition-all cursor-pointer shadow-sm text-left space-y-3"
                      >
                        {/* Thumbnail & Code */}
                        <div className="flex items-start justify-between">
                          <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">
                            {req.code}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            {req.createdAt}
                          </span>
                        </div>

                        {/* Title & Client */}
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors font-display line-clamp-1">
                            {req.input.specificArea} ({req.input.estimatedM2} m²)
                          </h4>
                          <p className="text-xs text-slate-400 truncate mt-0.5">
                            {req.client.name} • {req.client.city}
                          </p>
                        </div>

                        {/* Small Image Preview with AI detection tag */}
                        <div className="relative h-20 rounded-lg overflow-hidden border border-slate-800">
                          <img
                            src={req.input.imageUrl}
                            alt="Muestra"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-1.5">
                            <span className="text-[9px] font-mono text-cyan-300 bg-slate-950/90 px-1.5 py-0.5 rounded">
                              IA: {req.aiAnalysis.detectedSurface.split(' ')[0]} ({req.aiAnalysis.overallConfidence}%)
                            </span>
                          </div>
                        </div>

                        {/* Recommendation brief */}
                        <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded-lg border border-slate-800/60 leading-tight">
                          <strong className="text-slate-300">Sistema:</strong> {req.recommendation.recommendedSystem.split(' ')[1] || 'ColorLink Pro'}
                        </div>

                        {/* Card Footer */}
                        <div className="flex items-center justify-between pt-1 border-t border-slate-900 text-xs">
                          <span className="font-mono text-emerald-400 font-bold">
                            {req.quotedAmount ? `${req.quotedAmount}€` : `${req.recommendation.estimatedCostRange.min}€ est.`}
                          </span>
                          <span className="text-[10px] text-cyan-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
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
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden text-left">
          <table className="w-full text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
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
            <tbody className="divide-y divide-slate-800/80">
              {filteredRequests.map((req) => (
                <tr
                  key={req.id}
                  onClick={() => setSelectedRequest(req)}
                  className="hover:bg-slate-800/50 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">
                    {req.code}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{req.client.name}</div>
                    <div className="text-[10px] text-slate-500">{req.client.city}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-slate-200">{req.input.specificArea}</div>
                    <div className="text-[10px] text-slate-500">{req.input.estimatedM2} m² • {req.input.spaceType}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-rose-300 font-medium">{req.aiAnalysis.primaryProblem.split(' ')[0]}...</div>
                    <div className="text-[10px] text-emerald-400 font-mono">Confianza {req.aiAnalysis.overallConfidence}%</div>
                  </td>
                  <td className="py-3.5 px-4">
                    {getStatusBadge(req.status)}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                    {req.quotedAmount ? `${req.quotedAmount}€` : `${req.recommendation.estimatedCostRange.min}€`}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors">
                      Ver Ficha
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
