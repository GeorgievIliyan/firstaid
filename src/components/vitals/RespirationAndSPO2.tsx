"use client";

import { FeatherWind } from "@subframe/core";
import { FeatherZap } from "@subframe/core";
import { FeatherChevronUp } from "@subframe/core";
import { FeatherChevronDown } from "@subframe/core";

interface RespirationAndSpO2Props {
  respiration: number;
  spO2: number;
  onAdjustRespiration: (amount: number) => void;
  onAdjustSpO2: (amount: number) => void;
}

const VitalGraph = ({ src }: { src: string }) => (
  <div className="flex h-16 flex-none items-center justify-center overflow-hidden rounded-md relative">
    <div className="items-start absolute inset-0 grid grid-cols-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex items-start border-r border-solid border-neutral-200 border-opacity-20" />
      ))}
    </div>
    <img
      className="min-w-[0px] grow shrink-0 basis-0 self-stretch object-cover"
      src={src}
    />
  </div>
);

export function RespirationAndSpO2({
  respiration,
  spO2,
  onAdjustRespiration,
  onAdjustSpO2
}: RespirationAndSpO2Props) {
  return (
    <div className="flex w-full items-start gap-3 border-b border-solid border-neutral-200 px-6 py-4">
      <div className="flex flex-col items-start gap-2 flex-1">
        <div className="flex w-full items-center justify-between">
          <span className="text-caption-bold font-caption-bold text-default-font">
            Респирация
          </span>
          <div className="flex items-center gap-1">
            <FeatherWind className="text-caption font-caption text-error-500" />
            <button
              onClick={() => onAdjustRespiration(-1)}
              className="flex items-center justify-center w-5 h-5 rounded hover:bg-neutral-100 text-subtext-color hover:text-default-font"
            >
              <FeatherChevronDown className="text-caption" />
            </button>
            <span className="text-caption font-caption text-error-600 min-w-[25px] text-center">
              {respiration}
            </span>
            <button
              onClick={() => onAdjustRespiration(1)}
              className="flex items-center justify-center w-5 h-5 rounded hover:bg-neutral-100 text-subtext-color hover:text-default-font"
            >
              <FeatherChevronUp className="text-caption" />
            </button>
            <span className="text-caption font-caption text-subtext-color">
              rpm
            </span>
          </div>
        </div>
        <VitalGraph src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDUwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0gMCAyNSBMIDIwIDI1IEwgMjUgMTUgTCAzMCAzNSBMIDM1IDI1IEwgNjAgMjUgTCA2NSAxNSBMIDcwIDM1IEwgNzUgMjUgTCAxMDAgMjUgTCAxMDUgMTUgTCAxMTAgMzUgTCAxMTUgMjUgTCAxNDAgMjUgTCAxNDUgMTUgTCAxNTAgMzUgTCAxNTUgMjUgTCAyMDAgMjUiIHN0cm9rZT0icmdiKDIzOSA2OCA2OCkiIHN0cm9rZS13aWR0aD0iMS41IiBmaWxsPSJub25lIiB2ZWN0b3ItZWZmZWN0PSJub24tc2NhbGluZy1zdHJva2UiPjwvcGF0aD48L3N2Zz4=" />
      </div>
      <div className="flex flex-col items-start gap-2 flex-1">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-1">
            <FeatherZap className="text-caption font-caption text-warning-500" />
            <span className="text-caption-bold font-caption-bold text-default-font">
              SpO₂
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onAdjustSpO2(-1)}
              className="flex items-center justify-center w-5 h-5 rounded hover:bg-neutral-100 text-subtext-color hover:text-default-font"
            >
              <FeatherChevronDown className="text-caption" />
            </button>
            <span className="text-caption font-caption text-warning-600 min-w-[30px] text-center">
              {spO2}%
            </span>
            <button
              onClick={() => onAdjustSpO2(1)}
              className="flex items-center justify-center w-5 h-5 rounded hover:bg-neutral-100 text-subtext-color hover:text-default-font"
            >
              <FeatherChevronUp className="text-caption" />
            </button>
          </div>
        </div>
        <VitalGraph src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDUwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0gMCAyNSBMIDIwIDI1IEwgMjUgMTUgTCAzMCAzNSBMIDM1IDI1IEwgNjAgMjUgTCA2NSAxNSBMIDcwIDM1IEwgNzUgMjUgTCAxMDAgMjUgTCAxMDUgMTUgTCAxMTAgMzUgTCAxMTUgMjUgTCAxNDAgMjUgTCAxNDUgMTUgTCAxNTAgMzUgTCAxNTUgMjUgTCAyMDAgMjUiIHN0cm9rZT0icmdiKDI0NSAxNTggMTEpIiBzdHJva2Utd2lkdGg9IjEuNSIgZmlsbD0ibm9uZSIgdmVjdG9yLWVmZmVjdD0ibm9uLXNjYWxpbmctc3Ryb2tlIj48L3BhdGg+PC9zdmc+" />
      </div>
    </div>
  );
}