// import React, { useState } from 'react';
// import { MapContainer, TileLayer, Popup, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import Pin from './Pin';

// function Map() {
//   const [position, setPosition] = useState([10.7769, 106.7009]); // TP.HCM
//   // Component để lắng nghe sự kiện di chuyển bản đồ
//   const MapEventsHandler = () => {
//     useMapEvents({
//       moveend: (event) => {
//         const map = event.target;
//         const center = map.getCenter(); // Lấy tâm bản đồ
//         const [lat, lng] = [center.lat.toFixed(6), center.lng.toFixed(6)];

//         // Cập nhật vị trí nếu tọa độ thay đổi
//         if (lat !== position[0] || lng !== position[1]) {
//           setPosition([center.lat, center.lng]);
//         }
//       },
//     });
//     return null;
//   };
//   return (
//     <div>
//       <h3>
//         Vị trí marker: Latitude = {position[0].toFixed(6)}, Longitude ={' '}
//         {position[1].toFixed(6)}
//       </h3>
//       <MapContainer
//         center={position}
//         zoom={20}
//         scrollWheelZoom={true}
//         className='w-full h-[300px]'
//       >
//         <TileLayer
//           url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
//           attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//         />
//         <MapEventsHandler />
//         <Pin />
//       </MapContainer>
//     </div>
//   );
// }

// export default Map;

// Bản gần hoàn thiện
// import React, { useState, useCallback, useEffect } from 'react';
// import { MapContainer, TileLayer, Popup, Marker, useMap } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// function Map({ onUpdatePosition }) {
//   const [position, setPosition] = useState([10.7769, 106.7009]); // Tọa độ mặc định
//   const [searchQuery, setSearchQuery] = useState(''); // Lưu trữ từ khóa tìm kiếm
//   const [searchResult, setSearchResult] = useState(null); // Lưu trữ kết quả tìm kiếm
//   const [isSearching, setIsSearching] = useState(false);

//   // Cập nhật vị trí của marker và bản đồ
//   const updateMapCenter = useCallback((lat, lng) => {
//     setPosition([lat, lng]);
//     onUpdatePosition([lat, lng]); // Cập nhật state của cha
//   }, [onUpdatePosition]);

//   // Hàm tìm kiếm địa chỉ khi người dùng bấm "Tìm kiếm"
//   const handleSearch = async () => {
//     if (!searchQuery.trim()) return;

//     setIsSearching(true);
//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
//           searchQuery,
//         )}&format=json&addressdetails=1`,
//       );
//       const data = await response.json();
//       if (data.length > 0) {
//         const { lat, lon } = data[0];
//         setSearchResult([parseFloat(lat), parseFloat(lon)]);
//         updateMapCenter(parseFloat(lat), parseFloat(lon)); // Cập nhật bản đồ
//       } else {
//         alert('Không tìm thấy địa chỉ. Vui lòng thử lại.');
//       }
//     } catch (error) {
//       console.error('Lỗi khi tìm kiếm địa chỉ:', error);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   // Component để điều khiển map (flyTo)
//   const FlyToLocation = ({ center }) => {
//     const map = useMap();
//     useEffect(() => {
//         if (center) {
//           map.flyTo(center, 17, { duration: 1.5 }); // Chuyển tới vị trí với hoạt ảnh mượt
//         }
//       }, [center, map]);
//     return null;
//   };

//   // Component marker có thể kéo và khi kéo sẽ cập nhật lại vị trí của bản đồ
//   const DraggableMarker = () => {
//     const map = useMap();

//     const onDragEnd = (event) => {
//       const marker = event.target;
//       const newLatLng = marker.getLatLng();
//       setPosition([newLatLng.lat, newLatLng.lng]); // Cập nhật state với tọa độ mới
//       updateMapCenter(newLatLng.lat, newLatLng.lng); // Cập nhật state với tọa độ mới
//     //   map.setView(newLatLng, 17, { duration: 1.5 }); // Cập nhật lại center bản đồ
//     };

//     return (
//       <Marker
//         draggable
//         position={position}
//         eventHandlers={{
//           dragend: onDragEnd, // Khi marker kéo xong, cập nhật vị trí
//         }}
//       >
//         <Popup>
//           Tọa độ: {position[0].toFixed(6)}, {position[1].toFixed(6)}
//         </Popup>
//       </Marker>
//     );
//   };

//   return (
//     <div>
//       {/* Thanh tìm kiếm */}
//       <div className='mb-2 flex items-center gap-2'>
//         <input
//           type='text'
//           placeholder='Nhập địa chỉ'
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)} // Chỉ cập nhật searchQuery khi người dùng nhập
//           className='p-2 border border-gray-300 rounded-md flex-1'
//         />
//         <button
//           onClick={handleSearch} // Chỉ tìm kiếm khi bấm nút
//           className='px-4 py-2 bg-blue-500 text-white rounded-md'
//           disabled={isSearching}
//         >
//           {isSearching ? 'Đang tìm...' : 'Tìm kiếm'}
//         </button>
//       </div>

//       {/* Bản đồ */}
//       <MapContainer
//         center={position}
//         zoom={20}
//         scrollWheelZoom={true}
//         className='w-full h-[300px]'
//       >
//         <TileLayer
//           url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
//           attribution="&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
//         />
//         {searchResult && <FlyToLocation center={searchResult} />}
//         <DraggableMarker />
//       </MapContainer>
//     </div>
//   );
// }

// export default Map;

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Popup, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Map({
  onUpdatePosition,
  isReadOnly = false,
  initialPosition = [10.7769, 106.7009],
}) {
  const [position, setPosition] = useState(initialPosition); // Tọa độ mặc định
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const updateMapCenter = (lat, lng) => {
    setPosition([lat, lng]);
    onUpdatePosition([lat, lng]); // Cập nhật state của cha
  };

  // Hàm tìm kiếm địa chỉ
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchQuery,
        )}&format=json&addressdetails=1`,
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        const newLat = parseFloat(lat);
        const newLon = parseFloat(lon);

        updateMapCenter(newLat, newLon); // Cập nhật vị trí marker
      } else {
        alert('Không tìm thấy địa chỉ. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Lỗi khi tìm kiếm địa chỉ:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Component để điều khiển map (flyTo)
  const FlyToLocation = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      if (center) {
        map.flyTo(center, 17, { duration: 1.5 }); // Chuyển tới vị trí với hoạt ảnh mượt
      }
    }, [center, map]);
    return null;
  };

  const DraggableMarker = () => {
    const onDragEnd = (event) => {
      const marker = event.target;
      const newLatLng = marker.getLatLng();
      updateMapCenter(newLatLng.lat, newLatLng.lng);
    };

    return (
      <Marker
        draggable={!isReadOnly}
        position={position}
        eventHandlers={{
          dragend: onDragEnd,
        }}
      >
        <Popup>
          Tọa độ: {position[0].toFixed(6)}, {position[1].toFixed(6)}
        </Popup>
      </Marker>
    );
  };

  return (
    <div>
      {/* Thanh tìm kiếm */}
      {!isReadOnly && (
        <div className='mb-2 flex items-center gap-2'>
          <input
            type='text'
            placeholder='Nhập địa chỉ'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='p-2 border border-gray-300 rounded-md flex-1'
          />
          <button
            onClick={handleSearch}
            className='px-4 py-2 bg-blue-500 text-white rounded-md'
            disabled={isSearching}
          >
            {isSearching ? 'Đang tìm...' : 'Tìm kiếm'}
          </button>
        </div>
      )}

      {/* Bản đồ */}
      <MapContainer
        center={position}
        zoom={20}
        scrollWheelZoom={true}
        className='w-full h-[300px]'
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution="&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
        />
        {/* Fly đến vị trí tìm kiếm */}
        <FlyToLocation center={position} />
        <DraggableMarker />
      </MapContainer>
    </div>
  );
}

export default Map;
