import React, { useState } from 'react';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Building2,
  CheckCircle2,
  X,
  ShieldCheck,
  Award,
  ArrowRight
} from 'lucide-react';
import { ClientProjectInput } from '../types';

interface UserProfileModalProps {
  input: ClientProjectInput;
  onSave: (updates: Partial<ClientProjectInput>) => void;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  input,
  onSave,
  onClose
}) => {
  const [name, setName] = useState(input.clientName || '');
  const [phone, setPhone] = useState(input.clientPhone || '');
  const [email, setEmail] = useState(input.clientEmail || '');
  const [city, setCity] = useState(input.clientCity || 'Bogotá D.C.');
  const [clientType, setClientType] = useState<'particular' | 'empresa' | 'constructor'>(
    (input.clientType as any) || 'particular'
  );
  const [companyName, setCompanyName] = useState(input.companyName || '');
  const [companyNit, setCompanyNit] = useState(input.companyNit || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const colombianCities = [
    'Bogotá D.C.',
    'Medellín',
    'Cali',
    'Barranquilla',
    'Bucaramanga',
    'Cartagena',
    'Pereira',
    'Manizales',
    'Santa Marta',
    'Cúcuta',
    'Ibagué',
    'Villavicencio',
    'Pasto'
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      clientName: name,
      clientPhone: phone,
      clientEmail: email,
      clientCity: city,
      clientType: clientType as any,
      companyName: clientType !== 'particular' ? companyName : undefined,
      companyNit: clientType !== 'particular' ? companyNit : undefined
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn text-slate-800">
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden text-left">
        
        {/* Top Pintuco Brand Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-200 text-amber-900 text-[11px] font-bold">
              <Award className="w-3 h-3 text-amber-700" />
              <span>Ecosistema Pintuco Colombia</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 font-display">
              Mi Perfil & Registro de Cliente
            </h3>
            <p className="text-xs text-slate-600">
              Personaliza tu experiencia y recibe tus diagnósticos y cotizaciones directamente.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
          
          {/* Client Type Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Tipo de Perfil:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'particular', label: 'Hogar / Particular' },
                { id: 'constructor', label: 'Maestro / Pintor' },
                { id: 'empresa', label: 'Empresa / B2B' }
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setClientType(t.id as any)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                    clientType === t.id
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-slate-600 font-medium flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-amber-600" />
                <span>Nombre completo:</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Laura Mejía"
                className="w-full bg-slate-50 border border-slate-200 focus:border-amber-400 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-600 font-medium flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span>WhatsApp / Teléfono:</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+57 312 345 6789"
                className="w-full bg-slate-50 border border-slate-200 focus:border-amber-400 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none font-mono transition-all"
              />
            </div>
          </div>

          {/* Email & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-slate-600 font-medium flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-amber-600" />
                <span>Correo electrónico:</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                className="w-full bg-slate-50 border border-slate-200 focus:border-amber-400 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-600 font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span>Ciudad en Colombia:</span>
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-amber-400 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none cursor-pointer transition-all"
              >
                {colombianCities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* If Empresa / B2B */}
          {clientType !== 'particular' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="space-y-1">
                <label className="text-xs text-slate-600 font-medium flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Empresa o Razón Social:</span>
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Ej: Inmobiliaria & Construcción SAS"
                  className="w-full bg-white border border-slate-200 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-600 font-medium">NIT / RUT:</label>
                <input
                  type="text"
                  value={companyNit}
                  onChange={(e) => setCompanyNit(e.target.value)}
                  placeholder="900.123.456-7"
                  className="w-full bg-white border border-slate-200 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none font-mono"
                />
              </div>
            </div>
          )}

          {/* Guarantee and Benefits Note */}
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center space-x-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-[11px] leading-relaxed">
              Tus datos quedan vinculados a tu expediente con asesoría directa de los técnicos autorizados de <strong>Pintuco Colombia</strong>.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center space-x-2 cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  <span>¡Guardado con Éxito!</span>
                </>
              ) : (
                <>
                  <span>Guardar Mi Perfil</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
