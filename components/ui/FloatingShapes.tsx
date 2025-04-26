// components/ui/FloatingShapes.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";

const shapes = Array.from({ length: 20 });

export const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {shapes.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-16 h-16 rounded-full bg-pink-400/40"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0.4,
            scale: 0.8,
          }}
          animate={{
            y: [Math.random() * window.innerHeight, -100],
            opacity: [0.4, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};
