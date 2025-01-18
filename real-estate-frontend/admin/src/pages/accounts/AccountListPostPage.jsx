import { useEffect, useMemo, useState, useCallback } from 'react';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import apiRequest from '../../services/apiRequest';
import InputField from '../../components/inputField/InputField';
import PostCard from '../../components/PostCard';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Search,
} from '../../components/Icons';

function AccountListPostPage() {
  const { id } = useParams();
  const [userPosts, setUserPosts] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get('keyword') || '',
  );
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-3);
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const postsResponse = await apiRequest(`/admin/users/user/${id}/posts`);
        setUserPosts(postsResponse.data);
        const userResponse = await apiRequest(`/admin/users/user/${id}`);
        setUserInfo(userResponse.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const currentPage = useMemo(
    () => parseInt(searchParams.get('page') || '1', 20),
    [searchParams],
  );

  const handlePageChange = (page) => {
    setSearchParams({ keyword: searchInput, page });
  };

  useEffect(() => {
    setSearchInput(searchParams.get('keyword') || '');
  }, [searchParams]);

  const searchUserPost = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await apiRequest(
        `/admin/users/user/${id}/posts?${searchParams.toString()}`,
      );
      setUserPosts(response.data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, [searchParams, id]);

  useEffect(() => {
    searchUserPost();
  }, [searchParams, searchUserPost]);

  const totalPages = userPosts ? userPosts.totalPages : 1;

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
              <button
                className='w-10 h-10 bg-primary flex justify-center items-center text-white rounded'
                onClick={() =>
                  setSearchParams({ keyword: searchInput, page: 1 })
                }
              >
                <Search />
              </button>
            </div>
          </div>
        </div>
        {/* List Post of User */}
        <div className='flex flex-col gap-y-3'>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error loading posts: {error}</p>
          ) : (
            <>
              {Array.isArray(userPosts?.posts) && userPosts.posts.length > 0 ? (
                userPosts.posts.map((post) => (
                  <PostCard
                    key={post._id}
                    data={post}
                  />
                ))
              ) : (
                <p>Không có bài tin phù hợp</p>
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
    </div>
  );
}

export default AccountListPostPage;
