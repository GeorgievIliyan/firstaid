"use client";

import { FeatherActivity } from "@subframe/core";
import { FeatherChevronUp } from "@subframe/core";
import { FeatherChevronDown } from "@subframe/core";

interface ECGMonitorProps {
  heartRate: number;
  onAdjust: (amount: number) => void;
}

const ECGGraph = () => (
  <div className="flex h-32 items-center justify-center gap-20 overflow-hidden rounded-md relative flex-1">
    <div className="items-start absolute inset-0 grid grid-cols-12">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="flex items-start border-r border-solid border-neutral-200 border-opacity-30" />
      ))}
    </div>
    <img
      className="min-w-[0px] grow shrink-0 basis-0 self-stretch object-cover"
      src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0idy1mdWxsIGgtZnVsbCIgdmlld0JveD0iMCAwIDQwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTSAwIDUwIEwgNDAgNTAgTCA0NSA1MCBMIDQ3IDIwIEwgNTAgODAgTCA1MiA0NSBMIDU1IDUwIEwgODAgNTAgTCA4NSA1MCBMIDg3IDIwIEwgOTAgODAgTCA5MiA0NSBMIDk1IDUwIEwgMTIwIDUwIEwgMTI1IDUwIEwgMTI3IDIwIEwgMTMwIDgwIEwgMTMyIDQ1IEwgMTM1IDUwIEwgMTYwIDUwIEwgMTY1IDUwIEwgMTY3IDIwIEwgMTcwIDgwIEwgMTcyIDQ1IEwgMTc1IDUwIEwgMjAwIDUwIEwgMjA1IDUwIEwgMjA3IDIwIEwgMjEwIDgwIEwgMjEyIDQ1IEwgMjE1IDUwIEwgMjQwIDUwIEwgMjQ1IDUwIEwgMjQ3IDIwIEwgMjUwIDgwIEwgMjUyIDQ1IEwgMjU1IDUwIEwgMjgwIDUwIEwgMjg1IDUwIEwgMjg3IDIwIEwgMjkwIDgwIEwgMjkyIDQ1IEwgMjk1IDUwIEwgMzIwIDUwIEwgMzI1IDUwIEwgMzI3IDIwIEwgMzMwIDgwIEwgMzMyIDQ1IEwgMzM1IDUwIEwgMzYwIDUwIEwgMzY1IDUwIEwgMzY3IDIwIEwgMzcwIDgwIEwgMzcyIDQ1IEwgMzc1IDUwIEwgNDAwIDUwIiBzdHJva2U9InJnYigyMzkgNjggNjgpIiBzdHJva2Utd2lkdGg9IjEuNSIgZmlsbD0ibm9uZSIgdmVjdG9yLWVmZmVjdD0ibm9uLXNjYWxpbmctc3Ryb2tlIj48L3BhdGg+PC9zdmc+"
    />
  </div>
);

export function ECGMonitor({ heartRate, onAdjust }: ECGMonitorProps) {
  return (
    <div className="flex w-full flex-col items-start gap-3 border-b border-solid border-neutral-200 px-6 py-4">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <FeatherActivity className="text-body font-body text-default-font" />
          <span className="text-body-bold font-body-bold text-default-font">
            ECG/EKG
          </span>
        </div>
        <span className="text-caption font-caption text-error-600">
          Синусова тахикардия
        </span>
      </div>
      <div className="flex w-full items-center gap-3">
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1">
            <button
              onClick={() => onAdjust(-1)}
              className="flex items-center justify-center w-6 h-6 rounded hover:bg-neutral-100 text-subtext-color hover:text-default-font"
            >
              <FeatherChevronDown className="text-caption" />
            </button>
            <span className="text-heading-2 font-heading-2 text-default-font min-w-[60px] text-center">
              {heartRate}
            </span>
            <button
              onClick={() => onAdjust(1)}
              className="flex items-center justify-center w-6 h-6 rounded hover:bg-neutral-100 text-subtext-color hover:text-default-font"
            >
              <FeatherChevronUp className="text-caption" />
            </button>
          </div>
          <span className="text-caption font-caption text-subtext-color">
            bpm
          </span>
        </div>
        <ECGGraph />
      </div>
    </div>
  );
}