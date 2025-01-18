import React, { useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import Avatar from '../../components/Avatar';
import SliderInPost from '../../components/slider/SliderInPost';
import Images from '../../components/Images';
import { ArrowLeft, Favorite } from '../../components/Icons';
import Map from '../../components/map/Map';
import {
  formatPrice,
  formatSize,
  formatDate,
} from '../../components/FormatValue';
import 'react-quill-new/dist/quill.snow.css';
import apiRequest from '../../services/apiRequest';
import LoaderSpinner from '../../components/LoaderSpinner';
import OtherEstate from '../../components/OtherEstate';

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
  // const post = useLoaderData();
  // const postInfo = post.post;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function getPostDetail() {
      setLoading(true);
      try {
        const response = await apiRequest.get(`/posts/${id}`);
        setPost(response.data.post);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    getPostDetail();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
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

  if (loading) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <LoaderSpinner />
      </div>
    );
  }

  if (error) return `Error loading post: ${error}`;
  if (!post) return 'No post available';

  const postDetailInfo = post.postDetailId;
  const agentInfo = post?.userId;

  return (
    <div className='w-full h-auto bg-white font-lexend font-normal text-sm pt-10'>
      <button
        onClick={handleBack}
        className=' mb-6 ml-10 text-base flex items-center gap-x-3 '
      >
        <ArrowLeft /> Back
      </button>
      <div className='w-full h-auto flex flex-col md:flex-row justify-center items-start md:gap-x-8 '>
        {/* Left content */}
        <div className='w-full max-w-[845px] bg-white md:mb-10'>
          {/* Image Estate */}
          <div className='w-full md:h-[580px]'>
            <SliderInPost images={postDetailInfo?.images} />
          </div>
          {/* Breadcrumb */}
          {/* <div className='w-full h-[30px] bg-yellow-400 mt-20 md:mt-4'>
            breadcrumb
          </div> */}
          {/* Info Estate */}
          <div className='px-3 md:px-0'>
            <h1 className='font-medium text-lg md:text-2xl line-clamp-2 my-2'>
              {post?.title}
            </h1>

            <div className='my-4'>
              <span>
                {post.address}, {post.ward[1]}, {post.district[1]},{' '}
                {post.province[1]}
              </span>
            </div>

            <div className='flex justify-between mt-2'>
              <div className='flex gap-x-20'>
                <div className='flex flex-col gap-y-2'>
                  <span className='opacity-40'>Mức giá</span>
                  <span className='font-semibold text-base text-primary'>
                    {formatPrice(post.price)}
                  </span>
                </div>
                <div className='flex flex-col gap-y-2'>
                  <span className='opacity-40'>Diện tích</span>
                  <span className='font-semibold text-base text-primary'>
                    {formatSize(post.size)}
                  </span>
                </div>
              </div>
              {/* <div className='flex items-center'>
                <Link
                  to='/favorite'
                  className='w-7 h-7 border-[1px] border-black flex justify-center items-center rounded cursor-pointer'
                >
                  <Favorite className='text-xl text-black' />
                </Link>
              </div> */}
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
                  {formatSize(post.size)}
                </span>
              </div>
              <div className='flex justify-between border-b-[1px] border-gray-200'>
                <span>Mức giá</span>
                <span className='text-primary font-bold'>
                  {formatPrice(post.price)}
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
                  {directionMapping[post.direction] || post.direction}
                </span>
              </div>
              <div className='flex justify-between border-b-[1px] border-gray-200'>
                <span>Số phòng ngủ</span>
                <span className='text-primary font-bold'>{post.bedroom}</span>
              </div>
              <div className='flex justify-between border-b-[1px] border-gray-200'>
                <span>Số phòng vệ sinh</span>
                <span className='text-primary font-bold'>{post.bathroom}</span>
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
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <div className='flex flex-col'>
                <span className='font-medium text-primary pb-1'>
                  Loại bài tin
                </span>
                <span>{post.status === 'buy' ? 'Bán' : 'Cho Thuê'}</span>
              </div>
              <div className='flex flex-col'>
                <span className='font-medium text-primary pb-1'>Mã tin</span>
                <span>{post._id}</span>
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
                  src={agentInfo?.avatar || Images.noavatar}
                  width={65}
                  height={65}
                />
                <span className='my-3 font-medium text-base text-primary'>
                  {agentInfo.name || 'Người đăng'}
                </span>
              </div>
              <div className='w-full row-start-2 '>
                <button
                  className='w-full h-12 bg-primary font-medium text-white rounded-md mb-2'
                  onClick={handleCopyToClipboard}
                >
                  {agentInfo?.phone || 'Liên hệ'}
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
          <OtherEstate district={post.district} status={post.status} />
        </div>
      </div>
    </div>
  );
}

export default PostDetailPage;
