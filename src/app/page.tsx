"use client";
import React, { useState, useCallback } from "react";
import Navigation from "@/components/landing/Navigation";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

const MedTechLanding = React.memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = useCallback((open: boolean) => {
    setMobileMenuOpen(open);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      <Navigation 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={handleMobileMenuToggle} 
      />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      {/* <TestimonialsSection /> */}
      <CTASection />
      <Footer />
      <ScrollToTop />
    </div>
  );
});

MedTechLanding.displayName = 'MedTechLanding';

export default MedTechLanding;
