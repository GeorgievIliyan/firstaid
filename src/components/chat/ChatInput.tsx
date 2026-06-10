"use client";

import { Button } from "../../ui/components/Button/Button";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

export function ChatInput({ value, onChange, onSend }: ChatInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex w-full items-center gap-2 border-t border-solid border-neutral-200 px-6 py-4">
      <input
        type="text"
        className="flex-1 rounded-md border border-solid border-neutral-300 bg-white px-4 py-3 text-body-large font-body-large text-default-font placeholder:text-subtext-color focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
        placeholder="Чат"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Button
        variant="brand-primary"
        size="medium"
        onClick={onSend}
        className="h-[48px] whitespace-nowrap"
      >
        Изпрати
      </Button>
    </div>
  );
}