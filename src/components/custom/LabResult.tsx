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

      <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border">
        <div className="flex justify-between items-start">
          <div>
            <motion.h1
              className="text-xl font-bold text-foreground"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Timeline
            </motion.h1>
            <motion.p
              className="text-xs text-muted-foreground mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              View Your old visited doctor entry
            </motion.p>
          </div>
          <div className="flex items-center space-x-1">
            <motion.button
              className="p-2 bg-primary text-primary-foreground rounded-full shadow-sm hover:bg-primary/90 transition-colors flex justify-center items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Add form
            </motion.button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 pt-3 pb-2 border-b border-border">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search diseases, hospitals, medicines..."
            className="w-full py-2 pl-3 pr-10 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-sm placeholder:text-muted-foreground"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className="absolute right-3 top-2 text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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

        {/* Filter toggle */}
        <div className="flex justify-between items-center mt-2">
          <button
            className="flex items-center text-sm text-primary cursor-pointer hover:text-primary/80 transition-colors"
            onClick={() => setFiltersVisible(!filtersVisible)}
          >
            <Filter className="w-3 h-3 mr-1" />
            {filtersVisible ? "Hide filters" : "Show filters"}
          </button>

          {filteredAndSortedResults.length > 0 && (
            <p className="text-xs text-muted-foreground">
              {filteredAndSortedResults.length} result
              {filteredAndSortedResults.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {/* Collapsible filters */}
        <AnimatePresence>
          {filtersVisible && (
            <motion.div
              className="mt-2 overflow-x-auto pb-1 flex items-center"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex space-x-1 w-full">
                <button
                  className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                    selectedFilter === "all"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                  onClick={() => setSelectedFilter("all")}
                >
                  All
                </button>
                <button
                  className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                    selectedFilter === "normal"
                      ? "bg-green-500 text-white"
                      : "bg-green-100 text-green-600 hover:bg-green-200"
                  }`}
                  onClick={() => setSelectedFilter("normal")}
                >
                  Normal
                </button>
                <button
                  className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                    selectedFilter === "abnormal"
                      ? "bg-yellow-500 text-white"
                      : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                  }`}
                  onClick={() => setSelectedFilter("abnormal")}
                >
                  Abnormal
                </button>
                <button
                  className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                    selectedFilter === "low"
                      ? "bg-yellow-500 text-white"
                      : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                  }`}
                  onClick={() => setSelectedFilter("low")}
                >
                  Piles
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Timeline container */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="relative">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-8 h-8 border-t-2 border-b-2 border-primary rounded-full animate-spin mb-3"></div>
              <p className="text-sm text-muted-foreground">Loading timeline data...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="bg-destructive/10 p-3 rounded-full mb-3">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-base font-medium text-foreground">Error</h3>
              <p className="text-xs text-muted-foreground mt-1 text-center">{error}</p>
              <button
                className="mt-3 px-3 py-1.5 bg-primary text-primary-foreground text-sm rounded-md hover:bg-primary/90 transition-colors"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          ) : filteredAndSortedResults.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="bg-muted p-3 rounded-full mb-3">
                <AlertCircle className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="text-base font-medium text-foreground">
                No matching results
              </h3>
              <p className="text-xs text-muted-foreground mt-1 text-center">
                Try adjusting your filters or search
              </p>
              <button
                className="mt-3 px-3 py-1.5 bg-primary text-primary-foreground text-sm rounded-md hover:bg-primary/90 transition-colors"
                onClick={() => {
                  setSelectedFilter("all");
                  setSearchText("");
                }}
              >
                Reset filters
              </button>
            </div>
          ) : (
            <>
              <div className="absolute left-8 top-6 bottom-0 w-0.5 bg-border" />

              {filteredAndSortedResults.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative ${index !== 0 ? "mt-8" : ""}`}
                >
                  <div className="absolute left-0 top-6 flex flex-col items-center">
                    <div className="text-xs font-medium text-muted-foreground w-4">
                      {formatMonth(entry.date_from)}
                    </div>
                    <motion.div
                      className={`mt-1 h-6 w-6 rounded-full flex items-center justify-center z-10 ${
                        entry.disease.toLowerCase() === "normal"
                          ? "bg-green-500"
                          : entry.disease.toLowerCase() === "piles"
                          ? "bg-yellow-500"
                          : "bg-primary"
                      }`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.1 + index * 0.1,
                      }}
                      whileHover={{ scale: 1.1 }}
                    />
                  </div>

                  <motion.div
                    className="ml-12 bg-card rounded-lg shadow-sm border border-border overflow-hidden transition-all"
                    whileHover={{
                      scale: 1.01,
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                      transition: { duration: 0.3 },
                    }}
                  >
                    <div
                      className="p-3 cursor-pointer"
                      onClick={() => toggleExpand(entry.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="font-semibold text-foreground text-sm">
                              {entry.hospital}
                            </h3>
                            <motion.div
                              animate={{
                                rotate: expandedResult === entry.id ? 90 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                              className="ml-1"
                            >
                              <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            </motion.div>
                          </div>

                          <div className="flex items-center mt-1 text-xs">
                            <div className="flex items-center text-muted-foreground">
                              <Calendar className="w-3 h-3 mr-1" />
                              <span>
                                {formatDate(entry.date_from)} -{" "}
                                {formatDate(entry.date_to)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <motion.div
                          className={`px-2 py-1 rounded-full text-xs font-medium ml-2 ${getStatusBgColor(
                            entry.disease
                          )} ${getStatusColor(
                            entry.disease
                          )} flex items-center`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        >
                          {getStatusIcon(entry.disease)}
                          <span className="ml-1">{entry.disease}</span>
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
                          className="border-t border-border bg-accent/30 overflow-hidden"
                        >
                          <div className="p-3">
                            <div className="bg-card rounded-lg shadow-sm overflow-hidden">
                              <div className="grid grid-cols-12 text-xs font-medium text-muted-foreground p-2 border-b border-border bg-muted">
                                <div className="col-span-4">Detail</div>
                                <div className="col-span-8 text-left">
                                  Information
                                </div>
                              </div>

                              <div className="divide-y divide-border">
                                <motion.div
                                  className="grid grid-cols-12 text-xs p-2"
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.1 }}
                                >
                                  <div className="col-span-4 font-medium text-foreground">
                                    Hospital
                                  </div>
                                  <div className="col-span-8 text-left text-foreground">
                                    {entry.hospital}
                                  </div>
                                </motion.div>

                                <motion.div
                                  className="grid grid-cols-12 text-xs p-2"
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.15 }}
                                >
                                  <div className="col-span-4 font-medium text-foreground">
                                    Disease
                                  </div>
                                  <div className="col-span-8 text-left">
                                    <span
                                      className={`font-medium px-1.5 py-0.5 rounded ${getStatusBgColor(
                                        entry.disease
                                      )} ${getStatusColor(entry.disease)}`}
                                    >
                                      {entry.disease}
                                    </span>
                                  </div>
                                </motion.div>

                                <motion.div
                                  className="grid grid-cols-12 text-xs p-2"
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.2 }}
                                >
                                  <div className="col-span-4 font-medium text-foreground">
                                    Medicine
                                  </div>
                                  <div className="col-span-8 text-left text-foreground">
                                    {entry.medicine}
                                  </div>
                                </motion.div>

                                <motion.div
                                  className="grid grid-cols-12 text-xs p-2"
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.25 }}
                                >
                                  <div className="col-span-4 font-medium text-foreground">
                                    Period
                                  </div>
                                  <div className="col-span-8 text-left text-foreground">
                                    {formatDate(entry.date_from)} -{" "}
                                    {formatDate(entry.date_to)}
                                  </div>
                                </motion.div>

                                {/* Replace the existing image display code with this improved version */}
                                {entry.image && (
                                  <motion.div
                                    className="p-2"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                  >
                                    <div className="font-medium text-foreground mb-2 text-xs">
                                      Attachment
                                    </div>
                                    <div className="bg-muted rounded-lg p-2 border border-border">
                                      <div className="flex items-center justify-center gap-3">
                                        <motion.button
                                          className="px-4 py-2 text-sm bg-primary rounded-md text-primary-foreground hover:bg-primary/90 transition-colors flex items-center"
                                          whileHover={{ scale: 1.05 }}
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
                                          className="px-4 py-2 text-sm bg-primary rounded-md text-primary-foreground hover:bg-primary/90 transition-colors flex items-center"
                                          whileHover={{ scale: 1.05 }}
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
                                          <Waves className="w-3 h-3 mr-1" />
                                          Details
                                        </motion.button>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </div>
                            </div>

                            <div className="flex justify-end mt-3 space-x-2"></div>
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
    </>
  );
};

export default LabResultsTimeline;
