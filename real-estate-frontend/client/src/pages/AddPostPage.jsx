import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PiTag, PiTagFill } from 'react-icons/pi';
import { FaTimes } from 'react-icons/fa';
import { MdBedroomParent, MdOutlineBedroomParent } from 'react-icons/md';
import {
  Types,
  Directions,
  Certificates,
} from '../services/data';
import apiRequest from './../services/apiRequest';
import Selector from '../components/Selector';
import InputField from '../components/inputField/InputField';
import RichText from '../components/RichText';
import UploadWidget from '../components/uploadWidget/UploadWidget';
import useLocationData from '../hooks/useLocationData';
import {
  changeIconReducer,
  SELECT_FOR_RENT,
  SELECT_FOR_SALE,
} from '../hooks/useReducer';
import SizeInput from '../components/inputField/SizeInput';
import PriceInput from '../components/inputField/PriceInput';

function AddPostPage() {
  const { provinces, districts, wards, query, setQuery } = useLocationData();

  const [formValues, setFormValues] = useState({
    title: '',
    address: '',
    latitude: '',
    longitude: '',
    price: { amount: '', unit: 'triệu', convertedValue: '' },
    size: { amount: '', unit: 'm²', convertedValue: '' },
  });

  const [selectedType, setSelectedType] = useState(null);
  const [selectedDirection, setSelectedDirection] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [value, setValue] = useState('');
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);
  const [state, dispatch] = useReducer(changeIconReducer, {
    selectedIcon: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handlePriceChange = (value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      price: value,
    }));
  };

  const handleSizeChange = (value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      size: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formValues.title) newErrors.title = 'Tiêu đề bài viết là bắt buộc';
    if (!formValues.address) newErrors.address = 'Địa chỉ là bắt buộc';
    if (!formValues.latitude) newErrors.latitude = 'Vĩ độ là bắt buộc';
    if (!formValues.longitude) newErrors.longitude = 'Tung độ là bắt buộc';
    if (images.length < 4) newErrors.images = 'Cần tải lên ít nhất 4 hình ảnh';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const convertPrice = (amount, unit) => {
    const numericAmount = parseFloat(amount);
    if (unit === 'triệu') return numericAmount * 1e6;
    if (unit === 'tỷ') return numericAmount * 1e9;
    return numericAmount;
  };

  const convertSize = (amount, unit) => {
    const numericAmount = parseFloat(amount);
    if (unit === 'm²') return numericAmount;
    if (unit === 'km²') return numericAmount * 1e6;
    return numericAmount;
  };

  //HandleSubmit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    const convertedPrice = convertPrice(
      formValues.price.amount,
      formValues.price.unit,
    );
    const convertedSize = convertSize(
      formValues.size.amount,
      formValues.size.unit,
    );

    const datas = {
      postData: {
        title: inputs.title,
        size: convertedSize,
        price: convertedPrice,
        bedroom: inputs.bedroom ? parseInt(inputs.bedroom) : null,
        bathroom: inputs.bathroom ? parseInt(inputs.bathroom) : null,
        address: inputs.address,
        province: query.province ? query.province.name : '',
        district: query.district ? query.district.name : '',
        ward: query.ward ? query.ward.name : '',
        type: selectedType ? selectedType.name : '',
        status: state.selectedIcon === 'isForSale' ? 'buy' : 'rent',
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

    try {
      const request = await apiRequest.post('/posts', datas);
      navigate('/' + request.data._id);
    } catch (error) {
      console.error('Error creating post:', error);
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
              selected={query.province}
              setSelected={(value) => {
                setQuery((prev) => ({ ...prev, province: value }));
              }}
              data={provinces}
              placeholder='Chọn tỉnh/thành phố'
            />
            <Selector
              selected={query.district}
              setSelected={(value) => {
                setQuery((prev) => ({ ...prev, district: value }));
              }}
              data={districts}
              disabled={!query.province}
              placeholder='Chọn quận/huyện'
            />
            <Selector
              selected={query.ward}
              setSelected={(value) => {
                setQuery((prev) => ({ ...prev, ward: value }));
              }}
              data={wards}
              disabled={!query.district}
              placeholder='Chọn phường/xã'
            />
          </div>
          <label htmlFor='address'>Địa chỉ chi tiết</label>
          <InputField
            type={'text'}
            id={'address'}
            name={'address'}
            placeholder={'Nhập địa chỉ chi tiết nếu có'}
            value={formValues.address}
            onChange={handleChange}
            error={errors.address}
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
            <PriceInput value={formValues.price} onChange={handlePriceChange} />
            <SizeInput value={formValues.size} onChange={handleSizeChange} />
          </div>
        </div>
        {/* Other Infomation */}
        <div className='w-full h-auto bg-white flex flex-col gap-y-3 p-5 shadow-md '>
          <h2 className='font-medium text-base'>Các thông tin khác</h2>
          <div>
            <div className='flex flex-col gap-y-1'>
              <label htmlFor='title'>Tiêu đề bài viết</label>
              <InputField
                type={'text'}
                id={'title'}
                name={'title'}
                placeholder={'Tiêu đề bài viết'}
                value={formValues.title}
                onChange={handleChange}
                error={errors.title}
              />
              {errors.title && (
                <i className='font-light text-red-400 mt-2'>* {errors.title}</i>
              )}
            </div>
            <div className='grid grid-cols-2 gap-3 my-2'>
              <div className='flex flex-col gap-y-1'>
                <label htmlFor='bedroom'>Phòng ngủ</label>
                <InputField
                  type={'number'}
                  id={'bedroom'}
                  name={'bedroom'}
                  placeholder={'Số phòng ngủ'}
                />
              </div>
              <div className='flex flex-col gap-y-1'>
                <label htmlFor='bathroom'>Phòng tắm</label>
                <InputField
                  type={'number'}
                  id={'bathroom'}
                  name={'bathroom'}
                  placeholder={'Số phòng tắm'}
                />
              </div>
              <div className='flex flex-col gap-y-1'>
                <label htmlFor='certificate'>Pháp lý</label>
                <Selector
                  selected={selectedCertificate}
                  setSelected={setSelectedCertificate}
                  data={Certificates}
                  placeholder={'Chọn loại pháp lý'}
                />
              </div>
              <div className='flex flex-col gap-y-1'>
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
            <div className='w-full h-[300px] mt-3 flex flex-col gap-y-1'>
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
                  cloudName: `${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}`,
                  uploadPreset: `${
                    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
                  }`,
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
          {errors.images && (
            <i className='font-light text-red-400 mt-2'>* {errors.images}</i>
          )}
        </div>
        {/* Coordinate */}
        <div className='w-full h-auto bg-white flex flex-col gap-y-3 p-5 shadow-md'>
          <h2 className='font-medium text-base'>Tọa độ bất động sản</h2>
          <div className='grid grid-cols-2 gap-6'>
            <div className='flex flex-col gap-y-1'>
              <label htmlFor='latitude'>Vĩ độ</label>
              <InputField
                type={'text'}
                id={'latitude'}
                name={'latitude'}
                placeholder={'Nhập vĩ độ'}
                value={formValues.latitude}
                onChange={handleChange}
                error={errors.latitude}
              />
              {errors.latitude && (
                <i className='font-light text-red-400 mt-2'>
                  * {errors.latitude}
                </i>
              )}
            </div>
            <div className='flex flex-col gap-y-1'>
              <label htmlFor='longitude'>Tung độ</label>
              <InputField
                type={'text'}
                id={'longitude'}
                name={'longitude'}
                placeholder={'Nhập tung độ'}
                value={formValues.longitude}
                onChange={handleChange}
                error={errors.longitude}
              />
              {errors.longitude && (
                <i className='font-light text-red-400 mt-2'>
                  * {errors.longitude}
                </i>
              )}
            </div>
          </div>
        </div>
        {/* Submit */}
        <div className='w-full flex justify-end'>
          <button className='w-24 h-12 bg-primary font-medium text-white rounded-md'>
            Đăng tin
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPostPage;
