import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layers,
  Camera,
  Eye,
  Award,
  ShoppingCart,
  CreditCard,
  CheckCircle,
  ChevronLeft,
  MapPin
} from 'lucide-react';
import {
  AiTechnicalAnalysis,
  ClientProjectInput,
  SampleImageOption,
  TechnicalRecommendation,
  CartItem,
  ProjectOrder,
  DeliveryDetails
} from '../../types';
import { useColorLink } from '../../context/ColorLinkContext';
import { StepTransformationType } from './StepTransformationType';
import { StepGuidedAiCapture } from './StepGuidedAiCapture';
import { StepAiDiagnosticsAndTransformation } from './StepAiDiagnosticsAndTransformation';
import { StepSmartRecommendationCard } from './StepSmartRecommendationCard';
import { StepRecommendedProductsAndCart } from './StepRecommendedProductsAndCart';
import { StepSmartDeliveryAndLocation } from './StepSmartDeliveryAndLocation';
import { StepCheckoutColombia } from './StepCheckoutColombia';
import { StepOrderConfirmation } from './StepOrderConfirmation';

interface ClientWizardProps {
  input: ClientProjectInput;
  aiAnalysis: AiTechnicalAnalysis;
  recommendation: TechnicalRecommendation;
  onInputChange: (updates: Partial<ClientProjectInput>) => void;
  onSelectSampleImage: (sample: SampleImageOption) => void;
  onSendToDashboard: (orderData?: ProjectOrder, cartData?: CartItem[]) => void;
  onScheduleVisit: () => void;
  onRestart: () => void;
  onAnswerSmartQuestion?: (questionId: string, answer: string) => void;
  isSyncedToDashboard: boolean;
  onBackToWelcome?: () => void;
}

export const ClientWizard: React.FC<ClientWizardProps> = ({
  input,
  aiAnalysis,
  recommendation,
  onInputChange,
  onSelectSampleImage,
  onSendToDashboard,
  onScheduleVisit,
  onRestart,
  onAnswerSmartQuestion,
  isSyncedToDashboard,
  onBackToWelcome
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [confirmedOrder, setConfirmedOrder] = useState<ProjectOrder | null>(null);

  const {
    selectedTier,
    setSelectedTier,
    smartProductCalculation,
    systemComparison,
    recommendedProducts,
    cartItems,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    deliveryDetails,
    setDeliveryDetails,
    confirmOrder: saveOrderInContext
  } = useColorLink();

  const handleConfirmDelivery = (delivery: DeliveryDetails) => {
    setDeliveryDetails(delivery);
    setCurrentStep(7);
  };

  const handleOrderConfirmed = (order: ProjectOrder) => {
    setConfirmedOrder(order);
    saveOrderInContext(order);
    setCurrentStep(8);
    // Synchronize order with the database & requests tracker
    onSendToDashboard(order, cartItems);
  };

  const stepsList = [
    { num: 1, label: '1. Espacio', shortLabel: 'Espacio', icon: Layers },
    { num: 2, label: '2. Fotos', shortLabel: 'Fotos', icon: Camera },
    { num: 3, label: '3. Diagnóstico IA', shortLabel: 'Diagnóstico', icon: Eye },
    { num: 4, label: '4. Comparativa', shortLabel: 'Líneas', icon: Award },
    { num: 5, label: '5. Productos', shortLabel: 'Productos', icon: ShoppingCart },
    { num: 6, label: '6. Entrega & Tienda', shortLabel: 'Entrega', icon: MapPin },
    { num: 7, label: '7. Pago Seguro', shortLabel: 'Pago', icon: CreditCard },
    { num: 8, label: '8. Confirmación', shortLabel: 'Confirmado', icon: CheckCircle }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Top Stepper Navigation (Pintuco White & Amber Palette) */}
      <div className="max-w-5xl mx-auto px-2 sm:px-4">
        {/* Back to Home Link */}
        {onBackToWelcome && currentStep === 1 && (
          <div className="mb-3 text-left">
            <button
              onClick={onBackToWelcome}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-amber-600" />
              <span>Volver a la portada</span>
            </button>
          </div>
        )}

        <div className="flex items-center justify-between relative py-2 overflow-x-auto no-scrollbar">
          {/* Connecting Track Line */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-full bg-slate-200 -z-0 rounded-full" />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-amber-500 transition-all duration-500 -z-0 rounded-full shadow-xs"
            style={{ width: `${((currentStep - 1) / (stepsList.length - 1)) * 100}%` }}
          />

          {stepsList.map((step) => {
            const Icon = step.icon;
            const isPassed = currentStep > step.num;
            const isCurrent = currentStep === step.num;

            return (
              <button
                key={step.num}
                onClick={() => {
                  if (step.num <= currentStep || (step.num <= 6 && currentStep >= 5)) {
                    setCurrentStep(step.num);
                  }
                }}
                disabled={step.num > currentStep && currentStep < 5}
                className="relative z-10 flex flex-col items-center group cursor-pointer disabled:cursor-not-allowed px-1 sm:px-2"
              >
                <div
                  className={`w-7 h-7 sm:w-9 sm:h-9 rounded-2xl flex items-center justify-center transition-all duration-300 font-mono text-xs font-bold ${
                    isCurrent
                      ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-200 shadow-md scale-105'
                      : isPassed
                      ? 'bg-white text-amber-700 border-2 border-amber-500 shadow-xs'
                      : 'bg-white text-slate-400 border border-slate-200'
                  }`}
                >
                  {isPassed ? <CheckCircle2 className="w-4 h-4 text-amber-600" /> : <Icon className="w-3.5 h-3.5" />}
                </div>

                <span
                  className={`mt-1.5 text-[9px] sm:text-[11px] font-semibold tracking-tight transition-colors hidden md:block whitespace-nowrap ${
                    isCurrent
                      ? 'text-amber-800 font-bold'
                      : isPassed
                      ? 'text-slate-700'
                      : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </span>

                <span
                  className={`mt-1 text-[8px] font-semibold transition-colors md:hidden ${
                    isCurrent ? 'text-amber-800 font-bold' : 'text-slate-400'
                  }`}
                >
                  {step.shortLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Content Switcher */}
      <div className="min-h-[480px]">
        {currentStep === 1 && (
          <StepTransformationType
            input={input}
            onChange={onInputChange}
            onNext={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <StepGuidedAiCapture
            input={input}
            onChange={onInputChange}
            onSelectSampleImage={(sample) => {
              onSelectSampleImage(sample);
            }}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          <StepAiDiagnosticsAndTransformation
            input={input}
            aiAnalysis={aiAnalysis}
            recommendation={recommendation}
            onChange={onInputChange}
            onAnswerSmartQuestion={onAnswerSmartQuestion}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 4 && (
          <StepSmartRecommendationCard
            input={input}
            aiAnalysis={aiAnalysis}
            recommendation={recommendation}
            selectedTier={selectedTier}
            onSelectTier={(tier) => setSelectedTier(tier)}
            onNext={() => setCurrentStep(5)}
            onBack={() => setCurrentStep(3)}
            onScheduleVisit={onScheduleVisit}
          />
        )}

        {currentStep === 5 && (
          <StepRecommendedProductsAndCart
            input={input}
            calculation={smartProductCalculation}
            comparison={systemComparison}
            recommendedProducts={recommendedProducts}
            cartItems={cartItems}
            onAddToCart={addToCart}
            onUpdateCartQuantity={updateCartItemQuantity}
            onRemoveFromCart={removeFromCart}
            onNextToCheckout={() => setCurrentStep(6)}
            onBackToComparison={() => setCurrentStep(4)}
            onRequestAdvisory={onScheduleVisit}
          />
        )}

        {currentStep === 6 && (
          <StepSmartDeliveryAndLocation
            input={input}
            cartItems={cartItems}
            currentDelivery={deliveryDetails}
            onConfirmDelivery={handleConfirmDelivery}
            onBack={() => setCurrentStep(5)}
          />
        )}

        {currentStep === 7 && (
          <StepCheckoutColombia
            input={input}
            cartItems={cartItems}
            deliveryDetails={deliveryDetails}
            onConfirmOrder={handleOrderConfirmed}
            onBack={() => setCurrentStep(6)}
            onRequestAdvisory={onScheduleVisit}
            onChangeDelivery={() => setCurrentStep(6)}
          />
        )}

        {currentStep === 8 && confirmedOrder && (
          <StepOrderConfirmation
            order={confirmedOrder}
            onViewMyRequests={() => {
              if (onBackToWelcome) {
                onBackToWelcome();
              }
            }}
            onNewProject={() => {
              setCurrentStep(1);
              onRestart();
            }}
          />
        )}
      </div>
    </div>
  );
};
