import React from 'react'
import WorkspaceHeader from './_components/WorkspaceHeader'
import Sidebar from './_components/Sidebar'
import { stackServerApp } from "@/stack";
import { redirect } from "next/navigation";

const WorkspaceLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await stackServerApp.getUser({ or: "redirect" });
  if (user && !user.primaryEmailVerified) {
    redirect("/?verifyEmail=1");
  }
  return (
    <div className="h-screen flex flex-col">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-20">
        <WorkspaceHeader />
      </div>
      <div className="flex flex-1 pt-[64px] h-full"> {/* Adjust pt-[64px] to your header height */}
        {/* Fixed Sidebar */}
        <div className="fixed top-[64px] left-0 h-[calc(100vh-64px)] w-20 z-10"> {/* w-20 = 5rem, adjust if needed */}
          <Sidebar />
        </div>
        {/* Scrollable Main Content */}
        <main className="flex-1 ml-20 overflow-y-auto h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  );
}

export default WorkspaceLayout