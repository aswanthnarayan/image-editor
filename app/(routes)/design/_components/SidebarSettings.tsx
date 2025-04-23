import React from 'react'

const SidebarSettings = ({ selectedOption }: { selectedOption: { name: string; description: string } }) => {
  if (!selectedOption) {
    return (
      <div className="w-[280px] h-full flex items-center justify-center text-gray-400">
        Select an option
      </div>
    );
  }
  return (
    <>
    <div className="w-[280px] h-full p-4 border-l bg-white">
      <h2 className="text-lg font-semibold mb-2">{selectedOption.name}</h2>
      <p className="text-gray-600 text-sm">{selectedOption.desc || 'No description available.'}</p>
      <div className='mt-7'>
      {selectedOption?.component}
    </div>
    </div>
   
    </>
  );
}

export default SidebarSettings