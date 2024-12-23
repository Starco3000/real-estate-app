import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PinMaker from './PinMaker';

function MapWithMarkers({ posts, initialPosition }) {
  const [position, setPosition] = useState(initialPosition);
  console.log('posts', posts);

  const FlyToLocation = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      if (center) {
        map.flyTo(center, 10, { duration: 1.5 });
      }
    }, [center, map]);
    return null;
  };

  return (
    <MapContainer
      center={position}
      zoom={10}
      scrollWheelZoom={true}
      className='w-full h-full'
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution="&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
      />
      <FlyToLocation center={position} />
      {posts.map((post) => (
        <PinMaker position={post} />
      ))}
    </MapContainer>
  );
}

export default MapWithMarkers;