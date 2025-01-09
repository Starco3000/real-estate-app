import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { Await, useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
import PostCard from '../../components/PostCard';
import { ArrowLeft, ChevronLeft, ChevronRight } from '../../components/Icons';
import InputField from '../../components/inputField/InputField';

function AccountListPostPage() {
  const { userPosts, userPromise } = useLoaderData();
  const userInfo = userPromise.user;
  // console.log('User Posts:', userPosts);
  // console.log('User data:', userPromise.user.name);

  const totalPages = userPosts ? userPosts.totalPages : 1;
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get('keyword') || '',
  );

  const currentPage = useMemo(
    () => parseInt(searchParams.get('page') || '1', 20),
    [searchParams],
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchParams({ keyword: searchInput, page: 1 });
    }, 100);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput, setSearchParams]);

  const handlePageChange = (page) => {
    setSearchParams({ keyword: searchInput, page });
  };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-4);
  };

  return (
    <div className='bg-white h-full font-lexend font-normal text-sm'>
      {/* Back button */}
      <div className='w-full h-auto pt-10'>
        <button
          className='mb-6 ml-10 text-lg flex items-center gap-x-3 '
          onClick={handleBack}
        >
          <ArrowLeft /> Back
        </button>
      </div>

      <div className='h-auto px-10 bg-white'>
        <div className='w-full h-auto pb-4'>
          <h1 className='text-2xl mb-3 capitalize'>
            Các bài post của người dùng <b>{userInfo?.name}</b>
          </h1>
          <div className='flex justify-between items-center'>
            <span className='text-base text-gray-400'>
              Tổng số bài post:
              <b className='font-medium text-black'> {userPosts?.totalPosts}</b>
            </span>
            <div className='w-[300px]'>
              <InputField
                type='text'
                id='search'
                name='search'
                placeholder='Nhập từ khóa tìm kiếm...'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* List Post of User */}
        <div className='flex flex-col gap-y-3'>
          <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={userPosts} errorElement={<p>Error loading posts!</p>}>
              {(postResponse) => {
                const posts = postResponse.posts;
                return Array.isArray(posts) && posts.length > 0 ? (
                  posts.map((post) => (
                    <PostCard
                      key={post._id}
                      data={post}
                      // handleEvent={handleDelete}
                    />
                  ))
                ) : (
                  <p>No posts available</p>
                );
              }}
            </Await>
          </Suspense>
        </div>

        {/* Pagination */}
        <div className='w-full h-9 my-4 flex justify-center gap-x-1'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='w-9 h-auto flex justify-center items-center text-base text-white rounded bg-primary '
          >
            <ChevronLeft />
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`w-9 h-full border-[0.5px] border-primary ${
                currentPage === index + 1 ? 'active' : ''
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='w-9 h-auto flex justify-center items-center text-base text-white rounded bg-primary '
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountListPostPage;
