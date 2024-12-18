import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Navbar from '../components/Navbar_3';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import Sidebar from '../components/Sidebar';

function Layout() {
  return (
    <div className='h-auto max-w-[1500px] mx-auto px-20px flex flex-col bg-white'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='h-[100vh-100px]'>
        <Toast />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
function RequireAuth() {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [isSidebar, setIsSidebar] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const showNavbar = ['/profile', '/favorites'].includes(location.pathname);
  const showSidebar = ['/user-posts', '/add-post', '/update-post/:id'].includes(
    location.pathname,
  );

  if (!currentUser) return <Navigate to='/login' />;
  else {
    return (
      <div
        className={`h-[100vh] max-w-[1500px] mx-auto px-20px flex ${
          isSidebar ? 'flex-row' : 'flex-col'
        }`}
      >
        {showNavbar && (
          <div className='navbar'>
            <Navbar />
          </div>
        )}
        {showSidebar && (
          <div className='sidebar'>
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
          </div>
        )}
        <div className='w-full h-[100vh-100px] overflow-y-scroll'>
          <Toast />
          <Outlet />
        </div>
        <div className={`${isSidebar && 'hidden'}`}><Footer /></div>
      </div>
    );
  }
}

export { Layout, RequireAuth };
