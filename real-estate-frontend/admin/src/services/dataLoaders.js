import { defer } from 'react-router-dom';
import apiRequest from './apiRequest';

export const postDetailLoader = async ({ request, params }) => {
  const response = await apiRequest(`/admin/posts/${params.id}`);
  return response.data;
};

export const listPostLoader = async ({ request, params }) => {
  // const query = request.url.split('?')[1];
  const url = new URL(request.url);
  const query = url.searchParams.toString();
  const postPromise = await apiRequest('/admin/posts?' + query);
  return defer({
    postResponse: postPromise,
  });
};

export const latestPostsLoader = async () => {
  const response = await apiRequest('/posts/latest-posts');
  return defer({
    latestPosts: response.data.posts,
  });
};

export const listAccountsLoader = async ({ request, params }) => {
  const url = new URL(request.url);
  const query = url.searchParams.toString();
  const accountsPromise = await apiRequest('/admin/users?' + query);
  return defer({
    accountsResponse: accountsPromise.data,
  });
};

// export const userPostsLoader = async ({ request, params }) => {
//   const url = new URL(request.url);
//   const query = url.searchParams.toString();
//   const postsPromise = apiRequest(`/admin/users?/${params.id}/posts?${query}`);
//   return defer({
//     userPosts: (await postsPromise).data.users,
//   });
// };

export const userPostsLoader = async ({ request, params }) => {
  const url = new URL(request.url);
  const query = url.searchParams.toString();
  const postsPromise = await apiRequest(
    `admin/users/user/${params.id}/posts?${query}`,
  );
  const userPromise = await apiRequest(`/admin/users/user/${params.id}`);
  // console.log('User Posts:', postsPromise.data);
  return defer({
    userPosts: postsPromise.data,
    userPromise: userPromise.data,
  });
};

export const newsListLoader = async ({ request, params }) => {
  const url = new URL(request.url);
  const query = url.searchParams.toString();
  const newPromise = await apiRequest(`/admin/news/all-news?` + query);
  return defer({
    newsResponse: newPromise,
  });
}

export const newsDetailLoader = async ({ request, params }) => {
  const response = await apiRequest(`/admin/news/single-news/${params.id}`);
  return response.data;
}
