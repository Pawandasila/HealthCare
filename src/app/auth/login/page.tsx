"use client";
import React, { useState, useRef, useContext } from "react";
import { motion, Variants } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { HeartPulse } from "lucide-react";
import { GFContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
}

type FormErrors = {
  [K in keyof FormData]?: string;
} & {
  general?: string;
};

const inputVariants: Variants = {
  focus: { scale: 1.02, transition: { duration: 0.2 } },
  blur: { scale: 1, transition: { duration: 0.2 } },
};

const buttonVariants: Variants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.98, transition: { duration: 0.1 } },
  rest: { scale: 1, transition: { duration: 0.2 } },
};

const HospitalLogin: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const {login}  = useContext(GFContext);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
const userRouter = useRouter();
  

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
        isValid = false;
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific errors
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    // Clear general error when user starts typing
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: undefined }));
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({}); // Clear any previous errors

    try {
      const result = await login(formData.email, formData.password);
      if (!result.success) {
        setErrors({ general: result.error || "Login failed. Please try again." });
      }
      // If successful, login function will handle navigation
    } catch (error) {
      console.error("Unexpected login error:", error);
      setErrors({ general: "An unexpected error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-background via-background to-muted/20">
      <Head>
        <title>Login | HealthCare</title>
        <meta
          name="description"
          content="Login to the HealthCare"
        />
      </Head>

      <div className="flex flex-col items-center justify-center w-full min-h-screen px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo and Header Section */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div ref={logoRef} className="flex justify-center mb-6">
              <motion.div 
                className="bg-card p-4 rounded-2xl shadow-lg border border-border/50 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <HeartPulse className="h-14 w-14 text-primary" />
              </motion.div>
            </div>
            <h1
              ref={titleRef}
              className="text-5xl font-bold mb-3 heading-maya bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
            >
              HealthCare
            </h1>
            <p
              ref={subtitleRef}
              className="text-muted-foreground text-lg"
            >
              Sign in to access your dashboard
            </p>
          </motion.div>

          {/* Login Form */}
          <motion.div
            className="bg-card/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-border/50 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            
            <div className="relative z-10">
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold mb-3 text-foreground"
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
                  className={`w-full px-4 py-4 rounded-xl border-2 bg-background/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 ${
                    errors.email
                      ? "border-destructive focus:border-destructive"
                      : "border-border hover:border-primary/30 focus:border-primary"
                  }`}
                  placeholder="Enter your email"
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <motion.p 
                    className="mt-2 text-sm text-destructive flex items-center gap-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <span className="text-destructive">⚠</span>
                    {errors.email}
                  </motion.p>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-foreground"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors"
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
                  className={`w-full px-4 py-4 rounded-xl border-2 bg-background/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 ${
                    errors.password
                      ? "border-destructive focus:border-destructive"
                      : "border-border hover:border-primary/30 focus:border-primary"
                  }`}
                  placeholder="Enter your password"
                  aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password && (
                  <motion.p 
                    className="mt-2 text-sm text-destructive flex items-center gap-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <span className="text-destructive">⚠</span>
                    {errors.password}
                  </motion.p>
                )}
              </div>

              {errors.general && (
                <motion.div
                  className="p-4 bg-destructive/10 text-destructive rounded-xl text-sm border border-destructive/20 backdrop-blur-sm flex items-center gap-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <span className="text-destructive text-lg">⚠</span>
                  <span>{errors.general}</span>
                </motion.div>
              )}

              <motion.button
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <span className="text-lg">→</span>
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                Need an account?{" "}
                <Link
                  href="/auth/sign-up"
                  className="text-primary hover:text-primary/80 font-semibold hover:underline transition-colors"
                >
                  Sign Up
                </Link>
              </p>
            </div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-xs text-muted-foreground/70">
              © {new Date().getFullYear()} HealthCare. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HospitalLogin;
