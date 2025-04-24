import { Slider } from '@/components/ui/slider'
import { useCanvasHook } from '@/context/CanvasContext';
import React, { useState } from 'react'

const BorderWidth = () => {
  const { canvasEditor } = useCanvasHook();
  const [borderWidth, setBorderWidth] = useState(1);

  const onWidthChange = (width: number) => {
    setBorderWidth(width);
    const activeObject = canvasEditor?.getActiveObject();
    if (activeObject) {
      activeObject.set({
        strokeWidth: width
      });

      canvasEditor?.requestRenderAll();
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="border-width my-2" className="text-sm font-medium">
        Border Width: {borderWidth}px
      </label>
      <Slider
        id="border-width"
        defaultValue={[1]}
        max={100}
        min={1}
        step={1}
        onValueChange={(value) => onWidthChange(value[0])}
      />
    </div>
  )
}

export default BorderWidth
