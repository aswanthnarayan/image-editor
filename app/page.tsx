"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { WelcomeScreen } from "@/app/_components/WelcomeScreen";

export default function Home() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("verifyEmail")) {
      toast.info("Please verify your email, then try signing in.");
    }
  }, [searchParams.toString()]);
  return (
    <>
      <WelcomeScreen/>
    </>
  );
}
