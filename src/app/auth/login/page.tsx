// pages/login.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Head from 'next/head';
import Link from 'next/link';
import { SunIcon, MoonIcon } from 'lucide-react';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  
  // Error handling
  const [error, setError] = useState<string | null>(null);
  
  // Theme toggle
  const { theme, setTheme } = useTheme();

  // GSAP animation refs
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  
  // Animation on component mount
  useEffect(() => {
    if (formRef.current && titleRef.current && subtitleRef.current) {
      const tl = gsap.timeline();
      
      tl.from(titleRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from(subtitleRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out'
      }, '-=0.4')
      .from(formRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out'
      }, '-=0.2');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Password validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    // Here you would typically make an API call to authenticate
    try {
      console.log('Form submitted:', formData);
      // Simulate login process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to dashboard or home page after successful login
      // router.push('/dashboard');
      
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Animation variants for Framer Motion
  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } }
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
    rest: { scale: 1, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 dark:bg-gray-900 bg-gray-50">
      <Head>
        <title>Login | My App</title>
      </Head>
      
      {/* Theme toggle button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <SunIcon className="h-6 w-6 text-yellow-400" />
        ) : (
          <MoonIcon className="h-6 w-6 text-gray-700" />
        )}
      </motion.button>
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 
            ref={titleRef} 
            className="text-4xl font-bold mb-2 dark:text-white text-gray-800 transition-colors duration-300"
          >
            Welcome Back
          </h1>
          <p 
            ref={subtitleRef}
            className="text-gray-600 dark:text-gray-300 transition-colors duration-300"
          >
            Sign in to your account to continue
          </p>
        </div>
        
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-6">
              <label 
                htmlFor="email" 
                className="block text-sm font-medium mb-2 dark:text-gray-200 text-gray-700 transition-colors duration-300"
              >
                Email Address
              </label>
              <motion.input
                variants={inputVariants}
                whileFocus="focus"
                initial="blur"
                animate="blur"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors duration-300"
                placeholder="you@example.com"
              />
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label 
                  htmlFor="password" 
                  className="text-sm font-medium dark:text-gray-200 text-gray-700 transition-colors duration-300"
                >
                  Password
                </label>
                <Link 
                  href="/forgot-password"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-300"
                >
                  Forgot Password?
                </Link>
              </div>
              <motion.input
                variants={inputVariants}
                whileFocus="focus"
                initial="blur"
                animate="blur"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors duration-300"
                placeholder="••••••••"
              />
            </div>
            
            {error && (
              <motion.div 
                className="mb-6 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg text-sm transition-colors duration-300"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {error}
              </motion.div>
            )}
            
            <motion.button
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium py-3 rounded-lg transition-colors duration-300"
            >
              Sign In
            </motion.button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm dark:text-gray-300 text-gray-600 transition-colors duration-300">
              Don't have an account?{' '}
              <Link 
                href="/register" 
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-colors duration-300"
              >
                Sign up now
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;