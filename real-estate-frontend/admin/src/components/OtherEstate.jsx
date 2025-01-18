import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchWards } from '../services/apiService';

function OtherEstate({ district, status }) {
  // console.log('district:', district);
  const [wards, setWards] = useState([]);
  const [isStatus, setIsStatus] = useState();

  useEffect(() => {
    if (!district || !Array.isArray(district) || district.length < 2) return;

    switch (status) {
      case 'buy':
        setIsStatus('Bán nhà');
        break;
      case 'rent':
        setIsStatus('Thuê nhà');
        break;
      default:
        setIsStatus('Bán nhà');
    }
  }, [status, district]);

  useEffect(() => {
    async function getWards() {
      if (!district || !Array.isArray(district) || district.length < 2) return;
      try {
        const response = await fetchWards(district[0]);
        setWards(response.wards);
        console.log('wards:', response.wards);
      } catch (error) {
        console.error('Error fetching wards:', error);
      }
    }
    getWards();
  }, [district]);
  return (
    <div className='px-5 py-4 mt-3 border-[1px] border-gray-300 rounded-md flex flex-col justify-center items-start shadow-sm '>
      <span className='font-semibold text-primary text-base'>
        Bất động sản liên quan
      </span>
      <ul>
        {wards.map((ward) => (
          <li key={ward.code} className='mt-4 hover:opacity-60'>
            <Link
              to={`/admin/list?status=${status}&district=${district[1]}&ward=${ward.name}`}
            >{`${isStatus} ${ward.name} ${district[1]}`}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OtherEstate;
