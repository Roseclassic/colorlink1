import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layers,
  Camera,
  Eye,
  FileText,
  Award,
  ChevronLeft
} from 'lucide-react';
import {
  AiTechnicalAnalysis,
  ClientProjectInput,
  SampleImageOption,
  TechnicalRecommendation
} from '../../types';
import { StepTransformationType } from './StepTransformationType';
import { StepGuidedAiCapture } from './StepGuidedAiCapture';
import { StepAiDiagnosticsAndTransformation } from './StepAiDiagnosticsAndTransformation';
import { StepSmartRecommendationCard } from './StepSmartRecommendationCard';
import { StepSmartFicha } from './StepSmartFicha';

interface ClientWizardProps {
  input: ClientProjectInput;
  aiAnalysis: AiTechnicalAnalysis;
  recommendation: TechnicalRecommendation;
  onInputChange: (updates: Partial<ClientProjectInput>) => void;
  onSelectSampleImage: (sample: SampleImageOption) => void;
  onSendToDashboard: () => void;
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

  const stepsList = [
    { num: 1, label: '1. Inspiración & Espacio', shortLabel: 'Espacio', icon: Layers },
    { num: 2, label: '2. Foto de tu Muro', shortLabel: 'Fotos', icon: Camera },
    { num: 3, label: '3. Diagnóstico IA', shortLabel: 'IA & Color', icon: Eye },
    { num: 4, label: '4. Recomendación Pintuco', shortLabel: 'Solución', icon: Award },
    { num: 5, label: '5. Ficha & Asesoría', shortLabel: 'Ficha', icon: FileText }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* Top Breadcrumb / Stepper Navigation (Limpio, Blanco, Suave) */}
      <div className="max-w-4xl mx-auto px-2 sm:px-4">
        
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

        <div className="flex items-center justify-between relative py-2">
          
          {/* Connecting Track Line */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-full bg-slate-200 -z-0 rounded-full" />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-500 -z-0 rounded-full shadow-sm shadow-amber-300"
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
                  if (step.num <= currentStep || (step.num === 5 && currentStep >= 4)) {
                    setCurrentStep(step.num);
                  }
                }}
                disabled={step.num > currentStep && currentStep < 4}
                className={`relative z-10 flex flex-col items-center group cursor-pointer disabled:cursor-not-allowed`}
              >
                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center transition-all duration-300 font-mono text-xs font-bold ${
                    isCurrent
                      ? 'bg-gradient-to-br from-amber-400 to-yellow-400 text-slate-950 ring-4 ring-amber-200 shadow-md shadow-amber-500/20 scale-110'
                      : isPassed
                      ? 'bg-white text-amber-700 border-2 border-amber-500 shadow-sm'
                      : 'bg-white text-slate-400 border border-slate-200'
                  }`}
                >
                  {isPassed ? <CheckCircle2 className="w-4 h-4 text-amber-600" /> : <Icon className="w-4 h-4" />}
                </div>

                <span
                  className={`mt-1.5 text-[11px] sm:text-xs font-semibold tracking-tight transition-colors hidden sm:block ${
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
                  className={`mt-1 text-[10px] font-semibold transition-colors sm:hidden ${
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
            onNext={() => setCurrentStep(5)}
            onBack={() => setCurrentStep(3)}
            onScheduleVisit={onScheduleVisit}
          />
        )}

        {currentStep === 5 && (
          <StepSmartFicha
            input={input}
            aiAnalysis={aiAnalysis}
            recommendation={recommendation}
            onChange={onInputChange}
            onSendToDashboard={onSendToDashboard}
            onScheduleVisit={onScheduleVisit}
            onRestart={() => {
              setCurrentStep(1);
              onRestart();
            }}
            isSyncedToDashboard={isSyncedToDashboard}
            onBack={() => setCurrentStep(4)}
          />
        )}
      </div>

    </div>
  );
};
