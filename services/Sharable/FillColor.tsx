import React, { useState } from 'react'
import ColorPicker from './ColorPicker'
import { useCanvasHook } from '@/context/CanvasContext'

const FillColor = () => {
  const [color, setColor] = useState("#000")
  const {canvasEditor} = useCanvasHook();
  const onColorChange = (color: string) => {
    setColor(color)
    if (canvasEditor) {
      const activeObject = canvasEditor.getActiveObject()
      if (activeObject) {
        activeObject.set({
          fill: color
        })
      }
      canvasEditor.renderAll()
    }
  }
  return (
    <div>
      <ColorPicker value={color} onColorChange={(color: string) => onColorChange(color)}/>
    </div>
  )
}

export default FillColor