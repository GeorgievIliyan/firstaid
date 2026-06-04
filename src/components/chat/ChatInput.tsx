"use client";

import { Button } from "../../ui/components/Button/Button";
import { TextArea } from "../../ui/components/TextArea/TextArea";

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
    <div className="flex w-full items-start justify-center border-t border-solid border-neutral-200 px-6 py-4">
      <TextArea
        className="h-auto grow shrink-0 basis-0"
        variant="filled"
        label=""
        helpText=""
      >
        <TextArea.Input
          placeholder="Чат"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </TextArea>
      <Button
        variant="brand-primary"
        size="small"
        onClick={onSend}
        className="ml-2"
      >
        Изпрати
      </Button>
    </div>
  );
}