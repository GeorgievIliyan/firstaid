"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui";

export function SessionCodeEntry() {
  const [sessionCode, setSessionCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/session')
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-white">
      <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-lg bg-default-background p-8">
        <input
          type="text"
          placeholder="Въведи код на сесия (напр. Af1ud#)"
          value={sessionCode}
          onChange={(e) => setSessionCode(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full rounded-md border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
        />

        <Button
          variant="brand-primary"
          size="large"
          onClick={handleSubmit}
          className="w-full"
        >
          Влез в сесия
        </Button>
      </div>
    </div>
  );
}