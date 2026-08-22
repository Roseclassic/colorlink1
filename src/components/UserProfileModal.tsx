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
  ArrowRight,
  LogOut,
  Package,
  Clock,
  Plus,
  Trash2,
  Edit3,
  FileText,
  AlertTriangle,
  ChevronRight,
  Store,
  Truck
} from 'lucide-react';
import { ClientUser, SavedAddress, ProjectRequest, ProjectOrder } from '../types';

interface UserProfileModalProps {
  user: ClientUser | null;
  requests: ProjectRequest[];
  orders?: ProjectOrder[];
  onUpdateUser: (updated: Partial<ClientUser>) => void;
  onLogout: () => void;
  onClose: () => void;
  onNavigateToRequests: () => void;
}

const COLOMBIAN_CITIES = [
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
  'Pasto',
  'Armenia',
  'Montería',
  'Valledupar',
  'Neiva'
];

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  user,
  requests,
  orders = [],
  onUpdateUser,
  onLogout,
  onClose,
  onNavigateToRequests
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'orders' | 'addresses'>('profile');
  
  // Profile Form States
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [city, setCity] = useState(user?.city || 'Bogotá D.C.');
  const [clientType, setClientType] = useState<'particular' | 'empresa'>(user?.clientType || 'particular');
  const [docType, setDocType] = useState(user?.documentType || 'CC');
  const [docNumber, setDocNumber] = useState(user?.documentNumber || '');
  const [companyName, setCompanyName] = useState(user?.companyName || '');
  const [companyNit, setCompanyNit] = useState(user?.companyNit || '');
  const [responsibleName, setResponsibleName] = useState(user?.responsibleName || '');

  // Saved addresses state
  const [addresses, setAddresses] = useState<SavedAddress[]>(
    user?.savedAddresses || [
      {
        id: 'addr-1',
        label: 'Residencia Principal',
        address: 'Carrera 15 # 93-40, Apto 402',
        city: user?.city || 'Bogotá D.C.',
        neighborhood: 'Chicó Norte',
        details: 'Edificio Torre Andina, citófono 402',
        isDefault: true
      }
    ]
  );

  // New Address Form State
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddrLabel, setNewAddrLabel] = useState('Casa');
  const [newAddrAddress, setNewAddrAddress] = useState('');
  const [newAddrCity, setNewAddrCity] = useState(user?.city || 'Bogotá D.C.');
  const [newAddrNeighborhood, setNewAddrNeighborhood] = useState('');
  const [newAddrDetails, setNewAddrDetails] = useState('');

  // Logout confirm modal
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  // Filter requests associated with this user
  const userRequests = requests.filter(
    (r) => !user?.email || r.clientEmail === user.email || r.clientName === user.name
  );

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      name: clientType === 'particular' ? name : companyName,
      email,
      phone,
      city,
      clientType,
      documentType: clientType === 'particular' ? docType : 'NIT',
      documentNumber: docNumber,
      companyName: clientType === 'empresa' ? companyName : undefined,
      companyNit: clientType === 'empresa' ? companyNit : undefined,
      responsibleName: clientType === 'empresa' ? responsibleName : undefined,
      savedAddresses: addresses
    });
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 2500);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrAddress.trim()) return;

    const newAddr: SavedAddress = {
      id: `addr-${Date.now()}`,
      label: newAddrLabel,
      address: newAddrAddress.trim(),
      city: newAddrCity,
      neighborhood: newAddrNeighborhood.trim(),
      details: newAddrDetails.trim(),
      isDefault: addresses.length === 0
    };

    const updated = [...addresses, newAddr];
    setAddresses(updated);
    onUpdateUser({ savedAddresses: updated });
    
    // Reset form
    setNewAddrAddress('');
    setNewAddrNeighborhood('');
    setNewAddrDetails('');
    setShowAddAddress(false);
  };

  const handleDeleteAddress = (id: string) => {
    const updated = addresses.filter((a) => a.id !== id);
    setAddresses(updated);
    onUpdateUser({ savedAddresses: updated });
  };

  const handleSetDefaultAddress = (id: string) => {
    const updated = addresses.map((a) => ({
      ...a,
      isDefault: a.id === id
    }));
    setAddresses(updated);
    onUpdateUser({ savedAddresses: updated });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn text-slate-800">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden text-left flex flex-col max-h-[92vh]">
        
        {/* Top Pintuco Accent Header */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 shrink-0" />

        {/* Modal Top Bar */}
        <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-400 text-slate-950 flex items-center justify-center font-bold text-lg shadow-sm">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider font-mono">
                  Mi Espacio Pintuco
                </span>
                <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                  {user?.clientType === 'empresa' ? 'Cuenta B2B' : 'Particular'}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                {user?.name || 'Cliente ColorLink'}
              </h2>
              <p className="text-xs text-slate-500">
                {user?.email || 'usuario@pintuco-cliente.co'} • {user?.city || 'Colombia'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Tabs Bar */}
        <div className="flex items-center space-x-1 p-1.5 mx-5 sm:mx-6 mt-3 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold overflow-x-auto shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`py-2 px-3 sm:px-4 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5 text-amber-600" />
            <span>Mi perfil</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('projects')}
            className={`py-2 px-3 sm:px-4 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>Mis proyectos</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 text-slate-800">
              {userRequests.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`py-2 px-3 sm:px-4 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Package className="w-3.5 h-3.5 text-emerald-600" />
            <span>Mis pedidos</span>
            {orders.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 text-emerald-800">
                {orders.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('addresses')}
            className={`py-2 px-3 sm:px-4 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'addresses'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            <span>Direcciones</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 text-slate-800">
              {addresses.length}
            </span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-4 flex-1">
          
          {saveSuccessNotice && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Información actualizada correctamente en el ecosistema ColorLink Pintuco.</span>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 1: MI PERFIL */}
          {/* ========================================================================= */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4 animate-fadeIn">
              
              {/* Type Switcher */}
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
                        ? 'bg-blue-50/80 border-blue-400 text-blue-900 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <span>Empresa / B2B</span>
                  </button>
                </div>
              </div>

              {clientType === 'particular' ? (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Nombre completo:</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">Tipo Doc:</label>
                      <select
                        value={docType}
                        onChange={(e) => setDocType(e.target.value as any)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold"
                      >
                        <option value="CC">Cédula (CC)</option>
                        <option value="CE">Extranjería (CE)</option>
                        <option value="Pasaporte">Pasaporte</option>
                      </select>
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700 block">Número de documento:</label>
                      <input
                        type="text"
                        value={docNumber}
                        placeholder="ej: 1.020.458.120"
                        onChange={(e) => setDocNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 bg-white"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Razón social / Empresa:</label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">NIT:</label>
                      <input
                        type="text"
                        value={companyNit}
                        placeholder="ej: 901.458.720-3"
                        onChange={(e) => setCompanyNit(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 bg-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">Persona responsable:</label>
                      <input
                        type="text"
                        value={responsibleName}
                        placeholder="ej: Marcela Gómez"
                        onChange={(e) => setResponsibleName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 bg-white"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Correo electrónico:</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Celular (Colombia):</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>
              </div>

              {/* City */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Ciudad de residencia / operaciones:</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                >
                  {COLOMBIAN_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Guardar cambios de mi perfil</span>
                </button>
              </div>
            </form>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: MIS PROYECTOS */}
          {/* ========================================================================= */}
          {activeTab === 'projects' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between pb-1">
                <h3 className="text-sm font-bold text-slate-900">
                  Solicitudes y Peritajes IA ({userRequests.length})
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateToRequests();
                  }}
                  className="text-xs font-bold text-amber-800 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver tablero completo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {userRequests.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <Clock className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-600 font-semibold">No tienes solicitudes activas en este momento.</p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigateToRequests();
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs cursor-pointer"
                  >
                    Crear mi primer proyecto
                  </button>
                </div>
              ) : (
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {userRequests.map((r) => (
                    <div
                      key={r.id}
                      className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-amber-300 transition-all flex items-center justify-between gap-3 shadow-xs"
                    >
                      <div className="space-y-1 truncate">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                            {r.id}
                          </span>
                          <span className="text-xs font-bold text-slate-900 truncate">
                            {r.specificArea || r.spaceType}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">
                          {r.surfaceType} • {r.estimatedM2} m² • {r.clientCity}
                        </p>
                      </div>

                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 capitalize shrink-0">
                        {r.status.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: MIS PEDIDOS */}
          {/* ========================================================================= */}
          {activeTab === 'orders' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between pb-1">
                <h3 className="text-sm font-bold text-slate-900">
                  Órdenes y Despachos Pintuco
                </h3>
              </div>

              {orders.length === 0 ? (
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">Sin compras recientes registradas</h4>
                      <p className="text-[11px] text-slate-500">
                        Al completar el checkout con Wompi, PSE o Tarjeta, tus pedidos aparecerán aquí con seguimiento en tiempo real.
                      </p>
                    </div>
                  </div>
                  
                  {/* Sample Order Mock for demonstration */}
                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1 text-slate-600">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>Última cotización lista:</span>
                      <span className="text-amber-800">$284.500 COP</span>
                    </div>
                    <p className="text-[11px]">Viniltex® Advanced Blanco + Sellomax + Rodillo Felpa</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5 max-h-72 overflow-y-auto">
                  {orders.map((o) => (
                    <div
                      key={o.id}
                      className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            {o.code}
                          </span>
                          <span className="text-xs font-bold text-slate-900">
                            ${o.totalCOP.toLocaleString('es-CO')} COP
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                          {o.status.replace('_', ' ')}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-500 flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          {o.deliveryOption === 'domicilio' ? <Truck className="w-3.5 h-3.5 text-amber-600" /> : <Store className="w-3.5 h-3.5 text-amber-600" />}
                          {o.deliveryOption === 'domicilio' ? o.deliveryAddress : o.selectedStore}
                        </span>
                        <span>{o.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: DIRECCIONES */}
          {/* ========================================================================= */}
          {activeTab === 'addresses' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-1">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Direcciones de Despacho</h3>
                  <p className="text-[11px] text-slate-500">
                    Administra tus puntos de entrega para recibir pintura y materiales.
                  </p>
                </div>
                {!showAddAddress && (
                  <button
                    type="button"
                    onClick={() => setShowAddAddress(true)}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold flex items-center gap-1 hover:bg-amber-400 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar</span>
                  </button>
                )}
              </div>

              {/* Add address sub-form */}
              {showAddAddress ? (
                <form onSubmit={handleAddAddress} className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3">
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-xs font-bold text-amber-900">Nueva Dirección:</span>
                    <button
                      type="button"
                      onClick={() => setShowAddAddress(false)}
                      className="text-xs text-slate-500 hover:text-slate-800"
                    >
                      Cancelar
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 block">Etiqueta:</label>
                      <input
                        type="text"
                        placeholder="ej: Casa, Oficina, Bodega"
                        value={newAddrLabel}
                        onChange={(e) => setNewAddrLabel(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 block">Ciudad:</label>
                      <select
                        value={newAddrCity}
                        onChange={(e) => setNewAddrCity(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                      >
                        {COLOMBIAN_CITIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 block">Dirección exacta:</label>
                    <input
                      type="text"
                      required
                      placeholder="ej: Carrera 15 # 93-40, Apto 402"
                      value={newAddrAddress}
                      onChange={(e) => setNewAddrAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 block">Barrio / Sector:</label>
                      <input
                        type="text"
                        placeholder="ej: Chicó Norte"
                        value={newAddrNeighborhood}
                        onChange={(e) => setNewAddrNeighborhood(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 block">Indicaciones:</label>
                      <input
                        type="text"
                        placeholder="ej: Portería 24h"
                        value={newAddrDetails}
                        onChange={(e) => setNewAddrDetails(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 cursor-pointer"
                  >
                    Guardar Dirección
                  </button>
                </form>
              ) : (
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-amber-300 transition-all flex items-start justify-between gap-3 shadow-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{addr.label}</span>
                          {addr.isDefault && (
                            <span className="px-2 py-0.2 rounded-full text-[9px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                              Principal
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-700 font-medium">{addr.address}</p>
                        <p className="text-[11px] text-slate-500">
                          {addr.neighborhood ? `${addr.neighborhood}, ` : ''}{addr.city}
                          {addr.details ? ` (${addr.details})` : ''}
                        </p>
                      </div>

                      <div className="flex items-center space-x-1 shrink-0">
                        {!addr.isDefault && (
                          <button
                            type="button"
                            onClick={() => handleSetDefaultAddress(addr.id)}
                            className="px-2 py-1 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                          >
                            Hacer principal
                          </button>
                        )}
                        {addresses.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleDeleteAddress(addr.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer with Cerrar Sesión button */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
            className="px-3.5 py-2 rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar sesión</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
          >
            Cerrar ventana
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 border border-slate-200 shadow-2xl text-center space-y-4 animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center">
              <LogOut className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-base text-slate-900">¿Cerrar sesión de ColorLink?</h3>
              <p className="text-xs text-slate-600">
                Se limpiará la sesión simulada y volverás a la pantalla de bienvenida.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLogoutConfirm(false);
                  onLogout();
                  onClose();
                }}
                className="py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 shadow-sm cursor-pointer"
              >
                Sí, cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
