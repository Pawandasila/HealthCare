"use client";
import React from "react";
import WrapButton from "@/components/ui/wrap-button";

const CTASection = () => {
  const features = [
    { icon: "🚀", text: "Free 14-day trial" },
    { icon: "💳", text: "No credit card required" },
    { icon: "🔒", text: "HIPAA compliant & secure" }
  ];

  return (
    <section className="py-24 px-4 md:px-12 lg:px-24 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-8">
          <span className="mr-2">✨</span>
          Join the Healthcare Revolution
        </div>
        
        <h2 className="text-4xl md:text-6xl font-bold mb-8">
          Ready to Transform Your
          <br />
          <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
            Healthcare Experience?
          </span>
        </h2>
        
        <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
          Join thousands of users who are taking control of their health with 
          our predictive AI technology and personalized healthcare insights.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <WrapButton href="/dashboard">
            Get Started Today
          </WrapButton>
          
          <WrapButton>
            Schedule Demo
          </WrapButton>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center text-blue-100 font-medium hover:scale-105 transition-transform duration-200"
            >
              <span className="text-2xl mr-3">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
