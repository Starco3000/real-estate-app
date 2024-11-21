import React, { useContext } from 'react';
import banner from '../assets/banner-HCM-city.jpg';
import EstateCard from '../components/EstateCard';
import ProjectCard from '../components/ProjectCard';
import SliderComponent from '../components/slider/SliderComponent';
import { AuthContext } from '../contexts/AuthContext';
import HomePageSearch from '../components/search/HomePageSearch';

function HomePage() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div>
      <div className='flex flex-col h-full'>
        <div className='relative '>
          <img
            src={banner}
            alt='banner'
            className='h-[250px] lg:h-[450px] w-full object-cover lg:object-fill mt-16'
          />
          <HomePageSearch />
        </div>

        {/* Estate Recommend */}
        <div className='px-5 py-5 md:px-40 md:py-10'>
          <h1 className='font-lexend font-medium text-2xl'>
            Bất động sản dành cho bạn
          </h1>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4 md:gap-6 lg:gap-8 mt-4 mx-auto'>
            {' '}
            <EstateCard />
            <EstateCard />
            <EstateCard />
            <EstateCard />
            <EstateCard />
            <EstateCard />
            <EstateCard />
            <EstateCard />
          </div>
        </div>

        {/* Estate Project Recommend */}
        <div className='px-5 py-5 md:px-40 md:py-10 '>
          <h1 className='font-lexend font-medium text-2xl mb-3'>
            Dự án bất động sản nổi bật
          </h1>
          <SliderComponent>
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
          </SliderComponent>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
