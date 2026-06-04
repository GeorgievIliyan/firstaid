"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar } from "./ui/components/Avatar/Avatar";
import { Button } from "./ui/components/Button/Button";
import { TextArea } from "./ui/components/TextArea/TextArea";
import { FeatherActivity } from "@subframe/core";
import { FeatherDroplet } from "@subframe/core";
import { FeatherFileText } from "@subframe/core";
import { FeatherHeart } from "@subframe/core";
import { FeatherPower } from "@subframe/core";
import { FeatherRefreshCw } from "@subframe/core";
import { FeatherThermometer } from "@subframe/core";
import { FeatherWind } from "@subframe/core";
import { FeatherZap } from "@subframe/core";
import { FeatherChevronUp } from "@subframe/core";
import { FeatherChevronDown } from "@subframe/core";

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

function Page() {
  const [activeTab, setActiveTab] = useState<"chat" | "history" | "tab3" | "tab4">("chat");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Помощ! Гърдите много ме болят и не мога да дишам добре. Сърцето ми бие много бързо и усещам силно стягане от лявата страна. Страх ме е, че получавам инфаркт!",
      sender: "patient",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [clinicalNotes, setClinicalNotes] = useState<ClinicalNote[]>([
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

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        text: newMessage,
        sender: "examiner",
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
          <div className="flex flex-col items-start border-r border-solid border-neutral-200 w-3/5 h-full mobile:w-3/5 mobile:border-r-0 mobile:border-b">
            <div className="flex w-full items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <Avatar
                  size="large"
                  image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
                >
                  I
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Ивана Георгиева (Пациент)
                  </span>
                  <span className="text-caption font-caption text-subtext-color">
                    8 г.д. момиче с остра болка в гърдите
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="brand-tertiary"
                  size="small"
                  icon={<FeatherFileText />}
                  onClick={() => { }}
                >
                  Картон
                </Button>
                <Button
                  variant="brand-tertiary"
                  size="small"
                  icon={<FeatherRefreshCw />}
                  onClick={() => {
                    setMessages([
                      {
                        id: 1,
                        text: "Помощ! Гърдите много ме болят и не мога да дишам добре. Сърцето ми бие много бързо и усещам силно стягане от лявата страна. Страх ме е, че получавам инфаркт!",
                        sender: "patient",
                        timestamp: new Date().toLocaleTimeString(),
                      },
                    ]);
                  }}
                >
                  Рестарт
                </Button>
              </div>
            </div>
            <div className="flex w-full items-start border-b border-solid border-neutral-200">
              <button
                onClick={() => setActiveTab("chat")}
                className={`flex items-center justify-center py-3 flex-1 ${activeTab === "chat"
                  ? "border-b-2 border-solid border-brand-primary"
                  : "bg-neutral-50"
                  }`}
              >
                <span className={`text-body font-body ${activeTab === "chat" ? "text-default-font font-body-bold" : "text-subtext-color"
                  }`}>
                  Чат
                </span>
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`flex items-center justify-center py-3 flex-1 ${activeTab === "history"
                  ? "border-b-2 border-solid border-brand-primary"
                  : "bg-neutral-50"
                  }`}
              >
                <span className={`text-body font-body ${activeTab === "history" ? "text-default-font font-body-bold" : "text-subtext-color"
                  }`}>
                  История (HPI)
                </span>
              </button>
              <button
                onClick={() => setActiveTab("tab3")}
                className={`flex items-center justify-center py-3 flex-1 ${activeTab === "tab3"
                  ? "border-b-2 border-solid border-brand-primary"
                  : "bg-neutral-50"
                  }`}
              >
                <span className={`text-body font-body ${activeTab === "tab3" ? "text-default-font font-body-bold" : "text-subtext-color"
                  }`}>
                  ...
                </span>
              </button>
              <button
                onClick={() => setActiveTab("tab4")}
                className={`flex items-center justify-center py-3 flex-1 ${activeTab === "tab4"
                  ? "border-b-2 border-solid border-brand-primary"
                  : "bg-neutral-50"
                  }`}
              >
                <span className={`text-body font-body ${activeTab === "tab4" ? "text-default-font font-body-bold" : "text-subtext-color"
                  }`}>
                  ...
                </span>
              </button>
            </div>
            <div className="flex w-full flex-col items-start flex-1" style={{ height: "500px" }}>
              {activeTab === "chat" && (
                <>
                  <div className="flex-1 w-full overflow-y-auto px-6 py-6" style={{ maxHeight: "calc(100% - 80px)" }}>
                    <div className="flex flex-col items-start gap-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex w-full ${message.sender === "examiner"
                            ? "flex-col items-end"
                            : "items-start gap-2"
                            }`}
                        >
                          {message.sender === "patient" && (
                            <Avatar
                              size="small"
                              image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
                            >
                              I
                            </Avatar>
                          )}
                          <div
                            className={`flex max-w-[448px] flex-col items-start rounded-md px-3 py-2 ${message.sender === "examiner"
                              ? "bg-brand-50"
                              : "bg-neutral-100"
                              }`}
                          >
                            <span className="text-body font-body text-default-font">
                              {message.text}
                            </span>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                  <div className="flex w-full items-start justify-center border-t border-solid border-neutral-200 px-6 py-4">
                    <TextArea
                      className="h-auto grow shrink-0 basis-0"
                      variant="filled"
                      label=""
                      helpText=""
                    >
                      <TextArea.Input
                        placeholder="Чат"
                        value={newMessage}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                    </TextArea>
                    <Button
                      variant="brand-primary"
                      size="small"
                      onClick={handleSendMessage}
                      className="ml-2"
                    >
                      Изпрати
                    </Button>
                  </div>
                </>
              )}
              {activeTab === "history" && (
                <div className="flex-1 w-full px-6 py-6">
                  <span className="text-body font-body text-subtext-color">
                    История на заболяването (HPI) - раздел в разработка
                  </span>
                </div>
              )}
              {activeTab === "tab3" && (
                <div className="flex-1 w-full px-6 py-6">
                  <span className="text-body font-body text-subtext-color">
                    Раздел в разработка
                  </span>
                </div>
              )}
              {activeTab === "tab4" && (
                <div className="flex-1 w-full px-6 py-6">
                  <span className="text-body font-body text-subtext-color">
                    Раздел в разработка
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-start w-2/5 h-full overflow-hidden mobile:w-full mobile:flex-none">
            <div className="flex w-full items-center justify-between border-b border-solid border-neutral-200 px-6 py-4">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Жизнени показатели
              </span>
              <div className="flex items-center gap-1">
                <div className="flex h-2 w-2 flex-none items-start rounded-full bg-error-500" />
                <span className="text-caption font-caption text-error-600">
                  Спешно
                </span>
              </div>
            </div>
            <div className="flex flex-col w-full overflow-y-auto flex-1">
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
                        onClick={() => adjustVitalSign("heartRate", -1)}
                        className="flex items-center justify-center w-6 h-6 rounded hover:bg-neutral-100 text-subtext-color hover:text-default-font"
                      >
                        <FeatherChevronDown className="text-caption" />
                      </button>
                      <span className="text-heading-2 font-heading-2 text-default-font min-w-[60px] text-center">
                        {vitalSigns.heartRate}
                      </span>
                      <button
                        onClick={() => adjustVitalSign("heartRate", 1)}
                        className="flex items-center justify-center w-6 h-6 rounded hover:bg-neutral-100 text-subtext-color hover:text-default-font"
                      >
                        <FeatherChevronUp className="text-caption" />
                      </button>
                    </div>
                    <span className="text-caption font-caption text-subtext-color">
                      bpm
                    </span>
                  </div>
                  <div className="flex h-32 items-center justify-center gap-20 overflow-hidden rounded-md relative flex-1">
                    <div className="items-start absolute inset-0 grid grid-cols-12">
                      <div className="flex items-start border-r border-solid border-neutral-200 border-opacity-30" />
                      <div className="flex items-start border-r border-solid border-neutral-200 border-opacity-30" />
                      <div className="flex items-start border-r border-solid border-neutral-200 border-opacity-30" />
                      <div className="flex items-start border-r border-solid border-neutral-200 border-opacity-30" />
                      <div className="flex items-start border-r border-solid border-neutral-200 border-opacity-30" />
                      <div className="flex items-start border-r border-solid border-neutral-200 border-opacity-30" />
                      <div className="flex items-start border-r border-solid border-neutral-200 border-opacity-30" />
                      <div className="flex items-start border-r border-solid border-neutral-200 border-opacity-30" />
                      <div className="flex items-start border-r border-solid border-neutral-200 border-opacity-30" />
                      <div className="flex items-start border-r border-solid border-neutral-200 border-opacity-30" />
                      <div className="flex items-start border-r border-solid border-neutral-200 border-opacity-30" />
                      <div className="flex items-start border-r border-solid border-neutral-200 border-opacity-30" />
                    </div>
                    <img
                      className="min-w-[0px] grow shrink-0 basis-0 self-stretch object-cover"
                      src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0idy1mdWxsIGgtZnVsbCIgdmlld0JveD0iMCAwIDQwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTSAwIDUwIEwgNDAgNTAgTCA0NSA1MCBMIDQ3IDIwIEwgNTAgODAgTCA1MiA0NSBMIDU1IDUwIEwgODAgNTAgTCA4NSA1MCBMIDg3IDIwIEwgOTAgODAgTCA5MiA0NSBMIDk1IDUwIEwgMTIwIDUwIEwgMTI1IDUwIEwgMTI3IDIwIEwgMTMwIDgwIEwgMTMyIDQ1IEwgMTM1IDUwIEwgMTYwIDUwIEwgMTY1IDUwIEwgMTY3IDIwIEwgMTcwIDgwIEwgMTcyIDQ1IEwgMTc1IDUwIEwgMjAwIDUwIEwgMjA1IDUwIEwgMjA3IDIwIEwgMjEwIDgwIEwgMjEyIDQ1IEwgMjE1IDUwIEwgMjQwIDUwIEwgMjQ1IDUwIEwgMjQ3IDIwIEwgMjUwIDgwIEwgMjUyIDQ1IEwgMjU1IDUwIEwgMjgwIDUwIEwgMjg1IDUwIEwgMjg3IDIwIEwgMjkwIDgwIEwgMjkyIDQ1IEwgMjk1IDUwIEwgMzIwIDUwIEwgMzI1IDUwIEwgMzI3IDIwIEwgMzMwIDgwIEwgMzMyIDQ1IEwgMzM1IDUwIEwgMzYwIDUwIEwgMzY1IDUwIEwgMzY3IDIwIEwgMzcwIDgwIEwgMzcyIDQ1IEwgMzc1IDUwIEwgNDAwIDUwIiBzdHJva2U9InJnYigyMzkgNjggNjgpIiBzdHJva2Utd2lkdGg9IjEuNSIgZmlsbD0ibm9uZSIgdmVjdG9yLWVmZmVjdD0ibm9uLXNjYWxpbmctc3Ryb2tlIj48L3BhdGg+PC9zdmc+"
                    />
                  </div>
                </div>
              </div>
              <div className="flex w-full items-center border-b border-solid border-neutral-200 px-6 py-6">
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
                          onClick={() => adjustVitalSign("bloodGlucose", -5)}
                          className="flex items-center justify-center w-8 h-8 rounded hover:bg-neutral-100 text-subtext-color hover:text-default-font"
                        >
                          <FeatherChevronDown className="text-body" />
                        </button>

                        <span className="text-display-2 font-display-2 text-default-font min-w-[90px] text-center">
                          {vitalSigns.bloodGlucose}
                        </span>

                        <button
                          onClick={() => adjustVitalSign("bloodGlucose", 5)}
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
                          onClick={() => {
                            adjustVitalSign("systolicBP", -2);
                            adjustVitalSign("diastolicBP", -1);
                          }}
                          className="flex items-center justify-center w-8 h-8 rounded hover:bg-neutral-100 text-subtext-color hover:text-default-font"
                        >
                          <FeatherChevronDown className="text-body" />
                        </button>

                        <span className="text-display-2 font-display-2 text-default-font min-w-[130px] text-center">
                          {vitalSigns.systolicBP}/{vitalSigns.diastolicBP}
                        </span>

                        <button
                          onClick={() => {
                            adjustVitalSign("systolicBP", 2);
                            adjustVitalSign("diastolicBP", 1);
                          }}
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
              </div>
              <div className="flex w-full items-start gap-3 border-b border-solid border-neutral-200 px-6 py-4">
                <div className="flex flex-col items-start gap-2 flex-1">
                  <div className="flex w-full items-center justify-between">
                    <span className="text-caption-bold font-caption-bold text-default-font">
                      Респирация
                    </span>
                    <div className="flex items-center gap-1">
                      <FeatherWind className="text-caption font-caption text-error-500" />
                      <button
                        onClick={() => adjustVitalSign("respiration", -1)}
                        className="flex items-center justify-center w-5 h-5 rounded hover:bg-neutral-100 text-subtext-color hover:text-default-font"
                      >
                        <FeatherChevronDown className="text-caption" />
                      </button>
                      <span className="text-caption font-caption text-error-600 min-w-[25px] text-center">
                        {vitalSigns.respiration}
                      </span>
                      <button
                        onClick={() => adjustVitalSign("respiration", 1)}
                        className="flex items-center justify-center w-5 h-5 rounded hover:bg-neutral-100 text-subtext-color hover:text-default-font"
                      >
                        <FeatherChevronUp className="text-caption" />
                      </button>
                      <span className="text-caption font-caption text-subtext-color">
                        rpm
                      </span>
                    </div>
                  </div>
                  <div className="flex h-16 flex-none items-center justify-center overflow-hidden rounded-md relative">
                    <div className="items-start absolute inset-0 grid grid-cols-8">
                      <div className="flex items-start border-r border-solid border-neutral-200 border-opacity-20" />
                      <div className="flex items-start border-r border-solid border-neutral-200 border-opacity-20" />
                      <div className="flex items-start border-r border-solid border-neutral-200 border-opacity-20" />
                      <div className="flex items-start border-r border-solid border-neutral-200 border-opacity-20" />
                      <div className="flex items-start border-r border-solid border-neutral-200 border-opacity-20" />
                      <div className="flex items-start border-r border-solid border-neutral-200 border-opacity-20" />
                      <div className="flex items-start border-r border-solid border-neutral-200 border-opacity-20" />
                      <div className="flex items-start border-r border-solid border-neutral-200 border-opacity-20" />
                    </div>
                    <img
                      className="min-w-[0px] grow shrink-0 basis-0 self-stretch object-cover"
                      src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDUwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0gMCAyNSBMIDIwIDI1IEwgMjUgMTUgTCAzMCAzNSBMIDM1IDI1IEwgNjAgMjUgTCA2NSAxNSBMIDcwIDM1IEwgNzUgMjUgTCAxMDAgMjUgTCAxMDUgMTUgTCAxMTAgMzUgTCAxMTUgMjUgTCAxNDAgMjUgTCAxNDUgMTUgTCAxNTAgMzUgTCAxNTUgMjUgTCAyMDAgMjUiIHN0cm9rZT0icmdiKDIzOSA2OCA2OCkiIHN0cm9rZS13aWR0aD0iMS41IiBmaWxsPSJub25lIiB2ZWN0b3ItZWZmZWN0PSJub24tc2NhbGluZy1zdHJva2UiPjwvcGF0aD48L3N2Zz4="
                    />
                  </div>
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
                        onClick={() => adjustVitalSign("spO2", -1)}
                        className="flex items-center justify-center w-5 h-5 rounded hover:bg-neutral-100 text-subtext-color hover:text-default-font"
                      >
                        <FeatherChevronDown className="text-caption" />
                      </button>
                      <span className="text-caption font-caption text-warning-600 min-w-[30px] text-center">
                        {vitalSigns.spO2}%
                      </span>
                      <button
                        onClick={() => adjustVitalSign("spO2", 1)}
                        className="flex items-center justify-center w-5 h-5 rounded hover:bg-neutral-100 text-subtext-color hover:text-default-font"
                      >
                        <FeatherChevronUp className="text-caption" />
                      </button>
                    </div>
                  </div>
                  <div className="flex h-16 flex-none items-center justify-center overflow-hidden rounded-md relative">
                    <div className="items-start absolute inset-0 grid grid-cols-8">
                      <div className="flex items-start border-r border-solid border-neutral-200 border-opacity-20" />
                      <div className="flex items-start border-r border-solid border-neutral-200 border-opacity-20" />
                      <div className="flex items-start border-r border-solid border-neutral-200 border-opacity-20" />
                      <div className="flex items-start border-r border-solid border-neutral-200 border-opacity-20" />
                      <div className="flex items-start border-r border-solid border-neutral-200 border-opacity-20" />
                      <div className="flex items-start border-r border-solid border-neutral-200 border-opacity-20" />
                      <div className="flex items-start border-r border-solid border-neutral-200 border-opacity-20" />
                      <div className="flex items-start border-r border-solid border-neutral-200 border-opacity-20" />
                    </div>
                    <img
                      className="min-w-[0px] grow shrink-0 basis-0 self-stretch object-cover"
                      src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDUwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0gMCAyNSBMIDIwIDI1IEwgMjUgMTUgTCAzMCAzNSBMIDM1IDI1IEwgNjAgMjUgTCA2NSAxNSBMIDcwIDM1IEwgNzUgMjUgTCAxMDAgMjUgTCAxMDUgMTUgTCAxMTAgMzUgTCAxMTUgMjUgTCAxNDAgMjUgTCAxNDUgMTUgTCAxNTAgMzUgTCAxNTUgMjUgTCAyMDAgMjUiIHN0cm9rZT0icmdiKDI0NSAxNTggMTEpIiBzdHJva2Utd2lkdGg9IjEuNSIgZmlsbD0ibm9uZSIgdmVjdG9yLWVmZmVjdD0ibm9uLXNjYWxpbmctc3Ryb2tlIj48L3BhdGg+PC9zdmc+"
                    />
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col items-start gap-3 border-b border-solid border-neutral-200 px-6 py-4">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FeatherThermometer className={`text-body font-body ${vitalSigns.temperatureEnabled ? 'text-default-font' : 'text-neutral-400'}`} />
                    <span className={`text-body-bold font-body-bold ${vitalSigns.temperatureEnabled ? 'text-default-font' : 'text-neutral-500'}`}>
                      Температура
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {vitalSigns.temperatureEnabled && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => adjustVitalSign("temperature", -0.1)}
                          className="flex items-center justify-center w-5 h-5 rounded hover:bg-neutral-100 text-subtext-color hover:text-default-font"
                        >
                          <FeatherChevronDown className="text-caption" />
                        </button>
                        <span className="text-caption font-caption text-subtext-color min-w-[40px] text-center">
                          {vitalSigns.temperature.toFixed(1)}°C
                        </span>
                        <button
                          onClick={() => adjustVitalSign("temperature", 0.1)}
                          className="flex items-center justify-center w-5 h-5 rounded hover:bg-neutral-100 text-subtext-color hover:text-default-font"
                        >
                          <FeatherChevronUp className="text-caption" />
                        </button>
                      </div>
                    )}
                    <button
                      onClick={toggleTemperature}
                      className={`flex items-center gap-1 px-2 py-1 rounded-md border text-caption font-caption transition-colors ${vitalSigns.temperatureEnabled
                        ? 'border-brand-primary bg-brand-50 text-brand-primary'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-500 hover:border-neutral-300 hover:text-neutral-600'
                        }`}
                    >
                      <FeatherPower className="text-caption" />
                      {vitalSigns.temperatureEnabled ? 'ON' : 'OFF'}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col items-start gap-3 px-6 py-4 flex-1">
                <div className="flex items-center gap-2">
                  <FeatherFileText className="text-body font-body text-default-font" />
                  <span className="text-body-bold font-body-bold text-default-font">
                    Клинични бележки
                  </span>
                </div>
                <div className="flex flex-col items-start gap-2 w-full overflow-y-auto" style={{ maxHeight: "200px" }}>
                  {clinicalNotes.map((note) => (
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;