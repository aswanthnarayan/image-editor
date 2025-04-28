"use client"
import { CirclePlus } from "lucide-react";
import { SidebarItems } from '../../../../services/Options';
import { usePathname, useRouter } from "next/navigation";
import CustomCanvasDialog from "./CustomCanvasDialog";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  
  return (
    <aside
      style={{
        top: 'var(--header-height)',
        height: 'calc(100vh - var(--header-height))',
      }}
      className="w-20 bg-gradient-to-b from-white via-gray-50 to-gray-100 border-r shadow-xl flex flex-col items-center py-6 gap-2 fixed left-0"
    >
      <div className="flex flex-col gap-4 w-full items-center cursor-pointer">
        <button
          className="cursor-pointer bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg flex items-center justify-center w-10 h-10 mb-2 transition-all duration-150 border-2 border-primary outline-none focus:ring-2 focus:ring-primary/40"
          title="Add New"
        >
         <CustomCanvasDialog><CirclePlus className="w-6 h-6 cursor-pointer" /></CustomCanvasDialog> 
        </button>
        <div className="flex flex-col gap-2 w-full items-center">
          {SidebarItems.map((item) => (
            <button
              key={item.label}
              className={`flex flex-col items-center justify-center py-3 rounded-lg transition-all w-full cursor-pointer
                ${pathname === item.path ? "bg-violet-100 text-violet-600 shadow-md" : "text-gray-400 hover:bg-gray-100"}
              `}
              title={item.label}
              onClick={() => router.push(item.path)}
            >
              <span className="w-7 h-7 flex items-center justify-center">{item.icon}</span>
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}