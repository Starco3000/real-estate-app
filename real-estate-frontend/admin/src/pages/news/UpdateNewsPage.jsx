import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, UploadCloud } from '../../components/Icons';
import { TypeNews } from '../../services/data';
import { uploadFile } from '../../helpers/uploadFile';
import { showToast } from './../../components/Toast';
import apiRequest from '../../services/apiRequest';
import InputField from '../../components/inputField/InputField';
import Selector from '../../components/Selector';
import RichText from '../../components/RichText';
import NewsPreview from '../../components/NewsPreview';

function UpdateNewsPage() {
  const { id } = useParams();
  const [selectedType, setSelectedType] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [file, setFile] = useState(null); // Store the selected file
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    title: '',
    thumbnail: '',
    type: '',
    description: '',
  });

  useEffect(() => {
    async function fetchNewsData() {
      try {
        const response = await apiRequest(`/admin/news/single-news/${id}`);
        const newsData = response?.data?.news;
        console.log('Data:', newsData);
        setFormValues({
          title: newsData?.title,
          description: newsData?.description,
        });
        setSelectedType({ name: newsData?.type });
        setThumbnail({ url: newsData?.thumbnail });
        setDescription(newsData?.description);
      } catch (error) {
        console.log('Error:', error);
      }
    }
    fetchNewsData();
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!formValues.title) newErrors.title = 'Tiêu đề tin tức là bắt buộc';
    if (!thumbnail) newErrors.thumbnail = 'Cần ít nhất 1 ảnh';
    if (!selectedType) newErrors.type = 'Cần chọn loại tin tức';
    if (!description) newErrors.description = 'Mô tả tin tức là bắt buộc';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleImageRemove = () => {
    setThumbnail(null);
    setFile(null);
  };

  const handleUploadPhoto = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile); // Store the selected file in the state
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnail({ url: reader.result }); // Display the selected image
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const type = selectedType?.value;

    let imageUrl = '';
    if (file) {
      const folder = 'news'; // Location to store images
      const uploadPhoto = await uploadFile(file, folder); // Upload file to Cloudinary
      imageUrl = uploadPhoto?.url;
    }

    const datas = {
      title,
      type,
      thumbnail: imageUrl,
      description,
    };
    try {
      const request = await apiRequest.put(
        `/admin/news/update-news/${id}`,
        datas,
      );
      if (request.data.updateNews._id === undefined) {
        showToast('error', request.message);
        return;
      } else {
        navigate('/admin/news/single-news/' + request.data.updateNews._id);
        showToast('Cập nhập tin tức thành công', 'success');
      }
    } catch (error) {
      console.log('Error:', error);
      showToast('error', 'Có lỗi xảy ra, vui lòng thử lại sau');
    }
  };

  return (
    <div className='w-full h-auto bg-layout font-lexend font-normal text-sm flex flex-col justify-center items-center'>
      {/* Back button */}
      <div className='w-full h-auto pt-6'>
        <button
          className='mb-6 ml-20 text-lg flex items-center gap-x-3 '
          onClick={handleBack}
        >
          <ArrowLeft /> Back
        </button>
      </div>
      <div className='w-full h-auto px-5 py-3 flex flex-row justify-center gap-x-5'>
        {/* Content Created area */}
        <form
          className='w-1/2 max-w-[900px] h-[85vh] px-6  border shadow-md bg-white flex flex-col gap-y-5 overflow-y-scroll no-scrollbar'
          onSubmit={handleSubmit}
        >
          <h1 className='w-full pt-7 font-semibold text-2xl text-center capitalize'>
            Cập nhập tin tức
          </h1>
          {/* Title and Type of News */}
          <div className='w-full h-auto pt-2 flex gap-x-4'>
            <div className='w-2/3'>
              <label
                htmlFor='title'
                className='block font-semibold text-base py-2'
              >
                Tiêu đề bài viết
              </label>
              <InputField
                type='text'
                id='title'
                name='title'
                placeholder='Nhập tiêu đề bài viết...'
                value={formValues.title}
                onChange={handleChange}
                error={errors.title}
              />
              {errors.title && (
                <i className='font-light text-red-400 mt-2'>* {errors.title}</i>
              )}
            </div>
            <div className='w-1/3'>
              <label
                htmlFor='type'
                className='block font-semibold text-base py-2'
              >
                Loại tin tức
              </label>
              <Selector
                selected={selectedType}
                setSelected={setSelectedType}
                data={TypeNews}
                placeholder={'Chọn loại tin tức'}
              />
              {errors.type && (
                <i className='font-light text-red-400 mt-2'>* {errors.type}</i>
              )}
            </div>
          </div>
          {/* Thumnail Image */}
          <div className='w-full h-auto'>
            <label
              htmlFor='title'
              className='block font-semibold text-base py-2'
            >
              Hình ảnh đại diện
            </label>
            <div className='w-full h-[300px] flex items-center justify-center border border-dashed border-gray-400 relative'>
              {thumbnail ? (
                <div className='relative w-full h-full'>
                  <img
                    src={thumbnail.url}
                    alt='Uploaded'
                    className='w-full h-full object-cover'
                  />
                  <button
                    className='w-7 h-7 absolute top-2 right-2 bg-red-500 text-white rounded-full'
                    onClick={handleImageRemove}
                  >
                    X
                  </button>
                </div>
              ) : (
                <label className='flex flex-col items-center justify-center cursor-pointer'>
                  <UploadCloud className='w-20 h-auto' />
                  <span className='mt-2 text-gray-600'>Tải ảnh lên</span>
                  <input
                    type='file'
                    className='hidden'
                    onChange={handleUploadPhoto}
                  />
                  {errors.thumbnail && (
                    <i className='font-light text-red-400 mt-2'>
                      * {errors.thumbnail}
                    </i>
                  )}
                </label>
              )}
            </div>
          </div>
          {/* Description */}
          <div className='w-full h-auto pb-10 mb-4'>
            <label
              htmlFor='description'
              className='block font-semibold text-base py-2'
            >
              Mô tả bài viết
            </label>
            <RichText
              value={description}
              setValue={setDescription}
              height={400}
            />
            {errors.description && (
              <i className='font-light text-red-400 mt-2'>
                * {errors.description}
              </i>
            )}
          </div>
          <button
            type='submit'
            className='bg-blue-500 text-white px-4 py-2 mt-3 mb-6 rounded hover:bg-blue-600'
          >
            Submit
          </button>
        </form>
        {/* News Preview area */}
        <div className='w-1/2 h-[85vh] overflow-y-scroll'>
          <NewsPreview
            title={formValues?.title}
            thumbnail={thumbnail}
            description={description}
          />
        </div>
      </div>
    </div>
  );
}

export default UpdateNewsPage;
