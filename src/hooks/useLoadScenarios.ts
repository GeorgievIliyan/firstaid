import { useEffect, useState } from "react";

export interface ScenarioItem {
  scenario: {
    metadata: {
      id: string;
      title: string;
      description: string;
      category: string;
      difficulty: string;
      estimatedDuration: number;
      language?: string;
      version?: string;
    };
    patient?: {
      age?: number;
      gender?: string;
      name?: string;
    };
    presentation?: {
      chief_complaint?: string;
    };
    [key: string]: unknown;
  };
  _source?: string;
}

const scenarioModules = import.meta.glob<ScenarioItem>("../scenarios/*.json", {
  eager: true,
});

export function useLoadScenarios() {
  const [scenarios, setScenarios] = useState<ScenarioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadScenarios = () => {
      const moduleEntries = Object.entries(scenarioModules);
      if (moduleEntries.length === 0) {
        if (isMounted) {
          setError("Не са намерени сценарии.");
          setLoading(false);
        }
        return;
      }

      const loaded: ScenarioItem[] = [];
      const loadErrors: string[] = [];

      for (const [path, scenarioPayload] of moduleEntries) {
        if (path.endsWith("/template.json")) {
          continue;
        }

        try {
          if (
            scenarioPayload?.scenario?.metadata?.title &&
            scenarioPayload?.scenario?.metadata?.id
          ) {
            loaded.push({
              ...scenarioPayload,
              _source: path,
            });
          } else {
            throw new Error("Невалидна структура на сценария");
          }
        } catch (error) {
          const fileName = path.split("/").pop()?.replace(/\.json$/, "") ?? path;
          loadErrors.push(`Неуспешно зареждане на сценарий ${fileName}`);
          console.error(`Scenario load error for ${path}:`, error);
        }
      }

      if (!isMounted) {
        return;
      }

      if (loaded.length === 0) {
        setError(loadErrors.join(". ") || "Неуспешно зареждане на сценарии.");
      } else {
        if (loadErrors.length > 0) {
          setError(
            `Някои сценарии не можаха да се заредят. ${loadErrors[0]}`,
          );
        }
        setScenarios(
          loaded.sort((a, b) =>
            a.scenario.metadata.title.localeCompare(
              b.scenario.metadata.title,
              "bg",
              { sensitivity: "base" },
            ),
          ),
        );
      }

      setLoading(false);
    };

    loadScenarios();

    return () => {
      isMounted = false;
    };
  }, []);

  return { scenarios, loading, error };
}
