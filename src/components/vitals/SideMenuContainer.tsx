"use client";

import { VitalSignsHeader } from "./VitalSignsHeader";
import { ECGMonitor } from "./ECGMonitor";
import { BloodGlucoseAndBP } from "./BloodGlucoseAndBP";
import { RespirationAndSpO2 } from "./RespirationAndSPO2";
import { TemperatureControl } from "./TemperatureControl";
import { ClinicalNotes } from "./ClinicalNotes";

interface VitalSigns {
  heartRate: number;
  bloodGlucose: number;
  systolicBP: number;
  diastolicBP: number;
  respiration: number;
  spO2: number;
  temperature: number;
  temperatureEnabled: boolean;
}

interface ClinicalNote {
  id: number;
  text: string;
  timestamp: string;
}

interface SideMenuContainerProps {
  vitalSigns: VitalSigns;
  clinicalNotes: ClinicalNote[];
  onAdjustVitalSign: (field: keyof VitalSigns, amount: number) => void;
  onToggleTemperature: () => void;
}

export function SideMenuContainer({ 
  vitalSigns, 
  clinicalNotes, 
  onAdjustVitalSign, 
  onToggleTemperature 
}: SideMenuContainerProps) {
  return (
    <div className="flex flex-col items-start w-45/100 h-full overflow-hidden mobile:w-full mobile:flex-none">
      <VitalSignsHeader />
      <div className="flex flex-col w-full overflow-y-auto flex-1">
        <ECGMonitor 
          heartRate={vitalSigns.heartRate} 
          onAdjust={(amount) => onAdjustVitalSign("heartRate", amount)} 
        />
        <BloodGlucoseAndBP
          vitalSigns={vitalSigns}
          onAdjustBloodGlucose={(amount) => onAdjustVitalSign("bloodGlucose", amount)}
          onAdjustBP={(systolicAmount, diastolicAmount) => {
            onAdjustVitalSign("systolicBP", systolicAmount);
            onAdjustVitalSign("diastolicBP", diastolicAmount);
          }}
        />
        <RespirationAndSpO2
          respiration={vitalSigns.respiration}
          spO2={vitalSigns.spO2}
          onAdjustRespiration={(amount) => onAdjustVitalSign("respiration", amount)}
          onAdjustSpO2={(amount) => onAdjustVitalSign("spO2", amount)}
        />
        <TemperatureControl
          temperature={vitalSigns.temperature}
          temperatureEnabled={vitalSigns.temperatureEnabled}
          onAdjustTemperature={(amount) => onAdjustVitalSign("temperature", amount)}
          onToggle={onToggleTemperature}
        />
        <ClinicalNotes notes={clinicalNotes} />
      </div>
    </div>
  );
}