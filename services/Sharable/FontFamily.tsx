import { FontFamilyList } from '../Options'
import { useCanvasHook } from '@/context/CanvasContext';
import React, { useState } from 'react'
const FontFamily = () => {
   const { canvasEditor } = useCanvasHook();
    const [selectedFont, setSelectedFont] = useState(100); // store percentage for UI
  
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
    <div>{FontFamilyList.map((font) => (
      <h2 key={font} className='text-lg p-2 bg-secondary rounded-lg h-[200px] overflow-y-auto'
      style={{
        fontFamily: font
      }}
      onClick={() => onFontChange(font)}
      >{font}</h2>
    ))}
    </div>
  )
}

export default FontFamily