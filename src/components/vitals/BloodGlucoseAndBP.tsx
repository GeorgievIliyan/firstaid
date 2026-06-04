"use client";

import { FeatherDroplet } from "@subframe/core";
import { FeatherHeart } from "@subframe/core";
import { FeatherChevronUp } from "@subframe/core";
import { FeatherChevronDown } from "@subframe/core";

interface VitalSigns {
  bloodGlucose: number;
  systolicBP: number;
  diastolicBP: number;
}

interface BloodGlucoseAndBPProps {
  vitalSigns: VitalSigns;
  onAdjustBloodGlucose: (amount: number) => void;
  onAdjustBP: (systolicAmount: number, diastolicAmount: number) => void;
}

const BloodGlucoseControl = ({ value, onAdjust }: { value: number; onAdjust: (amount: number) => void }) => (
  <div className="flex flex-col items-center justify-center gap-4 w-1/2">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <FeatherDroplet className="text-body-large font-body-large text-default-font" />
        <span className="text-body-large-bold font-body-large-bold text-default-font">
          Глюкоза в кръвта
        </span>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onAdjust(-5)}
            className="flex items-center justify-center w-8 h-8 rounded hover:bg-neutral-100 text-subtext-color hover:text-default-font"
          >
            <FeatherChevronDown className="text-body" />
          </button>
          <span className="text-display-2 font-display-2 text-default-font min-w-[90px] text-center">
            {value}
          </span>
          <button
            onClick={() => onAdjust(5)}
            className="flex items-center justify-center w-8 h-8 rounded hover:bg-neutral-100 text-subtext-color hover:text-default-font"
          >
            <FeatherChevronUp className="text-body" />
          </button>
        </div>
        <span className="text-body font-body text-subtext-color">
          mg/dL
        </span>
      </div>
    </div>
  </div>
);

const BloodPressureControl = ({ systolic, diastolic, onAdjust }: {
  systolic: number;
  diastolic: number;
  onAdjust: (systolicAmount: number, diastolicAmount: number) => void;
}) => (
  <div className="flex flex-col items-center justify-center gap-4 w-1/2">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <FeatherHeart className="text-body-large font-body-large text-default-font" />
        <span className="text-body-large-bold font-body-large-bold text-default-font">
          Кръвно Налягане
        </span>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onAdjust(-2, -1)}
            className="flex items-center justify-center w-8 h-8 rounded hover:bg-neutral-100 text-subtext-color hover:text-default-font"
          >
            <FeatherChevronDown className="text-body" />
          </button>
          <span className="text-display-2 font-display-2 text-default-font min-w-[130px] text-center">
            {systolic}/{diastolic}
          </span>
          <button
            onClick={() => onAdjust(2, 1)}
            className="flex items-center justify-center w-8 h-8 rounded hover:bg-neutral-100 text-subtext-color hover:text-default-font"
          >
            <FeatherChevronUp className="text-body" />
          </button>
        </div>
        <span className="text-body font-body text-subtext-color">
          mmHg
        </span>
      </div>
    </div>
  </div>
);

export function BloodGlucoseAndBP({ vitalSigns, onAdjustBloodGlucose, onAdjustBP }: BloodGlucoseAndBPProps) {
  return (
    <div className="flex w-full items-center border-b border-solid border-neutral-200 px-6 py-6">
      <BloodGlucoseControl value={vitalSigns.bloodGlucose} onAdjust={onAdjustBloodGlucose} />
      <BloodPressureControl
        systolic={vitalSigns.systolicBP}
        diastolic={vitalSigns.diastolicBP}
        onAdjust={onAdjustBP}
      />
    </div>
  );
}