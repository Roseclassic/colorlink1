import React, { useState } from 'react';
import {
  X,
  User,
  Building2,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  LogIn,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { ClientType, ClientUser } from '../../types';

interface ClientAuthModalProps {
  currentUser: ClientUser | null;
  onLoginSuccess: (user: ClientUser) => void;
  onClose: () => void;
}

export const ClientAuthModal: React.FC<ClientAuthModalProps> = ({
  currentUser,
  onLoginSuccess,
  onClose
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [clientType, setClientType] = useState<ClientType>(currentUser?.clientType || 'particular');
  const [name, setName] = useState(currentUser?.name || 'Laura María Restrepo');
  const [email, setEmail] = useState(currentUser?.email || 'laura.restrepo@pintuco-usuario.co');
  const [phone, setPhone] = useState(currentUser?.phone || '+57 312 847 2910');
  const [city, setCity] = useState(currentUser?.city || 'Bogotá D.C.');
  const [companyName, setCompanyName] = useState(currentUser?.companyName || '');
  const [companyNit, setCompanyNit] = useState(currentUser?.companyNit || '');
  const [password, setPassword] = useState('••••••••');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const userObj: ClientUser = {
        id: currentUser?.id || `usr-${Date.now()}`,
        name: name.trim() || (clientType === 'empresa' ? companyName || 'Cliente Empresa' : 'Cliente Particular'),
        email: email.trim() || 'usuario@pintuco.co',
        phone: phone.trim() || '+57 300 000 0000',
        city: city.trim() || 'Bogotá D.C.',
        clientType,
        companyName: clientType === 'empresa' ? companyName : undefined,
        companyNit: clientType === 'empresa' ? companyNit : undefined,
        registeredDate: currentUser?.registeredDate || '2026-08-15',
        activeProjectsCount: currentUser?.activeProjectsCount || 1,
        avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80`
      };

      setIsSubmitting(false);
      setSuccessMessage(authMode === 'register' ? '¡Cuenta creada con éxito en ColorLink!' : '¡Bienvenido de nuevo!');
      
      setTimeout(() => {
        onLoginSuccess(userObj);
        onClose();
      }, 900);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn text-slate-800">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden text-left">
        
        {/* Header Ribbon */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400" />

        {/* Modal Top Bar */}
        <div className="p-6 pb-4 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-800 shadow-xs">
              <Sparkles className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider font-mono">
                  Portal Cliente ColorLink
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                  Pintuco
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                {authMode === 'register' ? 'Crea tu Espacio de Proyectos' : 'Iniciar Sesión en Mi Espacio'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-2 p-1.5 mx-6 mt-4 bg-slate-100 rounded-2xl border border-slate-200">
          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              authMode === 'register'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Registrarme (Nuevo Cliente)
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              authMode === 'login'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ya tengo cuenta (Ingresar)
          </button>
        </div>

        {successMessage ? (
          <div className="p-8 text-center space-y-3 animate-fadeIn">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{successMessage}</h3>
            <p className="text-xs text-slate-500">Sincronizando tus solicitudes con IA Pintuco...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            
            {/* Client Type Toggle */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Tipo de Perfil</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setClientType('particular')}
                  className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                    clientType === 'particular'
                      ? 'bg-amber-50/80 border-amber-400 text-amber-900 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <User className="w-4 h-4 text-amber-600" />
                  <span>Persona / Hogar</span>
                </button>

                <button
                  type="button"
                  onClick={() => setClientType('empresa')}
                  className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                    clientType === 'empresa'
                      ? 'bg-amber-50/80 border-amber-400 text-amber-900 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-amber-600" />
                  <span>Empresa / Comercio</span>
                </button>
              </div>
            </div>

            {clientType === 'empresa' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-amber-50/40 border border-amber-200/80">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Razón Social Empresa</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Ej: Innovación Retail S.A.S."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">NIT / Identificación</label>
                  <input
                    type="text"
                    value={companyNit}
                    onChange={(e) => setCompanyNit(e.target.value)}
                    placeholder="Ej: 900.123.456-7"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            )}

            {/* Name / Contact Person */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">
                {clientType === 'empresa' ? 'Persona de Contacto' : 'Nombre Completo'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre y apellido"
                  className="w-full pl-10 pr-3 py-2.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Correo Electrónico</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="correo@ejemplo.com"
                    className="w-full pl-10 pr-3 py-2.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Teléfono / WhatsApp</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+57 300 123 4567"
                    className="w-full pl-10 pr-3 py-2.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* City */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Ciudad de Colombia</label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none"
                >
                  <option value="Bogotá D.C.">Bogotá D.C. / Cundinamarca</option>
                  <option value="Medellín">Medellín / Valle de Aburrá</option>
                  <option value="Cali">Cali / Valle del Cauca</option>
                  <option value="Barranquilla">Barranquilla / Atlántico</option>
                  <option value="Bucaramanga">Bucaramanga / Santander</option>
                  <option value="Cartagena">Cartagena / Bolívar</option>
                  <option value="Pereira">Pereira / Eje Cafetero</option>
                  <option value="Manizales">Manizales / Caldas</option>
                  <option value="Otra ciudad">Otra ciudad de Colombia</option>
                </select>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Contraseña de Acceso</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tu clave segura"
                  className="w-full pl-10 pr-3 py-2.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Trust badge */}
            <div className="flex items-center space-x-2 text-[11px] text-slate-500 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Tus datos y proyectos están protegidos bajo estándares de privacidad Pintuco.</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Guardando...</span>
              ) : authMode === 'register' ? (
                <>
                  <span>Crear Cuenta & Comenzar</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Ingresar a Mi Espacio</span>
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
