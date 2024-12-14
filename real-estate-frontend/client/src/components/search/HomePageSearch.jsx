// import { useState } from 'react';
// import { FaSearch } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { SearchFilterHomepage } from './SearchFilter';
// import { Status } from '../../services/data';

// function HomePageSearch() {
//   const [query, setQuery] = useState({
//     status: 'buy',
//     province: null,
//     district: null,
//     ward: null,
//     type: null,
//     price: null,
//     size: null,
//     address: '',
//   });
//   const navigate = useNavigate();

//   const switchStatus = (value) => {
//     setQuery((prev) => ({ ...prev, status: value }));
//   };
//   const handleSearch = () => {
//     const queryString = new URLSearchParams({
//       status: query.status === 'buy' ? 'buy' : 'rent',
//       address: query.address || '',
//       province: query.province ? query.province.name : '',
//       district: query.district ? query.district.name : '',
//       ward: query.ward ? query.ward.name : '',
//       type: query.type ? query.type.name : '',
//       minPrice: query.price ? query.price.minPrice : '',
//       maxPrice: query.price ? query.price.maxPrice : '',
//       minSize: query.size ? query.size.minSize : '',
//       maxSize: query.size ? query.size.maxSize : '',
//     }).toString();
//     navigate(`/list?${queryString}`);
//     console.log('Search Query:', query);
//   };
//   return (
//     <div className='absolute top-[9rem] left-0 right-0 mx-auto w-4/6 z-50 font-lexend font-normal hidden lg:block '>
//       {/* Status Estate Options */}
//       {Status.map((item) => (
//         <button
//           key={item.id}
//           onClick={() => switchStatus(item.value)}
//           className={`h-9 w-32 p-2 mr-1 text-black rounded-t-md hover:bg-primary hover:text-white transition-all duration-300 ease-in-out ${
//             query.status === item.value ? 'bg-primary text-white' : 'bg-white'
//           }`}
//         >
//           {item.name}
//         </button>
//       ))}

//       <div className='w-full h-40 py-2 bg-white opacity-95 rounded'>
//         {/* HomePageSearch Bar */}
//         <div className='w-full h-20 px-5 flex justify-center items-center'>
//           <input
//             type='text'
//             placeholder='Tìm kiếm theo địa chỉ, quận, phường...'
//             className='w-full h-12 bg-white rounded border-[1px] border-gray-300 px-4'
//             value={query.address}
//             onChange={(e) => setQuery({ ...query, address: e.target.value })}
//           />
//           <button
//             onClick={handleSearch}
//             className='ml-2 w-28 h-12 bg-red-500 rounded text-white flex justify-center items-center'
//           >
//             <FaSearch className='text-xl' />
//           </button>
//         </div>
//         {/* Filter Search */}
//         <div>
//           <SearchFilterHomepage query={query} setQuery={setQuery} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomePageSearch;

import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { SearchFilterHomepage } from './SearchFilter';
import { Status } from '../../services/data';

function HomePageSearch() {
  const [query, setQuery] = useState({
    status: 'buy',
    province: null,
    district: null,
    ward: null,
    type: null,
    address: '',
  });
  const navigate = useNavigate();

  const switchStatus = (value) => {
    setQuery((prev) => ({ ...prev, status: value }));
  };

  const handleSearch = () => {
    const queryString = new URLSearchParams({
      status: query.status === 'buy' ? 'buy' : 'rent',
      address: query.address || '',
      province: query.province ? query.province.name : '',
      district: query.district ? query.district.name : '',
      ward: query.ward ? query.ward.name : '',
      type: query.type ? query.type.name : '',
    }).toString();
    navigate(`/list?${queryString}`);
    console.log('Search Query:', query);
  };

  return (
    <div className='absolute top-[9rem] left-0 right-0 mx-auto w-4/6 z-50 font-lexend font-normal hidden lg:block '>
      {/* Status Estate Options */}
      {Status.map((item) => (
        <button
          key={item.id}
          onClick={() => switchStatus(item.value)}
          className={`h-9 w-32 p-2 mr-1 text-black rounded-t-md hover:bg-primary hover:text-white transition-all duration-300 ease-in-out ${
            query.status === item.value ? 'bg-primary text-white' : 'bg-white'
          }`}
        >
          {item.name}
        </button>
      ))}

      <div className='w-full h-40 py-2 bg-white opacity-95 rounded'>
        {/* HomePageSearch Bar */}
        <div className='w-full h-20 px-5 flex justify-center items-center'>
          <input
            type='text'
            placeholder='Tìm kiếm theo địa chỉ, quận, phường...'
            className='w-full h-12 bg-white rounded border-[1px] border-gray-300 px-4'
            value={query.address}
            onChange={(e) => setQuery({ ...query, address: e.target.value })}
          />
          <button
            onClick={handleSearch}
            className='ml-2 w-24 h-12 bg-red-500 rounded text-white flex justify-center items-center'
          >
            <FaSearch className='text-xl' />
          </button>
        </div>
        {/* Filter Search */}
        <div className='w-full'>
          <SearchFilterHomepage query={query} setQuery={setQuery} />
        </div>
      </div>
    </div>
  );
}

export default HomePageSearch;
