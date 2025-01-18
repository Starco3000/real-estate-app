import { useEffect, useMemo, useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from '../components/Icons';
import apiRequest from '../services/apiRequest';
import PostCardList from '../components/PostCardList';

function FavoritePostPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get('keyword') || '',
  );
  const navigate = useNavigate();
  const [query, setQuery] = useState({
    keyword: searchParams.get('keyword') || '',
  });

  const currentPage = useMemo(
    () => parseInt(searchParams.get('page') || '1', 10),
    [searchParams],
  );

  const handlePageChange = (page) => {
    setSearchParams({ ...query, page });
  };

  const handleSearch = useCallback(() => {
    const queryString = new URLSearchParams({
      keyword: searchInput,
      page: 1, // Reset to first page on new search
      pageSize: 10, // Add pageSize parameter
    }).toString();
    navigate(`/favorites?${queryString}`);
  }, [searchInput, navigate]);

  useEffect(() => {
    setSearchInput(searchParams.get('keyword') || '');
  }, [searchParams]);

  useEffect(() => {
    async function getFavoritePosts() {
      setIsLoading(true);
      try {
        const response = await apiRequest('/favorites', {
          params: {
            keyword: searchParams.get('keyword') || '',
            page: currentPage,
            pageSize: 10,
          },
        });
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }
    getFavoritePosts();
  }, [searchParams, currentPage]);

  const postFavCount = data ? data.favoriteCount : 0;
  const totalPages = data ? data.totalPages : 1;

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
          <button
            type='button'
            className='h-10 px-4 bg-primary text-white rounded'
            onClick={handleSearch}
          >
            Tìm kiếm
          </button>
        </div>
      </div>
      {/* List Post Favorite*/}
      <div className='w-full max-w-[694px] bg-inherit flex flex-col gap-y-4'>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading posts: {error.message}</p>
        ) : (
          <>
            {Array.isArray(data.favorites) && data.favorites.length > 0 ? (
              data.favorites.map((post) => (
                <PostCardList key={post.postId._id} data={post.postId} />
              ))
            ) : (
              <p>Không có bài tin được lưu</p>
            )}
          </>
        )}
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
