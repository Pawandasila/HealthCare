import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Calendar, FileDown } from "lucide-react";

import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { CardDescription } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
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
const MotionTableRow = motion(TableRow);

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
      className="grid grid-cols-1 gap-6 mb-6"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={{ delay: 0.3 }}
    >
      <Card className="border-border bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/60 via-primary/70 to-primary/80"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/8 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
        <CardHeader className="flex flex-row items-center justify-between relative z-10">
          <div>
            <CardTitle className="text-xl font-bold text-card-foreground">Appointments</CardTitle>
            <CardDescription className="text-muted-foreground">
              View your upcoming and past appointments
            </CardDescription>
          </div>
          <MotionButton
            onClick={() => setIsModalOpen(true)}
            whileHover={buttonVariants.hover}
            whileTap={buttonVariants.tap}
            className="bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-lg hover:shadow-primary/25"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Appointment
          </MotionButton>
        </CardHeader>
        <CardContent className="relative z-10">
          <Tabs defaultValue="upcoming">
            <TabsList className="mb-4 bg-muted p-1 rounded-lg border border-border">
              <TabsTrigger
                value="upcoming"
                className="rounded-md text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
              >
                Upcoming
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="rounded-md text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
              >
                Past Visits
              </TabsTrigger>
            </TabsList>            <AnimatePresence mode="wait">
              <TabsContent value="upcoming">
                <div className="overflow-x-auto rounded-lg border border-border bg-muted/50">
                  <Table>
                    <TableHeader className="bg-secondary">
                      <TableRow className="border-b border-border">
                        <TableHead className="font-semibold text-secondary-foreground">Doctor</TableHead>
                        <TableHead className="font-semibold text-secondary-foreground">
                          Specialty
                        </TableHead>
                        <TableHead className="font-semibold text-secondary-foreground">Date</TableHead>
                        <TableHead className="font-semibold text-secondary-foreground">Time</TableHead>
                        <TableHead className="font-semibold text-secondary-foreground">
                          Location
                        </TableHead>
                        <TableHead className="font-semibold text-secondary-foreground">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upcomingAppointments.map((appointment, i) => (
                        <MotionTableRow
                          key={appointment.id || i}
                          custom={i}
                          initial="hidden"
                          animate="visible"
                          whileHover="hover"
                          variants={rowVariants}
                          className="cursor-pointer border-b border-border hover:bg-muted/50 transition-colors"
                        >
                          <TableCell className="font-medium text-card-foreground">
                            {appointment.doctorName}
                          </TableCell>
                          <TableCell className="text-muted-foreground">{appointment.specialty}</TableCell>
                          <TableCell className="text-muted-foreground">{appointment.date}</TableCell>
                          <TableCell className="text-muted-foreground">{appointment.time}</TableCell>
                          <TableCell className="text-muted-foreground">{appointment.location}</TableCell>
                          <TableCell>
                            <MotionButton
                              variant="outline"
                              size="sm"
                              whileHover={buttonVariants.hover}
                              whileTap={buttonVariants.tap}
                              className="text-primary border-primary/50 hover:bg-primary/20 hover:border-primary transition-all"
                            >
                              <Calendar className="w-4 h-4 mr-2" />
                              Reschedule
                            </MotionButton>
                          </TableCell>
                        </MotionTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="past">
                <div className="overflow-x-auto rounded-lg border border-slate-700/50 dark:border-slate-600/50 bg-slate-900/50 dark:bg-slate-800/50">
                  <Table>
                    <TableHeader className="bg-slate-800/70 dark:bg-slate-700/70">
                      <TableRow className="border-b border-slate-700/50 dark:border-slate-600/50">
                        <TableHead className="font-semibold text-slate-200 dark:text-slate-300">Date</TableHead>
                        <TableHead className="font-semibold text-slate-200 dark:text-slate-300">Doctor</TableHead>
                        <TableHead className="font-semibold text-slate-200 dark:text-slate-300">
                          Specialty
                        </TableHead>
                        <TableHead className="font-semibold text-slate-200 dark:text-slate-300">
                          Diagnosis
                        </TableHead>
                        <TableHead className="font-semibold text-slate-200 dark:text-slate-300">Report</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pastAppointments.map((appointment, i) => (
                        <MotionTableRow
                          key={appointment.id || i}
                          custom={i}
                          initial="hidden"
                          animate="visible"
                          whileHover="hover"
                          variants={rowVariants}
                          className="cursor-pointer border-b border-slate-700/30 dark:border-slate-600/30 hover:bg-slate-800/50 dark:hover:bg-slate-700/50 transition-colors"
                        >
                          <TableCell className="font-medium text-white dark:text-slate-100">
                            {appointment.date}
                          </TableCell>
                          <TableCell className="text-slate-300 dark:text-slate-400">{appointment.doctorName}</TableCell>
                          <TableCell className="text-slate-300 dark:text-slate-400">{appointment.specialty}</TableCell>
                          <TableCell className="text-slate-300 dark:text-slate-400">{appointment.diagnosis}</TableCell>
                          <TableCell>
                            {appointment.hasReport && appointment.reportId && (
                              <MotionButton
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleDownloadReport(appointment.reportId!)
                                }
                                whileHover={buttonVariants.hover}
                                whileTap={buttonVariants.tap}
                                className="text-emerald-400 hover:bg-emerald-500/20 transition-all"
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
                        </MotionTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </CardContent>
      </Card>

      {/* Add Appointment Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Schedule New Appointment
            </DialogTitle>
            <DialogDescription>
              Fill in the details below to schedule your appointment.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="doctorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doctor Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Dr. John Smith"
                        {...field}
                        className="focus:ring-blue-500"
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
                    <FormLabel>Specialty</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a specialty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {specialties.map((specialty) => (
                          <SelectItem key={specialty} value={specialty}>
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
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className="focus:ring-blue-500"
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
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          {...field}
                          className="focus:ring-blue-500"
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
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Main Hospital, Room 302"
                        {...field}
                        className="focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
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
