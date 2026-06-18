import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, DefaultPageLayout, Select, TextField } from "../ui";
import { getCategoryLabel } from "../ui/utils";
import { ScenarioCard } from "../components/ScenarioCard";
import { useLoadScenarios, type ScenarioItem } from "../hooks/useLoadScenarios";

const difficultyOptions = [
  { value: "all", label: "Всички" },
  { value: "beginner", label: "Начинаещ" },
  { value: "intermediate", label: "Средно" },
  { value: "advanced", label: "Напреднали" },
];

const sortOptions = [
  { value: "title", label: "Име" },
  { value: "duration", label: "Продължителност" },
  { value: "difficulty", label: "Сложност" },
];

function getDifficultyRank(value: string) {
  return value === "beginner" ? 0 : value === "intermediate" ? 1 : value === "advanced" ? 2 : 3;
}

export default function ScenarioChooser() {
  const navigate = useNavigate();
  const { scenarios, loading, error } = useLoadScenarios();
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(scenarios.map((item) => item.scenario.metadata.category || "other")),
    );
    return ["all", ...unique];
  }, [scenarios]);

  const filteredScenarios = useMemo(() => {
    return scenarios
      .filter((item) => {
        const difficultyMatch =
          selectedDifficulty === "all" ||
          item.scenario.metadata.difficulty === selectedDifficulty;
        const categoryMatch =
          selectedCategory === "all" ||
          item.scenario.metadata.category === selectedCategory;
        const searchText = `${item.scenario.metadata.title} ${item.scenario.metadata.description} ${item.scenario.presentation?.chief_complaint}`.toLowerCase();
        const queryMatch = searchText.includes(searchQuery.trim().toLowerCase());
        return difficultyMatch && categoryMatch && queryMatch;
      })
      .sort((a, b) => {
        if (sortBy === "duration") {
          return a.scenario.metadata.estimatedDuration - b.scenario.metadata.estimatedDuration;
        }
        if (sortBy === "difficulty") {
          return getDifficultyRank(a.scenario.metadata.difficulty) - getDifficultyRank(b.scenario.metadata.difficulty);
        }
        return a.scenario.metadata.title.localeCompare(b.scenario.metadata.title, "bg", {
          sensitivity: "base",
        });
      });
  }, [scenarios, selectedDifficulty, selectedCategory, searchQuery, sortBy]);

  const handleSelectScenario = (scenario: ScenarioItem) => {
    navigate("/student-name", { state: { scenario } });
  };

  return (
    <DefaultPageLayout>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="space-y-4">
          <div className="space-y-2">
            <p className="text-caption-bold font-caption-bold uppercase text-brand-700">
              Сценарии за обучение
            </p>
            <h1 className="text-heading-1 font-heading-1">
              Избери неизвестен случай
            </h1>
            <p className="text-body text-default-text">
              Избери казус без заглавие, виж контекста на пациентa и продължи към попълване на името на студента.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="neutral-secondary" onClick={() => { setSearchQuery(""); setSelectedCategory("all"); setSelectedDifficulty("all"); setSortBy("title"); }}>
              Изчисти филтри
            </Button>
            <Button variant="brand-secondary" onClick={() => navigate("/scenario-chooser")}>
              Обнови списъка
            </Button>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-5 rounded-3xl border border-neutral-border bg-default-background p-5">
            <TextField label="Търсене">
              <TextField.Input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Търси по ключова дума"
              />
            </TextField>

            <Select
              label="Категория"
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              placeholder="Всички категории"
            >
              <Select.Item value="all">Всички категории</Select.Item>
              {categories.filter((category) => category !== "all").map((category) => (
                <Select.Item key={category} value={category}>
                  {getCategoryLabel(category)}
                </Select.Item>
              ))}
            </Select>

            <div className="space-y-3">
              <p className="text-caption-bold font-caption-bold">Сложност</p>
              <div className="flex flex-wrap gap-2">
                {difficultyOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={selectedDifficulty === option.value ? "brand-primary" : "neutral-secondary"}
                    onClick={() => setSelectedDifficulty(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            <Select
              label="Сортирай"
              value={sortBy}
              onValueChange={setSortBy}
              placeholder="Име"
            >
              {sortOptions.map((option) => (
                <Select.Item key={option.value} value={option.value}>
                  {option.label}
                </Select.Item>
              ))}
            </Select>
          </aside>

          <section className="space-y-5">
            {loading ? (
              <div className="rounded-3xl border border-neutral-border bg-white p-6 text-center text-default-text">
                Зареждане на сценарии…
              </div>
            ) : error ? (
              <div className="rounded-3xl border border-error-200 bg-error-50 p-6 text-default-text text-error-700">
                {error}
              </div>
            ) : filteredScenarios.length === 0 ? (
              <div className="rounded-3xl border border-neutral-border bg-white p-6 text-default-text">
                Няма сценарии, които отговарят на текущите филтри или търсене.
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredScenarios.map((scenario) => (
                  <ScenarioCard
                    key={scenario._source ?? scenario.scenario.metadata.id}
                    scenario={scenario}
                    onSelect={handleSelectScenario}
                  />
                ))}
              </div>
            )}
          </section>
        </section>
      </div>
    </DefaultPageLayout>
  );
}
