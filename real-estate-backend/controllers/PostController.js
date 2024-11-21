const mongoose = require('mongoose');
const Models = require('../models/Models');

async function getPosts(request, response) {
  try {
    const posts = await Models.Post.find();
    response.status(200).json({ posts, success: true });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: 'Failed to get posts!', error: true });
  }
}

async function getPost(request, response) {
  const _id = request.params.id;
  try {
    const post = await Models.Post.findById(_id)
      .populate('postDetailId')
      .populate({
        path: 'userId',
        select: {
          username: true,
          avatar: true,
        },
      });
    response.status(200).json({ post, success: true });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: 'Failed to get post!', error: true });
  }
}

async function addPost(request, response) {
  const body = request.body;
  const tokenUserId = request.userId;
  try {
    const postDetail = await Models.PostDetail.create({
      _id: new mongoose.Types.ObjectId(),
      ...body.postDetail,
    });
    const newPost = await Models.Post.create({
      _id: new mongoose.Types.ObjectId(),
      ...body.postData,
      userId: tokenUserId,
      postDetailId: postDetail._id,
    });
    response.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: 'Failed to add post!', error: true });
  }
}

async function updatePost(request, response) {
  try {
    response.status(200).json({});
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: 'Failed to update post!', error: true });
  }
}

async function deletePost(request, response) {
  const _id = request.params.id;
  const tokenUserId = request.userId;
  try {
    //Check userId/owner of post
    const post = await Models.Post.findById(_id);
    if (post.userId.toString() !== tokenUserId) {
      return response
        .status(403)
        .json({ message: 'Not Authorized!', error: true });
    }
    await Models.Post.findByIdAndDelete(_id);
    response.status(200).json({ message: 'Post deleted', success: true });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: 'Failed to delete post!', error: true });
  }
}

module.exports = { getPosts, getPost, addPost, updatePost, deletePost };
