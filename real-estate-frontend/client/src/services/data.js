import { FiHome } from 'react-icons/fi';
import noavatar from '../assets/noavatar.jpg';
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
  }
};
