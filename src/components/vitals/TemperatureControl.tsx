"use client";

import { FeatherThermometer } from "@subframe/core";
import { FeatherPower } from "@subframe/core";
import { FeatherChevronUp } from "@subframe/core";
import { FeatherChevronDown } from "@subframe/core";

interface TemperatureControlProps {
  temperature: number;
  temperatureEnabled: boolean;
  onAdjustTemperature: (amount: number) => void;
  onToggle: () => void;
}

export function TemperatureControl({
  temperature,
  temperatureEnabled,
  onAdjustTemperature,
  onToggle
}: TemperatureControlProps) {
  return (
    <div className="flex w-full flex-col items-start gap-3 border-b border-solid border-neutral-200 px-6 py-4">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <FeatherThermometer className={`text-body font-body ${temperatureEnabled ? 'text-default-font' : 'text-neutral-400'}`} />
          <span className={`text-body-bold font-body-bold ${temperatureEnabled ? 'text-default-font' : 'text-neutral-500'}`}>
            Температура
          </span>
        </div>
        <div className="flex items-center gap-2">
          {temperatureEnabled && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => onAdjustTemperature(-0.1)}
                className="flex items-center justify-center w-5 h-5 rounded hover:bg-neutral-100 text-subtext-color hover:text-default-font"
              >
                <FeatherChevronDown className="text-caption" />
              </button>
              <span className="text-caption font-caption text-subtext-color min-w-[40px] text-center">
                {temperature.toFixed(1)}°C
              </span>
              <button
                onClick={() => onAdjustTemperature(0.1)}
                className="flex items-center justify-center w-5 h-5 rounded hover:bg-neutral-100 text-subtext-color hover:text-default-font"
              >
                <FeatherChevronUp className="text-caption" />
              </button>
            </div>
          )}
          <button
            onClick={onToggle}
            className={`flex items-center gap-1 px-2 py-1 rounded-md border text-caption font-caption transition-colors ${temperatureEnabled
              ? 'border-brand-primary bg-brand-50 text-brand-primary'
              : 'border-neutral-200 bg-neutral-50 text-neutral-500 hover:border-neutral-300 hover:text-neutral-600'
              }`}
          >
            <FeatherPower className="text-caption" />
            {temperatureEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
    </div>
  );
}