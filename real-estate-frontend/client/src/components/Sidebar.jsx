import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import apiRequest from '../services/apiRequest.js';
import Images from './Images.jsx';
import { AddPost, ChevronLeft, Logout, RealEstate, Setting } from './Icons.jsx';

function Sidebar({ isOpen, toggleSidebar }) {
  const { updateUser } = useContext(AuthContext);
  const [selected, setSelected] = useState('/add-post');
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await apiRequest.post('/auth/logout');
      updateUser(null);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`w-auto h-screen font-lexend font-normal text-base bg-primary relative top-0 left-0 `}
    >
      {/* Button HandleSidebar */}
      <div className='w-10 h-10 border-[4px] border-white rounded-full overflow-hidden absolute top-9 -right-1 translate-x-[50%] z-50'>
        <button
          className='w-full h-full flex justify-center items-center bg-primary absolute'
          onClick={toggleSidebar}
        >
          <ChevronLeft
            className={`text-white text-xl ${
              !isOpen && 'rotate-180'
            } transition-all duration-300 ease-in-out`}
          />
        </button>
      </div>
      <div
        className={`h-full flex flex-col justify-between items-start ${
          isOpen ? 'translate-x-0 w-[250px]' : 'w-[105px]'
        } transition-all duration-500 ease-in-out overflow-hidden`}
      >
        {/* Logo Estate App */}
        <Link to='/'>
          <div className='w-full h-16 my-7 flex justify-normal items-center gap-x-2'>
            <img
              src={Images.onlyLogo}
              alt='Logo'
              className='w-[70px] h-full ml-4 object-cover flex-shrink-0'
            />
            {isOpen && (
              <div
                className={`w-auto flex flex-col flex-wrap flex-shrink justify-center items-center overflow-hidden bg-primary `}
              >
                <div className='flex flex-col justify-center items-center'>
                  <span className='font-extrabold text-sm text-main whitespace-nowrap'>
                    KIMDIENHOMES
                  </span>
                  <span className='font-medium text-[10px] leading-3 text-main whitespace-nowrap'>
                    PROPERTY & HOMES
                  </span>
                </div>
              </div>
            )}
          </div>
        </Link>

        {/* Sidebar Menu */}
        <div className='w-full px-4 flex flex-col gap-y-4'>
          <Link to='/add-post' data-tooltip-id='add-post'>
            <div
              className={`px-2 py-4 flex justify-start items-center gap-x-5 rounded-lg text-gray-300 hover:bg-secondary hover:text-white transition-all duration-500 ease-in-out ${
                selected === '/add-post' ? 'bg-secondary text-white' : ''
              }`}
            >
              <div className='w-8 ml-[14px]'>
                <AddPost className='w-6 h-6' />
              </div>
              <span
                className={`w-full text-nowrap overflow-hidden ${
                  !isOpen && 'hidden'
                }`}
              >
                Đăng tin mới
              </span>
            </div>
          </Link>

          <Link to='/user-posts' data-tooltip-id='posts'>
            <div
              className={`px-2 py-4 flex justify-start items-center gap-x-5 rounded-lg text-gray-300 hover:bg-secondary hover:text-white transition-all duration-500 ease-in-out ${
                selected === '/user-posts' ? 'bg-secondary text-white' : ''
              }`}
            >
              <div className='w-8 ml-[14px]'>
                <RealEstate className='w-6 h-6' />
              </div>
              <span
                className={`w-full overflow-hidden ${
                  !isOpen && 'hidden overflow-hidden'
                } whitespace-nowrap`}
              >
                Quản lý bài tin
              </span>
            </div>
          </Link>
        </div>
        {/* setting */}
        <div className='w-full px-4 mb-6'>
          <div className='w-full h-[1px] px-4 mb-2 bg-gray-400' />
          <Link to='/profile' data-tooltip-id='setting'>
            <div
              className={`px-2 py-4 flex justify-start items-center gap-x-5 rounded-lg text-gray-300 hover:bg-secondary hover:text-white transition-all duration-500 ease-in-out ${
                selected === '/profile' ? 'bg-secondary text-white' : ''
              }`}
            >
              <div className='w-8 ml-[14px]'>
                <Setting className='w-6 h-6' />
              </div>
              <span
                className={`w-full text-nowrap overflow-hidden ${
                  !isOpen && 'hidden overflow-hidden'
                }`}
              >
                Cài đặt tài khoản
              </span>
            </div>
          </Link>
          <div
            className='cursor-pointer'
            onClick={handleLogout}
            data-tooltip-id='logout'
          >
            <div className='px-2 py-4 flex justify-start items-center gap-x-5 rounded-lg text-gray-300 hover:bg-secondary hover:text-white transition-all duration-500 ease-in-out'>
              <div className='w-8 ml-[14px]'>
                <Logout className='w-6 h-6' />
              </div>
              <span
                className={`w-full text-nowrap overflow-hidden ${
                  !isOpen && 'hidden overflow-hidden'
                }`}
              >
                Đăng xuất
              </span>
            </div>
          </div>
        </div>
        {/* Tooltip */}
        {!isOpen && (
          <ReactTooltip id='add-post' place='right' content='Đăng tin' />
        )}
        {!isOpen && (
          <ReactTooltip id='posts' place='right' content='Quản lý bài tin' />
        )}
        {!isOpen && (
          <ReactTooltip id='setting' place='right' content='Cài đặt tài khoản' />
        )}
        {!isOpen && <ReactTooltip id='logout' place='right' content='Đăng xuất' />}
      </div>
    </div>
  );
}

export default Sidebar;
