import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Navbar from '../components/Navbar_3';
import Footer from '../components/Footer';

function Layout() {
  return (
    <div className='h-auto max-w-[1500px] mx-auto px-20px flex flex-col bg-white'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='h-[100vh-100px]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
function RequireAuth() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return <Navigate to='/login' />;
  else {
    return (
      <div className='h-[100vh] max-w-[1500px] mx-auto px-20px flex flex-col'>
        <div className='navbar'>
          <Navbar />
        </div>
        <div className='h-[100vh-100px]'>
          <Outlet />
        </div>
        <Footer />
      </div>
    );
  }
}

export { Layout, RequireAuth };
