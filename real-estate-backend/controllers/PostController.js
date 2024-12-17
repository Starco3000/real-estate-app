const mongoose = require('mongoose');
const Models = require('../models/Models');

async function getPosts(request, response) {
  try {
    const {
      status,
      address,
      province,
      district,
      ward,
      type,
      bedroom,
      direction,
      minSize,
      maxSize,
      minPrice,
      maxPrice,
      priceNegotiable,
      keyword,
      page = 1,
      pageSize = 10,
    } = request.query;

    // Convert minPrice and maxPrice to numbers
    const minPriceNum = minPrice ? Number(minPrice) : null;
    const maxPriceNum = maxPrice ? Number(maxPrice) : null;
    const minSizeNum = minSize ? Number(minSize) : null;
    const maxSizeNum = maxSize ? Number(maxSize) : null;

    const query = {};
    if (status) query.status = status;
    if (address) query.address = { $regex: address, $options: 'i' };
    if (province) query.province = province;
    if (district) query.district = district;
    if (ward) query.ward = ward;
    if (type) query.type = type;
    if (direction) query.direction = direction;
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { address: { $regex: keyword, $options: 'i' } },
        { province: { $regex: keyword, $options: 'i' } },
        { district: { $regex: keyword, $options: 'i' } },
        { ward: { $regex: keyword, $options: 'i' } },
        { type: { $regex: keyword, $options: 'i' } },
        { status: { $regex: keyword, $options: 'i' } },
        { direction: { $regex: keyword, $options: 'i' } },
      ];
    }

    // Add price range to the query if minPrice or maxPrice are provided
    if (
      (minPriceNum !== null && !isNaN(minPriceNum)) ||
      (maxPriceNum !== null && !isNaN(maxPriceNum))
    ) {
      query.price = {};
      if (minPriceNum !== null && !isNaN(minPriceNum)) {
        query.price.$gte = minPriceNum;
      }
      if (maxPriceNum !== null && !isNaN(maxPriceNum)) {
        query.price.$lte = maxPriceNum;
      }
    } else if (priceNegotiable === 'true') {
      // Handle "Giá thỏa thuận" case
      query.price = { $exists: false };
    }

    // Add size range to the query if minSize or maxSize are provided
    if (minSizeNum !== null || maxSizeNum !== null) {
      query.size = {};
      if (minSizeNum !== null) {
        query.size.$gte = minSizeNum;
      }
      if (maxSizeNum !== null) {
        query.size.$lte = maxSizeNum;
      }
    }

    if (bedroom === '5+') {
      query.bedroom = { $gte: 5 };
    } else if (bedroom) {
      query.bedroom = Number(bedroom);
    }

    // Calculate skip and limit values for pagination
    const skip = (page - 1) * pageSize;
    const limit = parseInt(pageSize);

    // console.log('Constructed Query:', query);

    // Fetch the total number of posts matching the query
    const totalPosts = await Models.Post.countDocuments(query);

    // Fetch the posts with pagination
    const posts = await Models.Post.find(query)
      .populate('postDetailId', 'description images')
      .populate('userId', 'avatar name phone')
      .skip(skip)
      .limit(limit);

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalPosts / pageSize);

    // Return the posts and total pages to the client
    response.status(200).json({
      posts,
      totalPages,
      success: true,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    response.status(500).json({ message: 'Failed to get posts!', error: true });
  }
}

async function getPost(request, response) {
  const _id = request.params.id;
  try {
    const post = await Models.Post.findById(_id)
      .populate('postDetailId', 'description images certificate coordinate')
      .populate('userId', 'avatar name phone');
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
    const newPost = await Models.Post.create({
      _id: new mongoose.Types.ObjectId(),
      ...body.postData,
      userId: tokenUserId,
      // postDetailId: postDetail._id,
    });
    const postDetail = await Models.PostDetail.create({
      _id: new mongoose.Types.ObjectId(),
      ...body.postDetail,
      postId: newPost._id,
    });
    await Models.Post.findByIdAndUpdate(newPost._id, {
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
    const postId = request.params.id;
    const updateData = request.body;

    // Cập nhật dữ liệu postData
    const updatedPost = await Models.Post.findByIdAndUpdate(
      postId,
      updateData.postData,
      { new: true },
    );

    if (!updatedPost) {
      return response
        .status(404)
        .json({ message: 'Post not found!', error: true });
    }

    // Cập nhật dữ liệu postDetail
    const updatedPostDetail = await Models.PostDetail.findOneAndUpdate(
      { postId: postId },
      updateData.postDetail,
      { new: true },
    );

    if (!updatedPostDetail) {
      return response
        .status(404)
        .json({ message: 'PostDetail not found!', error: true });
    }

    response
      .status(200)
      .json({ updatedPost, updatedPostDetail, success: true });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: 'Failed to update post!', error: true });
  }
}

// async function deletePost(request, response) {
//   const _id = request.params.id;
//   const tokenUserId = request.userId;
//   try {
//     //Check userId/owner of post
//     const post = await Models.Post.findById(_id);
//     if (post.userId.toString() !== tokenUserId) {
//       return response
//         .status(403)
//         .json({ message: 'Not Authorized!', error: true });
//     }
//     await Models.Post.findByIdAndDelete(_id);
//     response.status(200).json({ message: 'Post deleted', success: true });
//   } catch (error) {
//     console.log(error);
//     response
//       .status(500)
//       .json({ message: 'Failed to delete post!', error: true });
//   }
// }

async function deletePost(request, response) {
  const _id = request.params.id;
  const tokenUserId = request.userId;
  console.log('Token User:', tokenUserId);
  const isAdmin = request.user?.role === 'admin';
  console.log('Is Admin:', isAdmin);

  try {
    // Fetch the post from the database
    const post = await Models.Post.findById(_id);
    if (!post) {
      return response
        .status(404)
        .json({ message: 'Post not found!', error: true });
    }
    // Check if the user is the owner of the post or an admin
    if (post.userId.toString() !== tokenUserId && !isAdmin) {
      return response.status(403).json({
        message:
          'Access denied. You do not have permission to delete this post.',
        error: true,
      });
    }

    // Delete the post
    await Models.Post.findByIdAndDelete(_id);
    response
      .status(200)
      .json({ message: 'Post deleted successfully!', success: true });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: 'Failed to delete post!', error: true });
  }
}

async function getLatestPost(request, response) {
  try {
    const latestPosts = await Models.Post.find()
      .populate('postDetailId', 'images ')
      .populate('userId', 'avatar name')
      .sort({ createdAt: -1 })
      .limit(10); //Limit 10 post could render
    response.status(200).json({ posts: latestPosts, success: true });
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    response.status(500).json({ error: 'Failed to fetch latest posts' });
  }
}

module.exports = {
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
  getLatestPost,
};
