import React from 'react';
import PostCardList from '../components/PostCardList';
import { Link } from 'react-router-dom';
import ListPostSearch from '../components/search/ListPostSearch';

function ListPost() {
  return (
    <div className='w-full h-auto flex flex-col justify-center items-start gap-y-4 font-lexend font-normal text-sm pt-28'>
      <div className='w-full h-[100px] flex justify-center items-center'>
        <ListPostSearch />
      </div>
      <div className='w-full h-auto flex justify-center items-start gap-x-8'>
        {/* left content */}
        <div className='w-full max-w-[694px] bg-inherit mb-10 flex flex-col gap-y-4'>
          <PostCardList />
          <PostCardList />
          <PostCardList />
          <PostCardList />
          <PostCardList />
          <PostCardList />
          <PostCardList />
        </div>
        {/* right content */}
        <div className='w-full h-[500px] max-w-[230px] mb-10'>
          {/* Related Post */}
          <div className='px-5 py-4 border-[1px] border-gray-300 rounded-md flex flex-col justify-center items-start shadow-sm '>
            <span className='font-semibold text-primary text-base'>
              Bất động sản liên quan
            </span>
            <ul>
              <li className='mt-4 hover:opacity-60'>
                <Link to='/list'>Bán nhà Phường X Quận Y</Link>
              </li>
              <li className='mt-4 hover:opacity-60'>
                <Link to='/list'>Bán nhà Phường X Quận Y</Link>
              </li>
              <li className='mt-4 hover:opacity-60'>
                <Link to='/list'>Bán nhà Phường X Quận Y</Link>
              </li>
              <li className='mt-4 hover:opacity-60'>
                <Link to='/list'>Bán nhà Phường X Quận Y</Link>
              </li>
              <li className='mt-4 hover:opacity-60'>
                <Link to='/list'>Bán nhà Phường X Quận Y</Link>
              </li>
              <li className='mt-4 hover:opacity-60'>
                <Link to='/list'>Bán nhà Phường X Quận Y</Link>
              </li>
              <li className='mt-4 hover:opacity-60'>
                <Link to='/list'>Bán nhà Phường X Quận Y</Link>
              </li>
              <li className='mt-4 hover:opacity-60'>
                <Link to='/list'>Bán nhà Phường X Quận Y</Link>
              </li>
              <li className='mt-4 hover:opacity-60'>
                <Link to='/list'>Bán nhà Phường X Quận Y</Link>
              </li>
              <li className='mt-4 hover:opacity-60'>
                <Link to='/list'>Bán nhà Phường X Quận Y</Link>
              </li>
              <li className='mt-4 hover:opacity-60'>
                <Link to='/list'>Bán nhà Phường X Quận Y</Link>
              </li>
              <li className='mt-4 hover:opacity-60'>
                <Link to='/list'>Bán nhà Phường X Quận Y</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListPost;
