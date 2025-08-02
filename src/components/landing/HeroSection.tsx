"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Check, Activity } from "lucide-react";
import Image from "next/image";
import WrapButton from "@/components/ui/wrap-button";

const HeroSection = React.memo(() => {
  
  
  return (
    <section className="py-10 px-4 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center justify-between relative">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-indigo-600/20 to-pink-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="lg:w-1/2 mb-12 lg:mb-0 relative z-10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-full text-sm font-medium text-blue-300 mb-6 border border-blue-800/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="animate-pulse mr-2">🚀</span>
          AI-Powered Healthcare Revolution
        </motion.div>
        
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="bg-gradient-to-r from-gray-100 via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Advanced AI for
          </span>
          <br />
          <motion.span
            className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ backgroundSize: "200% 200%" }}
          >
            Personalized
          </motion.span>
          <br />
          <span className="bg-gradient-to-r from-gray-100 via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Healthcare
          </span>
        </motion.h1>
        
        <motion.p
          className="text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Experience the future of healthcare with our cutting-edge AI that predicts health issues, 
          suggests optimal treatments, and provides personalized medical insights tailored to your unique biology.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <WrapButton href="/dashboard">
              Try Disease Prediction
            </WrapButton>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <WrapButton>
              Watch Demo
            </WrapButton>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="lg:w-1/2 relative"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {/* Enhanced background decoration elements */}
        <motion.div
          className="absolute -top-8 -left-8 w-80 h-80 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-full mix-blend-multiply filter blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-8 -right-8 w-80 h-80 bg-gradient-to-br from-indigo-600/30 to-pink-600/30 rounded-full mix-blend-multiply filter blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Enhanced Dashboard image */}
        <motion.div
          className="relative z-10"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{
            y: -20,
            scale: 1.02,
            transition: { type: "spring", stiffness: 300, damping: 20 },
          }}
        >
          <motion.div
            className="rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 p-2"
            whileHover={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/finalDash.png"
                alt="AI-powered healthcare dashboard showcasing predictive analytics"
                width={1124}
                height={900}
                className="w-full h-auto object-cover"
                priority={true}
              />
            </div>
          </motion.div>
          
          {/* Floating stats */}
          <motion.div
            className="absolute -bottom-6 -left-6 bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-700/50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                <Check className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Accuracy Rate</p>
                <p className="text-2xl font-bold text-white">98.7%</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="absolute -top-6 -right-6 bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-700/50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Active Users</p>
                <p className="text-2xl font-bold text-white">50K+</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
