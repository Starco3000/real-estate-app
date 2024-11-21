import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';

function Drawer({ title, items }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className='relative h-auto'>
      <div className='w-full flex flex-row justify-between bg-primary text-white p-2' onClick={toggleDrawer}>
        {title}
        <FaChevronDown
          className={`float-right transition-transform duration-500 ease-in-out ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </div>
      <ul
        className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        {items.map((item, index) => (
          <li
            key={index}
            className='bg-white hover:text-primary hover:font-medium cursor-pointer p-2'
          >
            <Link to={item.link}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Drawer;
