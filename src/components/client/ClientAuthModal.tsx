import React, { useState, useEffect } from 'react';
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
  Lock,
  Eye,
  EyeOff,
  FileText,
  AlertCircle,
  KeyRound,
  Check,
  ChevronLeft,
  Home,
  Navigation
} from 'lucide-react';
import { ClientType, ClientUser, DocumentType } from '../../types';
import { PRELOADED_USERS } from '../../context/ColorLinkContext';
import { COLOMBIA_CITIES_CONFIG, getLocalitiesForCity } from '../../data/colombiaLocations';

interface ClientAuthModalProps {
  initialMode?: 'login' | 'register';
  onLoginSuccess: (user: ClientUser, rememberMe?: boolean) => void;
  onClose: () => void;
  onStartProjectDirectly?: () => void;
}

export const ClientAuthModal: React.FC<ClientAuthModalProps> = ({
  initialMode = 'login',
  onLoginSuccess,
  onClose,
  onStartProjectDirectly
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot_password' | 'registered_success'>(
    initialMode
  );

  // Register multi-step state
  const [registerStep, setRegisterStep] = useState<number>(1); // 1: Tipo de cliente, 2: Datos y Dirección, 3: Contraseña & Términos

  // Common Auth States
  const [clientType, setClientType] = useState<ClientType>('particular');
  
  // Particular fields
  const [fullName, setFullName] = useState<string>('');
  const [docType, setDocType] = useState<DocumentType>('CC');
  const [docNumber, setDocNumber] = useState<string>('');
  
  // Empresa fields
  const [companyName, setCompanyName] = useState<string>('');
  const [companyNit, setCompanyNit] = useState<string>('');
  const [responsibleName, setResponsibleName] = useState<string>('');

  // Contact fields
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  // Structured Address fields
  const [city, setCity] = useState<string>('Bogotá D.C.');
  const [locality, setLocality] = useState<string>('Chapinero');
  const [neighborhood, setNeighborhood] = useState<string>('Chicó Norte');
  const [address, setAddress] = useState<string>('Carrera 15 # 93-40');
  const [complement, setComplement] = useState<string>('Apto 402');
  const [notes, setNotes] = useState<string>('Edificio Torre Andina, citófono 402');

  // Password & Security
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  // Terms & Data policy
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [acceptDataPolicy, setAcceptDataPolicy] = useState<boolean>(false);
  const [showTermsModal, setShowTermsModal] = useState<boolean>(false);

  // Error & Status handling
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [createdUser, setCreatedUser] = useState<ClientUser | null>(null);

  // Forgot password flow
  const [forgotEmail, setForgotEmail] = useState<string>('');
  const [forgotSubmitted, setForgotSubmitted] = useState<boolean>(false);

  // Update locality list when city changes
  const availableLocalities = getLocalitiesForCity(city);

  useEffect(() => {
    const locs = getLocalitiesForCity(city);
    if (!locs.includes(locality)) {
      setLocality(locs[0] || 'Zona Principal');
    }
  }, [city]);

  // Email validation helper
  const isValidEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  // --- VALIDATIONS ---
  const validateStep2 = () => {
    const errors: Record<string, string> = {};

    if (clientType === 'particular') {
      if (!fullName.trim() || fullName.trim().length < 3) {
        errors.fullName = 'Ingresa tu nombre completo (mínimo 3 caracteres).';
      }
      if (!docNumber.trim() || docNumber.trim().length < 5) {
        errors.docNumber = 'Ingresa un número de documento válido.';
      }
    } else {
      if (!companyName.trim() || companyName.trim().length < 3) {
        errors.companyName = 'Ingresa la razón social o nombre de la empresa.';
      }
      if (!companyNit.trim() || companyNit.trim().length < 6) {
        errors.companyNit = 'Ingresa el NIT de la empresa con dígito de verificación.';
      }
      if (!responsibleName.trim() || responsibleName.trim().length < 3) {
        errors.responsibleName = 'Ingresa el nombre del responsable o contacto.';
      }
    }

    if (!email.trim() || !isValidEmail(email)) {
      errors.email = 'Ingresa un correo electrónico válido.';
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 7) {
      errors.phone = 'Ingresa un número de celular válido (ej: 310 123 4567).';
    }

    if (!city) {
      errors.city = 'Selecciona una ciudad principal de Colombia.';
    }

    if (!address.trim() || address.trim().length < 5) {
      errors.address = 'Ingresa una dirección de entrega válida (calle, carrera, número).';
    }

    if (!neighborhood.trim()) {
      errors.neighborhood = 'Ingresa el nombre del barrio.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep3 = () => {
    const errors: Record<string, string> = {};

    if (!password || password.length < 6) {
      errors.password = 'La contraseña debe tener mínimo 6 caracteres.';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden. Verifica nuevamente.';
    }

    if (!acceptTerms) {
      errors.acceptTerms = 'Debes aceptar los términos y condiciones de ColorLink.';
    }

    if (!acceptDataPolicy) {
      errors.acceptDataPolicy = 'Debes autorizar la política de tratamiento de datos personales.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateLogin = () => {
    const errors: Record<string, string> = {};

    if (!email.trim() || !isValidEmail(email)) {
      errors.email = 'Ingresa el correo electrónico asociado a tu cuenta.';
    }

    if (!password || password.length < 4) {
      errors.password = 'Ingresa tu contraseña.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // --- SUBMISSIONS ---
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      // Check if email matches preloaded users
      const cleanEmail = email.trim().toLowerCase();
      const existingUser = PRELOADED_USERS.find(
        (u) => u.email.toLowerCase() === cleanEmail
      );

      if (existingUser) {
        setIsSubmitting(false);
        onLoginSuccess(existingUser, rememberMe);
        onClose();
        return;
      }

      // Create fallback simulated user
      const isCompanyEmail = email.includes('empresa') || email.includes('corp') || email.includes('.com.co');
      const detectedType: ClientType = isCompanyEmail ? 'empresa' : 'particular';
      
      const loggedUser: ClientUser = {
        id: `usr-${Date.now().toString().slice(-4)}`,
        name: isCompanyEmail ? 'Constructora & Proyectos Andina S.A.S.' : (email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Cliente ColorLink'),
        email: email.trim(),
        phone: phone || '+57 312 847 2910',
        city: city || 'Bogotá D.C.',
        clientType: detectedType,
        companyName: isCompanyEmail ? 'Constructora & Proyectos Andina S.A.S.' : undefined,
        companyNit: isCompanyEmail ? '901.458.720-3' : undefined,
        documentType: detectedType === 'particular' ? 'CC' : 'NIT',
        documentNumber: detectedType === 'particular' ? '1.020.485.912' : '901458720-3',
        registeredDate: new Date().toISOString().split('T')[0],
        activeProjectsCount: 0,
        avatarUrl: detectedType === 'particular' 
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
          : undefined,
        savedAddresses: [
          {
            id: 'addr-main',
            label: 'Residencia Principal',
            city: city || 'Bogotá D.C.',
            locality: locality || 'Chapinero',
            neighborhood: neighborhood || 'Chicó Norte',
            address: address || 'Carrera 15 # 93-40',
            complement: complement || 'Apto 402',
            notes: notes || 'Portería 24 horas',
            isDefault: true
          }
        ]
      };

      setIsSubmitting(false);
      onLoginSuccess(loggedUser, rememberMe);
      onClose();
    }, 500);
  };

  const handleRegisterFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newUser: ClientUser = {
        id: `usr-${Date.now().toString().slice(-4)}`,
        name: clientType === 'particular' ? fullName.trim() : companyName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        city: city,
        clientType: clientType,
        documentType: clientType === 'particular' ? docType : 'NIT',
        documentNumber: clientType === 'particular' ? docNumber.trim() : companyNit.trim(),
        responsibleName: clientType === 'empresa' ? responsibleName.trim() : undefined,
        companyName: clientType === 'empresa' ? companyName.trim() : undefined,
        companyNit: clientType === 'empresa' ? companyNit.trim() : undefined,
        registeredDate: new Date().toISOString().split('T')[0],
        activeProjectsCount: 0,
        acceptTerms: true,
        acceptDataPolicy: true,
        savedAddresses: [
          {
            id: `addr-${Date.now().toString().slice(-4)}`,
            label: 'Dirección Principal de Entrega',
            city: city,
            locality: locality,
            neighborhood: neighborhood.trim(),
            address: address.trim(),
            complement: complement.trim(),
            notes: notes.trim(),
            isDefault: true
          }
        ]
      };

      setIsSubmitting(false);
      setCreatedUser(newUser);
      setAuthMode('registered_success');
      onLoginSuccess(newUser, rememberMe);
    }, 600);
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !isValidEmail(forgotEmail)) {
      setFormErrors({ forgotEmail: 'Ingresa un correo electrónico válido registrado en ColorLink.' });
      return;
    }
    setFormErrors({});
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setForgotSubmitted(true);
    }, 600);
  };

  // Quick fill sample for fast testing
  const handleQuickFillSample = (type: ClientType) => {
    setClientType(type);
    if (type === 'particular') {
      setFullName('Carlos Eduardo Mendoza');
      setDocType('CC');
      setDocNumber('1.032.458.129');
      setEmail('carlos.mendoza@pintuco-usuario.co');
      setPhone('+57 314 982 3410');
      setCity('Medellín');
      setLocality('Laureles - Estadio');
      setNeighborhood('Laureles');
      setAddress('Circular 4 # 71-20');
      setComplement('Casa 2');
      setNotes('Frente al parque de Laureles');
      setPassword('Pintuco2026*');
      setConfirmPassword('Pintuco2026*');
    } else {
      setCompanyName('Diseño & Acabados del Valle S.A.S.');
      setCompanyNit('900.845.120-4');
      setResponsibleName('Marcela Gómez Quintero');
      setEmail('marcela.gomez@disenoacabados.com');
      setPhone('+57 320 654 8921');
      setCity('Cali');
      setLocality('Comuna 19 (San Fernando / Tequendama)');
      setNeighborhood('San Fernando');
      setAddress('Calle 10 # 32-15');
      setComplement('Bodega 4');
      setNotes('Entrada por portón metálico gris');
      setPassword('ColorLink2026*');
      setConfirmPassword('ColorLink2026*');
    }
    setAcceptTerms(true);
    setAcceptDataPolicy(true);
    setFormErrors({});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn text-slate-800">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden text-left flex flex-col max-h-[94vh]">
        
        {/* Brand Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 shrink-0" />

        {/* Top Header */}
        <div className="p-5 sm:p-6 pb-4 flex items-center justify-between border-b border-slate-100 bg-slate-50/70 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-xs shrink-0">
              {authMode === 'login' ? (
                <LogIn className="w-5 h-5" />
              ) : authMode === 'forgot_password' ? (
                <KeyRound className="w-5 h-5" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider font-mono">
                  Portal Cliente ColorLink
                </span>
                <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                  Pintuco
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                {authMode === 'login' && 'Iniciar Sesión'}
                {authMode === 'register' && 'Crear Cuenta en ColorLink'}
                {authMode === 'forgot_password' && 'Recuperar Contraseña'}
                {authMode === 'registered_success' && '¡Cuenta Creada Exitosamente!'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Body Scrollable */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5 flex-1">
          
          {/* Top Switcher: Iniciar Sesión vs Crear Cuenta */}
          {(authMode === 'login' || authMode === 'register') && (
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold">
              <button
                type="button"
                id="btn-switch-login"
                onClick={() => {
                  setAuthMode('login');
                  setFormErrors({});
                }}
                className={`py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                  authMode === 'login'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LogIn className="w-3.5 h-3.5 text-amber-600" />
                <span>Iniciar sesión</span>
              </button>

              <button
                type="button"
                id="btn-switch-register"
                onClick={() => {
                  setAuthMode('register');
                  setRegisterStep(1);
                  setFormErrors({});
                }}
                className={`py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                  authMode === 'register'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Crear cuenta</span>
              </button>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 1. LOGIN MODE */}
          {/* ========================================================================= */}
          {authMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="text-center space-y-1 pb-1">
                <p className="text-xs sm:text-sm text-slate-600">
                  Ingresa con tu correo registrado para acceder a tus solicitudes, peritajes y pedidos.
                </p>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Correo electrónico: <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    id="input-login-email"
                    required
                    placeholder="ej: tu.correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all ${
                      formErrors.email ? 'border-red-400 bg-red-50/50' : 'border-slate-300 bg-white'
                    }`}
                  />
                </div>
                {formErrors.email && (
                  <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {formErrors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    Contraseña: <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotEmail(email);
                      setAuthMode('forgot_password');
                    }}
                    className="text-[11px] font-semibold text-amber-700 hover:text-amber-800 hover:underline cursor-pointer"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="input-login-password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all ${
                      formErrors.password ? 'border-red-400 bg-red-50/50' : 'border-slate-300 bg-white'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                    aria-label="Mostrar u ocultar contraseña"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {formErrors.password && (
                  <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {formErrors.password}
                  </p>
                )}
              </div>

              {/* Remember me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    id="checkbox-remember-me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded-md border-slate-300 text-amber-500 focus:ring-amber-400"
                  />
                  <span>Recordarme en este dispositivo</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="btn-submit-login"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20 hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span className="inline-block animate-spin mr-2">⚪</span>
                ) : (
                  <LogIn className="w-4 h-4 text-slate-950" />
                )}
                <span>{isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}</span>
              </button>

              {/* Quick Preset Buttons for testing */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                  <span>Acceso rápido con usuarios de prueba:</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('laura.restrepo@pintuco-usuario.co');
                      setPassword('Pintuco2026*');
                    }}
                    className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700 hover:bg-amber-50 hover:border-amber-300 transition-colors text-left cursor-pointer"
                  >
                    <span className="font-bold block text-slate-900">👤 Laura Restrepo</span>
                    <span className="text-[10px] text-slate-500">Bogotá • Particular</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('maria.gomez@gmail.com');
                      setPassword('Pintuco2026*');
                    }}
                    className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700 hover:bg-amber-50 hover:border-amber-300 transition-colors text-left cursor-pointer"
                  >
                    <span className="font-bold block text-slate-900">👤 María F. Gómez</span>
                    <span className="text-[10px] text-slate-500">Bogotá • Solicitud CLK-8501</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('operaciones@innovacion-retail.co');
                      setPassword('Andina2026*');
                    }}
                    className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700 hover:bg-amber-50 hover:border-amber-300 transition-colors text-left cursor-pointer"
                  >
                    <span className="font-bold block text-slate-900">🏢 Andrés Echeverry</span>
                    <span className="text-[10px] text-slate-500">Medellín • Innovación Retail</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('direccion@clinica-odontologica-valle.com');
                      setPassword('Valle2026*');
                    }}
                    className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700 hover:bg-amber-50 hover:border-amber-300 transition-colors text-left cursor-pointer"
                  >
                    <span className="font-bold block text-slate-900">🏢 Dr. Roberto Mendoza</span>
                    <span className="text-[10px] text-slate-500">Cali • Clínica Dental Valle</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* ========================================================================= */}
          {/* 2. REGISTER MODE (3 STEPS) */}
          {/* ========================================================================= */}
          {authMode === 'register' && (
            <div className="space-y-4">
              
              {/* Stepper Indicator */}
              <div className="flex items-center justify-between px-2 pb-2">
                {[
                  { step: 1, label: 'Tipo' },
                  { step: 2, label: 'Datos y Dirección' },
                  { step: 3, label: 'Seguridad' }
                ].map((s) => (
                  <div key={s.step} className="flex items-center space-x-2">
                    <div
                      className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                        registerStep === s.step
                          ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-200'
                          : registerStep > s.step
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {registerStep > s.step ? <Check className="w-3.5 h-3.5" /> : s.step}
                    </div>
                    <span className={`text-xs font-semibold ${registerStep === s.step ? 'text-slate-900' : 'text-slate-400'}`}>
                      {s.label}
                    </span>
                    {s.step < 3 && <div className="w-6 sm:w-12 h-0.5 bg-slate-200" />}
                  </div>
                ))}
              </div>

              {/* STEP 1: ¿Qué tipo de cliente eres? */}
              {registerStep === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="text-center space-y-1">
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                      ¿Qué tipo de cuenta deseas crear?
                    </h3>
                    <p className="text-xs text-slate-600">
                      Personalizaremos tu catálogo, soluciones técnicas e inventarios Pintacasa.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {/* Particular */}
                    <button
                      type="button"
                      id="btn-register-type-particular"
                      onClick={() => setClientType('particular')}
                      className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        clientType === 'particular'
                          ? 'border-amber-500 bg-amber-50/60 shadow-md ring-1 ring-amber-400'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                          <User className="w-5 h-5 text-amber-700" />
                        </div>
                        {clientType === 'particular' && (
                          <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs">
                            ✓
                          </span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">Persona / Cliente Particular</h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Para renovar salas, habitaciones, fachadas o espacios residenciales propios.
                        </p>
                      </div>
                    </button>

                    {/* Empresa */}
                    <button
                      type="button"
                      id="btn-register-type-empresa"
                      onClick={() => setClientType('empresa')}
                      className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        clientType === 'empresa'
                          ? 'border-amber-500 bg-amber-50/60 shadow-md ring-1 ring-amber-400'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                          <Building2 className="w-5 h-5 text-blue-700" />
                        </div>
                        {clientType === 'empresa' && (
                          <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs">
                            ✓
                          </span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">Empresa / Negocio / NIT</h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Para oficinas, constructoras, comercios, bodegas y proyectos corporativos.
                        </p>
                      </div>
                    </button>
                  </div>

                  <div className="pt-3">
                    <button
                      type="button"
                      id="btn-register-step1-next"
                      onClick={() => setRegisterStep(2)}
                      className="w-full py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20 hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <span>Continuar con Datos y Dirección</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Datos de Identificación, Contacto & Dirección de Entrega */}
              {registerStep === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between pb-1">
                    <div>
                      <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                        {clientType === 'particular' ? 'Datos del Cliente Particular' : 'Datos de la Empresa'}
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Información requerida para facturación legal y despacho en Colombia.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleQuickFillSample(clientType)}
                      className="text-[11px] font-bold text-amber-700 hover:underline px-2.5 py-1 bg-amber-50 rounded-lg border border-amber-200 cursor-pointer"
                    >
                      ⚡ Llenar demo
                    </button>
                  </div>

                  {/* Particular Specific Fields */}
                  {clientType === 'particular' ? (
                    <>
                      {/* Full Name */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">
                          Nombre completo: <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            id="input-register-fullname"
                            required
                            placeholder="ej: Laura María Restrepo"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 ${
                              formErrors.fullName ? 'border-red-400 bg-red-50/50' : 'border-slate-300 bg-white'
                            }`}
                          />
                        </div>
                        {formErrors.fullName && (
                          <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            {formErrors.fullName}
                          </p>
                        )}
                      </div>

                      {/* Document Type and Number */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <div className="space-y-1 sm:col-span-1">
                          <label className="text-xs font-bold text-slate-700 block">
                            Tipo Doc: <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={docType}
                            onChange={(e) => setDocType(e.target.value as DocumentType)}
                            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                          >
                            <option value="CC">Cédula (CC)</option>
                            <option value="CE">Extranjería (CE)</option>
                            <option value="Pasaporte">Pasaporte</option>
                          </select>
                        </div>

                        <div className="space-y-1 sm:col-span-2">
                          <label className="text-xs font-bold text-slate-700 block">
                            Número de Documento: <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="input-register-docnumber"
                            required
                            placeholder="ej: 1.020.345.678"
                            value={docNumber}
                            onChange={(e) => setDocNumber(e.target.value)}
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 ${
                              formErrors.docNumber ? 'border-red-400 bg-red-50/50' : 'border-slate-300 bg-white'
                            }`}
                          />
                          {formErrors.docNumber && (
                            <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium">
                              <AlertCircle className="w-3 h-3 shrink-0" />
                              {formErrors.docNumber}
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Empresa Specific Fields */
                    <>
                      {/* Razón Social */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">
                          Empresa / Razón Social: <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            id="input-register-company"
                            required
                            placeholder="ej: Inversiones & Construcciones Andina S.A.S."
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 ${
                              formErrors.companyName ? 'border-red-400 bg-red-50/50' : 'border-slate-300 bg-white'
                            }`}
                          />
                        </div>
                        {formErrors.companyName && (
                          <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            {formErrors.companyName}
                          </p>
                        )}
                      </div>

                      {/* NIT & Responsable */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 block">
                            NIT: <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="input-register-nit"
                            required
                            placeholder="ej: 901.458.720-3"
                            value={companyNit}
                            onChange={(e) => setCompanyNit(e.target.value)}
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 ${
                              formErrors.companyNit ? 'border-red-400 bg-red-50/50' : 'border-slate-300 bg-white'
                            }`}
                          />
                          {formErrors.companyNit && (
                            <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium">
                              <AlertCircle className="w-3 h-3 shrink-0" />
                              {formErrors.companyNit}
                            </p>
                          )}
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 block">
                            Responsable: <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="input-register-responsible"
                            required
                            placeholder="ej: Marcela Gómez (Directora)"
                            value={responsibleName}
                            onChange={(e) => setResponsibleName(e.target.value)}
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 ${
                              formErrors.responsibleName ? 'border-red-400 bg-red-50/50' : 'border-slate-300 bg-white'
                            }`}
                          />
                          {formErrors.responsibleName && (
                            <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium">
                              <AlertCircle className="w-3 h-3 shrink-0" />
                              {formErrors.responsibleName}
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Common Contact Fields: Correo y Celular */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">
                        Correo electrónico: <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          id="input-register-email"
                          required
                          placeholder="ej: usuario@correo.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 ${
                            formErrors.email ? 'border-red-400 bg-red-50/50' : 'border-slate-300 bg-white'
                          }`}
                        />
                      </div>
                      {formErrors.email && (
                        <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {formErrors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">
                        Teléfono / Celular: <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          id="input-register-phone"
                          required
                          placeholder="ej: 312 847 2910"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 ${
                            formErrors.phone ? 'border-red-400 bg-red-50/50' : 'border-slate-300 bg-white'
                          }`}
                        />
                      </div>
                      {formErrors.phone && (
                        <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {formErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ========================================================= */}
                  {/* DIRECCIÓN PRINCIPAL DE ENTREGA ESTRUCTURADA */}
                  {/* ========================================================= */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
                    <div className="flex items-center space-x-2 pb-1 border-b border-slate-200">
                      <MapPin className="w-4 h-4 text-amber-600" />
                      <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                        Dirección Principal de Entrega
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {/* Ciudad */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">
                          Ciudad: <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="select-register-city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                        >
                          {COLOMBIA_CITIES_CONFIG.map((c) => (
                            <option key={c.city} value={c.city}>
                              {c.city}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Localidad / Zona */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">
                          Localidad / Zona: <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="select-register-locality"
                          value={locality}
                          onChange={(e) => setLocality(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                        >
                          {availableLocalities.map((loc) => (
                            <option key={loc} value={loc}>
                              {loc}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Barrio y Dirección */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">
                          Barrio: <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="input-register-neighborhood"
                          required
                          placeholder="ej: Chicó Norte / Laureles"
                          value={neighborhood}
                          onChange={(e) => setNeighborhood(e.target.value)}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 ${
                            formErrors.neighborhood ? 'border-red-400 bg-red-50/50' : 'border-slate-300 bg-white'
                          }`}
                        />
                        {formErrors.neighborhood && (
                          <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            {formErrors.neighborhood}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">
                          Dirección (Calle / Cra / Nro): <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="input-register-address"
                          required
                          placeholder="ej: Carrera 15 # 93-40"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 ${
                            formErrors.address ? 'border-red-400 bg-red-50/50' : 'border-slate-300 bg-white'
                          }`}
                        />
                        {formErrors.address && (
                          <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            {formErrors.address}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Complemento e Indicaciones */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-600 block">
                          Complemento (opcional):
                        </label>
                        <input
                          type="text"
                          id="input-register-complement"
                          placeholder="ej: Apto 402 / Interior 3"
                          value={complement}
                          onChange={(e) => setComplement(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-600 block">
                          Indicaciones de entrega:
                        </label>
                        <input
                          type="text"
                          id="input-register-notes"
                          placeholder="ej: Portería 24h / citófono 402"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Nav Step 2 Buttons */}
                  <div className="flex items-center space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setRegisterStep(1)}
                      className="px-4 py-3 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Atrás</span>
                    </button>

                    <button
                      type="button"
                      id="btn-register-step2-next"
                      onClick={() => {
                        if (validateStep2()) {
                          setRegisterStep(3);
                        }
                      }}
                      className="flex-1 py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20 hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <span>Siguiente: Seguridad & Términos</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Contraseña, Confirmar Contraseña & Términos */}
              {registerStep === 3 && (
                <form onSubmit={handleRegisterFinalSubmit} className="space-y-4 animate-fadeIn">
                  <div className="pb-1">
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                      Seguridad y Términos de Cuenta
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Crea tu clave segura y autoriza el tratamiento legal de datos para tu cuenta ColorLink.
                    </p>
                  </div>

                  {/* Password */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Contraseña: <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="input-register-password"
                        required
                        placeholder="Mínimo 6 caracteres"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 ${
                          formErrors.password ? 'border-red-400 bg-red-50/50' : 'border-slate-300 bg-white'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                        aria-label="Mostrar u ocultar contraseña"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {formErrors.password && (
                      <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {formErrors.password}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Confirmar contraseña: <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="input-register-confirmpassword"
                        required
                        placeholder="Repite tu contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 ${
                          formErrors.confirmPassword ? 'border-red-400 bg-red-50/50' : 'border-slate-300 bg-white'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                        aria-label="Mostrar u ocultar contraseña"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {formErrors.confirmPassword && (
                      <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {formErrors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {/* Legal Checkboxes: Terms & Data Policy */}
                  <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2.5 text-xs">
                    
                    {/* Términos y Condiciones */}
                    <label className="flex items-start space-x-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        id="checkbox-register-terms"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded-md border-amber-400 text-amber-600 focus:ring-amber-400 shrink-0"
                      />
                      <span className="text-slate-700 leading-snug">
                        Acepto los{' '}
                        <button
                          type="button"
                          onClick={(ev) => {
                            ev.preventDefault();
                            setShowTermsModal(true);
                          }}
                          className="font-bold text-amber-900 underline hover:text-amber-950"
                        >
                          Términos y Condiciones de ColorLink by Pintuco
                        </button>{' '}
                        y garantías de servicio. <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {formErrors.acceptTerms && (
                      <p className="text-[11px] text-red-600 pl-6 font-medium">
                        {formErrors.acceptTerms}
                      </p>
                    )}

                    {/* Política de Tratamiento de Datos (Habeas Data) */}
                    <label className="flex items-start space-x-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        id="checkbox-register-datapolicy"
                        checked={acceptDataPolicy}
                        onChange={(e) => setAcceptDataPolicy(e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded-md border-amber-400 text-amber-600 focus:ring-amber-400 shrink-0"
                      />
                      <span className="text-slate-700 leading-snug">
                        Autorizo la{' '}
                        <button
                          type="button"
                          onClick={(ev) => {
                            ev.preventDefault();
                            setShowTermsModal(true);
                          }}
                          className="font-bold text-amber-900 underline hover:text-amber-950"
                        >
                          Política de Tratamiento de Datos Personales
                        </button>{' '}
                        (Ley 1581 de 2012 Habeas Data Colombia). <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {formErrors.acceptDataPolicy && (
                      <p className="text-[11px] text-red-600 pl-6 font-medium">
                        {formErrors.acceptDataPolicy}
                      </p>
                    )}
                  </div>

                  {/* Navigation Step 3 Buttons */}
                  <div className="flex items-center space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setRegisterStep(2)}
                      className="px-4 py-3 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Atrás</span>
                    </button>

                    <button
                      type="submit"
                      id="btn-submit-register-final"
                      disabled={isSubmitting}
                      className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20 hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <span className="inline-block animate-spin mr-2">⚪</span>
                      ) : (
                        <CheckCircle2 className="w-4 h-4" />
                      )}
                      <span>{isSubmitting ? 'Registrando cuenta...' : 'Finalizar Registro'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* 3. REGISTERED SUCCESS CELEBRATION */}
          {/* ========================================================================= */}
          {authMode === 'registered_success' && createdUser && (
            <div className="text-center py-4 space-y-5 animate-fadeIn">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 to-yellow-400 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                  ✓ Cuenta Registrada y Activa
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
                  ¡Bienvenido a ColorLink Pintuco!
                </h3>
                <p className="text-sm text-slate-700 max-w-md mx-auto font-medium">
                  Tu cuenta ha sido creada y asociada a tu proyecto actual.
                </p>
              </div>

              {/* User Snapshot Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left max-w-sm mx-auto space-y-1.5 text-xs">
                <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                  <span className="font-mono text-[10px] text-slate-500 uppercase">Perfil Creado:</span>
                  <span className="font-bold text-amber-800 uppercase">{createdUser.clientType}</span>
                </div>
                <p className="font-bold text-slate-900 text-sm">{createdUser.name}</p>
                <p className="text-slate-600">{createdUser.email}</p>
                <p className="text-slate-600">{createdUser.phone} • {createdUser.city}</p>
                {createdUser.savedAddresses?.[0] && (
                  <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                    📍 Entrega: {createdUser.savedAddresses[0].address}, {createdUser.savedAddresses[0].neighborhood} ({createdUser.savedAddresses[0].locality || createdUser.savedAddresses[0].city})
                  </p>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  id="btn-register-continue-project"
                  onClick={() => {
                    if (onStartProjectDirectly) {
                      onStartProjectDirectly();
                    }
                    onClose();
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Continuar con mi proyecto</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-colors cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 4. FORGOT PASSWORD */}
          {/* ========================================================================= */}
          {authMode === 'forgot_password' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-center space-y-1">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Recuperación de Contraseña
                </h3>
                <p className="text-xs text-slate-600">
                  Te enviaremos un enlace seguro y código de restablecimiento a tu correo registrado.
                </p>
              </div>

              {forgotSubmitted ? (
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    ¡Correo de recuperación enviado!
                  </h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    Hemos enviado las instrucciones a <strong>{forgotEmail}</strong>. Revisa tu bandeja de entrada o spam.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setForgotSubmitted(false);
                    }}
                    className="mt-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 cursor-pointer"
                  >
                    Volver a Iniciar Sesión
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      Correo registrado:
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="ej: mi.correo@pintuco.co"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 ${
                          formErrors.forgotEmail ? 'border-red-400 bg-red-50/50' : 'border-slate-300 bg-white'
                        }`}
                      />
                    </div>
                    {formErrors.forgotEmail && (
                      <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {formErrors.forgotEmail}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span className="inline-block animate-spin mr-2">⚪</span>
                    ) : (
                      <Mail className="w-4 h-4" />
                    )}
                    <span>{isSubmitting ? 'Enviando enlace...' : 'Enviar enlace de recuperación'}</span>
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      ← Volver a Iniciar sesión
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Footer info ribbon */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Datos protegidos con cifrado SSL 256-bit</span>
          </div>
          <span className="font-mono text-[10px]">Pintuco Colombia</span>
        </div>
      </div>

      {/* Terms & Habeas Data Modal Popup */}
      {showTermsModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4 text-left max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>Términos y Tratamiento de Datos (Ley 1581)</span>
              </h3>
              <button
                onClick={() => setShowTermsModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-y-auto space-y-3 text-xs text-slate-600 leading-relaxed flex-1 pr-1">
              <p>
                <strong>1. Responsable del Tratamiento:</strong> Pintuco Colombia S.A. y la plataforma digital ColorLink tratan sus datos con estricto apego a la Ley Estatutaria 1581 de 2012 y el Decreto 1377 de 2013 de la República de Colombia.
              </p>
              <p>
                <strong>2. Finalidad:</strong> Los datos suministrados (nombre, documento, correo, celular, ubicación y fotos de espacios) se emplean exclusivamente para la calibración diagnóstica con Inteligencia Artificial, emisión de peritajes técnicos, gestión comercial de pedidos, despacho a través de la red Pintacasa y soporte postventa.
              </p>
              <p>
                <strong>3. Derechos del Titular:</strong> Usted puede conocer, actualizar, rectificar o solicitar la supresión de sus datos en cualquier momento a través del canal oficial de atención al cliente Pintuco.
              </p>
              <p>
                <strong>4. Garantías de Producto:</strong> Los recubrimientos Pintuco cuentan con respaldo oficial de fábrica contra descascare, hongos y pérdida de brillo según la ficha técnica de cada línea seleccionada.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowTermsModal(false)}
              className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs cursor-pointer"
            >
              Entendido y de acuerdo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
