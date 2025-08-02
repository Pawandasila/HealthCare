"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import WrapButton from "@/components/ui/wrap-button";

const CTASection: React.FC = React.memo(() => {
  const backgroundAnimations = useMemo(() => ({
    element1: {
      animate: {
        x: [0, 100, 0],
        y: [0, -50, 0],
      },
      transition: { duration: 20, repeat: Infinity, ease: "easeInOut" as const }
    },
    element2: {
      animate: {
        x: [0, -100, 0],
        y: [0, 50, 0],
      },
      transition: { duration: 25, repeat: Infinity, ease: "easeInOut" as const }
    }
  }), []);

  const features = useMemo(() => [
    { icon: "🚀", text: "Free 14-day trial" },
    { icon: "💳", text: "No credit card required" },
    { icon: "🔒", text: "HIPAA compliant & secure" }
  ], []);

  return (
    <motion.section
      className="py-24 px-4 md:px-12 lg:px-24 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"
          {...backgroundAnimations.element1}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          {...backgroundAnimations.element2}
        />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <span className="animate-pulse mr-2">✨</span>
          Join the Healthcare Revolution
        </motion.div>
        
        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Ready to Transform Your
          <br />
          <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
            Healthcare Experience?
          </span>
        </motion.h2>
        
        <motion.p
          className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Join thousands of users who are taking control of their health with 
          our predictive AI technology and personalized healthcare insights.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <WrapButton href="/dashboard">
              Get Started Today
            </WrapButton>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <WrapButton>
              Schedule Demo
            </WrapButton>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {features.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center text-blue-100 font-medium"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-2xl mr-3">{item.icon}</span>
              {item.text}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
});

CTASection.displayName = 'CTASection';

export default CTASection;
