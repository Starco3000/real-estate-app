export const Status = [
  { id: 1, name: 'Bán', value: 'buy' },
  { id: 2, name: 'Cho thuê', value: 'rent' },
];

export const Types = [
  {
    id: 1,
    name: 'Chung cư mini, căn hộ',
    value: 'apartment',
  },
  {
    id: 2,
    name: 'Nhà riêng',
    value: 'house',
  },
  {
    id: 3,
    name: 'Nhà biệt thự, nhà liền kề',
    value: 'villa',
  },
  {
    id: 4,
    name: 'Nhà mặt phố',
    value: 'street-house',
  },
  {
    id: 5,
    name: 'Shophouse',
    value: 'shophouse',
  },
  {
    id: 6,
    name: 'Đất nền dự án',
    value: 'land-project',
  },
  {
    id: 7,
    name: 'Đất bán',
    value: 'land',
  },
  {
    id: 8,
    name: 'Kho, nhà xưởng',
    value: 'warehouse',
  },
];

export const Directions = [
  {
    id: 1,
    name: 'Hướng Bắc',
    value: 'north',
  },
  {
    id: 2,
    name: 'Hướng Đông Bắc',
    value: 'north-east',
  },
  {
    id: 3,
    name: 'Hướng Đông',
    value: 'east',
  },
  {
    id: 4,
    name: 'Hướng Đông Nam',
    value: 'south-east',
  },
  {
    id: 5,
    name: 'Hướng Nam',
    value: 'south',
  },
  {
    id: 6,
    name: 'Hướng Tây Nam',
    value: 'south-west',
  },
  {
    id: 7,
    name: 'Hướng Tây',
    value: 'west',
  },
  {
    id: 8,
    name: 'Hướng Tây Bắc',
    value: 'north-west',
  },
];

export const Certificates = [
  {
    id: 1,
    name: 'Sổ hồng riêng',
  },
  {
    id: 2,
    name: 'Sổ hồng chung',
  },
  {
    id: 3,
    name: 'Sổ đỏ',
  },
  {
    id: 4,
    name: 'Hợp đồng mua bán',
  },
  {
    id: 5,
    name: 'Hợp đồng đặt cọc',
  },
  {
    id: 6,
    name: 'Công chứng vi bằng',
  },
  {
    id: 7,
    name: 'Giấy tờ khác',
  },
];

export const Prices = [
  {
    id: 1,
    name: 'Dưới 500 triệu',
    minPrice: 0,
    maxPrice: 500000000,
  },
  {
    id: 2,
    name: '500 triệu - 800 triệu',
    minPrice: 500000000,
    maxPrice: 800000000,
  },
  {
    id: 3,
    name: '800 triệu - 1 tỷ',
    minPrice: 800000000,
    maxPrice: 1000000000,
  },
  {
    id: 4,
    name: '1 tỷ - 2 tỷ',
    minPrice: 1000000000,
    maxPrice: 2000000000,
  },
  {
    id: 5,
    name: '2 tỷ - 3 tỷ',
    minPrice: 2000000000,
    maxPrice: 3000000000,
  },
  {
    id: 6,
    name: '3 tỷ - 5 tỷ',
    minPrice: 3000000000,
    maxPrice: 5000000000,
  },
  {
    id: 7,
    name: '5 tỷ - 7 tỷ',
    minPrice: 5000000000,
    maxPrice: 7000000000,
  },
  {
    id: 8,
    name: '7 tỷ - 10 tỷ',
    minPrice: 7000000000,
    maxPrice: 10000000000,
  },
  {
    id: 9,
    name: '10 tỷ - 20 tỷ',
    minPrice: 10000000000,
    maxPrice: 20000000000,
  },
  {
    id: 10,
    name: '20 tỷ - 30 tỷ',
    minPrice: 20000000000,
    maxPrice: 30000000000,
  },
  {
    id: 11,
    name: '30 tỷ - 40 tỷ',
    minPrice: 30000000000,
    maxPrice: 40000000000,
  },
  {
    id: 12,
    name: '40 tỷ - 60 tỷ',
    minPrice: 40000000000,
    maxPrice: 60000000000,
  },
  {
    id: 13,
    name: 'Trên 60 tỷ',
    minPrice: 60000000000,
    maxPrice: 1000000000000000000,
  },
  {
    id: 14,
    name: 'Thỏa thuận',
    minPrice: undefined,
    maxPrice: undefined,
  },
];

export const Sizes = [
  {
    id: 1,
    name: 'Dưới 30 m²',
    minSize: 1,
    maxSize: 30,
  },
  {
    id: 2,
    name: '30 m² - 50 m²',
    minSize: 30,
    maxSize: 50,
  },
  {
    id: 3,
    name: '50 m² - 80 m²',
    minSize: 50,
    maxSize: 80,
  },
  {
    id: 4,
    name: '80 m² - 100 m²',
    minSize: 80,
    maxSize: 100,
  },
  {
    id: 5,
    name: '100 m² - 150 m²',
    minSize: 100,
    maxSize: 150,
  },
  {
    id: 6,
    name: '150 m² - 200 m²',
    minSize: 150,
    maxSize: 200,
  },
  {
    id: 7,
    name: '200 m² - 250 m²',
    minSize: 200,
    maxSize: 250,
  },
  {
    id: 8,
    name: '250 m² - 300 m²',
    minSize: 250,
    maxSize: 300,
  },
  {
    id: 9,
    name: '300 m² - 500 m²',
    minSize: 300,
    maxSize: 500,
  },
  {
    id: 10,
    name: 'Trên 500 m²',
    minSize: 500,
    maxSize: 1000000000000,
  },
];

export const Bedrooms = [
  { id: 1, name: '1', value: 1 },
  { id: 2, name: '2', value: 2 },
  { id: 3, name: '3', value: 3 },
  { id: 4, name: '4', value: 4 },
  { id: 5, name: '5', value: 5 },
  { id: 6, name: '5+', value: "5+" },
];


export const TypeNews = [
  {
    id: 1,
    name: 'Tin tức',
    value: 'news',
  },
  {
    id: 2,
    name: 'Mua BĐS',
    value: 'sale',
  },
  {
    id: 3,
    name: 'Thuê BĐS',
    value: 'rent',
  },
  {
    id: 4,
    name: 'Quy hoạch pháp lý',
    value: 'legal-planning',
  },
];