import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Avatar from '../components/Avatar';
import apiRequest from '../services/apiRequest';
import noavatar from '../assets/noavatar.jpg';
import { uploadFile } from '../helpers/uploadFile';
import { showToast } from '../components/Toast';
import { Eye, EyeOff } from '../components/Icons';

function ProfilePage() {
  const [error, setError] = useState('');
  const { updateUser, currentUser } = useContext(AuthContext);
  const [isAvatar, setIsAvatar] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

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

    const userId = currentUser.user._id;
    const data = {
      username,
      name,
      email,
      phone,
      password,
      avatar: isAvatar[0],
    };

    try {
      const response = await apiRequest.put(`/users/${userId}`, data);
      if (response?.data?.success) {
        updateUser(response?.data);
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
            src={isAvatar[0] || currentUser?.user?.avatar || noavatar}
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
                defaultValue={currentUser?.user?.username}
                className='w-full h-10 border-[1px] border-gray-300 rounded-md px-3 mt-1'
              />
            </div>
            <div className='mt-5 '>
              <label className='font-medium text-sm'>Họ và tên</label>
              <input
                id='name'
                name='name'
                type='text'
                defaultValue={currentUser?.user?.name}
                className='w-full h-10 border-[1px] border-gray-300 rounded-md px-3 mt-1'
              />
            </div>
            <div className='mt-5 '>
              <label className='font-medium text-sm'>Email</label>
              <input
                id='email'
                name='email'
                type='email'
                defaultValue={currentUser?.user?.email}
                className='w-full h-10 border-[1px] border-gray-300 rounded-md px-3 mt-1'
              />
            </div>
            <div className='mt-5 '>
              <label className='font-medium text-sm'>Số điện thoại</label>
              <input
                id='phone'
                name='phone'
                type='text'
                defaultValue={currentUser?.user?.phone}
                className='w-full h-10 border-[1px] border-gray-300 rounded-md px-3 mt-1'
              />
            </div>
            <div className='mt-5 '>
              <label className='font-medium text-sm'>Mật khẩu</label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  name='password'
                  placeholder='Nhập mật khẩu'
                  className='w-full bg-slate-100 text-sm font-light p-2 mb-2 focus:outline-none rounded'
                />
                <button
                  type='button'
                  className='text-gray-500 absolute right-2 top-2 '
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
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

export default ProfilePage;
