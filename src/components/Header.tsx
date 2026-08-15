import React from 'react';
import { Sparkles, LayoutDashboard, Wand2, ShieldCheck, Palette, Layers, RefreshCw, Clock } from 'lucide-react';
import { SampleImageOption } from '../types';

interface HeaderProps {
  currentView: 'client' | 'requests' | 'dashboard';
  onViewChange: (view: 'client' | 'requests' | 'dashboard') => void;
  onResetWizard: () => void;
  onLoadPreset: (sample: SampleImageOption) => void;
  samples: SampleImageOption[];
  totalRequestsCount: number;
  newRequestsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  onResetWizard,
  onLoadPreset,
  samples,
  totalRequestsCount,
  newRequestsCount
}) => {
  return (
    <header id="main-header" className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onViewChange('client')}>
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 shadow-lg shadow-cyan-500/25 ring-1 ring-white/20 transition-transform group-hover:scale-105">
              <Palette className="w-5 h-5 text-white transform -rotate-6" />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-950 flex items-center justify-center shadow-sm">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
              </div>
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
                  Color<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Link</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                  AI VISION v4.2
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-normal hidden sm:block">
                Asistente Inteligente de Recubrimientos & Pintura
              </p>
            </div>
          </div>

          {/* Quick Preset Selector & View Switcher */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Quick Demo Presets dropdown */}
            <div className="relative group hidden lg:block">
              <button
                id="btn-quick-presets"
                className="flex items-center space-x-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors cursor-pointer"
                title="Cargar casos reales para probar la IA"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Casos Demo IA</span>
              </button>
              
              <div className="absolute right-0 mt-1 w-72 p-2 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-xl shadow-2xl hidden group-hover:block transition-all z-50">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-2 py-1">
                  Probar diagnóstico instantáneo:
                </p>
                <div className="space-y-1 mt-1">
                  {samples.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        onLoadPreset(s);
                        onViewChange('client');
                      }}
                      className="w-full text-left px-2.5 py-2 rounded-lg text-xs hover:bg-slate-800 text-slate-300 hover:text-cyan-300 transition-colors flex items-center justify-between group/item cursor-pointer"
                    >
                      <span className="truncate pr-2 font-medium">{s.title}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 group-hover/item:bg-cyan-500/20 group-hover/item:text-cyan-300 shrink-0">
                        {s.category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Tabs between Client Assistant, Mis Solicitudes, & Internal Dashboard */}
            <div className="flex p-1 bg-slate-900/90 rounded-xl border border-slate-800/90 shadow-inner">
              <button
                id="nav-tab-client"
                onClick={() => onViewChange('client')}
                className={`flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  currentView === 'client'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Wand2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Asistente</span>
                <span className="xs:hidden">IA</span>
              </button>

              <button
                id="nav-tab-requests"
                onClick={() => onViewChange('requests')}
                className={`flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  currentView === 'requests'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Mis Solicitudes</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-slate-800 text-purple-300">
                  {totalRequestsCount}
                </span>
              </button>

              <button
                id="nav-tab-dashboard"
                onClick={() => onViewChange('dashboard')}
                className={`relative flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  currentView === 'dashboard'
                    ? 'bg-slate-800 text-white shadow-md border border-slate-700'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Gestión Interna</span>
                <span className="sm:hidden">CRM</span>
                {newRequestsCount > 0 && (
                  <span className="flex items-center justify-center px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-cyan-500 text-slate-950">
                    {newRequestsCount}
                  </span>
                )}
              </button>
            </div>

            {/* Reset / New request button */}
            {currentView === 'client' && (
              <button
                id="btn-restart-assistant"
                onClick={onResetWizard}
                className="hidden sm:flex items-center space-x-1.5 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-900/70 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Comenzar nueva consulta desde cero"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Nueva consulta</span>
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
