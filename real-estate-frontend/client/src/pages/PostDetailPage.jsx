import React, { memo, useEffect, useState } from 'react';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import apiRequest from '../services/apiRequest';
import { showToast } from '../components/Toast';
import DOMPurify from 'dompurify';
import Avatar from '../components/Avatar';
import noavatar from '../assets/noavatar.jpg';
import SliderInPost from '../components/slider/SliderInPost';
import OtherEstate from '../components/OtherEstate';
import Map from '../components/map/Map';
import LoaderSpinner from '../components/LoaderSpinner';
import { formatPrice, formatSize, formatDate } from '../components/FormatValue';
import 'react-quill-new/dist/quill.snow.css';

const directionMapping = {
  north: 'Hướng Bắc',
  'north-east': 'Hướng Đông Bắc',
  east: 'Hướng Đông',
  'south-east': 'Hướng Đông Nam',
  south: 'Hướng Nam',
  'south-west': 'Hướng Tây Nam',
  west: 'Hướng Tây',
  'north-west': 'Hướng Tây Bắc',
};

function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  //FetchPostData
  useEffect(() => {
    async function fetchPost() {
      setIsLoading(true);
      try {
        const response = await apiRequest.get(`/posts/${id}`);
        setPost(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  //Check Favorite if post is exist
  useEffect(() => {
    const checkFavorite = async () => {
      if (!post || !post.post._id) return;
      try {
        const response = await apiRequest.get('/favorites');
        const favorites = response.data.favorites;
        const isFav = favorites.some(
          (favorite) => favorite.postId._id === post.post._id,
        );
        setIsFavorite(isFav);
      } catch (error) {
        console.error('Failed to check favorite:', error);
      }
    };

    if (post) {
      checkFavorite();
    }
  }, [post]);

  const handleFavorite = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      if (isFavorite) {
        await apiRequest.delete(`/favorites/${post.post._id}`);
        showToast('Bỏ lưu bài viết thành công', 'info');
        setIsFavorite(false);
      } else {
        await apiRequest.post(`/favorites/${post.post._id}`);
        showToast('Lưu bài viết thành công', 'success');
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Failed to update favorite status:', error);
      showToast('Có lỗi xảy ra', 'error');
    }
  };

  const handleCopyToClipboard = () => {
    const textToCopy = agentInfo?.phone || 'Liên hệ';
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert('Số điện thoại đã được sao chép vào clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };

  if (isLoading) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <LoaderSpinner />
      </div>
    );
  }

  if (error) return `Error loading post: ${error}`;
  if (!post) return 'No post available';

  const postInfo = post.post;
  console.log('postInfo', postInfo.status);
  const postDetailInfo = post.post.postDetailId;
  const agentInfo = post.post.userId;

  return (
    <div className='w-full h-auto flex flex-col md:flex-row justify-center items-start md:gap-x-8 font-lexend font-normal text-sm pt-10 md:pt-32'>
      {/* Left content */}
      <div className='w-full max-w-[845px] bg-white md:mb-10'>
        {/* Image Estate */}
        <div className='w-full md:h-[580px]'>
          <SliderInPost images={postDetailInfo.images} />
        </div>

        {/* Breadcrumb */}
        {/* <div className='w-full h-[30px] bg-yellow-400 mt-20 md:mt-4'>
          breadcrumb
        </div> */}

        {/* Info Estate */}
        <div className='px-3 md:px-0'>
          <h1 className='font-medium text-lg md:text-2xl line-clamp-2 my-2'>
            {postInfo.title}
          </h1>

          <div className='my-4'>
            <span>
              {postInfo.address}, {postInfo.ward[1]}, {postInfo.district[1]},{' '}
              {postInfo.province[1]}
            </span>
          </div>

          <div className='flex justify-between mt-2'>
            <div className='flex gap-x-20'>
              <div className='flex flex-col gap-y-2'>
                <span className='opacity-40'>Mức giá</span>
                <span className='font-semibold text-base text-primary'>
                  {formatPrice(postInfo.price)}
                </span>
              </div>
              <div className='flex flex-col gap-y-2'>
                <span className='opacity-40'>Diện tích</span>
                <span className='font-semibold text-base text-primary'>
                  {formatSize(postInfo.size)}
                </span>
              </div>
            </div>
            <div className='flex items-center'>
              <button
                className='w-7 h-7 border-[1px] border-black flex justify-center items-center rounded cursor-pointer'
                onClick={handleFavorite}
              >
                {!isFavorite ? (
                  <IoMdHeartEmpty className='text-xl text-black' />
                ) : (
                  <IoMdHeart className='text-xl text-red-400' />
                )}
              </button>
            </div>
          </div>

          {/* Description Estate */}
          <h2 className='font-medium text-lg mt-10'>Thông tin mô tả</h2>
          <p
            className='ql-editor mt-4'
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(postDetailInfo.description),
            }}
          />

          {/* Special */}
          <h2 className='font-medium text-lg mt-10'>Đặc điểm bất động sản</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-40 gap-y-5 md:gap-y-2 mt-2'>
            <div className='flex justify-between border-b-[1px] border-gray-200'>
              <span>Diện tích</span>
              <span className='text-primary font-bold'>
                {formatSize(postInfo.size)}
              </span>
            </div>
            <div className='flex justify-between border-b-[1px] border-gray-200'>
              <span>Mức giá</span>
              <span className='text-primary font-bold'>
                {formatPrice(postInfo.price)}
              </span>
            </div>
            <div className='flex justify-between border-b-[1px] border-gray-200'>
              <span>Tình trạng pháp lý</span>
              <span className='text-primary font-bold'>
                {postDetailInfo.certificate}
              </span>
            </div>
            <div className='flex justify-between border-b-[1px] border-gray-200'>
              <span>Hướng nhà</span>
              <span className='text-primary font-bold'>
                {directionMapping[postInfo.direction] || postInfo.direction}
              </span>
            </div>
            <div className='flex justify-between border-b-[1px] border-gray-200'>
              <span>Số phòng ngủ</span>
              <span className='text-primary font-bold'>{postInfo.bedroom}</span>
            </div>
            <div className='flex justify-between border-b-[1px] border-gray-200'>
              <span>Số phòng vệ sinh</span>
              <span className='text-primary font-bold'>
                {postInfo.bathroom}
              </span>
            </div>
          </div>

          {/* Map */}
          <h2 className='font-medium text-lg mt-10'>Vị trí bất động sản</h2>
          <div className='w-full h-[300px] bg-green-300 mt-4'>
            <Map
              isReadOnly={true}
              initialPosition={[
                postDetailInfo.coordinate.latitude,
                postDetailInfo.coordinate.longitude,
              ]}
            />
          </div>

          {/* Post Infomation */}
          <div className='md:my-10 py-5 grid grid-cols-2 grid-rows-2 md:grid-cols-3 md:grid-rows-1 gap-10 items-center border-y-[1px] border-gray-200'>
            <div className='flex flex-col'>
              <span className='font-medium text-primary pb-1'>Ngày đăng</span>
              <span>{formatDate(postInfo.createdAt)}</span>
            </div>
            <div className='flex flex-col'>
              <span className='font-medium text-primary pb-1'>
                Loại bài tin
              </span>
              <span>{postInfo.status === 'buy' ? 'Bán' : 'Cho Thuê'}</span>
            </div>
            <div className='flex flex-col'>
              <span className='font-medium text-primary pb-1'>Mã tin</span>
              <span>{postInfo._id}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right content */}
      <div className='w-full md:max-w-64 bg-white'>
        {/* Agent Contact */}
        <div className='px-3 py-4 border-[1px] border-gray-300 rounded-md md:flex md:flex-col gap-x-3 shadow-sm'>
          <h2 className='md:hidden text-base font-semibold mb-6'>
            Thông tin người đăng tin
          </h2>
          <div className='md:block grid grid-cols-2 md:grid-cols-1 grid-rows-1'>
            <div className='flex flex-col justify-center items-center row-start-2 '>
              <Avatar
                src={agentInfo?.avatar || noavatar}
                width={65}
                height={65}
              />
              <span className='my-3 font-medium text-base text-primary'>
                {agentInfo?.username}
              </span>
            </div>
            <div className='w-full row-start-2 '>
              <button
                className='w-full h-12 bg-primary font-medium text-white rounded-md mb-2'
                onClick={handleCopyToClipboard}
              >
                {agentInfo?.phone}
              </button>
              <a
                href={`https://zalo.me/${agentInfo?.phone}`}
                target='_blank'
                rel='noopener noreferrer'
                className='no-underline'
              >
                <button className='w-full h-12 border-[1px] font-medium border-gray-300 rounded-md'>
                  Chat Zalo ngay
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Related Post */}
        <OtherEstate district={postInfo.district} status={postInfo.status} />
      </div>
    </div>
  );
}

export default memo(PostDetailPage);
