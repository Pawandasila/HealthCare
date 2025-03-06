import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatePresence, motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface PatientDetails {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  Blood_group: string;
  height: string;
  weight: string;
  gender: string;
}

interface HealthCondition {
  diseases: string[];
  allergies: string[];
  currentInjuries: string[];
  notes: string;
  medications: string[];
}

const MotionButton = motion(Button);
const MotionCard = motion(Card);
const MotionBadge = motion(Badge);

const PatientHealthModal: React.FC = () => {
  // State
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("patient-details");
  const [patientDetails, setPatientDetails] = useState<PatientDetails>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    Blood_group: "",
    height: "",
    weight: "",
    gender: "",
  });

  const [healthCondition, setHealthCondition] = useState<HealthCondition>({
    diseases: [],
    allergies: [],
    currentInjuries: [],
    notes: "",
    medications: [],
  });

  const [currentInput, setCurrentInput] = useState<{
    disease: string;
    allergy: string;
    injury: string;
    medication: string;
  }>({
    disease: "",
    allergy: "",
    injury: "",
    medication: "",
  });

  // Open modal on component mount
  useEffect(() => {
    setIsOpen(true);
  }, []);

  // Handlers
  const handlePatientDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setPatientDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCurrentInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "disease" | "allergy" | "injury" | "medication"
  ) => {
    setCurrentInput((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleAddItem = (field: keyof Omit<HealthCondition, "notes">) => {
    const inputField =
      field === "diseases"
        ? "disease"
        : field === "allergies"
        ? "allergy"
        : field === "currentInjuries"
        ? "injury"
        : "medication";

    const value = currentInput[inputField as keyof typeof currentInput];

    if (value.trim()) {
      setHealthCondition((prev) => ({
        ...prev,
        [field]: [...prev[field], value.trim()],
      }));

      setCurrentInput((prev) => ({ ...prev, [inputField]: "" }));
    }
  };

  const handleRemoveItem = (
    field: keyof Omit<HealthCondition, "notes">,
    index: number
  ) => {
    setHealthCondition((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    // Process form submission here
    console.log({ patientDetails, healthCondition });
    setIsOpen(false);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const badgeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25,
      },
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Patient Health Information
          </DialogTitle>
          <DialogDescription>
            Please fill in the patient details and health conditions
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sticky top-0 z-10 bg-background">
            <TabsTrigger value="patient-details">Patient Details</TabsTrigger>
            <TabsTrigger value="health-condition">Health Condition</TabsTrigger>
          </TabsList>

          <TabsContent value="patient-details" className="space-y-4 mt-4">
            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="grid grid-cols-2 gap-4"
                variants={itemVariants}
              >
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={patientDetails.firstName}
                    onChange={handlePatientDetailsChange}
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={patientDetails.lastName}
                    onChange={handlePatientDetailsChange}
                    placeholder="Doe"
                  />
                </div>
              </motion.div>

              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={patientDetails.dateOfBirth}
                  onChange={handlePatientDetailsChange}
                />
              </motion.div>

              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="Blood_group">Blood Group</Label>
                <Input
                  id="Blood_group"
                  name="Blood_group"
                  type="text"
                  value={patientDetails.Blood_group}
                  onChange={handlePatientDetailsChange}
                  placeholder="A+"
                />
              </motion.div>

              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  name="height"
                  value={patientDetails.height}
                  onChange={handlePatientDetailsChange}
                  placeholder="180 cm"
                />
              </motion.div>

              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  name="weight"
                  value={patientDetails.weight}
                  onChange={handlePatientDetailsChange}
                  placeholder="75 kg"
                />
              </motion.div>

              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="gender">Gender</Label>
                <Input
                  id="gender"
                  name="gender"
                  value={patientDetails.gender}
                  onChange={handlePatientDetailsChange}
                  placeholder="Male/Female/Other"
                />
              </motion.div>

              <motion.div className="flex justify-end" variants={itemVariants}>
                <MotionButton
                  onClick={() => setActiveTab("health-condition")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next
                </MotionButton>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="health-condition" className="space-y-4 mt-4">
            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <MotionCard
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                >
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <Label htmlFor="disease">Diseases</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="disease"
                          value={currentInput.disease}
                          onChange={(e) =>
                            handleCurrentInputChange(e, "disease")
                          }
                          placeholder="Enter disease"
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleAddItem("diseases")
                          }
                        />
                        <MotionButton
                          variant="outline"
                          onClick={() => handleAddItem("diseases")}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Add
                        </MotionButton>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <AnimatePresence>
                          {healthCondition.diseases.map((disease, index) => (
                            <MotionBadge
                              key={`disease-${index}`}
                              className="px-3 py-1 flex items-center"
                              variants={badgeVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              layout
                            >
                              <span>{disease}</span>
                              <motion.div
                                className="ml-1 cursor-pointer flex items-center justify-center"
                                onClick={() =>
                                  handleRemoveItem("diseases", index)
                                }
                                whileHover={{ scale: 1.2 }}
                              >
                                <X className="h-3 w-3" />
                              </motion.div>
                            </MotionBadge>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  </CardContent>
                </MotionCard>
              </motion.div>

              <motion.div variants={itemVariants}>
                <MotionCard
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                    delay: 0.1,
                  }}
                >
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <Label htmlFor="allergy">Allergies</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="allergy"
                          value={currentInput.allergy}
                          onChange={(e) =>
                            handleCurrentInputChange(e, "allergy")
                          }
                          placeholder="Enter allergy"
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleAddItem("allergies")
                          }
                        />
                        <MotionButton
                          variant="outline"
                          onClick={() => handleAddItem("allergies")}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Add
                        </MotionButton>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <AnimatePresence>
                          {healthCondition.allergies.map((allergy, index) => (
                            <MotionBadge
                              key={`allergy-${index}`}
                              className="px-3 py-1 flex items-center"
                              variants={badgeVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              layout
                            >
                              <span>{allergy}</span>
                              <motion.div
                                className="ml-1 cursor-pointer flex items-center justify-center"
                                onClick={() =>
                                  handleRemoveItem("allergies", index)
                                }
                                whileHover={{ scale: 1.2 }}
                              >
                                <X className="h-3 w-3" />
                              </motion.div>
                            </MotionBadge>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  </CardContent>
                </MotionCard>
              </motion.div>

              <motion.div variants={itemVariants}>
                <MotionCard
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                    delay: 0.2,
                  }}
                >
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <Label htmlFor="injury">Current Injuries</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="injury"
                          value={currentInput.injury}
                          onChange={(e) =>
                            handleCurrentInputChange(e, "injury")
                          }
                          placeholder="Enter current injury"
                          onKeyDown={(e) =>
                            e.key === "Enter" &&
                            handleAddItem("currentInjuries")
                          }
                        />
                        <MotionButton
                          variant="outline"
                          onClick={() => handleAddItem("currentInjuries")}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Add
                        </MotionButton>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <AnimatePresence>
                          {healthCondition.currentInjuries.map(
                            (injury, index) => (
                              <MotionBadge
                                key={`injury-${index}`}
                                className="px-3 py-1 flex items-center"
                                variants={badgeVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                layout
                              >
                                <span>{injury}</span>
                                <motion.div
                                  className="ml-1 cursor-pointer flex items-center justify-center"
                                  onClick={() =>
                                    handleRemoveItem("currentInjuries", index)
                                  }
                                  whileHover={{ scale: 1.2 }}
                                >
                                  <X className="h-3 w-3" />
                                </motion.div>
                              </MotionBadge>
                            )
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </CardContent>
                </MotionCard>
              </motion.div>

              <motion.div variants={itemVariants}>
                <MotionCard
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                    delay: 0.3,
                  }}
                >
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <Label htmlFor="medication">Current Medications</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="medication"
                          value={currentInput.medication}
                          onChange={(e) =>
                            handleCurrentInputChange(e, "medication")
                          }
                          placeholder="Enter medication"
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleAddItem("medications")
                          }
                        />
                        <MotionButton
                          variant="outline"
                          onClick={() => handleAddItem("medications")}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Add
                        </MotionButton>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <AnimatePresence>
                          {healthCondition.medications.map(
                            (medication, index) => (
                              <MotionBadge
                                key={`medication-${index}`}
                                className="px-3 py-1 flex items-center"
                                variants={badgeVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                layout
                              >
                                <span>{medication}</span>
                                <motion.div
                                  className="ml-1 cursor-pointer flex items-center justify-center"
                                  onClick={() =>
                                    handleRemoveItem("medications", index)
                                  }
                                  whileHover={{ scale: 1.2 }}
                                >
                                  <X className="h-3 w-3" />
                                </motion.div>
                              </MotionBadge>
                            )
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </CardContent>
                </MotionCard>
              </motion.div>

              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={healthCondition.notes}
                  onChange={(e) =>
                    setHealthCondition((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                  placeholder="Enter any additional notes about the patient's health"
                  rows={3}
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="flex justify-between"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <MotionButton
                variant="outline"
                onClick={() => setActiveTab("patient-details")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back
              </MotionButton>
              <MotionButton
                onClick={handleSubmit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Submit
              </MotionButton>
            </motion.div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default PatientHealthModal;
