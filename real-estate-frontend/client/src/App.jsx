import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout, RequireAuth } from './layouts/layout';
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import PostDetailPage from './pages/PostDetailPage';
import ListPost from './pages/ListPost';
import AddPostPage from './pages/AddPostPage';

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
          element: <ListPost />,
          // loader: listPageLoader,
        },
        {
          path: '/:id',
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
        {
          path: '/add-post',
          element: <AddPostPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
