import React from 'react';
import house1 from '../assets/house1.png';
import { CiBitcoin, CiHeart, CiClock1 } from 'react-icons/ci';
import { MdOutlinePhotoSizeSelectSmall } from 'react-icons/md';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { Link } from 'react-router-dom';

function PostCardList() {
  return (
    <Link to='/post-detail'>
      <div className='w-full h-[200px] bg-white border-[1px] border-gray-300 rounded-md font-lexend font-normal text-sm flex gap-x-4 overflow-hidden'>
        <div className='lg:min-w-[200px] h-full'>
          <img src={house1} alt='' className='w-full h-full object-cover' />
        </div>
        <div className='mt-4 flex flex-col gap-y-2 mr-4'>
          <span className='font-medium text-lg text-primary line-clamp-2'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
            iste tempora.
          </span>
          <span className='line-clamp-2'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
            excepturi dolorum in eligendi suscipit quidem minima nemo blanditiis
            obcaecati eaque?
          </span>
          <div className='w-full inline-flex justify-start items-center gap-x-8'>
            <span className='font-medium flex items-center'>
              <CiBitcoin /> 35 tỷ
            </span>
            <span className='font-medium flex items-center'>
              <MdOutlinePhotoSizeSelectSmall /> 150m2
            </span>
            <span className='font-medium flex items-center'>
              <HiOutlineLocationMarker /> Quận Bình Thạnh, TP.Hồ Chí Minh
            </span>
          </div>
          <div className='w-full h-1/4 border-t-[0.5px] border-gray-600 flex justify-between items-center'>
            <span className='flex justify-center items-center gap-x-2'>
              <CiClock1 /> 2 ngày trước
            </span>
            <button className='h-7 w-7 p-1 border-[1px] border-gray-300 flex items-center rounded'>
              <CiHeart className='text-xl' />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCardList;
