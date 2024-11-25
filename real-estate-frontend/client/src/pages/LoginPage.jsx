import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import wallpaper from '../assets/city-wallpaper.jpg';
import apiRequest from '../services/apiRequest';

function LoginPage() {
  // const [data, setData] = useState({
  //   email: '',
  //   password: '',
  // });
  const { updateUser } = useContext(AuthContext);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // const handleOnChange = (element) => {
  //   const { name, value } = element.target;
  //   setData((prev) => {
  //     return {
  //       ...prev,
  //       [name]: value,
  //     };
  //   });
  // };

  const handleSumbit = async (element) => {
    element.preventDefault();
    element.stopPropagation();
    setIsLoading(true);
    setError('');

    const formData = new FormData(element.target);
    const { email, password } = Object.fromEntries(formData);
    const data = { email, password };

    try {
      const response = await apiRequest.post('/auth/login', data);

      if (response.data.success) {
        updateUser(response.data);
        console.log('response when login success', response.data);
        navigate('/');
      } else {
        setError(response?.data?.message);
      }
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
          Đăng nhập để tiếp tục
        </h1>

        <label htmlFor='email' className='text-sm font-light mb-2'>
          Email
          <span className='text-red-600 font-medium'>*</span>
        </label>
        <input
          type='email'
          id='email'
          name='email'
          // value={data.email}
          placeholder='Nhập email '
          className='bg-slate-100 text-sm font-light p-2 mb-2 focus:outline-none rounded'
          // onChange={handleOnChange}
          required
        />

        <label htmlFor='password' className='text-sm font-light mb-2'>
          Mật khẩu <span className='text-red-600 font-medium'>*</span>
        </label>
        <input
          type='password'
          id='password'
          name='password'
          // value={data.password}
          placeholder='Nhập mật khẩu'
          className='bg-slate-100 text-sm font-light p-2 mb-2 focus:outline-none rounded'
          // onChange={handleOnChange}
          required
        />

        {error && (
          <span className='text-xs text-red-500 font-light'>{error}</span>
        )}
        <button
          className='bg-green-400 text-base px-4 py-2 hover:opacity-70 rounded mt-4 font-semibold text-white leading-relaxed tracking-wide'
          disabled={isLoading}
        >
          {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
        <p className='text-sm font-light mt-3 text-center'>
          Chưa có tài khoản?{' '}
          <Link className='text-sm font-light text-blue-500' to='/register'>
            Đăng ký
          </Link>{' '}
          ngay
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
