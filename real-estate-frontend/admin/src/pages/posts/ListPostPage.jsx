import { Suspense, useMemo, useState } from 'react';
import PostCard from '../../components/PostCard';
import Filter from '../../components/filter/Filter';
import {
  Link,
  Await,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Reload,
} from '../../components/Icons';

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
          <button className='w-auto h-auto p-3 border border-black rounded-md bg-transparent flex items-center gap-x-2 hover:bg-primary hover:text-white transition-all duration-300 ease-in-out' 
          onClick={handleReset}>
            <Reload />
            Đặt lại tìm kiếm
          </button>
          {/* <Link to="/admin/add-post" className='w-auto h-auto p-3 border border-black rounded-md bg-transparent flex items-center gap-x-2 hover:bg-primary hover:text-white transition-all duration-300 ease-in-out'>
            <Plus />
            Thêm mới tin đăng
          </Link> */}
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
                posts.map((post) => <PostCard key={post._id} data={post} />)
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
      {/* <div className='w-full h-screen bg-white'>
        <table className='w-full'>
          <thead>
            <tr className='border-b'>
              <th className='py-3'>STT</th>
              <th className='py-3'>Tiêu đề</th>
              <th className='py-3'>Danh mục</th>
              <th className='py-3'>Ngày tạo</th>
              <th className='py-3'>Người tạo</th>
              <th className='py-3'>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b'>
              <td className='py-3'>1</td>
              <td className='py-3'>Bài viết 1</td>
              <td className='py-3'>Danh mục 1</td>
              <td className='py-3'>01/01/2021</td>
              <td className='py-3'>Admin</td>
              <td className='py-3'>
                <button className='bg-blue-500 text-white py-1 px-2 rounded'>Sửa</button>
                <button className='bg-red-500 text-white py-1 px-2 rounded'>Xóa</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>
  );
}

export default ListPostPage;
