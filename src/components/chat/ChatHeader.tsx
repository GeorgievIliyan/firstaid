"use client";
import { Avatar } from "../../ui/components/Avatar/Avatar";
import { Button } from "../../ui/components/Button/Button";
import { FeatherFileText } from "@subframe/core";
import { FeatherRefreshCw } from "@subframe/core";

interface ChatHeaderProps {
  onResetChat: () => void;
}

export function ChatHeader({ onResetChat }: ChatHeaderProps) {
  return (
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
          onClick={onResetChat}
        >
          Рестарт
        </Button>
      </div>
    </div>
  );
}