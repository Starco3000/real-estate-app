import React from 'react';
import Avatar from './Avatar';
import Images from './Images';

function NewsPreview({ title, thumbnail, description }) {
  console.log('Thumbnail:', thumbnail);
  console.log('Title:', title);
  return (
    <div className='w-full h-auto bg-white p-4 rounded border shadow-lg flex flex-col items-center '>
      <div className='w-[400px] h-auto pb-3 border shadow-md '>
        <img
          src={thumbnail?.url || Images.wallpaper}
          alt=''
          className='w-full h-[200px] object-cover'
        />
        <h3 className='py-3 px-2 font-medium text-lg line-clamp-2 capitalize'>
          {title || 'Tiêu đề tin tức'}
        </h3>
        <div className='w-full h-[40px] px-3 text-gray-500 overflow-hidden'>
          <p
            className='line-clamp-3'
            dangerouslySetInnerHTML={{
              __html: description || 'Mô tả bài viết',
            }}
          />
        </div>
        <div className='w-full px-2 flex justify-between items-center mt-2'>
          <p className='text-gray-500'>10/10/2021</p>
          <button className='bg-primary text-white px-2 py-1 rounded'>
            Xem thêm
          </button>
        </div>
      </div>
      <main className='w-full h-auto py-4'>
        {/* TITLE OF NEWS */}
        <div className='w-full h-auto '>
          <h1 className='font-semibold text-3xl'>
            {title || 'Tiêu đề bài viết'}
          </h1>
        </div>
        {/*Author Info */}
        <div className='w-full h-auto py-6 flex justify-start items-center gap-x-4'>
          <Avatar src={Images.logo} width={50} height={45} />
          <div className='w-full h-auto text-base'>
            <span>
              Được đăng bởi <b>Admin</b>
            </span>
            <p>Cập nhập lần cuối vào ngày XX/YY/ZZZZ</p>
          </div>
        </div>
        {/* Content */}
        <div className='w-full h-[800px] flex flex-row justify-between relative'>
          {/* Left content */}
          <div className='w-[800px] h-auto px-3 overflow-y-scroll hide-scrollbar'>
            <article>
              <div
                dangerouslySetInnerHTML={{
                  __html: description || 'Mô tả bài viết',
                }}
              />
            </article>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NewsPreview;
