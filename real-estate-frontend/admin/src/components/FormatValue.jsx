import moment from 'moment';

export const formatPrice = (price) => {
  if (price >= 1e9) {
    return `${(price / 1e9).toFixed(0)} tỷ`;
  } else if (price >= 1e6) {
    return `${(price / 1e6).toFixed(0)} triệu`;
  }
  return `${price} VND`;
};

export const formatSize = (size) => {
  if (size >= 1e6) {
    return `${(size / 1e6).toFixed(2)} km²`;
  }
  return `${size} m²`;
};

export const formatDate = (date) => {
  return moment(date).format('DD/MM/YYYY');
};
