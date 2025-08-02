"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, User, Bot, Sparkles } from "lucide-react";
import useAxios from "@/app/hooks/UseAxios";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface QuickQuestion {
  id: string;
  text: string;
}

const HealthConsultationChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-message",
      text: "Hello! I'm your substitute medicine assistant. How can I help you today?", // Updated message
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const api = useAxios();

  const quickQuestions: QuickQuestion[] = [
    { id: "q1", text: "What are some common substitute medicines for pain relief?" },
    { id: "q2", text: "How do I know if a substitute medicine is safe?" },
    { id: "q3", text: "Can substitute medicines be used for children?" },
    { id: "q4", text: "How do I find the right substitute medicine for my condition?" },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generateUniqueId = (prefix: string): string => {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message to the chat
    const newUserMessage: Message = {
      id: generateUniqueId("user"),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    const currentMessage = inputMessage;
    setInputMessage("");
    setIsLoading(true);

    try {
      const result = await api.post("/ai/", { message: currentMessage, type: "SubstituteMedicine" });
      const responseText = typeof result.data === "object" && result.data.response ? result.data.response : String(result.data);

      const aiMessage: Message = {
        id: generateUniqueId("ai"),
        text: responseText,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: generateUniqueId("error"),
        text: "Sorry, I couldn't process your request. Please try again.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    inputRef.current?.focus();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-[92vh] overflow-hidden bg-background/10">
      <div className="bg-primary shadow-md p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8 rounded-full bg-primary-foreground/10 flex items-center justify-center">
            <Bot className="h-5 w-5 text-primary-foreground" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full" />
          </div>
          <div>
            <h1 className="font-semibold text-base text-primary-foreground">
              Substitute Medicine Assistant
            </h1>
            <p className="text-xs text-primary-foreground/80">
              Online | Alternative Medicine AI Support
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card p-2 border-b border-border">
        <p className="text-xs text-muted-foreground mb-1 flex items-center">
          <Sparkles className="h-3 w-3 mr-1" />
          Suggested Questions
        </p>
        <div className="flex flex-wrap gap-1">
          {quickQuestions.map((q) => (
            <button
              key={q.id}
              className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs border border-border hover:bg-accent/80 cursor-pointer transition-colors"
              onClick={() => handleQuickQuestion(q.text)}
            >
              {q.text}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 p-2 overflow-y-auto custom-scrollbar modal-scroll-container bg-card"
        style={{
          height: "calc(100vh - 180px)",
          maxHeight: "calc(100vh - 180px)",
        }}
      >
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex mb-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex max-w-xs md:max-w-md ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
                    message.sender === "user"
                      ? "bg-primary/10 ml-1"
                      : "bg-accent mr-1"
                  }`}
                >
                  {message.sender === "user" ? (
                    <User className="h-3 w-3 text-primary" />
                  ) : (
                    <Bot className="h-3 w-3 text-accent-foreground" />
                  )}
                </div>
                <div>
                  <div
                    className={`p-2 rounded-lg text-sm ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-muted text-muted-foreground rounded-tl-none"
                    }`}
                  >
                    <p>{message.text}</p>
                  </div>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "user" ? "text-right" : ""
                    } text-muted-foreground`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <div key="loading-indicator" className="flex mb-2 justify-start">
              <div className="flex max-w-xs md:max-w-md flex-row">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-accent mr-1 flex items-center justify-center">
                  <Bot className="h-3 w-3 text-accent-foreground" />
                </div>
                <div className="p-2 rounded-lg bg-muted rounded-tl-none">
                  <Loader2 className="h-4 w-4 text-primary animate-spin" />
                </div>
              </div>
            </div>
          )}

          {isTyping && (
            <div key="typing-indicator" className="flex mb-2 justify-start">
              <div className="flex max-w-xs md:max-w-md flex-row">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-accent mr-1 flex items-center justify-center">
                  <Bot className="h-3 w-3 text-accent-foreground" />
                </div>
                <div className="p-2 rounded-lg bg-muted rounded-tl-none flex items-center">
                  <div className="flex space-x-1">
                    <div
                      className="h-1.5 w-1.5 bg-primary/60 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="h-1.5 w-1.5 bg-primary/80 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="h-1.5 w-1.5 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messageEndRef} />
        </AnimatePresence>
      </div>

      {/* Input area */}
      <div className="p-3 bg-card border-t border-border">
        <div className="flex items-center bg-background rounded-full overflow-hidden pl-3 pr-3 py-2 border border-input">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your substitute medicine question here..."
            className="flex-1 bg-transparent outline-none text-foreground text-sm placeholder:text-muted-foreground"
            disabled={isLoading || isTyping}
          />
          <button
            className={`p-1.5 rounded-full transition-colors ${
              inputMessage.trim() && !isLoading && !isTyping
                ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading || isTyping}
          >
            <Send
              className="h-4 w-4"
            />
          </button>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-1">
          This is an AI assistant. For medical emergencies, call your healthcare
          provider.
        </p>
      </div>
    </div>
  );
};

export default HealthConsultationChat;
