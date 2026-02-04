import React, { useEffect, useState } from 'react';
import { WarningBar } from './components/WarningBar';
import { Hero } from './components/Hero';
import { BookingWidget } from './components/BookingWidget';
import { Footer } from './components/Footer';
import { Asterisk } from 'lucide-react';
import { ModalForm } from './components/ModalForm';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Webnexa AI - Solar Appointments";
    
    // Open modal after 5 seconds
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleFormSuccess = () => {
    setIsModalOpen(false);
    // Wait for modal fade out then scroll
    setTimeout(() => {
      const element = document.getElementById('booking-calendar');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#141414] font-sans pb-10 relative">
      <WarningBar />
      
      <main className="w-full flex flex-col items-center">
        <Hero />
        
        <div className="w-full px-4 mb-20">
          <BookingWidget />
        </div>
      </main>

      <Footer />
      
      <ModalForm 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmitSuccess={handleFormSuccess}
      />

      {/* Floating Widget - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-14 h-14 bg-[#333333] hover:bg-[#444] rounded-xl shadow-2xl flex items-center justify-center transition-all duration-300 group cursor-pointer border border-white/10">
          <Asterisk className="w-8 h-8 text-[#ccff00] animate-[spin_10s_linear_infinite]" />
        </button>
      </div>
    </div>
  );
};

export default App;