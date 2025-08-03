"use client";
import React from "react";
import { Users, Activity, Award, Globe } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: <Users className="h-8 w-8" />,
      number: "50,000+",
      label: "Active Users",
      description: "Healthcare professionals and patients worldwide"
    },
    {
      icon: <Activity className="h-8 w-8" />,
      number: "98.7%",
      label: "Accuracy Rate",
      description: "AI prediction accuracy verified by medical experts"
    },
    {
      icon: <Award className="h-8 w-8" />,
      number: "500+",
      label: "Conditions Tracked",
      description: "Comprehensive health condition monitoring"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      number: "24/7",
      label: "Monitoring",
      description: "Continuous health analysis and alerts"
    }
  ];

  return (
    <section className="py-16 px-4 md:px-12 lg:px-24 bg-gradient-to-r from-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl mb-4 text-white group-hover:shadow-lg transition-shadow duration-300">
                {stat.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.number}
              </h3>
              <p className="text-lg font-semibold text-blue-400 mb-2">
                {stat.label}
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
