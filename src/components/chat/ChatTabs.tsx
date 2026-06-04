"use client";

type TabType = "chat" | "history" | "tab3" | "tab4";

interface ChatTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs: Array<{ id: TabType; label: string }> = [
  { id: "chat", label: "Чат" },
  { id: "history", label: "История (HPI)" },
  { id: "tab3", label: "..." },
  { id: "tab4", label: "..." },
];

export function ChatTabs({ activeTab, onTabChange }: ChatTabsProps) {
  return (
    <div className="flex w-full items-start border-b border-solid border-neutral-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center justify-center py-3 flex-1 ${activeTab === tab.id
              ? "border-b-2 border-solid border-brand-primary"
              : "bg-neutral-50"
            }`}
        >
          <span className={`text-body font-body ${activeTab === tab.id ? "text-default-font font-body-bold" : "text-subtext-color"
            }`}>
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
}