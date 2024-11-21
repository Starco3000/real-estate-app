import React from 'react';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { CiHeart } from 'react-icons/ci';
import house1 from '../assets/house1.png';
import { Link } from 'react-router-dom';

function EstateCard() {
  return (
    <div className=' w-auto lg:w-[260px] h-[315px] bg-white shadow-md rounded-lg overflow-hidden'>
      <Link to='/post-detail'>
        <img src={house1} alt='House' className='w-full h-[144px]' />
        <div className='px-4'>
          <h2 className='mt-3 font-lexend font-medium text-sm uppercase text-black line-clamp-2'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit nihil
            numquam ex eos illo repellendus.
          </h2>
          <div className='flex justify-between items-center mt-1'>
            <span className='font-lexend font-semibold text-sm text-red-500'>
              $10.000
            </span>
            <span className='font-lexend font-semibold text-sm text-red-500'>
              100m2
            </span>
          </div>
          <div className='flex justify-start items-center mt-1 gap-1 font-lexend font-normal text-sm text-gray-600'>
            <HiOutlineLocationMarker />
            Quận 7, TP.HCM
          </div>
          <div className='flex justify-between items-center mt-4'>
            <div>
              Avatar <span>Người đăng</span>
            </div>
            <button className='h-7 w-7 p-1 border-[1px] border-gray-300 flex items-center rounded'>
              <CiHeart className='text-xl' />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default EstateCard;
