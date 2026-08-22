import React from 'react';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Clock,
  Download,
  ArrowRight,
  ShieldCheck,
  Phone,
  FileText,
  Sparkles,
  ExternalLink,
  Store
} from 'lucide-react';
import { ProjectOrder } from '../../types';

interface StepOrderConfirmationProps {
  order: ProjectOrder;
  onViewMyRequests: () => void;
  onNewProject: () => void;
}

export const StepOrderConfirmation: React.FC<StepOrderConfirmationProps> = ({
  order,
  onViewMyRequests,
  onNewProject
}) => {
  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn text-slate-800 text-left">
      
      {/* Top Congratulatory Hero Card */}
      <div className="rounded-3xl border-2 border-emerald-400/80 bg-gradient-to-br from-emerald-500/10 via-amber-500/5 to-white p-6 sm:p-8 text-center space-y-4 shadow-sm">
        
        <div className="w-16 h-16 rounded-3xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-1">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
            {order.code}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            {order.requiresHumanAdvisory
              ? '¡Solicitud y Reserva Registrada con Éxito!'
              : '¡Tu Pedido ha sido Confirmado!'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            {order.requiresHumanAdvisory
              ? 'Un asesor técnico de Pintuco revisará tu diagnóstico y te contactará en breve antes de emitir la factura.'
              : 'Hemos notificado a la tienda Pintacasa autorizada para iniciar la preparación y entintado computarizado.'}
          </p>
        </div>

        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-2xl bg-white border border-emerald-200 text-xs text-slate-700 shadow-xs">
          <Clock className="w-4 h-4 text-emerald-600" />
          <span>Tiempo estimado de entrega / retiro: <strong>24 a 48 horas hábiles</strong></span>
        </div>

      </div>

      {/* Order Details Card */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 space-y-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] text-slate-400 font-mono">Referencia de compra:</span>
            <h3 className="text-base font-extrabold text-slate-900">{order.code}</h3>
          </div>

          <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
            {order.status === 'asesoria_pendiente' ? 'Asesoría Técnica Pendiente' : 'En Preparación'}
          </span>
        </div>

        {/* Customer & Delivery Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block">
              Datos del Cliente
            </span>
            <p className="font-bold text-slate-900">{order.client.name}</p>
            <p className="text-slate-600">{order.client.email}</p>
            <p className="text-slate-600">{order.client.phone}</p>
            {order.client.companyName && (
              <p className="text-amber-800 font-medium">{order.client.companyName} (NIT: {order.client.companyNit})</p>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block">
              Modalidad de Despacho
            </span>
            <p className="font-bold text-slate-900 capitalize flex items-center space-x-1.5">
              {order.deliveryOption === 'domicilio' ? (
                <>
                  <Truck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Envío a Domicilio ({order.client.city})</span>
                </>
              ) : (
                <>
                  <Store className="w-3.5 h-3.5 text-blue-600" />
                  <span>Retiro en Tienda Pintacasa</span>
                </>
              )}
            </p>
            {order.deliveryOption === 'domicilio' && (
              <p className="text-slate-600">
                {order.client.address} - {order.client.neighborhood}
              </p>
            )}
            {order.deliveryOption === 'recoger_tienda' && (
              <p className="text-slate-600">Punto: {order.assignedStore || 'Pintacasa Calle 80'}</p>
            )}
            <p className="text-slate-500">Método de pago: <strong className="uppercase">{order.paymentMethod}</strong></p>
          </div>
        </div>

        {/* Purchased Products Table */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Productos Formulados por ColorLink IA
          </h4>

          <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 overflow-hidden">
            {order.items.map((it) => (
              <div key={it.id} className="p-3.5 bg-white flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center space-x-3 min-w-0">
                  <img
                    src={it.imageUrl}
                    alt={it.name}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-slate-900 truncate">{it.name}</p>
                    <p className="text-[11px] text-slate-500">{it.presentation} • Cant: {it.quantity}</p>
                    {it.colorName && (
                      <span className="text-[10px] text-amber-800 font-semibold">Tono: {it.colorName}</span>
                    )}
                  </div>
                </div>

                <span className="font-mono font-bold text-slate-900 shrink-0">
                  {formatCOP(it.unitPriceCOP * it.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Total */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-300 flex items-baseline justify-between text-slate-900">
          <div>
            <span className="text-xs text-amber-900 font-semibold block">Total Facturado COP</span>
            <span className="text-[10px] text-slate-500">Incluye IVA y garantía técnica Pintuco</span>
          </div>
          <span className="text-2xl font-black text-amber-900 font-mono">
            {formatCOP(order.totalCOP)}
          </span>
        </div>

      </div>

      {/* Bottom Action CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={onViewMyRequests}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
        >
          <Package className="w-4 h-4" />
          <span>Ver estado en "Mis Solicitudes"</span>
        </button>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 sm:flex-initial px-4 py-3 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Descargar Recibo</span>
          </button>

          <button
            type="button"
            onClick={onNewProject}
            className="flex-1 sm:flex-initial px-4 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Nuevo Proyecto</span>
          </button>
        </div>
      </div>

    </div>
  );
};
