import { useEffect, useReducer, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiRequest from '../services/apiRequest';
import { postDetailLoader } from '../services/dataLoaders';
import useLocationData from '../hooks/useLocationData';
import SizeInput from '../components/inputField/SizeInput';
import PriceInput from '../components/inputField/PriceInput';
import Selector from '../components/Selector';
import InputField from '../components/inputField/InputField';
import RichText from '../components/RichText';
import { uploadFiles } from '../helpers/uploadFile';
import { Types, Directions, Certificates } from '../services/data';
import { Rent, RentFill, Sale, SaleFill, Times } from '../components/Icons';
import { showToast } from '../components/Toast';
import {
  changeIconReducer,
  SELECT_FOR_RENT,
  SELECT_FOR_SALE,
} from '../hooks/useReducer';

function UpdatePostPage() {
  const { id } = useParams();
  const {
    provinces,
    districts,
    wards,
    query,
    setQuery,
    setSelectedProvince,
    setSelectedDistrict,
    setSelectedWard,
  } = useLocationData();
  const [selectedType, setSelectedType] = useState(null);
  const [selectedDirection, setSelectedDirection] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [value, setValue] = useState('');
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);
  const [state, dispatch] = useReducer(changeIconReducer, {
    selectedIcon: null,
  });

  const [formValues, setFormValues] = useState({
    title: '',
    address: '',
    bedroom: '',
    bathroom: '',
    latitude: '',
    longitude: '',
    price: { amount: '', unit: 'triệu', convertedValue: '' },
    size: { amount: '', unit: 'm²', convertedValue: '' },
  });

  const uploadPhotoRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const data = await postDetailLoader({ params: { id } });
        const postDetailId = data.post.postDetailId;
        const price = data.post.price;
        const priceDetails =
          price >= 1e9
            ? {
                amount: price / 1e9,
                unit: 'tỷ',
                convertedValue: price,
              }
            : {
                amount: price / 1e6,
                unit: 'triệu',
                convertedValue: price,
              };
        setFormValues({
          title: data.post.title,
          address: data.post.address,
          bedroom: data?.post?.bedroom,
          bathroom: data?.post?.bathroom,
          latitude: postDetailId.coordinate.latitude,
          longitude: postDetailId.coordinate.longitude,
          price: priceDetails,
          size: {
            amount: data.post.size,
            unit: 'm²',
            convertedValue: data.post.size,
          },
        });
        setImages(postDetailId.images);
        setSelectedType({ name: data.post.type });
        setSelectedProvince({
          code: data?.post?.province[0],
          name: data?.post?.province[1],
        });
        setSelectedDistrict({
          code: data?.post?.district[0],
          name: data?.post?.district[1],
        });
        setSelectedWard({
          code: data?.post?.ward[0],
          name: data?.post?.ward[1],
        });
        setSelectedDirection({
          name: data.post.direction,
        });
        setSelectedCertificate({ name: postDetailId.certificate });
        setValue(postDetailId.description);
        dispatch({
          type: data.post.status === 'buy' ? SELECT_FOR_SALE : SELECT_FOR_RENT,
        });
      } catch (error) {
        console.error('Failed to fetch post data', error);
      }
    };

    fetchPostData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleNumberInput = (e) => {
    const value = e.target.value;
    e.target.value = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    handleChange(e); 
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

  const handleOpenUploadPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadPhotoRef.current.click();
  };

  const handleUploadPhotos = async (e) => {
    const files = Array.from(e.target.files);
    console.log('file', files);
    if (!files) return;
    const folder = 'posts'; // LocationLocation to store images
    const uploadPhoto = await uploadFiles(files, folder); // Upload files to cloudinary
    const photoUrls = uploadPhoto.map((photo) => photo.url); // Get url from response
    console.log('uploadPhoto', photoUrls);
    setImages((prevImages) => [...prevImages, ...photoUrls]);
  };

  const validate = () => {
    const newErrors = {};
    if (!formValues.title) newErrors.title = 'Tiêu đề bài viết là bắt buộc';
    if (!formValues.address) newErrors.address = 'Địa chỉ là bắt buộc';
    if (!formValues.latitude) newErrors.latitude = 'Vĩ độ là bắt buộc';
    if (!formValues.longitude) newErrors.longitude = 'Tung độ là bắt buộc';
    if (!query.province) newErrors.province = 'Tỉnh/thành phố là bắt buộc';
    if (!query.district) newErrors.district = 'Quận/huyện là bắt buộc';
    if (!query.ward) newErrors.ward = 'Phường/xã là bắt buộc';
    if (!formValues.bedroom) newErrors.bedroom = 'Số phòng ngủ là bắt buộc';
    if (!formValues.bathroom) newErrors.bathroom = 'Số phòng tắm là bắt buộc';
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
        bedroom: inputs.bedroom,
        bathroom: inputs.bathroom,
        direction: selectedDirection ? selectedDirection.name : '',
        address: inputs.address,
        province: query.province
          ? [query.province.code, query.province.name]
          : [],
        district: query.district
          ? [query.district.code, query.district.name]
          : [],
        ward: query.ward ? [query.ward.code, query.ward.name] : [],
        type: selectedType ? selectedType.name : '',
        status: state.selectedIcon === 'isForSale' ? 'buy' : 'rent',
      },
      postDetail: {
        images: images,
        description: value || '',
        certificate: selectedCertificate ? selectedCertificate.name : '',
        coordinate: {
          latitude: parseFloat(inputs.latitude),
          longitude: parseFloat(inputs.longitude),
        },
      },
    };

    try {
      const request = await apiRequest.put(`/posts/${id}`, datas);
      navigate('/' + request.data.updatedPost._id);
      showToast('success', 'Cập nhật tin đăng thành công');
    } catch (error) {
      console.error('Error creating post:', error);
      showToast('error', 'Cập nhật tin đăng thất bại');
    }
  };

  return (
    <div className='bg-layout w-full h-auto p-5 font-lexend font-normal text-sm'>
      <form
        className='my-20 max-w-[832px] mx-auto flex flex-col gap-y-5'
        onSubmit={handleSubmit}
      >
        <h1 className='font-semibold text-2xl pt-6'>Chỉnh sửa tin đăng</h1>
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
                <SaleFill size={24} />
              ) : (
                <Sale size={24} />
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
                <RentFill size={24} />
              ) : (
                <Rent size={24} />
              )}
              <span>Cho thuê bất động sản</span>
            </div>
          </div>
        </div>
        {/* Choose address */}
        <div className='w-full h-auto bg-white flex flex-col gap-y-3 p-5 shadow-md'>
          <h2 className='font-medium text-base'>Địa chỉ bất động sản</h2>
          <div className='h-14 grid grid-cols-3 gap-x-4'>
            {/* <Selector /> */}
            <div>
              <Selector
                selected={query.province}
                setSelected={(value) => {
                  setQuery((prev) => ({ ...prev, province: value }));
                }}
                data={provinces}
                placeholder='Chọn tỉnh/thành phố'
              />
              {errors.province && (
                <i className='font-light text-red-400 mt-2'>
                  * {errors.province}
                </i>
              )}
            </div>
            <div>
              <Selector
                selected={query.district}
                setSelected={(value) => {
                  setQuery((prev) => ({ ...prev, district: value }));
                }}
                data={districts}
                disabled={!query.province}
                placeholder='Chọn quận/huyện'
              />
              {errors.district && (
                <i className='font-light text-red-400 mt-2'>
                  * {errors.district}
                </i>
              )}
            </div>
            <div>
              <Selector
                selected={query.ward}
                setSelected={(value) => {
                  setQuery((prev) => ({ ...prev, ward: value }));
                }}
                data={wards}
                disabled={!query.district}
                placeholder='Chọn phường/xã'
              />
              {errors.ward && (
                <i className='font-light text-red-400 mt-2'>* {errors.ward}</i>
              )}
            </div>
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
                  type={'text'}
                  id={'bedroom'}
                  name={'bedroom'}
                  placeholder={'Số phòng ngủ'}
                  onInput={handleNumberInput}
                />
                {errors.bedroom && (
                  <i className='font-light text-red-400 mt-2'>
                    * {errors.bedroom}
                  </i>
                )}
              </div>
              <div className='flex flex-col gap-y-1'>
                <label htmlFor='bathroom'>Phòng tắm</label>
                <InputField
                  type={'text'}
                  id={'bathroom'}
                  name={'bathroom'}
                  placeholder={'Số phòng tắm'}
                  onInput={handleNumberInput}
                />
                {errors.bathroom && (
                  <i className='font-light text-red-400 mt-2'>
                    * {errors.bathroom}
                  </i>
                )}
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
                    <Times className='text-xl text-red-500' />
                  </button>
                </div>
              ))}
            </div>
            <div className='flex-none flex flex-col'>
              <label htmlFor='images'>
                <button
                  className='w-20 h-10 bg-primary text-white text-sm rounded-md'
                  onClick={handleOpenUploadPhoto}
                >
                  Upload
                </button>
                <input
                  type='file'
                  id='images'
                  multiple
                  className='hidden'
                  onChange={handleUploadPhotos}
                  ref={uploadPhotoRef}
                />
              </label>
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
          <button className='w-24 h-12 bg-primary font-medium text-white rounded-md hover:opacity-80'>
            Cập nhập
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePostPage;