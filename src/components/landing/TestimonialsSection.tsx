"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { HeartPulse, Star } from "lucide-react";

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

const TestimonialsSection: React.FC = React.memo(() => {
  const testimonials = useMemo(() => [
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
  ], []);

  return (
    <section id="testimonials" className="py-24 px-4 md:px-12 lg:px-24 bg-gradient-to-br from-gray-900 to-black">
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
          <HeartPulse className="w-4 h-4 mr-2" />
          Success Stories
        </motion.div>
        
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
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <AnimatedCard key={index} delay={index}>
            <motion.div
              className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30 shadow-xl h-full"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Rating Stars */}
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + i * 0.05 }}
                  >
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  </motion.div>
                ))}
              </div>
              
              {/* Testimonial Text */}
              <motion.blockquote
                className="text-gray-300 text-lg leading-relaxed mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.3 }}
              >
                "{testimonial.testimonial}"
              </motion.blockquote>
              
              {/* Author Info */}
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.5 }}
              >
                <motion.div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-lg mr-4`}
                  whileHover={{ scale: 1.1 }}
                >
                  {testimonial.name.charAt(0)}
                </motion.div>
                <div>
                  <h4 className="text-white font-semibold text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatedCard>
        ))}
      </div>
    </section>
  );
});

TestimonialsSection.displayName = 'TestimonialsSection';

export default TestimonialsSection;
