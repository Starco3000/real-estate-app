import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout, RequireAuth } from './layouts/layout';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AddPostPage from './pages/posts/AddPostPage';
import UpdatePostPage from './pages/posts/UpdatePostPage';
import ListPostPage from './pages/posts/ListPostPage';
import PostDetailPage from './pages/posts/PostDetailPage';
import { listPostLoader, postDetailLoader } from './services/dataLoaders';

function App() {
  const router = createBrowserRouter([
    {
      path: '/admin/',
      element: <Layout />,
      children: [
        {
          path: 'login',
          element: <LoginPage />,
        },
      ],
    },
    {
      path: '/admin/',
      element: <RequireAuth />,
      children: [
        {
          path: 'dashboard',
          element: <Dashboard />,
        },
        {
          path: 'list',
          element: <ListPostPage />,
          loader: listPostLoader,
        },
        {
          path: 'add-post',
          element: <AddPostPage />,
        },
        {
          path: 'update-post/:id',
          element: <UpdatePostPage />,
          
        },
        {
          path: ':id',
          element: <PostDetailPage />,
          loader: postDetailLoader,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
