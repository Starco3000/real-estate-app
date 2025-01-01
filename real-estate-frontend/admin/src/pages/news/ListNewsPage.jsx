import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { Await, Link, useLoaderData, useSearchParams } from 'react-router-dom';
import InputField from '../../components/inputField/InputField';
import NewsCard from '../../components/NewsCard';
import SwitchBtn from '../../components/SwitchBtn';
import { Plus } from '../../components/Icons';
import apiRequest from '../../services/apiRequest';
import LoaderSpinner from '../../components/LoaderSpinner';

function ListNewsPage() {
  const [data, setData] = useState();
  const [isUpdate, setIsUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get('keyword') || '',
  );
  useEffect(() => {
    async function getNews() {
      setLoading(true);
      const response = await apiRequest(`/admin/news/all-news`);
      setData(response);
      // setData(await apiRequest(`/admin/news/all-news`));
      setLoading(false);
    }
    getNews();
  }, []);
  const searchNews = useCallback(async () => {
    setLoading(true);
    const response = await apiRequest(`/admin/news/all-news?keyword=${searchInput}`);
    setData(response);
    // setData(await apiRequest(`/admin/news/all-news?keyword=${searchInput}`));
    setLoading(false);
  }, [searchInput]);

  const handleSwitchChange = (newState) => {
    setIsUpdate(newState);
  };

  return (
    <div className='w-full h-full pb-10 mx-auto bg-main font-lexend font-normal text-sm'>
      <div className='w-full h-20 bg-white flex items-center px-10'>
        <h1 className='text-2xl font-medium'>Danh sách tin tức</h1>
      </div>
      {/* Search input */}
      <div className='w-full my-4 px-4 flex justify-between'>
        <div className='flex items-center gap-2 font-medium text-lg'>
          <SwitchBtn event={isUpdate} onToggle={handleSwitchChange} />
          Chỉnh sửa tin tức
        </div>
        <div className='flex gap-4'>
          <Link
            to='/admin/news/add-news'
            className='px-4 py-2 flex items-center gap-2 border border-primary bg-transparent text-black rounded-md hover:bg-primary hover:text-white transition duration-300 ease-in-out'
          >
            <Plus />
            Thêm tin tức
          </Link>
          <div className='w-[300px] flex items-center gap-2'>
            <InputField
              type='text'
              id='search'
              name='search'
              placeholder='Nhập từ khóa tìm kiếm...'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              type='button'
              className='w-auto h-auto p-2.5 bg-primary rounded text-white'
              onClick={searchNews}
            >
              Seach
            </button>
          </div>
        </div>
      </div>

      {/* List News */}
      {loading ? (
        <div className='w-full h-full flex justify-center items-center'>
          <LoaderSpinner /> 
        </div>
      ) : (
        // List News
        <div className='w-full h-auto grid grid-cols-3 gap-4 px-4'>
          {data !== undefined &&
            data.data.news.map((value) => (
              <NewsCard
                key={value._id}
                data={value}
                event={isUpdate}
                setData={setData}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default ListNewsPage;
