import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Reload } from '../components/Icons';
import apiRequest from '../services/apiRequest';
import Filter from '../components/search/Filter';
import PostCard from '../components/PostCard';

function UserPostPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get('keyword') || '',
  );
  const navigate = useNavigate();
  const [query, setQuery] = useState({
    status: searchParams.get('status') || '',
    province: searchParams.get('province') || '',
    district: searchParams.get('district') || '',
    ward: searchParams.get('ward') || '',
    type: searchParams.get('type') || '',
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
      status: query.status ? query.status.value : '',
      province: query.province ? query.province.name : '',
      district: query.district ? query.district.name : '',
      ward: query.ward ? query.ward.name : '',
      type: query.type ? query.type.name : '',
      keyword: searchInput,
      page: 1, // Reset to first page on new search
      pageSize: 10, // Add pageSize parameter
    }).toString();
    navigate(`/user-posts?${queryString}`);
  }, [query, searchInput, navigate]);

  const handleReset = () => {
    setQuery({
      status: '',
      province: '',
      district: '',
      ward: '',
      type: '',
      keyword: '',
    });
    setSearchInput('');
    setSearchParams({});
  };

  useEffect(() => {
    setSearchInput(searchParams.get('keyword') || '');
  }, [searchParams]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await apiRequest('/users/posts/userPosts', {
          params: {
            status: query.status,
            province: query.province,
            district: query.district,
            ward: query.ward,
            type: query.type,
            keyword: query.keyword,
            page: currentPage,
            pageSize: 10,
          },
        });
        setData(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [query, currentPage]);

  const totalPages = data ? data.totalPages : 1;

  return (
    <div className='w-full h-full p-4 bg-gray-200 border shadow-lg'>
      {/* Search and filter */}
      <div className='w-full h-auto p-4 flex flex-col gap-3 bg-white sticky top-0 right-auto left-auto z-10'>
        <div className='flex flex-wrap justify-between gap-3 '>
          <div className='w-auto flex flex-1'>
            <Filter query={query} setQuery={setQuery} />
          </div>
          <div className='w-full h-auto flex justify-between gap-x-5'>
            <button
              className='w-auto h-auto p-3 border border-black rounded-md bg-transparent flex items-center gap-x-2 hover:bg-primary hover:text-white transition-all duration-300 ease-in-out'
              onClick={handleReset}
            >
              <Reload />
              Đặt lại tìm kiếm
            </button>
            <div className='w-auto flex gap-2'>
              <input
                type='text'
                name='search'
                className='w-[180px] h-10 px-2 outline-none border border-black'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                className='w-auto h-10 bg-primary text-white py-1 px-2 rounded'
                onClick={handleSearch}
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Posts List*/}
      <div className='py-2 grid grid-cols-1 gap-2'>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading posts: {error}</p>
        ) : (
          <>
            {Array.isArray(data.posts) && data.posts.length > 0 ? (
              data.posts.map((post) => <PostCard key={post._id} data={post} />)
            ) : (
              <p>Bạn chưa có bài tin nào</p>
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

export default UserPostPage;
