"use client";

import { Avatar } from "../../ui/components/Avatar/Avatar";

interface Message {
  id: number;
  text: string;
  sender: "patient" | "examiner";
  timestamp: string;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={`flex w-full ${message.sender === "examiner"
          ? "flex-col items-end"
          : "items-start gap-2"
        }`}
    >
      {message.sender === "patient" && (
        <Avatar
          size="small"
          image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
        >
          I
        </Avatar>
      )}
      <div
        className={`flex max-w-[448px] flex-col items-start rounded-md px-3 py-2 ${message.sender === "examiner"
            ? "bg-brand-50"
            : "bg-neutral-100"
          }`}
      >
        <span className="text-body font-body text-default-font">
          {message.text}
        </span>
      </div>
    </div>
  );
}