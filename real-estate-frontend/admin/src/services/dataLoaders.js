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
  const postPromise = apiRequest('/admin/posts?' + query);
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



// export const postDetailLoader = async ({ request, params }) => {
//   try {
//     const response = await apiRequest(`/posts/${params.id}`);
//     return response.data;
//   } catch (error) {
//     // Xử lý lỗi nếu không tìm thấy bài đăng
//     console.error('Error loading post details:', error);
//     throw new Response('Not Found', { status: 404 });
//   }
// };

// export const listPostLoader = async ({ request }) => {
//   try {
//     const url = new URL(request.url);
//     const query = url.searchParams.toString();

//     // Kiểm tra và làm sạch query params
//     const filteredQuery = Array.from(url.searchParams.entries())
//       .filter(([_, value]) => value !== '')
//       .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
//       .join('&');

//     const postPromise = apiRequest(`/posts?${filteredQuery}`);

//     return defer({
//       postResponse: postPromise,
//     });
//   } catch (error) {
//     console.error('Error loading post list:', error);
//     return defer({
//       postResponse: Promise.resolve({
//         data: {
//           posts: [],
//           totalPages: 0
//         },
//         error: true
//       }),
//     });
//   }
// };

// export const latestPostsLoader = async () => {
//   try {
//     const response = await apiRequest('/posts/latest-posts');
//     return defer({
//       latestPosts: response.data.posts || [],
//     });
//   } catch (error) {
//     console.error('Error loading latest posts:', error);
//     return defer({
//       latestPosts: [],
//     });
//   }
// };
