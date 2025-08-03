"use client";
import React from "react";
import { HeartPulse, Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Diabetes Prevention Success",
      testimonial:
        "MedPredict identified my risk for Type 2 diabetes six months before any symptoms appeared. The AI recommendations helped me make lifestyle changes that kept me healthy and diabetes-free.",
      rating: 5,
      color: "from-emerald-400 to-green-500"
    },
    {
      name: "Michael Chen",
      role: "Cardiac Health Monitoring",
      testimonial:
        "After my heart attack, MedPredict's continuous monitoring detected a dangerous medication interaction that my doctors had missed. This technology literally saved my life.",
      rating: 5,
      color: "from-blue-400 to-indigo-500"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Primary Care Physician",
      testimonial:
        "I recommend MedPredict to all my patients. The AI predictions are remarkably accurate and have helped us catch several conditions early. It's revolutionizing preventive care.",
      rating: 5,
      color: "from-purple-400 to-pink-500"
    },
  ];

  return (
    <section id="testimonials" className="py-24 px-4 md:px-12 lg:px-24 bg-gradient-to-br from-gray-900 to-black">
      <div className="text-center mb-20">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-full text-sm font-medium text-blue-300 mb-6 border border-blue-800/30">
          <HeartPulse className="w-4 h-4 mr-2" />
          Success Stories
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Transforming Lives with
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI-Powered Healthcare
          </span>
        </h2>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Real stories from people whose lives have been transformed by our predictive healthcare technology
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30 shadow-xl h-full hover:scale-102 transition-transform duration-300"
          >
            {/* Rating Stars */}
            <div className="flex items-center mb-6">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            
            {/* Testimonial Text */}
            <blockquote className="text-gray-300 text-lg leading-relaxed mb-8">
              "{testimonial.testimonial}"
            </blockquote>
            
            {/* Author Info */}
            <div className="flex items-center">
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-lg mr-4 hover:scale-110 transition-transform duration-200`}
              >
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-white font-semibold text-lg">
                  {testimonial.name}
                </h4>
                <p className="text-gray-400 text-sm">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
