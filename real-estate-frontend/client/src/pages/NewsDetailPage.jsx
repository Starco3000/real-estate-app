// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { ArrowLeft } from '../components/Icons';
// import Images from '../components/Images';
// import Avatar from '../components/Avatar';
// import LoaderSpinner from './../components/LoaderSpinner';
// import apiRequest from '../services/apiRequest';
// import { TimeSince } from '../utils/TimeSinceUtill';

// function NewsDetailPage() {
//   const { id } = useParams();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function getNewsDetail() {
//       setLoading(true);
//       try {
//         const response = await apiRequest.get(`/news/${id}`);
//         setData(response.data);
//       } catch (error) {
//         console.error('Failed to fetch news detail:', error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     getNewsDetail();
//   }, [id]);

//   const newsInfo = data?.data?.news;
//   console.log('Data:', newsInfo);

//   const navigate = useNavigate();
//   const handleBack = () => {
//     navigate(-1);
//   };
//   return (
//     <div className='w-full h-auto bg-white font-lexend font-normal text-sm flex flex-col items-center overflow-hidden'>
//       {/* Back button */}
//       <div className='w-full h-auto pt-10'>
//         <button
//           className='mb-6 ml-20 text-lg flex items-center gap-x-3 '
//           onClick={handleBack}
//         >
//           <ArrowLeft /> Back
//         </button>
//       </div>

//       {loading ? (
//         <div className='w-full h-[800px] flex justify-center items-center'>
//           <LoaderSpinner />
//         </div>
//       ) : (
//         <main className='min-w-[1360px] h-auto px-40 py-7 bg-white'>
//           {/* TITLE OF NEWS */}
//           <div className='w-full h-auto bg-white'>
//             <h1 className='font-semibold text-4xl'>{newsInfo.title}</h1>
//           </div>
//           {/*Author Info */}
//           <div className='w-full h-auto py-6 flex justify-start items-center gap-x-4 bg-white'>
//             <Avatar src={Images.logo1} width={45} height={45} />
//             <div className='w-full h-auto text-base'>
//               <span>
//                 Được đăng bởi <b>{newsInfo.authorId.name}</b>
//               </span>
//               <p>
//                 Cập nhập lần cuối vào ngày{' '}
//                 <TimeSince data={newsInfo.updatedAt} />
//               </p>
//             </div>
//           </div>

//           {/* Content wrapper */}
//           <div className='w-full h-[800px] flex flex-row justify-between relative'>
//             {/* Left content */}
//             <div className='w-[800px] h-auto px-3 overflow-y-scroll hide-scrollbar'>
//               <article>
//                 <div>
//                   <p
//                     dangerouslySetInnerHTML={{ __html: newsInfo?.description }}
//                   />
//                 </div>
//               </article>
//             </div>
//             {/* Right Content */}
//             <div className='w-[310px] h-auto px-3 py-6 border rounded sticky top-0'>
//               <h2 className='font-semibold text-base'>
//                 Bài viết được xem nhiều nhất
//               </h2>
//               <div className='w-full h-auto pt-5 pb-4 flex items-center gap-x-3'>
//                 <div className='w-[40px] h-[34px] bg-amber-800 font-semibold text-white rounded-full flex justify-center items-center'>
//                   1
//                 </div>
//                 <span className='w-full line-clamp-2'>
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                   Laboriosam, illo. Iste vero tempora maxime alias tempore velit
//                   voluptatum fuga quasi!
//                 </span>
//               </div>
//               <div className='w-full h-auto pt-5 pb-4 flex items-center gap-x-4'>
//                 <div className='w-[40px] h-[34px] bg-amber-800 font-semibold text-white rounded-full flex justify-center items-center'>
//                   2
//                 </div>
//                 <span className='w-full line-clamp-2'>
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                   Laboriosam, illo. Iste vero tempora maxime alias tempore velit
//                   voluptatum fuga quasi!
//                 </span>
//               </div>
//               <div className='w-full h-auto pt-5 pb-4 flex items-center gap-x-4'>
//                 <div className='w-[40px] h-[34px] bg-amber-800 font-semibold text-white rounded-full flex justify-center items-center'>
//                   3
//                 </div>
//                 <span className='w-full line-clamp-2'>
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                   Laboriosam, illo. Iste vero tempora maxime alias tempore velit
//                   voluptatum fuga quasi!
//                 </span>
//               </div>
//               <div className='w-full h-auto pt-5 pb-4 flex items-center gap-x-4'>
//                 <div className='w-[40px] h-[34px] bg-amber-800 font-semibold text-white rounded-full flex justify-center items-center'>
//                   4
//                 </div>
//                 <span className='w-full line-clamp-2'>
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                   Laboriosam, illo. Iste vero tempora maxime alias tempore velit
//                   voluptatum fuga quasi!
//                 </span>
//               </div>
//               <div className='w-full h-auto pt-5 pb-4 flex items-center gap-x-4'>
//                 <div className='w-[40px] h-[34px] bg-amber-800 font-semibold text-white rounded-full flex justify-center items-center'>
//                   5
//                 </div>
//                 <span className='w-full line-clamp-2'>
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                   Laboriosam, illo. Iste vero tempora maxime alias tempore velit
//                   voluptatum fuga quasi!
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Related real estate  */}
//           <div className='max-w-[800px] h-auto py-6 bg-white'>
//             <h1 className='font-medium text-2xl mb-5'>Bài viết khác</h1>
//             <div className='min-w-[756px] h-auto mb-6 pb-4 border-b bor bg-white flex flex-row gap-x-5'>
//               <div className='max-w-[260px] max-h-[150px] rounded-lg relative'>
//                 <span className='w-auto h-auto py-0.5 px-2.5 mt-3 bg-slate-600 rounded-r uppercase text-xs text-white absolute top-0 left-0'>
//                   Tin tức
//                 </span>
//                 <img
//                   src={Images.wallpaper}
//                   alt='thumnal_news'
//                   className='w-full h-full rounded-lg'
//                 />
//               </div>
//               <div className='flex flex-col justify-between items-start'>
//                 <span className='text-xs text-slate-300'>
//                   27/12/2024 17:00 - Admin
//                 </span>
//                 <h2 className='font-medium text-lg capitalize line-clamp-2'>
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
//                   perspiciatis doloribus repudiandae sequi quis dolorum ad et
//                   omnis asperiores tenetur.
//                 </h2>
//                 <p className='text-sm text-black line-clamp-3'>
//                   Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//                   Autem temporibus amet, tempora exercitationem ea dolores hic
//                   beatae sapiente libero ipsam labore consectetur porro, debitis
//                   at nulla qui cumque iusto ipsum.
//                 </p>
//               </div>
//             </div>

//             <div className='min-w-[756px] h-auto mb-6 pb-4 border-b bor bg-white flex flex-row gap-x-5'>
//               <div className='max-w-[260px] max-h-[150px] rounded-lg relative'>
//                 <span className='w-auto h-auto py-0.5 px-2.5 mt-3 bg-slate-600 rounded-r uppercase text-xs text-white absolute top-0 left-0'>
//                   Tin tức
//                 </span>
//                 <img
//                   src={Images.wallpaper}
//                   alt='thumnal_news'
//                   className='w-full h-full rounded-lg'
//                 />
//               </div>
//               <div className='flex flex-col justify-between items-start'>
//                 <span className='text-xs text-slate-300'>
//                   27/12/2024 17:00 - Admin
//                 </span>
//                 <h2 className='font-medium text-lg capitalize line-clamp-2'>
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
//                   perspiciatis doloribus repudiandae sequi quis dolorum ad et
//                   omnis asperiores tenetur.
//                 </h2>
//                 <p className='text-sm text-black line-clamp-3'>
//                   Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//                   Autem temporibus amet, tempora exercitationem ea dolores hic
//                   beatae sapiente libero ipsam labore consectetur porro, debitis
//                   at nulla qui cumque iusto ipsum.
//                 </p>
//               </div>
//             </div>
//             <div className='min-w-[756px] h-auto mb-6 pb-4 border-b bor bg-white flex flex-row gap-x-5'>
//               <div className='max-w-[260px] max-h-[150px] rounded-lg relative'>
//                 <span className='w-auto h-auto py-0.5 px-2.5 mt-3 bg-slate-600 rounded-r uppercase text-xs text-white absolute top-0 left-0'>
//                   Tin tức
//                 </span>
//                 <img
//                   src={Images.wallpaper}
//                   alt='thumnal_news'
//                   className='w-full h-full rounded-lg'
//                 />
//               </div>
//               <div className='flex flex-col justify-between items-start'>
//                 <span className='text-xs text-slate-300'>
//                   27/12/2024 17:00 - Admin
//                 </span>
//                 <h2 className='font-medium text-lg capitalize line-clamp-2'>
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
//                   perspiciatis doloribus repudiandae sequi quis dolorum ad et
//                   omnis asperiores tenetur.
//                 </h2>
//                 <p className='text-sm text-black line-clamp-3'>
//                   Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//                   Autem temporibus amet, tempora exercitationem ea dolores hic
//                   beatae sapiente libero ipsam labore consectetur porro, debitis
//                   at nulla qui cumque iusto ipsum.
//                 </p>
//               </div>
//             </div>
//             <div className='min-w-[756px] h-auto mb-6 pb-4 border-b bor bg-white flex flex-row gap-x-5'>
//               <div className='max-w-[260px] max-h-[150px] rounded-lg relative'>
//                 <span className='w-auto h-auto py-0.5 px-2.5 mt-3 bg-slate-600 rounded-r uppercase text-xs text-white absolute top-0 left-0'>
//                   Tin tức
//                 </span>
//                 <img
//                   src={Images.wallpaper}
//                   alt='thumnal_news'
//                   className='w-full h-full rounded-lg'
//                 />
//               </div>
//               <div className='flex flex-col justify-between items-start'>
//                 <span className='text-xs text-slate-300'>
//                   27/12/2024 17:00 - Admin
//                 </span>
//                 <h2 className='font-medium text-lg capitalize line-clamp-2'>
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
//                   perspiciatis doloribus repudiandae sequi quis dolorum ad et
//                   omnis asperiores tenetur.
//                 </h2>
//                 <p className='text-sm text-black line-clamp-3'>
//                   Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//                   Autem temporibus amet, tempora exercitationem ea dolores hic
//                   beatae sapiente libero ipsam labore consectetur porro, debitis
//                   at nulla qui cumque iusto ipsum.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </main>
//       )}
//     </div>
//   );
// }

// export default NewsDetailPage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Images from '../components/Images';
import Avatar from '../components/Avatar';
import LoaderSpinner from './../components/LoaderSpinner';
import apiRequest from '../services/apiRequest';
import { TimeSince } from '../utils/TimeSinceUtill';

function NewsDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [mostViewed, setMostViewed] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getNewsDetail() {
      setLoading(true);
      try {
        const newsDetailPromise = await apiRequest.get(`/news/${id}`);
        setData(newsDetailPromise.data);
        const newMostViewedPromise = await apiRequest.get(
          '/news/most-viewed-news',
        );
        setMostViewed(newMostViewedPromise.data.news || []);
        const latestNewsPromise = await apiRequest.get('/news/latest-news');
        setLatestNews(latestNewsPromise.data.news || []);
      } catch (error) {
        console.error('Failed to fetch news detail:', error);
      } finally {
        setLoading(false);
      }
    }
    getNewsDetail();
  }, [id]);

  if (loading) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <LoaderSpinner />
      </div>
    );
  }

  if (!data) return 'No news available';

  const { title, createdAt, authorId, description } = data.news;

  return (
    <main className='min-w-[1360px] h-auto px-40 pt-32 font-lexend font-normal text-sm bg-white'>
      {/* TITLE OF NEWS */}
      <div className='w-full h-auto'>
        <h1 className='font-semibold text-4xl'>
          {title || 'Tieu de bai viet'}
        </h1>
      </div>
      {/* Author Info */}
      <div className='w-full h-auto py-6 flex justify-start items-center gap-x-4 bg-white'>
        <Avatar src={Images.logo} width={45} height={45} />
        <div className='w-full h-auto text-base'>
          <span>
            Được đăng bởi <b>{authorId.name}</b>
          </span>
          <p>
            Cập nhập lần cuối vào ngày <TimeSince date={createdAt} />
          </p>
        </div>
      </div>

      {/* Content wrapper */}
      <div className='w-full h-[800px] flex flex-row justify-between relative'>
        {/* Left content */}
        <div className='w-[800px] h-auto px-3 overflow-y-scroll hide-scrollbar'>
          <article>
            <div>
              <p dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          </article>
        </div>
        {/* Right Content */}
        <div className='w-[310px] h-auto px-3 py-6 border rounded sticky top-0'>
          <h2 className='font-semibold text-base'>
            Bài viết được xem nhiều nhất
          </h2>
          {Array.isArray(mostViewed) && mostViewed.length > 0 ? (
            mostViewed.map((news, index) => (
              <div
                key={news._id}
                className='w-full h-auto pt-5 pb-4 flex items-center gap-x-3'
              >
                <div className='w-[40px] h-[34px] bg-amber-800 font-semibold text-white rounded-full flex justify-center items-center'>
                  {index + 1}
                </div>
                <span className='w-full line-clamp-2'>{news.title}</span>
              </div>
            ))
          ) : (
            <p>No most viewed news available</p>
          )}
        </div>
      </div>

      {/* Related real estate  */}
      <div className='max-w-[800px] h-auto py-6 bg-white'>
        <h1 className='font-medium text-2xl mb-5'>Bài viết khác</h1>
        {Array.isArray(latestNews) && latestNews.length > 0 ? (
          latestNews.map((news) => (
            <div
              key={news._id}
              className='min-w-[756px] h-auto mb-6 pb-4 border-b bor bg-white flex flex-row gap-x-5'
            >
              <div className='max-w-[260px] max-h-[150px] rounded-lg relative'>
                <span className='w-auto h-auto py-0.5 px-2.5 mt-3 bg-slate-600 rounded-r uppercase text-xs text-white absolute top-0 left-0'>
                  Tin tức
                </span>
                <img
                  src={news.thumbnail || Images.wallpaper}
                  alt='thumbnail_news'
                  className='w-full h-full rounded-lg'
                />
              </div>
              <div className='flex flex-col justify-start items-start gap-2'>
                <span className='text-xs text-slate-300'>
                  {new Date(news.createdAt).toLocaleDateString()} -{' '}
                  {news.authorId.name}
                </span>
                <h2 className='font-medium text-lg capitalize line-clamp-2'>
                  {news.title}
                </h2>
                <p
                  className='text-sm text-black line-clamp-3'
                  dangerouslySetInnerHTML={{ __html: news?.description }}
                />
              </div>
            </div>
          ))
        ) : (
          <p>No latest news available</p>
        )}
      </div>
    </main>
  );
}

export default NewsDetailPage;
