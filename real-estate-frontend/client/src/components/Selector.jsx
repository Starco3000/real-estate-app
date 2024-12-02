import React, { useRef, useState } from 'react';
import { FaChevronDown, FaCircleXmark } from 'react-icons/fa6';

function Selector({ selected, setSelected, data = [], placeholder, disabled }) {
  const [isActive, setIsActive] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  const inputRef = useRef(null);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchItem.toLowerCase()),
  );
  return (
    <div className='w-full h-10 font-lexend font-normal text-sm bg-white border-[1px] border-gray-300 rounded shadow-sm select-none relative'>
      <div
        className='flex justify-between items-center p-2 text-base'
        onClick={() => !disabled && setIsActive(!isActive)}
      >
        <input
          ref={inputRef}
          type='text'
          className='w-full focus:outline-none'
          placeholder={placeholder}
          value={selected ? selected.name : searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          disabled={selected !== null}
        />
        {selected ? (
          <button
            type='button'
            onClick={() => {
              setSelected(null);
              setSearchItem('');
              setIsActive(true);
              setTimeout(() => {
                inputRef.current.focus(); // Focus the input field
              }, 0);
            }}
          >
            <FaCircleXmark />
          </button>
        ) : (
          <FaChevronDown
            className={`${
              isActive
                ? 'rotate-180 transition-all duration-200 '
                : 'transition-all duration-200'
            }`}
          />
        )}
      </div>
      {isActive && !disabled && (
        <div className='w-full max-h-60 absolute top-[110%] pb-3 mt-3 border-[1px] border-gray-300 bg-white rounded shadow-md overflow-y-auto flex flex-col gap-y-2 z-30'>
          {/* Contents Items */}
          {filteredData.map((option) => (
            <div
              key={option.code || option.id}
              className='py-2 px-3 hover:bg-[#f4f4f4] transition-all duration-200'
              onClick={() => {
                console.log('Selected option:', option.name);
                setSelected(option);
                setIsActive(false);
                setSearchItem('');
              }}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Selector;
