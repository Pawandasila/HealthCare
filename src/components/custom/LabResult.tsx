import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronRight, AlertCircle, Check, Download, Filter, Bell } from 'lucide-react';
import { format } from 'date-fns';

// TypeScript interfaces
interface LabDetail {
  name: string;
  value: string;
  unit: string;
  reference: string;
}

interface LabResult {
  id: number;
  testName: string;
  date: string;
  status: "Completed" | "Pending" | "Processing";
  result: "Normal" | "Abnormal" | "Low" | "High" | "Critical";
  details: LabDetail[];
}

const LabResultsTimeline: React.FC = () => {
  const [expandedResult, setExpandedResult] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchText, setSearchText] = useState<string>("");
  const [filtersVisible, setFiltersVisible] = useState<boolean>(false);

  // Sample lab results data
  const labResults: LabResult[] = [
    {
      id: 1,
      testName: "Complete Blood Count (CBC)",
      date: "2025-02-28",
      status: "Completed",
      result: "Normal",
      details: [
        { name: "WBC", value: "7.8", unit: "10^3/µL", reference: "4.5-11.0" },
        { name: "RBC", value: "5.2", unit: "10^6/µL", reference: "4.7-6.1" },
        { name: "Hemoglobin", value: "14.2", unit: "g/dL", reference: "14.0-18.0" }
      ]
    },
    {
      id: 2,
      testName: "Lipid Panel",
      date: "2025-01-15",
      status: "Completed",
      result: "Abnormal",
      details: [
        { name: "Total Cholesterol", value: "215", unit: "mg/dL", reference: "<200" },
        { name: "HDL", value: "45", unit: "mg/dL", reference: ">40" },
        { name: "LDL", value: "142", unit: "mg/dL", reference: "<100" }
      ]
    },
    {
      id: 3,
      testName: "Vitamin D",
      date: "2024-12-10", 
      status: "Completed",
      result: "Low",
      details: [
        { name: "Vitamin D, 25-OH", value: "21", unit: "ng/mL", reference: "30-100" }
      ]
    },
    {
      id: 4,
      testName: "Thyroid Function",
      date: "2024-11-05",
      status: "Completed",
      result: "Normal",
      details: [
        { name: "TSH", value: "1.8", unit: "mIU/L", reference: "0.4-4.0" },
        { name: "T4, Free", value: "1.2", unit: "ng/dL", reference: "0.8-1.8" }
      ]
    }
  ];

  // Filter and sort results
  const filteredAndSortedResults = useMemo(() => {
    let filtered = [...labResults];
    
    // Apply result filter
    if (selectedFilter !== "all") {
      filtered = filtered.filter(lab => lab.result.toLowerCase() === selectedFilter);
    }
    
    // Apply search filter
    if (searchText) {
      const lowerSearchText = searchText.toLowerCase();
      filtered = filtered.filter(lab => 
        lab.testName.toLowerCase().includes(lowerSearchText) ||
        lab.details.some(detail => detail.name.toLowerCase().includes(lowerSearchText))
      );
    }
    
    // Sort by date (newest first)
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [labResults, selectedFilter, searchText]);

  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return format(date, 'MMM d, yyyy');
  };

  // Format month for timeline
  const formatMonth = (dateString: string): string => {
    const date = new Date(dateString);
    return format(date, 'MMM');
  };

  // Toggle expanded result
  const toggleExpand = (id: number) => {
    setExpandedResult(expandedResult === id ? null : id);
  };

  // Evaluate if value is within reference range
  const evaluateValue = (value: string, reference: string): "normal" | "low" | "high" => {
    const numValue = parseFloat(value);
    
    if (reference.includes('-')) {
      const [min, max] = reference.split('-').map(parseFloat);
      if (numValue < min) return "low";
      if (numValue > max) return "high";
      return "normal";
    }
    
    if (reference.startsWith('<')) {
      const threshold = parseFloat(reference.substring(1));
      return numValue < threshold ? "normal" : "high";
    }
    
    if (reference.startsWith('>')) {
      const threshold = parseFloat(reference.substring(1));
      return numValue > threshold ? "normal" : "low";
    }
    
    return "normal";
  };

  // Get color based on result status
  const getStatusColor = (result: LabResult['result']): string => {
    switch(result) {
      case "Normal": return "text-green-600";
      case "Abnormal": 
      case "Low": return "text-yellow-600";
      case "High":
      case "Critical": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  // Get background color based on result status
  const getStatusBgColor = (result: LabResult['result']): string => {
    switch(result) {
      case "Normal": return "bg-green-100";
      case "Abnormal": 
      case "Low": return "bg-yellow-100";
      case "High":
      case "Critical": return "bg-red-100";
      default: return "bg-gray-100";
    }
  };

  // Get icon based on result status
  const getStatusIcon = (result: LabResult['result']) => {
    switch(result) {
      case "Normal": return <Check className="w-4 h-4 text-green-600" />;
      case "Abnormal":
      case "Low": return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case "High":
      case "Critical": return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-100 ">
        <div className="flex justify-between items-start">
          <div>
            <motion.h1 
              className="text-xl font-bold text-gray-900"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Lab Results
            </motion.h1>
            <motion.p 
              className="text-xs text-gray-500 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              View test results chronologically
            </motion.p>
          </div>
          <div className="flex items-center space-x-1">
            <motion.button
              className="p-2 bg-white rounded-full shadow-sm hover:bg-blue-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-4 h-4 text-blue-500" />
            </motion.button>
            <motion.button
              className="p-2 bg-white rounded-full shadow-sm hover:bg-blue-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4 text-blue-500" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 pt-3 pb-2 border-b border-gray-100">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search tests..."
            className="w-full py-2 pl-3 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className="absolute right-3 top-2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        {/* Filter toggle */}
        <div className="flex justify-between items-center mt-2">
          <button 
            className="flex items-center text-sm text-blue-500 cursor-pointer"
            onClick={() => setFiltersVisible(!filtersVisible)}
          >
            <Filter className="w-3 h-3 mr-1" />
            {filtersVisible ? "Hide filters" : "Show filters"}
          </button>
          
          {filteredAndSortedResults.length > 0 && (
            <p className="text-xs text-gray-500">
              {filteredAndSortedResults.length} result{filteredAndSortedResults.length !== 1 ? 's' : ''}
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
                  className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${selectedFilter === "all" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                  onClick={() => setSelectedFilter("all")}
                >
                  All
                </button>
                <button 
                  className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${selectedFilter === "normal" ? "bg-green-500 text-white" : "bg-green-100 text-green-600 hover:bg-green-200"}`}
                  onClick={() => setSelectedFilter("normal")}
                >
                  Normal
                </button>
                <button 
                  className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${selectedFilter === "abnormal" ? "bg-yellow-500 text-white" : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"}`}
                  onClick={() => setSelectedFilter("abnormal")}
                >
                  Abnormal
                </button>
                <button 
                  className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${selectedFilter === "low" ? "bg-yellow-500 text-white" : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"}`}
                  onClick={() => setSelectedFilter("low")}
                >
                  Low
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Timeline container */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="relative">
          {filteredAndSortedResults.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="bg-gray-100 p-3 rounded-full mb-3">
                <AlertCircle className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-base font-medium text-gray-800">No matching results</h3>
              <p className="text-xs text-gray-500 mt-1 text-center">Try adjusting your filters or search</p>
              <button 
                className="mt-3 px-3 py-1.5 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
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
              {/* Vertical timeline line */}
              <div className="absolute left-8 top-6 bottom-0 w-0.5 bg-blue-100" />

              {/* Results */}
              {filteredAndSortedResults.map((lab, index) => (
                <motion.div 
                  key={lab.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative ${index !== 0 ? 'mt-8' : ''}`}
                >
                  {/* Month marker and dot */}
                  <div className="absolute left-0 top-6 flex flex-col items-center">
                    <div className="text-xs font-medium text-gray-500 w-4">
                      {formatMonth(lab.date)}
                    </div>
                    <motion.div
                      className={`mt-1 h-6 w-6 rounded-full flex items-center justify-center z-10 ${
                        lab.result === "Normal" ? "bg-green-500" : 
                        lab.result === "Low" ? "bg-yellow-500" : 
                        lab.result === "High" ? "bg-red-500" : 
                        lab.result === "Abnormal" ? "bg-yellow-500" : 
                        lab.result === "Critical" ? "bg-red-500" : "bg-blue-500"
                      }`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.1 + index * 0.1
                      }}
                      whileHover={{ scale: 1.1 }}
                    />
                  </div>

                  {/* Card */}
                  <motion.div 
                    className="ml-12 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all"
                    whileHover={{ 
                      scale: 1.01, 
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                      transition: { duration: 0.3 }
                    }}
                  >
                    {/* Card header */}
                    <div 
                      className="p-3 cursor-pointer"
                      onClick={() => toggleExpand(lab.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="font-semibold text-gray-900 text-sm">{lab.testName}</h3>
                            <motion.div
                              animate={{ 
                                rotate: expandedResult === lab.id ? 90 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                              className="ml-1"
                            >
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            </motion.div>
                          </div>
                          
                          <div className="flex items-center mt-1 text-xs">
                            <div className="flex items-center text-gray-500">
                              <Calendar className="w-3 h-3 mr-1" />
                              <span>{formatDate(lab.date)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <motion.div 
                          className={`px-2 py-1 rounded-full text-xs font-medium ml-2 ${getStatusBgColor(lab.result)} ${getStatusColor(lab.result)} flex items-center`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          {getStatusIcon(lab.result)}
                          <span className="ml-1">{lab.result}</span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Expandable details */}
                    <AnimatePresence>
                      {expandedResult === lab.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: {
                              type: "spring",
                              stiffness: 500,
                              damping: 30
                            },
                            opacity: {
                              duration: 0.3
                            }
                          }}
                          className="border-t border-gray-100 bg-blue-50 overflow-hidden"
                        >
                          <div className="p-3">
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                              <div className="grid grid-cols-12 text-xs font-medium text-gray-500 p-2 border-b border-gray-200 bg-gray-50">
                                <div className="col-span-4">Test</div>
                                <div className="col-span-4 text-center">Result</div>
                                <div className="col-span-4 text-right">Reference</div>
                              </div>
                              
                              <div className="divide-y divide-gray-100">
                                {lab.details.map((detail, i) => {
                                  const valueStatus = evaluateValue(detail.value, detail.reference);
                                  const valueColorClass = valueStatus === "normal" 
                                    ? "text-green-600" 
                                    : valueStatus === "low" 
                                      ? "text-yellow-600" 
                                      : "text-red-600";
                                  
                                  return (
                                    <motion.div 
                                      key={i}
                                      className="grid grid-cols-12 text-xs p-2"
                                      initial={{ opacity: 0, y: 5 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: 0.1 + (i * 0.05) }}
                                    >
                                      <div className="col-span-4 font-medium text-gray-700">{detail.name}</div>
                                      <div className="col-span-4 text-center">
                                        <motion.span 
                                          className={`font-medium ${valueColorClass} px-1.5 py-0.5 rounded ${
                                            valueStatus === "normal" ? "bg-green-50" : 
                                            valueStatus === "low" ? "bg-yellow-50" : "bg-red-50"
                                          }`}
                                        >
                                          {detail.value}
                                        </motion.span>
                                        <div className="text-gray-500 text-xs mt-0.5">{detail.unit}</div>
                                      </div>
                                      <div className="col-span-4 text-right text-gray-500">
                                        {detail.reference}
                                      </div>
                                    </motion.div>
                                  );
                                })}
                              </div>
                            </div>
                            
                            <div className="flex justify-end mt-3 space-x-2">
                              <motion.button
                                className="px-3 py-1 text-xs bg-blue-500 rounded-md text-white hover:bg-blue-600 transition-colors flex items-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Download className="w-3 h-3 mr-1" />
                                PDF
                              </motion.button>
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
      
      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p className="text-xs text-gray-500 mb-2 md:mb-0">
          Last updated: {format(new Date(), 'MMM d, yyyy')}
        </p>
        <div className="flex space-x-2 text-xs">
          <button className="text-blue-500 hover:text-blue-700 transition-colors">
            Help
          </button>
          <span className="text-gray-300">|</span>
          <button className="text-blue-500 hover:text-blue-700 transition-colors">
            Contact Provider
          </button>
        </div>
      </div>
    </div>
  );
};

export default LabResultsTimeline;