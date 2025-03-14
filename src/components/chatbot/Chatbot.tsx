
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MessageSquare, Send, X, ChevronDown, Bot, Sparkles, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Enhanced with more realistic and specific responses
const initialMessages: Message[] = [
  {
    id: "1",
    text: "👋 Hi there! I'm Tharun's AI assistant. How can I help you learn more about his work or skills?",
    sender: "bot",
    timestamp: new Date(),
  },
];

// Enhanced response categories
const botResponses: Record<string, string[]> = {
  greeting: [
    "Hello! I'm Tharun's AI assistant. Would you like to know about his projects, skills, or experience at IBM?",
    "Hi there! I can tell you about Tharun's work in software development, ETL migration tools, or his publications. What interests you?",
    "Greetings! I'm here to help you learn about Tharun's expertise in Python, Java, and data processing automation. What would you like to know?",
  ],
  skills: [
    "Tharun has expertise in several key areas: Python and Java for backend development, React.js and Node.js for web applications, and ETL processes for data transformation. His IBM experience has given him strong skills in data processing automation and cloud technologies.",
    "Tharun is proficient in both frontend and backend technologies. He works with React.js, Node.js, Python, and Java regularly. He's particularly skilled with ETL processes and data automation through his work at IBM Expert Labs.",
  ],
  experience: [
    "At IBM Expert Labs, Tharun has developed an automated ETL migration tool that significantly improved migration speed. He also built a comprehensive data processing system with a Node.js backend and React.js frontend. His automation work has been recognized for its efficiency improvements.",
    "Tharun's current role at IBM Expert Labs involves building data processing automation systems. His ETL migration tool project increased migration speed by 90% and improved data transformation accuracy. He specializes in building full-stack applications with Node.js, Express, and React.",
  ],
  education: [
    "Tharun completed his B.Tech in Computer Science & Engineering from NMIT, Bangalore. Before that, he studied at Sri Chaitanya Junior College and Sri Chaitanya Techno School in Andhra Pradesh. His technical education has given him a strong foundation in software development principles.",
  ],
  projects: [
    "Tharun has developed several notable projects including a Healthcare Hub for hospital management that handles scheduling and patient care with administrative operations. He also built an AI-based Tumor Detection System using EfficientNet & 3D CNN that achieved 90% accuracy in tumor classification.",
    "Some of Tharun's key projects include an ETL Migration Tool that increased migration speed by 90% and a full Data Processing System with file upload capabilities. His Healthcare Hub project demonstrates his ability to build comprehensive management systems.",
  ],
  publications: [
    "Tharun has published research papers on data science applications in Housing Market Intelligence and Deep Learning approaches for species identification. Both papers are available on IEEE Xplore. His research work demonstrates his analytical skills and ability to apply machine learning to real-world problems.",
    "Tharun's research publications include a paper on rental price forecasting using data science techniques and another on species identification using deep learning approaches. He also has certification for his work on detection of Alzheimer's Disease using machine learning.",
  ],
  contact: [
    "You can reach Tharun via email at tharunkamsala24@gmail.com or connect with him on LinkedIn at linkedin.com/in/tharun-kamsala. He's open to discussing potential collaborations or job opportunities in software development.",
    "The best way to contact Tharun is through his email (tharunkamsala24@gmail.com) or LinkedIn profile. You can also use the contact form on this website, and he'll respond promptly.",
  ],
  ai: [
    "I'm an AI assistant designed to help answer questions about Tharun's portfolio. I can provide information about his experience, projects, skills, and educational background. My responses are based on the information provided in Tharun's portfolio.",
    "As an AI, I'm programmed to provide information about Tharun's work and background. While I try to be helpful, I have limitations in my knowledge and capabilities. For more detailed information, you might want to contact Tharun directly.",
  ],
  default: [
    "I don't have specific information about that, but I'd be happy to tell you about Tharun's experience at IBM, his projects like the ETL Migration Tool, or his skills in Python and Java.",
    "I'm not sure about that specific detail. Would you like to know about Tharun's data processing automation work, his publications on housing market intelligence, or his educational background instead?",
    "I don't have that information at the moment. I can tell you about Tharun's experience as a Software Development Engineer at IBM Expert Labs or his projects in healthcare management and tumor detection if you're interested.",
  ],
};

const getBotResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("hi") || lowerMessage.includes("hello") || lowerMessage.includes("hey")) {
    return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
  } else if (lowerMessage.includes("skill") || lowerMessage.includes("technologies") || lowerMessage.includes("tech stack") || lowerMessage.includes("what can") || lowerMessage.includes("expertise")) {
    return botResponses.skills[Math.floor(Math.random() * botResponses.skills.length)];
  } else if (lowerMessage.includes("experience") || lowerMessage.includes("work") || lowerMessage.includes("job") || lowerMessage.includes("ibm") || lowerMessage.includes("career")) {
    return botResponses.experience[Math.floor(Math.random() * botResponses.experience.length)];
  } else if (lowerMessage.includes("education") || lowerMessage.includes("degree") || lowerMessage.includes("college") || lowerMessage.includes("university") || lowerMessage.includes("school") || lowerMessage.includes("study")) {
    return botResponses.education[0];
  } else if (lowerMessage.includes("project") || lowerMessage.includes("portfolio") || lowerMessage.includes("build") || lowerMessage.includes("create") || lowerMessage.includes("develop")) {
    return botResponses.projects[Math.floor(Math.random() * botResponses.projects.length)];
  } else if (lowerMessage.includes("publication") || lowerMessage.includes("research") || lowerMessage.includes("paper") || lowerMessage.includes("ieee") || lowerMessage.includes("journal")) {
    return botResponses.publications[Math.floor(Math.random() * botResponses.publications.length)];
  } else if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("connect") || lowerMessage.includes("reach") || lowerMessage.includes("call") || lowerMessage.includes("message")) {
    return botResponses.contact[Math.floor(Math.random() * botResponses.contact.length)];
  } else if (lowerMessage.includes("ai") || lowerMessage.includes("chatbot") || lowerMessage.includes("assistant") || lowerMessage.includes("who are you") || lowerMessage.includes("what are you")) {
    return botResponses.ai[Math.floor(Math.random() * botResponses.ai.length)];
  } else {
    return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
  }
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Show a welcome toast when the component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        toast({
          title: "AI Assistant Available",
          description: "Ask me anything about Tharun's experience and projects!",
          duration: 5000,
        });
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const simulateAIThinking = (input: string) => {
    // Analyze input complexity to determine thinking time
    const complexity = input.length > 50 ? "high" : input.length > 20 ? "medium" : "low";
    
    // Set thinking time based on complexity
    const baseThinkTime = complexity === "high" ? 2000 : complexity === "medium" ? 1500 : 800;
    const randomFactor = Math.random() * 500;
    
    return baseThinkTime + randomFactor;
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    // First show the typing indicator
    setIsTyping(true);
    
    // Then show AI "thinking" with spinner
    setTimeout(() => {
      setIsTyping(false);
      setIsThinking(true);
      
      // Simulate AI thinking time based on question complexity
      const thinkingTime = simulateAIThinking(input);
      
      setTimeout(() => {
        setIsThinking(false);
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: getBotResponse(input),
          sender: "bot",
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, botMessage]);
      }, thinkingTime);
    }, 500);
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (isMinimized) setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const resetChat = () => {
    setMessages(initialMessages);
    toast({
      title: "Chat Reset",
      description: "Starting a fresh conversation",
      duration: 3000,
    });
  };

  return (
    <>
      {/* Chatbot toggle button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20, 
          delay: 1 
        }}
        className="fixed bottom-6 left-6 z-50"
      >
        <Button
          onClick={toggleChatbot}
          className="rounded-full shadow-lg p-3 bg-primary hover:bg-primary/90 transition-all duration-300"
          size="icon"
          aria-label="Toggle chatbot"
        >
          {isOpen ? 
            <X className="h-5 w-5" /> : 
            <motion.div
              animate={{ rotate: [0, 10, 0, -10, 0] }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "mirror", 
                duration: 2,
                repeatDelay: 3
              }}
            >
              <MessageSquare className="h-5 w-5" />
            </motion.div>
          }
        </Button>
      </motion.div>

      {/* Chatbot interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring" }}
            className="fixed bottom-24 left-6 z-50 w-80 md:w-96"
          >
            <Card className="shadow-xl border border-border/50 overflow-hidden backdrop-blur-sm">
              <CardHeader className="py-3 px-4 flex flex-row items-center justify-between bg-primary/10">
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Bot className="h-5 w-5 text-primary" />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 2,
                        repeatDelay: 1
                      }}
                      className="absolute -right-1 -top-1"
                    >
                      <Sparkles className="h-3 w-3 text-yellow-400" />
                    </motion.div>
                  </div>
                  <h3 className="font-medium">Tharun's AI Assistant</h3>
                </div>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 mr-1"
                    onClick={resetChat}
                    title="Reset conversation"
                    aria-label="Reset conversation"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={toggleMinimize}
                    aria-label={isMinimized ? "Expand chatbot" : "Minimize chatbot"}
                  >
                    <ChevronDown className={cn("h-4 w-4 transition-transform", isMinimized ? "rotate-180" : "")} />
                  </Button>
                </div>
              </CardHeader>

              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <CardContent className="p-0">
                      <div className="h-80 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg) => (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={cn(
                              "flex",
                              msg.sender === "user" ? "justify-end" : "justify-start"
                            )}
                          >
                            <div
                              className={cn(
                                "max-w-[80%] rounded-lg px-4 py-2",
                                msg.sender === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-secondary text-secondary-foreground"
                              )}
                            >
                              <p className="text-sm">{msg.text}</p>
                              <p className="text-xs opacity-70 text-right mt-1">
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                          </motion.div>
                        ))}

                        {isTyping && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-start"
                          >
                            <div className="bg-secondary rounded-lg px-4 py-2 text-secondary-foreground">
                              <div className="flex space-x-1">
                                <span className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                <span className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                <span className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '300ms' }}></span>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {isThinking && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-start"
                          >
                            <div className="bg-secondary rounded-lg px-4 py-2 text-secondary-foreground">
                              <div className="flex items-center space-x-2">
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ 
                                    repeat: Infinity, 
                                    duration: 1,
                                    ease: "linear"
                                  }}
                                >
                                  <RefreshCw className="h-4 w-4" />
                                </motion.div>
                                <span className="text-sm">Thinking...</span>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        <div ref={messagesEndRef} />
                      </div>
                    </CardContent>

                    <CardFooter className="p-3 pt-0 border-t">
                      <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                        <Input
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="Ask about Tharun's work..."
                          className="flex-grow"
                        />
                        <Button 
                          type="submit" 
                          size="icon" 
                          disabled={!input.trim() || isTyping || isThinking}
                          className="bg-primary hover:bg-primary/90 transition-all duration-300"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </form>
                    </CardFooter>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
