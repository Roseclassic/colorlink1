import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Award,
  Layers,
  TrendingUp,
  Droplets,
  Zap,
  Tag,
  Check
} from 'lucide-react';
import { RetailProductItem, ProjectSystemComparison } from '../../data/retailProducts';
import { ClientProjectInput } from '../../types';

interface StepComparisonAndAlternativesProps {
  comparison: ProjectSystemComparison;
  selectedTier: 'ia_recomendado' | 'costo_beneficio' | 'premium';
  onSelectTier: (tier: 'ia_recomendado' | 'costo_beneficio' | 'premium') => void;
  input: ClientProjectInput;
}

export const StepComparisonAndAlternatives: React.FC<StepComparisonAndAlternativesProps> = ({
  comparison,
  selectedTier,
  onSelectTier,
  input
}) => {
  const tiers = [
    {
      key: 'ia_recomendado' as const,
      badge: 'Recomendado por IA',
      badgeClass: 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-xs',
      product: comparison.aiRecommended,
      tagline: 'Solución técnica óptima según sustrato, fotos y metraje',
      highlightBorder: 'border-amber-500 ring-2 ring-amber-400/50 bg-amber-50/20'
    },
    {
      key: 'costo_beneficio' as const,
      badge: 'Mejor costo / beneficio',
      badgeClass: 'bg-blue-600 text-white font-bold border-blue-500',
      product: comparison.costBenefit,
      tagline: 'Excelente poder cubriente al precio más competitivo',
      highlightBorder: 'border-blue-500 ring-2 ring-blue-400/40 bg-blue-50/20'
    },
    {
      key: 'premium' as const,
      badge: 'Opción Premium',
      badgeClass: 'bg-purple-600 text-white font-bold border-purple-500',
      product: comparison.premium,
      tagline: 'Máxima durabilidad, sedosidad y resistencia al lavado',
      highlightBorder: 'border-purple-500 ring-2 ring-purple-400/40 bg-purple-50/20'
    }
  ];

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Section Header */}
      <div className="text-left space-y-1.5">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5 text-amber-600" />
          <span>Comparativa Inteligente de Alternativas Pintuco</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
          Elige la línea de pintura ideal para tu proyecto
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
          Comparamos las opciones certificadas para tu área de{' '}
          <strong className="text-slate-900">{input.estimatedM2 || 28} m²</strong>. Selecciona la que mejor se adapte a tu presupuesto y nivel de exigencia.
        </p>
      </div>

      {/* 3 Tier Comparison Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {tiers.map((t) => {
          const isSelected = selectedTier === t.key;
          const totalTierCost = t.product.priceCOP * t.product.suggestedQuantity;

          return (
            <div
              key={t.key}
              onClick={() => onSelectTier(t.key)}
              className={`relative rounded-3xl p-5 sm:p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                isSelected
                  ? `${t.highlightBorder} shadow-lg shadow-amber-500/10 scale-[1.02]`
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              {/* Top Badge */}
              <div className="space-y-3 text-left">
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-3 py-1 rounded-full text-[11px] uppercase tracking-wider border ${t.badgeClass}`}>
                    {t.badge}
                  </span>
                  {isSelected && (
                    <span className="flex items-center space-x-1 text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                      <Check className="w-3.5 h-3.5" />
                      <span>Seleccionada</span>
                    </span>
                  )}
                </div>

                {/* Product Image & Title */}
                <div className="flex items-center space-x-3.5 pt-1">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 relative">
                    <img
                      src={t.product.imageUrl}
                      alt={t.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                      {t.product.pintucoLine}
                    </span>
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug truncate">
                      {t.product.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{t.product.presentation}</p>
                  </div>
                </div>

                {/* Pricing & Estimation */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11px] text-slate-500">Precio por galón:</span>
                    <span className="text-sm font-bold text-slate-900">{formatCOP(t.product.priceCOP)}</span>
                  </div>
                  <div className="flex items-baseline justify-between pt-1 border-t border-slate-200/60">
                    <span className="text-[11px] font-semibold text-slate-700">
                      Total ({t.product.suggestedQuantity} gal):
                    </span>
                    <span className="text-base font-extrabold text-amber-900">{formatCOP(totalTierCost)}</span>
                  </div>
                </div>

                {/* Comparison Specs List */}
                <div className="space-y-2 pt-2 text-xs">
                  <div className="flex items-start justify-between text-slate-600 gap-2">
                    <span className="text-slate-500 shrink-0">Rendimiento:</span>
                    <span className="font-semibold text-slate-800 text-right">{t.product.coverageM2}</span>
                  </div>
                  <div className="flex items-start justify-between text-slate-600 gap-2">
                    <span className="text-slate-500 shrink-0">Acabado:</span>
                    <span className="font-semibold text-slate-800 text-right">{t.product.finish}</span>
                  </div>
                  <div className="flex items-start justify-between text-slate-600 gap-2">
                    <span className="text-slate-500 shrink-0">Garantía:</span>
                    <span className="font-semibold text-emerald-700 text-right">{t.product.durabilityYears} años certificada</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-50/50 border border-amber-100 text-[11px] text-amber-900 leading-snug">
                    <strong>Beneficio clave:</strong> {t.product.benefitKey}
                  </div>
                </div>
              </div>

              {/* Select Button */}
              <div className="pt-4 mt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTier(t.key);
                  }}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-slate-950" />
                      <span>Opción seleccionada</span>
                    </>
                  ) : (
                    <span>Elegir esta alternativa</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
