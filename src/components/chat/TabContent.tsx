"use client";

type TabType = "chat" | "history" | "tab3" | "tab4";

interface TabContentProps {
  activeTab: TabType;
}

export function TabContent({ activeTab }: TabContentProps) {
  if (activeTab === "history") {
    return (
      <div className="flex-1 w-full px-6 py-6">
        <span className="text-body font-body text-subtext-color">
          История на заболяването (HPI) - раздел в разработка
        </span>
      </div>
    );
  }

  if (activeTab === "tab3" || activeTab === "tab4") {
    return (
      <div className="flex-1 w-full px-6 py-6">
        <span className="text-body font-body text-subtext-color">
          Раздел в разработка
        </span>
      </div>
    );
  }

  return null;
}