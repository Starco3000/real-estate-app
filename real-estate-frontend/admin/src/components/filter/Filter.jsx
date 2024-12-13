import './Filter.css';
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
    <div className='w-full h-auto bg-transparent flex flex-wrap justify-start items-start gap-2'>
      {/* <div className='w-full flex justify-start items-center'> */}
      {/* <Select
        name='status'
        id='status'
        className='w-full h-full'
        value={
          statusOptions.find((option) => option.value === query.status) || null
        }
        onChange={(option) =>
          handleFilterChange({ ...query, status: option.value })
        }
        options={statusOptions}
        placeholder='Chọn trạng thái'
      />
      <Select
        name='province'
        id='province'
        className='w-full h-full'
        value={
          provinceOptions.find(
            (option) => option.value === query.province?.code,
          ) || null
        }
        onChange={(option) => setSelectedProvince({ code: option.value })}
        options={provinceOptions}
        placeholder='Chọn tỉnh/thành'
      />
      <Select
        name='district'
        id='district'
        className='w-full h-full'
        value={
          districtOptions.find(
            (option) => option.value === query.district?.code,
          ) || null
        }
        onChange={(option) => setSelectedDistrict({ code: option.value })}
        options={districtOptions}
        placeholder='Chọn quận/huyện'
        isDisabled={!query.province}
      />
      <Select
        name='ward'
        id='ward'
        className='w-full h-full'
        value={
          wardOptions.find((option) => option.value === query.ward?.code) ||
          null
        }
        onChange={(option) => setSelectedWard({ code: option.value })}
        options={wardOptions}
        placeholder='Chọn phường/xã'
        isDisabled={!query.district}
      />
      <Select
        name='type'
        id='type'
        className='w-full h-full'
        value={
          typeOptions.find((option) => option.value === query.type) || null
        }
        onChange={(option) =>
          handleFilterChange({ ...query, type: option.value })
        }
        options={typeOptions}
        placeholder='Chọn loại BĐS'
      /> */}
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
