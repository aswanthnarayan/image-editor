import React, { useState } from 'react'
import { AITransformationSettings } from '../Options'
import Image from 'next/image'
import CustomImageUpload from '../Sharable/CustomImageUpload'

const AiTransformation = () => {
    const [selectedAi, setSelectedAi] = useState<typeof AITransformationSettings[0] | null>(null)
  return (
    <div>
    <CustomImageUpload selectedAI={selectedAi} />
    <div className="max-h-[35vh] overflow-y-auto  grid grid-cols-1 sm:grid-cols-2 gap-2">
      {AITransformationSettings.map((item) => (
        <div
          key={item.name}
          className=" cursor-pointer flex flex-col items-center bg-white rounded-xl shadow-md border hover:shadow-lg transition-shadow p-2 cursor-pointer group mb-2"
        >
          <div className="w-full flex items-center justify-center mb-3" onClick={()=>setSelectedAi(item)}>
            <Image
              className="object-cover rounded-md border w-full h-[70px] group-hover:scale-105 transition-transform"
              src={item.image}
              alt={item.name}
              width={500}
              height={500}
            />
          </div>
          <p className="font-semibold text-md text-gray-800 mb-1 text-center w-full">{item.name}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default AiTransformation;