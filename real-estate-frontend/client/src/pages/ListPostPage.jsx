// import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
// import {
//   FaChevronLeft,
//   FaChevronRight,
//   FaRegMap,
//   FaSyncAlt,
// } from 'react-icons/fa';
// import PostCardList from '../components/PostCardList';
// import OtherEstate from '../components/OtherEstate';
// import { useLoaderData, Await, useSearchParams } from 'react-router-dom';
// import ListPostSearch from '../components/search/ListPostSearch';
// import MapWithMarkers from '../components/map/MapWithMarkers';
// import { provinceCoordinates } from '../services/data';

// function ListPostPage() {
//   const data = useLoaderData();
//   const totalPages = data ? data.totalPages : 1;
//   const [isOpenMap, setIsOpenMap] = useState(false);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [initialPosition, setInitialPosition] = useState([10.7769, 106.7009]); // Default to HCM
//   const topRef = useRef(null);

//   const currentPage = useMemo(
//     () => parseInt(searchParams.get('page') || '1', 10),
//     [searchParams],
//   );
//   const searchParamsObject = useMemo(
//     () => ({
//       status: searchParams.get('status') || '',
//       address: searchParams.get('address') || '',
//       province: searchParams.get('province') || '',
//       district: searchParams.get('district') || '',
//       ward: searchParams.get('ward') || '',
//       type: searchParams.get('type') || '',
//       bedroom: searchParams.get('bedroom') || '',
//       direction: searchParams.get('direction') || '',
//       minSize: searchParams.get('minSize') || '',
//       maxSize: searchParams.get('maxSize') || '',
//       minPrice: searchParams.get('minPrice') || '',
//       maxPrice: searchParams.get('maxPrice') || '',
//       priceNegotiable: searchParams.get('priceNegotiable') || '',
//       page: currentPage,
//     }),
//     [searchParams, currentPage],
//   );

//   useEffect(() => {
//     // console.log('Search Params:', searchParamsObject);
//     setSearchParams(searchParamsObject);
//     if (topRef.current) {
//       topRef.current.scrollIntoView({ behavior: 'smooth' });
//     }

//     const province = searchParams.get('province');
//     if (province && provinceCoordinates[province]) {
//       setInitialPosition(provinceCoordinates[province]);
//     } else {
//       setInitialPosition([10.7769, 106.7009]);
//     }
//   }, [searchParamsObject, setSearchParams, searchParams]);

//   const handlePageChange = (page) => {
//     setSearchParams({ ...searchParamsObject, page });
//   };

//   const handleSwitchMap = () => {
//     setIsOpenMap((prevState) => !prevState);
//   };

//   const handleReset = () => {
//     const resetParams = {
//       status: searchParams.get('status') || '',
//       province: searchParams.get('province') || '',
//       district: searchParams.get('district') || '',
//       ward: searchParams.get('ward') || '',
//       type: searchParams.get('type') || '',
//       page: 1, // Reset page to 1
//     };
//     setSearchParams(resetParams);
//   };

//   return (
//     <div
//       className={`w-full pb-2 pt-28 px-3 flex items-center font-lexend font-normal text-sm  ${
//         isOpenMap ? 'flex-row gap-x-3 h-[100vh]' : 'flex-col h-auto'
//       } `}
//       ref={topRef}
//     >
//       <div className={`${isOpenMap ? 'w-1/2 h-full overflow-y-scroll' : ''}`}>
//         <div className='w-full h-auto px-1 flex justify-center items-center'>
//           <ListPostSearch isOpenMap={isOpenMap} />
//         </div>
//         <div className='w-full mt-4 flex justify-center items-start gap-x-8'>
//           {/* left content */}
//           <div className='w-full max-w-[694px] bg-inherit mb-10 flex flex-col gap-y-4'>
//             <div className='flex justify-between items-center'>
//               <button
//                 className={`w-auto h-auto p-3 border border-black rounded-md flex items-center gap-x-2 hover:bg-primary hover:text-white transition-all duration-300 ease-in-out ${
//                   isOpenMap && 'bg-primary text-white'
//                 } `}
//                 onClick={handleSwitchMap}
//               >
//                 <FaRegMap /> Bản đồ
//               </button>
//               <button
//                 className='w-auto h-auto p-3 border border-black rounded-md bg-transparent flex items-center gap-x-2 hover:bg-primary hover:text-white transition-all duration-300 ease-in-out'
//                 onClick={handleReset}
//               >
//                 <FaSyncAlt />
//                 Đặt lại tìm kiếm
//               </button>
//             </div>
//             <Suspense fallback={<p>Loading...</p>}>
//               <Await resolve={data} errorElement={<p>Error loading posts!</p>}>
//                 {(data) => {
//                   const posts = data.postResponse.posts;
//                   return Array.isArray(posts) && posts.length > 0 ? (
//                     posts.map((post) => (
//                       <PostCardList key={post._id} data={post} />
//                     ))
//                   ) : (
//                     <p>No posts available</p>
//                   );
//                 }}
//               </Await>
//             </Suspense>
//             {/* Pagination */}
//             <div className='w-full h-9 mb-6 flex justify-center gap-x-1'>
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className='w-9 h-auto flex justify-center items-center text-base text-white rounded bg-primary '
//               >
//                 <FaChevronLeft />
//               </button>
//               {Array.from({ length: totalPages }, (_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handlePageChange(index + 1)}
//                   className={`w-9 h-full border-[0.5px] border-primary ${
//                     currentPage === index + 1 ? 'active' : ''
//                   }`}
//                 >
//                   {index + 1}
//                 </button>
//               ))}
//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className='w-9 h-auto flex justify-center items-center text-base text-white rounded bg-primary '
//               >
//                 <FaChevronRight />
//               </button>
//             </div>
//           </div>
//           {/* right content */}
//           <div
//             className={`w-full h-[500px] max-w-[230px] mb-10 ${
//               isOpenMap ? 'hidden' : 'block'
//             }`}
//           >
//             {/* Related Post */}
//             <OtherEstate />
//           </div>
//         </div>
//       </div>
//       {isOpenMap && (
//         <div className='w-1/2 h-full sticky top-0 bottom-0 -right-1/2 bg-green-300'>
//           <MapWithMarkers
//             posts={data.postResponse.posts}
//             initialPosition={initialPosition}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default ListPostPage;

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaRegMap,
  FaSyncAlt,
} from 'react-icons/fa';
import PostCardList from '../components/PostCardList';
import OtherEstate from '../components/OtherEstate';
import { useSearchParams } from 'react-router-dom';
import ListPostSearch from '../components/search/ListPostSearch';
import MapWithMarkers from '../components/map/MapWithMarkers';
import { provinceCoordinates } from '../services/data';
import apiRequest from '../services/apiRequest';
import LoaderSpinner from '../components/LoaderSpinner';

function ListPostPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpenMap, setIsOpenMap] = useState(false);
  const [totalPages, setTotalPages] = useState(1); // Add totalPages state
  const [searchParams, setSearchParams] = useSearchParams();
  const [initialPosition, setInitialPosition] = useState([10.7769, 106.7009]); // Default to HCM
  const topRef = useRef(null);

  const currentPage = useMemo(
    () => parseInt(searchParams.get('page') || '1', 10),
    [searchParams],
  );

  const searchParamsObject = useMemo(
    () => ({
      status: searchParams.get('status') || '',
      address: searchParams.get('address') || '',
      province: searchParams.get('province') || '',
      district: searchParams.get('district') || '',
      ward: searchParams.get('ward') || '',
      type: searchParams.get('type') || '',
      bedroom: searchParams.get('bedroom') || '',
      direction: searchParams.get('direction') || '',
      minSize: searchParams.get('minSize') || '',
      maxSize: searchParams.get('maxSize') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      priceNegotiable: searchParams.get('priceNegotiable') || '',
      page: currentPage,
    }),
    [searchParams, currentPage],
  );

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await apiRequest('/posts', {
          params: searchParamsObject,
        });
        setData(response.data);
        setTotalPages(response.data.totalPages); 
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [searchParamsObject]);

  useEffect(() => {
    setSearchParams(searchParamsObject);
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    const province = searchParams.get('province');
    if (province && provinceCoordinates[province]) {
      setInitialPosition(provinceCoordinates[province]);
    } else {
      setInitialPosition([10.7769, 106.7009]);
    }
  }, [searchParamsObject, setSearchParams, searchParams]);

  const handlePageChange = (page) => {
    setSearchParams({ ...searchParamsObject, page });
  };

  const handleSwitchMap = () => {
    setIsOpenMap((prevState) => !prevState);
  };

  const handleReset = () => {
    const resetParams = {
      status: searchParams.get('status') || '',
      province: searchParams.get('province') || '',
      district: searchParams.get('district') || '',
      ward: searchParams.get('ward') || '',
      type: searchParams.get('type') || '',
      page: 1, // Reset page to 1
    };
    setSearchParams(resetParams);
  };

  return (
    <div
      className={`w-full pb-2 pt-28 px-3 flex items-center font-lexend font-normal text-sm  ${
        isOpenMap ? 'flex-row gap-x-3 h-[100vh]' : 'flex-col h-auto'
      } `}
      ref={topRef}
    >
      <div className={`${isOpenMap ? 'w-1/2 h-full overflow-y-scroll' : ''}`}>
        <div className='w-full h-auto px-1 flex justify-center items-center'>
          <ListPostSearch isOpenMap={isOpenMap} />
        </div>
        <div className='w-full mt-4 flex justify-center items-start gap-x-8'>
          {/* left content */}
          <div className='w-full max-w-[694px] bg-inherit mb-10 flex flex-col gap-y-4'>
            <div className='flex justify-between items-center'>
              <button
                className={`w-auto h-auto p-3 border border-black rounded-md flex items-center gap-x-2 hover:bg-primary hover:text-white transition-all duration-300 ease-in-out ${
                  isOpenMap && 'bg-primary text-white'
                } `}
                onClick={handleSwitchMap}
              >
                <FaRegMap /> Bản đồ
              </button>
              <button
                className='w-auto h-auto p-3 border border-black rounded-md bg-transparent flex items-center gap-x-2 hover:bg-primary hover:text-white transition-all duration-300 ease-in-out'
                onClick={handleReset}
              >
                <FaSyncAlt />
                Đặt lại tìm kiếm
              </button>
            </div>
            {isLoading ? (
              <div className='w-full h-full flex justify-center items-center'>
                <LoaderSpinner />
              </div>
            ) : error ? (
              <p>Error loading posts: {error}</p>
            ) : (
              <>
                {Array.isArray(data.posts) &&
                data.posts.length > 0 ? (
                  data.posts.map((post) => (
                    <PostCardList key={post._id} data={post} />
                  ))
                ) : (
                  <p>No posts available</p>
                )}
              </>
            )}
            {/* Pagination */}
            <div className='w-full h-9 mb-6 flex justify-center gap-x-1'>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className='w-9 h-auto flex justify-center items-center text-base text-white rounded bg-primary '
              >
                <FaChevronLeft />
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`w-9 h-full border-[0.5px] border-primary ${
                    currentPage === index + 1 ? 'active' : ''
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className='w-9 h-auto flex justify-center items-center text-base text-white rounded bg-primary '
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
          {/* right content */}
          <div
            className={`w-full h-[500px] max-w-[230px] mb-10 ${
              isOpenMap ? 'hidden' : 'block'
            }`}
          >
            {/* Related Post */}
            <OtherEstate />
          </div>
        </div>
      </div>
      {isOpenMap && (
        <div className='w-1/2 h-full sticky top-0 bottom-0 -right-1/2 bg-green-300'>
          <MapWithMarkers
            posts={data.posts}
            initialPosition={initialPosition}
          />
        </div>
      )}
    </div>
  );
}

export default ListPostPage;
