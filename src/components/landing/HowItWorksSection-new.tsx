"use client";
import React from "react";
import { Activity, Upload, Brain, Monitor, ArrowRight } from "lucide-react";
import Image from "next/image";
import WrapButton from "@/components/ui/wrap-button";

const HowItWorksSection = () => {
  const steps = [
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
      image: "/upload.png",
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
      image: "/step-02.png",
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
      image: "/step-03.png",
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
      image: "/step-04.png",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 px-4 md:px-12 lg:px-24 bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-indigo-600/20 to-pink-600/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-full text-sm font-medium text-blue-300 mb-6 border border-blue-800/30">
            <Activity className="w-4 h-4 mr-2" />
            Simple Process
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              How Healthcare
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
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-indigo-600 rounded-full h-full" />

          <div className="space-y-16 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-center ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-12`}
              >
                {/* Content */}
                <div className="lg:w-5/12 relative">
                  <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    {/* Step number */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} text-white font-bold text-xl mb-6 shadow-lg`}>
                      {step.number}
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4">
                      {step.title}
                    </h3>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Details list */}
                    <ul className="space-y-3 mb-8">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center text-gray-300">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.color} mr-3 flex-shrink-0`} />
                          {detail}
                        </li>
                      ))}
                    </ul>

                    <button className="flex items-center text-blue-400 font-semibold hover:text-blue-300 transition-colors group">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden lg:block absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full border-4 border-blue-500 shadow-lg" style={{
                    left: index % 2 === 0 ? 'calc(50% + 6rem)' : 'calc(50% - 6rem)'
                  }} />
                </div>

                {/* Image */}
                <div className="lg:w-5/12">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-4 hover:scale-105 transition-transform duration-300">
                    <div className="rounded-2xl overflow-hidden bg-gray-900/50 backdrop-blur-sm">
                      <Image
                        src={step.image}
                        alt={`Step ${step.number}: ${step.title}`}
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    
                    {/* Overlay gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-tr ${step.color} opacity-10 rounded-3xl`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-20">
          <div className="max-w-2xl mx-auto mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Experience the Future of Healthcare?
            </h3>
            <p className="text-gray-300 text-lg">
              Join thousands of users who are already transforming their healthcare journey with AI-powered predictions
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WrapButton href="/dashboard">
              Start Your Health Journey
            </WrapButton>
            <WrapButton>
              Watch Demo
            </WrapButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
