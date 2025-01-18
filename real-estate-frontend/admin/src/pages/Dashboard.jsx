import React from 'react';
import Images from '../components/Images';

function Dashboard() {
  return (
    <div className='w-full h-full bg-white font-roboto font-normal text-sm relative'>
      <img
        src={Images.dashboard}
        alt='dashboard'
        className='w-full h-full object-cover absolute'
      />
      <div className='w-full h-ful flex justify-center items-center absolute top-0 left-0 bottom-0 right-0'>
        <h1 className='font-bold text-7xl border-4 text-white'>Chào mừng bạn trở lại</h1>
      </div>
    </div>
  );
}

export default Dashboard;
