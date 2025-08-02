import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Calendar } from "lucide-react";
import { format } from "date-fns";
import useAxios from "@/app/hooks/UseAxios";
import { Button } from "../ui/button";

interface TimelineFormData {
  date_from: string;
  date_to: string;
  hospital: string;
  disease: string;
  medicine: string;
  image: File | null;
  description: string;
}

interface TimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const TimelineModal: React.FC<TimelineModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const api = useAxios();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  const [formData, setFormData] = useState<TimelineFormData>({
    date_from: format(new Date(), "yyyy-MM-dd"),
    date_to: format(new Date(), "yyyy-MM-dd"),
    hospital: "",
    disease: "",
    medicine: "",
    image: null,
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("date_from", formData.date_from);
      submitData.append("date_to", formData.date_to);
      submitData.append("hospital", formData.hospital);
      submitData.append("disease", formData.disease);
      submitData.append("medicine", formData.medicine);
      if (formData.image) {
        submitData.append("image", formData.image);
      }

      const response = await api.post("/timeline/", submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201 || response.status === 200) {
        // Reset form
        setFormData({
          date_from: format(new Date(), "yyyy-MM-dd"),
          date_to: format(new Date(), "yyyy-MM-dd"),
          hospital: "",
          disease: "",
          medicine: "",
          image: null,
          description: "",
        });
        setImagePreview(null);
        
        // Close modal and refresh data
        onSuccess();
        onClose();
      } else {
        setError("Failed to save data. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting timeline entry:", err);
      setError("An error occurred while saving your data. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close modal if clicked outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Prevent scroll propagation to background
  const handleScrollableAreaWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          onWheel={(e) => e.preventDefault()}
        >
          <motion.div
            className="bg-card rounded-2xl shadow-2xl w-full max-w-lg max-h-[94vh] border border-border flex flex-col"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            onWheel={handleScrollableAreaWheel}
          >
            {/* Header */}
            <div className="px-6 py-4 bg-primary text-primary-foreground flex justify-between items-center flex-shrink-0 rounded-t-2xl">
              <h3 className="font-semibold text-lg">Add Medical Record</h3>
              <button
                onClick={onClose}
                className="text-primary-foreground hover:bg-primary-foreground/10 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Form - Scrollable Content */}
            <div 
              className="flex-1 overflow-y-auto custom-scrollbar modal-scroll-container scroll-smooth"
              style={{ 
                maxHeight: 'calc(94vh - 140px)'
              }}
              onWheel={handleScrollableAreaWheel}
            >
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="mb-4 p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
                  {error}
                </div>
              )}
              
              <div className="space-y-4">
                {/* Date range */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="date_from" className="block text-sm font-medium text-card-foreground mb-2">
                      From Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="date_from"
                        name="date_from"
                        value={formData.date_from}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-input rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring text-sm bg-background text-foreground"
                        required
                      />
                      <Calendar className="absolute right-3 top-2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="date_to" className="block text-sm font-medium text-card-foreground mb-2">
                      To Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="date_to"
                        name="date_to"
                        value={formData.date_to}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-input rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring text-sm bg-background text-foreground"
                        required
                      />
                      <Calendar className="absolute right-3 top-2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>
                
                {/* Hospital */}
                <div>
                  <label htmlFor="hospital" className="block text-sm font-medium text-card-foreground mb-2">
                    Hospital/Clinic
                  </label>
                  <input
                    type="text"
                    id="hospital"
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleChange}
                    placeholder="Enter hospital or clinic name"
                    className="block w-full px-3 py-2 border border-input rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring text-sm bg-background text-foreground"
                    required
                  />
                </div>
                
                {/* Disease */}
                <div>
                  <label htmlFor="disease" className="block text-sm font-medium text-card-foreground mb-2">
                    Condition
                  </label>
                  <select
                    id="disease"
                    name="disease"
                    value={formData.disease}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-input rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring text-sm bg-background text-foreground"
                    required
                  >
                    <option value="">Select condition</option>
                    <option value="Normal">Normal</option>
                    <option value="Abnormal">Abnormal</option>
                    <option value="Piles">Piles</option>
                    <option value="High Blood Pressure">High Blood Pressure</option>
                    <option value="Low Blood Pressure">Low Blood Pressure</option>
                  </select>
                </div>
                
                {/* Medicine */}
                <div>
                  <label htmlFor="medicine" className="block text-sm font-medium text-card-foreground mb-2">
                    Medicine/Treatment
                  </label>
                  <input
                    type="text"
                    id="medicine"
                    name="medicine"
                    value={formData.medicine}
                    onChange={handleChange}
                    placeholder="Enter prescribed medicines or treatment"
                    className="block w-full px-3 py-2 border border-input rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring text-sm bg-background text-foreground"
                    required
                  />
                </div>
                
                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-card-foreground mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Add additional notes"
                    rows={3}
                    className="block w-full px-3 py-2 border border-input rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring text-sm bg-background text-foreground"
                  />
                </div>
                
                {/* Image upload */}
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Attachment (Optional)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-border rounded-lg bg-muted/50">
                    <div className="space-y-1 text-center">
                      {imagePreview ? (
                        <div className="flex flex-col items-center">
                          <div className="relative w-32 h-32 mb-3">
                            <img 
                              src={imagePreview} 
                              alt="Preview" 
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setImagePreview(null);
                                setFormData(prev => ({ ...prev, image: null }));
                              }}
                              className="absolute -top-2 -right-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-full p-1 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                          <div className="flex text-sm text-muted-foreground">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-background rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none px-2 py-1"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleImageChange}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Form actions */}
              <div className="mt-6 flex items-center justify-end space-x-3 pt-4 border-t border-border bg-card px-6 py-4 flex-shrink-0 rounded-b-2xl">
                <Button
                  type="button"
                  onClick={onClose}
                  variant="outline"
                  className="px-4 py-2 text-sm font-medium"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></span>
                      Saving...
                    </>
                  ) : (
                    "Save Record"
                  )}
                </Button>
              </div>
              </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TimelineModal;