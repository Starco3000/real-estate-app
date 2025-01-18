import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout, RequireAuth } from './layouts/layout';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AddPostPage from './pages/posts/AddPostPage';
import UpdatePostPage from './pages/posts/UpdatePostPage';
import ListPostPage from './pages/posts/ListPostPage';
import PostDetailPage from './pages/posts/PostDetailPage';
import ListAccountsPage from './pages/accounts/ListAccountsPage';
import AccountListPostPage from './pages/accounts/AccountListPostPage';
import ListNewsPage from './pages/news/ListNewsPage';
import NewsDetailPage from './pages/news/NewsDetailPage';
import AddNewsPage from './pages/news/AddNewsPage';
import UpdateNewsPage from './pages/news/UpdateNewsPage';
import SettingPage from './pages/SettingPage';

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
          path: 'setting',
          element: <SettingPage />,
        },
        {
          path: 'list',
          element: <ListPostPage />,
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
        },
        {
          path: 'users',
          element: <ListAccountsPage />,
        },
        {
          path: 'users/user/:id/posts',
          element: <AccountListPostPage />,
        },
        {
          path: 'news',
          element: <ListNewsPage />,
        },
        {
          path: 'news/single-news/:id',
          element: <NewsDetailPage />,
        },
        {
          path: 'news/add-news',
          element: <AddNewsPage />,
        },
        {
          path: 'news/update-news/:id',
          element: <UpdateNewsPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
