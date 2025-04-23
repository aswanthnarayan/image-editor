"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Canvas } from 'fabric';

export interface CanvasContextValue {
  canvasEditor: Canvas | null;
  setCanvasEditor: React.Dispatch<React.SetStateAction<Canvas | null>>;
}

export const CanvasContext = createContext<CanvasContextValue | undefined>(undefined);

interface CanvasProviderProps {
  children: ReactNode;
}

export const CanvasProvider: React.FC<CanvasProviderProps> = ({ children }) => {
  const [canvasEditor, setCanvasEditor] = useState<Canvas | null>(null);
  return (
    <CanvasContext.Provider value={{ canvasEditor, setCanvasEditor }}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvasHook = (): CanvasContextValue => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error('CanvasContext not found');
  }
  return context;
};