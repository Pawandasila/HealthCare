"use client";
import React, { useState, useRef, useContext } from "react";
import { motion, Variants } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import {
  HeartPulse,
  User,
  Mail,
  KeyRound,
} from "lucide-react";
import { GFContext } from "@/context/AuthContext";

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

type FormErrors = {
  [K in keyof SignupFormData]?: string;
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

const HospitalSignup: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const { baseURL, register } = useContext(GFContext); 
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

 
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

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
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      isValid = false;
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
      newErrors.password = "Password must contain at least one lowercase letter";
      isValid = false;
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
      isValid = false;
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    // if (!formData.phoneNumber) {
    //   newErrors.phoneNumber = "Phone number is required";
    //   isValid = false;
    // } else {
    //   const phoneRegex = /^\+?[0-9]{10,14}$/;
    //   if (!phoneRegex.test(formData.phoneNumber.replace(/\s+/g, ""))) {
    //     newErrors.phoneNumber = "Please enter a valid phone number";
    //     isValid = false;
    //   }
    // }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific errors
    if (errors[name as keyof SignupFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    // Clear general error and success message when user starts typing
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: undefined }));
    }
    if (successMessage) {
      setSuccessMessage("");
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
    setSuccessMessage(""); // Clear any previous success message

    try {
      const result = await register({
        username: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password
      });

      if (!result.success) {
        setErrors({ general: result.error || "Registration failed. Please try again." });
      } else {
        setSuccessMessage("Account created successfully! Redirecting to dashboard...");
      }
      // If successful, register function will handle auto-login and navigation
    } catch (error) {
      console.error("Unexpected registration error:", error);
      setErrors({ general: "An unexpected error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <Head>
        <title>Sign Up | HealthCare</title>
        <meta
          name="description"
          content="Sign up for the HealthCare System"
        />
      </Head>

      <div className="flex flex-col items-center justify-center w-full min-h-screen px-4 py-8 md:px-0">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <div ref={logoRef} className="flex justify-center mb-4">
              <div className="bg-card p-3 rounded-full shadow-lg border">
                <HeartPulse className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1
              ref={titleRef}
              className="text-4xl font-bold mb-2 text-foreground heading-maya"
            >
              HealthCare
            </h1>
            <p
              ref={subtitleRef}
              className="text-muted-foreground"
            >
              Create your account for the patient management portal
            </p>
          </div>

          
            <motion.div
              className="bg-card/95 rounded-lg shadow-xl p-8 backdrop-blur-sm border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <form ref={formRef} onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium mb-2 text-foreground"
                    >
                      First Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <motion.input
                        variants={inputVariants}
                        whileFocus="focus"
                        initial="blur"
                        animate="blur"
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-ring outline-none ${
                          errors.firstName
                            ? "border-destructive"
                            : "border-border"
                        }`}
                        placeholder="John"
                        aria-invalid={errors.firstName ? "true" : "false"}
                      />
                    </div>
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium mb-2 text-foreground"
                    >
                      Last Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <motion.input
                        variants={inputVariants}
                        whileFocus="focus"
                        initial="blur"
                        animate="blur"
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-ring outline-none ${
                          errors.lastName
                            ? "border-destructive"
                            : "border-border"
                        }`}
                        placeholder="Doe"
                        aria-invalid={errors.lastName ? "true" : "false"}
                      />
                    </div>
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-foreground"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                    </div>
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
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-ring outline-none ${
                        errors.email
                          ? "border-destructive"
                          : "border-border"
                      } dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors duration-300`}
                      placeholder="john.doe@hospital.com"
                      aria-invalid={errors.email ? "true" : "false"}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium mb-2 text-foreground"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <KeyRound className="h-5 w-5 text-muted-foreground" />
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
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-ring outline-none ${
                          errors.password
                            ? "border-destructive"
                            : "border-border"
                        }`}
                        placeholder="••••••••"
                        aria-invalid={errors.password ? "true" : "false"}
                      />
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium mb-2 text-foreground"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <KeyRound className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <motion.input
                        variants={inputVariants}
                        whileFocus="focus"
                        initial="blur"
                        animate="blur"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-ring outline-none ${
                          errors.confirmPassword
                            ? "border-destructive"
                            : "border-border"
                        }`}
                        placeholder="••••••••"
                        aria-invalid={errors.confirmPassword ? "true" : "false"}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                {successMessage && (
                  <motion.div
                    className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-xl text-sm border border-green-200 dark:border-green-800 backdrop-blur-sm flex items-center gap-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
                    <span>{successMessage}</span>
                  </motion.div>
                )}

                {errors.general && (
                  <motion.div
                    className="mb-6 p-4 bg-destructive/10 text-destructive rounded-xl text-sm border border-destructive/20 backdrop-blur-sm flex items-center gap-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <span className="text-destructive text-lg">⚠</span>
                    <span>{errors.general}</span>
                  </motion.div>
                )}

                <div className="flex flex-col space-y-4">
                  <motion.button
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-lg transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-foreground"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )} 
                  </motion.button>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <Link
                        href="/auth/login"
                        className="text-primary hover:underline font-medium"
                      >
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HospitalSignup;
