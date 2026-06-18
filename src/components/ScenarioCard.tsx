import { Badge, Button } from "../ui";
import { getCategoryLabel, getDifficultyLabel } from "../ui/utils";
import type { ScenarioItem } from "../hooks/useLoadScenarios";

interface ScenarioCardProps {
  scenario: ScenarioItem;
  onSelect: (scenario: ScenarioItem) => void;
  selected?: boolean;
}

const difficultyVariant: Record<string, "success" | "warning" | "error" | "neutral"> = {
  beginner: "success",
  intermediate: "warning",
  advanced: "error",
};

export function ScenarioCard({ scenario, onSelect, selected }: ScenarioCardProps) {
  const metadata = scenario.scenario.metadata;
  const presentation = scenario.scenario.presentation;

  return (
    <article
      className={`rounded-3xl border p-5 shadow-sm h-full ${selected ? "border-brand-300 bg-brand-50" : "border-neutral-200 bg-white"}`}
      aria-label="Анонимен сценарий за обучение"
    >
      <div className="flex h-full flex-col">
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge variant="neutral">{getCategoryLabel(metadata.category)}</Badge>
          <Badge variant={difficultyVariant[metadata.difficulty] ?? "neutral"}>
            {getDifficultyLabel(metadata.difficulty)}
          </Badge>
        </div>

        <h2 className="mb-2 text-lg font-semibold text-default-font">
          {metadata.title}
        </h2>

        <p className="mb-4 text-sm leading-6 text-default-text">
          {metadata.description}
        </p>

        <div className="mb-4 flex-1 overflow-hidden text-sm text-default-text">
          <div className="space-y-3 h-full overflow-auto pr-1">
            <div>
              <span className="block text-caption font-caption text-neutral-500">
                Основна причина
              </span>
              <span className="block text-body font-body text-default-font">
                {presentation?.chief_complaint ?? "Няма налични детайли"}
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <span className="block text-caption font-caption text-neutral-500">
                  Продължителност
                </span>
                <span className="block text-body font-body text-default-font">
                  {metadata.estimatedDuration} мин.
                </span>
              </div>
              <div>
                <span className="block text-caption font-caption text-neutral-500">
                  Пациент
                </span>
                <span className="block text-body font-body text-default-font">
                  {scenario.scenario.patient?.age ?? "-"} г., {scenario.scenario.patient?.gender === "male" ? "мъж" : scenario.scenario.patient?.gender === "female" ? "жена" : "-"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Button
          variant={selected ? "brand-primary" : "brand-secondary"}
          size="large"
          onClick={() => onSelect(scenario)}
          className="w-full"
        >
          {selected ? "Избрано" : "Избери този случай"}
        </Button>
      </div>
    </article>
  );
}
