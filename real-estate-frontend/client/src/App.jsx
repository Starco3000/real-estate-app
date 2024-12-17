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
import {
  favoritePostLoader,
  latestPostsLoader,
  listPostLoader,
  postDetailLoader,
} from './services/dataLoaders';
import FavoritePostPage from './pages/FavoritePostPage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
          loader: latestPostsLoader,
        },
        {
          path: '/list',
          element: <ListPostPage />,
          loader: listPostLoader,
        },
        {
          path: '/:id',
          element: <PostDetailPage />,
          loader: postDetailLoader,
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
          // loader: profilePageLoader,
        },
        {
          path: '/add-post',
          element: <AddPostPage />,
        },
        // {
        //   path: '/update-post/:id',
        //   element: <AddPostPage />,
        // },
        {
          path: '/favorites',
          element: <FavoritePostPage />,
          loader: favoritePostLoader,
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
