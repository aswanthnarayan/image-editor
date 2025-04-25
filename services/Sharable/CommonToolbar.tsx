
import { Button } from '@/components/ui/button'
import { MousePointer, Trash } from 'lucide-react'
import React from 'react'

const CommonToolbar = ({ handleSelect, handleDelete }) => {
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
        </>
    )
}

export default CommonToolbar