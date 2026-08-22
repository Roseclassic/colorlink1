import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Search,
  CheckCircle2,
  Heart,
  Sliders,
  ShieldCheck,
  Palette,
  Home,
  Building2,
  Eye,
  Star,
  Clock,
  Award,
  ChevronRight,
  Layers,
  Sparkle,
  LogIn,
  UserPlus,
  User,
  Package
} from 'lucide-react';
import { ClientUser, SampleImageOption } from '../../types';

interface WelcomeScreenProps {
  currentUser: ClientUser | null;
  onStartProject: () => void;
  onViewMyRequests: () => void;
  onSelectInspirationPreset: (sample: SampleImageOption) => void;
  onOpenAuth: (mode?: 'login' | 'register') => void;
  onOpenProfile: () => void;
  samples: SampleImageOption[];
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  currentUser,
  onStartProject,
  onViewMyRequests,
  onSelectInspirationPreset,
  onOpenAuth,
  onOpenProfile,
  samples
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [activeTab, setActiveTab] = useState<'hogar' | 'oficina' | 'comercial'>('hogar');

  // Inspiring Before / After pairs for the hero presentation
  const heroShowcase = {
    hogar: {
      title: 'Sala Residencial Renovada',
      subtitle: 'De muro con humedad y desgaste a un espacio cálido con Viniltex® Lino Andino',
      colorName: 'Lino Andino (PT-104)',
      finish: 'Satinado Lavable',
      beforeUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      afterUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      pintucoSystem: 'Viniltex® Advanced + Sellomax Barrera'
    },
    oficina: {
      title: 'Estudio & Coworking Creativo',
      subtitle: 'Luminosidad y foco con Viniltex® Salvia Cocora y acabados antibacteriales',
      colorName: 'Salvia Cocora (PT-210)',
      finish: 'Mate Antipolvo',
      beforeUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
      afterUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      pintucoSystem: 'Viniltex® Baños & Cocinas + Sellomax'
    },
    comercial: {
      title: 'Fachada & Local Comercial',
      subtitle: 'Protección hidrófuga extrema y durabilidad 10 años con Koraza® 500',
      colorName: 'Terracota Barichara (PT-305)',
      finish: 'Semi-brillante Intemperie',
      beforeUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
      afterUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
      pintucoSystem: 'Koraza® 500 Doble Acción Solar'
    }
  };

  const currentShowcase = heroShowcase[activeTab];

  return (
    <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16 animate-fadeIn text-slate-800">
      
      {/* 1. HERO SECTION - ASESOR INTELIGENTE CÁLIDO & PREMIUM */}
      <section className="relative pt-2 sm:pt-4">
        
        {/* Soft Background Accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-80 bg-gradient-to-r from-amber-100/50 via-yellow-50/40 to-blue-50/40 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="text-center space-y-5 max-w-3xl mx-auto px-4">
          
          {/* Friendly Greeting Pill */}
          <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-amber-50 border border-amber-200/70 text-amber-900 shadow-sm">
            <span className="text-base animate-bounce">👋</span>
            <span className="text-xs sm:text-sm font-semibold tracking-tight">
              Asistente Inteligente de Transformación • Pintuco Colombia
            </span>
          </div>

          {/* Main Conversational Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight font-display leading-[1.15]">
            Hola 👋 <br className="hidden sm:block" />
            Soy <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600">ColorLink</span>, tu asistente inteligente para transformar espacios.
          </h1>

          {/* Warm Subtitle */}
          <p className="text-base sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Cuéntanos qué espacio quieres renovar y te ayudaremos a encontrar la mejor solución de recubrimiento, protección y color.
          </p>

          {/* Access Flow Banner: Iniciar sesión | Crear cuenta OR Logged In Card */}
          <div className="py-2">
            {!currentUser ? (
              <div className="p-3 sm:p-4 rounded-3xl bg-white border border-amber-200/90 shadow-lg shadow-amber-500/10 max-w-lg mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center space-x-3 text-left">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow-xs">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-amber-900 uppercase font-mono tracking-wider">
                      Portal Cliente ColorLink
                    </span>
                    <p className="text-xs font-semibold text-slate-800">
                      Guarda tus proyectos y recibe peritajes IA
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <button
                    type="button"
                    id="btn-welcome-login"
                    onClick={() => onOpenAuth('login')}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5 text-amber-600" />
                    <span>Iniciar sesión</span>
                  </button>

                  <span className="text-slate-300 hidden sm:inline">|</span>

                  <button
                    type="button"
                    id="btn-welcome-register"
                    onClick={() => onOpenAuth('register')}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Crear cuenta</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-3.5 sm:p-4 rounded-3xl bg-amber-50/80 border border-amber-300 shadow-sm max-w-lg mx-auto flex items-center justify-between gap-3 text-left">
                <div className="flex items-center space-x-3 truncate">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-base shrink-0 shadow-xs">
                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="truncate">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900 truncate">
                        ¡Hola, {currentUser.name.split(' ')[0]}!
                      </span>
                      <span className="px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Sesión activa
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 truncate">
                      {currentUser.clientType === 'empresa' ? currentUser.companyName || 'Empresa B2B' : 'Cliente Particular'} • {currentUser.city}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenProfile}
                  className="px-3 py-2 rounded-xl bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 text-xs font-bold transition-colors cursor-pointer shrink-0"
                >
                  Mi Perfil & Menú
                </button>
              </div>
            )}
          </div>

          {/* Two Primary Action Buttons */}
          <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-md mx-auto">
            <button
              id="btn-welcome-start-project"
              onClick={onStartProject}
              className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold text-base shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center space-x-2.5 cursor-pointer group"
            >
              <span>Comenzar mi proyecto</span>
              <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="btn-welcome-existing-request"
              onClick={onViewMyRequests}
              className="w-full sm:w-auto min-h-[52px] px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-semibold text-base border border-slate-200 shadow-sm hover:shadow hover:border-slate-300 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Ya tengo una solicitud</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Garantía oficial Pintuco
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Award className="w-4 h-4 text-amber-600" />
              Diagnóstico técnico sin costo
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Heart className="w-4 h-4 text-rose-500" />
              Inspiración y asesoría cercana
            </span>
          </div>

        </div>
      </section>

      {/* 2. PROTAGONIST BEFORE & AFTER IMAGE CARD (Tienda Digital Premium) */}
      <section className="relative">
        <div className="bg-white rounded-3xl p-4 sm:p-7 border border-slate-100 shadow-xl shadow-slate-200/50 space-y-5">
          
          {/* Header & Space Selector Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                  Transformaciones Reales con Acabados Pintuco
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Desliza la barra central para comparar el estado inicial con el resultado final.
              </p>
            </div>

            {/* Ambient category chips */}
            <div className="flex items-center space-x-1.5 p-1 bg-slate-100/80 rounded-2xl">
              {[
                { id: 'hogar', label: 'Hogar', icon: Home },
                { id: 'oficina', label: 'Oficina / Estudio', icon: Building2 },
                { id: 'comercial', label: 'Comercial', icon: Palette }
              ].map((tab) => {
                const isSelected = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-white text-slate-900 shadow-sm font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-600' : 'text-slate-400'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Split Viewport (Limpio, Luminoso, Sin saturación tecnológica) */}
          <div
            className="relative w-full aspect-[4/3] sm:aspect-[21/9] rounded-2xl overflow-hidden shadow-inner bg-slate-100 select-none cursor-ew-resize group border border-slate-200"
            onMouseMove={(e) => {
              if (e.buttons === 1) {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                setSliderPosition((x / rect.width) * 100);
              }
            }}
            onTouchMove={(e) => {
              const touch = e.touches[0];
              const rect = e.currentTarget.getBoundingClientRect();
              const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
              setSliderPosition((x / rect.width) * 100);
            }}
          >
            {/* AFTER IMAGE (Transformado) */}
            <img
              src={currentShowcase.afterUrl}
              alt="Espacio transformado con Pintuco"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />

            {/* BEFORE IMAGE (Clipped overlay) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={currentShowcase.beforeUrl}
                alt="Estado inicial del espacio"
                className="absolute inset-y-0 left-0 w-full h-full object-cover max-w-none"
                style={{ width: '100%', minWidth: '100%', height: '100%' }}
              />
            </div>

            {/* SLIDER HANDLE */}
            <div
              className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.4)] pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-slate-800 shadow-xl border border-slate-200 flex items-center justify-center">
                <Sliders className="w-3.5 h-3.5 text-amber-600 rotate-90" />
              </div>
            </div>

            {/* Badges */}
            <div className="absolute top-3 left-3 pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-xs font-semibold text-white shadow-sm">
                📷 Antes (Estado inicial)
              </span>
            </div>

            <div className="absolute top-3 right-3 pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 backdrop-blur-md text-xs font-bold shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                <span>Después con Pintuco</span>
              </span>
            </div>

            {/* Floating Info Banner */}
            <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-lg flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="space-y-0.5">
                <h4 className="font-bold text-slate-900 text-sm">
                  {currentShowcase.title}
                </h4>
                <p className="text-slate-600 text-xs hidden sm:block">
                  {currentShowcase.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 font-semibold border border-amber-200/60">
                  {currentShowcase.colorName}
                </span>
                <span className="text-slate-500 font-medium hidden md:inline">
                  Sistema: <strong className="text-slate-800">{currentShowcase.pintucoSystem}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Slider Controls */}
          <div className="flex items-center justify-between gap-3 px-2 pt-1 text-xs">
            <span className="text-slate-400 font-medium">Desliza para comparar</span>
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => setSliderPosition(0)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  sliderPosition === 0 ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Ver Antes
              </button>
              <button
                onClick={() => setSliderPosition(50)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  sliderPosition === 50 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                50% Comparar
              </button>
              <button
                onClick={() => setSliderPosition(100)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  sliderPosition === 100 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Ver Después
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. INSPIRATION & GUIDED JOURNEY: "¿CÓMO TE AYUDAMOS A TRANSFORMAR?" */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider font-mono">
            Paso a Paso Transparente
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            La experiencia de renovar con confianza
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Te guiamos desde la idea inicial hasta la cotización y entrega en tu ciudad.
          </p>
        </div>

        {/* 4 Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow space-y-3 text-left">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-base font-display">
              Cuéntanos tu Espacio
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Elige si es tu hogar, oficina o negocio. Selecciona el ambiente que quieres renovar.
            </p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow space-y-3 text-left">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-base font-display">
              Sube una Foto
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Toma una foto de tu muro o selecciona uno de nuestros espacios de referencia.
            </p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow space-y-3 text-left">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-base font-display">
              Diagnóstico & Simulación
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Nuestra IA detecta humedad, sustrato y calcula galones exactos con tonos Pintuco.
            </p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow space-y-3 text-left">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-sm">
              4
            </div>
            <h3 className="font-bold text-slate-900 text-base font-display">
              Ficha & Acompañamiento
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Recibe tu prescripción certificada con garantía de fábrica y contacto directo.
            </p>
          </div>

        </div>
      </section>

      {/* 4. INSPIRATION PRESETS CAROUSEL (Explora Espacios) */}
      <section className="bg-gradient-to-b from-amber-50/40 to-white p-6 sm:p-8 rounded-3xl border border-amber-100/60 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-display">
              ¿No tienes una foto a mano? Prueba con un espacio demo
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Haz clic en cualquiera para iniciar el análisis automático con recubrimientos Pintuco.
            </p>
          </div>

          <button
            onClick={onStartProject}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
          >
            <span>Personalizar mi propio espacio</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {samples.slice(0, 3).map((sample) => (
            <div
              key={sample.id}
              onClick={() => onSelectInspirationPreset(sample)}
              className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md hover:border-amber-400 transition-all cursor-pointer text-left space-y-3 p-3.5 active:scale-[0.99]"
            >
              <div className="relative h-44 rounded-xl overflow-hidden bg-slate-100">
                <img
                  src={sample.url}
                  alt={sample.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-slate-800 shadow-sm">
                  {sample.category.toUpperCase()} • ~{sample.areaM2} m²
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-amber-700 transition-colors">
                  {sample.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {sample.defaultDescription}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-amber-700 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Probar diagnóstico</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-700 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CALL TO ACTION BOTTOM BANNER */}
      <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 text-center space-y-4 shadow-xl shadow-amber-500/20">
        <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
          ¿Listo para darle nueva vida a tus muros?
        </h3>
        <p className="text-sm sm:text-base font-medium max-w-lg mx-auto text-slate-900/90">
          En menos de 2 minutos obtendrás tu recomendación de pintura, colores y cálculo exacto de galones.
        </p>
        <div className="pt-2">
          <button
            onClick={onStartProject}
            className="px-8 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all inline-flex items-center space-x-2 cursor-pointer"
          >
            <span>Iniciar Asistente ColorLink</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </section>

    </div>
  );
};
