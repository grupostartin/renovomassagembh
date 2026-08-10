import { useState, useCallback } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MobileNeedPicker } from './components/MobileNeedPicker';
import { Services } from './components/Services';
import { Benefits } from './components/Benefits';
import { About } from './components/About';
import { Testimonials } from './components/Testimonials';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BookingModal } from './components/BookingModal';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [splashDone, setSplashDone] = useState(false);
  const handleSplashFinished = useCallback(() => setSplashDone(true), []);

  return (
    <div className="min-h-screen bg-[#15140C] text-[#F2F0EA] selection:bg-[#4E7A36] selection:text-[#F2F0EA] font-sans antialiased overflow-x-hidden">

      {/* Splash Screen */}
      {!splashDone && <SplashScreen onFinished={handleSplashFinished} />}
      
      {/* Header */}
      <Header onOpenBookingModal={() => setBookingModalOpen(true)} />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero onOpenBookingModal={() => setBookingModalOpen(true)} />

        {/* 1b. Mobile-only: "Você precisa de que hoje?" picker */}
        <MobileNeedPicker />

        {/* 2. Services Section */}
        <Services />

        {/* 3. Benefits Section */}
        <Benefits />

        {/* 4. About Section */}
        <About />

        {/* 5. Testimonials Section */}
        <Testimonials />

        {/* 6. Final CTA Banner */}
        <CTASection onOpenBookingModal={() => setBookingModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Sticky WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Interactive Quick Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

    </div>
  );
}
