import React, { useState } from 'react';

function SwitchBtn({ event, onToggle }) {
  const [isSelected, setIsSelected] = useState(event);

  const handleToggle = () => {
    setIsSelected(!isSelected);
    onToggle(!isSelected);
  };
  return (
    <div
      className={`w-[70px] h-8 m-1 font-lexend font-bold text-sm flex rounded-full items-center shadow relative transition duration-300 ease-in-out cursor-pointer ${
        isSelected ? 'bg-primary' : 'bg-gray-300'
      }`}
      onClick={handleToggle}
    >
      <div
        className={`w-full text-white absolute transition-transform duration-300 ease-in-out ${
          isSelected ? 'translate-x-4' : 'translate-x-9'
        }`}
      >
        {isSelected ? <span>ON</span> : <span>OFF</span>}
      </div>
      <span
        className={`w-8 h-8 bg-white border-2 border-primary rounded-full absolute transition-transform duration-300 ease-in-out ${
          isSelected && 'translate-x-11 '
        }`}
      />
    </div>
  );
}

export default SwitchBtn;
