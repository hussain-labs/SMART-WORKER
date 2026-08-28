import React, { useState, useContext } from 'react';
import Navbar from './components/shared/Navbar';
import Hero from './components/shared/Hero';
import CategoryCards from './features/services/components/CategoryCards';
import Footer from './components/shared/Footer';
import AuthPage from './features/auth/pages/AuthPage';
import Dashboard from './features/dashboard/pages/Dashboard';
import SettingsModal from './features/dashboard/components/SettingsModal';
import ChatWidget from './features/chat/components/ChatWidget';
import TrendingServices from './features/services/components/TrendingServices';
import ServiceDetailPage from './features/services/pages/ServiceDetailPage';
import { AuthContext } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

function App() {
  const { user, loading, logout } = useContext(AuthContext);
  const [isAuthView, setIsAuthView] = useState(false);
  const [authInitialRole, setAuthInitialRole] = useState('client');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [activeDashboardView, setActiveDashboardView] = useState('client'); // 'worker' or 'client'

  const navigateToAuth = (role = 'client') => {
    if (typeof role === 'string') {
      setAuthInitialRole(role);
    }
    setIsAuthView(true);
  };

  const navigateToHome = () => {
    setIsAuthView(false);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-theme-bg text-espresso font-semibold">Loading...</div>;
  }

  if (isAuthView) {
    return <AuthPage onSuccess={navigateToHome} onBack={navigateToHome} initialRole={authInitialRole} />;
  }

  return (
    <NotificationProvider>
      <div className="flex flex-col min-h-screen bg-theme-bg font-sans">
        <Navbar
          user={user}
          openAuthModal={navigateToAuth}
          handleLogout={logout}
          openEditModal={() => setIsEditModalOpen(true)}
          openSettingsModal={() => setIsSettingsModalOpen(true)}
          showDashboard={showDashboard}
          onNavigateToDashboard={() => setShowDashboard(true)}
          activeDashboardView={activeDashboardView}
          setActiveDashboardView={setActiveDashboardView}
        />

        <main className="flex-1">
          {selectedService ? (
            <ServiceDetailPage 
              service={selectedService}
              onBack={() => setSelectedService(null)}
              user={user}
              openAuthModal={navigateToAuth}
            />
          ) : user && showDashboard ? (
            <Dashboard
              user={user}
              isEditModalOpen={isEditModalOpen}
              closeEditModal={() => setIsEditModalOpen(false)}
              openEditModal={() => setIsEditModalOpen(true)}
              onBackToHome={() => setShowDashboard(false)}
              activeDashboardView={activeDashboardView}
            />
          ) : (
            <>
              <Hero openAuthModal={navigateToAuth} />
              <CategoryCards />
              <TrendingServices onSelectService={setSelectedService} />
            </>
          )}
        </main>

        <Footer />

        {user && (
          <SettingsModal
            isOpen={isSettingsModalOpen}
            onClose={() => setIsSettingsModalOpen(false)}
            user={user}
          />
        )}
        
        {user && <ChatWidget user={user} />}
      </div>
    </NotificationProvider>
  );
}

export default App;
