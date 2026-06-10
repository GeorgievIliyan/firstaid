"use client";

type TabType = "chat" | "history" | "tab3" | "tab4";

interface TabContentProps {
  activeTab: TabType;
  historyData?: string[];
  diseasesData?: string[];
}

export function TabContent({ activeTab, historyData = [], diseasesData = [] }: TabContentProps) {
  if (activeTab === "chat") {
    return null;
  }

  if (activeTab === "history") {
    return (
      <div className="flex-1 w-full px-6 py-6 flex flex-col gap-4 max-w-3xl overflow-y-auto">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
          История на заболяването (HPI)
        </h3>
        {historyData.length > 0 ? (
          <div className="flex flex-col gap-3">
            {historyData.map((paragraph, index) => (
              <p
                key={index}
                className="text-body font-body text-default-font bg-neutral-50 p-4 rounded-lg border border-neutral-200 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-body font-body text-subtext-color italic">Няма налична история.</p>
        )}
      </div>
    );
  }

  if (activeTab === "tab3") {
    return (
      <div className="flex-1 w-full px-6 py-6 flex flex-col gap-4 max-w-3xl overflow-y-auto">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Придружаващи заболявания и проблеми
        </h3>
        {diseasesData.length > 0 ? (
          <div className="flex flex-col gap-2">
            {diseasesData.map((disease, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-body font-body text-default-font bg-neutral-50 p-3 rounded-lg border border-neutral-200"
              >
                <div className="h-2 w-2 rounded-full bg-brand-primary shrink-0" />
                {disease}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-body font-body text-subtext-color italic">Няма регистрирани заболявания.</p>
        )}
      </div>
    );
  }

  if (activeTab === "tab4") {
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