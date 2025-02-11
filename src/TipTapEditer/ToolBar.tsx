"use client";

import React from "react";
import { type LucideIcon, Undo2Icon } from "lucide-react";
import { cn } from "../lib/utils";
import useEditorStore from "../store/useEditorStore";

type ToolBarButtonProps = {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
};

const ToolBarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: ToolBarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex h-7 min-w-7 items-center justify-center rounded-sm text-sm hover:bg-neutral-200/80 focus:outline-none",
        isActive && "bg-neutral-200/80",
      )}
    >
      <Icon className={"size-4"} />
    </button>
  );
};

const ToolBar = () => {
  const { editor } = useEditorStore();
  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => console.log("Undo"),
      },
    ],
  ];
  return (
    <div
      className={
        "flex min-h-[40px] items-center gap-x-0.5 overflow-x-auto rounded-sm bg-[#F1F4F9] px-2.5 py-0.5"
      }
    >
      {sections[0]?.map((section, index) => (
        <ToolBarButton key={`${index}-${section.label}`} {...section} />
      ))}
    </div>
  );
};
export default ToolBar;
