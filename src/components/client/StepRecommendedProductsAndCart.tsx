import React, { useState } from 'react';
import {
  Sparkles,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Package,
  Calculator,
  Info,
  Layers,
  HelpCircle,
  Truck,
  Check,
  Building2,
  Palette
} from 'lucide-react';
import {
  RetailProductItem,
  SmartProjectCalculation,
  ProjectSystemComparison
} from '../../data/retailProducts';
import { CartItem, ClientProjectInput } from '../../types';

interface StepRecommendedProductsAndCartProps {
  input: ClientProjectInput;
  calculation: SmartProjectCalculation;
  comparison: ProjectSystemComparison;
  recommendedProducts: RetailProductItem[];
  cartItems: CartItem[];
  onAddToCart: (product: RetailProductItem) => void;
  onUpdateCartQuantity: (itemId: string, delta: number) => void;
  onRemoveFromCart: (itemId: string) => void;
  onNextToCheckout: () => void;
  onBackToComparison: () => void;
  onRequestAdvisory: () => void;
}

export const StepRecommendedProductsAndCart: React.FC<StepRecommendedProductsAndCartProps> = ({
  input,
  calculation,
  comparison,
  recommendedProducts,
  cartItems,
  onAddToCart,
  onUpdateCartQuantity,
  onRemoveFromCart,
  onNextToCheckout,
  onBackToComparison,
  onRequestAdvisory
}) => {
  const [selectedTab, setSelectedTab] = useState<'recomendados' | 'resumen'>('recomendados');
  const [addedFeedbackId, setAddedFeedbackId] = useState<string | null>(null);

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(val);
  };

  const subtotalCOP = cartItems.reduce((acc, item) => acc + item.unitPriceCOP * item.quantity, 0);
  const isFreeShipping = subtotalCOP >= 150000;
  const estimatedShippingCOP = cartItems.length === 0 ? 0 : isFreeShipping ? 0 : 12500;
  const totalOrderCOP = subtotalCOP + estimatedShippingCOP;

  const handleAdd = (prod: RetailProductItem) => {
    onAddToCart(prod);
    setAddedFeedbackId(prod.id);
    setTimeout(() => setAddedFeedbackId(null), 1800);
  };

  const isProductInCart = (productId: string) => {
    return cartItems.some((item) => item.productId === productId || item.id === productId);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-7 sm:space-y-8 animate-fadeIn text-slate-800 text-left">
      
      {/* Top Section Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Paso 5: Cálculo Inteligente & Productos del Proyecto</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Productos recomendados para tu proyecto
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
          Basado en el análisis de tu sustrato (<strong className="text-slate-800">{input.surfaceType || 'concreto'}</strong>), condición (<strong className="text-slate-800">{input.currentCondition || 'humedad'}</strong>) y metraje calculado (<strong className="text-slate-800">{input.estimatedM2 || 28} m²</strong>).
        </p>
      </div>

      {/* 1. HERO CÁLCULO INTELIGENTE (Visual Highlight Card) */}
      <div className="rounded-3xl border-2 border-amber-400/80 bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-white p-5 sm:p-7 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-200/80">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-xs">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase text-amber-800 font-bold tracking-wider">
                Dosificación Técnica Pintuco
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                Para tu proyecto estimamos que necesitas:
              </h3>
            </div>
          </div>

          <div className="text-left sm:text-right bg-white/80 backdrop-blur-xs px-4 py-2 rounded-2xl border border-amber-200">
            <span className="text-[10px] text-slate-500 font-mono block">Total estimado de materiales:</span>
            <span className="text-lg sm:text-xl font-extrabold text-amber-900 font-mono">
              {formatCOP(calculation.estimatedMaterialCostCOP)}
            </span>
          </div>
        </div>

        {/* Calculation Items Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {calculation.summaryItems.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-white border border-amber-200/60 shadow-xs flex flex-col justify-between space-y-2"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 text-xs font-bold flex items-center justify-center font-mono">
                    {idx + 1}
                  </span>
                  <span className="text-[11px] font-bold text-slate-900 font-mono">
                    {formatCOP(item.approxPriceCOP)}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  {item.label}
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="text-[10px] text-amber-700 font-semibold flex items-center space-x-1 pt-1 border-t border-slate-100">
                <Check className="w-3 h-3 text-amber-600" />
                <span>Incluye +{calculation.wasteMarginPercent}% desperdicio técnico</span>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer note */}
        <p className="text-[11px] text-slate-500 italic pt-1">
          {calculation.disclaimerText}
        </p>
      </div>

      {/* 2. MAIN WORKSPACE: Grid of Recommended Products + Right Sticky Cart Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Left Column: Products List (8 Cols on Desktop) */}
        <div className="lg:col-span-8 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Package className="w-5 h-5 text-amber-600" />
              <span>Lista de formulación técnica ({recommendedProducts.length} productos)</span>
            </h3>
            <span className="text-xs text-slate-500">
              Formulado para {input.estimatedM2 || 28} m²
            </span>
          </div>

          <div className="space-y-4">
            {recommendedProducts.map((prod) => {
              const inCart = isProductInCart(prod.id);
              const isFeedback = addedFeedbackId === prod.id;

              return (
                <div
                  key={prod.id}
                  className={`rounded-3xl p-4 sm:p-5 border transition-all duration-200 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    inCart
                      ? 'border-amber-400 ring-1 ring-amber-300 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  {/* Product Visual + Info */}
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 relative">
                      <img
                        src={prod.imageUrl}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      {prod.colorHex && (
                        <div
                          className="absolute bottom-1.5 right-1.5 w-5 h-5 rounded-full border-2 border-white shadow-xs"
                          style={{ backgroundColor: prod.colorHex }}
                          title={`Color: ${prod.colorName}`}
                        />
                      )}
                    </div>

                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold font-mono uppercase">
                          {prod.pintucoLine}
                        </span>
                        {prod.tier === 'ia_recomendado' && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-bold">
                            Recomendado IA
                          </span>
                        )}
                        {prod.inStock && (
                          <span className="text-[10px] text-emerald-700 font-semibold flex items-center space-x-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>En Stock</span>
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                        {prod.name}
                      </h4>

                      <p className="text-xs text-slate-600 line-clamp-2">
                        {prod.recommendedUse}
                      </p>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 pt-1">
                        <span>Presentación: <strong className="text-slate-700">{prod.presentation}</strong></span>
                        <span>•</span>
                        <span>Rendimiento: <strong className="text-slate-700">{prod.coverageM2}</strong></span>
                        {prod.colorName && (
                          <>
                            <span>•</span>
                            <span className="text-amber-800 font-semibold">Tono: {prod.colorName}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Pricing + Add Button */}
                  <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between gap-2.5 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-slate-400 block">Precio sugerido:</span>
                      <span className="text-base sm:text-lg font-extrabold text-slate-900 font-mono">
                        {formatCOP(prod.priceCOP)}
                      </span>
                      <span className="text-[10px] text-amber-700 block font-semibold">
                        Sugerido: {prod.suggestedQuantity} {prod.unitType}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAdd(prod)}
                      className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                        inCart
                          ? 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
                          : 'bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white shadow-xs'
                      }`}
                    >
                      {isFeedback ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>¡Agregado!</span>
                        </>
                      ) : inCart ? (
                        <>
                          <Check className="w-4 h-4 text-amber-700" />
                          <span>En el proyecto (+1)</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Agregar al proyecto</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Shopping Cart / Project Summary (4 Cols on Desktop) */}
        <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
          <div className="rounded-3xl border border-slate-200 bg-white shadow-lg p-5 sm:p-6 space-y-5">
            
            {/* Cart Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                    Resumen de Compra
                  </h3>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)} productos en lista
                  </span>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                Pintuco Oficial
              </span>
            </div>

            {/* Recommended by AI Banner */}
            <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/15 to-yellow-500/10 border border-amber-300/80 text-[11px] text-amber-900 flex items-start space-x-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Recomendado para tu proyecto por ColorLink IA</strong> con base en el diagnóstico fotográfico.
              </span>
            </div>

            {/* Cart Items List */}
            {cartItems.length === 0 ? (
              <div className="py-8 text-center space-y-2 text-slate-400">
                <Package className="w-8 h-8 mx-auto stroke-1" />
                <p className="text-xs">Aún no has agregado productos a tu resumen.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2 text-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h5 className="font-bold text-slate-900 truncate">{item.name}</h5>
                        <p className="text-[10px] text-slate-500">{item.presentation}</p>
                        {item.colorName && (
                          <span className="text-[10px] text-amber-800 font-medium">
                            Color: {item.colorName}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveFromCart(item.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors p-1"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/50">
                      {/* Quantity Stepper */}
                      <div className="flex items-center space-x-1.5 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                        <button
                          type="button"
                          onClick={() => onUpdateCartQuantity(item.id, -1)}
                          className="text-slate-600 hover:text-slate-900 font-bold p-0.5 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono font-bold text-xs px-1.5">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateCartQuantity(item.id, 1)}
                          className="text-slate-600 hover:text-slate-900 font-bold p-0.5 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-bold text-slate-900 font-mono">
                        {formatCOP(item.unitPriceCOP * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Financial Breakdown */}
            <div className="space-y-2 pt-3 border-t border-slate-200 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal materiales:</span>
                <span className="font-mono font-semibold text-slate-800">{formatCOP(subtotalCOP)}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span className="flex items-center space-x-1">
                  <Truck className="w-3.5 h-3.5 text-slate-400" />
                  <span>Envío estimado:</span>
                </span>
                <span className="font-mono font-semibold text-slate-800">
                  {cartItems.length === 0 ? '$0' : isFreeShipping ? (
                    <span className="text-emerald-700 font-bold">¡GRATIS!</span>
                  ) : (
                    formatCOP(estimatedShippingCOP)
                  )}
                </span>
              </div>

              {isFreeShipping && (
                <p className="text-[10px] text-emerald-700 bg-emerald-50 p-1.5 rounded-lg border border-emerald-200 text-center font-semibold">
                  🎉 ¡Tienes Envío Gratis por compras superiores a $180.000 COP!
                </p>
              )}

              <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 text-slate-900">
                <span className="font-bold text-sm">Total Estimado:</span>
                <span className="font-extrabold text-xl text-amber-900 font-mono">
                  {formatCOP(totalOrderCOP)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={onNextToCheckout}
                disabled={cartItems.length === 0}
                className="w-full py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-slate-950 font-extrabold text-sm shadow-md shadow-amber-500/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Continuar a Entrega & Pago</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onRequestAdvisory}
                className="w-full py-2.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                <span>Solicitar asesoría técnica antes de comprar</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Back Button */}
      <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToComparison}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors flex items-center space-x-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a la Comparativa de Líneas</span>
        </button>
      </div>

    </div>
  );
};
