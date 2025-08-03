"use client";
import React from "react";
import { Brain, Pill, Activity, ArrowRight, Check } from "lucide-react";

const FeaturesSection = () => {
  const features = [
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
  ];

  return (
    <section id="features" className="py-24 px-4 md:px-12 lg:px-24 bg-gradient-to-br from-gray-900 to-black">
      <div className="text-center mb-20">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-full text-sm font-medium text-blue-300 mb-6 border border-blue-800/30">
          <Pill className="w-4 h-4 mr-2" />
          Cutting-Edge Features
        </div>
        
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${feature.bgGradient} p-1 border border-gray-700/30 hover:scale-102 transition-transform duration-300`}
          >
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 h-full border border-gray-700/20">
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6 hover:scale-110 hover:rotate-2 transition-transform duration-300`}
              >
                {feature.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {feature.description}
              </p>
              
              <ul className="space-y-3">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li
                    key={benefitIndex}
                    className="flex items-center text-gray-300"
                  >
                    <Check className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
              
              <button className="mt-8 flex items-center text-blue-400 font-semibold hover:text-blue-300 transition-colors group">
                Learn more 
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
