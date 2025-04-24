import { Canvas } from 'fabric'
import React, { useEffect, useRef, useState } from 'react'
import { useDesign } from "@/context/DesignContext";
import { useCanvasHook } from '@/context/CanvasContext';
import { Trash, MousePointer } from "lucide-react";
import { Button } from '@/components/ui/button';


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
                preserveObjectStacking: true
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

    // Handler to select all objects (for demonstration, selects the first object)
    const handleSelect = () => {
        if (canvas) {
            const objects = canvas.getObjects();
            if (objects.length > 0) {
                canvas.setActiveObject(objects[0]);
                canvas.renderAll();
            }
        }
    };

    // Handler to delete the currently selected object
    const handleDelete = () => {
        if (canvas) {
            const activeObject = canvas.getActiveObject();
            if (activeObject) {
                canvas.remove(activeObject);
                canvas.discardActiveObject();
                canvas.renderAll();
            }
        }
    };

    // Listen for Delete/Backspace key to trigger delete
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.key === 'Delete') && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
                e.preventDefault();
                handleDelete();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [canvas]);

    return (
        <div className="w-full h-[calc(100vh-64px)] flex flex-col items-center">
            {/* Navigation bar for canvas actions */}
            <div className="flex gap-2 mb-4 w-full rounded-md items-center select-none bg-white mt-1">
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Select Object"
                    onClick={handleSelect}
                    className="w-8 h-8 p-0 hover:bg-gray-100 active:bg-gray-200"
                >
                    <MousePointer strokeWidth={2.2} className="w-4 h-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Delete Selected Object"
                    onClick={handleDelete}
                    className="w-8 h-8 p-0 hover:bg-red-100 active:bg-red-200"
                >
                    <Trash strokeWidth={2.2} className="w-4 h-4 text-red-500" />
                </Button>
            </div>
            <div className="flex flex-1 w-full items-center justify-center">
                <canvas id="canvas" ref={canvasRef} />
            </div>
        </div>
    );
}


export default CanvasEditor