import React from 'react';
import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import PostCard from '../../components/PostCard';

function AccountListPostPage() {
  const { userPosts } = useLoaderData();
  console.log('userPosts', userPosts);
  return (
    <div>
      {/* <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={userPosts} errorElement={<p>Error loading posts!</p>}>
          {(postResponse) => {
            const posts = postResponse;
            console.log('posts', posts);
            return Array.isArray(posts) && posts.length > 0 ? (
              posts.map((post) => (
                <PostCard
                  key={post._id}
                  data={post}
                  // handleEvent={handleDelete}
                />
              ))
            ) : (
              <p>No posts available</p>
            );
          }}
        </Await>
      </Suspense> */}
    </div>
  );
}

export default AccountListPostPage;
