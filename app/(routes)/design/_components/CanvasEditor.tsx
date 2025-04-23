import { Canvas } from 'fabric'
import React, { useEffect, useRef, useState } from 'react'
import { useDesign } from "@/context/DesignContext";
import { useCanvasHook } from '@/context/CanvasContext';


const CanvasEditor = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvas, setCanvas] = useState<Canvas | null>(null);
    const design = useDesign();
    const {canvasEditor,setCanvasEditor} = useCanvasHook();

    useEffect(() => {
        // Only initialize if design data is loaded
        if (canvasRef.current && design?.width && design?.height) {
            const scaleFactor = window.devicePixelRatio || 1;
            const initCanvas = new Canvas(canvasRef.current, {
                width: design.width/1.5 ,
                height: design.height/1.5 ,
                backgroundColor: '#fff',
            });
            // For high resolution canvas
            initCanvas.set({
                width: design.width * scaleFactor,
                height: design.height * scaleFactor,
                zoom: 1 / scaleFactor,
            });
            initCanvas.renderAll();
            setCanvas(initCanvas);
            setCanvasEditor(initCanvas);
            return () => {
                initCanvas.dispose();
            };
        }
    }, [design]); // re-run if design changes

    if (!design) {
        return <div className="flex items-center justify-center w-full h-full">Loading design...</div>;
    }
    if (!design.width || !design.height) {
        return <div className="flex items-center justify-center w-full h-full text-red-500">Invalid design data</div>;
    }

    return (
        <div className="w-full h-[calc(100vh-64px)] flex items-center justify-center">
            <canvas id="canvas" ref={canvasRef} />
        </div>
    );
}


export default CanvasEditor