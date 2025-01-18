import React, { useEffect, useState } from 'react';
import Images from '../components/Images';
import LoaderSpinner from '../components/LoaderSpinner';
import { Link } from 'react-router-dom';
import apiRequest from '../services/apiRequest';
import { Clock } from '../components/Icons';
import { TimeSince } from '../utils/TimeSinceUtill';

function ListNewsPage() {
  const [latestNews, setLatestNews] = useState([]);
  const [mostViewed, setMostViewed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredNews, setHoveredNews] = useState(null);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      //Get latest news
      const newsResponse = await apiRequest('/news/latest-news');
      setLatestNews(newsResponse.data.news);
      const newMostViewedPromise = await apiRequest.get(
        '/news/most-viewed-news',
      );
      setMostViewed(newMostViewedPromise.data.news || []);
      setIsLoading(false);
    }
    getData();
  }, []);

  const handleMouseEnter = (news) => {
    setHoveredNews(news);
  };

  const mainNews = hoveredNews || (latestNews.length > 0 && latestNews[0]);

  return (
    <div className='w-full h-auto pt-24  flex flex-col items-center font-lexend font-normal text-sm'>
      {/* <div className='w-full h-14 bg-white flex justify-center items-center'>
        searching
      </div> */}
      <div className='w-full max-w-[1140px] h-auto'>
        {/* Title of page */}
        <div className='w-3/4 py-8 my-6 flex flex-col items-center mx-auto '>
          <h1 className='font-medium text-4xl capitalize'>
            Tin tức bất động sản mới nhất
          </h1>
          <p className='mt-4 text-lg text-center'>
            Nơi cập nhập mọi thông tin mới, đầy đủ, hấp dẫn nhất về thị trường
            bất động sản Việt Nam thông qua nguồn dữ liệu lớn về giá, nguồn cung
            - cầu và khảo sát thực tế.
          </p>
        </div>

        {/* lastest news */}
        {isLoading ? (
          <div className='w-full h-full flex justify-center items-center'>
            <LoaderSpinner />
          </div>
        ) : (
          <div className='w-full h-auto mx-auto flex flex-row gap-5 '>
            {/* Image main news */}
            {mainNews && (
              <Link to={`/news/${mainNews._id}`}>
                <div className='w-[680px] h-[360px] bg-green-300 relative'>
                  <img
                    src={mainNews.thumbnail || Images.banner}
                    alt='banner'
                    className='w-full h-full object-fill'
                  />
                  <div className='w-full h-full p-8 my-44 flex flex-col items-start bg-transparent absolute -top-14 left-0'>
                    <span className='text-gray-200'>
                      <Clock /> <TimeSince date={mainNews.createdAt} /> •{' '}
                      {mainNews.types}
                    </span>
                    <h2 className='font-semibold text-2xl text-white'>
                      {mainNews.title}
                    </h2>
                    <div className='h-[70px] overflow-hidden'>
                      <p
                        className='ql-editor text-white line-clamp-3'
                        dangerouslySetInnerHTML={{
                          __html: mainNews.description,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* List of title news */}
            <ul className='w-2/5 h-full flex flex-col overflow-y-scroll hide-scrollbar'>
              {latestNews.slice(0).map((news, index) => (
                <li
                  key={news._id}
                  className={`w-full h-auto py-[14px] hover:bg-gray-100 ${
                    index === 0 ? 'pb-[14px]' : ''
                  } ${index === latestNews.length - 2 ? 'pt-[14px]' : ''}`}
                  onMouseEnter={() => handleMouseEnter(news)}
                >
                  <Link
                    to={`/news/${news._id}`}
                    className='flex flex-col line-clamp-2 overflow-hidden'
                  >
                    <span className='flex items-center gap-2 text-black'>
                      <Clock /> <TimeSince date={news.createdAt} /> •{' '}
                      {news.types}
                    </span>
                    <span className='font-medium capitalize text-base'>
                      {news.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Other News content */}
        <div className='w-full h-auto flex flex-row gap-5 mt-6'>
          <div className='max-w-[800px] h-auto py-6 bg-white'>
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
                      className='w-full min-w-[260px] h-full rounded-lg'
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

          {/*Most viewed news */}
          <div className='w-[310px] h-[450px] px-3 py-6 border border-slate-300 rounded top-0'>
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
      </div>
    </div>
  );
}

export default ListNewsPage;
