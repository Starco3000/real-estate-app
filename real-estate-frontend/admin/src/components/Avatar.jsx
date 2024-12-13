import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function Avatar({ src, width, height }) {
  const { currentUser } = useContext(AuthContext);
  return (
    <div
      className='rounded-full'
      style={{ width: width + 'px', height: height + 'px' }}
    >
      <img
        src={src}
        alt={currentUser?.user?.name || src}
        className='shadow-md rounded-full w-full h-full overflow-hidden object-cover'
      />
    </div>
  );
}

export default Avatar;
