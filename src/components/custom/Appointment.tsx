import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Calendar, FileDown, Clock, MapPin, User, Stethoscope, Activity } from "lucide-react";

import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { CardDescription } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { FormItem } from "@/components/ui/form";
import { FormLabel } from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import { FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

interface UpcomingAppointment {
  id?: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
}

interface PastAppointment {
  id?: string;
  date: string;
  doctorName: string;
  specialty: string;
  diagnosis: string;
  hasReport: boolean;
  reportId?: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1 },
  }),
  hover: { backgroundColor: "rgba(0, 0, 0, 0.05)" },
};

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const appointmentFormSchema = z.object({
  doctorName: z.string().min(2, { message: "Doctor name is required" }),
  specialty: z.string().min(2, { message: "Specialty is required" }),
  date: z.string().min(2, { message: "Date is required" }),
  time: z.string().min(2, { message: "Time is required" }),
  location: z.string().min(2, { message: "Location is required" }),
});

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

const MotionButton = motion(Button);

const AppointmentsSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [upcomingAppointments, setUpcomingAppointments] = useState<
    UpcomingAppointment[]
  >([
    {
      id: "1",
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "March 15, 2025",
      time: "10:30 AM",
      location: "Main Hospital, Room 302",
    },
    {
      id: "2",
      doctorName: "Dr. Michael Chen",
      specialty: "Dermatology",
      date: "March 22, 2025",
      time: "2:15 PM",
      location: "Medical Plaza, Suite 104",
    },
  ]);

  const [pastAppointments] = useState<PastAppointment[]>([
    {
      id: "3",
      date: "February 10, 2025",
      doctorName: "Dr. Emily Rodriguez",
      specialty: "Neurology",
      diagnosis: "Migraine",
      hasReport: true,
      reportId: "12345",
    },
    {
      id: "4",
      date: "January 23, 2025",
      doctorName: "Dr. James Wilson",
      specialty: "Orthopedics",
      diagnosis: "Mild sprain",
      hasReport: true,
      reportId: "12346",
    },
  ]);

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      doctorName: "",
      specialty: "",
      date: "",
      time: "",
      location: "",
    },
  });

  const onSubmit = (data: AppointmentFormValues) => {
    const newAppointment: UpcomingAppointment = {
      ...data,
      id: `app-${Date.now()}`,
    };

    setUpcomingAppointments([...upcomingAppointments, newAppointment]);

    setIsModalOpen(false);

    form.reset();
  };

  const handleDownloadReport = (reportId: string) => {
    console.log(`Downloading report ${reportId}`);
  };

  const specialties = [
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "Neurology",
    "Obstetrics",
    "Oncology",
    "Ophthalmology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Urology",
  ];

  return (
    <motion.div
      className="mb-8"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={{ delay: 0.3 }}
    >
      <Card className="border-border bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden relative rounded-3xl">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary/60 via-primary/70 to-primary/80 shadow-lg"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/8 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary/5 to-transparent rounded-full translate-y-16 -translate-x-16"></div>
        <CardHeader className="flex flex-row items-center justify-between relative z-10 p-8">
          <div>
            <CardTitle className="text-3xl font-bold heading-maya bg-gradient-to-r from-foreground via-foreground to-foreground bg-clip-text text-transparent mb-2">
              Appointments
            </CardTitle>
            <CardDescription className="text-muted-foreground text-lg">
              View your upcoming and past appointments
            </CardDescription>
          </div>
          <MotionButton
            onClick={() => setIsModalOpen(true)}
            whileHover={buttonVariants.hover}
            whileTap={buttonVariants.tap}
            className="bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-lg hover:shadow-primary/25 px-6 py-3 rounded-xl font-semibold"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Appointment
          </MotionButton>
        </CardHeader>
        <CardContent className="relative z-10 p-8">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-6 bg-card/80 backdrop-blur-xl p-2 rounded-2xl border border-border shadow-lg w-full md:w-auto">
              <TabsTrigger
                value="upcoming"
                className="rounded-xl text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg px-6 py-3 font-semibold transition-all duration-300"
              >
                Upcoming Appointments
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="rounded-xl text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg px-6 py-3 font-semibold transition-all duration-300"
              >
                Past Visits
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="upcoming" className="mt-6">
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/20"></div>
                  
                  <div className="space-y-6">
                    {upcomingAppointments.map((appointment, i) => (
                      <motion.div
                        key={appointment.id || i}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={rowVariants}
                        className="relative flex items-start gap-6"
                      >
                        {/* Timeline Dot */}
                        <div className="relative z-10 flex-shrink-0">
                          <motion.div
                            className="w-4 h-4 bg-primary rounded-full border-4 border-card shadow-lg"
                            animate={{ 
                              scale: [1, 1.2, 1],
                              boxShadow: [
                                "0 0 0 0 rgba(var(--primary), 0.4)",
                                "0 0 0 10px rgba(var(--primary), 0)",
                                "0 0 0 0 rgba(var(--primary), 0)"
                              ]
                            }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity, 
                              delay: i * 0.5 
                            }}
                          />
                        </div>

                        {/* Appointment Card */}
                        <motion.div
                          className="flex-1"
                          whileHover={{ y: -4, scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card className="border-border bg-card/80 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/60 via-primary/80 to-primary/60"></div>
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
                            
                            <CardContent className="p-6 relative z-10">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <motion.div
                                    className="p-2 bg-primary/20 rounded-xl"
                                    animate={{ rotate: [0, 5, -5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.2 }}
                                  >
                                    <User className="w-5 h-5 text-primary" />
                                  </motion.div>
                                  <div>
                                    <h3 className="text-xl font-bold text-card-foreground mb-1">
                                      {appointment.doctorName}
                                    </h3>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                      <Stethoscope className="w-4 h-4" />
                                      <span className="font-medium">{appointment.specialty}</span>
                                    </div>
                                  </div>
                                </div>
                                <MotionButton
                                  variant="outline"
                                  size="sm"
                                  whileHover={buttonVariants.hover}
                                  whileTap={buttonVariants.tap}
                                  className="text-primary border-primary/50 hover:bg-primary/20 hover:border-primary transition-all rounded-lg font-semibold"
                                >
                                  <Calendar className="w-4 h-4 mr-2" />
                                  Reschedule
                                </MotionButton>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center gap-3 p-3 bg-card/50 rounded-xl border border-border/50">
                                  <div className="p-2 bg-primary/10 rounded-lg">
                                    <Calendar className="w-4 h-4 text-primary" />
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground font-medium">Date</p>
                                    <p className="text-sm font-semibold text-card-foreground">{appointment.date}</p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-card/50 rounded-xl border border-border/50">
                                  <div className="p-2 bg-primary/10 rounded-lg">
                                    <Clock className="w-4 h-4 text-primary" />
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground font-medium">Time</p>
                                    <p className="text-sm font-semibold text-card-foreground">{appointment.time}</p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-card/50 rounded-xl border border-border/50">
                                  <div className="p-2 bg-primary/10 rounded-lg">
                                    <MapPin className="w-4 h-4 text-primary" />
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground font-medium">Location</p>
                                    <p className="text-sm font-semibold text-card-foreground">{appointment.location}</p>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="past" className="mt-6">
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-muted-foreground/40 via-muted-foreground/30 to-muted-foreground/20"></div>
                  
                  <div className="space-y-6">
                    {pastAppointments.map((appointment, i) => (
                      <motion.div
                        key={appointment.id || i}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={rowVariants}
                        className="relative flex items-start gap-6"
                      >
                        {/* Timeline Dot */}
                        <div className="relative z-10 flex-shrink-0">
                          <div className="w-4 h-4 bg-muted-foreground/60 rounded-full border-4 border-card shadow-lg" />
                        </div>

                        {/* Past Appointment Card */}
                        <motion.div
                          className="flex-1"
                          whileHover={{ y: -4, scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card className="border-border bg-card/80 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-muted-foreground/40 via-muted-foreground/60 to-muted-foreground/40"></div>
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-muted-foreground/8 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
                            
                            <CardContent className="p-6 relative z-10">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-muted-foreground/20 rounded-xl">
                                    <User className="w-5 h-5 text-muted-foreground" />
                                  </div>
                                  <div>
                                    <h3 className="text-xl font-bold text-card-foreground mb-1">
                                      {appointment.doctorName}
                                    </h3>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                      <Stethoscope className="w-4 h-4" />
                                      <span className="font-medium">{appointment.specialty}</span>
                                    </div>
                                  </div>
                                </div>
                                {appointment.hasReport && appointment.reportId && (
                                  <MotionButton
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDownloadReport(appointment.reportId!)}
                                    whileHover={buttonVariants.hover}
                                    whileTap={buttonVariants.tap}
                                    className="text-primary hover:bg-primary/20 transition-all rounded-lg font-semibold"
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
                                    Download Report
                                  </MotionButton>
                                )}
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center gap-3 p-3 bg-card/50 rounded-xl border border-border/50">
                                  <div className="p-2 bg-muted-foreground/10 rounded-lg">
                                    <Calendar className="w-4 h-4 text-muted-foreground" />
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground font-medium">Visit Date</p>
                                    <p className="text-sm font-semibold text-card-foreground">{appointment.date}</p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-card/50 rounded-xl border border-border/50">
                                  <div className="p-2 bg-muted-foreground/10 rounded-lg">
                                    <Activity className="w-4 h-4 text-muted-foreground" />
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground font-medium">Diagnosis</p>
                                    <p className="text-sm font-semibold text-card-foreground">{appointment.diagnosis}</p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-card/50 rounded-xl border border-border/50">
                                  <div className="p-2 bg-muted-foreground/10 rounded-lg">
                                    <FileDown className="w-4 h-4 text-muted-foreground" />
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground font-medium">Report</p>
                                    <p className="text-sm font-semibold text-card-foreground">
                                      {appointment.hasReport ? 'Available' : 'Not Available'}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </CardContent>
      </Card>

      {/* Add Appointment Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl">
          <DialogHeader className="relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/60 via-primary/70 to-primary/80 rounded-t-2xl"></div>
            <DialogTitle className="text-2xl font-bold heading-maya bg-gradient-to-r from-foreground via-foreground to-foreground bg-clip-text text-transparent mt-4">
              Schedule New Appointment
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-base">
              Fill in the details below to schedule your appointment.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
              <FormField
                control={form.control}
                name="doctorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-card-foreground font-semibold">Doctor Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Dr. John Smith"
                        {...field}
                        className="focus:ring-primary focus:border-primary rounded-xl bg-card/50 backdrop-blur-xl border-border"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-card-foreground font-semibold">Specialty</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-xl bg-card/50 backdrop-blur-xl border-border">
                          <SelectValue placeholder="Select a specialty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-card/95 backdrop-blur-xl border border-border rounded-xl">
                        {specialties.map((specialty) => (
                          <SelectItem key={specialty} value={specialty} className="hover:bg-primary/10">
                            {specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-card-foreground font-semibold">Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className="focus:ring-primary focus:border-primary rounded-xl bg-card/50 backdrop-blur-xl border-border"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-card-foreground font-semibold">Time</FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          {...field}
                          className="focus:ring-primary focus:border-primary rounded-xl bg-card/50 backdrop-blur-xl border-border"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-card-foreground font-semibold">Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Main Hospital, Room 302"
                        {...field}
                        className="focus:ring-primary focus:border-primary rounded-xl bg-card/50 backdrop-blur-xl border-border"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-8 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border-border hover:bg-card/50 backdrop-blur-xl font-semibold"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90 rounded-xl font-semibold shadow-lg hover:shadow-primary/25"
                >
                  Schedule Appointment
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default AppointmentsSection;
