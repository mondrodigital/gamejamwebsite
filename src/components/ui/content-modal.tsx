"use client";

import React from 'react';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  className?: string;
}

export function ContentModal({ isOpen, onClose, title, url, className }: ContentModalProps) {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
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
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-2 bg-black/40 backdrop-blur-sm border-b border-white/10">
              <h2 className="text-white font-bold">{title}</h2>
              <div className="flex items-center gap-2">
                <a 
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ExternalLink className="h-5 w-5 text-white" />
                </a>
                <DialogPrimitive.Close className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                  <X className="h-5 w-5 text-white" />
                </DialogPrimitive.Close>
              </div>
            </div>
            <div className="w-full h-full pt-12">
              <iframe
                src={url}
                className="w-full h-full border-0"
                title={title}
                allow="camera; microphone; autoplay; encrypted-media; fullscreen; geolocation"
                loading="lazy"
              />
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
} 