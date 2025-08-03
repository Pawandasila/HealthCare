"use client";
import React from "react";
import Navigation from "@/components/landing/Navigation";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

const MedTechLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Navigation />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

MedTechLanding.displayName = 'MedTechLanding';

export default MedTechLanding;
