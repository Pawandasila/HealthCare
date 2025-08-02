"use client";
import React, { useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, HeartPulse, Shield, TrendingUp, Users, Award } from "lucide-react";
import AnimatedStatNumber from "@/components/ui/animated-stat-number-optimized";

const StatsSection = React.memo(() => {
  const stats = useMemo(() => [
    { 
      value: "98.7%", 
      label: "Prediction Accuracy",
      description: "AI-powered diagnostic precision",
      icon: <Brain className="h-8 w-8" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-500/10 to-cyan-500/10"
    },
    { 
      value: "50,000+", 
      label: "Patients Helped",
      description: "Lives improved worldwide",
      icon: <HeartPulse className="h-8 w-8" />,
      color: "from-emerald-500 to-green-500",
      bgColor: "from-emerald-500/10 to-green-500/10"
    },
    { 
      value: "200+", 
      label: "Healthcare Partners",
      description: "Trusted medical institutions",
      icon: <Shield className="h-8 w-8" />,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-500/10 to-pink-500/10"
    },
    { 
      value: "24/7", 
      label: "Monitoring Available",
      description: "Continuous health tracking",
      icon: <TrendingUp className="h-8 w-8" />,
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-500/10 to-red-500/10"
    },
    { 
      value: "1M+", 
      label: "Health Records Analyzed",
      description: "Data-driven insights",
      icon: <Users className="h-8 w-8" />,
      color: "from-indigo-500 to-purple-500",
      bgColor: "from-indigo-500/10 to-purple-500/10"
    },
    { 
      value: "15+", 
      label: "Medical Awards",
      description: "Industry recognition",
      icon: <Award className="h-8 w-8" />,
      color: "from-teal-500 to-blue-500",
      bgColor: "from-teal-500/10 to-blue-500/10"
    },
  ], []);

  return (
    <motion.section
      className="py-24 bg-gradient-to-br from-gray-800 via-gray-900 to-black relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-full text-sm font-medium text-blue-300 mb-8 border border-blue-800/30"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Proven Results
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Trusted by Healthcare Professionals
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Worldwide
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our AI-powered platform delivers measurable results that transform healthcare outcomes
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              whileHover={{ y: -10 }}
            >
              {/* Background glow effect - Always visible and pulsing */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} rounded-3xl blur-xl opacity-30`}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 4 + index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Enhanced hover glow */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Main card */}
              <motion.div
                className="relative bg-gray-800/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 text-center group-hover:border-gray-600/50 transition-all duration-500 h-full"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                }}
              >
                {/* Icon */}
                <motion.div
                  className={`w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: [0, -10, 10, 0],
                    boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.3)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {stat.icon}
                </motion.div>
                
                {/* Animated number */}
                <motion.div
                  className="mb-4"
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                >
                  <AnimatedStatNumber
                    value={stat.value}
                    duration={2 + index * 0.2}
                    className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
                  />
                </motion.div>
                
                {/* Label and description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.8 }}
                >
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {stat.label}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {stat.description}
                  </p>
                </motion.div>

                {/* Decorative border animation - Always visible and animated */}
                {/* <motion.div
                  className="absolute inset-0 rounded-3xl opacity-60"
                  style={{
                    background: `conic-gradient(from 0deg, transparent 300deg, ${stat.color.includes('blue') ? '#3b82f6' : stat.color.includes('emerald') ? '#10b981' : stat.color.includes('purple') ? '#8b5cf6' : stat.color.includes('orange') ? '#f97316' : stat.color.includes('indigo') ? '#6366f1' : '#14b8a6'} 360deg)`,
                    padding: '2px',
                    borderRadius: '24px'
                  }}
                  animate={{
                    rotate: 360,
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{
                    rotate: { duration: 6 + index * 0.5, repeat: Infinity, ease: "linear" },
                    opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                /> */}
                
                {/* Secondary rotating border for extra effect */}
               
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom section with additional info */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              className="flex items-center justify-center text-gray-300"
              whileHover={{ scale: 1.05 }}
            >
              <Shield className="h-5 w-5 mr-2 text-green-400" />
              <span className="font-medium">HIPAA Compliant</span>
            </motion.div>
            <motion.div
              className="flex items-center justify-center text-gray-300"
              whileHover={{ scale: 1.05 }}
            >
              <Award className="h-5 w-5 mr-2 text-blue-400" />
              <span className="font-medium">ISO 27001 Certified</span>
            </motion.div>
            <motion.div
              className="flex items-center justify-center text-gray-300"
              whileHover={{ scale: 1.05 }}
            >
              <TrendingUp className="h-5 w-5 mr-2 text-purple-400" />
              <span className="font-medium">99.9% Uptime</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
});

StatsSection.displayName = 'StatsSection';

export default StatsSection;
