"use client";

import { useState, useRef, useEffect } from "react";
import { 
  MessageSquare, Send, Bot, User, CornerLeftUp, 
  Mic, ChevronDown, Loader2, X, Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { LanguageSelector } from "@/components/features/language/LanguageSelector";
import { useChatbot } from "@/hooks/useChatbot";
import { Message, MessageType } from "@/types/chat";

export default function ChatbotPage() {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, isProcessing, suggestedQuestions } = useChatbot();
  
  // Scroll to bottom when messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isProcessing) return;
    
    sendMessage(input);
    setInput("");
  };
  
  const handleSuggestedQuestionClick = (question: string) => {
    sendMessage(question);
  };
  
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <MessageSquare className="h-6 w-6 mr-2" />
          <h1 className="text-2xl font-bold">AI Assistant</h1>
        </div>
        <LanguageSelector />
      </div>
      
      <div className="flex flex-col h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)] bg-card rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center">
            <Bot className="h-5 w-5 mr-2 text-primary" />
            <h2 className="font-semibold">Emergency Response Assistant</h2>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Ask questions about disaster preparedness, emergency procedures, or survival techniques.
          </p>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-10">
                <Bot className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">How can I help you today?</h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                  I can provide emergency guidance, first aid instructions, or help you prepare for disasters.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl mx-auto">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestionClick(question)}
                      className="text-sm text-left p-3 bg-secondary rounded-md hover:bg-secondary/80 transition-colors flex items-start"
                    >
                      <CornerLeftUp className="h-3.5 w-3.5 mr-2 mt-0.5 flex-shrink-0" />
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.type === MessageType.User ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === MessageType.User
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <div className="flex items-center mb-1">
                      {message.type === MessageType.User ? (
                        <>
                          <span className="text-xs font-medium">You</span>
                          <User className="h-3.5 w-3.5 ml-1" />
                        </>
                      ) : (
                        <>
                          <Bot className="h-3.5 w-3.5 mr-1" />
                          <span className="text-xs font-medium">AI Assistant</span>
                        </>
                      )}
                    </div>
                    
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  </div>
                </div>
              ))
            )}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center mb-1">
                    <Bot className="h-3.5 w-3.5 mr-1" />
                    <span className="text-xs font-medium">AI Assistant</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={endOfMessagesRef} />
          </div>
        </ScrollArea>
        
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isProcessing}
              className="flex-1"
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={!input.trim() || isProcessing}
            >
              {isProcessing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
            <div className="flex items-center">
              <Bot className="h-3.5 w-3.5 mr-1" />
              <span>Powered by AI</span>
            </div>
            <button type="button" className="hover:text-foreground">
              <Mic className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}