"use client";

import { useState } from "react";
import { Message, MessageType } from "@/types/chat";
import { useLanguage } from "./useLanguage";

// Mock responses based on keywords
const mockResponses: Record<string, string> = {
  "flood": "During a flood, move to higher ground immediately. Avoid walking or driving through floodwaters. Just 6 inches of moving water can knock you down, and 2 feet of water can sweep your vehicle away.",
  "fire": "If there's a fire, remember to: 1) Get out and stay out, 2) Call emergency services, 3) If your clothes catch fire, stop, drop, and roll. 4) Use a fire extinguisher if it's safe to do so.",
  "earthquake": "During an earthquake: DROP to the ground, COVER by getting under a sturdy desk or table, and HOLD ON until the shaking stops. Avoid doorways, windows, and exterior walls.",
  "first aid": "For basic first aid: 1) Check for responsiveness and breathing, 2) Call emergency services, 3) Control severe bleeding with direct pressure, 4) Keep the person warm and comfortable until help arrives.",
  "emergency kit": "An emergency kit should include: Water (one gallon per person per day for at least three days), non-perishable food, flashlight, first aid kit, extra batteries, whistle, dust mask, plastic sheeting and duct tape, moist towelettes, garbage bags, wrench or pliers, manual can opener, local maps, and cell phone with chargers.",
  "power outage": "During a power outage: 1) Use flashlights instead of candles, 2) Keep refrigerator and freezer doors closed, 3) Disconnect appliances to avoid damage when power returns, 4) Never use a generator indoors.",
  "help": "I can provide guidance on various emergency situations like floods, fires, earthquakes, and more. I can also help with first aid information and emergency preparedness tips. What specific information do you need?",
};

export function useChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { currentLanguage } = useLanguage();
  
  const suggestedQuestions = [
    "What should I do during an earthquake?",
    "How do I create an emergency kit?",
    "What are the first aid steps for bleeding?",
    "How to prepare for a flood?",
  ];
  
  const sendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: MessageType.User,
      content,
      timestamp: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsProcessing(true);
    
    // Process the message and get a response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: MessageType.Bot,
        content: getBotResponse(content),
        timestamp: new Date().toISOString(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsProcessing(false);
    }, 1500); // Simulate API delay
  };
  
  const getBotResponse = (input: string): string => {
    const normalizedInput = input.toLowerCase();
    
    // Check for keyword matches
    for (const [keyword, response] of Object.entries(mockResponses)) {
      if (normalizedInput.includes(keyword)) {
        // Apply language context
        if (currentLanguage !== "en") {
          return `[This response would be translated to ${currentLanguage}]\n\n${response}`;
        }
        return response;
      }
    }
    
    // Default response if no keywords match
    if (currentLanguage !== "en") {
      return `[This response would be translated to ${currentLanguage}]\n\nI'm here to help with emergency and disaster-related questions. You can ask me about specific situations like floods, fires, earthquakes, or about first aid procedures and emergency preparedness.`;
    }
    
    return "I'm here to help with emergency and disaster-related questions. You can ask me about specific situations like floods, fires, earthquakes, or about first aid procedures and emergency preparedness.";
  };
  
  return {
    messages,
    sendMessage,
    isProcessing,
    suggestedQuestions,
  };
}