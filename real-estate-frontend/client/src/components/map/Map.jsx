import React, { useCallback, useState, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import LeafletMap from './LeafletMap';
import { useEffect } from 'react';

function Map({ onUpdatePosition, isReadOnly = false, initialPosition }) {
  const [position, setPosition] = useState(
    initialPosition || [10.7769, 106.7009],
  ); // Tọa độ mặc định
  const searchQuery = useRef(null); // Lưu trữ từ khóa tìm kiếm
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (initialPosition) {
      setPosition(initialPosition);
    }
  }, [initialPosition]);

  const updateMapCenter = (lat, lng) => {
    setPosition([lat, lng]);
    onUpdatePosition([lat, lng]); // Cập nhật state của cha
  };

  // Hàm tìm kiếm địa chỉ
  const handleSearch = useCallback(async () => {
    if (!searchQuery.current?.value.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchQuery.current?.value,
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
  }, []);

  return (
    <div>
      {/* Thanh tìm kiếm */}
      {!isReadOnly && (
        <div className='mb-2 flex items-center gap-2'>
          <input
            type='text'
            placeholder='Nhập địa chỉ'
            ref={searchQuery}
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
      <LeafletMap {...{ position, updateMapCenter, isReadOnly }} />
    </div>
  );
}

export default Map;
