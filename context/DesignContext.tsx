"use client"
import React, { createContext, useContext, ReactNode } from "react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import {Id} from "@/convex/_generated/dataModel"

interface DesignType {
  _id: string;
  name: string;
  width: number;
  height: number;
  jsonTemplate?: any;
  imagePreview?: string;
  uid: string;
}

// The context can be DesignType | undefined | null
const DesignContext = createContext<DesignType | null | undefined>(undefined);

export const useDesign = () => useContext(DesignContext);

interface DesignProviderProps {
  children: ReactNode;
}

export const DesignProvider = ({ children }: DesignProviderProps) => {
  const designId = (useParams() as { [key: string]: string }).designId;
  const design = useQuery(
    api.design.GetDesign,
    designId ? { id: designId as Id<"designs"> } : "skip"
  );

  return (
    <DesignContext.Provider value={design}>
      {children}
    </DesignContext.Provider>
  );
};