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
  ShieldCheck
} from 'lucide-react';
import { SampleImageOption } from '../types';

interface HeaderProps {
  currentView: 'welcome' | 'client' | 'requests' | 'dashboard';
  onViewChange: (view: 'welcome' | 'client' | 'requests' | 'dashboard') => void;
  onResetWizard: () => void;
  onLoadPreset: (sample: SampleImageOption) => void;
  onOpenProfile: () => void;
  samples: SampleImageOption[];
  totalRequestsCount: number;
  newRequestsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  onResetWizard,
  onLoadPreset,
  onOpenProfile,
  samples,
  totalRequestsCount,
  newRequestsCount
}) => {
  const [showPresetsMenu, setShowPresetsMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header
      id="main-header"
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all shadow-sm"
    >
      {/* Top Accent Ribbon with Pintuco Warm Tones */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-amber-500 to-blue-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Logo & Brand: ColorLink by Pintuco */}
          <div
            className="flex items-center space-x-3 cursor-pointer group shrink-0 select-none"
            onClick={() => onViewChange('welcome')}
          >
            {/* Pintuco Color Emblem Badge */}
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-400 shadow-md shadow-amber-500/20 ring-2 ring-amber-200 transition-transform group-hover:scale-105">
              <Palette className="w-5 h-5 text-slate-900 transform -rotate-6" />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-amber-300 rounded-full" />
              </div>
            </div>

            <div className="space-y-0.5 text-left">
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 font-display">
                  Color<span className="text-amber-600">Link</span>
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 uppercase tracking-wider font-mono">
                  Pintuco
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden xs:block">
                Tu asesor de espacios • Colombia
              </p>
            </div>
          </div>

          {/* Desktop Navigation & Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Inspiration & Demo Presets Dropdown */}
            <div className="relative hidden md:block">
              <button
                id="btn-quick-presets"
                onClick={() => setShowPresetsMenu(!showPresetsMenu)}
                className="flex items-center space-x-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-slate-50 text-slate-700 border border-slate-200 hover:border-amber-300 hover:text-slate-900 hover:bg-amber-50/40 transition-all cursor-pointer"
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
                            onViewChange('client');
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

            {/* Main Desktop View Switcher */}
            <div className="hidden sm:flex p-1 bg-slate-100 rounded-2xl border border-slate-200/80">
              <button
                id="nav-tab-welcome"
                onClick={() => onViewChange('welcome')}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  currentView === 'welcome'
                    ? 'bg-white text-slate-900 font-bold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Home className="w-3.5 h-3.5 text-amber-600" />
                <span>Inicio</span>
              </button>

              <button
                id="nav-tab-client"
                onClick={() => onViewChange('client')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  currentView === 'client'
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Asesoría & Proyecto</span>
              </button>

              <button
                id="nav-tab-requests"
                onClick={() => onViewChange('requests')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  currentView === 'requests'
                    ? 'bg-white text-blue-700 font-bold shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>Mis Solicitudes</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-200/80 text-slate-700">
                  {totalRequestsCount}
                </span>
              </button>

              <button
                id="nav-tab-dashboard"
                onClick={() => onViewChange('dashboard')}
                className={`relative flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  currentView === 'dashboard'
                    ? 'bg-white text-slate-900 font-bold shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-slate-500" />
                <span>Equipo Técnico</span>
                {newRequestsCount > 0 && (
                  <span className="flex items-center justify-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                    {newRequestsCount}
                  </span>
                )}
              </button>
            </div>

            {/* User Profile Button */}
            <button
              id="btn-user-profile-header"
              onClick={onOpenProfile}
              className="flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all cursor-pointer"
              title="Mi Perfil & Datos de Contacto"
            >
              <User className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden lg:inline">Mi Perfil</span>
            </button>

            {/* Mobile Hamburger Drawer Trigger */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 sm:hidden flex items-center justify-center cursor-pointer"
              aria-label="Abrir Menú"
            >
              {showMobileMenu ? <X className="w-5 h-5 text-amber-700" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Drawer */}
        {showMobileMenu && (
          <div className="sm:hidden py-3 px-1 border-t border-slate-100 space-y-2 animate-fadeIn bg-white">
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  onViewChange('welcome');
                  setShowMobileMenu(false);
                }}
                className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1 ${
                  currentView === 'welcome'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-50 text-slate-700 border border-slate-200'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Inicio</span>
              </button>

              <button
                onClick={() => {
                  onViewChange('client');
                  setShowMobileMenu(false);
                }}
                className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1 ${
                  currentView === 'client'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-50 text-slate-700 border border-slate-200'
                }`}
              >
                <Wand2 className="w-4 h-4" />
                <span>Asesoría</span>
              </button>

              <button
                onClick={() => {
                  onViewChange('requests');
                  setShowMobileMenu(false);
                }}
                className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1 ${
                  currentView === 'requests'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-50 text-slate-700 border border-slate-200'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Solicitudes ({totalRequestsCount})</span>
              </button>
            </div>

            <div className="pt-2 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  onOpenProfile();
                  setShowMobileMenu(false);
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-amber-600" />
                <span>Mi Perfil</span>
              </button>

              <button
                onClick={() => {
                  onViewChange('dashboard');
                  setShowMobileMenu(false);
                }}
                className="py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium flex items-center gap-1"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Técnicos</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
