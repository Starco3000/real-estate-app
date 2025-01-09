import useLocationData from '../../hooks/useLocationData';
import { Status, Types } from '../../services/data';
import Selector from '../Selector';

function Filter({ query, setQuery }) {
  const {
    provinces,
    districts,
    wards,
    setSelectedProvince,
    setSelectedDistrict,
    setSelectedWard,
  } = useLocationData(query, setQuery);

  const handleFilterChange = (newQuery) => {
    setQuery(newQuery);
  };
  return (
    <div className='w-full h-auto bg-transparent flex justify-start items-start gap-2 '>
      <Selector
        selected={query.status}
        setSelected={(option) =>
          handleFilterChange({ ...query, status: option })
        }
        data={Status}
        placeholder='Chọn trạng thái'
      />
      <Selector
        selected={query.province}
        setSelected={(value) => {
          setSelectedProvince(value);
          handleFilterChange({
            ...query,
            province: value,
            district: null,
            ward: null,
          });
        }}
        data={provinces}
        placeholder='Chọn tỉnh/thành'
      />
      <Selector
        selected={query.district}
        setSelected={(value) => {
          setSelectedDistrict(value);
          handleFilterChange({ ...query, district: value, ward: null });
        }}
        data={districts}
        disabled={!query.province}
        placeholder='Chọn quận/huyện'
      />
      <Selector
        selected={query.ward}
        setSelected={(value) => {
          setSelectedWard(value);
          handleFilterChange({ ...query, ward: value });
        }}
        data={wards}
        disabled={!query.district}
        placeholder='Chọn phường/xã'
      />
      <Selector
        selected={query.type}
        setSelected={(option) =>
          handleFilterChange({ ...query, type: option.value })
        }
        data={Types}
        placeholder='Chọn loại BĐS'
      />
    </div>
  );
}

export default Filter;
