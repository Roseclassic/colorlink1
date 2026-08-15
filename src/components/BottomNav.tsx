import React from 'react';
import {
  Home,
  Wand2,
  Clock,
  LayoutDashboard,
  User,
  Building2,
  Layers,
  ShieldCheck,
  ArrowRightLeft
} from 'lucide-react';
import { PortalType, ClientSubView, DashboardSubView } from './Header';

interface BottomNavProps {
  activePortal: PortalType;
  onSelectPortal: (portal: PortalType) => void;
  clientView: ClientSubView;
  onClientViewChange: (view: ClientSubView) => void;
  dashboardTab: DashboardSubView;
  onDashboardTabChange: (tab: DashboardSubView) => void;
  onOpenProfile: () => void;
  totalRequestsCount: number;
  newRequestsCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activePortal,
  onSelectPortal,
  clientView,
  onClientViewChange,
  dashboardTab,
  onDashboardTabChange,
  onOpenProfile,
  totalRequestsCount,
  newRequestsCount
}) => {
  return (
    <nav
      id="mobile-bottom-nav"
      aria-label="Navegación Móvil Principal"
      className={`fixed bottom-0 left-0 right-0 z-40 py-1.5 px-3 flex sm:hidden items-center justify-around shadow-xl select-none border-t transition-colors ${
        activePortal === 'cliente'
          ? 'bg-white/95 backdrop-blur-md border-slate-200 text-slate-800'
          : 'bg-slate-900 border-slate-800 text-white'
      }`}
    >
      {activePortal === 'cliente' ? (
        <>
          {/* 1. Inicio */}
          <button
            onClick={() => onClientViewChange('welcome')}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
              clientView === 'welcome' ? 'text-amber-800 font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <div className={`p-1.5 rounded-xl ${clientView === 'welcome' ? 'bg-amber-100 text-amber-900' : 'text-slate-400'}`}>
              <Home className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-0.5 font-medium">Inicio</span>
          </button>

          {/* 2. Asistente */}
          <button
            onClick={() => onClientViewChange('wizard')}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
              clientView === 'wizard' ? 'text-amber-800 font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <div className={`p-1.5 rounded-xl ${clientView === 'wizard' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-400'}`}>
              <Wand2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-0.5 font-medium">Asistente</span>
          </button>

          {/* 3. Solicitudes */}
          <button
            onClick={() => onClientViewChange('requests')}
            className={`relative flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
              clientView === 'requests' ? 'text-blue-700 font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <div className={`p-1.5 rounded-xl relative ${clientView === 'requests' ? 'bg-blue-100 text-blue-800' : 'text-slate-400'}`}>
              <Clock className="w-5 h-5" />
              {totalRequestsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white font-bold text-[9px] rounded-full flex items-center justify-center shadow-xs">
                  {totalRequestsCount}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 font-medium">Mis Solicitudes</span>
          </button>

          {/* 4. Switch to Empresa */}
          <button
            onClick={() => onSelectPortal('empresa')}
            className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-slate-500 hover:text-slate-900 cursor-pointer"
          >
            <div className="p-1.5 rounded-xl bg-slate-100 text-slate-700">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-0.5 font-medium">Empresa</span>
          </button>
        </>
      ) : (
        <>
          {/* Empresa Tab 1: Pipeline */}
          <button
            onClick={() => onDashboardTabChange('pipeline')}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
              dashboardTab === 'pipeline' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <div className={`p-1.5 rounded-xl ${dashboardTab === 'pipeline' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400'}`}>
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-0.5 font-medium">Pipeline</span>
          </button>

          {/* Empresa Tab 2: Clientes */}
          <button
            onClick={() => onDashboardTabChange('clients')}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
              dashboardTab === 'clients' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <div className={`p-1.5 rounded-xl ${dashboardTab === 'clients' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-0.5 font-medium">Clientes</span>
          </button>

          {/* Empresa Tab 3: Métricas */}
          <button
            onClick={() => onDashboardTabChange('metrics')}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
              dashboardTab === 'metrics' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <div className={`p-1.5 rounded-xl ${dashboardTab === 'metrics' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-0.5 font-medium">Métricas</span>
          </button>

          {/* Switch to Cliente */}
          <button
            onClick={() => onSelectPortal('cliente')}
            className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-slate-400 hover:text-white cursor-pointer"
          >
            <div className="p-1.5 rounded-xl bg-slate-800 text-amber-400">
              <User className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-0.5 font-medium">Cliente</span>
          </button>
        </>
      )}
    </nav>
  );
};
