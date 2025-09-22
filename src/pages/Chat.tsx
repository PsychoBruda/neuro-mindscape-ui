import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send, Sparkles, MessageCircle } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: Date;
}

const mockMatches = {
  "1": {
    avatar: "🎨",
    pseudonym: "ArtfulThinker",
    compatibility: 92
  },
  "2": {
    avatar: "🌙", 
    pseudonym: "NightOwlPhilosopher",
    compatibility: 87
  },
  "3": {
    avatar: "🌸",
    pseudonym: "BloomingMind", 
    compatibility: 84
  }
};

const aiStarters = [
  "What's a creative project you're excited about?",
  "If you could learn any skill instantly, what would it be?",
  "What's something that made you think differently recently?",
  "How do you like to recharge after a busy day?"
];

const Chat = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [showStarters, setShowStarters] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const match = mockMatches[id as keyof typeof mockMatches];
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    // Load initial AI-suggested message
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        text: `Hi ${user.pseudonym || "there"}! I'm excited to connect with someone who shares my mindset. What brings you joy in your daily life?`,
        sender: "other",
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [user.pseudonym, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!match) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Match not found</p>
      </div>
    );
  }

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setShowStarters(false);

    // Simulate response after delay
    setTimeout(() => {
      const responses = [
        "That's fascinating! I love how you think about that.",
        "I totally relate to that perspective. It reminds me of...",
        "What an interesting way to look at it! Have you always felt this way?",
        "That resonates with me so much. I've been thinking about similar things lately."
      ];
      
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "other", 
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 1000 + Math.random() * 2000);
  };

  const handleSend = () => {
    sendMessage(newMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="icon">
              <Link to="/matches">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div className="text-3xl">{match.avatar}</div>
            <div className="flex-1">
              <h1 className="font-semibold">{match.pseudonym}</h1>
              <p className="text-sm text-muted-foreground">
                {match.compatibility}% compatible • Online now
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="container mx-auto max-w-3xl">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex mb-4 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className={`max-w-xs md:max-w-md flex ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                } items-end gap-2`}>
                  <div className="text-2xl flex-shrink-0">
                    {message.sender === "user" ? user.avatar || "🌟" : match.avatar}
                  </div>
                  <Card className={`p-3 ${
                    message.sender === "user" 
                      ? "bg-gradient-primary text-white"
                      : "bg-card"
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === "user" 
                        ? "text-white/70"
                        : "text-muted-foreground"
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: "2-digit", 
                        minute: "2-digit" 
                      })}
                    </p>
                  </Card>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* AI Starter Suggestions */}
          <AnimatePresence>
            {showStarters && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6"
              >
                <Card className="p-4 bg-soft-lavender border-dashed">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">AI Conversation Starters</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {aiStarters.map((starter, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        onClick={() => sendMessage(starter)}
                        className="justify-start text-left h-auto p-2 whitespace-normal"
                      >
                        <MessageCircle className="w-3 h-3 mr-2 flex-shrink-0 mt-0.5" />
                        {starter}
                      </Button>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-card border-t border-border p-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex gap-3">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button 
              onClick={handleSend}
              disabled={!newMessage.trim()}
              variant="gradient"
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;