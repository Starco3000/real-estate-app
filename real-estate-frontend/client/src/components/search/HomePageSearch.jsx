import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Selector from '../Selector';
// import { fetchProvinces } from '../../services/apiService';

function HomePageSearch() {
  const [selected, setSelected] = useState('');
  const [provinces, setProvinces] = useState([]);
  const navigate = useNavigate();

  // Fetch provinces
  // useEffect(() => {
  //   const getProvinces = async () => {
  //     try {
  //       const data = await fetchProvinces();
  //       setProvinces(data);
  //     } catch (error) {
  //       console.error('Error fetching provinces:', error);
  //     }
  //   };
  //   getProvinces();
  // }, []);

  const handleSearch = () => {
    navigate('/list');
  };
  return (
    <div className='absolute top-[9rem] left-0 right-0 mx-auto w-4/6 z-50 font-lexend font-normal hidden lg:block '>
      {/* Status Estate Options */}
      <button className='h-9 w-32 p-2 text-black bg-white hover:bg-primary hover:text-white transition-all duration-300 ease-in-out'>
        Mua Bán
      </button>
      <button className='h-9 w-32 p-2 text-black bg-white hover:bg-primary hover:text-white transition-all duration-300 ease-in-out'>
        Cho thuê
      </button>
      <div className='w-full h-40 py-2 bg-white opacity-95 rounded'>
        {/* HomePageSearch Bar */}
        <div className='w-full h-20 px-5 flex justify-center items-center'>
          <input
            type='text'
            placeholder='Tìm kiếm theo địa chỉ, quận, phường...'
            className='w-full h-12 bg-white rounded border-[1px] border-gray-300 px-4'
          />
          <button
            onClick={handleSearch}
            className='ml-2 w-28 h-12 bg-red-500 rounded text-white flex justify-center items-center'
          >
            <FaSearch className='text-xl' />
          </button>
        </div>
        {/* Type of estate options */}
        <div className='px-5 h-8 flex gap-x-4'>
          {/* <select className='w-[17rem] h-10 bg-white rounded border-[1px] border-gray-300'>
            <option value=''>Loại nhà đất</option>
            <option value='apartment'>Chung cư mini, căn hộ</option>
            <option value='house'>Nhà riêng</option>
            <option value='villa'>Nhà biệt thự, nhà liền kề</option>
            <option value='townhouse'>Nhà mặt phố</option>
            <option value='shophouse'>Shophouse</option>
            <option value='rawland'>Đất nền dự án</option>
            <option value='land'>Đất bán</option>
            <option value='workshop'>Kho, nhà xưởng</option>
          </select> */}
          {/* <Selector
            selected={selected}
            setSelected={setSelected}
            data={provinces.map((province) => province.name)}
          /> */}

          <select className='w-[17rem] h-10 bg-white rounded border-[1px] border-gray-300 overflow-y-scroll'>
            <option value=''>Mức giá</option>
            <option value='apartment'>Dưới 500 triệu</option>
            <option value='house'>500 - 800 triệu</option>
            <option value='villa'>800 - 1 tỷ</option>
            <option value='townhouse'>1 - 2 tỷ</option>
            <option value='shophouse'>2 - 3 tỷ</option>
            <option value='rawland'>3 - 5 tỷ</option>
            <option value='land'>5 - 10 tỷ</option>
            <option value='land'>10 - 20 tỷ</option>
            <option value='land'>20 - 40 tỷ</option>
            <option value='land'>40 - 60 tỷ</option>
            <option value='land'>Trên 60 tỷ</option>
            <option value='workshop'>Thỏa thuận</option>
          </select>

          <select className='w-[17rem] h-10 bg-white rounded border-[1px] border-gray-300 overflow-y-scroll'>
            <option value=''>Diện tích</option>
            <option value='apartment'>Dưới 30m2</option>
            <option value='house'>30 - 50m2</option>
            <option value='villa'>50 - 80m2</option>
            <option value='townhouse'>80 - 100m2</option>
            <option value='shophouse'>100 - 150m2</option>
            <option value='rawland'>150 - 200m2</option>
            <option value='rawland'>200 - 250m2</option>
            <option value='rawland'>250 - 300m2</option>
            <option value='rawland'>300 - 500m2</option>
            <option value='land'>Trên 500m2</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default HomePageSearch;
