import React from 'react';
import ColorPicker from '../Sharable/ColorPicker';
import { useCanvasHook } from '@/context/CanvasContext';

const BackgroundSettings = () => {
    const [bgColor,setBgColor] = React.useState("#fff")
    const {canvasEditor} = useCanvasHook();
    const onColorChange = (color: string) => {
        setBgColor(color);
        if (canvasEditor) {
            canvasEditor.backgroundColor = color;
            canvasEditor.backgroundImage = null;
            canvasEditor.renderAll();
        }
    }
    return (
    <div>
        <ColorPicker value={bgColor} onColorChange={(v: string)=>onColorChange(v)} className="cursor-pointer"/>
    </div>
  )
}

export default BackgroundSettings