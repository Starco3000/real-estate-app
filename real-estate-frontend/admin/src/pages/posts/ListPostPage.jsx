import { Suspense, useMemo, useState } from 'react';
import PostCard from '../../components/PostCard';
import Filter from '../../components/filter/Filter';
import {
  Await,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import apiRequest from '../../services/apiRequest';
import { ChevronLeft, ChevronRight, Reload } from '../../components/Icons';
import { showToast } from '../../components/Toast';

function ListPostPage() {
  const data = useLoaderData();
  const postResponses = data.postResponse.data;
  const totalPages = postResponses ? postResponses.totalPages : 1;
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState('');
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

  const handleSearch = () => {
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
    navigate(`/admin/list?${queryString}`);
    console.log('Search Query:', query);
  };

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

  const handleDelete = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await apiRequest.delete(`/admin/posts/${data._id}`);
      showToast('Xóa bài viết thành công', 'success');
    } catch (error) {
      showToast('Xóa bài viết thất bại', 'error');
    }
  };

  return (
    <div className='w-full h-auto pb-4 bg-main font-lexend font-normal text-sm relative '>
      <div className='w-full h-20 bg-white flex items-center px-10'>
        <h1 className='text-2xl font-medium'>Danh sách bài viết</h1>
      </div>
      {/* Search Filter */}
      <div className='w-full h-auto p-4 flex flex-col gap-3 bg-main sticky top-0 right-auto left-auto z-10'>
        <div className='flex justify-between gap-3'>
          <div className='w-auto flex'>
            <Filter query={query} setQuery={setQuery} />
          </div>
          <div className='w-auto flex gap-2'>
            <input
              type='text'
              name='search'
              className='w-[200px] h-10 px-2 outline-none border border-black'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              className='w-16 h-10 bg-primary text-white py-1 px-2 rounded'
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
        <div className='w-full h-auto flex justify-between gap-x-5'>
          <button
            className='w-auto h-auto p-3 border border-black rounded-md bg-transparent flex items-center gap-x-2 hover:bg-primary hover:text-white transition-all duration-300 ease-in-out'
            onClick={handleReset}
          >
            <Reload />
            Đặt lại tìm kiếm
          </button>
        </div>
      </div>
      {/* Post List*/}
      <div className='px-4 py-2 grid grid-cols-1 gap-2'>
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse) => {
              const posts = postResponse.data.posts;
              console.log('posts', posts);
              return Array.isArray(posts) && posts.length > 0 ? (
                posts.map((post) => (
                  <PostCard
                    key={post._id}
                    data={post}
                    handleEvent={handleDelete}
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
  );
}

export default ListPostPage;
