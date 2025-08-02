"use client";
import React, { useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { HeartPulse, Menu, X } from "lucide-react";
import WrapButton from "@/components/ui/wrap-button";
import { logoVariants } from "@/components/types/type";
import useLenis from "@/hooks/useLenis";

interface NavigationProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const Navigation = React.memo<NavigationProps>(({ mobileMenuOpen, setMobileMenuOpen }) => {
  const { scrollTo } = useLenis();

  const handleScrollTo = useCallback((sectionId: string) => {
    scrollTo(`#${sectionId}`, {
      offset: -100,
      smooth: true,
      duration: 1.5,
      easing: (t: number) => 1 - Math.pow(1 - t, 3) 
    });
  }, [scrollTo]);

  const handleMobileMenuToggle = useCallback(() => {
    setMobileMenuOpen(!mobileMenuOpen);
  }, [mobileMenuOpen, setMobileMenuOpen]);

  const navigationItems = useMemo(() => ["Features", "How It Works", "Testimonials"], []);

  const mobileMenuIcon = useMemo(() => 
    mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />, 
    [mobileMenuOpen]
  );
  return (
    <nav className="backdrop-blur-md bg-gray-900/80 border-b border-gray-800/50 p-4 flex justify-between items-center sticky top-0 z-50">
      <motion.div
        className="flex items-center space-x-3"
        whileHover="hover"
        variants={logoVariants}
      >
        <motion.div
          className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.8 }}
        >
          <HeartPulse className="h-6 w-6 text-white" />
        </motion.div>
        <span className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          MedPredict
        </span>
      </motion.div>
      
      <div className="hidden md:flex space-x-8">
        {navigationItems.map((item, index) => (
          <motion.button
            key={item}
            onClick={() => handleScrollTo(item.toLowerCase().replace(/\s+/g, "-"))}
            className="relative text-gray-300 hover:text-blue-400 transition-all duration-300 font-medium group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {item}
            <motion.div
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"
            />
          </motion.button>
        ))}
      </div>
      
      {/* Mobile menu button */}
      <motion.button
        className="md:hidden text-gray-300 p-3 rounded-xl hover:bg-gray-800/50 transition-colors"
        onClick={handleMobileMenuToggle}
        whileTap={{ scale: 0.95 }}
      >
        {mobileMenuIcon}
      </motion.button>

      <motion.div
        className="hidden md:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <WrapButton href="/auth/login">
          Get Started
        </WrapButton>
      </motion.div>

      {/* Enhanced Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          className="absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-lg shadow-2xl z-50 md:hidden border-t border-gray-800/50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="px-6 py-8 space-y-6">
            {navigationItems.map((item) => (
              <motion.button
                key={item}
                onClick={() => {
                  handleScrollTo(item.toLowerCase().replace(/\s+/g, "-"));
                  setMobileMenuOpen(false);
                }}
                className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 text-lg font-medium cursor-pointer w-full text-left"
                whileHover={{ x: 10 }}
              >
                {item}
              </motion.button>
            ))}
            <div className="mt-6">
              <WrapButton href="/auth/login">
                Get Started
              </WrapButton>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;
