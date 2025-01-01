import { defer } from 'react-router-dom';
import apiRequest from './apiRequest';

export const postDetailLoader = async ({ request, params }) => {
  const response = await apiRequest(`/posts/${params.id}`);
  return response.data;
};

export const listPostLoader = async ({ request, params }) => {
  // const query = request.url.split('?')[1];
  const url = new URL(request.url);
  const query = url.searchParams.toString();
  const postPromise = apiRequest('/posts?' + query);
  return defer({
    postResponse: (await postPromise).data,
  });
};
export const latestPostsLoader = async () => {
  const latestPostPromise = await apiRequest('/posts/latest-posts');
  const topPostPromise = await apiRequest('/posts/top-provinces');
  return defer({
    latestPosts: latestPostPromise.data.posts,
    topPosts: topPostPromise.data.topProvinces,
  });
};

export const ListNewsLoader = async () => {
  const newsResponse = await apiRequest('/news');
  return defer({
    newsResponse: newsResponse.data,
  });
};

export const newsDetailLoader = async ({ request, params }) => {
  const response = await apiRequest(`/admin/news/single-news/${params.id}`);
  return response.data;
}


export const userPostLoader = async ({ request, params }) => {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.toString();
    const response = await apiRequest('/users/posts/userPosts?' + query);
    return defer({
      userPosts: response.data,
    })
  } catch (error) {
    
  }
}

export const favoritePostLoader = async ({ request, params }) => {
  const url = new URL(request.url);
  const query = url.searchParams.toString();
  const postPromise = await apiRequest('/favorites?' + query);
  return defer({
    postResponse: postPromise.data,
  });
};