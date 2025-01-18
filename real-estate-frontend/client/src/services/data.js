import { FiHome } from 'react-icons/fi';
import {
  FaRegUser,
  FaListUl,
  FaRegHeart,
  FaRegCommentDots,
} from 'react-icons/fa';

export const MenusLeft = [
  {
    name: 'Mua bán nhà đất',
    path: 'buy',
  },
  {
    name: 'Cho thuê nhà đất',
    path: 'rent',
  },
  // {
  //   name: 'Dự án',
  //   path: 'project',
  // },
  {
    name: 'Tin tức bất động sản',
    path: 'news',
  },
];

export const MenusRightNotUser = [
  {
    name: 'Đăng nhập',
    path: '/login',
  },
];

export const MenusRightIsUser = (currentUser) => {
  return {
    img: currentUser?.user?.avatar,
    name: currentUser?.user?.username,
    hasSubMenu: true,
    subMenu: [
      { name: 'Trang chủ', icon: FiHome, path: '/' },
      { name: 'Thông tin cá nhân', icon: FaRegUser, path: '/profile' },
      { name: 'Quản lý tin đăng', icon: FaListUl, path: '/user-posts' },
      { name: 'Tin đăng đã lưu', icon: FaRegHeart, path: '/favorites' },
      { name: 'Tin nhắn', icon: FaRegCommentDots, path: '/message' },
    ],
  };
};

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
    minPrice: null,
    maxPrice: null,
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
  { id: 6, name: '5+', value: '5+' },
];


export const provinceCoordinates = {
  'Thành phố Hà Nội': [21.0285, 105.8542],
  'Thành phố Hồ Chí Minh': [10.7769, 106.7009],
  'Thành phố Đà Nẵng': [16.0471, 108.2068],
  'Thành phố Hải Phòng': [20.8449, 106.6881],
  'Thành phố Cần Thơ': [10.0452, 105.7469],
  'Tỉnh Bà Rịa - Vũng Tàu': [10.4114, 107.1363],
  'Tỉnh Bắc Giang': [21.2730, 106.1947],
  'Tỉnh Bắc Kạn': [22.1475, 105.8340],
  'Tỉnh Bạc Liêu': [9.2950, 105.7216],
  'Tỉnh Bắc Ninh': [21.1861, 106.0763],
  'Tỉnh Bến Tre': [10.2357, 106.3750],
  'Tỉnh Bình Định': [13.7783, 109.2193],
  'Tỉnh Bình Dương': [11.0320, 106.7171],
  'Tỉnh Bình Phước': [11.7512, 106.7235],
  'Tỉnh Bình Thuận': [11.0904, 108.0735],
  'Tỉnh Cà Mau': [9.1761, 105.1524],
  'Tỉnh Cao Bằng': [22.6658, 106.2570],
  'Tỉnh Đắk Lắk': [12.7108, 108.2378],
  'Tỉnh Đắk Nông': [12.2636, 107.6098],
  'Tỉnh Điện Biên': [21.3860, 103.0163],
  'Tỉnh Đồng Nai': [10.9448, 106.8243],
  'Tỉnh Đồng Tháp': [10.5359, 105.7563],
  'Tỉnh Gia Lai': [13.9833, 108.0016],
  'Tỉnh Hà Giang': [22.8106, 104.9809],
  'Tỉnh Hà Nam': [20.5835, 105.9229],
  'Tỉnh Hà Tĩnh': [18.3558, 105.8875],
  'Tỉnh Hải Dương': [20.9353, 106.3153],
  'Tỉnh Hậu Giang': [9.7579, 105.6419],
  'Tỉnh Hòa Bình': [20.8171, 105.3376],
  'Tỉnh Hưng Yên': [20.6460, 106.0510],
  'Tỉnh Khánh Hòa': [12.2451, 109.1943],
  'Tỉnh Kiên Giang': [10.0120, 105.0809],
  'Tỉnh Kon Tum': [14.3545, 108.0000],
  'Tỉnh Lai Châu': [22.3964, 103.4582],
  'Tỉnh Lâm Đồng': [11.9404, 108.4584],
  'Tỉnh Lạng Sơn': [21.8537, 106.7596],
  'Tỉnh Lào Cai': [22.4856, 103.9703],
  'Tỉnh Long An': [10.6956, 106.2426],
  'Tỉnh Nam Định': [20.4373, 106.1747],
  'Tỉnh Nghệ An': [19.2302, 104.9414],
  'Tỉnh Ninh Bình': [20.2538, 105.9740],
  'Tỉnh Ninh Thuận': [11.5675, 108.9852],
  'Tỉnh Phú Thọ': [21.3227, 105.2263],
  'Tỉnh Phú Yên': [13.0958, 109.3107],
  'Tỉnh Quảng Bình': [17.4673, 106.6223],
  'Tỉnh Quảng Nam': [15.5736, 108.4740],
  'Tỉnh Quảng Ngãi': [15.1199, 108.8040],
  'Tỉnh Quảng Ninh': [21.0064, 107.2925],
  'Tỉnh Quảng Trị': [16.7625, 107.1854],
  'Tỉnh Sóc Trăng': [9.6025, 105.9739],
  'Tỉnh Sơn La': [21.3280, 103.9188],
  'Tỉnh Tây Ninh': [11.2892, 106.1043],
  'Tỉnh Thái Bình': [20.4505, 106.3409],
  'Tỉnh Thái Nguyên': [21.5661, 105.8409],
  'Tỉnh Thanh Hóa': [19.8067, 105.7772],
  'Tỉnh Thừa Thiên Huế': [16.4637, 107.5909],
  'Tỉnh Tiền Giang': [10.4493, 106.3421],
  'Tỉnh Trà Vinh': [9.9347, 106.3452],
  'Tỉnh Tuyên Quang': [21.8230, 105.2188],
  'Tỉnh Vĩnh Long': [10.2560, 105.9673],
  'Tỉnh Vĩnh Phúc': [21.3084, 105.6043],
  'Tỉnh Yên Bái': [21.7057, 104.8998],
};