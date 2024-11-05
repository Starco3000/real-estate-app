import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout, RequireAuth } from './layouts/layout';
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import PostDetailPage from './pages/PostDetail';

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
        // {
        //   path: '/list',
        //   element: <ListPage />,
        //   // loader: listPageLoader,
        // },
        {
          path: '/post-detail',
          element: <PostDetailPage />,
          // loader: listPageLoader,
        },
        // {
        //   path: '/:id',
        //   element: <SinglePage />,
        //   // loader: singlePageLoader,
        // },

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
        // {
        //   path: '/profile/update',
        //   element: <ProfileUpdatePage />,
        // },
        // {
        //   path: '/add',
        //   element: <NewPostPage />,
        // },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
