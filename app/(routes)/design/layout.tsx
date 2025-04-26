import React from 'react';
import DesignHeader from './_components/DesignHeader';
import DesignSidebar from './_components/DesignSidebar';

import { DesignProvider } from "@/context/DesignContext";
import { CanvasProvider } from "@/context/CanvasContext";

import { stackServerApp } from "@/stack";
import { redirect } from "next/navigation";


const DesignLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await stackServerApp.getUser({ or: "redirect" });
  if (!user.primaryEmailVerified) {
    redirect("/?verifyEmail=1");
  }
  return (
    <DesignProvider>
      <CanvasProvider>
        <div className="h-screen flex flex-col">
          {/* Fixed Header */}
          <div className="fixed top-0 left-0 right-0 z-20">
            <DesignHeader />
          </div>
          <div className="flex flex-row h-full pt-[64px]">
            <div className="flex flex-col h-[calc(100vh-64px)] w-[376px] fixed top-[64px] left-0 z-10">
              <DesignSidebar />
            </div>
            <main className="flex-1 ml-[360px] h-[calc(100vh-64px)] overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </CanvasProvider>
    </DesignProvider>
  );
};

export default DesignLayout;
