"use client";

import React, { useState } from 'react';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TypeformModalProps {
  children: React.ReactNode;
  formId: string;
  className?: string;
  onClose?: () => void;
}

export function TypeformModal({ children, formId, className, onClose }: TypeformModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Handle external close request
  React.useEffect(() => {
    if (onClose && !isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);
  
  // Construct the Typeform URL from the formId
  const typeformUrl = `https://form.typeform.com/to/${formId}?typeform-source=inapp`;

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>
        {children}
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 w-[90vw] h-[80vh] max-w-5xl translate-x-[-50%] translate-y-[-50%] border border-white/10 bg-black/90 backdrop-blur-xl rounded-xl overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
            className
          )}
        >
          <div className="relative w-full h-full">
            <iframe
              src={typeformUrl}
              className="absolute inset-0 w-full h-full border-0"
              title="Registration Form"
              allow="camera; microphone; autoplay; encrypted-media; fullscreen; geolocation"
              loading="lazy"
            />
            <DialogPrimitive.Close className="absolute right-4 top-4 z-10 rounded-full p-1.5 bg-black/40 text-white hover:bg-black/60 hover:text-white transition-colors">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
} 