import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import Images from './Images';
import { Clock, Coin, LocationMarker, Size } from './Icons';
import { TimeSince } from '../utils/TimeSinceUtill';
import { formatPrice, formatSize } from './FormatValue';

function PostCard({ data, handleEvent }) {
  const postDetailId = data.postDetailId;
  const agentInfo = data.userId;
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/admin/update-post/${data._id}`);
  };

  return (
    <Link to={`/admin/${data._id}`} className='block'>
      <div className='w-full h-[200px] bg-white border-[1px] border-gray-300 rounded-lg font-lexend font-normal text-sm flex flex-row gap-x-4 overflow-hidden'>
        <img
          src={postDetailId.images[0]}
          alt={data.title}
          loading='eager'
          className='w-[200px] h-full object-cover'
        />
        <div className='w-full flex flex-col justify-between overflow-hidden'>
          <div className='p-4 overflow-hidden'>
            <span className='h-11 font-medium text-base text-primary line-clamp-2 uppercase'>
              {data.title}
              {/* Cần bán căn nhà ngay ngã tư Phú Lâm, Quận 6 */}
            </span>
            <span
              className='text-xs line-clamp-2 mt-2'
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data.postDetailId.description),
              }}
            />
          </div>
          <div className='h-auto flex flex-col justify-center gap-y-2 text-nowrap'>
            <div className='w-full px-4 inline-flex justify-start items-center gap-x-5'>
              <span className='text-sm text-primary font-semibold flex items-center gap-1'>
                <Coin /> {formatPrice(data.price)}
                {/* 13 tỷ */}
              </span>
              <span className='text-sm text-primary font-semibold flex items-center gap-1'>
                <Size /> {formatSize(data.size)}
                {/* 100 m² */}
              </span>
              <span className='text-sm text-primary font-semibold flex items-center gap-1'>
                <LocationMarker /> {data.district[1]}, {data.province[1]}
                {/* Quận 6, TP. Hồ Chí Minh */}
              </span>
            </div>
            <div className='w-full h-full px-4 py-2 border-t-[0.5px] border-gray-300 flex justify-between items-center'>
              <div className='h-7 w-auto flex items-center gap-2'>
                <img
                  src={agentInfo.avatar || Images.noavatar}
                  alt=''
                  className='h-7 w-7 rounded-full'
                />
                <span>{agentInfo.name}</span>
              </div>
              <span className='italic opacity-50 flex justify-center items-center gap-x-2'>
                <Clock /> <TimeSince date={data.createdAt} />
                {/* 12:00 PM */}
              </span>
            </div>
          </div>
        </div>
        {/* ACTIONS BUTTON */}
        <div className='w-[70px] h-full border-l flex flex-col '>
          <button
            className='h-full bg-blue-500 text-white py-1 px-2 rounded-se-lg hover:bg-blue-400'
            onClick={handleUpdate}
          >
            Sửa
          </button>
          <button
            className='h-full bg-red-500 text-white py-1 px-2 rounded-ee-lg hover:bg-red-400'
            onClick={handleEvent}
          >
            Xóa
          </button>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
