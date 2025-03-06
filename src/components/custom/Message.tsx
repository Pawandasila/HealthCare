import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Send, Paperclip, ArrowLeft, MoreVertical, Phone, Video, Check, CheckCheck } from 'lucide-react';
import { format } from 'date-fns';

// TypeScript interfaces
interface Message {
  id: number;
  sender: string;
  avatar?: string;
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  isProvider: boolean;
}

// Props type for the component
interface HealthcareMessagingProps {
  initialMessages?: Message[];
  maxHeight?: string;
}

const HealthcareMessaging: React.FC<HealthcareMessagingProps> = ({ 
  initialMessages,
  maxHeight = "600px" // Default max height
}) => {
  // Default messages if none provided
  const defaultMessages: Message[] = [
    {
      id: 1,
      sender: "Dr. Sarah Johnson",
      avatar: "/api/placeholder/40/40",
      content: "Hi there. I've reviewed your lab results. Your lipid panel shows slightly elevated cholesterol. Let's discuss some dietary changes to address this.",
      timestamp: "2025-03-06T09:32:00",
      status: "read",
      isProvider: true
    },
    {
      id: 2,
      sender: "You",
      content: "Thank you Dr. Johnson. I've been wondering about my cholesterol. When would be a good time to discuss this?",
      timestamp: "2025-03-06T10:15:00",
      status: "read",
      isProvider: false
    },
    {
      id: 3,
      sender: "Dr. Sarah Johnson",
      avatar: "/api/placeholder/40/40",
      content: "I have availability tomorrow at 2pm or Friday at 10am. Which works better for you?",
      timestamp: "2025-03-06T10:22:00",
      status: "read",
      isProvider: true
    },
    {
      id: 4,
      sender: "You",
      content: "Friday at 10am would be perfect.",
      timestamp: "2025-03-06T10:30:00",
      status: "read",
      isProvider: false
    },
    {
      id: 5,
      sender: "Dr. Sarah Johnson",
      avatar: "/api/placeholder/40/40",
      content: "Great! I've scheduled a virtual appointment for Friday at 10am. You'll receive a reminder notification. In the meantime, try to limit saturated fats and increase fiber intake.",
      timestamp: "2025-03-06T10:35:00",
      status: "read",
      isProvider: true
    },
    {
      id: 6,
      sender: "Nurse Practitioner Alex Rivera",
      avatar: "/api/placeholder/40/40",
      content: "Hello! Just a reminder that you're due for your annual physical. Would you like to schedule that along with your follow-up appointment?",
      timestamp: "2025-03-07T08:15:00",
      status: "delivered",
      isProvider: true
    }
  ];
  
  const [messages, setMessages] = useState<Message[]>(initialMessages || defaultMessages);
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showDateDivider, setShowDateDivider] = useState<boolean>(true);
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);

  // Get scroll progress using framer-motion
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef
  });

  // Memoize the scroll state update function to prevent unnecessary re-renders
  const updateScrollState = useCallback(() => {
    if (!scrollContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const scrollBottom = scrollHeight - scrollTop - clientHeight;
    
    // Consider "at bottom" if within 20px of the bottom
    const atBottom = scrollBottom < 20;
    const shouldShowButton = scrollBottom > 100;
    
    if (atBottom !== isAtBottom) {
      setIsAtBottom(atBottom);
    }
    
    if (shouldShowButton !== showScrollButton) {
      setShowScrollButton(shouldShowButton);
    }
  }, [isAtBottom, showScrollButton]);

  // Track scroll position with throttling to improve performance
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    // Use throttling to avoid excessive updates
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateScrollState, 100);
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [updateScrollState]);

  // Auto-scroll to bottom of messages
  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth"): void => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  }, []);
  
  // When new messages arrive, scroll to bottom if already at bottom
  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    } else if (showScrollButton) {
      // Flash the scroll button when new messages arrive and we're not at bottom
      const button = document.getElementById('scroll-bottom-button');
      if (button) {
        button.classList.add('animate-pulse');
        setTimeout(() => button.classList.remove('animate-pulse'), 1000);
      }
    }
  }, [messages, isAtBottom, showScrollButton, scrollToBottom]);

  // Initial scroll to bottom when component mounts
  useEffect(() => {
    scrollToBottom("auto");
  }, [scrollToBottom]);

  // Format timestamp for display
  const formatMessageTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    return format(date, 'h:mm a');
  };
  
  // Format date for dividers
  const formatMessageDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return format(date, 'MMMM d, yyyy');
    }
  };
  
  // Check if message is from a different day than the previous one
  const isNewDay = (index: number): boolean => {
    if (index === 0) return true;
    
    const currentDate = new Date(messages[index].timestamp).toDateString();
    const prevDate = new Date(messages[index - 1].timestamp).toDateString();
    
    return currentDate !== prevDate;
  };

  // Separate input change handler to prevent unnecessary re-renders
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  // Send a new message
  const handleSendMessage = useCallback((): void => {
    if (newMessage.trim() === "") return;
    
    const newMsg: Message = {
      id: messages.length + 1,
      sender: "You",
      content: newMessage,
      timestamp: new Date().toISOString(),
      status: "sent",
      isProvider: false
    };
    
    setMessages(prev => [...prev, newMsg]);
    setNewMessage("");
    setIsAtBottom(true); // Force scroll to bottom when user sends a message
    
    // Focus the input field again after sending
    inputRef.current?.focus();
    
    // Simulate typing indicator
    setIsTyping(true);
    
    // Simulate response from provider after delay
    setTimeout(() => {
      setIsTyping(false);
      
      // Random response from the provider
      const responses: string[] = [
        "I've noted your message. A healthcare provider will respond soon.",
        "Thank you for your message. The care team will review it and respond within 24 hours.",
        "Your message has been received. Please allow 1-2 business days for a response."
      ];
      
      const autoResponse: Message = {
        id: messages.length + 2,
        sender: "Healthcare Team",
        avatar: "/api/placeholder/40/40",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toISOString(),
        status: "delivered",
        isProvider: true
      };
      
      setMessages(prev => [...prev, autoResponse]);
    }, 3000);
  }, [messages.length, newMessage]);

  // Handle enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newMessage.trim()) {
      handleSendMessage();
    }
  };

  // Get status icon based on message status
  const getStatusIcon = (status: Message['status']) => {
    switch(status) {
      case "sent":
        return <Check className="w-3 h-3 text-gray-400" />;
      case "delivered":
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case "read":
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default:
        return null;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };
  
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    })
  };

  // Scroll button animation
  const scrollButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  };

  // Memoized Message component to prevent unnecessary re-renders
  const MessageComponent = React.memo(({ message, index }: { message: Message, index: number }) => {
    return (
      <React.Fragment>
        {/* Date divider */}
        {index > 0 && isNewDay(index) && (
          <div className="flex justify-center my-2">
            <div className="px-3 py-1 bg-gray-200 rounded-full text-xs text-gray-600">
              {formatMessageDate(message.timestamp)}
            </div>
          </div>
        )}
        
        {/* Message bubble */}
        <motion.div
          className={`flex ${message.isProvider ? 'justify-start' : 'justify-end'} mb-3`}
          custom={index}
          variants={messageVariants}
          initial="hidden"
          animate="visible"
          layout
        >
          <div className={`max-w-[80%] flex ${message.isProvider ? 'flex-row' : 'flex-row-reverse'}`}>
            {message.isProvider && message.avatar && (
              <div className="mt-1 mr-2">
                <img
                  src={message.avatar}
                  alt={message.sender}
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
            )}
            
            <div>
              {message.isProvider && (
                <div className="text-xs text-gray-600 ml-1 mb-1">{message.sender}</div>
              )}
              
              <div className={`rounded-lg p-3 break-words ${
                message.isProvider 
                  ? 'bg-white border border-gray-200 text-gray-800' 
                  : 'bg-blue-500 text-white'
              }`}>
                <p className="text-sm">{message.content}</p>
              </div>
              
              <div className={`flex mt-1 text-xs text-gray-500 ${
                message.isProvider ? 'justify-start ml-1' : 'justify-end mr-1'
              }`}>
                <span>{formatMessageTime(message.timestamp)}</span>
                {!message.isProvider && (
                  <span className="ml-1 flex items-center">
                    {getStatusIcon(message.status)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </React.Fragment>
    );
  });
  
  // Avoid unnecessary re-renders
  MessageComponent.displayName = 'MessageComponent';

  return (
    <div className="bg-gray-50 flex flex-col h-full max-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col h-full max-h-screen"
      >
        {/* Header */}
        <motion.div 
          className="px-4 py-3 border-b border-gray-200 bg-white flex items-center justify-between sticky top-0 shadow-sm"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center">
            <button className="p-1 mr-2 rounded-full hover:bg-gray-100">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center">
              <div className="relative">
                <img
                  src="/api/placeholder/36/36"
                  alt="Healthcare Team"
                  className="w-9 h-9 rounded-full object-cover border-2 border-blue-100"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
              </div>
              <div className="ml-2">
                <h2 className="font-medium text-sm text-gray-900">Healthcare Team</h2>
                <p className="text-xs text-green-600">Online</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-1.5 rounded-full hover:bg-gray-100">
              <Phone className="w-5 h-5 text-blue-500" />
            </button>
            <button className="p-1.5 rounded-full hover:bg-gray-100">
              <Video className="w-5 h-5 text-blue-500" />
            </button>
            <button className="p-1.5 rounded-full hover:bg-gray-100">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </motion.div>

        {/* Messages area */}
        <motion.div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-4 py-3 bg-gray-50 relative"
          style={{ maxHeight }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {showDateDivider && messages.length > 0 && (
            <div className="flex justify-center my-2">
              <div className="px-3 py-1 bg-gray-200 rounded-full text-xs text-gray-600">
                {formatMessageDate(messages[0].timestamp)}
              </div>
            </div>
          )}
          
          {messages.map((message, index) => (
            <MessageComponent key={message.id} message={message} index={index} />
          ))}
          
          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div 
                className="flex justify-start mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                layout
              >
                <div className="flex items-end">
                  <div className="mr-2">
                    <img
                      src="/api/placeholder/32/32"
                      alt="Provider"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg px-3 py-2">
                    <div className="flex space-x-1">
                      <motion.div 
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, repeatType: "loop", delay: 0 }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, repeatType: "loop", delay: 0.2 }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, repeatType: "loop", delay: 0.4 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Scroll to bottom button */}
          <AnimatePresence>
            {showScrollButton && (
              <motion.button
                id="scroll-bottom-button"
                className="absolute bottom-4 right-4 bg-blue-500 text-white rounded-full p-2 shadow-lg"
                onClick={() => scrollToBottom()}
                variants={scrollButtonVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
          
          {/* Invisible element for scroll reference */}
          <div ref={messagesEndRef} />
          
          {/* Scroll progress indicator */}
          <motion.div 
            className="h-1 bg-blue-500 absolute top-0 left-0"
            style={{ 
              scaleX: scrollYProgress,
              transformOrigin: "left"
            }}
          />
        </motion.div>

        {/* Input area */}
        <motion.div 
          className="p-3 border-t border-gray-200 bg-white"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
            <button className="p-1 mr-1 text-gray-500 hover:text-blue-500">
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              ref={inputRef}
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-transparent border-none focus:outline-none py-2 px-1 text-sm"
              value={newMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <motion.button 
              className={`p-1.5 rounded-full ${newMessage.trim() ? 'bg-blue-500 text-white' : 'text-gray-400'}`}
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              whileHover={newMessage.trim() ? { scale: 1.1 } : {}}
              whileTap={newMessage.trim() ? { scale: 0.9 } : {}}
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </div>
          <div className="text-xs text-center mt-2 text-gray-500">
            <span>Messages are encrypted and HIPAA compliant</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HealthcareMessaging;