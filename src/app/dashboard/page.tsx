"use client"
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Bell,
  User,
  Calendar,
  Pill,
  FileText,
  MessageSquare,
  Heart,
  Activity,
  ClipboardList,
  Clock,
  FileDown,
} from "lucide-react";

// Type definitions
interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  status: string;
}

interface PastAppointment extends Appointment {
  diagnosis: string;
  treatment: string;
  followUp: string;
  hasReport: boolean;
  reportId?: string;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  refillBy: string;
  refillsLeft: number;
  prescribedBy: string;
  startDate: string;
}

interface LabResult {
  id: string;
  testName: string;
  date: string;
  status: string;
  result?: string;
  hasReport?: boolean;
  reportId?: string;
}

interface Message {
  id: string;
  from: string;
  title: string;
  preview: string;
  date: string;
  isRead: boolean;
}

interface VitalSign {
  id: string;
  date: string;
  heartRate: number;
  bloodPressure: string;
  temperature: number;
  bloodGlucose: number;
  oxygenLevel: number;
  weight: number;
}

// Create a motion button component using the Button component
const MotionButton = motion(Button);

export default function PatientDashboard() {
  // Sample patient data
  const patientInfo = {
    name: "John Smith",
    age: 45,
    dob: "1980-04-15",
    primaryDoctor: "Dr. James Wilson",
    nextAppointment: "March 15, 2025",
    lastVisit: "February 28, 2025",
    insuranceProvider: "HealthPlus",
    insuranceId: "HP-2345678",
    allergies: ["Penicillin", "Shellfish"],
  };

  // Sample data
  const [upcomingAppointments, setUpcomingAppointments] = useState<
    Appointment[]
  >([
    {
      id: "1",
      doctorName: "Dr. James Wilson",
      specialty: "Cardiology",
      date: "2025-03-15",
      time: "09:30 AM",
      location: "Medical Center - Building A, Room 204",
      status: "Upcoming",
    },
    {
      id: "2",
      doctorName: "Dr. Lisa Chen",
      specialty: "Neurology",
      date: "2025-03-28",
      time: "11:00 AM",
      location: "Medical Center - Building B, Room 110",
      status: "Upcoming",
    },
    {
      id: "3",
      doctorName: "Dr. Robert Taylor",
      specialty: "Annual Physical",
      date: "2025-04-12",
      time: "01:45 PM",
      location: "Medical Center - Building A, Room 307",
      status: "Upcoming",
    },
  ]);

  const [pastAppointments, setPastAppointments] = useState<PastAppointment[]>([
    {
      id: "101",
      doctorName: "Dr. James Wilson",
      specialty: "Cardiology",
      date: "2025-02-28",
      time: "10:15 AM",
      location: "Medical Center - Building A, Room 204",
      status: "Completed",
      diagnosis: "Mild hypertension",
      treatment:
        "Prescribed Lisinopril 10mg daily, recommended reduced sodium intake",
      followUp: "Follow-up in 2 weeks",
      hasReport: true,
      reportId: "REP-12345",
    },
    {
      id: "102",
      doctorName: "Dr. Maria Garcia",
      specialty: "Orthopedics",
      date: "2025-02-15",
      time: "02:30 PM",
      location: "Medical Center - Building C, Room 110",
      status: "Completed",
      diagnosis: "Shoulder strain",
      treatment:
        "Physical therapy 2x weekly for 4 weeks, anti-inflammatory medication",
      followUp: "Return in 1 month if symptoms persist",
      hasReport: true,
      reportId: "REP-12346",
    },
    {
      id: "103",
      doctorName: "Dr. Robert Taylor",
      specialty: "Primary Care",
      date: "2025-01-30",
      time: "09:00 AM",
      location: "Medical Center - Building A, Room 307",
      status: "Completed",
      diagnosis: "Annual physical - generally healthy",
      treatment: "Continue current medications, increase physical activity",
      followUp: "Annual physical next year",
      hasReport: true,
      reportId: "REP-12347",
    },
    {
      id: "104",
      doctorName: "Dr. Sarah Johnson",
      specialty: "Endocrinology",
      date: "2025-01-10",
      time: "11:30 AM",
      location: "Medical Center - Building B, Room 205",
      status: "Completed",
      diagnosis: "Type 2 Diabetes - well controlled",
      treatment: "Continue Metformin, monthly blood glucose monitoring",
      followUp: "3-month follow-up",
      hasReport: true,
      reportId: "REP-12348",
    },
  ]);

  const [medications, setMedications] = useState<Medication[]>([
    {
      id: "1",
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      refillBy: "2025-04-20",
      refillsLeft: 2,
      prescribedBy: "Dr. James Wilson",
      startDate: "2025-02-28",
    },
    {
      id: "2",
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily at bedtime",
      refillBy: "2025-03-30",
      refillsLeft: 1,
      prescribedBy: "Dr. James Wilson",
      startDate: "2024-11-15",
    },
    {
      id: "3",
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily with meals",
      refillBy: "2025-05-15",
      refillsLeft: 3,
      prescribedBy: "Dr. Sarah Johnson",
      startDate: "2024-10-10",
    },
  ]);

  const [labResults, setLabResults] = useState<LabResult[]>([
    {
      id: "1",
      testName: "Comprehensive Metabolic Panel",
      date: "2025-02-28",
      status: "Completed",
      result: "Normal",
      hasReport: true,
      reportId: "LAB-7823",
    },
    {
      id: "2",
      testName: "Lipid Panel",
      date: "2025-02-28",
      status: "Completed",
      result: "Slightly Elevated",
      hasReport: true,
      reportId: "LAB-7824",
    },
    {
      id: "3",
      testName: "HbA1c",
      date: "2025-03-05",
      status: "Processing",
    },
    {
      id: "4",
      testName: "Thyroid Function",
      date: "2025-03-05",
      status: "Pending",
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      from: "Dr. James Wilson",
      title: "Follow-up from your last visit",
      preview:
        "I've reviewed your latest lab results and would like to discuss...",
      date: "2025-03-01",
      isRead: true,
    },
    {
      id: "2",
      from: "Medical Records",
      title: "Your Lab Results Are Available",
      preview: "Your recent lab tests have been completed. You can now...",
      date: "2025-03-04",
      isRead: false,
    },
    {
      id: "3",
      from: "Pharmacy",
      title: "Prescription Ready for Pickup",
      preview: "Your prescription for Lisinopril is ready for pickup at...",
      date: "2025-03-05",
      isRead: false,
    },
  ]);

  // Updated with IDs for each vital sign record
  const [vitalSigns, setVitalSigns] = useState<VitalSign[]>([
    {
      id: "vs1",
      date: "2025-02-28",
      heartRate: 72,
      bloodPressure: "128/82",
      temperature: 98.6,
      bloodGlucose: 110,
      oxygenLevel: 98,
      weight: 185,
    },
    {
      id: "vs2",
      date: "2025-02-15",
      heartRate: 75,
      bloodPressure: "130/85",
      temperature: 98.4,
      bloodGlucose: 115,
      oxygenLevel: 97,
      weight: 187,
    },
    {
      id: "vs3",
      date: "2025-02-01",
      heartRate: 78,
      bloodPressure: "132/88",
      temperature: 98.7,
      bloodGlucose: 118,
      oxygenLevel: 98,
      weight: 188,
    },
  ]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: {
      scale: 1.02,
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.2 },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
    hover: { backgroundColor: "#f7fafc", transition: { duration: 0.2 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const handleDownloadReport = (reportId: string) => {
    // This would typically connect to your backend to fetch the actual PDF
    // For now, we'll just simulate a download
    alert(`Downloading report ${reportId}`);
    // In a real implementation, you might do something like:
    // window.location.href = `/api/reports/${reportId}/download`;
  };

  // Animate progress bars on load
  const [progressValue, setProgressValue] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressValue(100);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Function to get custom badge styling based on status
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "Completed":
        return "outline";
      case "Processing":
        return "default";
      case "Pending":
        return "secondary";
      default:
        return "outline";
    }
  };

  // Function to get custom badge colors based on status
  const getBadgeColors = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-300";
      case "Processing":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Pending":
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto py-6 px-4">
        {/* Patient Header */}
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Avatar className="h-16 w-16">
                <AvatarFallback>
                  {patientInfo.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold">{patientInfo.name}</h1>
              <p className="text-gray-500">
                DOB: {patientInfo.dob} • {patientInfo.age} years
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MotionButton
              variant="outline"
              size="sm"
              whileHover={buttonVariants.hover}
              whileTap={buttonVariants.tap}
            >
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </MotionButton>
            <MotionButton
              variant="outline"
              size="sm"
              whileHover={buttonVariants.hover}
              whileTap={buttonVariants.tap}
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </MotionButton>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"
        >
          {/* Summary Cards */}
          <motion.div
            key="next-appointment"
            variants={cardVariants}
            whileHover="hover"
          >
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <motion.div
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatDelay: 5,
                    }}
                  >
                    <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                  </motion.div>
                  <CardTitle className="text-lg">Next Appointment</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold">
                  {patientInfo.nextAppointment}
                </p>
                <p className="text-sm text-gray-600">
                  With {patientInfo.primaryDoctor}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            key="medications"
            variants={cardVariants}
            whileHover="hover"
          >
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <motion.div
                    animate={{ rotateY: [0, 360] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 4,
                    }}
                  >
                    <Pill className="w-4 h-4 mr-2 text-green-600" />
                  </motion.div>
                  <CardTitle className="text-lg">Medications</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold">{medications.length}</p>
                <p className="text-sm text-yellow-600">
                  {medications.filter((med) => med.refillsLeft <= 1).length}{" "}
                  need refill soon
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            key="lab-results"
            variants={cardVariants}
            whileHover="hover"
          >
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  >
                    <FileText className="w-4 h-4 mr-2 text-purple-600" />
                  </motion.div>
                  <CardTitle className="text-lg">Lab Results</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold">
                  {
                    labResults.filter((lab) => lab.status === "Completed")
                      .length
                  }{" "}
                  Complete
                </p>
                <p className="text-sm text-blue-600">
                  {
                    labResults.filter((lab) => lab.status !== "Completed")
                      .length
                  }{" "}
                  pending
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div key="messages" variants={cardVariants} whileHover="hover">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  >
                    <MessageSquare className="w-4 h-4 mr-2 text-red-600" />
                  </motion.div>
                  <CardTitle className="text-lg">Messages</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold">{messages.length}</p>
                <motion.p
                  className="text-sm text-red-600"
                  animate={{
                    scale:
                      messages.filter((msg) => !msg.isRead).length > 0
                        ? [1, 1.05, 1]
                        : 1,
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {messages.filter((msg) => !msg.isRead).length} unread
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 mb-6"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.3 }}
        >
          {/* Appointments Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>Appointments</CardTitle>
              <CardDescription>
                View your upcoming and past appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upcoming">
                <TabsList className="mb-4">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past Visits</TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  <TabsContent value="upcoming">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Doctor</TableHead>
                          <TableHead>Specialty</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {upcomingAppointments.map((appointment, i) => (
                          <motion.tr
                            key={i}
                            custom={i}
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                            variants={rowVariants}
                            className="cursor-pointer"
                          >
                            <TableCell className="font-medium">
                              {appointment.doctorName}
                            </TableCell>
                            <TableCell>{appointment.specialty}</TableCell>
                            <TableCell>{appointment.date}</TableCell>
                            <TableCell>{appointment.time}</TableCell>
                            <TableCell>{appointment.location}</TableCell>
                            <TableCell>
                              <MotionButton
                                variant="outline"
                                size="sm"
                                whileHover={buttonVariants.hover}
                                whileTap={buttonVariants.tap}
                              >
                                <Calendar className="w-4 h-4 mr-2" />
                                Reschedule
                              </MotionButton>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>

                  <TabsContent value="past">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Doctor</TableHead>
                          <TableHead>Specialty</TableHead>
                          <TableHead>Diagnosis</TableHead>
                          <TableHead>Report</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pastAppointments.map((appointment, i) => (
                          <motion.tr
                            key={i}
                            custom={i}
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                            variants={rowVariants}
                            className="cursor-pointer"
                          >
                            <TableCell className="font-medium">
                              {appointment.date}
                            </TableCell>
                            <TableCell>{appointment.doctorName}</TableCell>
                            <TableCell>{appointment.specialty}</TableCell>
                            <TableCell>{appointment.diagnosis}</TableCell>
                            <TableCell>
                              {appointment.hasReport && (
                                <MotionButton
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleDownloadReport(appointment.reportId!)
                                  }
                                  whileHover={buttonVariants.hover}
                                  whileTap={buttonVariants.tap}
                                >
                                  <motion.div
                                    animate={{ y: [0, -3, 0] }}
                                    transition={{
                                      duration: 1.5,
                                      repeat: Infinity,
                                      repeatDelay: 2,
                                    }}
                                  >
                                    <FileDown className="w-4 h-4 mr-2" />
                                  </motion.div>
                                  Download
                                </MotionButton>
                              )}
                            </TableCell>
                          </motion.tr>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                </AnimatePresence>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Health Summary */}
          <motion.div
            className="lg:col-span-2"
            variants={cardVariants}
            whileHover="hover"
          >
            <Card>
              <CardHeader>
                <CardTitle>Health Summary</CardTitle>
                <CardDescription>
                  View your latest vital signs and health metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="vitals">
                  <TabsList className="mb-4">
                    <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
                    <TabsTrigger value="metrics">Health Metrics</TabsTrigger>
                  </TabsList>

                  <AnimatePresence mode="wait">
                    <TabsContent value="vitals">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <motion.div
                            className="space-y-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <motion.div
                                  animate={{
                                    scale: [1, 1.2, 1],
                                  }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                  }}
                                >
                                  <Heart className="w-4 h-4 mr-2 text-red-500" />
                                </motion.div>
                                <span className="text-sm font-medium">
                                  Heart Rate
                                </span>
                              </div>
                              <span className="text-lg font-semibold">
                                {vitalSigns[0].heartRate} bpm
                              </span>
                            </div>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 1 }}
                            >
                              <Progress
                                value={(vitalSigns[0].heartRate / 120) * 100}
                                className="h-2"
                              />
                            </motion.div>
                            <p className="text-xs text-gray-500">
                              Normal range: 60-100 bpm
                            </p>
                          </motion.div>

                          <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">
                                Blood Pressure
                              </span>
                              <span className="text-lg font-semibold">
                                {vitalSigns[0].bloodPressure} mmHg
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1, delay: 0.2 }}
                              >
                                <Progress
                                  value={
                                    (parseInt(
                                      vitalSigns[0].bloodPressure.split("/")[0]
                                    ) /
                                      180) *
                                    100
                                  }
                                  className="h-2"
                                />
                              </motion.div>
                            </div>
                            <p className="text-xs text-gray-500">
                              Target: Below 120/80 mmHg
                            </p>
                          </motion.div>

                          <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">
                                Temperature
                              </span>
                              <span className="text-lg font-semibold">
                                {vitalSigns[0].temperature}°F
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1, delay: 0.3 }}
                              >
                                <Progress
                                  value={
                                    ((vitalSigns[0].temperature - 97) / 5) * 100
                                  }
                                  className="h-2"
                                />
                              </motion.div>
                            </div>
                            <p className="text-xs text-gray-500">
                              Normal: 97.7-99.5°F
                            </p>
                          </motion.div>
                        </div>

                        <div className="space-y-4">
                          <motion.div
                            className="space-y-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <motion.div
                                  animate={{
                                    rotate: [0, 360],
                                  }}
                                  transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                  }}
                                >
                                  <Activity className="w-4 h-4 mr-2 text-blue-500" />
                                </motion.div>
                                <span className="text-sm font-medium">
                                  Blood Glucose
                                </span>
                              </div>
                              <span className="text-lg font-semibold">
                                {vitalSigns[0].bloodGlucose} mg/dL
                              </span>
                            </div>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 1, delay: 0.1 }}
                            >
                              <Progress
                                value={
                                  ((vitalSigns[0].bloodGlucose - 70) / 130) *
                                  100
                                }
                                className="h-2"
                              />
                            </motion.div>
                            <p className="text-xs text-gray-500">
                              Target: 70-130 mg/dL before meals
                            </p>
                          </motion.div>

                          <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">
                                Oxygen Level
                              </span>
                              <span className="text-lg font-semibold">
                                {vitalSigns[0].oxygenLevel}%
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1, delay: 0.2 }}
                              >
                                <Progress
                                  value={vitalSigns[0].oxygenLevel}
                                  className="h-2"
                                />
                              </motion.div>
                            </div>
                            <p className="text-xs text-gray-500">
                              Normal: 95-100%
                            </p>
                          </motion.div>

                          <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">
                                Weight
                              </span>
                              <span className="text-lg font-semibold">
                                {vitalSigns[0].weight} lbs
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1, delay: 0.3 }}
                              >
                                <Progress
                                  value={(vitalSigns[0].weight / 250) * 100}
                                  className="h-2"
                                />
                              </motion.div>
                            </div>
                            <p className="text-xs text-gray-500">
                              Trend:{" "}
                              {vitalSigns[0].weight - vitalSigns[1].weight > 0
                                ? `+${
                                    vitalSigns[0].weight - vitalSigns[1].weight
                                  }`
                                : vitalSigns[0].weight -
                                  vitalSigns[1].weight}{" "}
                              lbs from last visit
                            </p>
                          </motion.div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="metrics">
                      <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div>
                          <h3 className="text-lg font-medium mb-2">
                            Health Overview
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card>
                              <CardContent className="pt-6">
                                <div className="text-center">
                                  <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-2">
                                    <Heart className="h-6 w-6 text-blue-700" />
                                  </div>
                                  <h4 className="text-lg font-semibold">
                                    Cardiovascular
                                  </h4>
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "75%" }}
                                    transition={{ duration: 1.5 }}
                                  >
                                    <Progress value={75} className="h-2 mt-2" />
                                  </motion.div>
                                  <Badge className="mt-2">Good</Badge>
                                </div>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardContent className="pt-6">
                                <div className="text-center">
                                  <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-2">
                                    <Activity className="h-6 w-6 text-green-700" />
                                  </div>
                                  <h4 className="text-lg font-semibold">
                                    Metabolic
                                  </h4>
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "82%" }}
                                    transition={{ duration: 1.5, delay: 0.2 }}
                                  >
                                    <Progress value={82} className="h-2 mt-2" />
                                  </motion.div>
                                  <Badge className="mt-2" variant="outline">
                                    Excellent
                                  </Badge>
                                </div>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardContent className="pt-6">
                                <div className="text-center">
                                  <div className="inline-flex items-center justify-center p-3 bg-yellow-100 rounded-full mb-2">
                                    <ClipboardList className="h-6 w-6 text-yellow-700" />
                                  </div>
                                  <h4 className="text-lg font-semibold">
                                    Checkups
                                  </h4>
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "60%" }}
                                    transition={{ duration: 1.5, delay: 0.4 }}
                                  >
                                    <Progress value={60} className="h-2 mt-2" />
                                  </motion.div>
                                  <Badge className="mt-2" variant="secondary">
                                    Average
                                  </Badge>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-2">
                            Wellness Goals
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">
                                  Physical Activity
                                </span>
                                <span className="text-sm text-gray-600">
                                  3/5 days complete
                                </span>
                              </div>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1 }}
                              >
                                <Progress value={60} className="h-2" />
                              </motion.div>
                            </div>

                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">
                                  Medication Adherence
                                </span>
                                <span className="text-sm text-gray-600">
                                  26/30 days
                                </span>
                              </div>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1, delay: 0.2 }}
                              >
                                <Progress value={87} className="h-2" />
                              </motion.div>
                            </div>

                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">
                                  Blood Pressure Readings
                                </span>
                                <span className="text-sm text-gray-600">
                                  12/15 readings
                                </span>
                              </div>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1, delay: 0.4 }}
                              >
                                <Progress value={80} className="h-2" />
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </TabsContent>
                  </AnimatePresence>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Medications */}
          <motion.div variants={cardVariants} whileHover="hover">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Current Medications</CardTitle>
                  <MotionButton
                    variant="outline"
                    size="sm"
                    whileHover={buttonVariants.hover}
                    whileTap={buttonVariants.tap}
                  >
                    <Pill className="w-4 h-4 mr-2" />
                    Refill
                  </MotionButton>
                </div>
              </CardHeader>
              <CardContent>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {medications.map((medication, i) => (
                    <motion.div
                      key={i}
                      custom={i}
                      variants={rowVariants}
                      className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between">
                        <h4 className="font-medium">{medication.name}</h4>
                        <span
                          className={`text-sm ${
                            medication.refillsLeft <= 1
                              ? "text-red-600 font-medium"
                              : "text-gray-600"
                          }`}
                        >
                          {medication.refillsLeft} refills left
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {medication.dosage} • {medication.frequency}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">
                          Prescribed by {medication.prescribedBy}
                        </span>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            Refill by{" "}
                            {new Date(medication.refillBy).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Lab Results */}
          <motion.div variants={cardVariants} whileHover="hover">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Lab Results</CardTitle>
                <CardDescription>
                  View your latest laboratory test results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {labResults.map((lab, i) => (
                    <motion.div
                      key={i}
                      custom={i}
                      variants={rowVariants}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between">
                        <h4 className="font-medium">{lab.testName}</h4>
                        <Badge
                          variant="outline"
                          className={getBadgeColors(lab.status)}
                        >
                          {lab.status}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        {lab.date}
                      </div>
                      {lab.result && (
                        <div className="mt-3 flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="text-sm font-medium mr-2">
                              Result:
                            </span>
                            <span
                              className={`text-sm ${
                                lab.result === "Normal"
                                  ? "text-green-600"
                                  : "text-yellow-600"
                              }`}
                            >
                              {lab.result}
                            </span>
                          </div>
                          {lab.hasReport && (
                            <MotionButton
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleDownloadReport(lab.reportId!)
                              }
                              whileHover={buttonVariants.hover}
                              whileTap={buttonVariants.tap}
                            >
                              <FileDown className="w-4 h-4 mr-1" />
                              View
                            </MotionButton>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Messages */}
          <motion.div variants={cardVariants} whileHover="hover">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>
                  Communication with your healthcare team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.map((message, i) => (
                    <motion.div
                      key={i}
                      custom={i}
                      variants={rowVariants}
                      className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors ${
                        !message.isRead ? "border-blue-300 bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex justify-between">
                        <h4 className="font-medium">{message.title}</h4>
                        {!message.isRead && (
                          <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {message.preview}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-500">
                          From: {message.from}
                        </span>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {message.date}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MotionButton
              className="h-24 flex flex-col items-center justify-center"
              whileHover={buttonVariants.hover}
              whileTap={buttonVariants.tap}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Calendar className="h-6 w-6 mb-2" />
              </motion.div>
              Schedule Appointment
            </MotionButton>
            <MotionButton
              variant="outline"
              className="h-24 flex flex-col items-center justify-center"
              whileHover={buttonVariants.hover}
              whileTap={buttonVariants.tap}
            >
              <motion.div
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MessageSquare className="h-6 w-6 mb-2" />
              </motion.div>
              Message Doctor
            </MotionButton>
            <MotionButton
              variant="outline"
              className="h-24 flex flex-col items-center justify-center"
              whileHover={buttonVariants.hover}
              whileTap={buttonVariants.tap}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Pill className="h-6 w-6 mb-2" />
              </motion.div>
              Refill Medication
            </MotionButton>
            <MotionButton
              variant="outline"
              className="h-24 flex flex-col items-center justify-center"
              whileHover={buttonVariants.hover}
              whileTap={buttonVariants.tap}
            >
              <motion.div
                animate={{ rotateY: [0, 180, 360] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ClipboardList className="h-6 w-6 mb-2" />
              </motion.div>
              View Medical Records
            </MotionButton>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
