"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Brain, Pill, Activity, ArrowRight, Check } from "lucide-react";
import { staggerChildren, fadeInUp } from "@/components/types/type";

const AnimatedCard = React.memo(({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay: number;
}) => {
  const cardVariants = useMemo(() => ({
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    whileHover: {
      y: -10,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
    }
  }), []);

  const transition = useMemo(() => ({ 
    duration: 0.5, 
    delay: delay * 0.2 
  }), [delay]);

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileInView="whileInView"
      whileHover="whileHover"
      viewport={{ once: true }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
});

AnimatedCard.displayName = 'AnimatedCard';

const FeaturesSection: React.FC = React.memo(() => {
  const features = useMemo(() => [
    {
      icon: <Brain className="h-12 w-12" />,
      title: "AI Disease Prediction",
      description:
        "Advanced machine learning algorithms analyze your symptoms, medical history, and genetic markers to predict potential health risks with unprecedented accuracy.",
      benefits: [
        "Early detection of health risks",
        "Personalized risk assessments",
        "Continuous health monitoring",
        "Preventive care recommendations"
      ],
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-900/20 to-indigo-900/20"
    },
    {
      icon: <Pill className="h-12 w-12" />,
      title: "Smart Medication Management",
      description:
        "Get AI-powered medication recommendations based on your health profile, current treatments, and potential drug interactions for optimal therapeutic outcomes.",
      benefits: [
        "Drug interaction analysis",
        "Dosage optimization",
        "Alternative medication options",
        "Side effect predictions"
      ],
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-900/20 to-teal-900/20"
    },
    {
      icon: <Activity className="h-12 w-12" />,
      title: "Real-time Health Analytics",
      description:
        "Comprehensive tracking of vital health metrics with intelligent alerts, trend analysis, and personalized recommendations for continuous improvement.",
      benefits: [
        "24/7 health monitoring",
        "Predictive health analytics",
        "Custom health goals",
        "Progress visualization"
      ],
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-900/20 to-pink-900/20"
    },
  ], []);

  return (
    <section id="features" className="py-24 px-4 md:px-12 lg:px-24 bg-gradient-to-br from-gray-900 to-black">
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
          <Pill className="w-4 h-4 mr-2" />
          Cutting-Edge Features
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Revolutionary Healthcare
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI Technology
          </span>
        </h2>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Discover how our advanced AI algorithms transform healthcare delivery through 
          precise predictions, personalized treatments, and continuous monitoring
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <AnimatedCard key={index} delay={index}>
            <motion.div
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${feature.bgGradient} p-1 border border-gray-700/30`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 h-full border border-gray-700/20">
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {feature.icon}
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                
                <motion.ul
                  className="space-y-3"
                  variants={staggerChildren}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <motion.li
                      key={benefitIndex}
                      className="flex items-center text-gray-300"
                      variants={fadeInUp}
                    >
                      <Check className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                      {benefit}
                    </motion.li>
                  ))}
                </motion.ul>
                
                <motion.button
                  className="mt-8 flex items-center text-blue-400 font-semibold hover:text-blue-300 transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  Learn more 
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          </AnimatedCard>
        ))}
      </div>
    </section>
  );
});

FeaturesSection.displayName = 'FeaturesSection';

export default FeaturesSection;
