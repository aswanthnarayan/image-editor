import React, { useState } from "react";
import { useCanvasHook } from "@/context/CanvasContext";
import { useDesign } from "@/context/DesignContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

const DesignSettings = () => {
  const { canvasEditor } = useCanvasHook();
  const design = useDesign();
  const updateDesignSettings = useMutation(api.design.UpdateDesignSettings);

  // Initialize with current values
  const [name, setName] = useState(design?.name || "");
  const [width, setWidth] = useState(canvasEditor?.width || 1200);
  const [height, setHeight] = useState(canvasEditor?.height || 800);
  const [loading, setLoading] = useState(false);

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/^0+/, ''); // Remove leading zeros
    setWidth(value === '' ? 0 : Number(value));
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/^0+/, ''); // Remove leading zeros
    setHeight(value === '' ? 0 : Number(value));
  };

  // Update canvas size and backend
  const handleApply = async () => {
    setLoading(true);
    let backendSuccess = false;
    try {
      if (design?._id) {
        await updateDesignSettings({
          id: design._id  as Id<"designs">,
          name,
          width: Number(width),
          height: Number(height),
        });
        backendSuccess = true;
      }
      if (canvasEditor) {
        canvasEditor.setWidth(Number(width));
        canvasEditor.setHeight(Number(height));
        canvasEditor.renderAll();
      }
      toast.success("Design settings updated!");
    } catch (err) {
      toast.error("Failed to update design settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Design Name</label>
        <input
          className="border rounded px-2 py-1 w-full"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="flex gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Width (px)</label>
          <input
            type="text"
            min={100}
            value={width}
            onChange={handleWidthChange}
            className="border rounded px-2 py-1 w-24"
            placeholder="Width"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Height (px)</label>
          <input
            type="text"
            min={100}
            value={height}
            onChange={handleHeightChange}
            className="border rounded px-2 py-1 w-24"
            placeholder="Height"
          />
        </div>
      </div>
      <Button 
        onClick={handleApply} 
        className="w-full mt-2 cursor-pointer" 
        disabled={loading || width < 100 || height < 100}
      >
        {loading ? "Applying..." : "Apply Changes"}
      </Button>
    </div>
  );
};

export default DesignSettings;