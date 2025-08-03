"use client";
import React from "react";
import { HeartPulse, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const footerColumns = [
    {
      title: "Features",
      links: [
        "Disease Prediction",
        "Medication Suggestions",
        "Health Monitoring",
        "Medical Records",
      ],
    },
    {
      title: "Company",
      links: ["About Us", "Our Team", "Careers", "Contact"],
    },
    {
      title: "Legal",
      links: [
        "Privacy Policy",
        "Terms of Service",
        "Data Protection",
        "Compliance",
      ],
    },
  ];

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "#" },
    { icon: <Twitter className="h-5 w-5" />, href: "#" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#" },
    { icon: <Instagram className="h-5 w-5" />, href: "#" },
  ];

  return (
    <footer className="bg-black text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg hover:rotate-12 transition-transform duration-300">
              <HeartPulse className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              HealthCare
            </span>
          </div>
          <p className="text-gray-400 leading-relaxed max-w-sm">
            Revolutionizing healthcare through AI-powered predictions and personalized medical insights.
          </p>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title}>
            <h3 className="text-white font-semibold text-lg mb-6">
              {column.title}
            </h3>
            <ul className="space-y-3">
              {column.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 hover:scale-105 inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm mb-4 md:mb-0">
          © 2024 Healthcare. All rights reserved.
        </p>
        
        <div className="flex space-x-4">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-200 hover:scale-110"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
