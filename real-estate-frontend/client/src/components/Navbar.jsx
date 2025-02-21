import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiRequest from '../services/apiRequest';
import { AuthContext } from '../contexts/AuthContext';
import Avatar from './Avatar';
import Images from './Images';
import { Bars, LogOut, Times } from './Icons';
import {
  MenusLeft,
  MenusRightIsUser,
  MenusRightNotUser,
} from '../services/data';
import { showToast } from './Toast';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const menus = MenusRightIsUser(currentUser);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleAddPostClick = (e) => {
    if (currentUser.user.isDisabled === true) {
      e.preventDefault(); // Prevent the default link behavior
      showToast('Tài khoản của bạn đã bị vô hiệu hóa', 'error'); // Show notification
    } else {
      navigate('/add-post'); // Navigate to the add post page
    }
  };
  const handleLogout = async () => {
    try {
      await apiRequest.post('/auth/logout');
      updateUser(null);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className='bg-white fixed -top-1 left-0 font-lexend font-semibold text-base text-primary tracking-tighter leading-5 w-full h-[80px] lg:h-[100px] shadow-xl z-[999]'>
      <div className='relative w-full h-full flex px-6 lg:px-16'>
        {/* Logo KimDienHomes */}
        <Link to='/' className='m-auto'>
          <img
            src={Images.logo}
            alt='logo KimDienHomes'
            className='w-48 object-fill'
          />
        </Link>

        {/* Navbar items */}
        <nav className='w-full flex justify-end lg:justify-between items-center relative'>
          <span
            className='lg:hidden z-50 cursor-pointer'
            onClick={toggleDrawer}
          >
            {isOpen ? <Times /> : <Bars />}
          </span>
          <ul
            className={`lg:flex md:items-center hidden bg-white w-full justify-between absolute top-20 left-6 lg:inset-7 z-50 h-screen lg:h-auto`}
          >
            {/* Contents left */}
            <div className='flex gap-x-7'>
              {MenusLeft.map((item, index) => (
                <li key={index} className='relative group/link'>
                  <Link
                    to={
                      index === 2
                        ? item.path
                        : // : index === 4
                          // ? item.path
                          `/list?status=${item.path}`
                    }
                  >
                    {item.name}
                  </Link>
                  <span className='absolute left-0 -bottom-1 w-0 h-[3px] bg-primary transition-all duration-500 ease-in-out group-hover/link:w-full'></span>
                </li>
              ))}
            </div>
            {/* Contents right */}
            {currentUser ? (
              <div className='flex gap-x-7'>
                <div className='flex items-center relative float-right gap-x-3 group'>
                  <Avatar
                    src={menus.img || Images.noavatar}
                    width={40}
                    height={40}
                  />
                  <span className='cursor-pointer'>{menus.name}</span>
                  <div
                    className='absolute left-full -translate-x-full top-7 
                         w-full h-full bg-transparent'
                  />
                  {/* submenu */}
                  {menus.hasSubMenu && (
                    <ul className='w-[300px] h-auto rounded-lg shadow-2xl p-5 bg-layout border-2 absolute left-full top-16 -translate-x-full z-50 hidden group-hover:block'>
                      {menus.subMenu.map((subItem, index) => (
                        <li
                          key={index}
                          className='border-b-[1px] border-gray-200'
                        >
                          <Link
                            to={subItem.path}
                            className='flex justify-start items-center gap-x-3 py-3'
                          >
                            {<subItem.icon />}
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                      {currentUser && (
                        <button
                          className='w-full h-9 flex justify-center items-center gap-x-3 p-4 border-2 border-gray-200 rounded '
                          onClick={handleLogout}
                        >
                          <LogOut />
                          Logout
                        </button>
                      )}
                    </ul>
                  )}
                </div>
                {/* button new post */}
                <div className='w-auto h-10 text-sm flex justify-center items-center p-4 border-2 border-gray-200 rounded-md hover:bg-gray-50'>
                  <Link to='/add-post' onClick={handleAddPostClick}>
                    Đăng tin
                  </Link>
                </div>
              </div>
            ) : (
              MenusRightNotUser.map((item, index) => (
                <div
                  key={index}
                  className='flex items-center float-right group'
                >
                  <li key={index} className='relative group/link'>
                    <Link to={item.path}>{item.name}</Link>
                    <span className='absolute left-0 -bottom-1 w-0 h-[3px] bg-primary transition-all duration-500 ease-in-out group-hover/link:w-full'></span>
                  </li>
                </div>
              ))
            )}
          </ul>

          {/* Sidebar for mobile */}
          <div
            className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            } transition-transform duration-300 ease-in-out z-50`}
          >
            <div className='flex items-center justify-between p-4 border-b'>
              {currentUser ? (
                <div className='flex justify-center items-center gap-x-3'>
                  <Avatar
                    src={currentUser?.user?.avatar || Images.noavatar}
                    width={40}
                    height={40}
                  />
                  <span>{currentUser?.user?.username}</span>
                </div>
              ) : (
                <Link to='/login'>Đăng nhập</Link>
              )}
              <span className='cursor-pointer' onClick={toggleDrawer}>
                <Times />
              </span>
            </div>

            <div className='px-4 py-2'>
              {currentUser && (
                <div className='mb-2'>
                  {menus.hasSubMenu && (
                    <ul className='pl-1'>
                      {menus.subMenu.map((subItem, index) => (
                        <li key={index} className='py-4'>
                          <Link
                            to={subItem.path}
                            className='flex items-center gap-x-2'
                          >
                            {<subItem.icon />}
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Contents left in sidebar */}
              {MenusLeft.map((item, index) => (
                <div key={index} className='mb-2'>
                  <Link to={item.path} className='block py-2'>
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
            {/* button new post */}
            {currentUser && (
              <div className='flex justify-center items-center p-4 mb-3 border-2 border-gray-200 rounded '>
                <Link to='/add-post' onClick={handleAddPostClick}>
                  Đăng tin
                </Link>
              </div>
            )}
            {/* button logout */}
            {currentUser && (
              <button
                className='w-full flex justify-center items-center gap-x-3 p-4 border-2 border-gray-200 rounded '
                onClick={handleLogout}
              >
                <LogOut />
                Đăng xuất
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
