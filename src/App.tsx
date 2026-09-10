import { useState, useCallback } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { NeedPicker } from './components/NeedPicker';
import { Services } from './components/Services';
import { About } from './components/About';
import { Testimonials } from './components/Testimonials';
import { LocationSection } from './components/LocationSection';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BookingModal } from './components/BookingModal';
import { LegalPage } from './components/LegalPage';
import { BOOKING_ENABLED_IN_PRODUCTION } from './data/bookingConfig';
import { NeedOption } from './data/siteData';

const isBookingEnabled = import.meta.env.DEV || BOOKING_ENABLED_IN_PRODUCTION;

function MainSite() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [splashDone, setSplashDone] = useState(false);
  const [activeNeedFilterId, setActiveNeedFilterId] = useState<string | null>(null);

  const handleSplashFinished = useCallback(() => setSplashDone(true), []);

  const handleSelectNeed = (need: NeedOption) => {
    setActiveNeedFilterId(need.id);
  };

  return (
    <div className="min-h-screen bg-[#15140C] text-[#F2F0EA] selection:bg-[#4E7A36] selection:text-[#F2F0EA] font-sans antialiased overflow-x-hidden">

      {/* Splash Screen */}
      {!splashDone && <SplashScreen onFinished={handleSplashFinished} />}
      
      {/* Header */}
      <Header
        bookingEnabled={isBookingEnabled}
        onOpenBookingModal={() => setBookingModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section (Primeira tela) */}
        <Hero
          bookingEnabled={isBookingEnabled}
          onOpenBookingModal={() => setBookingModalOpen(true)}
        />

        {/* 2. Escolha por necessidade */}
        <NeedPicker
          activeNeedId={activeNeedFilterId}
          onSelectNeed={handleSelectNeed}
        />

        {/* 3. Nossas massagens & Massagem em dupla */}
        <Services
          activeNeedFilterId={activeNeedFilterId}
          onClearFilter={() => setActiveNeedFilterId(null)}
        />

        {/* 4. Sobre a Renovo, Mensagem da Fundadora e Atendimento Profissional */}
        <About />

        {/* 5. Avaliações reais do Google */}
        <Testimonials />

        {/* 6. Localização (Destaque Palmares - Belo Horizonte) */}
        <LocationSection />

        {/* 7. Dúvidas frequentes (FAQ) */}
        <FAQSection />

        {/* 8. Chamada final */}
        <CTASection
          bookingEnabled={isBookingEnabled}
          onOpenBookingModal={() => setBookingModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Sticky WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Interactive Quick Booking Modal */}
      {isBookingEnabled && (
        <BookingModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
        />
      )}

    </div>
  );
}

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';

  if (path === '/politica-de-privacidade') {
    return <LegalPage kind="privacy" />;
  }

  if (path === '/termos-de-uso') {
    return <LegalPage kind="terms" />;
  }

  return <MainSite />;
}
