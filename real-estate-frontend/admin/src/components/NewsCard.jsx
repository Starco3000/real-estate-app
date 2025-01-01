import React from 'react';
import Images from './Images';
import { Link, useNavigate } from 'react-router-dom';
import { TimeSince } from '../utils/TimeSinceUtill';
import { showToast } from './Toast';
import apiRequest from '../services/apiRequest';

function NewsCard({ data, event, setData }) {
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/admin/news/update-news/${data._id}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await apiRequest.delete(`/admin/news/delete-news/${data._id}`);
      showToast('Xóa bài viết thành công', 'success');
      setData((prev) => ({data: {news: [...prev.data.news.filter((item) => item._id !== data._id)]}}));
      
    } catch (error) {
      console.log(error)
      showToast('Xóa bài viết thất bại', 'error');
    }
  };

  return (
    <Link to={`/admin/news/single-news/${data._id}`} className='block'>
      <div className='w-full max-w-[500px] h-[400px] bg-white font-lexend font-normal text-sm rounded-md shadow-md border overflow-hidden'>
        <div className='w-full h-1/2 bg-slate-400'>
          <img
            src={data.thumbnail || Images.wallpaper}
            alt=''
            className='w-full h-full object-cover'
          />
        </div>
        <div className='w-full h-1/2 p-4 flex flex-col justify-between'>
          <div>
            <h1 className='pb-2 text-xl font-medium line-clamp-2'>
              {data.title}
            </h1>
          </div>
          <div className='w-full flex justify-between items-center mt-2'>
            <p className='text-gray-500'>
              <TimeSince date={data.createdAt} />
            </p>
            <div className='flex items-center gap-2'>
              <div
                className={`flex items-center gap-2 transition-opacity duration-300 ${
                  event ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <button
                  className='bg-blue-500 text-white px-2 py-1 rounded'
                  onClick={handleUpdate}
                >
                  Sửa
                </button>
                <button
                  className='bg-red-500 text-white px-2 py-1 rounded'
                  onClick={handleDelete}
                >
                  Xóa
                </button>
              </div>
              <button className='bg-primary text-white px-2 py-1 rounded'>
                Xem thêm
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default NewsCard;
