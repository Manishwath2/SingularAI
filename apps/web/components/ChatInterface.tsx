"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "This is a placeholder response. The AI backend will be connected in the next phase.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Header */}
      <div className="p-6 border-b border-primary/20 glass">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-primary text-glow-primary font-rajdhani">
            Neural Chat Interface
          </h2>
          <p className="text-sm text-foreground/60 mt-1">
            Powered by Local WebLLM + Cloud AI
          </p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-primary">
                <span className="text-4xl">🤖</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Welcome to SingulynAI
              </h3>
              <p className="text-foreground/60">
                Start a conversation to experience the future of AI interaction
              </p>
            </motion.div>
          ) : (
            messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "flex gap-4",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 glow-primary">
                    <span className="text-xl">🤖</span>
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[70%] px-6 py-4 rounded-2xl glass-strong",
                    message.role === "user"
                      ? "bg-primary/10 border border-primary/30"
                      : "bg-muted/50 border border-border"
                  )}
                >
                  <p className="text-foreground leading-relaxed">
                    {message.content}
                  </p>
                  <p className="text-xs text-foreground/40 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                {message.role === "user" && (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center flex-shrink-0 glow-secondary">
                    <span className="text-xl">👤</span>
                  </div>
                )}
              </motion.div>
            ))
          )}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-primary">
                <Loader2 className="w-5 h-5 animate-spin text-background" />
              </div>
              <div className="px-6 py-4 rounded-2xl glass-strong bg-muted/50 border border-border">
                <div className="flex gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-primary/20 glass">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="relative flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message... (supports Generative UI)"
              disabled={isLoading}
              className="flex-1 px-6 py-4 bg-muted/50 border border-primary/20 rounded-2xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/50 focus:glow-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <motion.button
              type="submit"
              disabled={!input.trim() || isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-4 bg-gradient-to-r from-primary to-secondary rounded-2xl text-background font-medium glow-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              <span>Send</span>
            </motion.button>
          </div>
          <p className="text-xs text-foreground/40 mt-3 text-center">
            Powered by WebLLM (Offline) + Gemini Pro (Online) • Fully encrypted
          </p>
        </form>
      </div>
    </div>
  );
}
