import React from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import Avatar from '../../components/Avatar';
import SliderInPost from '../../components/slider/SliderInPost';
import Images from '../../components/Images';
import { ArrowLeft, Favorite } from '../../components/Icons';
// import InteractiveMap from '../components/map/GoogleMap';
import {
  formatPrice,
  formatSize,
  formatDate,
} from '../../components/FormatValue';

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
  const post = useLoaderData();
  const postInfo = post.post;
  const postDetailInfo = post.post.postDetailId;
  const agentInfo = post.post.userId;
  const navigate = useNavigate();
  console.log(post.post);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className='w-full h-auto font-lexend font-normal text-sm pt-10'>
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
            <SliderInPost images={postInfo.images} />
          </div>
          {/* Breadcrumb */}
          <div className='w-full h-[30px] bg-yellow-400 mt-20 md:mt-4'>
            breadcrumb
          </div>
          {/* Info Estate */}
          <div className='px-3 md:px-0'>
            <h1 className='font-medium text-lg md:text-2xl line-clamp-2 my-2'>
              {postInfo.title}
            </h1>

            <div className='my-4'>
              <span>
                {postInfo.address}, {postInfo.ward}, {postInfo.district},{' '}
                {postInfo.province}
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
                <Link
                  to='/favorite'
                  className='w-7 h-7 border-[1px] border-black flex justify-center items-center rounded cursor-pointer'
                >
                  <Favorite className='text-xl text-black' />
                </Link>
              </div>
            </div>

            {/* Description Estate */}
            <h2 className='font-medium text-lg mt-10'>Thông tin mô tả</h2>
            <p
              className='mt-4'
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
                  {directionMapping[postDetailInfo.direction] ||
                    postDetailInfo.direction}
                </span>
              </div>
              <div className='flex justify-between border-b-[1px] border-gray-200'>
                <span>Số phòng ngủ</span>
                <span className='text-primary font-bold'>
                  {postInfo.bedroom}
                </span>
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
              {/* <InteractiveMap items={[postInfo]} /> */}
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
                  src={agentInfo.avatar || Images.noavatar}
                  width={65}
                  height={65}
                />
                <span className='my-3 font-medium text-base text-primary'>
                  {agentInfo.username}
                </span>
              </div>
              <div className='w-full row-start-2 '>
                <button className='w-full h-12 bg-primary font-medium text-white rounded-md mb-2'>
                  {agentInfo.phone}
                </button>
                <button className='w-full h-12 border-[1px] font-medium border-gray-300 rounded-md'>
                  <Link to='/chat'>Chat ngay</Link>
                </button>
              </div>
            </div>
          </div>

          {/* Related Post */}
          <div className='mt-4 px-5 py-4 border-[1px] border-gray-300 rounded-md flex flex-col justify-center items-start shadow-sm '>
            <span className='font-semibold text-primary text-base'>
              Bất động sản liên quan
            </span>
            <ul>
              <li className='mt-4 hover:opacity-60'>
                <Link to='/list'>Bán nhà Phường X Quận Y</Link>
              </li>
              <li className='mt-4 hover:opacity-60'>
                <Link to='/list'>Bán nhà Phường X Quận Y</Link>
              </li>
              <li className='mt-4 hover:opacity-60'>
                <Link to='/list'>Bán nhà Phường X Quận Y</Link>
              </li>
              <li className='mt-4 hover:opacity-60'>
                <Link to='/list'>Bán nhà Phường X Quận Y</Link>
              </li>
              <li className='mt-4 hover:opacity-60'>
                <Link to='/list'>Bán nhà Phường X Quận Y</Link>
              </li>
              <li className='mt-4 hover:opacity-60'>
                <Link to='/list'>Bán nhà Phường X Quận Y</Link>
              </li>
              <li className='mt-4 hover:opacity-60'>
                <Link to='/list'>Bán nhà Phường X Quận Y</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetailPage;