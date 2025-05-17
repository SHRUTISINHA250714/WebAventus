// "use client";

// import { useState, useRef, useEffect } from "react";
// import {
//   MessageSquare, Send, Bot, User, CornerLeftUp,
//   Mic, Loader2
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import DashboardLayout from "@/components/layout/DashboardLayout";
// import { LanguageSelector } from "@/components/features/language/LanguageSelector";
// import { useChatbot } from "@/hooks/useChatbot";
// import { Message, MessageType } from "@/types/chat";

// // Updated fetch to support backend's response structure
// const fetchLLMResponse = async (userInput: string) => {
//   try {
//     const res = await fetch("http://127.0.0.1:8000/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ message: userInput }),
//     });

//     if (!res.ok) throw new Error("Failed to fetch response");

//     const result = await res.json();

//     if (!result?.type || !result?.content) {
//       throw new Error("Invalid response from server");
//     }

//     return {
//       type: result.type,
//       content: result.content,
//     };
//   } catch (error) {
//     console.error("Error:", error);
//     return {
//       type: "message",
//       content: "Sorry, I couldn't process your request.",
//     };
//   }
// };

// export default function ChatbotPage() {
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const endOfMessagesRef = useRef<HTMLDivElement>(null);
//   const { messages, sendMessage, isProcessing, suggestedQuestions } = useChatbot();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim() || isProcessing) return;

//     const userMessage = input;
//     sendMessage(userMessage); // Add user message to chat
//     setInput("");
//     setIsTyping(true);

//     const botReply = await fetchLLMResponse(userMessage);

//     // Add bot message with label if it's a diagnosis
//     sendMessage(botReply.content);

//     setIsTyping(false);
//   };

//   useEffect(() => {
//     endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <DashboardLayout>
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center">
//           <MessageSquare className="h-6 w-6 mr-2" />
//           <h1 className="text-2xl font-bold">AI Assistant</h1>
//         </div>
//         <LanguageSelector />
//       </div>

//       <div className="flex flex-col h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)] bg-card rounded-lg shadow-md overflow-hidden">
//         <div className="p-4 border-b">
//           <div className="flex items-center">
//             <Bot className="h-5 w-5 mr-2 text-primary" />
//             <h2 className="font-semibold">Mental Health Assistant</h2>
//           </div>
//           <p className="text-sm text-muted-foreground mt-1">
//             Ask anything about your well-being or mental health. This assistant will guide you with compassion.
//           </p>
//         </div>

//         <ScrollArea className="flex-1 p-4">
//           <div className="space-y-4">
//             {messages.length === 0 ? (
//               <div className="text-center py-10">
//                 <Bot className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
//                 <h3 className="text-lg font-medium mb-2">How can I help you today?</h3>
//                 <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
//                   You can talk to me about how you are feeling, and I will try to help.
//                 </p>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl mx-auto">
//                   {suggestedQuestions.map((question, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setInput(question)}
//                       className="text-sm text-left p-3 bg-secondary rounded-md hover:bg-secondary/80 transition-colors flex items-start"
//                     >
//                       <CornerLeftUp className="h-3.5 w-3.5 mr-2 mt-0.5 flex-shrink-0" />
//                       {question}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               messages.map((message, index) => (
//                 <div
//                   key={index}
//                   className={`flex ${
//                     message.type === MessageType.User ? "justify-end" : "justify-start"
//                   }`}
//                 >
//                   <div
//                     className={`max-w-[80%] rounded-lg p-3 ${
//                       message.type === MessageType.User
//                         ? "bg-primary text-primary-foreground"
//                         : (message as any).subtype === "diagnosis"
//                         ? "bg-red-100 text-red-900 border border-red-300"
//                         : "bg-muted"
//                     }`}
//                   >
//                     <div className="flex items-center mb-1">
//                       {message.type === MessageType.User ? (
//                         <>
//                           <span className="text-xs font-medium">You</span>
//                           <User className="h-3.5 w-3.5 ml-1" />
//                         </>
//                       ) : (
//                         <>
//                           <Bot className="h-3.5 w-3.5 mr-1" />
//                           <span className="text-xs font-medium">
//                             {(message as any).subtype === "diagnosis" ? "AI Diagnosis" : "AI Assistant"}
//                           </span>
//                         </>
//                       )}
//                     </div>
//                     <div className="text-sm whitespace-pre-wrap">{message.content}</div>
//                   </div>
//                 </div>
//               ))
//             )}

//             {isTyping && (
//               <div className="flex justify-start">
//                 <div className="bg-muted rounded-lg p-3">
//                   <div className="flex items-center mb-1">
//                     <Bot className="h-3.5 w-3.5 mr-1" />
//                     <span className="text-xs font-medium">AI Assistant</span>
//                   </div>
//                   <div className="flex space-x-1">
//                     <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
//                     <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
//                     <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div ref={endOfMessagesRef} />
//           </div>
//         </ScrollArea>

//         <form onSubmit={handleSubmit} className="p-4 border-t">
//           <div className="flex gap-2">
//             <Input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Type your message..."
//               className="flex-1"
//             />
//             <Button type="submit" size="icon" disabled={!input.trim()}>
//               {isTyping ? (
//                 <Loader2 className="h-4 w-4 animate-spin" />
//               ) : (
//                 <Send className="h-4 w-4" />
//               )}
//             </Button>
//           </div>

//           <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
//             <div className="flex items-center">
//               <Bot className="h-3.5 w-3.5 mr-1" />
//               <span>Powered by AI</span>
//             </div>
//             <button type="button" className="hover:text-foreground">
//               <Mic className="h-3.5 w-3.5" />
//             </button>
//           </div>
//         </form>
//       </div>
//     </DashboardLayout>
//   );
// }


"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageSquare, Send, Bot, User, CornerLeftUp,
  Mic, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { LanguageSelector } from "@/components/features/language/LanguageSelector";

interface Message {
  role: "user" | "bot";
  content: string;
}

// Mock useChatbot hook
const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const suggestedQuestions = [
    "What should I do during an earthquake?",
    "How can I prepare for a flood?",
    "What are first aid steps for a burn?",
    "How do I stay safe during a wildfire?"
  ];

  const sendMessage = (content: string, role: "user" | "bot" = "user") => {
    setMessages((prev) => [...prev, { role, content }]);
    if (role === "user") setIsProcessing(true);
    else setIsProcessing(false);
  };

  return { messages, sendMessage, isProcessing, suggestedQuestions };
};

const fetchLLMResponse = async (responses: { [key: string]: string }, chatHistory: { role: string; content: string }[]) => {
  try {
    const res = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        responses,
        chat_history: chatHistory
      }),
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const result = await res.json();
    if (!result.response || !result.chat_history) {
      throw new Error("Invalid response from server");
    }

    return result;
  } catch (error) {
    console.error("Error:", error);
    return {
      response: "Sorry, I couldn't process your request. Please try again.",
      chat_history: chatHistory
    };
  }
};

export default function ChatbotPage() {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, isProcessing, suggestedQuestions } = useChatbot();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMessage = input;
    const newUserMessage = { role: "user", content: userMessage };
    setChatHistory([...chatHistory, newUserMessage]);
    sendMessage(userMessage, "user");
    setInput("");
    setIsTyping(true);

    const responses = { message: userMessage };
    const botReply = await fetchLLMResponse(responses, chatHistory);

    setChatHistory(botReply.chat_history);
    sendMessage(botReply.response, "bot");
    setIsTyping(false);
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
            <h2 className="font-semibold">Disaster Response Assistant</h2>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Ask about disaster preparedness or response. Get clear, actionable advice.
          </p>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-10">
                <Bot className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">How can I help you today?</h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                  Ask about handling earthquakes, floods, fires, or medical emergencies.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl mx-auto">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(question)}
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
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <div className="flex items-center mb-1">
                      {message.role === "user" ? (
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
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
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
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
              {isTyping ? (
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