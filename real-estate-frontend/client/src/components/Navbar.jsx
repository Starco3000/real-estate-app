import React, { useContext, useState } from 'react';
import logo from '../assets/logo-navbar.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';
import { AuthContext } from '../contexts/AuthContext';
// import { useNotificationStore } from '../services/useNotificationStore';
import noavatar from '../assets/noavatar.jpg';
import apiRequest from './../services/apiRequest';


function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  // const fetch = useNotificationStore((state) => state.fetch);
  // const number = useNotificationStore((state) => state.number);

  // if (currentUser) fetch();

  //dùng tạm logout ở đây
  // const { updateUser, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await apiRequest.post('/auth/logout');
      localStorage.removeItem('user');
      window.location.reload();
      // updateUser(null);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <nav className='h-24 w-full fixed flex justify-between items-center drop-shadow-xl bg-white py-[17px] px-10 z-50'>
      {/* Left Content */}
      <div className='flex items-center gap-8 '>
        <Link to='/' className=''>
          <img src={logo} alt='logo KimDienHomes' className='object-fill' />
        </Link>
        <div className='group'>
          <Link
            to='/buyandsell'
            className='relative pb-[6px] text-base text-primary font-semibold tracking-tighter leading-5 font-lexend cursor-pointer'
          >
            Mua bán nhà đất
            <span className='absolute left-0 bottom-0 w-0 h-[2.5px] bg-primary transition-all duration-300 ease-in-out group-hover:w-full'></span>
          </Link>
        </div>
        <div className='group'>
          <Link
            to='/rent'
            className='relative pb-[6px] text-base text-primary font-semibold tracking-tighter leading-5 font-lexend cursor-pointer'
          >
            Cho thuê nhà đất
            <span className='absolute left-0 bottom-0 w-0 h-[2.5px] bg-primary transition-all duration-300 ease-in-out group-hover:w-full'></span>
          </Link>
        </div>
        <div className='group'>
          <Link
            to='/project'
            className='relative pb-[6px] text-base text-primary font-semibold tracking-tighter leading-5 font-lexend cursor-pointer'
          >
            Dự án
            <span className='absolute left-0 bottom-0 w-0 h-[2.5px] bg-primary transition-all duration-300 ease-in-out group-hover:w-full'></span>
          </Link>
        </div>
        <div className='group'>
          <Link
            to='/news'
            className='relative pb-[6px] text-base text-primary font-semibold tracking-tighter leading-5 font-lexend cursor-pointer'
          >
            Tin tức bất động sản
            <span className='absolute left-0 bottom-0 w-0 h-[2.5px] bg-primary transition-all duration-300 ease-in-out group-hover:w-full'></span>
          </Link>
        </div>
      </div>

      {/* Right Content */}
      <div className='flex items-center gap-8'>
        {currentUser ? (
          <div className='flex items-center font-lexend gap-3 text-base'>
            <img
              src={currentUser?.user?.avatar || noavatar}
              alt='user avatar'
              className='w-10 h-10 rounded-full object-cover'
            />
            <span className=''>{currentUser?.user?.username}</span>
            {/* <Link to='/profile' className='profile'>
              {number > 0 && <div className='notification'>{number}</div>}
              <span>Profile</span>
            </Link> */}
            <button onClick={handleLogout}>Logout</button>
            {currentUser?.user?.role.includes('agent') && (
              <div className='w-auto h-10 flex justify-center items-center p-4 border-2 border-gray-200 rounded '>
                <Link to='/'>Đăng tin</Link>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className='group'>
              <Link
                to='/login'
                className='relative pb-[6px] text-base text-primary font-semibold tracking-tighter leading-5 font-lexend cursor-pointer'
              >
                Đăng nhập
                <span className='absolute left-0 bottom-0 w-0 h-[2.5px] bg-primary transition-all duration-500 ease-in-out group-hover:w-full'></span>
              </Link>
            </div>
            <div className='group'>
              <Link
                to='/register'
                className='relative pb-[6px] text-base text-primary font-semibold tracking-tighter leading-5 font-lexend cursor-pointer'
              >
                Đăng ký
                <span className='absolute left-0 bottom-0 w-0 h-[2.5px] bg-primary transition-all duration-500 ease-in-out group-hover:w-full'></span>
              </Link>
            </div>
          </>
        )}

        {/* <div>
          <Link
            to='/favortite'
            className='text-sm text-primary font-semibold tracking-tighter leading-5 font-lexend group-hover:border-b-2 group-hover:border-yellow-300 cursor-pointer'
          >
            <FaRegHeart />
          </Link>
        </div> */}
      </div>
    </nav>
  );
}

export default Navbar;
