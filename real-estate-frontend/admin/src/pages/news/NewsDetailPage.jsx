import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from '../../components/Icons';
import Images from '../../components/Images';
import Avatar from '../../components/Avatar';
import apiRequest from '../../services/apiRequest';
import DOMPurify from 'dompurify';
import { TimeSince } from './../../utils/TimeSinceUtill';

function NewsDetailPage() {
  // const data = useLoaderData();
  const { id } = useParams();
  const [data, setData] = useState();
  const [latestNews, setLatestNews] = useState();
  const [mostViewedNews, setMostViewedNews] = useState();

  useEffect(() => {
    async function getNewsDetail() {
      const newsDetailPromise = await apiRequest(
        `/admin/news/single-news/${id}`,
      );
      setData(newsDetailPromise.data.news);
      const latestNewsPromise = await apiRequest(
        `/admin/news/single-news/${id}/latest-news`,
      );
      setLatestNews(latestNewsPromise.data.news);
      const mostViewedNewsPromise = await apiRequest(
        `/admin/news/single-news/${id}/most-viewed-news`,
      );
      setMostViewedNews(mostViewedNewsPromise.data.news);
    }
    getNewsDetail();
  }, []);

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
          <h1 className='font-semibold text-4xl'>{data?.title}</h1>
        </div>
        {/*Author Info */}
        <div className='w-full h-auto py-6 flex justify-start items-center gap-x-4 bg-white'>
          <Avatar
            src={data?.authorId?.avatar || Images.logo}
            width={45}
            height={45}
          />
          <div className='w-full h-auto text-base'>
            <span>
              Được đăng bởi <b>{data?.authorId?.name}</b>
            </span>
            <p>Cập nhập lần cuối vào ngày <TimeSince date={data?.updatedAt} /></p>
          </div>
        </div>

        {/* Content wrapper */}
        <div className='w-full h-[800px] flex flex-row justify-between relative'>
          {/* Left content */}
          <div className='w-[800px] h-auto px-3 overflow-y-scroll hide-scrollbar'>
            <article>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(data?.description),
                }}
              />
            </article>
          </div>
          {/* Right Content */}
          <div className='w-[310px] h-auto px-3 py-6 border rounded sticky top-0'>
            <h2 className='font-semibold text-base'>
              Bài viết được xem nhiều nhất
            </h2>
            {Array.isArray(mostViewedNews) && mostViewedNews.length > 0 ? (
              mostViewedNews.map((news, index) => (
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
                <div className='min-w-[260px] max-w-[260px] max-h-[150px] rounded-lg relative'>
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
                  <span className='text-xs text-slate-400'>
                    {new Date(news.createdAt).toLocaleDateString()} -{' '}
                    {news.authorId.name}
                  </span>
                  <h2 className='font-medium text-lg capitalize line-clamp-2'>
                    {news.title}
                  </h2>
                  <p
                    className='font-light text-sm text-gray-500 line-clamp-3'
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
    </div>
  );
}

export default NewsDetailPage;
