"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { HeartPulse, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer: React.FC = React.memo(() => {
  const footerColumns = useMemo(() => [
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
  ], []);

  const socialLinks = useMemo(() => [
    { icon: <Facebook className="h-5 w-5" />, href: "#" },
    { icon: <Twitter className="h-5 w-5" />, href: "#" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#" },
    { icon: <Instagram className="h-5 w-5" />, href: "#" },
  ], []);

  return (
    <footer className="bg-black text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <motion.div
              className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <HeartPulse className="h-6 w-6 text-white" />
            </motion.div>
            <span className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              MedPredict
            </span>
          </div>
          <p className="text-gray-400 leading-relaxed max-w-sm">
            Revolutionizing healthcare through AI-powered predictions and personalized medical insights.
          </p>
        </motion.div>

        {footerColumns.map((column, colIndex) => (
          <motion.div
            key={column.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (colIndex + 1) * 0.1 }}
          >
            <h3 className="text-white font-semibold text-lg mb-6">
              {column.title}
            </h3>
            <ul className="space-y-3">
              {column.links.map((link, linkIndex) => (
                <motion.li key={link}>
                  <motion.a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                    whileHover={{ x: 5 }}
                  >
                    {link}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-400"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p>© 2025 MedPredict. All rights reserved.</p>
      </motion.div>
      
      <motion.div
        className="max-w-7xl mx-auto mt-6 text-center text-gray-400"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex justify-center mt-6 space-x-6">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
