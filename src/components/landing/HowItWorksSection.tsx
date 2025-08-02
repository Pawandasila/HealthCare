"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Activity, Upload, Brain, Monitor, ArrowRight } from "lucide-react";
import Image from "next/image";
import WrapButton from "@/components/ui/wrap-button";

const HowItWorksSection = React.memo(() => {
  const steps = useMemo(() => [
    {
      number: "01",
      title: "Upload Your Health Data",
      description: "Securely upload your medical records, symptoms, and health history through our HIPAA-compliant platform.",
      details: [
        "Medical history analysis",
        "Symptom tracking",
        "Lab results integration",
        "Genetic data processing"
      ],
      image: "/upload.png", // Replace with your uploaded image
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: "02", 
      title: "AI Analysis & Processing",
      description: "Our advanced machine learning algorithms analyze your data using millions of medical cases and research studies.",
      details: [
        "Pattern recognition",
        "Risk assessment",
        "Correlation analysis", 
        "Predictive modeling"
      ],
      image: "/step-02.png", // Will be replaced when you upload
      color: "from-purple-500 to-pink-500"
    },
    {
      number: "03",
      title: "Personalized Predictions",
      description: "Receive detailed health predictions, risk assessments, and personalized recommendations based on your unique profile.",
      details: [
        "Disease risk predictions",
        "Treatment suggestions",
        "Lifestyle recommendations",
        "Monitoring protocols"
      ],
      image: "/step-03.png", // Will be replaced when you upload
      color: "from-emerald-500 to-green-500"
    },
    {
      number: "04",
      title: "Continuous Monitoring",
      description: "Stay informed with real-time health monitoring, alerts, and updated recommendations as new data becomes available.",
      details: [
        "Real-time alerts",
        "Progress tracking",
        "Updated predictions",
        "Care coordination"
      ],
      image: "/step-04.png", // Will be replaced when you upload
      
      color: "from-orange-500 to-red-500"
    }
  ], []);

  return (
    <section
      id="how-it-works"
      className="py-24 px-4 md:px-12 lg:px-24 bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-indigo-600/20 to-pink-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 15, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-full text-sm font-medium text-blue-300 mb-6 border border-blue-800/30"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Activity className="w-4 h-4 mr-2" />
            Simple Process
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              How MedPredict
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Transforms Healthcare
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Our intelligent four-step process brings cutting-edge healthcare AI technology 
            directly to your fingertips with seamless integration
          </p>
        </motion.div>

        <div className="relative">
          {/* Enhanced timeline line */}
          <motion.div
            className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-indigo-600 rounded-full"
            initial={{ height: 0 }}
            whileInView={{ height: "calc(100% - 100px)" }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          <div className="space-y-16 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`flex flex-col lg:flex-row items-center ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-12`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Content */}
                <div className="lg:w-5/12 relative">
                  <motion.div
                    className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30 shadow-xl"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center mb-6">
                      <span className={`text-6xl font-bold bg-gradient-to-br ${step.color} bg-clip-text text-transparent`}>
                        {step.number}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {step.description}
                    </p>
                    
                    <ul className="space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <motion.li
                          key={detailIndex}
                          className="flex items-center text-gray-300"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + detailIndex * 0.05 }}
                        >
                          <ArrowRight className="h-4 w-4 text-blue-400 mr-3 flex-shrink-0" />
                          {detail}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Timeline indicator */}
                <div className="hidden lg:flex lg:w-2/12 justify-center">
                  <motion.div
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-gray-800`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {step.number}
                  </motion.div>
                </div>

                {/* Visual placeholder */}
                <div className="lg:w-5/12">
                  <motion.div
                    className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl flex items-center justify-center border border-gray-700/30 p-4"
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div
                      className={`w-full h-full rounded-3xl bg-gradient-to-br flex items-center justify-center overflow-hidden`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Image
                        src={step.image}
                        alt={`${step.title} illustration`}
                        width={512}
                        height={512}
                        className="w-full h-full object-contain"
                        priority={index === 0}
                        quality={100}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const iconElement = target.nextSibling as HTMLElement;
                          if (iconElement) {
                            iconElement.style.display = 'block';
                          }
                        }}
                      />
                      <div className="hidden text-white text-6xl">
                        📋
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <WrapButton href="/dashboard">
              Start Your Health Journey
            </WrapButton>
          </motion.div>
          <p className="mt-4 text-gray-300 font-medium">
            Join thousands who've transformed their healthcare experience
          </p>
        </motion.div>
      </div>
    </section>
  );
});

HowItWorksSection.displayName = 'HowItWorksSection';

export default HowItWorksSection;
