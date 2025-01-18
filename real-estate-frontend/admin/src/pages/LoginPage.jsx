import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../services/apiRequest';
import Images from '../components/Images';
import { Eye, EyeOff } from '../components/Icons';

function LoginPage() {
  const { updateAdmin } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSumbit = async (element) => {
    element.preventDefault();
    element.stopPropagation();
    setIsLoading(true);
    setError('');

    const formData = new FormData(element.target);
    const { username, password } = Object.fromEntries(formData);
    const data = { username, password };

    try {
      const response = await apiRequest.post('/auth/admin/login', data);
      if (response.data.success) {
        updateAdmin(response.data);
        // console.log('response when login success', response.data);
        navigate('/admin/dashboard');
      } else {
        setError(response?.data?.message || 'Login failed');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Server error');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className='h-[100vh] flex justify-center items-center font-lexend font-normal text-sm relative'>
      <div className='w-full h-full'>
        <img
          src={Images.wallpaper}
          alt='Wallpaper'
          className=' w-full h-full object-cover md:object-fill absolute z-0'
        />
      </div>
      <form
        className='w-72 md:w-80 lg:w-96 h-auto px-10 py-7 bg-white flex flex-col justify-center rounded absolute '
        onSubmit={handleSumbit}
      >
        <h1 className='text-center font-medium text-xl md:text-2xl mb-3'>
          Chào mừng bạn quay trở lại
        </h1>

        <label htmlFor='username' className='text-sm font-light mb-2'>
          Username
          <span className='text-red-600 font-medium'>*</span>
        </label>
        <input
          type='text'
          id='username'
          name='username'
          // value={data.email}
          placeholder='Nhập username'
          className='bg-slate-100 text-sm font-light p-2 mb-2 focus:outline-none rounded'
          // onChange={handleOnChange}
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
            className='bg-slate-100 text-sm font-light p-2 mb-2 focus:outline-none rounded w-full'
            required
          />
          <button
            type='button'
            className='text-gray-500 absolute right-2 top-2'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {error && (
          <span className='text-xs text-red-500 font-light'>
            Error: {error}
          </span>
        )}
        <button
          className='bg-green-400 text-base px-4 py-2 hover:opacity-70 rounded mt-4 font-semibold text-white leading-relaxed tracking-wide'
          disabled={isLoading}
        >
          {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
