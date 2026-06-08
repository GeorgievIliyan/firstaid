"use client";

import { useState } from "react";
import { ChatContainer } from "../chat/ChatContainer";
import { SideMenuContainer } from "../vitals/SideMenuContainer";

interface Message {
  id: number;
  text: string;
  sender: "patient" | "examiner";
  timestamp: string;
}

interface ClinicalNote {
  id: number;
  text: string;
  timestamp: string;
}

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

export default function SessionPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Помощ! Гърдите много ме болят и не мога да дишам добре. Сърцето ми бие много бързо и усещам силно стягане от лявата страна. Страх ме е, че получавам инфаркт!",
      sender: "patient",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const [clinicalNotes] = useState<ClinicalNote[]>([
    {
      id: 1,
      text: "Пациентката постъпва с остра болка в гърдите, тахикардия и затруднено дишане. Необходима е незабавна оценка на сърдечния статус.",
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      id: 2,
      text: "ЕКГ показва синусова тахикардия. Кръвното налягане е леко повишено. Високорисков профил поради фамилна анамнеза за диабет.",
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      id: 3,
      text: "Диференциална диагноза: остър коронарен синдром, паник атака, перикардит. Препоръчва се кардиологична консултация.",
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      id: 4,
      text: "План: мониториране на витални показатели, ЕКГ на всеки 30 минути, подготовка за евентуална тромболиза при потвърждаване на STEMI.",
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      id: 5,
      text: "Оценка на рискови фактори: захарен диабет тип 2 (фамилна обремененост), хипертония, затлъстяване. Възрастта е нетипична, но не изключва сърдечна патология.",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const [vitalSigns, setVitalSigns] = useState<VitalSigns>({
    heartRate: 112,
    bloodGlucose: 145,
    systolicBP: 145,
    diastolicBP: 92,
    respiration: 24,
    spO2: 94,
    temperature: 37.2,
    temperatureEnabled: true,
  });

  const handleSendMessage = (messageText: string) => {
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        text: messageText,
        sender: "examiner",
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 1,
        text: "Помощ! Гърдите много ме болят и не мога да дишам добре. Сърцето ми бие много бързо и усещам силно стягане от лявата страна. Страх ме е, че получавам инфаркт!",
        sender: "patient",
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const adjustVitalSign = (field: keyof VitalSigns, amount: number) => {
    setVitalSigns((prev) => ({
      ...prev,
      [field]: typeof prev[field] === 'number' ? Math.max(0, (prev[field] as number) + amount) : prev[field],
    }));
  };

  const toggleTemperature = () => {
    setVitalSigns((prev) => ({
      ...prev,
      temperatureEnabled: !prev.temperatureEnabled,
    }));
  };

  return (
    <div className="flex h-screen w-screen flex-col bg-neutral-50 overflow-hidden">
      <div className="flex w-full max-w-full h-full flex-col rounded-lg bg-default-background shadow-lg">
        <div className="flex w-full items-center justify-center border-b border-solid border-neutral-200 px-6 py-4 mobile:flex-col mobile:items-start mobile:justify-start mobile:gap-4">
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-1">
              <span className="text-caption font-caption text-brand-primary">
                Спешни случаи
              </span>
              <span className="text-caption font-caption text-neutral-400">
                /
              </span>
            </div>
            <span className="text-heading-2 font-heading-2 text-default-font">
              Остра сърдечна симптоматика при млада пациентка с диабетен профил
            </span>
          </div>
        </div>
        <div className="flex w-full flex-1 items-stretch overflow-hidden mobile:flex-col">
          <ChatContainer
            messages={messages}
            onSendMessage={handleSendMessage}
            onResetChat={handleResetChat}
          />
          <SideMenuContainer
            vitalSigns={vitalSigns}
            clinicalNotes={clinicalNotes}
            onAdjustVitalSign={adjustVitalSign}
            onToggleTemperature={toggleTemperature}
          />
        </div>
      </div>
    </div>
  );
}