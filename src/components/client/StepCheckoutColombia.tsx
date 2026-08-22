import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  Store,
  CreditCard,
  Building2,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  QrCode,
  MapPin,
  Clock,
  HelpCircle,
  Check,
  ChevronDown,
  User,
  Phone,
  Mail
} from 'lucide-react';
import {
  CartItem,
  ClientProjectInput,
  DeliveryDetails,
  DeliveryOptionType,
  PaymentMethodType,
  ProjectOrder
} from '../../types';

interface StepCheckoutColombiaProps {
  input: ClientProjectInput;
  cartItems: CartItem[];
  deliveryDetails?: DeliveryDetails | null;
  onConfirmOrder: (order: ProjectOrder) => void;
  onBack: () => void;
  onRequestAdvisory: () => void;
  onChangeDelivery?: () => void;
}

const PINTACASA_STORES = [
  {
    id: 'ptc-bogota-80',
    city: 'Bogotá D.C.',
    name: 'Pintacasa Pintuco Calle 80',
    address: 'Calle 80 # 68-45, Barrio Metrópolis',
    hours: 'Lun - Sáb: 7:30 AM - 5:30 PM'
  },
  {
    id: 'ptc-bogota-127',
    city: 'Bogotá D.C.',
    name: 'Pintacasa Pintuco Calle 127',
    address: 'Av. Calle 127 # 19-32, Unicentro',
    hours: 'Lun - Sáb: 8:00 AM - 6:00 PM'
  },
  {
    id: 'ptc-medellin-poblado',
    city: 'Medellín',
    name: 'Pintacasa Pintuco El Poblado',
    address: 'Carrera 43A # 7-50, El Poblado',
    hours: 'Lun - Sáb: 7:30 AM - 5:30 PM'
  },
  {
    id: 'ptc-cali-norte',
    city: 'Cali',
    name: 'Pintacasa Pintuco Chipichape',
    address: 'Av. 6N # 35N-12, Barrio Granada',
    hours: 'Lun - Sáb: 8:00 AM - 5:30 PM'
  },
  {
    id: 'ptc-barranquilla-51b',
    city: 'Barranquilla',
    name: 'Pintacasa Pintuco Calle 84',
    address: 'Calle 84 # 51B-22, Alto Prado',
    hours: 'Lun - Sáb: 7:30 AM - 5:30 PM'
  },
  {
    id: 'ptc-bucaramanga-cabecera',
    city: 'Bucaramanga',
    name: 'Pintacasa Pintuco Cabecera',
    address: 'Carrera 33 # 48-15, Cabecera del Llano',
    hours: 'Lun - Sáb: 8:00 AM - 5:30 PM'
  }
];

const COLOMBIAN_BANKS = [
  'Bancolombia',
  'Davivienda',
  'Banco de Bogotá',
  'Banco BBVA Colombia',
  'Banco de Occidente',
  'Banco Popular',
  'Scotiabank Colpatria',
  'Banco Itaú',
  'Nequi',
  'Daviplata',
  'Banco Caja Social',
  'Lulo Bank',
  'Nu Colombia'
];

export const StepCheckoutColombia: React.FC<StepCheckoutColombiaProps> = ({
  input,
  cartItems,
  deliveryDetails,
  onConfirmOrder,
  onBack,
  onRequestAdvisory,
  onChangeDelivery
}) => {
  // Delivery State (Pre-filled from StepSmartDeliveryAndLocation if present)
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOptionType>(
    deliveryDetails?.tipo_entrega || 'domicilio'
  );
  const [selectedStore, setSelectedStore] = useState<string>(
    deliveryDetails?.tienda_nombre || PINTACASA_STORES[0].name
  );
  const [deliveryAddress, setDeliveryAddress] = useState<string>(
    deliveryDetails?.direccion || 'Carrera 15 # 93-40, Apto 402'
  );
  const [deliveryNeighborhood, setDeliveryNeighborhood] = useState<string>(
    deliveryDetails?.barrio || 'Chicó Norte'
  );
  const [deliveryCity, setDeliveryCity] = useState<string>(
    deliveryDetails?.ciudad || input.clientCity || 'Bogotá D.C.'
  );
  const [deliveryNotes, setDeliveryNotes] = useState<string>(
    deliveryDetails?.instrucciones || 'Dejar en portería con vigilancia 24h'
  );

  // Contact Info
  const [contactName, setContactName] = useState<string>(input.clientName || 'Laura María Restrepo');
  const [contactEmail, setContactEmail] = useState<string>(input.clientEmail || 'laura.restrepo@pintuco-usuario.co');
  const [contactPhone, setContactPhone] = useState<string>(input.clientPhone || '+57 312 847 2910');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('pse');
  const [selectedBank, setSelectedBank] = useState<string>('Bancolombia');
  const [personType, setPersonType] = useState<'natural' | 'juridica'>('natural');
  const [docNumber, setDocNumber] = useState<string>('1020345678');
  const [cardNumber, setCardNumber] = useState<string>('4557 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState<string>('08/29');
  const [cardCvv, setCardCvv] = useState<string>('842');
  const [installments, setInstallments] = useState<number>(1);
  const [nequiPhone, setNequiPhone] = useState<string>(input.clientPhone || '3128472910');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(val);
  };

  const subtotalCOP = cartItems.reduce((acc, it) => acc + it.unitPriceCOP * it.quantity, 0);
  const isFreeShipping = subtotalCOP >= 150000 || deliveryOption === 'recoger_tienda';
  const shippingCostCOP = deliveryDetails !== undefined && deliveryDetails !== null
    ? deliveryDetails.costo_envio
    : deliveryOption === 'recoger_tienda' ? 0 : isFreeShipping ? 0 : 12500;
  const totalOrderCOP = subtotalCOP + shippingCostCOP;

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const orderCodeNum = Math.floor(1000 + Math.random() * 9000);
      const newOrder: ProjectOrder = {
        id: `ORD-PTC-${orderCodeNum}`,
        code: `PED-PTC-2026-${orderCodeNum}`,
        createdAt: 'Hoy, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        clientType: input.clientType || 'particular',
        client: {
          name: contactName,
          email: contactEmail,
          phone: contactPhone,
          city: deliveryCity,
          address: deliveryOption === 'domicilio' ? deliveryAddress : undefined,
          neighborhood: deliveryOption === 'domicilio' ? deliveryNeighborhood : undefined,
          notes: deliveryNotes,
          companyName: input.companyName,
          companyNit: input.companyNit
        },
        items: [...cartItems],
        subtotalCOP,
        shippingCOP: shippingCostCOP,
        discountCOP: 0,
        totalCOP: totalOrderCOP,
        deliveryOption,
        pickupStore: deliveryOption === 'recoger_tienda' ? selectedStore : undefined,
        paymentMethod,
        paymentBank: paymentMethod === 'pse' ? selectedBank : undefined,
        status: deliveryOption === 'asesoria_previa' ? 'asesoria_pendiente' : 'pedido_confirmado',
        requiresHumanAdvisory: deliveryOption === 'asesoria_previa',
        assignedStore: selectedStore
      };

      setIsProcessing(false);
      onConfirmOrder(newOrder);
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-7 sm:space-y-8 animate-fadeIn text-slate-800 text-left">
      
      {/* Header */}
      <div className="space-y-1 text-center sm:text-left">
        <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>Paso 7: Medio de Pago & Checkout Seguro Colombia</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Finaliza tu pedido de transformación
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Entrega confirmada vía red Pintacasa Pintuco. Selecciona tu método de pago preferido para emitir tu orden.
        </p>
      </div>

      {/* Verified Delivery Snapshot Banner if present */}
      {deliveryDetails && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow-xs">
              {deliveryDetails.tipo_entrega === 'domicilio' ? <Truck className="w-5 h-5" /> : <Store className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold text-[11px] text-amber-900 uppercase">
                  Entrega Validada:
                </span>
                <span className="px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  {deliveryDetails.tipo_entrega === 'domicilio' ? 'Envío a Domicilio' : 'Recoger en Pintacasa'}
                </span>
              </div>
              <p className="font-bold text-slate-900 text-sm mt-0.5">
                {deliveryDetails.tipo_entrega === 'domicilio'
                  ? `${deliveryDetails.direccion}, ${deliveryDetails.barrio} (${deliveryDetails.ciudad})`
                  : `${deliveryDetails.tienda_nombre} - ${deliveryDetails.direccion}`}
              </p>
              <p className="text-[11px] text-slate-500">
                {deliveryDetails.tiempo_estimado} • Costo: {deliveryDetails.costo_envio === 0 ? 'Gratis' : `$${deliveryDetails.costo_envio.toLocaleString('es-CO')} COP`}
              </p>
            </div>
          </div>

          {onChangeDelivery && (
            <button
              type="button"
              onClick={onChangeDelivery}
              className="px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold hover:bg-amber-100 transition-colors cursor-pointer shrink-0"
            >
              Cambiar entrega / punto
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        
        {/* Left Column: Delivery & Payment Options (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. MÉTODO DE ENTREGA */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
              <Truck className="w-5 h-5 text-amber-600" />
              <span>1. Método de Entrega</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Option A: Domicilio */}
              <button
                type="button"
                onClick={() => setDeliveryOption('domicilio')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  deliveryOption === 'domicilio'
                    ? 'border-amber-500 bg-amber-50/40 ring-2 ring-amber-400/40 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="space-y-1">
                  <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                    <Truck className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Envío a Domicilio</h4>
                  <p className="text-[10px] text-slate-500">24-48h en ciudades principales</p>
                </div>
                <span className="text-[11px] font-bold text-amber-900 pt-2 font-mono">
                  {isFreeShipping ? '¡GRATIS!' : '$15.000 COP'}
                </span>
              </button>

              {/* Option B: Recoger en Tienda */}
              <button
                type="button"
                onClick={() => setDeliveryOption('recoger_tienda')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  deliveryOption === 'recoger_tienda'
                    ? 'border-amber-500 bg-amber-50/40 ring-2 ring-amber-400/40 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="space-y-1">
                  <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
                    <Store className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Recoger en Tienda</h4>
                  <p className="text-[10px] text-slate-500">En Tienda Pintacasa autorizada</p>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 pt-2 font-mono">
                  ¡GRATIS!
                </span>
              </button>

              {/* Option C: Asesoría previa */}
              <button
                type="button"
                onClick={() => setDeliveryOption('asesoria_previa')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  deliveryOption === 'asesoria_previa'
                    ? 'border-amber-500 bg-amber-50/40 ring-2 ring-amber-400/40 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="space-y-1">
                  <div className="w-7 h-7 rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center font-bold">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Asesoría Previa</h4>
                  <p className="text-[10px] text-slate-500">Llamada técnica antes de pagar</p>
                </div>
                <span className="text-[11px] font-bold text-purple-800 pt-2 font-mono">
                  Sin compromiso
                </span>
              </button>
            </div>

            {/* Sub-form based on delivery choice */}
            {deliveryOption === 'domicilio' && (
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">Ciudad de entrega</label>
                    <input
                      type="text"
                      value={deliveryCity}
                      onChange={(e) => setDeliveryCity(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-400 outline-hidden"
                      placeholder="Ej. Bogotá D.C."
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">Barrio / Sector</label>
                    <input
                      type="text"
                      value={deliveryNeighborhood}
                      onChange={(e) => setDeliveryNeighborhood(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-400 outline-hidden"
                      placeholder="Ej. Chicó Norte"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">Dirección exacta</label>
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-400 outline-hidden"
                    placeholder="Calle / Carrera / Número / Torre / Apto"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">Notas para el transportador</label>
                  <input
                    type="text"
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-400 outline-hidden"
                    placeholder="Instrucciones de portería o referencia"
                  />
                </div>
              </div>
            )}

            {deliveryOption === 'recoger_tienda' && (
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <label className="text-[11px] font-semibold text-slate-700 block">
                  Selecciona la Tienda Pintacasa más cercana:
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {PINTACASA_STORES.map((st) => (
                    <div
                      key={st.id}
                      onClick={() => setSelectedStore(st.name)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-2 ${
                        selectedStore === st.name
                          ? 'border-amber-500 bg-amber-50/50 ring-1 ring-amber-400'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                      }`}
                    >
                      <div className="space-y-0.5 text-xs">
                        <div className="flex items-center space-x-1.5 font-bold text-slate-900">
                          <MapPin className="w-3.5 h-3.5 text-amber-600" />
                          <span>{st.name} ({st.city})</span>
                        </div>
                        <p className="text-[11px] text-slate-600">{st.address}</p>
                        <p className="text-[10px] text-slate-400">{st.hours}</p>
                      </div>
                      {selectedStore === st.name && (
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-1" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {deliveryOption === 'asesoria_previa' && (
              <div className="pt-3 border-t border-slate-100 p-3.5 rounded-2xl bg-purple-50 border border-purple-200 text-xs text-purple-900 space-y-1">
                <p className="font-bold">📞 Un Asesor Técnico Pintuco te contactará</p>
                <p className="text-[11px] text-purple-800">
                  Tu pedido quedará reservado sin cobro. Te llamaremos al <strong>{contactPhone}</strong> para verificar compatibilidad de sustrato y resolver dudas antes de despachar.
                </p>
              </div>
            )}
          </div>

          {/* 2. MEDIOS DE PAGO COLOMBIA */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-amber-600" />
              <span>2. Método de Pago Seguro (Colombia)</span>
            </h3>

            {/* Payment Method Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {/* PSE */}
              <button
                type="button"
                onClick={() => setPaymentMethod('pse')}
                className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 ${
                  paymentMethod === 'pse'
                    ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-400 font-bold text-amber-900 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <span className="text-xs font-black">PSE</span>
                <span className="text-[9px] text-slate-500">Débito Bancos</span>
              </button>

              {/* Tarjeta */}
              <button
                type="button"
                onClick={() => setPaymentMethod('tarjeta')}
                className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 ${
                  paymentMethod === 'tarjeta'
                    ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-400 font-bold text-amber-900 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span className="text-[10px] font-bold">Tarjeta</span>
              </button>

              {/* Billetera Nequi/Daviplata */}
              <button
                type="button"
                onClick={() => setPaymentMethod('billetera')}
                className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 ${
                  paymentMethod === 'billetera'
                    ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-400 font-bold text-amber-900 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span className="text-[10px] font-bold">Nequi/Daviplata</span>
              </button>

              {/* Transferencia */}
              <button
                type="button"
                onClick={() => setPaymentMethod('transferencia')}
                className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 ${
                  paymentMethod === 'transferencia'
                    ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-400 font-bold text-amber-900 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span className="text-[10px] font-bold">QR Bancolombia</span>
              </button>

              {/* Punto Autorizado */}
              <button
                type="button"
                onClick={() => setPaymentMethod('punto_autorizado')}
                className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 ${
                  paymentMethod === 'punto_autorizado'
                    ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-400 font-bold text-amber-900 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <Store className="w-4 h-4" />
                <span className="text-[10px] font-bold">Punto Efecty/Tienda</span>
              </button>
            </div>

            {/* Payment Fields Sub-panel */}
            {paymentMethod === 'pse' && (
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">Banco emisor</label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-400 outline-hidden bg-white"
                    >
                      {COLOMBIAN_BANKS.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">Tipo de persona</label>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => setPersonType('natural')}
                        className={`flex-1 py-1.5 rounded-xl text-xs font-semibold border ${
                          personType === 'natural' ? 'bg-amber-100 text-amber-900 border-amber-300' : 'border-slate-200'
                        }`}
                      >
                        Persona Natural
                      </button>
                      <button
                        type="button"
                        onClick={() => setPersonType('juridica')}
                        className={`flex-1 py-1.5 rounded-xl text-xs font-semibold border ${
                          personType === 'juridica' ? 'bg-amber-100 text-amber-900 border-amber-300' : 'border-slate-200'
                        }`}
                      >
                        Empresa (NIT)
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Número de documento (C.C. o NIT)
                  </label>
                  <input
                    type="text"
                    value={docNumber}
                    onChange={(e) => setDocNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-400 outline-hidden"
                    placeholder="1020345678"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'tarjeta' && (
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">Número de tarjeta</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-amber-400 outline-hidden"
                    placeholder="4557 0000 0000 0000"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">Vencimiento</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-center focus:ring-2 focus:ring-amber-400 outline-hidden"
                      placeholder="MM/AA"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">CVV</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-center focus:ring-2 focus:ring-amber-400 outline-hidden"
                      placeholder="•••"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">Cuotas</label>
                    <select
                      value={installments}
                      onChange={(e) => setInstallments(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-400 outline-hidden bg-white"
                    >
                      {[1, 2, 3, 6, 12, 24, 36].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? 'cuota' : 'cuotas'}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'billetera' && (
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <label className="text-[11px] font-semibold text-slate-700 block">
                  Número celular Nequi o Daviplata:
                </label>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-700">
                    +57
                  </span>
                  <input
                    type="tel"
                    value={nequiPhone}
                    onChange={(e) => setNequiPhone(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-amber-400 outline-hidden"
                    placeholder="312 847 2910"
                  />
                </div>
                <p className="text-[10px] text-slate-500">
                  Recibirás una notificación push en tu app para aprobar el débito de {formatCOP(totalOrderCOP)}.
                </p>
              </div>
            )}

            {paymentMethod === 'transferencia' && (
              <div className="pt-3 border-t border-slate-100 p-3 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs space-y-1">
                <div className="flex items-center space-x-2 font-bold text-amber-900">
                  <QrCode className="w-4 h-4 text-amber-700" />
                  <span>Llave QR Bancolombia Pintuco</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Cuenta Corriente Bancolombia # 031-892144-01 • Nit: 890.900.120-1 (Pintuco S.A.S.)
                </p>
              </div>
            )}

            {paymentMethod === 'punto_autorizado' && (
              <div className="pt-3 border-t border-slate-100 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <p className="font-bold text-slate-800">Convenio Efecty Pintuco / Pago en Tienda</p>
                <p className="text-[11px]">
                  Generaremos un código de convenio con vigencia de 48 horas para pagar en efectivo en cualquier punto Efecty o en la tienda Pintacasa seleccionada.
                </p>
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Order Summary (5 Cols) */}
        <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
          <div className="rounded-3xl border border-slate-200 bg-white shadow-lg p-5 sm:p-6 space-y-5">
            
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900">Resumen del Pedido</h3>
              <span className="text-xs font-mono text-slate-500">
                {cartItems.reduce((acc, it) => acc + it.quantity, 0)} artículos
              </span>
            </div>

            {/* Miniature Item Rows */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cartItems.map((it) => (
                <div key={it.id} className="flex items-center justify-between text-xs gap-3">
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <img
                      src={it.imageUrl}
                      alt={it.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 truncate">{it.name}</p>
                      <p className="text-[10px] text-slate-500">
                        {it.quantity} x {it.presentation}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-slate-900 shrink-0">
                    {formatCOP(it.unitPriceCOP * it.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Financials */}
            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-mono font-semibold text-slate-800">{formatCOP(subtotalCOP)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Envío:</span>
                <span className="font-mono font-semibold text-slate-800">
                  {shippingCostCOP === 0 ? <span className="text-emerald-700 font-bold">¡GRATIS!</span> : formatCOP(shippingCostCOP)}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 text-slate-900">
                <span className="font-bold text-sm">Total Final:</span>
                <span className="font-black text-2xl text-amber-900 font-mono">
                  {formatCOP(totalOrderCOP)}
                </span>
              </div>
            </div>

            {/* Security Guarantee Badge */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center space-x-2.5 text-[11px] text-slate-600">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Garantía Oficial Pintuco Colombia • Pago 100% protegido con cifrado SSL.</span>
            </div>

            {/* Submit Order Button */}
            <div className="space-y-2.5 pt-1">
              <button
                type="button"
                onClick={handleConfirm}
                disabled={isProcessing || cartItems.length === 0}
                className="w-full py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:bg-slate-300 text-slate-950 font-extrabold text-sm shadow-md shadow-amber-500/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Procesando con Pintacasa...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Confirmar pedido</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onRequestAdvisory}
                className="w-full py-2 px-4 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
              >
                ¿Tienes dudas antes de pagar? Habla con un técnico
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Back button */}
      <div className="pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors flex items-center space-x-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Carrito & Productos</span>
        </button>
      </div>

    </div>
  );
};
