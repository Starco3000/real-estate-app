import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

function ListAccountsPage() {
  const { accountsResponse } = useLoaderData();
  return (
    <div className='mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>
        Danh sách tài khoản người dùng
      </h1>
      <table className='min-w-full bg-white border border-gray-200'>
        <thead>
          <tr>
            <th className='py-2 px-4 border-b'>Số thứ tự</th>
            <th className='py-2 px-4 border-b'>Email</th>
            <th className='py-2 px-4 border-b'>Name</th>
            <th className='py-2 px-4 border-b'>Số điện thoại</th>
            <th className='py-2 px-4 border-b'>Tổng số bài post</th>
            <th className='py-2 px-4 border-b'>Action</th>
          </tr>
        </thead>
        <tbody>
          {accountsResponse.map((account, index) => (
            <tr key={account._id}>
              <td className='py-2 px-4 border-b text-center'>{index + 1}</td>
              <td className='py-2 px-4 border-b'>{account.email}</td>
              <td className='py-2 px-4 border-b'>{account.name}</td>
              <td className='py-2 px-4 border-b'>{account.phone}</td>
              <td className='py-2 px-4 border-b text-center'>
                {account.totalPosts}
              </td>
              <td className='py-2 px-4 border-b text-center'>
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
                  to={`/admin/users/${account._id}/posts`}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  View Posts
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListAccountsPage;
