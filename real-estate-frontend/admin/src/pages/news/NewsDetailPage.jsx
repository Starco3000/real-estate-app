import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { ArrowLeft } from '../../components/Icons';
import Images from '../../components/Images';
import Avatar from '../../components/Avatar';

function NewsDetailPage() {
  const data = useLoaderData();
  console.log('Data:', data.news);
  const newsInfo = data.news;
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className='w-full h-auto bg-white font-lexend font-normal text-sm flex flex-col items-center overflow-hidden'>
      {/* Back button */}
      <div className='w-full h-auto pt-10'>
        <button
          className='mb-6 ml-20 text-lg flex items-center gap-x-3 '
          onClick={handleBack}
        >
          <ArrowLeft /> Back
        </button>
      </div>

      {/* Content News */}
      <main className='min-w-[1360px] h-auto px-40 bg-white'>
        {/* TITLE OF NEWS */}
        <div className='w-full h-auto bg-white'>
          <h1 className='font-semibold text-4xl'>{newsInfo.title}</h1>
        </div>
        {/*Author Info */}
        <div className='w-full h-auto py-6 flex justify-start items-center gap-x-4 bg-white'>
          <Avatar src={Images.logo} width={45} height={45} />
          <div className='w-full h-auto text-base'>
            <span>
              Được đăng bởi <b>Admin</b>
            </span>
            <p>Cập nhập lần cuối vào ngày 10/10/2021</p>
          </div>
        </div>

        {/* Content wrapper */}
        <div className='w-full h-[800px] flex flex-row justify-between relative'>
          {/* Left content */}
          <div className='w-[800px] h-auto px-3 overflow-y-scroll hide-scrollbar'>
            <article>
              {/* <figure>
                <img
                  src={newsInfo.thumbnail}
                  alt='thumnail'
                  className='w-full'
                />
                <figcaption className='italic text-gray-500'>
                  Thị trường đất nền Bà Rịa Vũng Tàu ghi nhận sự sôi nổi thời
                  điểm cuối năm khi cả nguồn cung mới và giá bán đều có sự tăng
                  trưởng. Ảnh: Batdongsan.com.vn
                </figcaption>
              </figure> */}
              <div>
                <p
                  dangerouslySetInnerHTML={{ __html: data.news.description }}
                />
              </div>
            </article>
          </div>
          {/* Right Content */}
          <div className='w-[310px] h-auto px-3 py-6 border rounded sticky top-0'>
            <h2 className='font-semibold text-base'>
              Bài viết được xem nhiều nhất
            </h2>
            <div className='w-full h-auto pt-5 pb-4 flex items-center gap-x-3'>
              <div className='w-[40px] h-[34px] bg-amber-800 font-semibold text-white rounded-full flex justify-center items-center'>
                1
              </div>
              <span className='w-full line-clamp-2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam, illo. Iste vero tempora maxime alias tempore velit
                voluptatum fuga quasi!
              </span>
            </div>
            <div className='w-full h-auto pt-5 pb-4 flex items-center gap-x-4'>
              <div className='w-[40px] h-[34px] bg-amber-800 font-semibold text-white rounded-full flex justify-center items-center'>
                2
              </div>
              <span className='w-full line-clamp-2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam, illo. Iste vero tempora maxime alias tempore velit
                voluptatum fuga quasi!
              </span>
            </div>
            <div className='w-full h-auto pt-5 pb-4 flex items-center gap-x-4'>
              <div className='w-[40px] h-[34px] bg-amber-800 font-semibold text-white rounded-full flex justify-center items-center'>
                3
              </div>
              <span className='w-full line-clamp-2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam, illo. Iste vero tempora maxime alias tempore velit
                voluptatum fuga quasi!
              </span>
            </div>
            <div className='w-full h-auto pt-5 pb-4 flex items-center gap-x-4'>
              <div className='w-[40px] h-[34px] bg-amber-800 font-semibold text-white rounded-full flex justify-center items-center'>
                4
              </div>
              <span className='w-full line-clamp-2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam, illo. Iste vero tempora maxime alias tempore velit
                voluptatum fuga quasi!
              </span>
            </div>
            <div className='w-full h-auto pt-5 pb-4 flex items-center gap-x-4'>
              <div className='w-[40px] h-[34px] bg-amber-800 font-semibold text-white rounded-full flex justify-center items-center'>
                5
              </div>
              <span className='w-full line-clamp-2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam, illo. Iste vero tempora maxime alias tempore velit
                voluptatum fuga quasi!
              </span>
            </div>
          </div>
        </div>

        {/* Related real estate  */}
        <div className='max-w-[800px] h-auto py-6 bg-white'>
          <h1 className='font-medium text-2xl mb-5'>Bài viết khác</h1>
          <div className='min-w-[756px] h-auto mb-6 pb-4 border-b bor bg-white flex flex-row gap-x-5'>
            <div className='max-w-[260px] max-h-[150px] rounded-lg relative'>
              <span className='w-auto h-auto py-0.5 px-2.5 mt-3 bg-slate-600 rounded-r uppercase text-xs text-white absolute top-0 left-0'>
                Tin tức
              </span>
              <img
                src={Images.dashboard}
                alt='thumnal_news'
                className='w-full h-full rounded-lg'
              />
            </div>
            <div className='flex flex-col justify-between items-start'>
              <span className='text-xs text-slate-300'>
                27/12/2024 17:00 - Admin
              </span>
              <h2 className='font-medium text-lg capitalize line-clamp-2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                perspiciatis doloribus repudiandae sequi quis dolorum ad et
                omnis asperiores tenetur.
              </h2>
              <p className='text-sm text-black line-clamp-3'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem
                temporibus amet, tempora exercitationem ea dolores hic beatae
                sapiente libero ipsam labore consectetur porro, debitis at nulla
                qui cumque iusto ipsum.
              </p>
            </div>
          </div>

          <div className='min-w-[756px] h-auto mb-6 pb-4 border-b bor bg-white flex flex-row gap-x-5'>
            <div className='max-w-[260px] max-h-[150px] rounded-lg relative'>
              <span className='w-auto h-auto py-0.5 px-2.5 mt-3 bg-slate-600 rounded-r uppercase text-xs text-white absolute top-0 left-0'>
                Tin tức
              </span>
              <img
                src={Images.dashboard}
                alt='thumnal_news'
                className='w-full h-full rounded-lg'
              />
            </div>
            <div className='flex flex-col justify-between items-start'>
              <span className='text-xs text-slate-300'>
                27/12/2024 17:00 - Admin
              </span>
              <h2 className='font-medium text-lg capitalize line-clamp-2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                perspiciatis doloribus repudiandae sequi quis dolorum ad et
                omnis asperiores tenetur.
              </h2>
              <p className='text-sm text-black line-clamp-3'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem
                temporibus amet, tempora exercitationem ea dolores hic beatae
                sapiente libero ipsam labore consectetur porro, debitis at nulla
                qui cumque iusto ipsum.
              </p>
            </div>
          </div>
          <div className='min-w-[756px] h-auto mb-6 pb-4 border-b bor bg-white flex flex-row gap-x-5'>
            <div className='max-w-[260px] max-h-[150px] rounded-lg relative'>
              <span className='w-auto h-auto py-0.5 px-2.5 mt-3 bg-slate-600 rounded-r uppercase text-xs text-white absolute top-0 left-0'>
                Tin tức
              </span>
              <img
                src={Images.dashboard}
                alt='thumnal_news'
                className='w-full h-full rounded-lg'
              />
            </div>
            <div className='flex flex-col justify-between items-start'>
              <span className='text-xs text-slate-300'>
                27/12/2024 17:00 - Admin
              </span>
              <h2 className='font-medium text-lg capitalize line-clamp-2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                perspiciatis doloribus repudiandae sequi quis dolorum ad et
                omnis asperiores tenetur.
              </h2>
              <p className='text-sm text-black line-clamp-3'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem
                temporibus amet, tempora exercitationem ea dolores hic beatae
                sapiente libero ipsam labore consectetur porro, debitis at nulla
                qui cumque iusto ipsum.
              </p>
            </div>
          </div>
          <div className='min-w-[756px] h-auto mb-6 pb-4 border-b bor bg-white flex flex-row gap-x-5'>
            <div className='max-w-[260px] max-h-[150px] rounded-lg relative'>
              <span className='w-auto h-auto py-0.5 px-2.5 mt-3 bg-slate-600 rounded-r uppercase text-xs text-white absolute top-0 left-0'>
                Tin tức
              </span>
              <img
                src={Images.dashboard}
                alt='thumnal_news'
                className='w-full h-full rounded-lg'
              />
            </div>
            <div className='flex flex-col justify-between items-start'>
              <span className='text-xs text-slate-300'>
                27/12/2024 17:00 - Admin
              </span>
              <h2 className='font-medium text-lg capitalize line-clamp-2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                perspiciatis doloribus repudiandae sequi quis dolorum ad et
                omnis asperiores tenetur.
              </h2>
              <p className='text-sm text-black line-clamp-3'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem
                temporibus amet, tempora exercitationem ea dolores hic beatae
                sapiente libero ipsam labore consectetur porro, debitis at nulla
                qui cumque iusto ipsum.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NewsDetailPage;
