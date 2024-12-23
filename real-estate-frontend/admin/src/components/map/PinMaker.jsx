import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import { formatPrice } from './../FormatValue';

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl,
//   iconUrl,
//   shadowUrl,
// });

function PinMaker({ position }) {
  return (
    <Marker
      key={position.id}
      position={[
        position.postDetailId.coordinate.latitude,
        position.postDetailId.coordinate.longitude,
      ]}
    >
      <Popup>
        <div className='flex gap-4'>
          <img
            src={position.postDetailId.images[0]}
            alt={position.title}
            className='w-24 h-24 object-cover rounded-md'
          />
          <div className='flex flex-col font-lexend font-normal gap-y-3'>
            <Link
              to={`/${position.id}`}
              className='line-clamp-2 text-sm font-semibold'
            >
              {position.title}
            </Link>
            <div className='grid grid-cols-2 gap-x-6 text-red-600'>
              <b>{formatPrice(position.price)}</b>
              <b>{formatPrice(position.size)}</b>
            </div>
            <div className='grid grid-cols-2 gap-x-6 text-gray-300'>
              <span>{position.bedroom} bedroom</span>
              <span>{position.bathroom} bathroom</span>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default PinMaker;
