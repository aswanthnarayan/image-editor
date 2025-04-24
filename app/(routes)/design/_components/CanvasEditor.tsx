import { Canvas } from 'fabric';
import React, { useEffect, useRef, useState } from 'react';
import { useDesign } from "@/context/DesignContext";
import { useCanvasHook } from '@/context/CanvasContext';
import { Trash, MousePointer } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { shapesSettingsList } from '@/services/Options';

const CanvasEditor = () => {
    const [selectedObjectType, setSelectedObjectType] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [canvas, setCanvas] = useState<Canvas | null>(null);
    const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
    const design = useDesign();
    const { canvasEditor, setCanvasEditor } = useCanvasHook();

    useEffect(() => {
        if (canvasRef.current && containerRef.current && design?.width && design?.height) {
            const containerWidth = containerRef.current.clientWidth;
            const containerHeight = containerRef.current.clientHeight;

            const scaleX = containerWidth / design.width;
            const scaleY = containerHeight / design.height;
            const scale = Math.min(scaleX, scaleY); // Keep aspect ratio

            const scaledWidth = design.width * scale;
            const scaledHeight = design.height * scale;

            const initCanvas = new Canvas(canvasRef.current, {
                width: scaledWidth,
                height: scaledHeight,
                backgroundColor: '#fff',
                preserveObjectStacking: true,
            });

            // Optional: set zoom to scale, so objects still act at their original size
            initCanvas.setZoom(scale);

            setCanvas(initCanvas);
            setCanvasEditor(initCanvas);

            return () => {
                initCanvas.dispose();
            };
        }
    }, [design]);

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

    useEffect(() => {
        if (!canvas) return;
        const updateEmpty = () => setIsCanvasEmpty(canvas.getObjects().length === 0);
        updateEmpty();
        canvas.on('object:added', updateEmpty);
        canvas.on('object:removed', updateEmpty);
        return () => {
            canvas.off('object:added', updateEmpty);
            canvas.off('object:removed', updateEmpty);
        };
    }, [canvas]);

    // Track selection and update selectedObjectType
    useEffect(() => {
        if (!canvas) return;
        const handleSelection = () => {
            const active = canvas.getActiveObject();
            if (active) {
                // For fabric.js, common shape types are 'rect', 'circle', 'ellipse', 'polygon', 'triangle', 'line', etc.
                setSelectedObjectType(active.type || null);
            } else {
                setSelectedObjectType(null);
            }
        };
        canvas.on('selection:created', handleSelection);
        canvas.on('selection:updated', handleSelection);
        canvas.on('selection:cleared', handleSelection);
        return () => {
            canvas.off('selection:created', handleSelection);
            canvas.off('selection:updated', handleSelection);
            canvas.off('selection:cleared', handleSelection);
        };
    }, [canvas]);

    if (!design) {
        return <div className="flex items-center justify-center w-full h-full">Loading design...</div>;
    }
    if (!design.width || !design.height) {
        return <div className="flex items-center justify-center w-full h-full text-red-500">Invalid design data</div>;
    }

    const handleSelect = () => {
        if (canvas) {
            const objects = canvas.getObjects();
            if (objects.length > 0) {
                canvas.setActiveObject(objects[0]);
                canvas.renderAll();
            }
        }
    };

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

    return (
        <div className="w-full h-[calc(100vh-64px)] flex flex-col items-center">
            {!isCanvasEmpty && (
                <div className="flex gap-2 mb-4 w-full py-2 items-center select-none bg-white">
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Select Object"
                        onClick={handleSelect}
                        className="w-8 h-8 p-0 hover:text-black hover:bg-gray-100 active:bg-gray-200"
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
                    {/* Show shape settings if a shape is selected */}
                    {['rect', 'circle', 'ellipse', 'polygon', 'triangle', 'line'].includes(selectedObjectType || '') && shapesSettingsList.map((item, idx) => (
                        <Popover key={item.name}>
                            <PopoverTrigger asChild>
  <div className="w-8 h-8 p-0 flex items-center justify-center rounded-md hover:bg-gray-100 active:bg-gray-200 transition-colors">
    <item.icon />
  </div>
</PopoverTrigger>
                            <PopoverContent>
                                {item.component}
                            </PopoverContent>
                        </Popover>
                    ))}
                </div>
            )}

            {/* Canvas container */}
            <div
                ref={containerRef}
                className={`flex flex-col flex-1 w-full items-center justify-center overflow-hidden ${isCanvasEmpty ? 'my-4' : 'mb-4'}`}
            >
                <canvas ref={canvasRef} />
            </div>
        </div>
    );
};

export default CanvasEditor;
