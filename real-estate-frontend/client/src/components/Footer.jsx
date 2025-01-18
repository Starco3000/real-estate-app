import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaEnvelope, FaPhoneVolume } from 'react-icons/fa6';
import logo from '../assets/Logo-navbar-gray.png';
import Drawer from './Drawer';

const Footer = () => {
  const drawerItems1 = [
    { label: 'Giới thiệu', link: '/' },
    { label: 'Trợ giúp', link: '/' },
    { label: 'Sitemap', link: '/' },
  ];
  const drawerItems2 = [
    { label: 'Đăng ký', link: '/register' },
    { label: 'Đăng nhập', link: '/login' },
    { label: 'Đăng tin mới', link: '/add-post' },
    { label: 'Tin tức', link: '/news' },
  ];
  return (
    <footer className='h-auto w-full relative left-0 font-lexend bg-footer mx-auto md:py-10'>
      {/* Footer for Desktop screen */}
      {/* Top contents */}
      <div className='w-full h-20  md:px-36 hidden md:flex justify-between items-center bg-transparent'>
        <img
          src={logo}
          alt='KIMDIENHOMES'
          className='w-auto h-full object-fill flex-2'
        />
        <div className='flex items-center gap-3'>
          <FaPhoneVolume className='text-3xl' />
          <div className='flex flex-col justify-start items-start'>
            <span className='text-xs font-light'>Hotline</span>
            <span className='text-sm font-medium'>xxx-yyy-zzzz</span>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <FaEnvelope className='text-3xl' />
          <div className='flex flex-col justify-start items-start'>
            <span className='text-xs font-light'>Email</span>
            <span className='text-sm font-medium'>
              minhnguyen9686q6@gmail.com
            </span>
          </div>
        </div>
      </div>

      {/* Middle contents */}
      <div className='w-full h-auto hidden md:flex flex-row justify-between items-start mt-4 md:px-36'>
        <div>
          <h1 className='text-[#3d4d65] text-lg'>VỀ KIEMDIENHOMES</h1>
          <ul className='text-base text-[#54657e] mt-7'>
            <li className='hover:text-primary hover:font-medium cursor-pointer'>
              <Link to='/'>Giới thiệu</Link>
            </li>
            <li className='hover:text-primary hover:font-medium cursor-pointer'>
              <Link to='/'>Trợ giúp</Link>
            </li>
            <li className='hover:text-primary hover:font-medium cursor-pointer'>
              <Link to='/'>Sitemap</Link>
            </li>
          </ul>
        </div>

        <div>
          <h1 className='text-[#3d4d65] text-lg'>TÀI KHOẢN</h1>
          <ul className='text-base text-[#54657e] mt-7'>
            <li className='hover:text-primary hover:font-medium cursor-pointer'>
              <Link to='/register'>Đăng ký</Link>
            </li>
            <li className='hover:text-primary hover:font-medium cursor-pointer'>
              <Link to='/login'>Đăng nhập</Link>
            </li>
            <li className='hover:text-primary hover:font-medium cursor-pointer'>
              <Link to='/add-post'>Đăng tin mới</Link>
            </li>
            <li className='hover:text-primary hover:font-medium cursor-pointer'>
              <Link to='/news'>Tin tức</Link>
            </li>
          </ul>
        </div>

        <div>
          <h1 className='text-[#3d4d65] text-lg'>HỖ TRỢ</h1>
          <ul className='text-base text-[#54657e] mt-7'>
            <li>
              Điện thoại:{' '}
              <span className='hover:text-primary hover:font-normal cursor-pointer'>
                xxx-yyy-zzzz
              </span>
            </li>
            <li>
              Email:{' '}
              <span className='hover:text-primary hover:font-normal cursor-pointer'>
                minhguyen9686q6@gmail.com
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h1 className='text-[#3d4d65] text-lg'>KẾT NỐI VỚI CHÚNG TÔI</h1>
          <div className='flex items-center gap-3 mt-7'>
            <FaFacebook className='text-3xl cursor-pointer' />
            <FaGithub className='text-3xl cursor-pointer' />
            <FaLinkedin className='text-3xl cursor-pointer' />
          </div>
        </div>
      </div>

      {/* Footer for mobile screen */}
      {/* Top content */}
      <div className='flex flex-col justify-center items-center gap-y-2 md:hidden'>
        <img
          src={logo}
          alt='KIMDIENHOMES'
          className='w-auto h-12 object-fill mx-auto mt-4'
        />
        <div className='flex flex-row items-center gap-x-2'>
          <FaPhoneVolume className='text-lg' />
          <span className='text-sm font-medium'>xxx-yyy-zzzz</span>
        </div>
        <div className='flex flex-row items-center gap-x-2 '>
          <FaEnvelope className='text-lg' />
          <span className='text-sm font-medium'>
            minhnguyen9686q6@gmail.com
          </span>
        </div>
        <div className='flex flex-col items-center gap-3'>
          <h2 className='text-base font-medium'>Kết nối với chúng tôi</h2>
          <div className='flex flex-row items-center gap-3'>
            <FaFacebook className='text-3xl cursor-pointer' />
            <FaGithub className='text-3xl cursor-pointer' />
            <FaLinkedin className='text-3xl cursor-pointer' />
          </div>
        </div>
      </div>
      {/* Middle content */}
      <div className='md:hidden h-auto relative mt-4'>
        <Drawer title={'Hướng dẫn'} items={drawerItems1} />
        <Drawer title={'Tài khoản'} items={drawerItems2} />
      </div>
      {/* Bottom contents */}
      <div className='w-full md:h-5 border-t-2  border-gray-200 md:pt-6 mt-7'>
        <div className='w-full h-auto flex justify-center px-6 py-4 md:p-0'>
          <span className='text-center text-xs font-lexend font-medium text-gray-500'>
            Copyright © 2024 KIMDIENHOMES. Bản quyền thuộc về Nguyễn Đức Minh -
            MSSV: 207CT40431 - ĐH Văn Lang.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
