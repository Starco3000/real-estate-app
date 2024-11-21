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
    path: '/buyandsell',
  },
  {
    name: 'Cho thuê nhà đất',
    path: '/rent',
  },
  {
    name: 'Dự án',
    path: '/project',
  },
  {
    name: 'Tin tức bất động sản',
    path: '/news',
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
      {
        name: 'Trang chủ',
        icon: FiHome,
        path: '/',
      },
      {
        name: 'Thông tin cá nhân',
        icon: FaRegUser,
        path: '/profile',
      },
      { name: 'Quản lý tin đăng', icon: FaListUl, path: '/post' },
      {
        name: 'Tin đăng đã lưu',
        icon: FaRegHeart,
        path: '/favorite',
      },
      {
        name: 'Tin nhắn',
        icon: FaRegCommentDots,
        path: '/message',
      },
    ],
  };
};

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
    name: 'Sổ hồng/Sổ đỏ',
    value: true,
  },
];
