"use client";
import React from "react";
import { Check, Activity } from "lucide-react";
import Image from "next/image";
import WrapButton from "@/components/ui/wrap-button";

const HeroSection = () => {
  return (
    <section className="py-10 px-4 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center justify-between relative">

      <div className="lg:w-1/2 mb-12 lg:mb-0 relative z-10">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-full text-sm font-medium text-blue-300 mb-6 border border-blue-800/30">
          <span className="mr-2">🚀</span>
          AI-Powered Healthcare Revolution
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
          <span className="bg-gradient-to-r from-gray-100 via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Advanced AI for
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Personalized
          </span>
          <br />
          <span className="bg-gradient-to-r from-gray-100 via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Healthcare
          </span>
        </h1>
        
        <p className="text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
          Experience the future of healthcare with our cutting-edge AI that predicts health issues, 
          suggests optimal treatments, and provides personalized medical insights tailored to your unique biology.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <WrapButton href="/dashboard">
            Try Disease Prediction
          </WrapButton>
          
          <WrapButton>
            Watch Demo
          </WrapButton>
        </div>
      </div>

      <div className="lg:w-1/2 relative">
       
        {/* Dashboard image */}
        <div className="relative z-10">
          <div className="rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 p-2 hover:shadow-4xl transition-shadow duration-300">
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
          </div>
          
          {/* Floating stats */}
          <div className="absolute -bottom-6 -left-6 bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-700/50 hover:scale-105 transition-transform duration-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                <Check className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Accuracy Rate</p>
                <p className="text-2xl font-bold text-white">98.7%</p>
              </div>
            </div>
          </div>
          
          <div className="absolute -top-6 -right-6 bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-700/50 hover:scale-105 transition-transform duration-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Active Users</p>
                <p className="text-2xl font-bold text-white">50K+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
