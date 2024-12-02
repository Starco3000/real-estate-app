import React from 'react';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { CiHeart } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { formatPrice, formatSize } from './FormatValue';
import Avatar from './Avatar';

function EstateCard({ data }) {
  return (
    <div className=' w-auto lg:max-w-[280px] h-[315px] bg-white shadow-md rounded-lg overflow-hidden'>
      <Link to={`/${data._id}`}>
        <img
          src={data.images[0]}
          alt={data.title}
          className='w-full h-[144px]'
        />
        <div className='px-4'>
          <h2 className='mt-3 font-lexend font-semibold text-xs uppercase text-primary line-clamp-2'>
            {data.title}
          </h2>
          <div className='flex justify-between items-center mt-1'>
            <span className='font-lexend font-semibold text-sm text-red-500'>
              {formatPrice(data.price)}
            </span>
            <span className='font-lexend font-semibold text-sm text-red-500'>
              {formatSize(data.size)}
            </span>
          </div>
          <div className='flex justify-start items-center mt-2 gap-1 font-lexend font-normal text-sm text-primary'>
            <HiOutlineLocationMarker />
            <p className='text-base truncate'>{data.district}, {data.province}</p>
          </div>
          <div className='flex justify-between items-center mt-3 py-2 border-t-[0.5px] border-gray-200'>
            <div className='flex justify-start items-center gap-3'>
              <Avatar src={data.userId.avatar} width={35} height={35} />
              <span>{data.userId.name}</span>
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
