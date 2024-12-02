import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SearchFilterListPage } from './SearchFilter';

function ListPostSearch() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    status: searchParams.get('status') || '',
    address: searchParams.get('address') || '',
    province: searchParams.get('province') || '',
    district: searchParams.get('district') || '',
    ward: searchParams.get('ward') || '',
    type: searchParams.get('type') || '',
    size: searchParams.get('size') || '',
    price: searchParams.get('price') || '',
    bedroom: searchParams.get('bedroom') || '',
    direction: searchParams.get('direction') || '',
  });

  const handleSearch = () => {
    const queryString = new URLSearchParams({
      status: query.status,
      address: query.address,
      province: query.province,
      district: query.district,
      ward: query.ward,
      type: query.type ? query.type.name : '',
      minPrice:
        query.price && query.price.minPrice !== undefined
          ? query.price.minPrice
          : '',
      maxPrice:
        query.price && query.price.maxPrice !== undefined
          ? query.price.maxPrice
          : '',
      minSize: query.size ? query.size.minSize : '',
      maxSize: query.size ? query.size.maxSize : '',
      bedroom: query.bedroom ? query.bedroom.value : '',
      direction: query.direction ? query.direction.value : '',
    }).toString();
    console.log('Search Query:', query.direction);
    navigate(`/list?${queryString}`);
   
  };

  return (
    <div className='w-full flex flex-col items-center gap-y-2 '>
      <div className='w-full flex justify-center items-center'>
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

      {/* Type of estate options */}
      <div className='h-14 max-w-[955px]'>
        <SearchFilterListPage query={query} setQuery={setQuery} />
      </div>
    </div>
  );
}

export default ListPostSearch;
