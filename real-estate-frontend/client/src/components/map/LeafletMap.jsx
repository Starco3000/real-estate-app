import React, { useEffect, memo } from 'react';
import { MapContainer, TileLayer, Popup, Marker, useMap } from 'react-leaflet';

function LeafletMap({ position, updateMapCenter, isReadOnly }) {
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
        position={position}
        draggable={!isReadOnly}
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
  );
}

export default memo(LeafletMap);
