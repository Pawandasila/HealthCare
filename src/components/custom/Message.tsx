import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import {
  Send,
  Paperclip,
  ArrowLeft,
  MoreVertical,
  Phone,
  Video,
  Check,
  CheckCheck,
  Bot,
  Sparkles,
  User,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";

interface Message {
  id: string;
  sender: string;
  avatar?: string;
  content: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
  isProvider: boolean;
  isAI: boolean;
}

interface HealthcareAIChatProps {
  initialMessages?: Message[];
  maxHeight?: string;
}

const HealthcareAIChat: React.FC<HealthcareAIChatProps> = ({
  initialMessages,
  maxHeight = "600px",
}) => {
  const defaultMessages: Message[] = [
    {
      id: "welcome-message",
      sender: "Healthcare AI Assistant",
      avatar: "/api/placeholder/40/40",
      content:
        "Hello! I'm your healthcare assistant. How can I help you today with any medical questions or concerns?",
      timestamp: new Date().toISOString(),
      status: "read",
      isProvider: true,
      isAI: true,
    },
  ];

  const [messages, setMessages] = useState<Message[]>(
    initialMessages || defaultMessages
  );
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDateDivider, setShowDateDivider] = useState<boolean>(true);
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);

  const quickQuestions = [
    { id: "q1", text: "What foods should I avoid while on medication?" },
    { id: "q2", text: "What can I manage side effects from my prescriptions?" },
    { id: "q3", text: "When should I contact my doctor immediately?" },
    { id: "q4", text: "What exercise is safe with my condition?" },
  ];

  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
  });

  const mockApiResponse = useCallback(async (message: string) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const messageLower = message.toLowerCase();

    if (
      messageLower.includes("medication") ||
      messageLower.includes("pill") ||
      messageLower.includes("drug")
    ) {
      return "It's important to take medications as prescribed. If you're experiencing side effects, don't stop taking them without consulting your doctor first. Would you like me to provide some general information about medication management?";
    } else if (
      messageLower.includes("exercise") ||
      messageLower.includes("workout")
    ) {
      return "Regular physical activity is beneficial for most health conditions. Start with low-impact exercises like walking, swimming, or gentle yoga. Always consult your healthcare provider before starting a new exercise regimen, especially if you have existing health concerns.";
    } else if (
      messageLower.includes("diet") ||
      messageLower.includes("food") ||
      messageLower.includes("eat")
    ) {
      return "A balanced diet rich in fruits, vegetables, whole grains, and lean proteins is generally recommended. For specific dietary recommendations related to your health condition, please consult with your healthcare provider or a registered dietitian.";
    } else if (
      messageLower.includes("symptom") ||
      messageLower.includes("pain") ||
      messageLower.includes("hurt")
    ) {
      return "I understand you're experiencing discomfort. While I can provide general information, it's important to discuss your symptoms with your healthcare provider for proper diagnosis and treatment. Would you like to know when symptoms might warrant immediate medical attention?";
    } else {
      return "Thank you for your question. While I can provide general health information, for personalized medical advice, please consult with your healthcare provider. Is there anything specific about this topic you'd like to know more about?";
    }
  }, []);

  const updateScrollState = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } =
      scrollContainerRef.current;
    const scrollBottom = scrollHeight - scrollTop - clientHeight;

    const atBottom = scrollBottom < 20;
    const shouldShowButton = scrollBottom > 100;

    setIsAtBottom(atBottom);
    setShowScrollButton(shouldShowButton);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      requestAnimationFrame(updateScrollState);
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [updateScrollState]);

  const scrollToBottom = useCallback(
    (behavior: ScrollBehavior = "smooth"): void => {
      messagesEndRef.current?.scrollIntoView({ behavior });
    },
    []
  );

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages, isAtBottom, scrollToBottom]);

  useEffect(() => {
    scrollToBottom("auto");
  }, [scrollToBottom]);

  const formatMessageTime = useCallback((timestamp: string): string => {
    const date = new Date(timestamp);
    return format(date, "h:mm a");
  }, []);

  const formatMessageDate = useCallback((timestamp: string): string => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return format(date, "MMMM d, yyyy");
    }
  }, []);

  const generateUniqueId = useCallback((prefix: string): string => {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  }, []);

  const handleQuickQuestion = useCallback((question: string) => {
    setNewMessage(question);
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = useCallback(async (): Promise<void> => {
    if (newMessage.trim() === "" || isLoading) return;

    const userMsg: Message = {
      id: generateUniqueId("user"),
      sender: "You",
      content: newMessage,
      timestamp: new Date().toISOString(),
      status: "sent",
      isProvider: false,
      isAI: false,
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentMessage = newMessage;
    setNewMessage("");
    setIsAtBottom(true);

    inputRef.current?.focus();

    setIsLoading(true);
    setIsTyping(true);

    try {
      const aiResponseText = await mockApiResponse(currentMessage);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === userMsg.id ? { ...msg, status: "delivered" } : msg
        )
      );

      setTimeout(() => {
        setIsTyping(false);

        const aiResponse: Message = {
          id: generateUniqueId("ai"),
          sender: "Healthcare AI Assistant",
          avatar: "/api/placeholder/40/40",
          content: aiResponseText,
          timestamp: new Date().toISOString(),
          status: "delivered",
          isProvider: true,
          isAI: true,
        };

        setMessages((prev) => [...prev, aiResponse]);

        setTimeout(() => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === userMsg.id ? { ...msg, status: "read" } : msg
            )
          );
        }, 1000);
      }, 1500);
    } catch (error) {
      console.error("Error getting AI response:", error);
      setIsTyping(false);

      const errorMsg: Message = {
        id: generateUniqueId("error"),
        sender: "System",
        avatar: "/api/placeholder/40/40",
        content: "Sorry, I couldn't process your request. Please try again.",
        timestamp: new Date().toISOString(),
        status: "delivered",
        isProvider: true,
        isAI: false,
      };

      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [newMessage, isLoading, mockApiResponse, generateUniqueId]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newMessage.trim() && !isLoading) {
      handleSendMessage();
    }
  }, [newMessage, isLoading, handleSendMessage]);

  const getStatusIcon = useCallback((status: Message["status"]) => {
    switch (status) {
      case "sent":
        return <Check className="w-3 h-3 text-muted-foreground" />;
      case "delivered":
        return <CheckCheck className="w-3 h-3 text-muted-foreground" />;
      case "read":
        return <CheckCheck className="w-3 h-3 text-primary" />;
      default:
        return null;
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };

  const scrollButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  const MessageComponent = React.memo(
    ({ message, index }: { message: Message; index: number }) => {
      const isNewDayForMessage = React.useMemo(() => {
        if (index === 0) return true;
        const currentDate = new Date(message.timestamp).toDateString();
        const prevDate = new Date(messages[index - 1].timestamp).toDateString();
        return currentDate !== prevDate;
      }, [message.timestamp, index]);

      return (
        <React.Fragment>
          {/* Date divider */}
          {index > 0 && isNewDayForMessage && (
            <div className="flex justify-center my-2">
              <div className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                {formatMessageDate(message.timestamp)}
              </div>
            </div>
          )}

          {/* Message bubble */}
          <motion.div
            className={`flex ${
              message.isProvider ? "justify-start" : "justify-end"
            } mb-3`}
            custom={index}
            variants={messageVariants}
            initial="hidden"
            animate="visible"
            layout
          >
            <div
              className={`max-w-[80%] flex ${
                message.isProvider ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {message.isProvider && (
                <div className="mt-1 mr-2 relative">
                  {message.avatar ? (
                    <img
                      src={message.avatar}
                      alt={message.sender}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  {message.isAI && (
                    <div className="absolute -bottom-1 -right-1 bg-primary/80 rounded-full w-3 h-3 border border-background flex items-center justify-center">
                      <Sparkles className="w-2 h-2 text-primary-foreground" />
                    </div>
                  )}
                </div>
              )}

              {!message.isProvider && (
                <div className="mt-1 ml-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                </div>
              )}

              <div>
                {message.isProvider && (
                  <div className="text-xs text-muted-foreground ml-1 mb-1 flex items-center">
                    {message.sender}
                    {message.isAI && (
                      <span className="ml-1 bg-primary/10 text-primary text-xs px-1 rounded-sm">
                        AI
                      </span>
                    )}
                  </div>
                )}

                <div
                  className={`rounded-lg p-3 break-words ${
                    message.isProvider
                      ? "bg-card border border-border text-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>

                <div
                  className={`flex mt-1 text-xs text-muted-foreground ${
                    message.isProvider
                      ? "justify-start ml-1"
                      : "justify-end mr-1"
                  }`}
                >
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
    }, 
    (prevProps, nextProps) => {
      return prevProps.message.id === nextProps.message.id && 
             prevProps.message.status === nextProps.message.status &&
             prevProps.index === nextProps.index;
    }
  );

  MessageComponent.displayName = "MessageComponent";

  return (
    <div className="bg-background flex flex-col h-full max-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col h-full max-h-screen"
      >
        {/* Header */}
        <motion.div
          className="px-4 py-3 border-b border-border bg-gradient-to-l from-primary/20 to-primary/30 flex items-center justify-between sticky top-0 shadow-sm"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center">
            <button className="p-1 mr-2 rounded-full hover:bg-accent text-primary">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-background"></div>
              </div>
              <div className="ml-2">
                <h2 className="font-medium text-sm text-foreground">
                  Healthcare AI Assistant
                </h2>
                <p className="text-xs text-green-600">
                  Online | Medical AI Support
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-1.5 rounded-full hover:bg-accent text-primary">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-1.5 rounded-full hover:bg-accent text-primary">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-1.5 rounded-full hover:bg-accent text-primary">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Quick questions section */}
        {/* <div className="bg-card p-2 border-b border-primary/20">
          <p className="text-xs text-primary mb-1 flex items-center">
            <Sparkles className="h-3 w-3 mr-1" />
            Suggested Questions
          </p>
          <div className="flex flex-wrap gap-1">
            {quickQuestions.map((q) => (
              <button
                key={q.id}
                className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs border border-primary/20 hover:bg-primary/20 cursor-pointer"
                onClick={() => handleQuickQuestion(q.text)}
              >
                {q.text}
              </button>
            ))}
          </div>
        </div> */}

        {/* Messages area */}
        <motion.div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-4 py-3 bg-background relative custom-scrollbar"
          style={{ maxHeight }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {showDateDivider && messages.length > 0 && (
            <div className="flex justify-center my-2">
              <div className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                {formatMessageDate(messages[0].timestamp)}
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <MessageComponent
              key={message.id}
              message={message}
              index={index}
            />
          ))}

          {/* Typing indicator */}
          <AnimatePresence mode="wait">
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
                  <div className="relative mr-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-primary/80 rounded-full w-3 h-3 border border-background flex items-center justify-center">
                      <Sparkles className="w-2 h-2 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="bg-card border border-border rounded-lg px-3 py-2">
                    <div className="flex space-x-1">
                      <motion.div
                        className="w-2 h-2 bg-primary/60 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          repeatType: "loop",
                          delay: 0,
                        }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-primary/80 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          repeatType: "loop",
                          delay: 0.2,
                        }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-primary rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          repeatType: "loop",
                          delay: 0.4,
                        }}
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
                className="absolute bottom-4 right-4 bg-primary text-primary-foreground rounded-full p-2 shadow-lg"
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
            className="h-1 bg-primary absolute top-0 left-0"
            style={{
              scaleX: scrollYProgress,
              transformOrigin: "left",
            }}
          />
        </motion.div>

        {/* Input area */}
        <motion.div
          className="p-3 border-t border-border bg-card"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center bg-muted rounded-full px-3 py-1 border border-border">
            <button className="p-1 mr-1 text-primary hover:text-primary/80">
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              ref={inputRef}
              type="text"
              placeholder="Type your health question here..."
              className="flex-1 bg-transparent border-none focus:outline-none py-2 px-1 text-sm"
              value={newMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <motion.button
              className={`p-1.5 rounded-full ${
                newMessage.trim() && !isLoading
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted-foreground/20 text-muted-foreground"
              }`}
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || isLoading}
              whileHover={newMessage.trim() && !isLoading ? { scale: 1.1 } : {}}
              whileTap={newMessage.trim() && !isLoading ? { scale: 0.9 } : {}}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </motion.button>
          </div>
          <div className="text-xs text-center mt-2 text-muted-foreground">
            <span>
              This is an AI assistant. For medical emergencies, call your
              healthcare provider.
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default React.memo(HealthcareAIChat);