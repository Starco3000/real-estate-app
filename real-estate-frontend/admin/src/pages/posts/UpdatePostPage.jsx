import { useEffect, useReducer, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { uploadFiles } from '../../helpers/uploadFile';
import { Types, Directions, Certificates } from '../../services/data';
import { Rent, RentFill, Sale, SaleFill, Times } from '../../components/Icons';
import { showToast } from '../../components/Toast';
import apiRequest from '../../services/apiRequest';
import useLocationData from '../../hooks/useLocationData';
import SizeInput from '../../components/inputField/SizeInput';
import PriceInput from '../../components/inputField/PriceInput';
import Selector from '../../components/Selector';
import InputField from '../../components/inputField/InputField';
import RichText from '../../components/RichText';
import Map from '../../components/map/Map';
import {
  changeIconReducer,
  SELECT_FOR_RENT,
  SELECT_FOR_SALE,
} from '../../hooks/useReducer';

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
    latitude: 0,
    longitude: 0,
    price: { amount: '', unit: 'triệu', convertedValue: '' },
    size: { amount: '', unit: 'm²', convertedValue: '' },
  });

  const uploadPhotoRef = useRef();
  const imagesRef = useRef(images);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await apiRequest(`/admin/posts/${id}`);
        const postData = response?.data?.post;
        const postDetail = postData?.postDetailId;
        const price = postData?.price;
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
          title: postData.title,
          address: postData.address,
          bedroom: postData.bedroom,
          bathroom: postData.bathroom,
          latitude: postDetail.coordinate.latitude,
          longitude: postDetail.coordinate.longitude,
          price: priceDetails,
          size: {
            amount: postData.size,
            unit: 'm²',
            convertedValue: postData.size,
          },
        });
        setImages(postDetail.images);
        setSelectedType({ name: postData.type });
        setSelectedProvince({
          code: postData.province[0],
          name: postData.province[1],
        });
        setSelectedDistrict({
          code: postData?.district[0],
          name: postData?.district[1],
        });
        setSelectedWard({
          code: postData?.ward[0],
          name: postData?.ward[1],
        });
        setSelectedDirection({
          name: postData.direction,
        });
        setSelectedCertificate({ name: postDetail.certificate });
        setValue(postDetail.description);
        dispatch({
          type: postData.status === 'buy' ? SELECT_FOR_SALE : SELECT_FOR_RENT,
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
    if (!files) return;
    const folder = 'posts'; // LocationLocation to store images
    const uploadPhoto = await uploadFiles(files, folder); // Upload files to cloudinary
    const photoUrls = uploadPhoto.map((photo) => photo.url); // Get url from response
    setImages((prevImages) => [...prevImages, ...photoUrls]);
  };

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  const validate = () => {
    const newErrors = {};
    if (!formValues.title) newErrors.title = 'Tiêu đề bài viết là bắt buộc';
    if (!formValues.address) newErrors.address = 'Địa chỉ là bắt buộc';
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

    const currentImages = imagesRef.current;
    console.log('Submitted images:', currentImages);

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
        images: currentImages,
        description: value || '',
        certificate: selectedCertificate ? selectedCertificate.name : '',
        coordinate: {
          latitude: parseFloat(formValues.latitude),
          longitude: parseFloat(formValues.longitude),
        },
      },
    };

    try {
      const request = await apiRequest.put(
        `/admin/posts/${id}`,
        JSON.stringify(datas),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      navigate('/admin/' + request.data.updatedPost._id);
      showToast('Cập nhật tin đăng thành công', 'success');
    } catch (error) {
      console.error('Error creating post:', error);
      showToast('Cập nhật tin đăng thất bại', 'error');
    }
  };

  return (
    <div className='bg-layout w-full h-auto p-5 font-lexend font-normal text-sm'>
      <form
        className='mb-20 max-w-[832px] mx-auto flex flex-col gap-y-5'
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

          {/* Map */}
          <div className='z-0'>
            <h2 className='font-medium text-base'>Chọn tọa độ bất động sản</h2>
            <Map
              initialPosition={[formValues.latitude, formValues.longitude]}
              onUpdatePosition={(coords) => {
                setFormValues((prevValues) => ({
                  ...prevValues,
                  latitude: coords[0],
                  longitude: coords[1],
                }));
              }}
            />
          </div>
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
          <div className='h-auto pb-4'>
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
                  value={formValues.bedroom}
                  placeholder={'Số phòng ngủ'}
                  onInput={handleNumberInput}
                />
              </div>
              <div className='flex flex-col gap-y-1'>
                <label htmlFor='bathroom'>Phòng tắm</label>
                <InputField
                  type={'text'}
                  id={'bathroom'}
                  name={'bathroom'}
                  value={formValues.bathroom}
                  placeholder={'Số phòng tắm'}
                  onInput={handleNumberInput}
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
            <div className='w-full h-auto pb-6 mt-3 flex flex-col gap-y-1'>
              <label htmlFor='description'>Thông tin mô tả</label>
              <RichText value={value} setValue={setValue} height={280} />
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
        {/* Submit */}
        <div className='w-full flex justify-end'>
          <button className='w-24 h-12 bg-primary font-medium text-white rounded-md'>
            Cập nhập
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePostPage;
