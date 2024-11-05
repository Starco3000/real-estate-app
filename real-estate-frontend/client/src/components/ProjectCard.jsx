import React from 'react';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import apartment1 from '../assets/apartment1.png';

function ProjectCard() {
  return (
    <div className='w-[220px] h-[300px] md:w-[260px] md:h-[315px] md:mx-4 my-1 bg-white shadow-md rounded-lg overflow-hidden cursor-pointer'>
      <img
        src={apartment1}
        alt='Aparment'
        className='w-full h-[144px] object-fill'
      />
      <div className='px-4'>
        <div className='h-6 w-20 bg-red-100 mt-2 flex justify-center items-center rounded-sm'>
          <span className='font-lexend font-normal text-xs text-red-500'>
            Sắp mở bán
          </span>
        </div>
        <h2 className='mt-3 font-lexend font-medium text-sm uppercase text-black line-clamp-1'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit nihil
          numquam ex eos illo repellendus.
        </h2>
        <div className='flex justify-between items-center mt-1'>
          <span className='font-lexend font-normal text-sm text-black'>
            $10.000
          </span>
          <span className='font-lexend font-normal text-sm text-black'>
            100m2
          </span>
        </div>
        <div className='flex justify-start items-center mt-8 gap-1 font-lexend font-normal text-sm text-gray-600'>
          <HiOutlineLocationMarker />
          Long Biên, Hà Nội
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
