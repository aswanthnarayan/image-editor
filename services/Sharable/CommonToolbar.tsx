import { Button } from '@/components/ui/button'
import { MousePointer, Trash, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react'
import React from 'react'

interface CommonToolbarProps {
    handleSelect: () => void, 
    handleDelete: () => void, 
    handleZoomIn?: () => void,
    handleZoomOut?: () => void,
    handleResetZoom?: () => void
}

const CommonToolbar = ({ 
    handleSelect, 
    handleDelete, 
    handleZoomIn,
    handleZoomOut,
    handleResetZoom
}: CommonToolbarProps) => {
    return (
        <>
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
            
            {/* Zoom buttons */}
            {handleZoomOut && (
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Zoom Out"
                    onClick={handleZoomOut}
                    className="w-8 h-8 p-0 hover:text-black hover:bg-gray-100 active:bg-gray-200"
                >
                    <ZoomOut strokeWidth={2.2} className="w-4 h-4" />
                </Button>
            )}
            
            {handleZoomIn && (
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Zoom In"
                    onClick={handleZoomIn}
                    className="w-8 h-8 p-0 hover:text-black hover:bg-gray-100 active:bg-gray-200"
                >
                    <ZoomIn strokeWidth={2.2} className="w-4 h-4" />
                </Button>
            )}
            
            {handleResetZoom && (
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Reset Zoom"
                    onClick={handleResetZoom}
                    className="w-8 h-8 p-0 hover:text-black hover:bg-gray-100 active:bg-gray-200"
                >
                    <RefreshCw strokeWidth={2.2} className="w-4 h-4" />
                </Button>
            )}
        </>
    )
}

export default CommonToolbar