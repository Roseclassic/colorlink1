import React, { useState } from 'react';
import {
  Sparkles,
  LayoutDashboard,
  Wand2,
  Palette,
  Clock,
  User,
  ChevronDown,
  Menu,
  X,
  Home,
  ShieldCheck,
  Building2,
  Layers,
  ArrowRightLeft,
  CheckCircle2,
  Users
} from 'lucide-react';
import { ClientUser, SampleImageOption } from '../types';

export type PortalType = 'cliente' | 'empresa';
export type ClientSubView = 'welcome' | 'wizard' | 'requests';
export type DashboardSubView = 'pipeline' | 'clients' | 'metrics' | 'alerts';

interface HeaderProps {
  activePortal: PortalType;
  onSelectPortal: (portal: PortalType) => void;
  clientView: ClientSubView;
  onClientViewChange: (view: ClientSubView) => void;
  dashboardTab: DashboardSubView;
  onDashboardTabChange: (tab: DashboardSubView) => void;
  onResetWizard: () => void;
  onLoadPreset: (sample: SampleImageOption) => void;
  onOpenProfile: () => void;
  currentUser: ClientUser | null;
  samples: SampleImageOption[];
  totalRequestsCount: number;
  newRequestsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activePortal,
  onSelectPortal,
  clientView,
  onClientViewChange,
  dashboardTab,
  onDashboardTabChange,
  onResetWizard,
  onLoadPreset,
  onOpenProfile,
  currentUser,
  samples,
  totalRequestsCount,
  newRequestsCount
}) => {
  const [showPresetsMenu, setShowPresetsMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-50 transition-colors border-b ${
        activePortal === 'cliente'
          ? 'bg-white/95 backdrop-blur-md border-slate-100 shadow-xs'
          : 'bg-slate-900 border-slate-800 shadow-md text-white'
      }`}
    >
      {/* Top Environment Switcher Bar */}
      <div className={`px-4 sm:px-6 lg:px-8 py-1.5 border-b text-xs flex items-center justify-between transition-colors ${
        activePortal === 'cliente'
          ? 'bg-amber-50/70 border-amber-200/60 text-slate-700'
          : 'bg-slate-950 border-slate-800 text-slate-300'
      }`}>
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
            Pintuco ColorLink Hub:
          </span>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            {activePortal === 'cliente'
              ? 'Ambiente Cliente • Diseña, cotiza y sigue tu transformación'
              : 'Ambiente Empresa • Consola de gestión, peritaje IA y despacho'}
          </span>
        </div>

        {/* Master Portal Switcher Pills */}
        <div className="flex items-center space-x-1 p-0.5 rounded-xl bg-slate-200/80 dark:bg-slate-800 border border-slate-300/60 dark:border-slate-700">
          <button
            id="portal-switch-cliente"
            onClick={() => onSelectPortal('cliente')}
            className={`px-2.5 sm:px-3 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
              activePortal === 'cliente'
                ? 'bg-white text-slate-900 shadow-xs ring-1 ring-amber-400/50'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <User className="w-3 h-3 text-amber-600" />
            <span>Portal Cliente (Mi Espacio)</span>
          </button>

          <button
            id="portal-switch-empresa"
            onClick={() => onSelectPortal('empresa')}
            className={`px-2.5 sm:px-3 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
              activePortal === 'empresa'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Building2 className="w-3 h-3 text-amber-400" />
            <span>Portal Empresa (Gestión ColorLink)</span>
            {newRequestsCount > 0 && (
              <span className="px-1 py-0.2 rounded-full text-[9px] bg-amber-400 text-slate-950 font-extrabold font-mono">
                {newRequestsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Logo & Brand Identity */}
          <div
            className="flex items-center space-x-3 cursor-pointer group shrink-0 select-none"
            onClick={() => {
              if (activePortal === 'cliente') {
                onClientViewChange('welcome');
              } else {
                onDashboardTabChange('pipeline');
              }
            }}
          >
            {/* Pintuco Color Emblem Badge */}
            <div className={`relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl shadow-md transition-transform group-hover:scale-105 ${
              activePortal === 'cliente'
                ? 'bg-gradient-to-br from-amber-400 to-yellow-400 ring-2 ring-amber-200 shadow-amber-500/20'
                : 'bg-slate-800 ring-2 ring-blue-500/40 shadow-blue-500/10'
            }`}>
              <Palette className={`w-5 h-5 transform -rotate-6 ${
                activePortal === 'cliente' ? 'text-slate-900' : 'text-amber-400'
              }`} />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-amber-300 rounded-full" />
              </div>
            </div>

            <div className="space-y-0.5 text-left">
              <div className="flex items-center space-x-2">
                <span className={`text-xl sm:text-2xl font-extrabold tracking-tight font-display ${
                  activePortal === 'cliente' ? 'text-slate-900' : 'text-white'
                }`}>
                  Color<span className="text-amber-500">Link</span>
                </span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider ${
                  activePortal === 'cliente'
                    ? 'bg-amber-50 text-amber-900 border border-amber-200'
                    : 'bg-blue-900/60 text-blue-300 border border-blue-700'
                }`}>
                  {activePortal === 'cliente' ? 'Mi Espacio' : 'Gestión Empresa'}
                </span>
              </div>
              <p className={`text-[11px] font-medium hidden xs:block ${
                activePortal === 'cliente' ? 'text-slate-500' : 'text-slate-400'
              }`}>
                {activePortal === 'cliente'
                  ? 'Asesoría de Espacios & Pintura • Pintuco Colombia'
                  : 'Consola Operativa & Peritaje Técnico Pintuco'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation based on active Portal */}
          {activePortal === 'cliente' ? (
            /* CLIENT PORTAL NAVIGATION */
            <div className="flex items-center space-x-2 sm:space-x-3">
              
              {/* Presets Inspiration dropdown */}
              <div className="relative hidden md:block">
                <button
                  id="btn-quick-presets"
                  onClick={() => setShowPresetsMenu(!showPresetsMenu)}
                  className="flex items-center space-x-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-slate-50 text-slate-700 border border-slate-200 hover:border-amber-300 hover:text-slate-900 hover:bg-amber-50/40 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Espacios Demo</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${showPresetsMenu ? 'rotate-180' : ''}`} />
                </button>

                {showPresetsMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowPresetsMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-80 p-3 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 space-y-2 animate-fadeIn text-left">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 font-mono">
                          Espacios de Inspiración:
                        </span>
                        <span className="text-[10px] text-slate-400">Colombia</span>
                      </div>

                      <div className="space-y-1 max-h-72 overflow-y-auto">
                        {samples.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => {
                              onLoadPreset(s);
                              setShowPresetsMenu(false);
                              onClientViewChange('wizard');
                            }}
                            className="w-full text-left p-2.5 rounded-xl text-xs hover:bg-amber-50/60 text-slate-700 hover:text-slate-900 transition-all flex items-center justify-between group cursor-pointer"
                          >
                            <div className="space-y-0.5 truncate pr-2">
                              <span className="font-semibold block truncate text-slate-900 group-hover:text-amber-800">
                                {s.title}
                              </span>
                              <span className="text-[10px] text-slate-500 truncate block">
                                {s.defaultDescription}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 group-hover:bg-amber-100 group-hover:text-amber-800 shrink-0 font-medium">
                              {s.areaM2} m²
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Client Portal Navigation Tabs */}
              <div className="hidden sm:flex p-1 bg-slate-100 rounded-2xl border border-slate-200/80">
                <button
                  id="client-nav-welcome"
                  onClick={() => onClientViewChange('welcome')}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    clientView === 'welcome'
                      ? 'bg-white text-slate-900 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Home className="w-3.5 h-3.5 text-amber-600" />
                  <span>Inicio</span>
                </button>

                <button
                  id="client-nav-wizard"
                  onClick={() => onClientViewChange('wizard')}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    clientView === 'wizard'
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Crear Solicitud</span>
                </button>

                <button
                  id="client-nav-requests"
                  onClick={() => onClientViewChange('requests')}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    clientView === 'requests'
                      ? 'bg-white text-blue-700 font-bold shadow-xs border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>Mis Solicitudes</span>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-200/80 text-slate-700">
                    {totalRequestsCount}
                  </span>
                </button>
              </div>

              {/* User Profile / Login */}
              <button
                id="btn-user-profile"
                onClick={onOpenProfile}
                className="flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-amber-200 text-amber-900 font-bold flex items-center justify-center text-[10px]">
                  {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="hidden lg:inline">{currentUser?.name ? currentUser.name.split(' ')[0] : 'Mi Perfil'}</span>
              </button>

              {/* Mobile Drawer Trigger */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 sm:hidden flex items-center justify-center cursor-pointer"
              >
                {showMobileMenu ? <X className="w-5 h-5 text-amber-700" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          ) : (
            /* COMPANY / INTERNAL OPERATIONS NAVIGATION */
            <div className="flex items-center space-x-2 sm:space-x-3">
              
              {/* Internal Dashboard Tabs */}
              <div className="hidden sm:flex p-1 bg-slate-800 rounded-2xl border border-slate-700">
                <button
                  id="empresa-nav-pipeline"
                  onClick={() => onDashboardTabChange('pipeline')}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    dashboardTab === 'pipeline'
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Pipeline 7 Estados</span>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-900 text-amber-400 font-mono font-bold">
                    {totalRequestsCount}
                  </span>
                </button>

                <button
                  id="empresa-nav-clients"
                  onClick={() => onDashboardTabChange('clients')}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    dashboardTab === 'clients'
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Clientes</span>
                </button>

                <button
                  id="empresa-nav-metrics"
                  onClick={() => onDashboardTabChange('metrics')}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    dashboardTab === 'metrics'
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Métricas & IA</span>
                </button>
              </div>

              {/* Shortcut to switch back to Client */}
              <button
                onClick={() => onSelectPortal('cliente')}
                className="hidden md:flex items-center space-x-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-slate-800 text-amber-400 border border-slate-700 hover:bg-slate-700 transition-all cursor-pointer"
                title="Ver interfaz como cliente"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>Vista Cliente</span>
              </button>

              {/* Mobile Drawer Trigger */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 hover:text-white sm:hidden flex items-center justify-center cursor-pointer"
              >
                {showMobileMenu ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          )}

        </div>

        {/* Mobile Dropdown Menu */}
        {showMobileMenu && (
          <div className={`sm:hidden py-3 px-1 border-t space-y-2 animate-fadeIn ${
            activePortal === 'cliente' ? 'bg-white border-slate-100' : 'bg-slate-900 border-slate-800 text-white'
          }`}>
            {activePortal === 'cliente' ? (
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    onClientViewChange('welcome');
                    setShowMobileMenu(false);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1 ${
                    clientView === 'welcome'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-50 text-slate-700 border border-slate-200'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>Inicio</span>
                </button>

                <button
                  onClick={() => {
                    onClientViewChange('wizard');
                    setShowMobileMenu(false);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1 ${
                    clientView === 'wizard'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-50 text-slate-700 border border-slate-200'
                  }`}
                >
                  <Wand2 className="w-4 h-4" />
                  <span>Asistente</span>
                </button>

                <button
                  onClick={() => {
                    onClientViewChange('requests');
                    setShowMobileMenu(false);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1 ${
                    clientView === 'requests'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-50 text-slate-700 border border-slate-200'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>Solicitudes ({totalRequestsCount})</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    onDashboardTabChange('pipeline');
                    setShowMobileMenu(false);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1 ${
                    dashboardTab === 'pipeline'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Pipeline</span>
                </button>

                <button
                  onClick={() => {
                    onDashboardTabChange('clients');
                    setShowMobileMenu(false);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1 ${
                    dashboardTab === 'clients'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Clientes</span>
                </button>

                <button
                  onClick={() => {
                    onDashboardTabChange('metrics');
                    setShowMobileMenu(false);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1 ${
                    dashboardTab === 'metrics'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Métricas</span>
                </button>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  onSelectPortal(activePortal === 'cliente' ? 'empresa' : 'cliente');
                  setShowMobileMenu(false);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>Cambiar a {activePortal === 'cliente' ? 'Portal Empresa' : 'Portal Cliente'}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
