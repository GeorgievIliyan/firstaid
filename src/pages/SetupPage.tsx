import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Select, TextField } from "../ui";
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
  { value: "duration", label: "Продължителност" },
  { value: "difficulty", label: "Сложност" },
  { value: "id", label: "Поредност" },
];

function getDifficultyRank(value: string) {
  return value === "beginner" ? 0 : value === "intermediate" ? 1 : value === "advanced" ? 2 : 3;
}

export default function SetupPage() {
  const navigate = useNavigate();
  const { scenarios, loading, error } = useLoadScenarios();
  const [selectedScenario, setSelectedScenario] = useState<ScenarioItem | null>(null);
  const [studentName, setStudentName] = useState("");
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("duration");

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
        return a.scenario.metadata.id.localeCompare(b.scenario.metadata.id, "bg", {
          sensitivity: "base",
        });
      });
  }, [scenarios, selectedDifficulty, selectedCategory, searchQuery, sortBy]);

  const selectedCategoryLabel = selectedCategory === "all" ? "Всички категории" : getCategoryLabel(selectedCategory);
  const selectedDifficultyEnabled = selectedDifficulty === "all" ? "Всички" : selectedDifficulty === "beginner" ? "Начинаещ" : selectedDifficulty === "intermediate" ? "Средно" : "Напреднали";
  const isFormValid = Boolean(selectedScenario && studentName.trim());

  const startSession = () => {
    setWasSubmitted(true);
    if (!isFormValid) {
      return;
    }

    const sessionPayload = {
      scenario: selectedScenario,
      studentName: studentName.trim(),
    };

    window.localStorage.setItem("firstaid_session", JSON.stringify(sessionPayload));

    navigate("/session", {
      state: sessionPayload,
    });
  };

  return (
    <main className="min-h-screen bg-default-background px-4 py-8 sm:px-6 lg:px-8 text-default-text">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <section className="space-y-4">
          <p className="text-caption-bold font-caption-bold uppercase text-brand-700">
            Сценарий и подготовка
          </p>
          <h1 className="text-heading-1 font-heading-1">
            Избери случай и въведи името на студента
          </h1>
          <p className="text-body text-default-text">
            Избери анонимен случай, попълни името на изследващия студент и започни сесията.
          </p>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-4">
              <TextField label="Търсене">
                <TextField.Input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
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
              <Select
                label="Сложност"
                value={selectedDifficulty}
                onValueChange={setSelectedDifficulty}
                placeholder="Всички"
              >
                {difficultyOptions.map((option) => (
                  <Select.Item key={option.value} value={option.value}>
                    {option.label}
                  </Select.Item>
                ))}
              </Select>
              <Select
                label="Сортиране"
                value={sortBy}
                onValueChange={setSortBy}
                placeholder="Поредност"
              >
                {sortOptions.map((option) => (
                  <Select.Item key={option.value} value={option.value}>
                    {option.label}
                  </Select.Item>
                ))}
              </Select>
            </div>

            {loading ? (
              <div className="rounded-3xl border border-neutral-border bg-white p-6 text-center text-default-text">
                Зареждане на сценарии…
              </div>
            ) : error ? (
              <div className="rounded-3xl border border-error-200 bg-error-50 p-6 text-error-700">
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
                    selected={selectedScenario?._source ? selectedScenario._source === scenario._source : selectedScenario?.scenario.metadata.id === scenario.scenario.metadata.id}
                    onSelect={(scenarioItem) => setSelectedScenario(scenarioItem)}
                  />
                ))}
              </div>
            )}
          </div>

          <aside className="space-y-6 rounded-3xl border border-neutral-border bg-white p-6">
            <div className="space-y-4">
              <p className="text-caption-bold font-caption-bold uppercase text-brand-700">
                Детайли за подготовка
              </p>
              <div className="space-y-3">
                <TextField
                  label="Изследващ студент"
                  error={wasSubmitted && !studentName.trim()}
                  helpText={wasSubmitted && !studentName.trim() ? "Моля въведете име на студента." : undefined}
                >
                  <TextField.Input
                    value={studentName}
                    onChange={(event) => setStudentName(event.target.value)}
                    placeholder="Иван Иванов"
                  />
                </TextField>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-caption font-caption text-neutral-500">Избрана категория</p>
                  <p className="text-body font-body text-default-font">{selectedCategoryLabel}</p>
                </div>
                <div>
                  <p className="text-caption font-caption text-neutral-500">Избрана сложност</p>
                  <p className="text-body font-body text-default-font">{selectedDifficultyEnabled}</p>
                </div>
              </div>
            </div>

            <Button
              variant={isFormValid ? "brand-primary" : "neutral-secondary"}
              size="large"
              onClick={startSession}
              className="w-full"
              disabled={!isFormValid}
            >
              Стартирай сесия
            </Button>
          </aside>
        </section>
      </div>
    </main>
  );
}
