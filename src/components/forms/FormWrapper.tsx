import React, { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type ModalFormProps = {
  onClose?: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  size?: "small" | "medium" | "large" | "xlarge" | "full";
  className?: string;
};


const sizeClasses = {
  small: "max-w-sm w-full",
  medium: "max-w-md w-full",
  large: "max-w-lg w-full",
  xlarge: "max-w-2xl w-full",
  full: "max-w-full w-full",
};

export function FormWrapper({
  title = "form",
  children,
  onClose,
  size = "xlarge", // default size
  className = ""
}: ModalFormProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
    <Button onClick={() => setIsOpen(true)}>{title}</Button>
    {isOpen && (
    <div className="fixed inset-0 top-0 z-50 flex items-center justify-center bg-black bg-opacity-40" aria-modal="true" role="dialog">
      <div className={`bg-white rounded-lg shadow-lg mx-4 ${sizeClasses[size]}`}>
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={() => { setIsOpen(false); onClose && onClose(); }}
            className={cn("text-gray-500 hover:text-gray-700",className)}
            aria-label="Close"
            type="button"
          >
            ×
          </button>
        </div>
        <div className="space-y-4 p-4">{children}</div>
      </div>
    </div>
    )}
    </>
  );
}

export function Title({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex justify-between items-center text-center gap-3">{children}</div>
    </>
  )
}