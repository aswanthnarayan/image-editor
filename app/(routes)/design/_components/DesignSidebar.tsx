"use client";
import React, { useState } from "react";
import { sideBarMenu } from '../../../../services/Options';
import SidebarSettings from "./SidebarSettings";
type SideBarMenuItem = {
  name: string;
  desc: string;
  icon: React.ElementType;
  component: React.ReactNode;
}; 

const DesignSidebar = () => {
const menu = sideBarMenu as SideBarMenuItem[];
const [selectedOption, setSelectedOption] = useState<SideBarMenuItem | null>(null);

  
    return (
      <div className="flex h-full">
        {/* Main sidebar */}
        <aside
          className="w-20 h-full bg-gradient-to-b from-white via-gray-50 to-gray-100 border-r shadow-xl flex flex-col items-center p-2 gap-2 mt-1"
        >
          <div className="flex flex-col gap-1 w-full items-center">
            {menu.map((item) => (
              <button
                key={item.name}
                className={`flex flex-col items-center justify-center py-1 rounded-lg transition-all w-full
                  ${item.name === selectedOption?.name ? "bg-violet-100 text-violet-600 shadow-md" : "text-gray-400 hover:bg-gray-100"}
                `}
                title={item.name}
                onClick={() => setSelectedOption(item)}
              >
                <span className="w-7 h-7 flex items-center justify-center">{item.icon && React.createElement(item.icon)}</span>
                <span className="text-xs mt-1 font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        </aside>
        {/* Child sidebar (settings panel) */}
        {selectedOption && <SidebarSettings selectedOption={selectedOption} />}
      </div>
    );
  };

export default DesignSidebar;
