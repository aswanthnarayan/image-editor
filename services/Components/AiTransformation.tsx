import React, { useState } from 'react'
import { AITransformationSettings } from '../Options'
import Image from 'next/image'
import CustomImageUpload from '../Sharable/CustomImageUpload'

const AiTransformation = () => {
    const [selectedAi, setSelectedAi] = useState<typeof AITransformationSettings[0] | null>(null);
    const [loading, setLoading] = useState(false);
  return (
    <div>
    <CustomImageUpload selectedAI={selectedAi} loading={loading} setLoading={setLoading} setSelectedAI={setSelectedAi} />
    <div className="max-h-[35vh] overflow-y-auto  grid grid-cols-1 sm:grid-cols-2 gap-2">
      {AITransformationSettings.map((item) => {
  const isSelected = selectedAi?.name === item.name;
  return (
    <div
      key={item.name}
      onClick={() => !loading && setSelectedAi(item)}
      className={`relative cursor-pointer flex flex-col items-center bg-white rounded-xl shadow-md border hover:shadow-lg transition-shadow p-2 group mb-2
        ${isSelected ? 'ring-2 ring-blue-500' : ''}
        ${loading ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <div className="w-full flex items-center justify-center mb-3">
        <Image
          className="object-cover rounded-md border w-full h-[70px] group-hover:scale-105 transition-transform"
          src={item.image}
          alt={item.name}
          width={500}
          height={500}
        />
        {isSelected && (
          <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded shadow">Selected</span>
        )}
      </div>
      <p className="font-semibold text-md text-gray-800 mb-1 text-center w-full">{item.name}</p>
    </div>
  );
})}
      </div>
    </div>
  );
};

export default AiTransformation;