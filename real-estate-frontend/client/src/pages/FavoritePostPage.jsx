import { Suspense, useEffect, useMemo, useState } from 'react';
import PostCardList from '../components/PostCardList';
import { ChevronLeft, ChevronRight } from '../components/Icons';
import debounce from 'lodash.debounce';
import {
  Await,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

function FavoritePostPage() {
  const data = useLoaderData();
  const postFavCount = data.postResponse.favoriteCount;
  const totalPages = data.postResponses ? data.postResponses.totalPages : 1;
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  const [query] = useState({
    keyword: searchParams.get('keyword') || '',
  });

  const currentPage = useMemo(
    () => parseInt(searchParams.get('page') || '1', 10),
    [searchParams],
  );
  const handlePageChange = (page) => {
    setSearchParams({ ...query, page });
  };

  const handleSearch = debounce((value) => {
    const queryString = new URLSearchParams({
      keyword: value,
      page: 1, // Reset to first page on new search
      pageSize: 10, // Add pageSize parameter
    }).toString();
    navigate(`/favorites?${queryString}`);
    console.log('Search Query:', queryString);
  }, 300); // debounce delay

  useEffect(() => {
    handleSearch(searchInput);
  }, [searchInput]);

  return (
    <div className='w-full h-auto mt-24 font-lexend font-normal text-sm flex flex-col items-center gap-y-5 '>
      <div className='w-full max-w-[694px] h-auto mt-4 flex justify-start items-center'>
        <h1 className='text-2xl font-medium'>Bài tin bạn đã lưu</h1>
      </div>
      {/* Search */}
      <div className='w-full max-w-[694px] flex justify-between items-center'>
        <span className='text-base'>
          Tổng số tin đăng đã lưu: {postFavCount}
        </span>
        <div className='w-auto flex gap-2'>
          <input
            type='text'
            name='search'
            className='w-[250px] h-10 px-2 outline-none border border-black rounded'
            value={searchInput}
            placeholder='Tìm kiếm...'
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>
      {/* List Post Favorite*/}
      <div className='w-full max-w-[694px] bg-inherit flex flex-col gap-y-4'>
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse) => {
              const posts = postResponse.favorites;
              console.log('posts', posts);
              return Array.isArray(posts) && posts.length > 0 ? (
                posts.map((post) => (
                  <PostCardList key={post.postId._id} data={post.postId} />
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
  );
}

export default FavoritePostPage;
