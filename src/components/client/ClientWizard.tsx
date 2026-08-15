import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layers,
  Camera,
  Cpu,
  FileText,
  UserCheck,
  Award,
  Eye,
  Sliders
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
  isSyncedToDashboard
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const stepsList = [
    { num: 1, label: '1. Transformación', shortLabel: 'Espacio', icon: Layers },
    { num: 2, label: '2. Tu Espacio', shortLabel: 'Foto', icon: Camera },
    { num: 3, label: '3. Diagnóstico & Antes/Después', shortLabel: 'Simulación', icon: Eye },
    { num: 4, label: '4. Recomendación', shortLabel: 'Pintuco', icon: Award },
    { num: 5, label: '5. Ficha Digital', shortLabel: 'Ficha', icon: FileText }
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Visual Stepper Navigation Bar */}
      <div className="max-w-4xl mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between relative">
          
          {/* Connecting line */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full bg-slate-800 -z-0" />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 transition-all duration-500 -z-0"
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
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 font-mono text-xs font-bold ${
                    isCurrent
                      ? 'bg-cyan-500 text-slate-950 ring-4 ring-cyan-500/20 shadow-lg shadow-cyan-500/30 scale-110'
                      : isPassed
                      ? 'bg-slate-800 text-cyan-400 border border-cyan-500/40'
                      : 'bg-slate-900 text-slate-500 border border-slate-800'
                  }`}
                >
                  {isPassed ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>

                <span
                  className={`mt-1.5 text-[10px] sm:text-xs font-medium tracking-tight transition-colors hidden sm:block ${
                    isCurrent
                      ? 'text-cyan-400 font-bold'
                      : isPassed
                      ? 'text-slate-300'
                      : 'text-slate-500'
                  }`}
                >
                  {step.label}
                </span>

                <span
                  className={`mt-1 text-[9px] font-medium transition-colors sm:hidden ${
                    isCurrent ? 'text-cyan-400 font-bold' : 'text-slate-500'
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
      <div className="min-h-[520px]">
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
