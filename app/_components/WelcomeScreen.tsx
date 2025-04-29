"use client";

import React, { useEffect } from "react";
import { FloatingShapes } from "@/components/ui/FloatingShapes";
import { LogIn, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@stackframe/stack";

export function WelcomeScreen() {
const router = useRouter();
const user = useUser();
useEffect(() => {
  if (user && user.primaryEmailVerified) {
    router.replace("/workspace");
  }
}, [user, router]);
 
const handleSignIn = () => {
  if(user && user.primaryEmailVerified) {
    router.push("/workspace");
  }
  else if(user && !user.primaryEmailVerified) {
    router.push("/?verifyEmail=1");
  }
  else{
    router.push("/handler/signin");
  }
};

const handleSignUp = () => {
  router.push("/handler/signup");
};

  return (
    <div className="min-h-screen relative w-full overflow-hidden bg-gradient-to-br from-white via-blue-200 to-pink-200 flex flex-col items-center justify-center px-4">
      
      {/* Floating background */}
      <FloatingShapes />

      {/* Heading */}
      <h1 className="md:text-6xl text-3xl font-bold text-slate-900 z-30 text-center drop-shadow">
        Welcome to <span className="text-indigo-600">PIXIA</span>
      </h1>

      {/* Subheading */}
      <p className="text-lg text-slate-700 mt-4 z-30 max-w-md text-center">
  <span className="block">Design, edit, and create stunning visuals</span>
  <span className="block">All in your browser!</span>
</p>

      {/* CTA Buttons */}
      <div className="flex gap-4 mt-8 z-30">
        <button
          onClick={handleSignIn}
          className="flex items-center gap-2 px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-150 cursor-pointer hover:scale-105 hover:translate-y-[-2px]"
        >
          <LogIn size={18} />
          Sign In
        </button>
        <button
          onClick={handleSignUp}
          className="flex items-center gap-2 px-6 py-2 rounded-lg bg-white text-indigo-700 font-medium border border-indigo-300 shadow hover:bg-indigo-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-150 cursor-pointer hover:scale-105 hover:translate-y-[-2px]"
        >
          <UserPlus size={18} />
          Sign Up
        </button>
      </div>
    </div>
  );
}
