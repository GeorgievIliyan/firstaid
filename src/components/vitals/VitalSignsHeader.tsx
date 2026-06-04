"use client";

export function VitalSignsHeader() {
  return (
    <div className="flex w-full items-center justify-between border-b border-solid border-neutral-200 px-6 py-4">
      <span className="text-heading-3 font-heading-3 text-default-font">
        Жизнени показатели
      </span>
      <div className="flex items-center gap-1">
        <div className="flex h-2 w-2 flex-none items-start rounded-full bg-error-500" />
        <span className="text-caption font-caption text-error-600">
          Спешно
        </span>
      </div>
    </div>
  );
}