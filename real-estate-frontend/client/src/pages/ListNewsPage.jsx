import React from 'react';
import Images from '../components/Images';

function ListNewsPage() {
  return (
    <div className='w-full h-full pt-24 bg-red-300 flex flex-col items-center font-lexend font-normal text-sm'>
      <div className='w-full h-14 bg-white flex justify-center items-center'>
        searching
      </div>
      <div className='w-full max-w-[1140px] h-[100vh]  bg-main'>
        {/* Title of page */}
        <div className='w-3/4 py-8 my-6 flex flex-col items-center mx-auto bg-green-200'>
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
        <div className='w-full mx-auto flex flex-cols bg-yellow-200'>
          <div className='w-3/5 relative '>
            <img
              src={Images.wallpaper}
              alt={'news thumbnail'}
              className='absolute'
            />
            <div className='w-full h-auto p-8 my-44 flex flex-col bg-green-300  absolute'>
              <span className='text-gray-200'>08/01/2025 14:00 • Tin tức</span>
              <h2 className='font-semibold text-2xl text-white'>
                Khu Vực Nào Mới Có Nhà Giá Thấp, Khi Căn Hộ TP.HCM Lên Đến Gần
                Chục Tỷ Đồng/Căn?
              </h2>
              <p className='text-white line-clamp-3'>
                Mặt bằng căn hộ tại Bình Dương đã chạm đến 60 triệu đồng/m2.
                Trong khi đó, căn hộ thuộc Khu đô thị Bcons City đang chỉ từ 2
                tỷ đồng (khoảng 40 triệu đồng/m2), nơi này lập tức thu hút mạnh
                sự chú ý của thị trường ở đầu năm 2025.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListNewsPage;
