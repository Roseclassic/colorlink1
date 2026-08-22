import React, { useState, useEffect } from 'react';
import {
  Truck,
  MapPin,
  Navigation,
  CheckCircle2,
  Clock,
  Store,
  ShieldCheck,
  ArrowRight,
  ChevronLeft,
  Sparkles,
  Search,
  Filter,
  Check,
  AlertCircle,
  Building2,
  Phone,
  Layers,
  ShoppingBag,
  Info,
  Compass
} from 'lucide-react';
import {
  ClientProjectInput,
  CartItem,
  DeliveryDetails,
  PintacasaStore
} from '../../types';
import {
  PINTACASA_STORES_COLOMBIA,
  getStoresForLocation,
  findSmartRecommendedStore
} from '../../data/storesData';
import {
  COLOMBIA_CITIES_CONFIG,
  getLocalitiesForCity,
  calculateSimulatedCoordinates
} from '../../data/colombiaLocations';

interface StepSmartDeliveryAndLocationProps {
  input: ClientProjectInput;
  cartItems: CartItem[];
  currentDelivery?: DeliveryDetails | null;
  onConfirmDelivery: (delivery: DeliveryDetails) => void;
  onBack: () => void;
}

export const StepSmartDeliveryAndLocation: React.FC<StepSmartDeliveryAndLocationProps> = ({
  input,
  cartItems,
  currentDelivery,
  onConfirmDelivery,
  onBack
}) => {
  // Delivery Mode Selection
  const [deliveryMode, setDeliveryMode] = useState<'domicilio' | 'recoger_tienda'>(
    currentDelivery?.tipo_entrega || 'domicilio'
  );

  // Address Form State
  const [city, setCity] = useState(currentDelivery?.ciudad || input.city || 'Bogotá D.C.');
  const [localidad, setLocalidad] = useState(currentDelivery?.localidad || 'Chapinero');
  const [address, setAddress] = useState(currentDelivery?.direccion || 'Carrera 15 # 93-40');
  const [barrio, setBarrio] = useState(currentDelivery?.barrio || 'Chicó Norte');
  const [complemento, setComplemento] = useState(currentDelivery?.complemento || 'Apto 402');
  const [instrucciones, setInstrucciones] = useState(
    currentDelivery?.instrucciones || 'Dejar en portería con el celador de turno.'
  );

  // Geolocation Simulation & Coordinates
  const [isLocating, setIsLocating] = useState(false);
  const [coordinates, setCoordinates] = useState(() => {
    if (currentDelivery?.latitud && currentDelivery?.longitud) {
      return { lat: currentDelivery.latitud, lng: currentDelivery.longitud };
    }
    return calculateSimulatedCoordinates(city, localidad, barrio, address);
  });

  // Keep coordinates and localities updated when city/localidad/address change
  useEffect(() => {
    const availableLocs = getLocalitiesForCity(city);
    if (!availableLocs.includes(localidad)) {
      setLocalidad(availableLocs[0] || 'Zona Principal');
    }
  }, [city]);

  useEffect(() => {
    const newCoords = calculateSimulatedCoordinates(city, localidad, barrio, address);
    setCoordinates(newCoords);
  }, [city, localidad, barrio, address]);

  // Address Confirmed Toggle
  const [isAddressConfirmed, setIsAddressConfirmed] = useState<boolean>(
    currentDelivery?.direccion_confirmada ?? true
  );

  // Stores & Store Filters
  const [storeViewMode, setStoreViewMode] = useState<'lista' | 'mapa'>('lista');
  const [storeFilter, setStoreFilter] = useState<'cercana' | 'hoy' | 'todo_stock'>('cercana');
  const [selectedStoreId, setSelectedStoreId] = useState<string>(
    currentDelivery?.tienda_id || 'ptc-bogota-chico'
  );
  const [searchStoreQuery, setSearchStoreQuery] = useState('');

  // Cart Calculations
  const subtotalCOP = cartItems.reduce((acc, it) => acc + it.unitPriceCOP * it.quantity, 0);
  const isFreeShipping = subtotalCOP >= 150000;
  const shippingCostCOP = deliveryMode === 'domicilio' ? (isFreeShipping ? 0 : 12500) : 0;
  const totalCOP = subtotalCOP + shippingCostCOP;
  const totalItemsCount = cartItems.reduce((sum, it) => sum + it.quantity, 0);

  // Stores Data computation with dynamic location
  const availableStores = getStoresForLocation(city, localidad, barrio, address, cartItems);
  const { recommendedStore, reason: smartRecommendationReason } = findSmartRecommendedStore(availableStores);

  // Filtered Stores
  const filteredStores = availableStores
    .filter((s) => {
      if (searchStoreQuery.trim()) {
        const q = searchStoreQuery.toLowerCase();
        return (
          s.nombre.toLowerCase().includes(q) ||
          s.direccion.toLowerCase().includes(q) ||
          s.localidad.toLowerCase().includes(q) ||
          (s.barrio && s.barrio.toLowerCase().includes(q))
        );
      }
      return true;
    })
    .filter((s) => {
      if (storeFilter === 'hoy') {
        return s.tiempo_estimado_recogida.toLowerCase().includes('hora') || s.tiempo_estimado_recogida.toLowerCase().includes('hoy');
      }
      if (storeFilter === 'todo_stock') {
        return s.availableItemsCount === s.stockTotalItems;
      }
      return true; // 'cercana'
    })
    .sort((a, b) => {
      if (storeFilter === 'cercana') return a.distancia_km - b.distancia_km;
      return 0;
    });

  const activeSelectedStore =
    availableStores.find((s) => s.tienda_id === selectedStoreId) || recommendedStore;

  // Handler for Geolocation
  const handleUseMyLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setTimeout(() => {
            setCoordinates({
              lat: Number(pos.coords.latitude.toFixed(4)),
              lng: Number(pos.coords.longitude.toFixed(4))
            });
            setIsLocating(false);
            setIsAddressConfirmed(true);
          }, 600);
        },
        () => {
          // Fallback simulation for major Colombian cities
          setTimeout(() => {
            setCoordinates({ lat: 4.6792, lng: -74.0531 });
            setIsLocating(false);
            setIsAddressConfirmed(true);
          }, 600);
        }
      );
    } else {
      setTimeout(() => {
        setCoordinates({ lat: 4.6792, lng: -74.0531 });
        setIsLocating(false);
        setIsAddressConfirmed(true);
      }, 600);
    }
  };

  // Build Delivery structured object
  const handleProceedToPayment = () => {
    const deliveryPayload: DeliveryDetails = {
      tipo_entrega: deliveryMode,
      direccion: deliveryMode === 'domicilio' ? address : activeSelectedStore.direccion,
      ciudad: city,
      localidad: deliveryMode === 'domicilio' ? localidad : activeSelectedStore.localidad,
      barrio: deliveryMode === 'domicilio' ? barrio : activeSelectedStore.barrio || 'Centro Comercial / Punto Aliado',
      complemento: deliveryMode === 'domicilio' ? complemento : undefined,
      latitud: deliveryMode === 'domicilio' ? coordinates.lat : activeSelectedStore.latitud,
      longitud: deliveryMode === 'domicilio' ? coordinates.lng : activeSelectedStore.longitud,
      tienda_id: deliveryMode === 'recoger_tienda' ? activeSelectedStore.tienda_id : undefined,
      tienda_nombre: deliveryMode === 'recoger_tienda' ? activeSelectedStore.nombre : undefined,
      distancia_km: deliveryMode === 'recoger_tienda' ? activeSelectedStore.distancia_km : 2.5,
      costo_envio: shippingCostCOP,
      fecha_estimada: deliveryMode === 'domicilio' ? 'Mañana, 8:00 AM - 1:00 PM' : 'Hoy mismo',
      tiempo_estimado: deliveryMode === 'domicilio' ? '24 a 48 horas hábiles' : activeSelectedStore.tiempo_estimado_recogida,
      instrucciones: deliveryMode === 'domicilio' ? instrucciones : `Recoger a nombre de ${input.clientName || 'Cliente ColorLink'}`,
      direccion_confirmada: isAddressConfirmed,
      disponibilidad_stock: 'todos_disponibles'
    };

    onConfirmDelivery(deliveryPayload);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Header banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold font-mono uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Logística & Puntos Pintacasa Colombia</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
              Entrega y Ubicación Inteligente
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              Selecciona cómo recibir tus materiales Pintuco dosificados para tu proyecto ({totalItemsCount} productos formulados).
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <div className="text-xs">
              <p className="font-bold text-slate-900">Garantía Directa</p>
              <p className="text-slate-500">Despacho Oficial Pintuco</p>
            </div>
          </div>
        </div>
      </div>

      {/* 1. ¿Cómo quieres recibir tu pedido? (Two big visual tabs) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            <span>1. ¿Cómo quieres recibir tu pedido?</span>
          </label>
          <span className="text-xs text-slate-500">Paso 1 de 2 para entrega</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Opción 1: Envío a domicilio */}
          <button
            type="button"
            onClick={() => setDeliveryMode('domicilio')}
            className={`p-5 rounded-2xl border-2 text-left transition-all relative cursor-pointer group ${
              deliveryMode === 'domicilio'
                ? 'border-amber-500 bg-amber-50/40 shadow-sm ring-2 ring-amber-200'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3.5">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                    deliveryMode === 'domicilio'
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                  }`}
                >
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base font-display">
                    Envío a domicilio
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Entregamos directo en tu casa, obra o proyecto
                  </p>
                </div>
              </div>

              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  deliveryMode === 'domicilio'
                    ? 'border-amber-500 bg-amber-500 text-slate-950'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {deliveryMode === 'domicilio' && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
              <span className="text-slate-600 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>Tiempo: 24 - 48 horas</span>
              </span>
              <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                {isFreeShipping ? '¡Envío Gratis!' : '$12.500 COP'}
              </span>
            </div>
          </button>

          {/* Opción 2: Recoger en tienda */}
          <button
            type="button"
            onClick={() => setDeliveryMode('recoger_tienda')}
            className={`p-5 rounded-2xl border-2 text-left transition-all relative cursor-pointer group ${
              deliveryMode === 'recoger_tienda'
                ? 'border-amber-500 bg-amber-50/40 shadow-sm ring-2 ring-amber-200'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3.5">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                    deliveryMode === 'recoger_tienda'
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                  }`}
                >
                  <Store className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-slate-900 text-base font-display">
                      Recoger en tienda
                    </h3>
                    <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.2 rounded-full uppercase">
                      Pintacasa
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Sin costo de envío en puntos oficiales aliados
                  </p>
                </div>
              </div>

              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  deliveryMode === 'recoger_tienda'
                    ? 'border-amber-500 bg-amber-500 text-slate-950'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {deliveryMode === 'recoger_tienda' && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
              <span className="text-slate-600 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Listo hoy en {recommendedStore.distancia_km} km</span>
              </span>
              <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                $0 COP (Gratis)
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* 2. CONTENIDO CONDICIONAL: ENVÍO A DOMICILIO */}
      {deliveryMode === 'domicilio' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base font-display">
                    Dirección de Despacho
                  </h3>
                  <p className="text-xs text-slate-500">
                    Ingresa los datos exactos para la entrega en Colombia
                  </p>
                </div>
              </div>

              {/* Botón: Usar mi ubicación */}
              <button
                type="button"
                onClick={handleUseMyLocation}
                disabled={isLocating}
                className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
              >
                <Navigation className={`w-3.5 h-3.5 text-amber-600 ${isLocating ? 'animate-spin' : ''}`} />
                <span>{isLocating ? 'Obteniendo GPS...' : 'Usar mi ubicación actual'}</span>
              </button>
            </div>

            {/* Formulario simple */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono tracking-wider mb-1.5">
                  Ciudad *
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                >
                  {COLOMBIA_CITIES_CONFIG.map((c) => (
                    <option key={c.city} value={c.city}>
                      {c.city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono tracking-wider mb-1.5">
                  Localidad / Zona *
                </label>
                <select
                  value={localidad}
                  onChange={(e) => setLocalidad(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                >
                  {getLocalitiesForCity(city).map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono tracking-wider mb-1.5">
                  Dirección exacta *
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setIsAddressConfirmed(false);
                  }}
                  placeholder="Ej. Calle 94 # 14-38"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono tracking-wider mb-1.5">
                  Barrio *
                </label>
                <input
                  type="text"
                  value={barrio}
                  onChange={(e) => setBarrio(e.target.value)}
                  placeholder="Ej. Chicó Norte, Laureles, Granada"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono tracking-wider mb-1.5">
                  Complemento de dirección (Opcional)
                </label>
                <input
                  type="text"
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                  placeholder="Ej. Apto 402, Torre B, Casa 15"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono tracking-wider mb-1.5">
                  Indicaciones de entrega (Opcional)
                </label>
                <input
                  type="text"
                  value={instrucciones}
                  onChange={(e) => setInstrucciones(e.target.value)}
                  placeholder="Ej. Dejar en portería, timbrar en el 402"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
            </div>

            {/* Mock Map Preview & Verified Location */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-amber-600" />
                  <span>Ubicación en mapa georreferenciado (Simulación GPS Pintuco)</span>
                </span>
                <span className="font-mono text-[11px] text-slate-400">
                  Lat: {coordinates.lat.toFixed(4)} | Lng: {coordinates.lng.toFixed(4)}
                </span>
              </div>

              {/* Visual Map Canvas Container */}
              <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                {/* SVG Visual Map styling (roads, grid, river & markers) */}
                <div className="absolute inset-0 bg-[#eef2f5] flex items-center justify-center">
                  <svg className="w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cbd5e1" strokeWidth="0.75" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                    {/* Simulated main avenues */}
                    <line x1="0" y1="35%" x2="100%" y2="40%" stroke="#ffffff" strokeWidth="12" />
                    <line x1="0" y1="35%" x2="100%" y2="40%" stroke="#f59e0b" strokeWidth="4" />
                    <line x1="30%" y1="0" x2="35%" y2="100%" stroke="#ffffff" strokeWidth="10" />
                    <line x1="30%" y1="0" x2="35%" y2="100%" stroke="#cbd5e1" strokeWidth="2" />
                    <line x1="75%" y1="0" x2="65%" y2="100%" stroke="#ffffff" strokeWidth="8" />
                    <circle cx="50%" cy="50%" r="90" fill="#fef3c7" opacity="0.4" />
                  </svg>
                </div>

                {/* Radar pulse effect at center */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-24 h-24 rounded-full bg-amber-400/20 animate-ping" />
                </div>

                {/* Pin Destination (Client location) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center">
                  <div className="px-3 py-1.5 rounded-xl bg-slate-950 text-white text-[11px] font-bold shadow-lg flex items-center space-x-1.5 whitespace-nowrap mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{address || 'Dirección de Entrega'}</span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-amber-500 border-3 border-white text-slate-950 flex items-center justify-center shadow-lg">
                    <MapPin className="w-5 h-5 fill-slate-950" />
                  </div>
                </div>

                {/* Map Controls */}
                <div className="absolute bottom-3 right-3 flex flex-col space-y-1">
                  <button
                    type="button"
                    onClick={() => setCoordinates(prev => ({ lat: prev.lat + 0.001, lng: prev.lng }))}
                    className="w-7 h-7 rounded-lg bg-white/90 shadow text-slate-700 font-bold flex items-center justify-center text-xs hover:bg-white cursor-pointer"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => setCoordinates(prev => ({ lat: prev.lat - 0.001, lng: prev.lng }))}
                    className="w-7 h-7 rounded-lg bg-white/90 shadow text-slate-700 font-bold flex items-center justify-center text-xs hover:bg-white cursor-pointer"
                  >
                    -
                  </button>
                </div>

                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-2 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-bold text-slate-800">Cobertura Directa Pintuco Colombia</span>
                </div>
              </div>

              {/* Delivery verification details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="space-y-0.5">
                  <p className="text-[11px] font-bold text-slate-500 uppercase font-mono">Costo estimado:</p>
                  <p className="text-sm font-black text-slate-900 font-mono">
                    {isFreeShipping ? 'GRATIS (Pedido > $150k)' : '$12.500 COP'}
                  </p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-[11px] font-bold text-slate-500 uppercase font-mono">Tiempo estimado:</p>
                  <p className="text-sm font-bold text-slate-900">24 a 48 horas hábiles</p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-[11px] font-bold text-slate-500 uppercase font-mono">Disponibilidad:</p>
                  <p className="text-sm font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Todos los productos listos</span>
                  </p>
                </div>
              </div>

              {/* Confirm Address Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="text-xs text-slate-500">
                  {isAddressConfirmed ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Dirección validada y lista para despacho</span>
                    </span>
                  ) : (
                    <span>Por favor confirma tu dirección para calcular la ruta exacta.</span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddressConfirmed(true)}
                  className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                    isAddressConfirmed
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>{isAddressConfirmed ? '✓ Sí, esta es mi dirección' : 'Sí, esta es mi dirección'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. CONTENIDO CONDICIONAL: RECOGER EN TIENDA */}
      {deliveryMode === 'recoger_tienda' && (
        <div className="space-y-6">
          {/* 4. SMART RECOMMENDATION BANNER (Selección inteligente Pintuco) */}
          <div className="p-5 sm:p-6 rounded-3xl bg-linear-to-r from-amber-50 via-amber-100/60 to-white border-2 border-amber-400/80 shadow-xs space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-amber-950 font-mono">
                      ⭐ Mejor opción para tu pedido
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                      100% Stock
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base font-display">
                    {recommendedStore.nombre}
                  </h4>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedStoreId(recommendedStore.tienda_id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  selectedStoreId === recommendedStore.tienda_id
                    ? 'bg-amber-600 text-white'
                    : 'bg-white border border-amber-300 text-amber-900 hover:bg-amber-100'
                }`}
              >
                {selectedStoreId === recommendedStore.tienda_id ? '✓ Seleccionada' : 'Elegir esta tienda'}
              </button>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              {smartRecommendationReason}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-600">
              <span className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 font-semibold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-600" />
                <span>{recommendedStore.direccion}</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3 text-emerald-600" />
                <span>{recommendedStore.tiempo_estimado_recogida}</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 font-semibold font-mono text-emerald-800">
                A solo {recommendedStore.distancia_km} km
              </span>
            </div>
          </div>

          {/* Controls: Search, View Mode (Mapa / Lista) & Filters */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-5 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Search & City */}
              <div className="flex items-center space-x-2 flex-1">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchStoreQuery}
                    onChange={(e) => setSearchStoreQuery(e.target.value)}
                    placeholder="Buscar tienda Pintacasa por barrio, dirección o nombre..."
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-none"
                >
                  <option value="Bogotá D.C.">Bogotá D.C.</option>
                  <option value="Medellín">Medellín</option>
                  <option value="Cali">Cali</option>
                  <option value="Barranquilla">Barranquilla</option>
                  <option value="Bucaramanga">Bucaramanga</option>
                </select>
              </div>

              {/* View toggle: Mapa | Lista */}
              <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl shrink-0 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setStoreViewMode('lista')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    storeViewMode === 'lista'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Lista ({filteredStores.length})
                </button>
                <button
                  type="button"
                  onClick={() => setStoreViewMode('mapa')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    storeViewMode === 'mapa'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Mapa Interactivo
                </button>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-400 font-mono flex items-center gap-1 mr-1">
                <Filter className="w-3 h-3" /> Filtros:
              </span>
              <button
                type="button"
                onClick={() => setStoreFilter('cercana')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  storeFilter === 'cercana'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                📍 Más cercana
              </button>
              <button
                type="button"
                onClick={() => setStoreFilter('hoy')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  storeFilter === 'hoy'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                ⚡ Disponible hoy
              </button>
              <button
                type="button"
                onClick={() => setStoreFilter('todo_stock')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  storeFilter === 'todo_stock'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                ✓ Todos los productos en stock
              </button>
            </div>

            {/* VIEW MODE: MAPA */}
            {storeViewMode === 'mapa' && (
              <div className="relative w-full h-80 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                {/* SVG Mock Map */}
                <div className="absolute inset-0 bg-[#eef2f5] flex items-center justify-center">
                  <svg className="w-full h-full opacity-70" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#f1f5f9" />
                    <line x1="10%" y1="0" x2="80%" y2="100%" stroke="#ffffff" strokeWidth="16" />
                    <line x1="10%" y1="0" x2="80%" y2="100%" stroke="#e2e8f0" strokeWidth="4" />
                    <line x1="0" y1="45%" x2="100%" y2="55%" stroke="#ffffff" strokeWidth="20" />
                    <line x1="0" y1="45%" x2="100%" y2="55%" stroke="#f59e0b" strokeWidth="6" />
                    <circle cx="35%" cy="40%" r="50" fill="#fef3c7" opacity="0.5" />
                    <circle cx="70%" cy="60%" r="60" fill="#e0e7ff" opacity="0.3" />
                  </svg>
                </div>

                {/* Store Pins on Map */}
                {filteredStores.map((store, idx) => {
                  const isSelected = selectedStoreId === store.tienda_id;
                  const isRec = store.tienda_id === recommendedStore.tienda_id;

                  // Stagger pin positions on mock canvas
                  const leftPercent = 25 + (idx * 22) % 65;
                  const topPercent = 30 + (idx * 28) % 55;

                  return (
                    <button
                      key={store.tienda_id}
                      type="button"
                      onClick={() => setSelectedStoreId(store.tienda_id)}
                      style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10"
                    >
                      <div
                        className={`px-2.5 py-1 rounded-xl text-[10px] font-bold shadow-md transition-transform group-hover:scale-105 whitespace-nowrap mb-1 flex items-center gap-1 ${
                          isSelected
                            ? 'bg-slate-950 text-white ring-2 ring-amber-400'
                            : 'bg-white text-slate-800 border border-slate-200'
                        }`}
                      >
                        {isRec && <span>⭐</span>}
                        <span>{store.nombre.replace('Pintacasa Pintuco ', '')}</span>
                        <span className="font-mono text-amber-600">({store.distancia_km}km)</span>
                      </div>

                      <div
                        className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center shadow-lg transition-all ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 scale-125 ring-4 ring-amber-300/60'
                            : isRec
                            ? 'bg-amber-400 text-slate-950'
                            : 'bg-slate-800 text-white'
                        }`}
                      >
                        <Store className="w-4 h-4" />
                      </div>
                    </button>
                  );
                })}

                {/* Selected Store Floating Drawer in Map */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200 shadow-md flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-bold text-slate-900 text-xs truncate font-display">
                      {activeSelectedStore.nombre}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {activeSelectedStore.direccion} • {activeSelectedStore.tiempo_estimado_recogida}
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 font-mono font-bold text-xs shrink-0 border border-emerald-200">
                    ✓ Seleccionada
                  </span>
                </div>
              </div>
            )}

            {/* VIEW MODE: LISTA DE TIENDAS */}
            {storeViewMode === 'lista' && (
              <div className="space-y-3">
                {filteredStores.map((store) => {
                  const isSelected = selectedStoreId === store.tienda_id;
                  const isRec = store.tienda_id === recommendedStore.tienda_id;

                  return (
                    <div
                      key={store.tienda_id}
                      onClick={() => setSelectedStoreId(store.tienda_id)}
                      className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/40 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-sm sm:text-base font-display">
                              {store.nombre}
                            </h4>
                            {isRec && (
                              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] uppercase font-mono">
                                ⭐ Recomendada
                              </span>
                            )}
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono font-bold text-[10px]">
                              {store.distancia_km} km de distancia
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span>{store.direccion}, {store.localidad}</span>
                          </p>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 pt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              <span>{store.horario}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-3.5 h-3.5 text-slate-400" />
                              <span>{store.telefono}</span>
                            </span>
                          </div>

                          {/* Features Pills */}
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {store.features.map((feat, i) => (
                              <span
                                key={i}
                                className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                              >
                                {feat}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Store Availability & Action */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                          <div className="text-left sm:text-right">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
                              <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                              <span>{store.availableItemsCount}/{store.stockTotalItems} Disponibles</span>
                            </span>
                            <p className="text-[11px] text-slate-500 mt-1 font-semibold">
                              {store.tiempo_estimado_recogida}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedStoreId(store.tienda_id);
                            }}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-amber-500 text-slate-950 shadow-xs'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                            }`}
                          >
                            {isSelected ? '✓ Tienda Seleccionada' : 'Seleccionar tienda'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. RESUMEN ANTES DEL PAGO (Pre-payment breakdown card) */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base font-display">
                Resumen de tu Pedido ColorLink
              </h3>
              <p className="text-xs text-slate-400">
                Verifica los detalles antes de seleccionar tu medio de pago
              </p>
            </div>
          </div>

          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold border border-amber-500/30">
            {totalItemsCount} productos formulados
          </span>
        </div>

        {/* Mini Product list preview */}
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase font-mono tracking-wider text-slate-400">
            Productos y Dosificación Seleccionada:
          </p>
          <div className="divide-y divide-slate-800 rounded-2xl bg-slate-950/60 p-3 text-xs max-h-48 overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.id} className="py-2 flex items-center justify-between gap-3">
                <div className="flex items-center space-x-2.5 min-w-0">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-8 h-8 rounded-lg object-cover bg-white shrink-0 border border-slate-700"
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-white truncate">{item.name}</p>
                    <p className="text-[11px] text-slate-400">
                      {item.presentation} • Cantidad: <span className="text-amber-400 font-bold">{item.quantity}</span>
                    </p>
                  </div>
                </div>
                <span className="font-mono font-bold text-white shrink-0">
                  ${(item.unitPriceCOP * item.quantity).toLocaleString('es-CO')} COP
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Summary Spec */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs">
          <div className="space-y-1">
            <p className="font-bold text-amber-400 uppercase font-mono text-[10px]">
              Método de Entrega Seleccionado:
            </p>
            <p className="font-bold text-white text-sm flex items-center gap-1.5">
              {deliveryMode === 'domicilio' ? <Truck className="w-4 h-4 text-amber-400" /> : <Store className="w-4 h-4 text-amber-400" />}
              <span>{deliveryMode === 'domicilio' ? 'Envío a Domicilio' : 'Recoger en Tienda'}</span>
            </p>
            <p className="text-slate-300 text-[11px]">
              {deliveryMode === 'domicilio'
                ? `${address}, ${barrio} (${city})`
                : `${activeSelectedStore.nombre} - ${activeSelectedStore.direccion}`}
            </p>
          </div>

          <div className="space-y-1 sm:border-l sm:border-slate-700 sm:pl-4">
            <p className="font-bold text-amber-400 uppercase font-mono text-[10px]">
              Tiempo & Costo de Despacho:
            </p>
            <p className="text-slate-200">
              Tiempo estimado: <span className="font-bold text-white">{deliveryMode === 'domicilio' ? '24 - 48 hrs hábiles' : activeSelectedStore.tiempo_estimado_recogida}</span>
            </p>
            <p className="text-slate-200">
              Costo de envío: <span className="font-bold text-emerald-400 font-mono">{shippingCostCOP === 0 ? '$0 COP (Gratis)' : `$${shippingCostCOP.toLocaleString('es-CO')} COP`}</span>
            </p>
          </div>
        </div>

        {/* Price Math */}
        <div className="pt-2 space-y-2 border-t border-slate-800 text-xs">
          <div className="flex justify-between text-slate-400">
            <span>Subtotal Materiales:</span>
            <span className="font-mono text-white">${subtotalCOP.toLocaleString('es-CO')} COP</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Costo de Envío:</span>
            <span className="font-mono text-emerald-400">
              {shippingCostCOP === 0 ? 'Gratis ($0 COP)' : `$${shippingCostCOP.toLocaleString('es-CO')} COP`}
            </span>
          </div>
          <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
            <span>Total a Pagar:</span>
            <span className="font-mono text-amber-400 text-lg sm:text-xl">
              ${totalCOP.toLocaleString('es-CO')} COP
            </span>
          </div>
        </div>

        {/* Buttons Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-bold transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Volver a Productos</span>
          </button>

          <button
            type="button"
            onClick={handleProceedToPayment}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer hover:scale-[1.02]"
          >
            <span>Continuar al Pago</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
