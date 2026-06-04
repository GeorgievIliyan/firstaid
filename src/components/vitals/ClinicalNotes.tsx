"use client";

import { FeatherFileText } from "@subframe/core";

interface ClinicalNote {
  id: number;
  text: string;
  timestamp: string;
}

interface ClinicalNotesProps {
  notes: ClinicalNote[];
}

export function ClinicalNotes({ notes }: ClinicalNotesProps) {
  return (
    <div className="flex w-full flex-col items-start gap-3 px-6 py-4 flex-1">
      <div className="flex items-center gap-2">
        <FeatherFileText className="text-body font-body text-default-font" />
        <span className="text-body-bold font-body-bold text-default-font">
          Клинични бележки
        </span>
      </div>
      <div className="flex flex-col items-start gap-2 w-full overflow-y-auto" style={{ maxHeight: "200px" }}>
        {notes.map((note) => (
          <div key={note.id} className="flex flex-col items-start gap-1 w-full border-b border-solid border-neutral-100 pb-2">
            <span className="text-caption font-caption text-subtext-color">
              {note.text}
            </span>
            <span className="text-caption font-caption text-neutral-400">
              {note.timestamp}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}