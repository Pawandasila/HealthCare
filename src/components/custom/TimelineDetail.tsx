import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Calendar, User, Hospital, FileText, PlusCircle, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { format } from "date-fns";

interface EntryDetails {
  hospital: string;
  date_from: string;
  date_to: string;
  disease: string;
  user: string;
  medicine: string;
  image?: string;
  description?: string; // Add this field to accept markdown content directly
}

interface TimelineDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  entryId: string | null;
  entryDetails?: EntryDetails; // Add this optional prop to pass details directly
}

const TimelineDetailsModal: React.FC<TimelineDetailsModalProps> = ({ 
  isOpen, 
  onClose, 
  entryId,
  entryDetails: initialEntryDetails 
}) => {
  const [markdownData, setMarkdownData] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [entryDetails, setEntryDetails] = useState<EntryDetails | null>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (initialEntryDetails) {
        // If entry details are passed directly as a prop
        setEntryDetails(initialEntryDetails);
        if (initialEntryDetails.description) {
          setMarkdownData(initialEntryDetails.description);
        }
        setIsLoading(false);
        setError(null);
      } else if (entryId) {
        // Otherwise fetch from API
        fetchEntryDetails(entryId);
      }
    }
  }, [isOpen, entryId, initialEntryDetails]);

  const fetchEntryDetails = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/timeline/details/${id}`);
      
      if (!response.ok) {
        throw new Error("Failed to load details");
      }
      
      const data = await response.json();
      setEntryDetails(data.entry);

      if (data.entry.description) {
        // If description is included in the response
        setMarkdownData(data.entry.description);
      } else if (data.entry.markdownUrl) {
        // If we need to fetch the markdown content from a URL
        const markdownResponse = await fetch(data.entry.markdownUrl);
        if (!markdownResponse.ok) {
          throw new Error("Failed to load markdown content");
        }
        const markdownContent = await markdownResponse.text();
        setMarkdownData(markdownContent);
      }

      setError(null);
    } catch (err) {
      console.error("Error fetching details:", err);
      setError("Failed to load details. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const getSeverityColor = (severity: string) => {
    if (!severity) return "bg-gray-100 text-gray-700";
    
    const severityLower = severity.toLowerCase();
    if (severityLower === "normal") return "bg-green-100 text-green-700";
    if (severityLower === "piles" || severityLower.includes("low")) return "bg-yellow-100 text-yellow-700";
    if (severityLower === "high" || severityLower.includes("critical")) return "bg-red-100 text-red-700";
    return "bg-blue-100 text-blue-700";
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          
          <motion.div
            className="w-full max-w-6xl max-h-[90vh] bg-card rounded-2xl shadow-2xl relative z-10 flex flex-col border border-border overflow-hidden modal-scroll-container"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-border bg-primary text-primary-foreground rounded-t-2xl flex-shrink-0">
              <h2 className="text-lg font-semibold">Patient Details</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-primary/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal content - Scrollable */}
            <div className="flex-1 overflow-y-auto custom-scrollbar" style={{ maxHeight: 'calc(90vh - 200px)' }}>
              <div className="p-6">
                {isLoading ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-8 h-8 border-t-2 border-b-2 border-primary rounded-full animate-spin mb-3"></div>
                  <p className="text-sm text-muted-foreground">Loading details...</p>
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
                    onClick={() => entryId && fetchEntryDetails(entryId)}
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <>
                {/* Two-column layout */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {/* Left Column - Patient Information */}
                  <div className="space-y-6">
                    {/* Entry summary section */}
                    {entryDetails && (
                      <div className="bg-accent/30 rounded-xl p-6 border border-border">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex-1">
                            <h3 className="font-bold text-2xl text-foreground mb-2">{entryDetails.hospital}</h3>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="w-5 h-5 mr-2" />
                              <span className="font-medium">
                                {format(new Date(entryDetails.date_from), "MMM d, yyyy")} - {format(new Date(entryDetails.date_to), "MMM d, yyyy")}
                              </span>
                            </div>
                          </div>
                          
                          <div className={`px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${getSeverityColor(entryDetails.disease)}`}>
                            {entryDetails.disease}
                          </div>
                        </div>
                        
                        {/* Patient info cards */}
                        <div className="grid grid-cols-1 gap-4">
                          <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                            <div className="flex items-center text-foreground">
                              <User className="w-6 h-6 mr-4 text-primary" />
                              <div>
                                <span className="font-semibold text-sm text-muted-foreground block">Patient ID</span>
                                <span className="text-xl font-bold text-foreground">{entryDetails.user}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                            <div className="flex items-center text-foreground">
                              <Hospital className="w-6 h-6 mr-4 text-green-500" />
                              <div>
                                <span className="font-semibold text-sm text-muted-foreground block">Treatment/Medicine</span>
                                <span className="text-xl font-bold text-foreground">{entryDetails.medicine}</span>
                              </div>
                            </div>
                          </div>

                          {entryDetails.image ? (
                            <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <FileText className="w-6 h-6 mr-4 text-purple-500" />
                                  <div>
                                    <span className="font-semibold text-sm text-muted-foreground block">Medical Attachment</span>
                                    <span className="text-sm text-foreground">Download medical record</span>
                                  </div>
                                </div>
                                <button
                                  className="bg-primary hover:bg-primary/90 text-primary-foreground py-2 px-4 rounded-lg flex items-center transition-colors shadow-sm"
                                  onClick={() => window.open(`http://192.168.225.187:8000${entryDetails.image}`, "_blank")}
                                >
                                  <Download className="w-4 h-4 mr-2" /> 
                                  <span className="text-sm">Download</span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-card p-6 rounded-lg border border-border shadow-sm opacity-50">
                              <div className="flex items-center">
                                <FileText className="w-6 h-6 mr-4 text-muted-foreground" />
                                <div>
                                  <span className="font-semibold text-sm text-muted-foreground block">Medical Attachment</span>
                                  <span className="text-sm text-muted-foreground">No files attached</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Right Column - Medical Report */}
                  <div className="space-y-6">
                    <div className="bg-card rounded-xl border border-border p-6 shadow-sm h-full">
                      <div className="flex items-center justify-between mb-6 pb-3 border-b border-border">
                        <h3 className="text-foreground font-bold text-xl flex items-center">
                          <FileText className="w-6 h-6 mr-3 text-primary" />
                          Detailed Medical Report
                        </h3>
                      </div>
                      
                      {markdownData ? (
                        <div className="prose prose-blue max-w-none prose-lg overflow-y-auto custom-scrollbar" style={{ maxHeight: '60vh' }}>
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {markdownData}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <div className="text-center py-16">
                          <div className="bg-muted rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                            <FileText className="w-10 h-10 text-muted-foreground" />
                          </div>
                          <p className="text-muted-foreground text-xl font-medium mb-2">No detailed report available</p>
                          <p className="text-muted-foreground text-sm">Check back later for updates</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                </>
              )}
            </div>
            </div>

            {/* Modal footer */}
            <div className="border-t border-border p-6 flex justify-between items-center bg-muted rounded-b-2xl flex-shrink-0">
              <div className="flex items-center space-x-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-accent transition-all"
                >
                  Close
                </button>
                
                <button
                  className="px-6 py-2.5 bg-secondary hover:bg-secondary/90 text-secondary-foreground text-sm font-medium rounded-lg transition-all flex items-center shadow-lg"
                  onClick={() => window.print()}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Print Report
                </button>
              </div>
              
              <button
                className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium rounded-lg transition-all flex items-center shadow-lg"
                onClick={() => alert("Add notes functionality would be implemented here")}
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Clinical Notes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TimelineDetailsModal;