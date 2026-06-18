"use client";

import { ChatContainer } from "../chat/ChatContainer";
import { SideMenuContainer } from "../vitals/SideMenuContainer";
import { playTTS } from "../../lib/playTTS"
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

function getScenarioStartText(scenario: any) {
  const firstPatientMessage = scenario?.scenario?.patient_messages?.[0]?.text?.trim();
  if (firstPatientMessage) {
    return firstPatientMessage;
  }

  const chiefComplaint = scenario?.scenario?.presentation?.chief_complaint?.trim();
  if (chiefComplaint) {
    return chiefComplaint;
  }

  return scenario?.scenario?.metadata?.description?.trim() ||
    "Помощ! Имам спешен случай и трябва да помогнете на пациента незабавно.";
}

export default function SessionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const payload = location.state as any;

  const storedSession = (() => {
    if (typeof window === "undefined") {
      return null;
    }

    try {
      const raw = window.localStorage.getItem("firstaid_session");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  const scenario = payload?.scenario ?? storedSession?.scenario;
  const studentName = payload?.studentName as string | undefined ?? storedSession?.studentName;

  const startMessage = useMemo<Message>(() => ({
    id: 1,
    text: getScenarioStartText(scenario),
    sender: "patient",
    timestamp: new Date().toLocaleTimeString(),
  }), [scenario]);

  const initialVitalSigns = useMemo(() => {
    const initial = scenario?.scenario?.vital_signs?.initial;
    return {
      heartRate: initial?.heart_rate?.value ?? 112,
      bloodGlucose: initial?.blood_glucose?.value ?? 145,
      systolicBP: initial?.blood_pressure?.systolic ?? 145,
      diastolicBP: initial?.blood_pressure?.diastolic ?? 92,
      respiration: initial?.respiratory_rate?.value ?? 24,
      spO2: initial?.oxygen_saturation?.value ?? 94,
      temperature: initial?.temperature?.value ?? 37.2,
      temperatureEnabled: initial?.temperature?.status !== undefined ? true : true,
    };
  }, [scenario]);

  useEffect(() => {
    if (!scenario || !studentName) {
      navigate("/", { replace: true });
    }
  }, [navigate, scenario, studentName]);

  const hasPlayedRef = useRef(false);

  useEffect(() => {
    if (hasPlayedRef.current) {
      return;
    }

    if (startMessage.text) {
      hasPlayedRef.current = true;
      playTTS(startMessage.text);
    }
  }, [startMessage]);

  const [messages, setMessages] = useState<Message[]>([startMessage]);

  useEffect(() => {
    setMessages([startMessage]);
  }, [startMessage]);

  const [clinicalNotes] = useState<ClinicalNote[]>([
    {
      id: 1,
      text: "Пациентката постъпва с остра болка в гърдите, тахикардия и затруднено дишане. Необходима е незабавна оценка на сърдечния статус.",
      timestamp: new Date().toLocaleTimeString(),
    }
  ]);

  const [vitalSigns, setVitalSigns] = useState<VitalSigns>(initialVitalSigns);

  const handleSendMessage = (messageText: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: "examiner",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMessage]);
  };

  const handleResetChat = () => {
    setMessages([startMessage]);
    if (startMessage.text) {
      playTTS(startMessage.text);
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
              Доклад за инцидент
            </span>
            {studentName ? (
              <span className="text-sm text-neutral-500">
                Изследващ студент: {studentName}
              </span>
            ) : null}
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