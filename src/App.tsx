import React, { useMemo, useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { UserProfileModal } from './components/UserProfileModal';
import { WelcomeScreen } from './components/client/WelcomeScreen';
import { ClientWizard } from './components/client/ClientWizard';
import { MyRequestsTracker } from './components/client/MyRequestsTracker';
import { InternalDashboard } from './components/dashboard/InternalDashboard';
import { ScheduleVisitModal } from './components/ScheduleVisitModal';
import { INITIAL_REQUESTS, SAMPLE_IMAGES, SPACE_OPTIONS } from './data/mockData';
import {
  ClientProjectInput,
  ProjectRequest,
  ProjectStatus,
  SampleImageOption
} from './types';
import { runAiSurfaceDiagnostics } from './utils/aiDiagnostics';
import {
  Sparkles,
  Wand2,
  LayoutDashboard,
  Clock
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'welcome' | 'client' | 'requests' | 'dashboard'>('welcome');
  const [requests, setRequests] = useState<ProjectRequest[]>(INITIAL_REQUESTS);
  const [showScheduleModal, setShowScheduleModal] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [isSyncedToDashboard, setIsSyncedToDashboard] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Default input state with Colombian context
  const defaultInitialSample = SAMPLE_IMAGES[0];
  const [currentInput, setCurrentInput] = useState<ClientProjectInput>({
    transformationTarget: 'hogar',
    clientType: 'particular',
    clientName: 'Laura María Restrepo',
    clientEmail: 'laura.restrepo@pintuco-usuario.co',
    clientPhone: '+57 312 847 2910',
    clientCity: 'Bogotá D.C.',
    spaceType: 'hogar',
    specificSpaceSubtype: 'Sala / Comedor',
    specificArea: 'Zona social con muro de acento',
    currentCondition: 'humedad',
    estimatedM2: 28,
    trafficLevel: 'medio',
    urgency: 'alta',
    description: defaultInitialSample.defaultDescription,
    imageUrl: defaultInitialSample.url,
    imageUrls: [defaultInitialSample.url],
    imageFileName: 'muro_sala_humedad_bogota.jpg',
    preferredFinish: 'satinado',
    selectedStyle: 'lino-andino',
    selectedColorName: 'Lino Andino',
    selectedColorCode: 'PT-104',
    selectedColorHex: '#EAE5D9'
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
      imageUrls: [sample.url],
      imageFileName: `${sample.category}_${sample.id}.jpg`,
      spaceType: sample.category,
      estimatedM2: sample.areaM2,
      description: sample.defaultDescription
    }));
    showToast(`Espacio "${sample.title}" cargado para análisis IA Pintuco.`);
    setIsSyncedToDashboard(false);
  };

  const handleAnswerSmartQuestion = (questionId: string, answer: string) => {
    showToast(`Calibración IA Pintuco: "${answer}" registrada.`);
  };

  const handleSendToDashboard = () => {
    const randomCodeNum = Math.floor(8500 + Math.random() * 999);
    const newCode = `CLK-${randomCodeNum}`;

    const newRequest: ProjectRequest = {
      id: newCode,
      code: newCode,
      createdAt: 'Hace un momento',
      clientType: currentInput.clientType || 'particular',
      client: {
        name: currentInput.clientType === 'empresa'
          ? (currentInput.companyContactPerson || currentInput.companyName || 'Responsable Empresa')
          : (currentInput.clientName || 'Cliente Pintuco'),
        email: currentInput.clientEmail || 'cliente@pintuco.co',
        phone: currentInput.clientPhone || '+57 300 123 4567',
        city: currentInput.clientCity || 'Bogotá D.C.',
        companyName: currentInput.companyName,
        companyNit: currentInput.companyNit,
        contactPerson: currentInput.companyContactPerson
      },
      input: { ...currentInput },
      aiAnalysis: { ...aiAnalysis },
      recommendation: { ...recommendation },
      status: 'recibida',
      assignedTechnician: 'Ing. Carlos Mendoza (Pintuco Asesoría Técnica)',
      technicianNotes: `Solicitud originada en Asistente IA ColorLink. Espacio: ${currentInput.specificSpaceSubtype || 'Espacio'} (${currentInput.estimatedM2} m²). Sistema prescrito: ${recommendation.recommendedSystem}.`,
      lastUpdated: 'Ahora'
    };

    setRequests((prev) => [newRequest, ...prev]);
    setIsSyncedToDashboard(true);
    showToast(`¡Solicitud ${newCode} enviada al equipo técnico de Pintuco con éxito!`);
  };

  const handleUpdateStatus = (
    id: string,
    newStatus: ProjectStatus,
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
      transformationTarget: 'hogar',
      clientType: 'particular',
      clientName: 'Laura María Restrepo',
      clientEmail: 'laura.restrepo@pintuco-usuario.co',
      clientPhone: '+57 312 847 2910',
      clientCity: 'Bogotá D.C.',
      spaceType: 'hogar',
      specificSpaceSubtype: 'Sala / Comedor',
      specificArea: 'Zona social con muro de acento',
      currentCondition: 'bueno',
      estimatedM2: 28,
      trafficLevel: 'medio',
      urgency: 'normal',
      description: '',
      imageUrl: SAMPLE_IMAGES[0].url,
      imageUrls: [SAMPLE_IMAGES[0].url],
      imageFileName: 'foto_nuevo_espacio.jpg',
      preferredFinish: 'satinado',
      selectedStyle: 'lino-andino',
      selectedColorName: 'Lino Andino',
      selectedColorCode: 'PT-104',
      selectedColorHex: '#EAE5D9'
    });
    setIsSyncedToDashboard(false);
    showToast('Nueva consulta de transformación iniciada.');
  };

  const newRequestsCount = requests.filter((r) => r.status === 'recibida' || r.status === 'analizando').length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* Top Global Header (Pintuco Brand Identity) */}
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        onResetWizard={handleResetWizard}
        onLoadPreset={(sample) => {
          handleSelectSampleImage(sample);
          setCurrentView('client');
        }}
        onOpenProfile={() => setShowProfileModal(true)}
        samples={SAMPLE_IMAGES}
        totalRequestsCount={requests.length}
        newRequestsCount={newRequestsCount}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-50 animate-bounce max-w-sm">
          <div className="flex items-center space-x-2.5 px-4 py-3 rounded-2xl bg-white border border-amber-300 text-amber-900 text-xs font-semibold shadow-xl shadow-amber-500/10">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Container - Responsive with bottom padding for mobile dock */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 pb-24 sm:pb-12">
        
        {/* Pintuco Sub-Banner: Inspiration & Context (Only show in non-welcome or as subtle contextual bar) */}
        {currentView !== 'welcome' && (
          <div className="mb-6 flex flex-col md:flex-row items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs gap-3">
            <div className="flex items-center space-x-3 text-xs w-full md:w-auto">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
              <span className="text-slate-600 text-xs truncate">
                {currentView === 'client' && (
                  <>
                    <strong className="text-amber-800 font-semibold">Asistente IA Pintuco:</strong>{' '}
                    <span>Diagnóstico de espacio, cálculo de rendimiento y recomendación técnica.</span>
                  </>
                )}
                {currentView === 'requests' && (
                  <>
                    <strong className="text-blue-700 font-semibold">Mis Solicitudes:</strong>{' '}
                    <span>Rastreo de expedientes y cotizaciones técnicas en tiempo real.</span>
                  </>
                )}
                {currentView === 'dashboard' && (
                  <>
                    <strong className="text-slate-800 font-semibold">Consola Comercial & Técnica:</strong>{' '}
                    <span>Peritaje de recubrimientos y validación de laboratorio Pintuco.</span>
                  </>
                )}
              </span>
            </div>

            <div className="hidden sm:flex items-center space-x-2 shrink-0">
              {currentView !== 'requests' && (
                <button
                  onClick={() => setCurrentView('requests')}
                  className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-blue-800 border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>Mis Solicitudes ({requests.length})</span>
                </button>
              )}

              {currentView !== 'client' && (
                <button
                  onClick={() => setCurrentView('client')}
                  className="text-xs font-bold px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Transformar Espacio</span>
                </button>
              )}

              {currentView !== 'dashboard' && (
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-slate-500" />
                  <span>Gestión Interna</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Dynamic Views */}
        {currentView === 'welcome' ? (
          <WelcomeScreen
            onStartProject={() => {
              handleResetWizard();
              setCurrentView('client');
            }}
            onViewMyRequests={() => setCurrentView('requests')}
            onSelectInspirationPreset={(sample) => {
              handleSelectSampleImage(sample);
              setCurrentView('client');
            }}
            samples={SAMPLE_IMAGES}
          />
        ) : currentView === 'client' ? (
          <ClientWizard
            input={currentInput}
            aiAnalysis={aiAnalysis}
            recommendation={recommendation}
            onInputChange={handleInputChange}
            onSelectSampleImage={handleSelectSampleImage}
            onSendToDashboard={handleSendToDashboard}
            onScheduleVisit={() => setShowScheduleModal(true)}
            onRestart={() => setCurrentView('welcome')}
            onAnswerSmartQuestion={handleAnswerSmartQuestion}
            isSyncedToDashboard={isSyncedToDashboard}
          />
        ) : currentView === 'requests' ? (
          <MyRequestsTracker
            requests={requests}
            onSelectRequest={(req) => {
              setCurrentView('dashboard');
            }}
            onNewRequest={() => {
              handleResetWizard();
              setCurrentView('client');
            }}
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

      {/* User Profile Modal (Registro & Contacto) */}
      {showProfileModal && (
        <UserProfileModal
          input={currentInput}
          onSave={(updates) => {
            handleInputChange(updates);
            showToast('Perfil actualizado correctamente.');
          }}
          onClose={() => setShowProfileModal(false)}
        />
      )}

      {/* Schedule Visit Modal */}
      {showScheduleModal && (
        <ScheduleVisitModal
          input={currentInput}
          onClose={() => setShowScheduleModal(false)}
          onConfirm={(date, time) => {
            handleSendToDashboard();
            showToast(`Visita técnica agendada para el ${date} a las ${time}.`);
          }}
        />
      )}

      {/* Mobile Bottom Dock Bar */}
      <BottomNav
        currentView={currentView}
        onViewChange={setCurrentView}
        onOpenProfile={() => setShowProfileModal(true)}
        totalRequestsCount={requests.length}
        newRequestsCount={newRequestsCount}
      />

      {/* Footer Pintuco Colombia */}
      <footer className="border-t border-slate-200 py-6 bg-white text-center text-xs text-slate-500 font-mono hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-slate-600">
            <span className="font-bold text-amber-800">COLORLINK BY PINTUCO</span>
            <span>•</span>
            <span>El color de la calidad en Colombia</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-500">
            <span>Viniltex®</span>
            <span>•</span>
            <span>Koraza®</span>
            <span>•</span>
            <span>Sellomax®</span>
            <span>•</span>
            <span className="text-amber-800 font-semibold">Red Neuronal v4.2</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
