import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import wallpaper from '../assets/city-wallpaper.jpg';
import apiRequest from '../services/apiRequest';
import { Eye, EyeOff } from '../components/Icons';

function RegisterPage() {
  const [data, setData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleOnChange = (element) => {
    const { name, value } = element.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSumbit = async (element) => {
    element.preventDefault();
    element.stopPropagation();
    setError('');
    setIsLoading(true);

    if (password.length < 8) {
      setError('Mật khẩu phải có ít nhất 8 ký tự');
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiRequest.post("/auth/register", data);
      console.log('response when signup success', response);

      if (response.data.success) {
        setData({
          username: '',
          email: '',
          phone: '',
          password: '',
        });
      }
      navigate('/login');
    } catch (err) {
      setError(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
    console.log('data', data);
  };

  return (
    <div className=' flex justify-center items-center w-full h-[100vh] relative'>
      <div className='w-full h-full'>
        <img
          src={wallpaper}
          alt='Wallpaper'
          className='absolute w-full h-[100vh] object-cover md:object-fill z-0'
        />
      </div>
      <form
        className='absolute flex flex-col justify-center bg-white rounded w-11/12 md:w-2/6 h-auto font-lexend px-10 py-6 mt-20'
        onSubmit={handleSumbit}
      >
        <h1 className='text-center font-medium text-xl md:text-2xl mb-3'>
          Đăng ký tài khoản mới
        </h1>
        <label htmlFor='username' className='text-sm font-light mb-2'>
          Username <span className='text-red-600 font-medium'>*</span>
        </label>
        <input
          type='text'
          id='username'
          name='username'
          value={data.username}
          placeholder='Nhập họ và tên'
          className='bg-slate-100 text-sm font-light p-2 mb-2 focus:outline-none rounded'
          onChange={handleOnChange}
          required
        />
        <label htmlFor='email' className='text-sm font-light mb-2'>
          Email <span className='text-red-600 font-medium'>*</span>
        </label>
        <input
          type='email'
          id='email'
          name='email'
          value={data.email}
          placeholder='Nhập email'
          className='bg-slate-100 text-sm font-light p-2 mb-2 focus:outline-none rounded'
          onChange={handleOnChange}
          required
        />
        <label htmlFor='phone' className='text-sm font-light mb-2'>
          Số điện thoại <span className='text-red-600 font-medium'>*</span>
        </label>
        <input
          type='text'
          id='phone'
          name='phone'
          minLength={10}
          value={data.phone}
          placeholder='Nhập số điện thoại'
          className='bg-slate-100 text-sm font-light p-2 mb-2 focus:outline-none rounded'
          onChange={handleOnChange}
          required
        />
        <label htmlFor='password' className='text-sm font-light mb-2'>
          Mật khẩu <span className='text-red-600 font-medium'>*</span>
        </label>
        <div className='relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            id='password'
            name='password'
            placeholder='Nhập mật khẩu'
            className='w-full bg-slate-100 text-sm font-light p-2 mb-2 focus:outline-none rounded'
            required
          />
          <button
            type='button'
            className='text-gray-500 absolute right-2 top-2 '
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {error && (
          <span className='text-xs text-red-500 font-light'>{error}</span>
        )}
        <button
          className='bg-green-400 text-base px-4 py-2 hover:opacity-70 rounded mt-4 font-semibold text-white leading-relaxed tracking-wide'
          disabled={isLoading}
        >
          {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
        </button>
        <p className='text-sm font-light mt-3 text-center'>
          Đã có tài khoản?{' '}
          <Link className='text-sm font-light text-blue-500' to='/login'>
            Đăng nhập
          </Link>{' '}
          ngay
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
