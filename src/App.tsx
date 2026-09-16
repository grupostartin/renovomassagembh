import { useState, useCallback, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CoupleMassageBanner } from './components/CoupleMassageBanner';
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

import { AboutAndReviewsMobile } from './components/AboutAndReviewsMobile';
import { MobileScrollIndicator } from './components/MobileScrollIndicator';

const isBookingEnabled = import.meta.env.DEV || BOOKING_ENABLED_IN_PRODUCTION;

function MainSite() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [splashDone, setSplashDone] = useState(false);
  const [isSiteEntering, setIsSiteEntering] = useState(false);
  const [isEntranceFinished, setIsEntranceFinished] = useState(false);
  const [activeNeedFilterId, setActiveNeedFilterId] = useState<string | null>(null);

  const handleSplashLeaving = useCallback(() => {
    setIsSiteEntering(true);
  }, []);

  const handleSplashFinished = useCallback(() => {
    setSplashDone(true);
  }, []);

  useEffect(() => {
    if (isSiteEntering && !isEntranceFinished) {
      const timer = setTimeout(() => {
        setIsEntranceFinished(true);
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [isSiteEntering, isEntranceFinished]);

  const handleSelectNeed = (need: NeedOption) => {
    setActiveNeedFilterId(need.id);
  };

  return (
    <>
      {/* Splash Screen — 100% nítida e totalmente isolada de qualquer filtro de blur */}
      {!splashDone && (
        <SplashScreen
          onLeaving={handleSplashLeaving}
          onFinished={handleSplashFinished}
        />
      )}

      {/* Header — Fixo na Viewport Raiz (livre de filtros ou transforms) */}
      <Header
        bookingEnabled={isBookingEnabled}
        onOpenBookingModal={() => setBookingModalOpen(true)}
      />

      {/* Conteúdo Principal — revela com transição suave assim que a splash sai */}
      <div
        onAnimationEnd={() => setIsEntranceFinished(true)}
        className={`min-h-screen bg-[#15140C] text-[#F2F0EA] selection:bg-[#4E7A36] selection:text-[#F2F0EA] font-sans antialiased overflow-x-hidden ${
          !isEntranceFinished && isSiteEntering ? 'site-enter-blur' : ''
        }`}
      >
        {/* Main Content Sections */}
        <main>
          {/* SCROLL 1: Hero Section (Primeira tela) */}
          <Hero
            bookingEnabled={isBookingEnabled}
            onOpenBookingModal={() => setBookingModalOpen(true)}
          />

          {/* 1b. Banner de destaque (Desktop apenas ou secundário no mobile) */}
          <div className="hidden md:block">
            <CoupleMassageBanner />
          </div>

          {/* 2. Escolha por necessidade (Desktop apenas) */}
          <div className="hidden md:block">
            <NeedPicker
              activeNeedId={activeNeedFilterId}
              onSelectNeed={handleSelectNeed}
            />
          </div>

          {/* SCROLL 2: Nossas massagens & Massagem em dupla (Grid 3 colunas no mobile) */}
          <Services
            activeNeedFilterId={activeNeedFilterId}
            onClearFilter={() => setActiveNeedFilterId(null)}
          />

          {/* SCROLL 3 MOBILE: Sobre a Renovo & Avaliações Google comutáveis por Abas */}
          <AboutAndReviewsMobile />

          {/* SCROLL 3 DESKTOP: Sobre a Renovo e Depoimentos completos */}
          <div className="hidden md:block">
            <About />
            <Testimonials />
          </div>

          {/* SCROLL 4: Localização, FAQ & Chamada final */}
          <div id="localizacao-faq">
            <LocationSection />
            <FAQSection />
            <CTASection
              bookingEnabled={isBookingEnabled}
              onOpenBookingModal={() => setBookingModalOpen(true)}
            />
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* UI Flutuante Fixa na Viewport Raiz — Pinned no Rodapé Mobile */}
      <MobileScrollIndicator />
      <FloatingWhatsApp />

      {/* Quick Booking Modal */}
      {isBookingEnabled && (
        <BookingModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
        />
      )}
    </>
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
