import { Slider } from '@/components/ui/slider'
import { useCanvasHook } from '@/context/CanvasContext';
import React, { useState } from 'react'

const Opacity = () => {
  const { canvasEditor } = useCanvasHook();
  const [opacity, setOpacity] = useState(100); // store percentage for UI

  const onOpacityChange = (opacityPercent: number) => {
    setOpacity(opacityPercent);
    const activeObject = canvasEditor?.getActiveObject();
    if (activeObject) {
      activeObject.set({
        opacity: opacityPercent / 100 // convert to 0-1 range
      });

      canvasEditor?.requestRenderAll();
    }
  }

  return (
    <div className="flex flex-col gap-2 my-4">
      <label htmlFor="opacity" className="text-sm font-medium">
        Opacity: {opacity}%
      </label>
      <Slider
        id="opacity"
        defaultValue={[100]}
        max={100}
        min={0}
        step={1}
        onValueChange={(value) => onOpacityChange(value[0])}
      />
    </div>
  )
}

export default Opacity
