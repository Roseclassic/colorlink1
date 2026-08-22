import React, { useState } from 'react';
import { ColorLinkProvider, useColorLink } from './context/ColorLinkContext';
import { Header, PortalType, ClientSubView, DashboardSubView } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ClientAuthModal } from './components/client/ClientAuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { WelcomeScreen } from './components/client/WelcomeScreen';
import { ClientWizard } from './components/client/ClientWizard';
import { MyRequestsTracker } from './components/client/MyRequestsTracker';
import { InternalDashboard } from './components/dashboard/InternalDashboard';
import { ScheduleVisitModal } from './components/ScheduleVisitModal';
import { SAMPLE_IMAGES } from './data/mockData';
import {
  Sparkles,
  Layers,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { ProjectRequest, ProjectOrder, CartItem } from './types';

function ColorLinkApp() {
  const [activePortal, setActivePortal] = useState<PortalType>('cliente');
  const [clientView, setClientView] = useState<ClientSubView>('welcome');
  const [dashboardTab, setDashboardTab] = useState<DashboardSubView>('pipeline');

  const [showScheduleModal, setShowScheduleModal] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'register'>('login');
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [isSyncedToDashboard, setIsSyncedToDashboard] = useState<boolean>(false);

  const {
    currentUser,
    loginUser,
    logout,
    updateUserProfile,
    activeProjectInput,
    aiAnalysis,
    recommendation,
    updateActiveProjectInput,
    selectSampleImage,
    createRequestFromActiveProject,
    updateRequestStatus,
    resetActiveProject,
    loadRequestIntoActiveProject,
    allRequests,
    userRequests,
    allOrders,
    userOrders,
    toastMessage,
    showToast
  } = useColorLink();

  const handleOpenAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthInitialMode(mode);
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    logout();
    setClientView('welcome');
    setShowProfileModal(false);
  };

  const handleSendToDashboard = (orderData?: ProjectOrder, cartData?: CartItem[]) => {
    createRequestFromActiveProject(orderData, cartData);
    setIsSyncedToDashboard(true);
  };

  const handleRestartWizard = () => {
    resetActiveProject();
    setIsSyncedToDashboard(false);
    showToast('Nueva consulta de transformación iniciada.');
  };

  const newRequestsCount = allRequests.filter(
    (r) => r.status === 'nueva' || r.status === 'analizando'
  ).length;

  return (
    <div
      className={`min-h-screen flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900 ${
        activePortal === 'cliente'
          ? 'bg-slate-50 text-slate-800'
          : 'bg-slate-950 text-slate-100'
      }`}
    >
      {/* Top Global Header with Portal Switcher */}
      <Header
        activePortal={activePortal}
        onSelectPortal={setActivePortal}
        clientView={clientView}
        onClientViewChange={setClientView}
        dashboardTab={dashboardTab}
        onDashboardTabChange={setDashboardTab}
        onResetWizard={handleRestartWizard}
        onLoadPreset={(sample) => {
          selectSampleImage(sample);
          setActivePortal('cliente');
          setClientView('wizard');
        }}
        onOpenProfile={() => setShowProfileModal(true)}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onOpenProfileTab={() => setShowProfileModal(true)}
        currentUser={currentUser}
        samples={SAMPLE_IMAGES}
        totalRequestsCount={allRequests.length}
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
                currentUser={currentUser}
                onStartProject={() => {
                  handleRestartWizard();
                  setClientView('wizard');
                }}
                onViewMyRequests={() => setClientView('requests')}
                onSelectInspirationPreset={(sample) => {
                  selectSampleImage(sample);
                  setClientView('wizard');
                }}
                onOpenAuth={handleOpenAuth}
                onOpenProfile={() => setShowProfileModal(true)}
                samples={SAMPLE_IMAGES}
              />
            )}

            {clientView === 'wizard' && (
              <ClientWizard
                input={activeProjectInput}
                aiAnalysis={aiAnalysis}
                recommendation={recommendation}
                onInputChange={updateActiveProjectInput}
                onSelectSampleImage={selectSampleImage}
                onSendToDashboard={handleSendToDashboard}
                onScheduleVisit={() => setShowScheduleModal(true)}
                onRestart={() => setClientView('welcome')}
                onAnswerSmartQuestion={(qid, ans) => {
                  showToast(`Calibración IA: "${ans}" registrada.`);
                }}
                isSyncedToDashboard={isSyncedToDashboard}
                onBackToWelcome={() => setClientView('welcome')}
              />
            )}

            {clientView === 'requests' && (
              <MyRequestsTracker
                requests={userRequests}
                onSelectRequest={(req) => {
                  loadRequestIntoActiveProject(req);
                  setClientView('wizard');
                }}
                onNewRequest={() => {
                  handleRestartWizard();
                  setClientView('wizard');
                }}
              />
            )}
          </>
        ) : (
          /* PORTAL 2: COMPANY / INTERNAL OPERATIONS EXPERIENCE (Access to all requests) */
          <InternalDashboard
            requests={allRequests}
            onUpdateStatus={updateRequestStatus}
            onCreateNewClientFlow={() => {
              handleRestartWizard();
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
          initialMode={authInitialMode}
          onLoginSuccess={(user, rememberMe) => {
            loginUser(user, rememberMe);
          }}
          onClose={() => setShowAuthModal(false)}
        />
      )}

      {/* User Profile & Management Modal */}
      {showProfileModal && (
        <UserProfileModal
          user={currentUser}
          requests={userRequests}
          orders={userOrders}
          onUpdateUser={updateUserProfile}
          onLogout={handleLogout}
          onClose={() => setShowProfileModal(false)}
          onNavigateToRequests={() => {
            setClientView('requests');
          }}
        />
      )}

      {/* Schedule Visit Modal */}
      {showScheduleModal && (
        <ScheduleVisitModal
          input={activeProjectInput}
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
        onOpenProfile={() => {
          if (currentUser) {
            setShowProfileModal(true);
          } else {
            handleOpenAuth('login');
          }
        }}
        totalRequestsCount={allRequests.length}
        newRequestsCount={newRequestsCount}
      />

      {/* Global Pintuco Colombia Footer */}
      <footer
        className={`border-t py-6 text-center text-xs font-mono hidden sm:block transition-colors ${
          activePortal === 'cliente'
            ? 'bg-white border-slate-200 text-slate-500'
            : 'bg-slate-900 border-slate-800 text-slate-400'
        }`}
      >
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

export default function App() {
  return (
    <ColorLinkProvider>
      <ColorLinkApp />
    </ColorLinkProvider>
  );
}
