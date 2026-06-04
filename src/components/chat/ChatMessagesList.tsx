"use client";

import { useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";

interface Message {
  id: number;
  text: string;
  sender: "patient" | "examiner";
  timestamp: string;
}

interface ChatMessagesListProps {
  messages: Message[];
}

export function ChatMessagesList({ messages }: ChatMessagesListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-1 w-full overflow-y-auto px-6 py-6" style={{ maxHeight: "calc(100% - 80px)" }}>
      <div className="flex flex-col items-start gap-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}