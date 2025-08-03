"use client";
import React, { useState } from "react";
import { HeartPulse, Menu, X } from "lucide-react";
import WrapButton from "@/components/ui/wrap-button";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScrollTo = (sectionId: string) => {
    const element = document.getElementById(sectionId.toLowerCase().replace(/\s+/g, "-"));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navigationItems = ["Features", "How It Works", "Testimonials"];

  return (
    <nav className="backdrop-blur-md bg-gray-900/80 border-b border-gray-800/50 p-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg">
          <HeartPulse className="h-6 w-6 text-white" />
        </div>
        <span className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          HealthCare
        </span>
      </div>
      
      <div className="hidden md:flex space-x-8">
        {navigationItems.map((item) => (
          <button
            key={item}
            onClick={() => handleScrollTo(item.toLowerCase().replace(/\s+/g, "-"))}
            className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium cursor-pointer"
          >
            {item}
          </button>
        ))}
      </div>
      
      {/* Mobile menu button */}
      <button
        className="md:hidden text-gray-300 p-3 rounded-xl hover:bg-gray-800/50 transition-colors"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <div className="hidden md:block">
        <WrapButton href="/auth/login">
          Get Started
        </WrapButton>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-lg shadow-2xl z-50 md:hidden border-t border-gray-800/50">
          <div className="px-6 py-8 space-y-6">
            {navigationItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  handleScrollTo(item.toLowerCase().replace(/\s+/g, "-"));
                  setMobileMenuOpen(false);
                }}
                className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 text-lg font-medium cursor-pointer w-full text-left"
              >
                {item}
              </button>
            ))}
            <div className="mt-6">
              <WrapButton href="/auth/login">
                Get Started
              </WrapButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
