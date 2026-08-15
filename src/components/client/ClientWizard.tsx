import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layers,
  Camera,
  Cpu,
  FileText
} from 'lucide-react';
import {
  AiTechnicalAnalysis,
  ClientProjectInput,
  SampleImageOption,
  SpaceType,
  TechnicalRecommendation
} from '../../types';
import { StepSpaceSelection } from './StepSpaceSelection';
import { StepSurfaceAndSpecs } from './StepSurfaceAndSpecs';
import { StepMediaAndContext } from './StepMediaAndContext';
import { StepLiveAiScanner } from './StepLiveAiScanner';
import { StepRecommendationResult } from './StepRecommendationResult';

interface ClientWizardProps {
  input: ClientProjectInput;
  aiAnalysis: AiTechnicalAnalysis;
  recommendation: TechnicalRecommendation;
  onInputChange: (updates: Partial<ClientProjectInput>) => void;
  onSelectSampleImage: (sample: SampleImageOption) => void;
  onSendToDashboard: () => void;
  onScheduleVisit: () => void;
  onRestart: () => void;
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
  isSyncedToDashboard
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const stepsList = [
    { num: 1, label: 'Espacio', icon: Layers },
    { num: 2, label: 'Superficie', icon: Sparkles },
    { num: 3, label: 'Captura IA', icon: Camera },
    { num: 4, label: 'Análisis', icon: Cpu },
    { num: 5, label: 'Solución', icon: FileText }
  ];

  const handleSelectSpace = (space: SpaceType) => {
    onInputChange({ spaceType: space });
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Visual Stepper Navigation Bar */}
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between relative">
          
          {/* Connecting line */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full bg-slate-800 -z-0" />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500 -z-0"
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
                  // Allow jumping back or to analyzed steps
                  if (step.num <= currentStep || (step.num === 5 && currentStep >= 4)) {
                    setCurrentStep(step.num);
                  }
                }}
                disabled={step.num > currentStep && currentStep < 4}
                className={`relative z-10 flex flex-col items-center group cursor-pointer disabled:cursor-not-allowed`}
              >
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 font-mono text-xs font-bold ${
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
                  className={`mt-1.5 text-[11px] sm:text-xs font-medium tracking-tight transition-colors hidden sm:block ${
                    isCurrent
                      ? 'text-cyan-400 font-bold'
                      : isPassed
                      ? 'text-slate-300'
                      : 'text-slate-500'
                  }`}
                >
                  {step.label}
                </span>
              </button>
            );
          })}

        </div>
      </div>

      {/* Step Content switcher */}
      <div className="min-h-[520px]">
        {currentStep === 1 && (
          <StepSpaceSelection
            selectedSpace={input.spaceType}
            onSelectSpace={handleSelectSpace}
            onNext={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <StepSurfaceAndSpecs
            input={input}
            onChange={onInputChange}
            onNext={() => setCurrentStep(3)}
            onPrev={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          <StepMediaAndContext
            input={input}
            onChange={onInputChange}
            onNext={() => setCurrentStep(4)}
            onPrev={() => setCurrentStep(2)}
            onSelectSampleImage={(sample) => {
              onSelectSampleImage(sample);
            }}
          />
        )}

        {currentStep === 4 && (
          <StepLiveAiScanner
            input={input}
            aiAnalysis={aiAnalysis}
            recommendation={recommendation}
            onCompleteAnalysis={() => setCurrentStep(5)}
          />
        )}

        {currentStep === 5 && (
          <StepRecommendationResult
            input={input}
            aiAnalysis={aiAnalysis}
            recommendation={recommendation}
            onSendToInternalDashboard={onSendToDashboard}
            onScheduleVisit={onScheduleVisit}
            onRestart={() => {
              onRestart();
              setCurrentStep(1);
            }}
            isSyncedToDashboard={isSyncedToDashboard}
          />
        )}
      </div>

    </div>
  );
};
