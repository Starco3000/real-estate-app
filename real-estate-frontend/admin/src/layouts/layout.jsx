import { useContext, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';

function Layout() {
  return (
    <div className='h-auto max-w-[1500px] w-full mx-auto px-20px flex flex-col bg-white'>
      <div className='navbar'></div>
      <div className='h-[100vh-100px]'>
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
}
function RequireAuth() {
  const { currentAdmin } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (!currentAdmin) return <Navigate to='/admin/login' />;
  else {
    return (
      <div className='max-w-[1500px] h-[100vh] flex flex-row'>
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <div className={`w-full h-[100vh-100px] overflow-y-scroll`}>
          <Outlet />
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}

export { Layout, RequireAuth };
