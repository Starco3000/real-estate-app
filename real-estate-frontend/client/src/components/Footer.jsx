import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaEnvelope, FaPhoneVolume } from 'react-icons/fa6';
import logo from '../assets/Logo-navbar-gray.png';

const Footer = () => {
  return (
    <footer className='h-auto w-full relative left-0 font-lexend bg-footer mx-auto md:py-10'>
      {/* Top contents */}
      <div className='w-full h-20  md:px-36 flex justify-between items-center bg-transparent'>
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
      <div className='w-full h-auto flex flex-row justify-between items-start mt-4 md:px-36'>
        <div>
          <h1 className='text-[#3d4d65] text-lg'>VỀ KIEMDIENHOMES</h1>
          <ul className='text-base text-[#54657e] mt-7'>
            <li className='hover:text-primary hover:font-medium cursor-pointer'>
              <Link to='/introduce'>Giới thiệu</Link>
            </li>
            <li className='hover:text-primary hover:font-medium cursor-pointer'>
              <Link to='/faq'>Trợ giúp</Link>
            </li>
            <li className='hover:text-primary hover:font-medium cursor-pointer'>
              <Link to='/sitemap'>Sitemap</Link>
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
              <Link to='/post'>Đăng tin mới</Link>
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

      {/* Bottom contents */}
      <div className='w-full h-5 border-t-2  border-gray-200 pt-6 mt-7'>
        <div className='w-full h-auto flex justify-center '>
          <span className='text-xs font-lexend font-medium text-gray-500'>
            Copyright © 2024 KIMDIENHOMES. Bản quyền thuộc về Nguyễn Đức Minh -
            MSSV: 207CT40431 - ĐH Văn Lang.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
