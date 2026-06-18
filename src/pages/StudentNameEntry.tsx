import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge, Button, DefaultPageLayout, TextField } from "../ui";

export default function StudentNameEntry() {
  const navigate = useNavigate();
  const location = useLocation();
  const payload = location.state as any;
  const scenario = payload?.scenario;
  const [studentName, setStudentName] = useState("");
  const [wasSubmitted, setWasSubmitted] = useState(false);

  useEffect(() => {
    if (!scenario) {
      navigate("/scenario-chooser", { replace: true });
    }
  }, [navigate, scenario]);

  const hasName = studentName.trim().length > 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setWasSubmitted(true);

    if (!hasName) {
      return;
    }

    navigate("/session", {
      state: {
        scenario,
        studentName: studentName.trim(),
      },
    });
  };

  return (
    <DefaultPageLayout>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="space-y-4">
          <div className="space-y-2">
            <p className="text-caption-bold font-caption-bold uppercase text-brand-700">
              Подготовка за сесия
            </p>
            <h1 className="text-heading-1 font-heading-1">
              Въведи името на изследващия студент
            </h1>
            <p className="text-body text-default-text">
              Името на студента е задължително за протокола и трябва да бъде попълнено преди началото на тренировка.
            </p>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1fr_320px]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <TextField
              label="Изследващ студент"
              error={wasSubmitted && !hasName}
              helpText={wasSubmitted && !hasName ? "Моля въведи името на студента." : undefined}
            >
              <TextField.Input
                value={studentName}
                onChange={(event) => setStudentName(event.target.value)}
                placeholder="Иван Иванов"
              />
            </TextField>

            <div className="flex flex-wrap gap-3">
              <Button type="submit" variant="brand-primary" size="large">
                Продължи към сесия
              </Button>
              <Button
                type="button"
                variant="neutral-secondary"
                size="large"
                onClick={() => navigate("/scenario-chooser")}
              >
                Назад към избора
              </Button>
            </div>
          </form>

          <aside className="space-y-5 rounded-3xl border border-neutral-border bg-default-background p-5">
            <div className="flex flex-wrap gap-2">
              <Badge variant="neutral">{scenario?.scenario?.metadata?.category}</Badge>
              <Badge
                variant={
                  scenario?.scenario?.metadata?.difficulty === "advanced"
                    ? "error"
                    : scenario?.scenario?.metadata?.difficulty === "intermediate"
                    ? "warning"
                    : "success"
                }
              >
                {scenario?.scenario?.metadata?.difficulty === "beginner"
                  ? "Начинаещ"
                  : scenario?.scenario?.metadata?.difficulty === "intermediate"
                  ? "Средно"
                  : "Напреднали"}
              </Badge>
            </div>
            <div className="space-y-3">
              <p className="text-caption font-caption text-neutral-500">
                Резюме на случая
              </p>
              <p className="text-body text-default-text">
                {scenario?.scenario?.metadata?.description}
              </p>
            </div>
            <div className="space-y-2">
              <span className="block text-caption font-caption text-neutral-500">
                Основна причина
              </span>
              <p className="text-body text-default-text">
                {scenario?.scenario?.presentation?.chief_complaint ?? "Няма информация"}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <span className="block text-caption font-caption text-neutral-500">
                  Продължителност
                </span>
                <span className="block text-body font-body text-default-font">
                  {scenario?.scenario?.metadata?.estimatedDuration ?? "-"} мин.
                </span>
              </div>
              <div>
                <span className="block text-caption font-caption text-neutral-500">
                  Пациент
                </span>
                <span className="block text-body font-body text-default-font">
                  {scenario?.scenario?.patient?.age ?? "-"} г., {scenario?.scenario?.patient?.gender ?? "-"}
                </span>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </DefaultPageLayout>
  );
}
