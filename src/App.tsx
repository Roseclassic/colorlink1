import React, { useMemo, useState } from 'react';
import { Header } from './components/Header';
import { ClientWizard } from './components/client/ClientWizard';
import { InternalDashboard } from './components/dashboard/InternalDashboard';
import { ScheduleVisitModal } from './components/ScheduleVisitModal';
import { INITIAL_REQUESTS, SAMPLE_IMAGES, SPACE_OPTIONS } from './data/mockData';
import {
  ClientProjectInput,
  ProjectRequest,
  RequestStatus,
  SampleImageOption
} from './types';
import { runAiSurfaceDiagnostics } from './utils/aiDiagnostics';
import { CheckCircle2, Sparkles, Wand2, LayoutDashboard, ArrowRight } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'client' | 'dashboard'>('client');
  const [requests, setRequests] = useState<ProjectRequest[]>(INITIAL_REQUESTS);
  const [showScheduleModal, setShowScheduleModal] = useState<boolean>(false);
  const [isSyncedToDashboard, setIsSyncedToDashboard] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Default input state
  const defaultInitialSample = SAMPLE_IMAGES[0];
  const [currentInput, setCurrentInput] = useState<ClientProjectInput>({
    spaceType: 'hogar',
    specificArea: 'Salón / Comedor',
    currentCondition: 'humedad',
    estimatedM2: 28,
    trafficLevel: 'medio',
    urgency: 'alta',
    description: defaultInitialSample.defaultDescription,
    imageUrl: defaultInitialSample.url,
    imageFileName: 'muro_salon_filtracion.jpg',
    preferredFinish: 'mate',
    clientName: 'Daniela Alarcón',
    clientEmail: 'daniela.alarcon@gmail.com',
    clientPhone: '+34 654 321 987',
    clientCity: 'Madrid'
  });

  // Calculate live AI diagnostic & coating recommendation
  const { aiAnalysis, recommendation } = useMemo(() => {
    return runAiSurfaceDiagnostics(currentInput);
  }, [currentInput]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleInputChange = (updates: Partial<ClientProjectInput>) => {
    setCurrentInput((prev) => {
      const next = { ...prev, ...updates };
      // If spaceType changed and specificArea is no longer in subtypes, update specificArea
      if (updates.spaceType && updates.spaceType !== prev.spaceType) {
        const spaceConf = SPACE_OPTIONS.find((s) => s.id === updates.spaceType);
        if (spaceConf && spaceConf.subtypes.length > 0) {
          next.specificArea = spaceConf.subtypes[0];
        }
      }
      return next;
    });
    setIsSyncedToDashboard(false);
  };

  const handleSelectSampleImage = (sample: SampleImageOption) => {
    setCurrentInput((prev) => ({
      ...prev,
      imageUrl: sample.url,
      imageFileName: `${sample.category}_${sample.id}.jpg`,
      spaceType: sample.category,
      estimatedM2: sample.areaM2,
      description: sample.defaultDescription
    }));
    showToast(`Muestra "${sample.title}" cargada para análisis IA.`);
    setIsSyncedToDashboard(false);
  };

  const handleSendToDashboard = () => {
    const randomCodeNum = Math.floor(1000 + Math.random() * 9000);
    const newCode = `CLK-${randomCodeNum}`;

    const newRequest: ProjectRequest = {
      id: `req-${Date.now()}`,
      code: newCode,
      createdAt: 'Hace un momento',
      client: {
        name: currentInput.clientName || 'Cliente Digital',
        email: currentInput.clientEmail || 'cliente@colorlink.ai',
        phone: currentInput.clientPhone || '+34 600 000 000',
        city: currentInput.clientCity || 'Madrid'
      },
      input: { ...currentInput },
      aiAnalysis: { ...aiAnalysis },
      recommendation: { ...recommendation },
      status: 'nueva',
      technicianNotes: `Solicitud originada desde el Asistente IA. Sistema recomendado: ${recommendation.recommendedSystem}.`,
      lastUpdated: 'Ahora'
    };

    setRequests((prev) => [newRequest, ...prev]);
    setIsSyncedToDashboard(true);
    showToast(`¡Solicitud ${newCode} enviada al CRM interno de ColorLink!`);
  };

  const handleUpdateStatus = (
    id: string,
    newStatus: RequestStatus,
    technicianNotes?: string,
    quotedAmount?: number
  ) => {
    setRequests((prev) =>
      prev.map((req) => {
        if (req.id === id) {
          return {
            ...req,
            status: newStatus,
            technicianNotes: technicianNotes !== undefined ? technicianNotes : req.technicianNotes,
            quotedAmount: quotedAmount !== undefined ? quotedAmount : req.quotedAmount,
            lastUpdated: 'Reciente'
          };
        }
        return req;
      })
    );
    showToast(`Estado de la solicitud actualizado a "${newStatus.toUpperCase()}".`);
  };

  const handleResetWizard = () => {
    setCurrentInput({
      spaceType: 'hogar',
      specificArea: 'Salón / Comedor',
      currentCondition: 'bueno',
      estimatedM2: 30,
      trafficLevel: 'medio',
      urgency: 'normal',
      description: '',
      imageUrl: SAMPLE_IMAGES[0].url,
      imageFileName: 'foto_muestra_1.jpg',
      preferredFinish: 'satinado',
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      clientCity: 'Madrid'
    });
    setIsSyncedToDashboard(false);
    showToast('Nueva consulta iniciada.');
  };

  const newRequestsCount = requests.filter((r) => r.status === 'nueva').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      
      {/* Top Global Header */}
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        onResetWizard={handleResetWizard}
        onLoadPreset={handleSelectSampleImage}
        samples={SAMPLE_IMAGES}
        totalRequestsCount={requests.length}
        newRequestsCount={newRequestsCount}
      />

      {/* Toast Notification Floating */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="flex items-center space-x-2 px-4 py-3 rounded-2xl bg-slate-900/95 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-2xl shadow-cyan-500/20 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* View Switcher Banner for live demo clarity */}
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 gap-3">
          <div className="flex items-center space-x-3 text-xs">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-slate-400">
              Vista activa: <strong className="text-white">{currentView === 'client' ? 'Experiencia Conversacional Cliente (Asistente IA)' : 'Panel de Gestión Operativa (Dashboard Interno)'}</strong>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentView(currentView === 'client' ? 'dashboard' : 'client')}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {currentView === 'client' ? (
                <>
                  <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Ver Gestión Interna ({requests.length} solicitudes)</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Volver al Asistente Cliente</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Content View */}
        {currentView === 'client' ? (
          <ClientWizard
            input={currentInput}
            aiAnalysis={aiAnalysis}
            recommendation={recommendation}
            onInputChange={handleInputChange}
            onSelectSampleImage={handleSelectSampleImage}
            onSendToDashboard={handleSendToDashboard}
            onScheduleVisit={() => setShowScheduleModal(true)}
            onRestart={handleResetWizard}
            isSyncedToDashboard={isSyncedToDashboard}
          />
        ) : (
          <InternalDashboard
            requests={requests}
            onUpdateStatus={handleUpdateStatus}
            onCreateNewClientFlow={() => {
              handleResetWizard();
              setCurrentView('client');
            }}
          />
        )}

      </main>

      {/* Schedule Visit Modal */}
      {showScheduleModal && (
        <ScheduleVisitModal
          input={currentInput}
          onClose={() => setShowScheduleModal(false)}
          onConfirm={(date, time) => {
            handleSendToDashboard();
            showToast(`Visita agendada para el ${date} a las ${time}.`);
          }}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 bg-slate-950/80 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>COLORLINK AI • Transformando solicitudes en diagnósticos inteligentes</span>
          <div className="flex items-center space-x-3 text-slate-400">
            <span>Red Neuronal v4.2</span>
            <span>•</span>
            <span>Normativa EN 13300</span>
            <span>•</span>
            <span className="text-cyan-400">Frontend MVP Demo</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
