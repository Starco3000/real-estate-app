import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout, RequireAuth } from './layouts/layout';
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import PostDetailPage from './pages/PostDetailPage';
import ListPostPage from './pages/ListPostPage';
import AddPostPage from './pages/AddPostPage';
import FavoritePostPage from './pages/FavoritePostPage';
import UpdatePostPage from './pages/UpdatePostPage';
import UserPostPage from './pages/UserPostPage';
import ListNewsPage from './pages/ListNewsPage';
import NewsDetailPage from './pages/NewsDetailPage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/list',
          element: <ListPostPage />,
        },
        {
          path: '/:id',
          element: <PostDetailPage />,
        },
        {
          path: '/news',
          element: <ListNewsPage />,
        },
        {
          path: '/news/:id',
          element: <NewsDetailPage />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
      ],
    },
    {
      path: '/',
      element: <RequireAuth />,
      children: [
        {
          path: '/profile',
          element: <ProfilePage />,
        },
        {
          path: '/add-post',
          element: <AddPostPage />,
        },
        {
          path: '/update-post/:id',
          element: <UpdatePostPage />,
        },
        {
          path: '/favorites',
          element: <FavoritePostPage />,
        },
        {
          path: '/user-posts',
          element: <UserPostPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
