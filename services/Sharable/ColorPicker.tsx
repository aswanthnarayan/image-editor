import React from 'react'
import { ChromePicker,CirclePicker } from 'react-color'

const ColorPicker = ({value,onColorChange}: {value: string, onColorChange: (color: string) => void}) => {
  return (
    <div>
        <ChromePicker
            color={value}
            onChange={(e: { hex: any })=>onColorChange(e.hex)}
            className="border-r rounded-2xl mb-5"
        />
        <CirclePicker
        color={value}
        onChange={(e: { hex: any })=>onColorChange(e.hex)}/>
    </div>
  )
}

export default ColorPicker