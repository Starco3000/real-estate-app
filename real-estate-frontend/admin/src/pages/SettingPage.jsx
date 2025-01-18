import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { uploadFile } from '../helpers/uploadFile';
import { showToast } from '../components/Toast';
import Avatar from '../components/Avatar';
import Images from '../components/Images';
import apiRequest from '../services/apiRequest';

function SettingPage() {
  const [error, setError] = useState('');
  const { currentAdmin, updateAdmin } = useContext(AuthContext);
  const [isAvatar, setIsAvatar] = useState([]);

  const uploadPhotoRef = useRef();

  const handleOpenUploadPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadPhotoRef.current.click();
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    console.log('file', file);
    if (!file) return;
    const folder = 'avatars'; // LocationLocation to store images
    const uploadPhoto = await uploadFile(file, folder); // Upload files to cloudinary
    console.log('uploadPhoto', uploadPhoto?.url);
    setIsAvatar((prevImages) => [...prevImages, uploadPhoto?.url]);
  };

  const handleSubmit = async (element) => {
    element.preventDefault();
    element.stopPropagation();
    const formData = new FormData(element.target);
    const { username, name, email, phone, password } =
      Object.fromEntries(formData);

    const adminId = currentAdmin.admin._id;
    console.log('adminId', adminId);
    const data = {
      username,
      name,
      email,
      phone,
      password,
      avatar: isAvatar[0],
    };
    console.log('Data:', data);

    try {
      const response = await apiRequest.put(`/admin/${adminId}`, data);
      if (response?.data?.success) {
        updateAdmin(response?.data);
        showToast('Cập nhập thành công', 'success');
      } else {
        setError(response?.data?.message);
        showToast('Cập nhập thất bại', 'error');
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };
  return (
    <div className='flex justify-center items-center w-full h-auto font-lexend text-base bg-layout'>
      <div className='w-full lg:w-1/2 lg:h-auto bg-white my-16 lg:mt-28 shadow-sm p-6 mx-3'>
        <h1 className='font-medium text-lg lg:text-2xl'>
          Quản lý thông tin cá nhân
        </h1>
        {/* Avatar user */}
        <div className='flex justify-center items-center gap-x-5 mt-5  relative'>
          <Avatar
            src={isAvatar[0] || currentAdmin?.admin?.avatar || Images.noavatar}
            width={80}
            height={80}
          />
          <label htmlFor='images'>
            <button
              className='w-20 h-10 bg-primary text-white text-sm rounded-md'
              onClick={handleOpenUploadPhoto}
            >
              Đổi ảnh
            </button>
            <input
              type='file'
              id='images'
              multiple
              className='hidden'
              onChange={handleUploadPhoto}
              ref={uploadPhotoRef}
            />
          </label>
        </div>
        <form className='w-full lg:h-auto px-6  mx-3' onSubmit={handleSubmit}>
          {/* Infomation */}
          <div>
            <div className='mt-5 '>
              <label className='font-medium text-sm'>Tên người dùng</label>
              <input
                id='username'
                name='username'
                type='text'
                defaultValue={currentAdmin?.admin?.username}
                className='w-full h-10 border-[1px] border-gray-300 rounded-md px-3 mt-1'
              />
            </div>
            <div className='mt-5 '>
              <label className='font-medium text-sm'>Họ và tên</label>
              <input
                id='name'
                name='name'
                type='text'
                defaultValue={currentAdmin?.admin?.name}
                className='w-full h-10 border-[1px] border-gray-300 rounded-md px-3 mt-1'
              />
            </div>
            <div className='mt-5 '>
              <label className='font-medium text-sm'>Email</label>
              <input
                id='email'
                name='email'
                type='email'
                defaultValue={currentAdmin?.admin?.email}
                className='w-full h-10 border-[1px] border-gray-300 rounded-md px-3 mt-1'
              />
            </div>
            <div className='mt-5 '>
              <label className='font-medium text-sm'>Số điện thoại</label>
              <input
                id='phone'
                name='phone'
                type='text'
                defaultValue={currentAdmin?.admin?.phone}
                className='w-full h-10 border-[1px] border-gray-300 rounded-md px-3 mt-1'
              />
            </div>
            <div className='mt-5 '>
              <label className='font-medium text-sm'>Mật khẩu</label>
              <input
                id='password'
                name='password'
                type='password'
                className='w-full h-10 border-[1px] border-gray-300 rounded-md px-3 mt-1'
              />
            </div>
          </div>
          {/* Error */}
          {error && (
            <span className='text-sm text-red-500 font-light'>{error}</span>
          )}

          {/* Button submit form */}
          <div className='flex justify-end mt-7'>
            <button className='w-28 h-10 bg-primary text-white rounded-md'>
              Cập nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SettingPage;
