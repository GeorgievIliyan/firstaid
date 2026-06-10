"use client";

import { useState } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatTabs } from "./ChatTabs";
import { ChatMessagesList } from "./ChatMessagesList";
import { ChatInput } from "./ChatInput";
import { TabContent } from "./TabContent";

interface Message {
  id: number;
  text: string;
  sender: "patient" | "examiner";
  timestamp: string;
}

interface ChatContainerProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  onResetChat: () => void;
}

type TabType = "chat" | "history" | "tab3" | "tab4";

export function ChatContainer({ messages, onSendMessage, onResetChat }: ChatContainerProps) {
  const [newMessage, setNewMessage] = useState<string>("");
  const [activeTab, setActiveTab] = useState<TabType>("chat");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    onSendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col items-start border-r border-solid border-neutral-200 w-55/100 h-full mobile:w-full mobile:border-r-0 mobile:border-b">
      <ChatHeader onResetChat={onResetChat} />
      <ChatTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex w-full flex-col items-start flex-1" style={{ height: "500px" }}>
        {activeTab === "chat" && (
          <>
            <ChatMessagesList messages={messages} />
            <ChatInput
              value={newMessage}
              onChange={setNewMessage}
              onSend={handleSendMessage}
            />
          </>
        )}
        <TabContent activeTab={activeTab} />
      </div>
    </div>
  );
}