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
    postResponse: postPromise,
  });
};

export const latestPostsLoader = async () => {
  const response = await apiRequest('/posts/latest-posts');
  return defer({
    latestPosts: response.data.posts,
  });
};

export const userPostLoader = async ({ request, params }) => {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.toString();
    const response = await apiRequest('/users/userPosts?' + query);
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