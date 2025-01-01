import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLoaderData, useSearchParams } from 'react-router-dom';
import apiRequest from '../../services/apiRequest';
import InputField from '../../components/inputField/InputField';
import { showToast } from '../../components/Toast';
import { ChevronLeft, ChevronRight, Reload } from '../../components/Icons';

function ListAccountsPage() {
  const { accountsResponse } = useLoaderData();
  const [users, setUsers] = useState(accountsResponse.users);
  const totalPages = accountsResponse ? accountsResponse.totalPages : 1;
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


  const handleDeactivate = (userId) => {
    // Implement deactivate logic here
  };

  const handleDelete = async (accountId) => {
    try {
      await apiRequest.delete(`/admin/users/user/${accountId}`);
      showToast('Xóa người dùng thành công', 'success');
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== accountId),
      );
    } catch (error) {
      showToast('Xóa người dùng thất bại', 'error');
    }
  };

  return (
    <div className='w-full h-full mx-auto bg-main font-lexend font-normal text-sm'>
      <div className='w-full h-20 bg-white flex items-center px-10'>
        <h1 className='text-2xl font-medium'>Danh sách tài khoản người dùng</h1>
      </div>
      <div className='w-full my-4 px-4 flex justify-between items-center'>
        <button
          className='w-auto h-auto p-3 border border-black rounded-md bg-transparent flex items-center gap-x-2 hover:bg-primary hover:text-white transition-all duration-300 ease-in-out'
          // onClick={handleReset}
        >
          <Reload />
          Đặt lại tìm kiếm
        </button>
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
      <table className='w-[97%] mx-4 bg-white border border-gray-500 rounded overflow-hidden'>
        <thead>
          <tr>
            <th className='p-2 border border-gray-400'>STT</th>
            <th className='p-2 border border-gray-400'>Email</th>
            <th className='p-2 border border-gray-400'>Name</th>
            <th className='p-2 border border-gray-400'>Điện thoại</th>
            <th className='p-2 border border-gray-400'>Số bài post</th>
            <th className='p-2 border border-gray-400'>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((account, index) => (
            <tr key={account._id} className='border border-gray-400'>
              <td className='w-12 p-2 border-r border-gray-400 text-center'>
                {index + 1}
              </td>
              <td className='p-2 border-r border-gray-400'>{account.email}</td>
              <td className='p-2 border-r border-gray-400'>{account.name}</td>
              <td className='p-2 border-r border-gray-400'>{account.phone}</td>
              <td className='p-2 border-r border-gray-400 text-center'>
                {account.totalPosts}
              </td>
              <td className='p-2 text-center flex flex-col items-center gap-y-1'>
                <button
                  className='bg-yellow-500 text-white px-2 py-1 rounded mr-2'
                  onClick={() => handleDeactivate(account._id)}
                >
                  Deactivate
                </button>
                <button
                  className='bg-red-500 text-white px-2 py-1 rounded'
                  onClick={() => handleDelete(account._id)}
                >
                  Delete
                </button>
                <Link
                  to={`/admin/users/user/${account?._id}/posts`}
                  className='bg-blue-500 text-white text-nowrap px-2 py-1 rounded'
                >
                  View Posts
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

export default ListAccountsPage;
