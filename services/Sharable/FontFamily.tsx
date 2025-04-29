import { FontFamilyList } from '../Options'
import { useCanvasHook } from '@/context/CanvasContext';
import React, { useState } from 'react'
const FontFamily = () => {
   const { canvasEditor } = useCanvasHook();
    const [selectedFont, setSelectedFont] = useState("Arial"); // store percentage for UI
  
    const onFontChange = (font: string) => {
      setSelectedFont(font);
      const activeObject = canvasEditor?.getActiveObject();
      if (activeObject) {
        activeObject.set({
          fontFamily: font
        });
  
        canvasEditor?.requestRenderAll();
      }
    }
  return (
    <div className="max-h-60 overflow-y-auto bg-secondary rounded-lg p-2">
    {FontFamilyList.map((font) => (
      <div
        key={font}
        className={`text-lg p-2 cursor-pointer rounded hover:bg-secondary/80`}
        style={{ fontFamily: font }}
        onClick={() => onFontChange(font)}
      >
        {font}
      </div>
    ))}
  </div>
  )
}

export default FontFamily