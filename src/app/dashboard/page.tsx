"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  MessageSquare,
  Heart,
  Activity,
  User,
} from "lucide-react";

import LabResultsTimeline from "@/components/custom/LabResult";
import QuickAction from "@/components/custom/QuickAction";
import useAxios from "../hooks/UseAxios";
import GetHealthInfoPage from "@/components/custom/PatientHealthModel";
import SOSButton from "@/components/custom/SOS";


export default function PatientDashboard() {

  const [userInfo, setUserInfo] = useState<any>(null);
  const api = useAxios();
  const getUserInfo = async () => {
    const res = await api.get("/userInfo/");
    if (res.status == 200) {
      console.log(res.data)
      setUserInfo(res.data);
    }
  };


  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6
      } 
    },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow:
        "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 25px 25px -5px rgba(0, 0, 0, 0.04)",
      transition: { 
        duration: 0.4
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      },
    },
  };

  useEffect(() => {
    getUserInfo();
  }, []);


  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-6 px-4">
        {userInfo ? !userInfo.dob ? (
          <GetHealthInfoPage getUserInfo={getUserInfo} />
        ) : (
          <>
            {/* Patient Header */}
            <motion.div
              className="flex items-center justify-between mb-8 p-8 bg-card/95 backdrop-blur-xl rounded-3xl border border-border shadow-2xl relative overflow-hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/8 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary/5 to-transparent rounded-full translate-y-16 -translate-x-16"></div>
              
              <div className="flex items-center gap-8 relative z-10">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Avatar className="h-24 w-24 border-4 border-border shadow-2xl ring-4 ring-primary/15">
                    <AvatarFallback className="bg-primary text-primary-foreground font-bold text-2xl">
                      {userInfo.first_name[0] + userInfo.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <motion.div 
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full border-4 border-card shadow-lg"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  ></motion.div>
                </motion.div>
                <div>
                  <h1 className="text-4xl font-bold heading-maya bg-gradient-to-r from-foreground via-foreground to-foreground bg-clip-text text-transparent mb-2">
                    {userInfo.first_name + " " + userInfo.last_name}
                  </h1>
                  <p className="text-muted-foreground text-lg mb-3">
                    DOB: {userInfo.dob}
                  </p>
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-3 h-3 bg-primary rounded-full shadow-lg"
                      animate={{ opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    ></motion.div>
                    <span className="text-sm text-muted-foreground font-medium">Active Patient</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              <motion.div
                key="health-info"
                variants={cardVariants}
                whileHover="hover"
                className="group"
              >
                <Card className="border-border bg-card backdrop-blur-xl hover:bg-card/80 transition-all duration-500 overflow-hidden relative shadow-2xl hover:shadow-primary/20">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary/80 via-primary to-primary/90 shadow-lg"></div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/12 to-transparent rounded-full -translate-y-12 translate-x-12"></div>
                  <CardHeader className="pb-3 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <motion.div
                          className="p-3 bg-gradient-to-br from-primary/20 via-primary/15 to-primary/10 rounded-xl mr-4 shadow-lg ring-1 ring-primary/15"
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <Heart className="w-6 h-6 text-primary" />
                        </motion.div>
                        <CardTitle className="text-lg text-card-foreground font-semibold">
                          Blood Group
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-2xl font-bold text-card-foreground mb-2 tracking-tight">
                      {userInfo?.blood_group?.toUpperCase() || "N/A"}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">
                      {userInfo?.gender?.charAt(0).toUpperCase() + userInfo?.gender?.slice(1) || "Not specified"}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                key="medications"
                variants={cardVariants}
                whileHover="hover"
                className="group"
              >
                <Card className="border-border bg-card backdrop-blur-xl hover:bg-card/80 transition-all duration-500 overflow-hidden relative shadow-2xl hover:shadow-primary/20">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary/70 via-primary/80 to-primary/90 shadow-lg"></div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/12 to-transparent rounded-full -translate-y-12 translate-x-12"></div>
                  <CardHeader className="pb-3 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <motion.div
                          className="p-3 bg-gradient-to-br from-primary/20 via-primary/15 to-primary/10 rounded-xl mr-4 shadow-lg ring-1 ring-primary/15"
                          animate={{ 
                            rotateY: [0, 180, 360],
                            scale: [1, 1.05, 1] 
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            repeatDelay: 2
                          }}
                        >
                          <User className="w-6 h-6 text-primary" />
                        </motion.div>
                        <CardTitle className="text-lg text-card-foreground font-semibold">
                          Height & Weight
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-2xl font-bold text-card-foreground mb-2 tracking-tight">
                      {userInfo?.height || "N/A"}cm
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">
                      Weight: {userInfo?.weight || "N/A"}kg
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                key="health-conditions"
                variants={cardVariants}
                whileHover="hover"
                className="group"
              >
                <Card className="border-border bg-card backdrop-blur-xl hover:bg-card/80 transition-all duration-500 overflow-hidden relative shadow-2xl hover:shadow-primary/20">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary/60 via-primary/70 to-primary/80 shadow-lg"></div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/12 to-transparent rounded-full -translate-y-12 translate-x-12"></div>
                  <CardHeader className="pb-3 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <motion.div
                          className="p-3 bg-gradient-to-br from-primary/20 via-primary/15 to-primary/10 rounded-xl mr-4 shadow-lg ring-1 ring-primary/15"
                          animate={{ 
                            scale: [1, 1.15, 1],
                            rotate: [0, 5, -5, 0] 
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            repeatDelay: 2
                          }}
                        >
                          <Activity className="w-6 h-6 text-primary" />
                        </motion.div>
                        <CardTitle className="text-lg text-card-foreground font-semibold">
                          Health Condition
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-xl font-bold text-card-foreground mb-2 tracking-tight">
                      {userInfo?.disease || "None recorded"}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">
                      Current condition
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                key="allergies"
                variants={cardVariants}
                whileHover="hover"
                className="group"
              >
                <Card className="border-border bg-card backdrop-blur-xl hover:bg-card/80 transition-all duration-500 overflow-hidden relative shadow-2xl hover:shadow-destructive/20">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-destructive/60 via-destructive/70 to-destructive/80 shadow-lg"></div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-destructive/12 to-transparent rounded-full -translate-y-12 translate-x-12"></div>
                  <CardHeader className="pb-3 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <motion.div
                          className="p-3 bg-gradient-to-br from-destructive/20 via-destructive/15 to-destructive/10 rounded-xl mr-4 shadow-lg ring-1 ring-destructive/15"
                          animate={{
                            scale: [1, 1.08, 1],
                            rotate: [0, 8, -8, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            repeatDelay: 1
                          }}
                        >
                          <MessageSquare className="w-6 h-6 text-destructive" />
                        </motion.div>
                        <CardTitle className="text-lg text-card-foreground font-semibold">
                          Allergies
                        </CardTitle>
                      </div>
                      {userInfo?.allergies && userInfo.allergies !== "No" && (
                        <motion.div
                          className="w-4 h-4 bg-destructive rounded-full shadow-lg ring-2 ring-destructive/40"
                          animate={{ 
                            scale: [1, 1.3, 1],
                            opacity: [1, 0.7, 1] 
                          }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity,
                            ease: "easeInOut" 
                          }}
                        />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-2xl font-bold text-card-foreground mb-2 tracking-tight">
                      {userInfo?.allergies || "None"}
                    </p>
                    <motion.p
                      className="text-sm text-muted-foreground font-medium"
                      animate={{
                        scale: userInfo?.allergies && userInfo.allergies !== "No" ? [1, 1.02, 1] : 1,
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {userInfo?.allergies && userInfo.allergies !== "No" ? "Active allergy" : "No known allergies"}
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Appointments Section - Removed as requested */}
            {/* <AppointmentsSection /> */}
            
            {/* Enhanced Lab Results Timeline */}
            <LabResultsTimeline />

            {/* Lab Results Section */}
            {/* <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              id="message"
            >
              <motion.div
                className="bg-card/95 h-[35rem] backdrop-blur-xl rounded-3xl shadow-2xl border border-border overflow-hidden relative"
                variants={itemVariants}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/60 via-primary/70 to-primary/80"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/8 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                <div className="h-full max-h-[570px] overflow-auto" id="timeline">
                </div>
              </motion.div>

              
              <motion.div
                className="bg-card/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-border overflow-hidden relative"
                variants={itemVariants}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-destructive/60 via-destructive/70 to-destructive/80"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-destructive/8 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                <div className="h-full max-h-[570px]">
                  <HealthcareMessaging />
                </div>
              </motion.div>
            </motion.div> */}

            {/* Quick Actions */}
            {/* <QuickAction /> */}
            <SOSButton/>
          </>
        ):<></>}
      </main>
    </div>
  );
}
