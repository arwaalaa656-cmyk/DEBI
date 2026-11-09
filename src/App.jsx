import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import DestinationsPage from './pages/DestinationsPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import ScheduleModal from './components/ScheduleModal';
import Toast from './components/Toast';

function AppContent() {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'properties':
        return <PropertiesPage />;
      case 'property-detail':
        return <PropertyDetailPage />;
      case 'destinations':
        return <DestinationsPage />;
      case 'contact':
        return <ContactPage />;
      case 'about':
        return <AboutPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-stone-900 selection:bg-[#8E1B2D] selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <ScheduleModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
