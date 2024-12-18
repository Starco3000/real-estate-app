import React, { useEffect, useState } from 'react';
import { CiBitcoin, CiClock1 } from 'react-icons/ci';
import { MdOutlinePhotoSizeSelectSmall } from 'react-icons/md';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { TimeSince } from '../utils/TimeSinceUtill';
import { formatPrice, formatSize } from './FormatValue';
import DOMPurify from 'dompurify';
import { showToast } from './Toast';
import apiRequest from '../services/apiRequest';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';

function PostCardList({ data }) {
  console.log('data in PostCardList', data);
  const postDetailId = data.postDetailId;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      if (!data || !data._id) return;
      try {
        const response = await apiRequest.get('/favorites');
        const favorites = response.data.favorites;
        console.log('favorites:', response.data.favorites);
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
        showToast('Bỏ lưu bài viết thành công', 'success');
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
    <Link to={`/${data._id}`}>
      <div className='w-full h-auto bg-white border-[1px] border-gray-300 rounded-md font-lexend font-normal text-sm flex flex-col gap-x-4 overflow-hidden'>
        <div className='grid grid-rows-4 grid-cols-6 gap-0.5 lg:max-w-[694px] max-h-[233px]'>
          <div className='row-span-4 col-span-4'>
            <img
              src={postDetailId.images[0]}
              alt={data.title}
              className='w-full h-full object-cover'
            />
          </div>
          <div className='row-span-2 col-span-2'>
            <img
              src={postDetailId.images[1]}
              alt={data.title}
              className='w-full h-full object-cover'
            />
          </div>
          <div className='row-span-2 col-span-1'>
            <img
              src={postDetailId.images[2]}
              alt={data.title}
              className='w-full h-full object-cover'
            />
          </div>
          <div className='row-span-2 col-span-1'>
            <img
              src={postDetailId.images[3]}
              alt={data.title}
              className='w-full h-full object-cover'
            />
          </div>
        </div>
        <div className='w-full flex flex-col justify-between'>
          <div className='p-4'>
            <span className='font-medium text-base text-primary line-clamp-2 uppercase'>
              {data.title}
            </span>
            <span
              className='text-xs line-clamp-2 mt-2'
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data.postDetailId.description),
              }}
            />
          </div>
          <div className='h-auto flex flex-col justify-center gap-3 overflow-hidden'>
            <div className='w-full px-4 inline-flex justify-start items-center gap-x-5'>
              <span className='text-sm text-primary font-semibold flex items-center gap-1'>
                <CiBitcoin /> {formatPrice(data.price)}
              </span>
              <span className='text-sm text-primary font-semibold flex items-center gap-1'>
                <MdOutlinePhotoSizeSelectSmall /> {formatSize(data.size)}
              </span>
              <span className='text-sm text-primary font-semibold flex items-center gap-1'>
                <HiOutlineLocationMarker /> {data.district[1]},{' '}
                {data.province[1]}
              </span>
            </div>
            <div className='w-full h-full px-4 py-2 border-t-[0.5px] border-gray-300 flex justify-between items-center'>
              <span className='italic opacity-50 flex justify-center items-center gap-x-2'>
                <CiClock1 /> <TimeSince date={data.createdAt} />
              </span>
              <button className='h-7 w-7 p-1 border-[1px] border-gray-300 flex items-center rounded'>
                {!isFavorite ? (
                  <IoMdHeartEmpty className='text-xl text-black' />
                ) : (
                  <IoMdHeart className='text-xl text-red-400' />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCardList;
