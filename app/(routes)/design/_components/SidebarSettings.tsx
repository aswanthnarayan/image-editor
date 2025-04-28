import { Info } from "lucide-react";
import React from "react";

const SidebarSettings = ({
  selectedOption,
}: {
  selectedOption: { name: string; desc?: string; component?: React.ReactNode };
}) => {
  if (!selectedOption) {
    return (
      <div className="w-[280px] h-full flex flex-col items-center justify-center text-gray-400 bg-white border-l">
        <Info className="w-8 h-8 mb-2 text-blue-400 animate-bounce" />
        <span className="text-base font-medium text-gray-500">
          No tool selected
        </span>
        <span className="text-sm text-gray-400 mt-1 text-center">
          Select a tool or setting from the sidebar to get started!
        </span>
      </div>
    );
  }
  return (
    <div className="w-[280px] h-full p-4 border-l bg-white">
      <h2 className="text-lg font-semibold mb-2">{selectedOption.name}</h2>
      <p className="text-gray-600 text-sm">
        {selectedOption.desc || "No description available."}
      </p>
      <div className="mt-4">{selectedOption?.component}</div>
    </div>
  );
};

export default SidebarSettings;