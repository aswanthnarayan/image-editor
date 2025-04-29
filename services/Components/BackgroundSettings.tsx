import React from 'react';
import ColorPicker from '../Sharable/ColorPicker';
import { useCanvasHook } from '@/context/CanvasContext';

const BackgroundSettings = () => {
    const [bgColor,setBgColor] = React.useState("#fff")
    const {canvasEditor} = useCanvasHook();
   console.log(canvasEditor)
    const onColorChange = (color: string) => {
        setBgColor(color);
        if (canvasEditor) {
            canvasEditor.backgroundColor = color;
            canvasEditor.backgroundImage = undefined;
            canvasEditor.renderAll();
        }
    }
    return (
    <div>
        <ColorPicker value={bgColor} onColorChange={(v: string)=>onColorChange(v)} />
    </div>
  )
}

export default BackgroundSettings