import { Slider } from '@/components/ui/slider'
import { useCanvasHook } from '@/context/CanvasContext';
import React, { useState } from 'react'

const BorderRadius = () => {
  const { canvasEditor } = useCanvasHook();
  const [radius, setRadius] = useState(0);

  const onRadiusChange = (radiusValue: number) => {
    setRadius(radiusValue);
    const activeObject = canvasEditor?.getActiveObject();

    // Only apply if it's a rect (since only rect supports rx/ry)
    if (activeObject && activeObject.type === 'rect') {
      activeObject.set({
        rx: radiusValue,
        ry: radiusValue
      });

      canvasEditor?.requestRenderAll();
    }
  }

  return (
    <div className="flex flex-col gap-2 my-4">
      <label htmlFor="border-radius" className="text-sm font-medium">
        Border Radius: {radius}px
      </label>
      <Slider
        id="border-radius"
        defaultValue={[0]}
        max={100}
        min={0}
        step={1}
        onValueChange={(value) => onRadiusChange(value[0])}
      />
    </div>
  )
}

export default BorderRadius;
