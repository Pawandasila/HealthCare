"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import useLenis from "@/hooks/useLenis";

const ScrollToTop = React.memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollTo } = useLenis();

  const toggleVisibility = useCallback(() => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [toggleVisibility]);

  const handleScrollToTop = useCallback(() => {
    scrollTo(0, {
      duration: 2,
      easing: (t: number) => 1 - Math.pow(1 - t, 3)
    });
  }, [scrollTo]);

  const buttonVariants = useMemo(() => ({
    initial: { opacity: 0, scale: 0, y: 100 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0, y: 100 },
  }), []);

  const iconVariants = useMemo(() => ({
    animate: { y: [0, -2, 0] },
  }), []);

  const borderVariants = useMemo(() => ({
    animate: { rotate: 360 },
  }), []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          onClick={handleScrollToTop}
          initial={buttonVariants.initial}
          animate={buttonVariants.animate}
          exit={buttonVariants.exit}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            variants={iconVariants}
            animate="animate"
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowUp className="h-6 w-6 group-hover:scale-110 transition-transform" />
          </motion.div>
          
          {/* Animated border */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, transparent 270deg, rgba(255,255,255,0.3) 360deg)',
              padding: '2px'
            }}
            variants={borderVariants}
            animate="animate"
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
});

ScrollToTop.displayName = 'ScrollToTop';

export default ScrollToTop;
