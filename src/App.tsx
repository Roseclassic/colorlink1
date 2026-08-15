import React, { useMemo, useState } from 'react';
import { Header, PortalType, ClientSubView, DashboardSubView } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ClientAuthModal } from './components/client/ClientAuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { WelcomeScreen } from './components/client/WelcomeScreen';
import { ClientWizard } from './components/client/ClientWizard';
import { MyRequestsTracker } from './components/client/MyRequestsTracker';
import { InternalDashboard } from './components/dashboard/InternalDashboard';
import { ScheduleVisitModal } from './components/ScheduleVisitModal';
import { INITIAL_REQUESTS, SAMPLE_IMAGES, SPACE_OPTIONS, PROCESS_STAGES } from './data/mockData';
import {
  ClientProjectInput,
  ProjectRequest,
  RequestStatus,
  SampleImageOption,
  ClientUser
} from './types';
import { runAiSurfaceDiagnostics } from './utils/aiDiagnostics';
import {
  Sparkles,
  Wand2,
  LayoutDashboard,
  Clock,
  Building2,
  User,
  ArrowRightLeft,
  Layers,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  const [activePortal, setActivePortal] = useState<PortalType>('cliente');
  const [clientView, setClientView] = useState<ClientSubView>('welcome');
  const [dashboardTab, setDashboardTab] = useState<DashboardSubView>('pipeline');

  const [requests, setRequests] = useState<ProjectRequest[]>(INITIAL_REQUESTS);
  const [showScheduleModal, setShowScheduleModal] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [isSyncedToDashboard, setIsSyncedToDashboard] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Authenticated user state (Default logged-in sample user)
  const [currentUser, setCurrentUser] = useState<ClientUser | null>({
    id: 'usr-001',
    name: 'Laura María Restrepo',
    email: 'laura.restrepo@pintuco-usuario.co',
    phone: '+57 312 847 2910',
    city: 'Bogotá D.C.',
    clientType: 'particular',
    registeredDate: '2026-08-10',
    activeProjectsCount: 2,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  });

  // Default input state with Colombian context
  const defaultInitialSample = SAMPLE_IMAGES[0];
  const [currentInput, setCurrentInput] = useState<ClientProjectInput>({
    transformationTarget: 'hogar',
    clientType: currentUser?.clientType || 'particular',
    clientName: currentUser?.name || 'Laura María Restrepo',
    clientEmail: currentUser?.email || 'laura.restrepo@pintuco-usuario.co',
    clientPhone: currentUser?.phone || '+57 312 847 2910',
    clientCity: currentUser?.city || 'Bogotá D.C.',
    companyName: currentUser?.companyName,
    companyNit: currentUser?.companyNit,
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

  // Live AI diagnostic & coating recommendation
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
          : (currentInput.clientName || currentUser?.name || 'Cliente Pintuco'),
        email: currentInput.clientEmail || currentUser?.email || 'cliente@pintuco.co',
        phone: currentInput.clientPhone || currentUser?.phone || '+57 300 123 4567',
        city: currentInput.clientCity || currentUser?.city || 'Bogotá D.C.',
        companyName: currentInput.companyName || currentUser?.companyName,
        companyNit: currentInput.companyNit || currentUser?.companyNit,
        contactPerson: currentInput.companyContactPerson
      },
      input: { ...currentInput },
      aiAnalysis: { ...aiAnalysis },
      recommendation: { ...recommendation },
      status: 'nueva',
      assignedTechnician: 'Ing. Carlos Mendoza (Pintuco Asesoría Técnica)',
      technicianNotes: `Solicitud registrada en Asistente IA ColorLink. Espacio: ${currentInput.specificSpaceSubtype || 'Espacio'} (${currentInput.estimatedM2} m²). Sistema formulado: ${recommendation.recommendedSystem}.`,
      lastUpdated: 'Ahora'
    };

    setRequests((prev) => [newRequest, ...prev]);
    setIsSyncedToDashboard(true);
    showToast(`¡Solicitud ${newCode} enviada a ColorLink Pintuco! Puedes verla en "Mis Solicitudes".`);
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
    showToast(`Estado actualizado a "${newStatus.toUpperCase()}".`);
  };

  const handleResetWizard = () => {
    setCurrentInput({
      transformationTarget: 'hogar',
      clientType: currentUser?.clientType || 'particular',
      clientName: currentUser?.name || 'Laura María Restrepo',
      clientEmail: currentUser?.email || 'laura.restrepo@pintuco-usuario.co',
      clientPhone: currentUser?.phone || '+57 312 847 2910',
      clientCity: currentUser?.city || 'Bogotá D.C.',
      companyName: currentUser?.companyName,
      companyNit: currentUser?.companyNit,
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

  const newRequestsCount = requests.filter((r) => r.status === 'nueva' || r.status === 'analizando').length;

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900 ${
      activePortal === 'cliente' ? 'bg-slate-50 text-slate-800' : 'bg-slate-950 text-slate-100'
    }`}>
      
      {/* Top Global Header with Portal Switcher */}
      <Header
        activePortal={activePortal}
        onSelectPortal={setActivePortal}
        clientView={clientView}
        onClientViewChange={setClientView}
        dashboardTab={dashboardTab}
        onDashboardTabChange={setDashboardTab}
        onResetWizard={handleResetWizard}
        onLoadPreset={(sample) => {
          handleSelectSampleImage(sample);
          setActivePortal('cliente');
          setClientView('wizard');
        }}
        onOpenProfile={() => setShowAuthModal(true)}
        currentUser={currentUser}
        samples={SAMPLE_IMAGES}
        totalRequestsCount={requests.length}
        newRequestsCount={newRequestsCount}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-50 animate-bounce max-w-sm">
          <div className="flex items-center space-x-2.5 px-4 py-3 rounded-2xl bg-white border border-amber-300 text-amber-900 text-xs font-semibold shadow-xl shadow-amber-500/10 text-left">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 pb-24 sm:pb-12">
        
        {/* PORTAL 1: CLIENT EXPERIENCE */}
        {activePortal === 'cliente' ? (
          <>
            {clientView === 'welcome' && (
              <WelcomeScreen
                onStartProject={() => {
                  handleResetWizard();
                  setClientView('wizard');
                }}
                onViewMyRequests={() => setClientView('requests')}
                onSelectInspirationPreset={(sample) => {
                  handleSelectSampleImage(sample);
                  setClientView('wizard');
                }}
                samples={SAMPLE_IMAGES}
              />
            )}

            {clientView === 'wizard' && (
              <ClientWizard
                input={currentInput}
                aiAnalysis={aiAnalysis}
                recommendation={recommendation}
                onInputChange={handleInputChange}
                onSelectSampleImage={handleSelectSampleImage}
                onSendToDashboard={handleSendToDashboard}
                onScheduleVisit={() => setShowScheduleModal(true)}
                onRestart={() => setClientView('welcome')}
                onAnswerSmartQuestion={handleAnswerSmartQuestion}
                isSyncedToDashboard={isSyncedToDashboard}
              />
            )}

            {clientView === 'requests' && (
              <MyRequestsTracker
                requests={requests}
                onSelectRequest={(req) => {
                  // If client clicks to view details, switch to enterprise view or show full spec
                  setActivePortal('empresa');
                }}
                onNewRequest={() => {
                  handleResetWizard();
                  setClientView('wizard');
                }}
              />
            )}
          </>
        ) : (
          /* PORTAL 2: COMPANY / INTERNAL OPERATIONS EXPERIENCE */
          <InternalDashboard
            requests={requests}
            onUpdateStatus={handleUpdateStatus}
            onCreateNewClientFlow={() => {
              handleResetWizard();
              setActivePortal('cliente');
              setClientView('wizard');
            }}
            activeTab={dashboardTab}
            onTabChange={setDashboardTab}
          />
        )}

      </main>

      {/* Client Registration & Authentication Modal */}
      {showAuthModal && (
        <ClientAuthModal
          currentUser={currentUser}
          onLoginSuccess={(user) => {
            setCurrentUser(user);
            handleInputChange({
              clientName: user.name,
              clientEmail: user.email,
              clientPhone: user.phone,
              clientCity: user.city,
              clientType: user.clientType,
              companyName: user.companyName,
              companyNit: user.companyNit
            });
            showToast(`¡Hola ${user.name}! Sesión iniciada en Mi Espacio.`);
          }}
          onClose={() => setShowAuthModal(false)}
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
        activePortal={activePortal}
        onSelectPortal={setActivePortal}
        clientView={clientView}
        onClientViewChange={setClientView}
        dashboardTab={dashboardTab}
        onDashboardTabChange={setDashboardTab}
        onOpenProfile={() => setShowAuthModal(true)}
        totalRequestsCount={requests.length}
        newRequestsCount={newRequestsCount}
      />

      {/* Global Pintuco Colombia Footer */}
      <footer className={`border-t py-6 text-center text-xs font-mono hidden sm:block transition-colors ${
        activePortal === 'cliente'
          ? 'bg-white border-slate-200 text-slate-500'
          : 'bg-slate-900 border-slate-800 text-slate-400'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-amber-500">COLORLINK BY PINTUCO</span>
            <span>•</span>
            <span>Transformación & Prescripción Técnica de Espacios • Colombia</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-500">
            <span>Viniltex®</span>
            <span>•</span>
            <span>Koraza®</span>
            <span>•</span>
            <span>Sellomax®</span>
            <span>•</span>
            <span className="text-amber-500 font-semibold">IA Visión v4.2</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
