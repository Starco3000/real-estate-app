// import React, { Suspense, useEffect, useState } from 'react';
// import { FaChevronLeft, FaChevronRight, FaRegMap } from 'react-icons/fa';
// import PostCardList from '../components/PostCardList';
// import OtherEstate from '../components/OtherEstate';
// import { useLoaderData, Await, useSearchParams } from 'react-router-dom';
// import ListPostSearch from '../components/search/ListPostSearch';

// function ListPostPage() {
//   const data = useLoaderData();
//   const postResponse = data.postResponse.data;
//   const [searchParams, setSearchParams] = useSearchParams();
//   const currentPage = parseInt(searchParams.get('page') || '1', 10);
//   const status = searchParams.get('status') || '';
//   const totalPages = postResponse ? postResponse.totalPages : 1;
//   const [isOpenMap, setIsOpenMap] = useState(false);

//   useEffect(() => {
//     if (status) {
//       setSearchParams({ status });
//     }
//   }, [status, setSearchParams]);

//   const handlePageChange = (page) => {
//     setSearchParams({ page, status });
//   };

//   const handleSwitchMap = () => {
//     setIsOpenMap((prevState) => !prevState);
//     console.log('isOpenMap', isOpenMap);
//   };

//   return (
//     <div
//       className={`w-full pb-2 pt-28 px-3 flex items-center font-lexend font-normal text-sm  ${
//         isOpenMap  ? 'flex-row gap-x-3 h-[100vh]' : 'flex-col h-auto'
//       } bg-red-400`}
//     >
//       <div className={`${isOpenMap ? 'w-1/2 h-full overflow-y-scroll scroll' :''}`}>
//         <div className='w-full h-auto px-1 flex justify-center items-center'>
//           <ListPostSearch />
//         </div>
//         <div className='w-full mt-4 flex justify-center items-start gap-x-8'>
//           {/* left content */}
//           <div className='w-full max-w-[694px] bg-inherit mb-10 flex flex-col gap-y-4'>
//             <button
//               className='w-28 h-9 border border-gray-400 rounded flex justify-center items-center gap-2'
//               onClick={handleSwitchMap}
//             >
//               <FaRegMap /> Bản đồ
//             </button>
//             <Suspense fallback={<p>Loading...</p>}>
//               <Await
//                 resolve={data.postResponse}
//                 errorElement={<p>Error loading posts!</p>}
//               >
//                 {(postResponse) => {
//                   const posts = postResponse.data.posts;
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
//         <div className='w-1/2 h-full sticky top-0 bottom-0 -right-1/2 bg-green-300'>Map here</div>
//       )}
//     </div>
//   );
// }

// export default ListPostPage;

import React, { Suspense, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaRegMap } from 'react-icons/fa';
import PostCardList from '../components/PostCardList';
import OtherEstate from '../components/OtherEstate';
import { useLoaderData, Await, useSearchParams } from 'react-router-dom';
import ListPostSearch from '../components/search/ListPostSearch';
import useSearchPagramLogic from './../hooks/useSearchPagramLogic';

function ListPostPage() {
  const data = useLoaderData();
  const postResponse = data.postResponse.data;
  const totalPages = postResponse ? postResponse.totalPages : 1;
  const [isOpenMap, setIsOpenMap] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const status = searchParams.get('status') || '';
  const address = searchParams.get('address') || '';
  const province = searchParams.get('province') || '';
  const district = searchParams.get('district') || '';
  const ward = searchParams.get('ward') || '';
  const type = searchParams.get('type') || '';
  const bedroom = searchParams.get('bedroom') || '';
  const direction = searchParams.get('direction') || '';
  // const price = searchParams.get('price') || '';
  const minSize = searchParams.get('minSize') || '';
  const maxSize = searchParams.get('maxSize') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';

  useEffect(() => {
    console.log('Search Params:', {
      status,
      address,
      province,
      district,
      ward,
      type,
      bedroom,
      direction,
      minSize,
      maxSize,
      minPrice,
      maxPrice,
      page: currentPage,
    });
    setSearchParams({
      status,
      address,
      province,
      district,
      ward,
      type,
      bedroom,
      direction,
      minSize,
      maxSize,
      minPrice,
      maxPrice,
      page: currentPage,
    });
  }, [
    status,
    address,
    province,
    district,
    ward,
    type,
    bedroom,
    direction,
    minSize,
    maxSize,
    minPrice,
    maxPrice,
    currentPage,
    setSearchParams,
  ]);

  const handlePageChange = (page) => {
    setSearchParams({
      status,
      address,
      province,
      district,
      ward,
      type,
      minSize,
      maxSize,
      minPrice,
      maxPrice,
      bedroom,
      direction,
      page,
    });
  };

  const handleSwitchMap = () => {
    setIsOpenMap((prevState) => !prevState);
    console.log('isOpenMap', isOpenMap);
  };

  return (
    <div
      className={`w-full pb-2 pt-28 px-3 flex items-center font-lexend font-normal text-sm  ${
        isOpenMap ? 'flex-row gap-x-3 h-[100vh]' : 'flex-col h-auto'
      } `}
    >
      <div className={`${isOpenMap ? 'w-1/2 h-full overflow-y-scroll' : ''}`}>
        <div className='w-full h-auto px-1 flex justify-center items-center'>
          <ListPostSearch />
        </div>
        <div className='w-full mt-4 flex justify-center items-start gap-x-8'>
          {/* left content */}
          <div className='w-full max-w-[694px] bg-inherit mb-10 flex flex-col gap-y-4'>
            <button
              className='w-28 h-9 border border-gray-400 rounded flex justify-center items-center gap-2'
              onClick={handleSwitchMap}
            >
              <FaRegMap /> Bản đồ
            </button>
            <Suspense fallback={<p>Loading...</p>}>
              <Await
                resolve={data.postResponse}
                errorElement={<p>Error loading posts!</p>}
              >
                {(postResponse) => {
                  const posts = postResponse.data.posts;
                  console.log('posts', posts);
                  return Array.isArray(posts) && posts.length > 0 ? (
                    posts.map((post) => (
                      <PostCardList key={post._id} data={post} />
                    ))
                  ) : (
                    <p>No posts available</p>
                  );
                }}
              </Await>
            </Suspense>
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
          Map here
        </div>
      )}
    </div>
  );
}

export default ListPostPage;
