import React, { useEffect, useState } from 'react';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { formatPrice, formatSize } from './FormatValue';
import Avatar from './Avatar';
import apiRequest from '../services/apiRequest';
import { showToast } from './Toast';

function EstateCard({ data }) {
  const postDetailId = data.postDetailId;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      const token = localStorage.getItem('token');
      if (!token || !data || !data._id) return;
      try {
        const response = await apiRequest.get('/favorites');
        const favorites = response.data.favorites;
        const isFav = favorites.some(
          (favorite) => favorite.postId._id === data._id,
        );
        setIsFavorite(isFav);
      } catch (error) {
        console.error('Failed to check favorite:', error);
      }
    };

    checkFavorite();
  }, [data._id]);

  const handleFavorite = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      if (isFavorite) {
        await apiRequest.delete(`/favorites/${data._id}`);
        showToast('Bỏ lưu bài viết thành công', 'info');
        setIsFavorite(false);
      } else {
        await apiRequest.post(`/favorites/${data._id}`);
        showToast('Lưu bài viết thành công', 'success');
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Failed to update favorite status:', error);
      showToast('Có lỗi xảy ra', 'error');
    }
  };
  return (
    <div className=' w-auto lg:max-w-[280px] h-[315px] bg-white shadow-md rounded-lg overflow-hidden'>
      <Link to={`/${data._id}`}>
        <img
          src={postDetailId?.images[0]}
          alt={data.title}
          className='w-full h-[144px] object-cover'
        />
        <div className='px-4'>
          <div className='w-full h-10'>
            <h2 className='mt-3 font-lexend font-semibold text-xs uppercase text-primary line-clamp-2'>
              {data.title}
            </h2>
          </div>
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
            <p className='text-base truncate'>
              {data.district[1]}, {data.province[1]}
            </p>
          </div>
          <div className='flex justify-between items-center mt-3 py-2 border-t-[0.5px] border-gray-200'>
            <div className='flex justify-start items-center gap-3'>
              <Avatar src={data.userId?.avatar} width={35} height={35} />
              <span>{data.userI?.name}</span>
            </div>
            <button
              className='h-7 w-7 p-1 border-[1px] border-gray-300 flex items-center rounded'
              onClick={handleFavorite}
            >
              {!isFavorite ? (
                <IoMdHeartEmpty className='text-xl text-black' />
              ) : (
                <IoMdHeart className='text-xl text-red-400' />
              )}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default EstateCard;
