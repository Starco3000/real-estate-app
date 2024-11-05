import React, { useContext } from 'react';
import banner from '../assets/background.jpg';
import SearchBar from '../components/SearchBar';
import EstateCard from '../components/EstateCard';
import ProjectCard from '../components/ProjectCard';
import SliderComponent from '../components/slider/SliderComponent';
import Footer from '../components/Footer';
import { AuthContext } from '../contexts/AuthContext';

function HomePage() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div>
      <div className='flex flex-col h-full'>
        <div className=''>
          <img
            src={banner}
            alt='banner'
            className='max-h-[400px] w-full mt-24 object-fill'
          />
          <SearchBar />
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
