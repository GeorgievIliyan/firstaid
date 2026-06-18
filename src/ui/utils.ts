import * as SubframeCore from "@subframe/core";

export const categoryLabelMap: Record<string, string> = {
  cardiac: "Сърдечни",
  respiratory: "Респираторни",
  trauma: "Травматични",
  neurological: "Неврологични",
  other: "Други",
  default: "Други",
};

export function getCategoryLabel(category: string | null | undefined) {
  const key = category?.trim() || "other";
  return categoryLabelMap[key] ?? key;
}

export const difficultyLabelMap: Record<string, string> = {
  beginner: "Начинаещ",
  intermediate: "Средно",
  advanced: "Напреднали",
};

export function getDifficultyLabel(difficulty: string | null | undefined) {
  const key = difficulty?.trim() || "";
  return difficultyLabelMap[key] ?? key;
}

export const twClassNames = SubframeCore.createTwClassNames([
  "text-caption",
  "text-caption-bold",
  "text-body",
  "text-body-bold",
  "text-heading-3",
  "text-heading-2",
  "text-heading-1",
  "text-monospace-body",
]);
