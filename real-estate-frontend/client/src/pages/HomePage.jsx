import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { TimeSince } from '../utils/TimeSinceUtill';
import Images from '../components/Images';
import { ArrowRight, Clock } from '../components/Icons';
import EstateCard from '../components/EstateCard';
import SliderComponent from '../components/slider/SliderComponent';
import HomePageSearch from '../components/search/HomePageSearch';
import apiRequest from '../services/apiRequest';
import LoaderSpinner from '../components/LoaderSpinner';

function HomePage() {
  const [latestNews, setLatestNews] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [topPosts, setTopPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredNews, setHoveredNews] = useState(null);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      //Get latest news
      const newsResponse = await apiRequest('/news/latest-news');
      setLatestNews(newsResponse.data.news);
      //Get latest posts
      const latestPostsResponse = await apiRequest('/posts/latest-posts');
      setLatestPosts(latestPostsResponse.data.posts);
      //Get top posts
      const topPostsResponse = await apiRequest('/posts/top-provinces');
      setTopPosts(topPostsResponse.data.topProvinces);
      //Get popular posts
      const popularPostsResponse = await apiRequest('/posts/popular');
      setPopularPosts(popularPostsResponse.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  const getGridClasses = (index) => {
    switch (index) {
      case 0:
        return 'col-span-2 row-span-2';
      case 1:
        return 'col-start-3 row-span-1';
      case 2:
        return 'col-start-4 row-span-1';
      case 3:
        return 'col-start-3 row-span-1';
      case 4:
        return 'col-start-4 row-span-1';
      default:
        return 'col-span-1 row-span-1';
    }
  };

  const gridClassesMemo = useMemo(() => {
    return topPosts.map((_, index) => getGridClasses(index));
  }, [topPosts]);

  const handleMouseEnter = (news) => {
    setHoveredNews(news);
  };

  const mainNews = hoveredNews || (latestNews.length > 0 && latestNews[0]);

  return (
    <div className='font-lexend font-normal text-base'>
      <div className='flex flex-col h-full'>
        <div className='relative '>
          <img
            src={Images.banner}
            alt='banner'
            className='h-[250px] lg:h-[450px] w-full object-cover lg:object-fill mt-16'
          />
          <HomePageSearch />
        </div>

        {/* News  */}
        <div className='w-full h-auto py-10 flex flex-col items-center font-lexend font-normal text-base'>
          <div className='w-full max-w-[860px] h-auto bg-white flex flex-col items-end '>
            <Link
              to='/news'
              className='my-4 font-medium text-primary text-sm flex items-center gap-x-2 hover:text-red-600 cursor-pointer'
            >
              Xem thêm <ArrowRight />
            </Link>

            {isLoading ? (
              <div className='w-full h-full flex justify-center items-center'>
                <LoaderSpinner />
              </div>
            ) : (
              <div className='flex flex-row gap-7'>
                {/* Image main news */}
                {mainNews && (
                  <Link to={`/news/${mainNews._id}`}>
                    <div className='w-auto h-[460px] bg-white flex flex-col items-start'>
                      <img
                        src={mainNews.thumbnail || Images.banner}
                        alt='banner'
                        className='min-w-[450px] h-3/5 object-cover'
                      />
                      <h1 className='text-2xl mt-4 font-medium capitalize line-clamp-2'>
                        {mainNews.title}
                      </h1>
                      <span className='inline-flex items-center gap-2 text-[#999] '>
                        <Clock /> <TimeSince date={mainNews.createdAt} />
                      </span>
                    </div>
                  </Link>
                )}

                {/* List of title news */}
                <ul className='w-full h-full flex flex-col '>
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
                        className='line-clamp-2 overflow-hidden'
                      >
                        {news.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Estate Recommend */}
        <div className='px-5 py-5 md:px-40 md:py-10'>
          <h1 className='font-medium text-2xl'>Bất động sản dành cho bạn</h1>
          {isLoading ? (
            <div className='w-full h-full flex justify-center items-center'>
              <LoaderSpinner />
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4 md:gap-6 lg:gap-8 mt-4 mx-auto'>
              {latestPosts.map((post) => (
                <EstateCard key={post._id} data={post} />
              ))}
            </div>
          )}
        </div>

        {/* Estate Project Recommend */}
        <div className='px-5 py-5 md:px-40 '>
          <h1 className='font-medium text-2xl mb-3'>
            Dự án bất động sản nổi bật
          </h1>
          <SliderComponent>
            {popularPosts.map((post) => (
              <EstateCard key={post._id} data={post} />
            ))}
          </SliderComponent>
        </div>

        {/* Estate by area */}
        <div className='w-full h-auto py-10 px-5 md:px-40'>
          <h1 className='font-medium text-2xl mb-3'>
            Bất động sản theo khu vực
          </h1>
          {isLoading ? (
            <div className='w-full h-full flex justify-center items-center'>
              <LoaderSpinner />
            </div>
          ) : (
            <div className='w-full h-[400px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-6 md:grid-rows-4 lg:grid-rows-2 gap-7 mt-4'>
              {topPosts.map((post, index) => (
                <Link
                  key={index}
                  to={`/list?province=${post._id[1]}`}
                  className={`relative ${gridClassesMemo[index]} cursor-pointer`}
                >
                  <div className='p-6 absolute text-white font-medium hover:underline'>
                    <h3 className={`text-${index === 0 ? '[18px]' : 'base'}`}>
                      {post._id[1]}
                    </h3>
                    <span className={`text-${index === 0 ? 'base' : 'sm'}`}>
                      {post.totalPosts} bài tin
                    </span>
                  </div>
                  <img
                    src={Images.banner}
                    alt=''
                    className='w-full h-full object-cover rounded-md'
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
