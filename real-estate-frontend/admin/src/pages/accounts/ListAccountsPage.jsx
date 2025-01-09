import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Link, useLoaderData, useSearchParams } from 'react-router-dom';
import apiRequest from '../../services/apiRequest';
import InputField from '../../components/inputField/InputField';
import { showToast } from '../../components/Toast';
import { ChevronLeft, ChevronRight, Reload } from '../../components/Icons';

function ListAccountsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get('keyword') || '',
  );

  useEffect(() => {
    async function getUsers() {
      const response = await apiRequest('/admin/users');
      setData(response.data);
    }
    getUsers();
  }, []);

  const searchAccount = useCallback(async () => {
    setLoading(true);
    const response = await apiRequest(`/admin/users?keyword=${searchInput}`);
    setData(response.data);
    setLoading(false);
  }, [searchInput]);

  const handleReset = async () => {
    setLoading(true);
    const response = await apiRequest(`/admin/users`);
    setData(response.data);
    setSearchInput('');
    setLoading(false);
  };

  const handleToggleUserStatus = useCallback(
    async (userId, isDisabled) => {
      setLoading(true);
      try {
        const endpoint = isDisabled
          ? `/admin/users/user/${userId}/enable`
          : `/admin/users/user/${userId}/disable`;
        const response = await apiRequest.put(endpoint);
        const updatedUser = response.data.user;
        const updatedUsers = data.users.map((user) =>
          user._id === userId ? updatedUser : user,
        );
        setData((prevData) => ({ ...prevData, users: updatedUsers }));
        showToast('Trạng thái tài khoản cập nhập thành công', 'success');
      } catch (error) {
        console.error('Failed to toggle user status', error);
      } finally {
        setLoading(false);
      }
    },
    [data],
  );

  const totalPages = data?.totalPages;
  const currentPage = useMemo(
    () => parseInt(searchParams.get('page') || '1', 20),
    [searchParams],
  );

  const handlePageChange = (page) => {
    setSearchParams({ keyword: searchInput, page });
  };

  // const handleDeactivate = (userId) => {
  //   // Implement deactivate logic here
  // };

  const handleDelete = async (accountId) => {
    try {
      await apiRequest.delete(`/admin/users/user/${accountId}`);
      setData((prevData) => ({
        ...prevData,
        users: prevData.users.filter((user) => user._id !== accountId),
      }));
      showToast('Xóa người dùng thành công', 'success');
    } catch (error) {
      showToast('Xóa người dùng thất bại', 'error');
    }
  };

  return (
    <div className='w-full h-full mx-auto bg-main font-lexend font-normal text-sm'>
      <div className='w-full h-20 bg-white flex items-center px-10'>
        <h1 className='text-2xl font-medium'>Danh sách tài khoản người dùng</h1>
      </div>
      <div className='w-full h-auto my-4 px-4 flex justify-between items-center'>
        <button
          className='w-auto h-auto p-3 border border-black rounded-md bg-transparent flex items-center gap-x-2 hover:bg-primary hover:text-white transition-all duration-300 ease-in-out'
          onClick={handleReset}
        >
          <Reload />
          Đặt lại tìm kiếm
        </button>
        <div className='w-[300px] flex flex-row gap-3'>
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
            onClick={searchAccount}
          >
            Seach
          </button>
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
          {data?.users?.map((account, index) => (
            <tr key={account._id} className='border border-gray-400'>
              <td className='w-12 p-2 border-r border-gray-400 text-center'>
                {index + 1}
              </td>
              <td className='p-2 border-r border-gray-400'>{account.email}</td>
              <td className='p-2 border-r border-gray-400'>{account.name}</td>
              <td className='p-2 border-r border-gray-400'>{account.phone}</td>
              <td className='p-2 border-r border-gray-400 text-center'>
                {account?.totalPosts}
              </td>
              <td className='p-2 text-center flex flex-col items-center gap-y-1'>
                <button
                  className='bg-yellow-500 text-white px-2 py-1 rounded mr-2'
                  onClick={() =>
                    handleToggleUserStatus(account?._id, account?.isDisabled)
                  }
                  // disabled={account?.isDisabled}
                >
                  {account?.isDisabled ? 'Enable' : 'Disable'}
                </button>
                <button
                  className='bg-red-500 text-white px-2 py-1 rounded'
                  onClick={() => handleDelete(account?._id)}
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
