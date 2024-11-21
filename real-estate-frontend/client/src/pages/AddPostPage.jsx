import React, { useReducer, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PiTag, PiTagFill } from 'react-icons/pi';
import { FaTimes } from 'react-icons/fa';
import { MdBedroomParent, MdOutlineBedroomParent } from 'react-icons/md';
import { Types, Directions, Certificates } from '../services/data';
import apiRequest from './../services/apiRequest';
import Selector from '../components/Selector';
import InputField from '../components/InputField';
import RichText from '../components/RichText';
import UploadWidget from '../components/uploadWidget/UploadWidget';
import {
  fetchProvinces,
  fetchDistricts,
  fetchWards,
} from '../services/apiService';
import {
  changeIconReducer,
  SELECT_FOR_RENT,
  SELECT_FOR_SALE,
} from '../hooks/useReducer';

function AddPostPage() {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedDirection, setSelectedDirection] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [state, dispatch] = useReducer(changeIconReducer, {
    selectedIcon: null,
  });
  const navigate = useNavigate();

  // Fetch provinces
  useEffect(() => {
    const getProvinces = async () => {
      try {
        const data = await fetchProvinces();
        setProvinces(data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };
    getProvinces();
  }, []);

  // Fetch districts when a province is selected
  useEffect(() => {
    const getDistricts = async () => {
      if (selectedProvince && selectedProvince.code) {
        try {
          const data = await fetchDistricts(selectedProvince.code);
          setDistricts(data.districts);
          setSelectedDistrict(null); // Reset selected district
          setSelectedWard(null); // Reset selected ward
          setWards([]); // Reset wards when province changes
        } catch (error) {
          console.error('Error fetching districts:', error);
        }
      } else {
        setDistricts([]);
        setWards([]);
        setSelectedDistrict(null); // Reset selected district
        setSelectedWard(null); // Reset selected ward
      }
    };
    getDistricts();
  }, [selectedProvince]);

  // // Fetch wards when a district is selected
  useEffect(() => {
    const getWards = async () => {
      if (selectedDistrict && selectedDistrict.code) {
        try {
          const data = await fetchWards(selectedDistrict.code);
          setWards(data.wards);
          setSelectedWard(null); // Reset selected ward when district changes
        } catch (error) {
          console.error('Error fetching wards:', error);
        }
      } else {
        setWards([]);
      }
    };
    getWards();
  }, [selectedDistrict]);

  //HandleSubmit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);
    const datas = {
      postData: {
        title: inputs.title,
        size: inputs.size,
        price: inputs.price,
        bedroom: parseInt(inputs.bedroom),
        bathroom: parseInt(inputs.bathroom),
        address: inputs.address,
        province: selectedProvince ? selectedProvince.name : '',
        district: selectedDistrict ? selectedDistrict.name : '',
        ward: selectedWard ? selectedWard.name : '',
        type: selectedType ? selectedType.name : '',
        status: state.selectedIcon === 'isForSale' ? 'For sale' : 'For rent',
        images: images,
        coordinate: {
          latitude: parseFloat(inputs.latitude),
          longitude: parseFloat(inputs.longitude),
        },
      },
      postDetail: {
        description: value || '',
        certificate: selectedCertificate ? selectedCertificate.name : '',
        direction: selectedDirection ? selectedDirection.name : '',
      },
    };
    // console.log('Data to be sent:', JSON.stringify(datas, null, 2));
    try {
      const request = await apiRequest.post('/posts', datas);
      // console.log('Request data:', request.data);
      navigate('/' + request.data._id);
    } catch (error) {
      console.error('Error creating post:', error);
      setError(error);
    }
  };

  return (
    <div className='bg-layout w-full h-auto p-5 font-lexend font-normal text-sm'>
      <form
        className='my-20 max-w-[832px] mx-auto flex flex-col gap-y-5'
        onSubmit={handleSubmit}
      >
        <h1 className='font-semibold text-2xl pt-6'>Tạo tin đăng mới</h1>
        {/* Select status of estate */}
        <div className='w-full h-auto bg-white flex flex-col gap-y-3 p-5 shadow-md'>
          <h2 className='font-medium text-base'>Nhu cầu đăng tin</h2>
          <div className='flex gap-4 '>
            <div
              onClick={() => dispatch({ type: SELECT_FOR_SALE })}
              className={`w-1/2 h-20 flex justify-start items-center gap-2 border-[1px] border-gray-500 cursor-pointer pl-4 rounded-lg shadow-md hover:bg-gray-50 ${
                state.selectedIcon === 'isForSale'
                  ? 'border-[3.5px] border-black'
                  : ''
              }`}
            >
              {state.selectedIcon === 'isForSale' ? (
                <PiTagFill size={24} />
              ) : (
                <PiTag size={24} />
              )}
              <span>Mua bán bất động sản</span>
            </div>
            <div
              onClick={() => dispatch({ type: SELECT_FOR_RENT })}
              className={`w-1/2 h-20 flex justify-start items-center gap-2 border-[1px] border-gray-500 cursor-pointer pl-4 rounded-lg shadow-md hover:bg-gray-50 ${
                state.selectedIcon === 'isForRent'
                  ? 'border-[3.5px] border-black'
                  : ''
              }`}
            >
              {state.selectedIcon === 'isForRent' ? (
                <MdBedroomParent size={24} />
              ) : (
                <MdOutlineBedroomParent size={24} />
              )}
              <span>Cho thuê bất động sản</span>
            </div>
          </div>
        </div>
        {/* Choose address */}
        <div className='w-full h-auto bg-white flex flex-col gap-y-3 p-5 shadow-md'>
          <h2 className='font-medium text-base'>Địa chỉ bất động sản</h2>
          <div className='grid grid-cols-3 gap-x-4'>
            {/* <Selector /> */}
            <Selector
              selected={selectedProvince}
              setSelected={setSelectedProvince}
              data={provinces}
              placeholder='Chọn tỉnh/thành phố'
            />
            <Selector
              selected={selectedDistrict}
              setSelected={setSelectedDistrict}
              data={districts}
              disabled={!selectedProvince}
              placeholder='Chọn quận/huyện'
            />
            <Selector
              selected={selectedWard}
              setSelected={setSelectedWard}
              data={wards}
              disabled={!selectedDistrict}
              placeholder='Chọn phường/xã'
            />
          </div>
          <label htmlFor='address'>Địa chỉ chi tiết</label>
          <InputField
            type={'text'}
            id={'address'}
            name={'address'}
            placeholder={'Nhập địa chỉ chi tiết nếu có'}
          />
        </div>
        {/* Choose type of estate */}
        <div className='w-full h-auto bg-white flex flex-col gap-y-3 p-5 shadow-md'>
          <h2 className='font-medium text-base'>Loại, giá và diện tích</h2>
          <div className='flex gap-x-4'>
            <div className='w-full'>
              <Selector
                selected={selectedType}
                setSelected={setSelectedType}
                data={Types}
                placeholder='Chọn loại bất động sản'
              />
            </div>
            <InputField
              type={'text'}
              id={'price'}
              name={'price'}
              placeholder={'Giá'}
            />
            <InputField
              type={'text'}
              id={'size'}
              name={'size'}
              placeholder={'Diện tích'}
            />
          </div>
        </div>
        {/* Other Infomation */}
        <div className='w-full h-auto bg-white flex flex-col gap-y-3 p-5 shadow-md '>
          <h2 className='font-medium text-base'>Các thông tin khác</h2>
          <div>
            <div>
              <label htmlFor='title'>Tiêu đề bài viết</label>
              <InputField
                type={'text'}
                id={'title'}
                name={'title'}
                placeholder={'Tiêu đề bài viết'}
              />
            </div>
            <div className='grid grid-cols-2 gap-3 my-2'>
              <div>
                <label htmlFor='bedroom'>Phòng ngủ</label>
                <InputField
                  type={'number'}
                  id={'bedroom'}
                  name={'bedroom'}
                  placeholder={'Số phòng ngủ'}
                />
              </div>
              <div>
                <label htmlFor='bathroom'>Phòng tắm</label>
                <InputField
                  type={'number'}
                  id={'bathroom'}
                  name={'bathroom'}
                  placeholder={'Số phòng tắm'}
                />
              </div>
              <div>
                <label htmlFor='certificate'>Pháp lý</label>
                <Selector
                  selected={selectedCertificate}
                  setSelected={setSelectedCertificate}
                  data={Certificates}
                  placeholder={'Chọn loại pháp lý'}
                />
              </div>
              <div>
                <label htmlFor='direction'>Hướng bất động sản</label>
                <Selector
                  selected={selectedDirection}
                  setSelected={setSelectedDirection}
                  data={Directions}
                  placeholder={'Chọn hướng bất động sản'}
                />
              </div>
            </div>
            {/* Description */}
            <div className='w-full h-[300px] mt-3'>
              <label htmlFor='description'>Thông tin mô tả</label>
              <RichText value={value} setValue={setValue} />
            </div>
          </div>
        </div>
        {/* Upload images */}
        <div className='w-full h-auto bg-white flex flex-col gap-y-3 p-5 shadow-md'>
          <h2 className='font-medium text-base'>Hình ảnh và Video</h2>
          <div className='flex justify-between gap-x-4'>
            <div className='flex-1 grid grid-cols-4 gap-0.5 w-full h-72 border-[1px] border-gray-200 overflow-y-auto'>
              {images.map((image, index) => (
                <div key={index} className='relative'>
                  <img src={image} alt='image' className='w-full h-32' />
                  <button
                    type='button'
                    className='absolute top-0 right-0'
                    onClick={() => {
                      const newImages = images.filter((_, i) => i !== index);
                      setImages(newImages);
                    }}
                  >
                    <FaTimes className='text-xl text-red-500' />
                  </button>
                </div>
              ))}
            </div>
            <div className='flex-none flex flex-col'>
              <UploadWidget
                uwConfig={{
                  cloudName: 'MarcusNguyen',
                  uploadPreset: 'estate-app',
                  multible: true,
                  folder: 'posts',
                }}
                setState={setImages}
              />
              <button
                type='button'
                className='w-20 h-10 mt-2 bg-red-500 text-white text-sm rounded-md p-2'
                onClick={() => setImages([])}
              >
                Delete all
              </button>
            </div>
          </div>
        </div>
        {/* Coordinate */}
        <div className='w-full h-auto bg-white flex flex-col gap-y-3 p-5 shadow-md'>
          <h2 className='font-medium text-base'>Tọa độ bất động sản</h2>
          <div className='grid grid-cols-2 gap-6'>
            <div>
              <label htmlFor='latitude'>Vĩ độ</label>
              <InputField
                type={'text'}
                id={'latitude'}
                name={'latitude'}
                placeholder={'Nhập vĩ độ'}
              />
            </div>
            <div>
              <label htmlFor='longitude'>Tung độ</label>
              <InputField
                type={'text'}
                id={'longitude'}
                name={'longitude'}
                placeholder={'Nhập tung độ'}
              />
            </div>
          </div>
        </div>
        {/* Submit */}
        <div className='w-full flex justify-between'>
          <div>
            {error && <div className='text-red-500'>{error.message}</div>}
          </div>
          <button className='w-24 h-12 bg-primary font-medium text-white rounded-md'>
            Đăng tin
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPostPage;
