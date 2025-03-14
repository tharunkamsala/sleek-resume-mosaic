
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MessageSquare, Send, X, ChevronDown, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "👋 Hi there! I'm Tharun's virtual assistant. How can I help you today?",
    sender: "bot",
    timestamp: new Date(),
  },
];

const botResponses: Record<string, string[]> = {
  greeting: [
    "Hello! How can I assist you today?",
    "Hi there! What would you like to know about Tharun?",
    "Greetings! I'm Tharun's virtual assistant. How may I help you?",
  ],
  skills: [
    "Tharun is skilled in Python, Java, React.js, Node.js, and various database technologies. He also has experience with ETL processes and data automation.",
    "Tharun's technical skills include web development with React.js and Node.js, programming in Python and Java, and working with databases like MySQL and MongoDB.",
  ],
  experience: [
    "Tharun is currently working as a Software Development Engineer at IBM Expert Labs in Bangalore. He previously interned at the same company where he developed ETL migration tools.",
    "At IBM Expert Labs, Tharun has worked on ETL migration tools and data processing automation systems, significantly improving migration speed and efficiency.",
  ],
  education: [
    "Tharun holds a B.Tech in Computer Science & Engineering from NMIT, Bangalore. He did his 12th from Sri Chaitanya Junior College and 10th from Sri Chaitanya Techno School in Andhra Pradesh.",
  ],
  projects: [
    "Tharun has worked on several projects including a Healthcare Hub for hospital management, a Tumor Detection System using AI/ML, an ETL Migration Tool, and a Data Processing System.",
    "One of Tharun's notable projects is a Tumor Detection System that uses EfficientNet & 3D CNN to achieve 90% accuracy in tumor classification.",
  ],
  publications: [
    "Tharun has published research papers on Housing Market Intelligence, Deep Learning for Species Identification, and Detection of Alzheimer's Disease using Machine Learning.",
    "You can find Tharun's publications on IEEE Xplore. His recent work includes research on rental price forecasting using data science techniques.",
  ],
  contact: [
    "You can reach Tharun via email at tharunkamsala24@gmail.com or connect with him on LinkedIn at linkedin.com/in/tharun-kamsala.",
    "The best way to contact Tharun is through his email: tharunkamsala24@gmail.com or via the contact form on this website.",
  ],
  default: [
    "I'm not sure I understand. Could you please rephrase your question?",
    "I don't have that information at the moment. Would you like to know about Tharun's skills, experience, or projects instead?",
    "I'm still learning! Feel free to ask me about Tharun's skills, experience, education, projects, or contact information.",
  ],
};

const getBotResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("hi") || lowerMessage.includes("hello") || lowerMessage.includes("hey")) {
    return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
  } else if (lowerMessage.includes("skill") || lowerMessage.includes("technologies") || lowerMessage.includes("tech stack")) {
    return botResponses.skills[Math.floor(Math.random() * botResponses.skills.length)];
  } else if (lowerMessage.includes("experience") || lowerMessage.includes("work") || lowerMessage.includes("job") || lowerMessage.includes("ibm")) {
    return botResponses.experience[Math.floor(Math.random() * botResponses.experience.length)];
  } else if (lowerMessage.includes("education") || lowerMessage.includes("degree") || lowerMessage.includes("college") || lowerMessage.includes("university") || lowerMessage.includes("school")) {
    return botResponses.education[0];
  } else if (lowerMessage.includes("project") || lowerMessage.includes("portfolio") || lowerMessage.includes("work")) {
    return botResponses.projects[Math.floor(Math.random() * botResponses.projects.length)];
  } else if (lowerMessage.includes("publication") || lowerMessage.includes("research") || lowerMessage.includes("paper") || lowerMessage.includes("ieee")) {
    return botResponses.publications[Math.floor(Math.random() * botResponses.publications.length)];
  } else if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("connect") || lowerMessage.includes("reach")) {
    return botResponses.contact[Math.floor(Math.random() * botResponses.contact.length)];
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(input),
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (isMinimized) setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Chatbot toggle button */}
      <Button
        onClick={toggleChatbot}
        className="fixed bottom-6 left-6 z-50 rounded-full shadow-lg p-3"
        size="icon"
        aria-label="Toggle chatbot"
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
      </Button>

      {/* Chatbot interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 left-6 z-50 w-80 md:w-96"
          >
            <Card className="shadow-xl border border-border/50 overflow-hidden">
              <CardHeader className="py-3 px-4 flex flex-row items-center justify-between bg-primary/10">
                <div className="flex items-center space-x-2">
                  <Bot className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Tharun's Assistant</h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={toggleMinimize}
                  aria-label={isMinimized ? "Expand chatbot" : "Minimize chatbot"}
                >
                  <ChevronDown className={cn("h-4 w-4 transition-transform", isMinimized ? "rotate-180" : "")} />
                </Button>
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

                        <div ref={messagesEndRef} />
                      </div>
                    </CardContent>

                    <CardFooter className="p-3 pt-0 border-t">
                      <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                        <Input
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="Type your message..."
                          className="flex-grow"
                        />
                        <Button type="submit" size="icon" disabled={!input.trim()}>
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
