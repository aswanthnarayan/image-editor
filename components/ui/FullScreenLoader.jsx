"use client";
import { createPortal } from "react-dom";
import { Loader2 } from "lucide-react";
import React from "react";

export function FullScreenLoader() {
  if (typeof window === "undefined") return null; // SSR safety

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-white via-blue-100 to-pink-100">
      <div className="flex flex-col items-center gap-6">
        <div className="p-4 rounded-full bg-white shadow-lg">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        </div>
        <p className="text-blue-700 text-base font-medium animate-pulse">
          Sharpening your brushes...
        </p>
      </div>
    </div>,
    document.body
  );
}