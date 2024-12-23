import {
  Types,
  Prices,
  Sizes,
  Directions,
  Bedrooms,
} from '../../services/data';
import useLocationData from '../../hooks/useLocationData';
import Selector from '../Selector';

export const SearchFilterHomepage = ({ query, setQuery }) => {
  const {
    provinces,
    districts,
    wards,
    setSelectedProvince,
    setSelectedDistrict,
    setSelectedWard,
  } = useLocationData(query, setQuery);

  return (
    <div className='w-auto h-auto px-5 flex justify-start items-center gap-x-4'>
      <Selector
        selected={query.province}
        setSelected={(value) => {
          setSelectedProvince(value);
          setQuery((prev) => ({
            ...prev,
            province: value,
            district: null,
            ward: null,
          }));
        }}
        data={provinces}
        placeholder='Chọn tỉnh/thành phố'
      />
      <Selector
        selected={query.district}
        setSelected={(value) => {
          setSelectedDistrict(value);
          setQuery((prev) => ({ ...prev, district: value, ward: null }));
        }}
        data={districts}
        disabled={!query.province}
        placeholder='Chọn quận/huyện'
      />
      <Selector
        selected={query.ward}
        setSelected={(value) => {
          setSelectedWard(value);
          setQuery((prev) => ({ ...prev, ward: value }));
        }}
        data={wards}
        disabled={!query.district}
        placeholder='Chọn phường/xã'
      />
      <Selector
        selected={query.type}
        setSelected={(value) => setQuery((prev) => ({ ...prev, type: value }))}
        data={Types}
        placeholder='Chọn loại BĐS'
      />
    </div>
  );
};

export const SearchFilterListPage = ({ query, setQuery, isOpenMap }) => {
  return (
    <div className={`w-full flex gap-x-4 ${isOpenMap === true ? 'flex-wrap' : 'flex-nowrap'}`}>
      <Selector
        selected={query.price}
        setSelected={(value) => {
          setQuery((prev) => {
            const newQuery = { ...prev, price: value };
            if (value && value.name === 'Thỏa thuận') {
              newQuery.priceNegotiable = 'true';
              newQuery.minPrice = null;
              newQuery.maxPrice = null;
            } else {
              newQuery.priceNegotiable = '';
              newQuery.minPrice = value ? value.minPrice : null;
              newQuery.maxPrice = value ? value.maxPrice : null;
            }
            return newQuery;
          });
        }}
        data={Prices}
        placeholder='Khung giá'
      />
      <Selector
        selected={query.size}
        setSelected={(value) => setQuery((prev) => ({ ...prev, size: value }))}
        data={Sizes}
        placeholder='Diện tích'
      />
      <Selector
        selected={query.bedroom}
        setSelected={(value) =>
          setQuery((prev) => ({ ...prev, bedroom: value }))
        }
        data={Bedrooms}
        placeholder='Số phòng ngủ'
      />
      <Selector
        selected={query.direction}
        setSelected={(value) =>
          setQuery((prev) => ({ ...prev, direction: value }))
        }
        data={Directions}
        placeholder='Huớng bất động sản'
      />
    </div>
  );
};
