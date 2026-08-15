import React from 'react';
import {
  Home,
  Wand2,
  Clock,
  LayoutDashboard,
  User
} from 'lucide-react';

interface BottomNavProps {
  currentView: 'welcome' | 'client' | 'requests' | 'dashboard';
  onViewChange: (view: 'welcome' | 'client' | 'requests' | 'dashboard') => void;
  onOpenProfile: () => void;
  totalRequestsCount: number;
  newRequestsCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentView,
  onViewChange,
  onOpenProfile,
  totalRequestsCount,
  newRequestsCount
}) => {
  return (
    <nav
      id="mobile-bottom-nav"
      aria-label="Navegación Móvil Principal"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 py-1.5 px-3 flex sm:hidden items-center justify-around shadow-lg shadow-slate-300/40 select-none"
    >
      {/* 1. Inicio */}
      <button
        id="btn-bottom-nav-home"
        onClick={() => onViewChange('welcome')}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
          currentView === 'welcome'
            ? 'text-amber-700 font-bold'
            : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        <div
          className={`p-1.5 rounded-xl transition-all ${
            currentView === 'welcome'
              ? 'bg-amber-100/70 text-amber-700'
              : 'text-slate-400'
          }`}
        >
          <Home className="w-5 h-5" />
        </div>
        <span className="text-[10px] mt-0.5 tracking-tight font-medium">
          Inicio
        </span>
      </button>

      {/* 2. Asistente / Transformar */}
      <button
        id="btn-bottom-nav-wizard"
        onClick={() => onViewChange('client')}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
          currentView === 'client'
            ? 'text-amber-700 font-bold'
            : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        <div
          className={`p-1.5 rounded-xl transition-all ${
            currentView === 'client'
              ? 'bg-amber-100/70 text-amber-700'
              : 'text-slate-400'
          }`}
        >
          <Wand2 className="w-5 h-5" />
        </div>
        <span className="text-[10px] mt-0.5 tracking-tight font-medium">
          Transformar
        </span>
      </button>

      {/* 3. Mis Solicitudes */}
      <button
        id="btn-bottom-nav-requests"
        onClick={() => onViewChange('requests')}
        className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
          currentView === 'requests'
            ? 'text-blue-700 font-bold'
            : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        <div
          className={`p-1.5 rounded-xl transition-all relative ${
            currentView === 'requests'
              ? 'bg-blue-100/70 text-blue-700'
              : 'text-slate-400'
          }`}
        >
          <Clock className="w-5 h-5" />
          {totalRequestsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white font-bold text-[9px] rounded-full flex items-center justify-center shadow-sm">
              {totalRequestsCount}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-0.5 tracking-tight font-medium">
          Mis Proyectos
        </span>
      </button>

      {/* 4. Mi Perfil */}
      <button
        id="btn-bottom-nav-profile"
        onClick={onOpenProfile}
        className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-500 hover:text-slate-900 transition-all"
      >
        <div className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100">
          <User className="w-5 h-5" />
        </div>
        <span className="text-[10px] mt-0.5 tracking-tight font-medium">
          Mi Perfil
        </span>
      </button>
    </nav>
  );
};
