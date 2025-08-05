import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import {
  Calendar,
  ChevronRight,
  AlertCircle,
  Check,
  Download,
  Filter,
  Plus,
  Waves,
} from "lucide-react";
import { format } from "date-fns";
import useAxios from "@/app/hooks/UseAxios";
import TimelineModal from "./TimelineModel";
import TimelineDetailsModal from "./TimelineDetail";

interface TimelineEntry {
  id: number;
  date_from: string;
  date_to: string;
  hospital: string;
  disease: string;
  medicine: string;
  image: string;
  user: number;
  description: string;
}

const LabResultsTimeline: React.FC = () => {
  const [expandedResult, setExpandedResult] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchText, setSearchText] = useState<string>("");
  const [filtersVisible, setFiltersVisible] = useState<boolean>(false);
  const api = useAxios();
  const [timelineData, setTimelineData] = useState<TimelineEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState<boolean>(false);
//   const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [selectedEntryDetails, setSelectedEntryDetails] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/timeline");
        if (response.data) {
          setTimelineData(response.data);
        } else {
          setTimelineData([]);
        }
        setError(null);
      } catch (error) {
        console.error("Error fetching timeline data:", error);
        setError("Failed to load timeline data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredAndSortedResults = useMemo(() => {
    let filtered = [...timelineData];

    if (selectedFilter !== "all") {
      filtered = filtered.filter((entry) => {
        const diseaseLower = entry.disease.toLowerCase();
        return selectedFilter === "normal"
          ? diseaseLower === "normal"
          : selectedFilter === "abnormal"
          ? diseaseLower === "abnormal"
          : selectedFilter === "low"
          ? diseaseLower === "piles" || diseaseLower.includes("low")
          : diseaseLower;
      });
    }

    if (searchText) {
      const lowerSearchText = searchText.toLowerCase();
      filtered = filtered.filter(
        (entry) =>
          entry.disease.toLowerCase().includes(lowerSearchText) ||
          entry.hospital.toLowerCase().includes(lowerSearchText) ||
          entry.medicine.toLowerCase().includes(lowerSearchText)
      );
    }

    return filtered.sort(
      (a, b) =>
        new Date(b.date_from).getTime() - new Date(a.date_from).getTime()
    );
  }, [timelineData, selectedFilter, searchText]);

  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy");
  };

  // Format month for timeline
  const formatMonth = (dateString: string): string => {
    const date = new Date(dateString);
    return format(date, "MMM");
  };

  // Toggle expanded result
  const toggleExpand = (id: number) => {
    setExpandedResult(expandedResult === id ? null : id);
  };

  // Get status color based on disease
  const getStatusColor = (disease: string): string => {
    const diseaseLower = disease.toLowerCase();
    if (diseaseLower === "normal") return "text-green-600";
    if (diseaseLower === "piles" || diseaseLower.includes("low"))
      return "text-yellow-600";
    if (diseaseLower.includes("high") || diseaseLower.includes("critical"))
      return "text-red-600";
    return "text-gray-600";
  };

  // Get background color based on disease
  const getStatusBgColor = (disease: string): string => {
    const diseaseLower = disease.toLowerCase();
    if (diseaseLower === "normal") return "bg-green-100";
    if (diseaseLower === "piles" || diseaseLower.includes("low"))
      return "bg-yellow-100";
    if (diseaseLower.includes("high") || diseaseLower.includes("critical"))
      return "bg-red-100";
    return "bg-gray-100";
  };

  // Get icon based on disease
  const getStatusIcon = (disease: string) => {
    const diseaseLower = disease.toLowerCase();
    if (diseaseLower === "normal")
      return <Check className="w-4 h-4 text-green-600" />;
    if (diseaseLower === "piles" || diseaseLower.includes("low"))
      return <AlertCircle className="w-4 h-4 text-yellow-600" />;
    if (diseaseLower.includes("high") || diseaseLower.includes("critical"))
      return <AlertCircle className="w-4 h-4 text-red-600" />;
    return <AlertCircle className="w-4 h-4 text-gray-600" />;
  };

  const fetchTimelineData = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/timeline");
      console.log(response);
      if (response.data) {
        setTimelineData(response.data);
      } else {
        setTimelineData([]);
      }
      setError(null);
    } catch (error) {
      console.error("Error fetching timeline data:", error);
      setError("Failed to load timeline data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSuccess = () => {
    fetchTimelineData();
  };

  useEffect(() => {
    fetchTimelineData();
  }, []);

  return (
    <>
      {/* Render modals using portals to escape container constraints */}
      {typeof window !== "undefined" && createPortal(
        <TimelineModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleFormSuccess}
        />,
        document.body
      )}

      {typeof window !== "undefined" && createPortal(
        <TimelineDetailsModal
          isOpen={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          entryId={null}
          entryDetails={selectedEntryDetails}
        />,
        document.body
      )}

      {/* Main Timeline Container with modern card design */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="border-border bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden relative rounded-3xl border">
          {/* Gradient accent and decorative elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary/60 via-primary/70 to-primary/80 shadow-lg"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/8 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary/5 to-transparent rounded-full translate-y-16 -translate-x-16"></div>
          
          <div className="h-full flex flex-col relative z-10">
            {/* Enhanced Header */}
            <div className="px-8 py-6 border-b border-border/50">
              <div className="flex justify-between items-start">
                <div>
                  <motion.h1
                    className="text-3xl font-bold heading-maya bg-gradient-to-r from-foreground via-foreground to-foreground bg-clip-text text-transparent mb-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    Medical Timeline
                  </motion.h1>
                  <motion.p
                    className="text-muted-foreground text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    View your medical history and doctor visits
                  </motion.p>
                </div>
                <div className="flex items-center space-x-3">
                  <motion.button
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-xl shadow-lg hover:bg-primary/90 transition-all font-semibold flex items-center gap-2 hover:shadow-primary/25"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsModalOpen(true)}
                  >
                    <Plus className="w-5 h-5" />
                    Add Entry
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Enhanced Search Section */}
            <div className="px-8 pt-6 pb-4 border-b border-border/50">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search diseases, hospitals, medicines..."
                  className="w-full py-4 pl-6 pr-12 rounded-2xl border border-border bg-card/50 backdrop-blur-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-base placeholder:text-muted-foreground shadow-sm"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <div className="absolute right-4 top-4 text-muted-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Enhanced Filter toggle */}
              <div className="flex justify-between items-center mt-4">
                <motion.button
                  className="flex items-center text-base text-primary cursor-pointer hover:text-primary/80 transition-colors font-medium"
                  onClick={() => setFiltersVisible(!filtersVisible)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {filtersVisible ? "Hide filters" : "Show filters"}
                </motion.button>

                {filteredAndSortedResults.length > 0 && (
                  <p className="text-sm text-muted-foreground font-medium">
                    {filteredAndSortedResults.length} result
                    {filteredAndSortedResults.length !== 1 ? "s" : ""} found
                  </p>
                )}
              </div>

              {/* Enhanced Collapsible filters */}
              <AnimatePresence>
                {filtersVisible && (
                  <motion.div
                    className="mt-4 overflow-x-auto pb-2"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex space-x-3 w-full">
                      <motion.button
                        className={`px-4 py-2 text-sm font-semibold rounded-xl whitespace-nowrap transition-all ${
                          selectedFilter === "all"
                            ? "bg-primary text-primary-foreground shadow-lg"
                            : "bg-card/60 backdrop-blur-xl text-muted-foreground hover:bg-card/80 border border-border"
                        }`}
                        onClick={() => setSelectedFilter("all")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        All Results
                      </motion.button>
                      <motion.button
                        className={`px-4 py-2 text-sm font-semibold rounded-xl whitespace-nowrap transition-all ${
                          selectedFilter === "normal"
                            ? "bg-green-500 text-white shadow-lg"
                            : "bg-green-100 text-green-600 hover:bg-green-200 border border-green-200"
                        }`}
                        onClick={() => setSelectedFilter("normal")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Normal
                      </motion.button>
                      <motion.button
                        className={`px-4 py-2 text-sm font-semibold rounded-xl whitespace-nowrap transition-all ${
                          selectedFilter === "abnormal"
                            ? "bg-yellow-500 text-white shadow-lg"
                            : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200 border border-yellow-200"
                        }`}
                        onClick={() => setSelectedFilter("abnormal")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Abnormal
                      </motion.button>
                      <motion.button
                        className={`px-4 py-2 text-sm font-semibold rounded-xl whitespace-nowrap transition-all ${
                          selectedFilter === "low"
                            ? "bg-yellow-500 text-white shadow-lg"
                            : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200 border border-yellow-200"
                        }`}
                        onClick={() => setSelectedFilter("low")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Piles
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Enhanced Timeline container */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              <div className="relative">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <motion.div 
                      className="w-12 h-12 border-t-2 border-b-2 border-primary rounded-full animate-spin mb-4"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <p className="text-base text-muted-foreground font-medium">Loading timeline data...</p>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="bg-destructive/10 p-4 rounded-2xl mb-4">
                      <AlertCircle className="w-8 h-8 text-destructive" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Error Loading Data</h3>
                    <p className="text-base text-muted-foreground mb-4 text-center max-w-md">{error}</p>
                    <motion.button
                      className="px-6 py-3 bg-primary text-primary-foreground text-base rounded-xl hover:bg-primary/90 transition-colors shadow-lg"
                      onClick={() => window.location.reload()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Retry
                    </motion.button>
                  </div>
                ) : filteredAndSortedResults.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="bg-muted/50 p-4 rounded-2xl mb-4">
                      <AlertCircle className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      No matching results
                    </h3>
                    <p className="text-base text-muted-foreground mb-4 text-center max-w-md">
                      Try adjusting your filters or search criteria
                    </p>
                    <motion.button
                      className="px-6 py-3 bg-primary text-primary-foreground text-base rounded-xl hover:bg-primary/90 transition-colors shadow-lg"
                      onClick={() => {
                        setSelectedFilter("all");
                        setSearchText("");
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Reset filters
                    </motion.button>
                  </div>
                ) : (
                  <>
                    {/* Enhanced Timeline Line */}
                    <div className="absolute left-10 top-8 bottom-0 w-0.5 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/20" />

                    {filteredAndSortedResults.map((entry, index) => (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className={`relative ${index !== 0 ? "mt-8" : ""}`}
                      >
                        {/* Enhanced Timeline Dot */}
                        <div className="absolute left-0 top-8 flex flex-col items-center">
                          <div className="text-sm font-bold text-muted-foreground mb-2 w-6 text-center">
                            {formatMonth(entry.date_from)}
                          </div>
                          <motion.div
                            className={`h-8 w-8 rounded-full flex items-center justify-center z-10 shadow-lg border-4 border-card ${
                              entry.disease.toLowerCase() === "normal"
                                ? "bg-green-500"
                                : entry.disease.toLowerCase() === "piles"
                                ? "bg-yellow-500"
                                : "bg-primary"
                            }`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              duration: 0.4,
                              delay: 0.2 + index * 0.1,
                              type: "spring",
                              stiffness: 200,
                            }}
                            whileHover={{ scale: 1.2 }}
                          />
                        </div>

                        {/* Enhanced Timeline Card */}
                        <motion.div
                          className="ml-16 bg-card/80 backdrop-blur-xl rounded-2xl shadow-lg border border-border overflow-hidden transition-all duration-300"
                          whileHover={{
                            scale: 1.02,
                            y: -4,
                            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                            transition: { duration: 0.3 },
                          }}
                        >
                          <div
                            className="p-6 cursor-pointer"
                            onClick={() => toggleExpand(entry.id)}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center mb-3">
                                  <h3 className="font-bold text-foreground text-lg">
                                    {entry.hospital}
                                  </h3>
                                  <motion.div
                                    animate={{
                                      rotate: expandedResult === entry.id ? 90 : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="ml-2"
                                  >
                                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                  </motion.div>
                                </div>

                                <div className="flex items-center text-sm mb-2">
                                  <div className="flex items-center text-muted-foreground">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <span className="font-medium">
                                      {formatDate(entry.date_from)} -{" "}
                                      {formatDate(entry.date_to)}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <motion.div
                                className={`px-4 py-2 rounded-xl text-sm font-bold ml-4 ${getStatusBgColor(
                                  entry.disease
                                )} ${getStatusColor(
                                  entry.disease
                                )} flex items-center shadow-sm`}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 500,
                                  damping: 30,
                                }}
                              >
                                {getStatusIcon(entry.disease)}
                                <span className="ml-2">{entry.disease}</span>
                              </motion.div>
                            </div>
                          </div>

                          <AnimatePresence>
                            {expandedResult === entry.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  height: {
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 30,
                                  },
                                  opacity: {
                                    duration: 0.3,
                                  },
                                }}
                                className="border-t border-border/50 bg-card/30 backdrop-blur-xl overflow-hidden"
                              >
                                <div className="p-6">
                                  <div className="bg-card/60 backdrop-blur-xl rounded-xl shadow-sm overflow-hidden border border-border/50">
                                    <div className="grid grid-cols-12 text-sm font-bold text-card-foreground p-4 border-b border-border/50 bg-card/40">
                                      <div className="col-span-4">Detail</div>
                                      <div className="col-span-8 text-left">
                                        Information
                                      </div>
                                    </div>

                                    <div className="divide-y divide-border/50">
                                      <motion.div
                                        className="grid grid-cols-12 text-sm p-4"
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                      >
                                        <div className="col-span-4 font-semibold text-foreground">
                                          Hospital
                                        </div>
                                        <div className="col-span-8 text-left text-foreground">
                                          {entry.hospital}
                                        </div>
                                      </motion.div>

                                      <motion.div
                                        className="grid grid-cols-12 text-sm p-4"
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15 }}
                                      >
                                        <div className="col-span-4 font-semibold text-foreground">
                                          Disease
                                        </div>
                                        <div className="col-span-8 text-left">
                                          <span
                                            className={`font-semibold px-3 py-1 rounded-lg ${getStatusBgColor(
                                              entry.disease
                                            )} ${getStatusColor(entry.disease)}`}
                                          >
                                            {entry.disease}
                                          </span>
                                        </div>
                                      </motion.div>

                                      <motion.div
                                        className="grid grid-cols-12 text-sm p-4"
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                      >
                                        <div className="col-span-4 font-semibold text-foreground">
                                          Medicine
                                        </div>
                                        <div className="col-span-8 text-left text-foreground">
                                          {entry.medicine}
                                        </div>
                                      </motion.div>

                                      <motion.div
                                        className="grid grid-cols-12 text-sm p-4"
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.25 }}
                                      >
                                        <div className="col-span-4 font-semibold text-foreground">
                                          Period
                                        </div>
                                        <div className="col-span-8 text-left text-foreground">
                                          {formatDate(entry.date_from)} -{" "}
                                          {formatDate(entry.date_to)}
                                        </div>
                                      </motion.div>

                                      {/* Enhanced attachment section */}
                                      {entry.image && (
                                        <motion.div
                                          className="p-4"
                                          initial={{ opacity: 0, y: 5 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.3 }}
                                        >
                                          <div className="font-semibold text-foreground mb-3 text-sm">
                                            Attachment
                                          </div>
                                          <div className="bg-card/40 backdrop-blur-xl rounded-xl p-4 border border-border/50">
                                            <div className="flex items-center justify-center gap-4">
                                              <motion.button
                                                className="px-6 py-3 text-sm bg-primary rounded-xl text-primary-foreground hover:bg-primary/90 transition-all font-semibold flex items-center shadow-lg"
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() =>
                                                  window.open(
                                                    `http://192.168.225.187:8000${entry.image}`,
                                                    "_blank"
                                                  )
                                                }
                                              >
                                                <Download className="w-4 h-4 mr-2" />
                                                View Image
                                              </motion.button>

                                              <motion.button
                                                className="px-6 py-3 text-sm bg-primary rounded-xl text-primary-foreground hover:bg-primary/90 transition-all font-semibold flex items-center shadow-lg"
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => {
                                                  setSelectedEntryDetails({
                                                    hospital: entry.hospital,
                                                    date_from: entry.date_from,
                                                    date_to: entry.date_to,
                                                    disease: entry.disease,
                                                    user: entry.user.toString(),
                                                    medicine: entry.medicine,
                                                    image: entry.image,
                                                    description: entry.description,
                                                  });
                                                  setDetailModalOpen(true);
                                                }}
                                              >
                                                <Waves className="w-4 h-4 mr-2" />
                                                View Details
                                              </motion.button>
                                            </div>
                                          </div>
                                        </motion.div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </motion.div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default LabResultsTimeline;
