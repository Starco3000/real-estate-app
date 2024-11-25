import React from 'react';
import { IoMdHeartEmpty } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Avatar from '../components/Avatar';
import noavatar from '../assets/noavatar.jpg';

//Image Example
import house1 from '../assets/house1.png';
import house2 from '../assets/house2.png';
import house3 from '../assets/house3.png';
import SliderInPost from '../components/Slider/SliderInPost';

const images = [house1, house2, house3];

function PostDetailPage() {
  return (
    <div className='w-full h-auto flex flex-col md:flex-row justify-center items-start md:gap-x-8 font-lexend font-normal text-sm pt-10 md:pt-32'>
      {/* Left content */}
      <div className='w-full max-w-[845px] bg-white md:mb-10'>
        {/* Image Estate */}
        <div className='w-full md:h-[580px]'>
          <SliderInPost images={images} />
        </div>

        {/* Breadcrumb */}
        <div className='w-full h-[30px] bg-yellow-400 mt-20 md:mt-4'>breadcrumb</div>

        {/* Info Estate */}
        <div className='px-3 md:px-0'>
          <h1 className='font-medium text-lg md:text-2xl line-clamp-2 my-2'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet harum
            voluptates possimus!
          </h1>
  
          <div className='my-4'>
            <span>address</span>
          </div>
  
          <div className='flex justify-between mt-2'>
            <div className='flex gap-x-20'>
              <div className='flex flex-col gap-y-2'>
                <span className='opacity-40'>Mức giá</span>
                <span className='font-semibold text-base text-primary'>
                  Thỏa thuận
                </span>
              </div>
              <div className='flex flex-col gap-y-2'>
                <span className='opacity-40'>Diện tích</span>
                <span className='font-semibold text-base text-primary'>
                  100m2
                </span>
              </div>
            </div>
            <div className='flex items-center'>
              <Link
                to='/favorite'
                className='w-7 h-7 border-[1px] border-black flex justify-center items-center rounded cursor-pointer'
              >
                <IoMdHeartEmpty className='text-xl text-black' />
              </Link>
            </div>
          </div>
  
          {/* Description Estate */}
          <h2 className='font-medium text-lg mt-10'>Thông tin mô tả</h2>
          <p className='mt-4'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
            recusandae culpa perferendis aut similique eos beatae temporibus, odio
            commodi. Saepe in mollitia aliquid voluptas nesciunt. Repellendus hic
            alias, suscipit natus placeat ex. Veritatis ab repudiandae voluptates
            illum, officia nostrum vitae qui eveniet maiores molestiae asperiores
            incidunt voluptatum soluta! Dolores autem fugiat a ipsa itaque nihil
            vero doloribus voluptatem, laboriosam sint architecto quam eum
            excepturi aut quasi adipisci odit nemo, earum eligendi, harum dolorem
            necessitatibus culpa perspiciatis odio? Laboriosam officia sint magni
            mollitia doloribus harum facilis! Consectetur consequatur
            exercitationem soluta delectus cupiditate quo architecto! Dolor
            exercitationem rem, rerum corrupti ullam sequi.
          </p>
  
          {/* Special */}
          <h2 className='font-medium text-lg mt-10'>Đặc điểm bất động sản</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-40 gap-y-5 md:gap-y-2 mt-2'>
            <div className='flex justify-between border-b-[1px] border-gray-200'>
              <span>Diện tích</span>
              <span className='text-primary font-bold'>100m2</span>
            </div>
            <div className='flex justify-between border-b-[1px] border-gray-200'>
              <span>Mức giá</span>
              <span className='text-primary font-bold'>3 tỷ</span>
            </div>
            <div className='flex justify-between border-b-[1px] border-gray-200'>
              <span>Tình trạng pháp lý</span>
              <span className='text-primary font-bold'>Sổ hồng/sổ đỏ</span>
            </div>
            <div className='flex justify-between border-b-[1px] border-gray-200'>
              <span>Hướng nhà</span>
              <span className='text-primary font-bold'>Tây</span>
            </div>
            <div className='flex justify-between border-b-[1px] border-gray-200'>
              <span>Số phòng ngủ</span>
              <span className='text-primary font-bold'>3</span>
            </div>
            <div className='flex justify-between border-b-[1px] border-gray-200'>
              <span>Số phòng vệ sinh</span>
              <span className='text-primary font-bold'>2</span>
            </div>
          </div>
  
          {/* Map */}
          <h2 className='font-medium text-lg mt-10'>Vị trí bất động sản</h2>
          <div className='w-full h-96 bg-green-300 mt-4'>map</div>
  
          {/* Post Infomation */}
          <div className='md:my-10 py-5 grid grid-cols-2 grid-rows-2 md:grid-cols-3 md:grid-rows-1 gap-10 items-center border-y-[1px] border-gray-200'>
            <div className='flex flex-col'>
              <span className='font-medium text-primary pb-1'>Ngày đăng</span>
              <span>03/11/2024</span>
            </div>
            <div className='flex flex-col'>
              <span className='font-medium text-primary pb-1'>Loại bài tin</span>
              <span>Bán</span>
            </div>
            <div className='flex flex-col'>
              <span className='font-medium text-primary pb-1'>Mã tin</span>
              <span>XXXXXXXXXXX</span>
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
              <Avatar src={noavatar} width={65} height={65} />
              <span className='my-3 font-medium text-base text-primary'>
                Tên người dùng
              </span>
            </div>
            <div className='w-full row-start-2 '>
              <button className='w-full h-12 bg-primary font-medium text-white rounded-md mb-2'>
                XXX-YYY-ZZZZ
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
  );
}

export default PostDetailPage;
