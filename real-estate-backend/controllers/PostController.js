const mongoose = require('mongoose');
const Models = require('../models/Models');

// async function getPosts(request, response) {
//   try {
//     const {
//       status,
//       address,
//       province,
//       district,
//       ward,
//       type,
//       bedroom,
//       direction,
//       minPrice,
//       maxPrice,
//       size,
//       page = 1,
//       pageSize = 10,
//     } = request.query;

//     const minPriceNum = minPrice ? Number(minPrice) : null;
//     const maxPriceNum = maxPrice ? Number(maxPrice) : null;

//     // Build the query object based on the provided parameters
//     const query = {
//       ...(status && { status }),
//       ...(address && { address: { $regex: address, $options: 'i' } }),
//       ...(province && { province }),
//       ...(district && { district }),
//       ...(ward && { ward }),
//       ...(type && { type }),
//       ...(bedroom && { bedroom }),
//       ...(direction && { direction }),
//       ...(size && { size }),
//       ...(minPriceNum !== null &&
//         maxPriceNum !== null && {
//           price: {
//             $gte: minPriceNum || undefined,
//             $lte: maxPriceNum || undefined,
//           },
//         }),
//     };

//     console.log('Query:', minPriceNum, maxPriceNum, query);

//     // Calculate skip and limit values for pagination
//     const skip = (page - 1) * pageSize;
//     const limit = parseInt(pageSize);

//     // Fetch the total number of posts matching the query
//     const totalPosts = await Models.Post.countDocuments(query);

//     // Fetch the posts with pagination
//     const posts = await Models.Post.find(query)
//       .populate('postDetailId')
//       .skip(skip)
//       .limit(limit);

//     // Calculate the total number of pages
//     const totalPages = Math.ceil(totalPosts / pageSize);

//     // Return the posts and total pages to the client
//     response.status(200).json({
//       posts,
//       totalPages,
//       success: true,
//     });
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//     response.status(500).json({ message: 'Failed to get posts!', error: true });
//   }
// }

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
      minPrice,
      maxPrice,
      minSize,
      maxSize,
      page = 1,
      pageSize = 10,
    } = request.query;

    // Convert minPrice and maxPrice to numbers
    const minPriceNum = minPrice ? Number(minPrice) : null;
    const maxPriceNum = maxPrice ? Number(maxPrice) : null;
    const minSizeNum = minSize ? Number(minSize) : null;
    const maxSizeNum = maxSize ? Number(maxSize) : null;

    // Build the query object based on the provided parameters
    const query = {
      ...(status && { status }),
      ...(address && { address: { $regex: address, $options: 'i' } }),
      ...(province && { province }),
      ...(district && { district }),
      ...(ward && { ward }),
      ...(type && { type }),
      ...(direction && { direction }),
    };

    // Add price range to the query if minPrice or maxPrice are provided
    if (minPriceNum !== null || maxPriceNum !== null) {
      query.price = {};
      if (minPriceNum !== null) {
        query.price.$gte = minPriceNum;
      }
      if (maxPriceNum !== null) {
        query.price.$lte = maxPriceNum;
      }
    } else if (minPrice === undefined && maxPrice === undefined) {
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

    // console.log('Request Query:', request.query);
    // console.log('Constructed Query:', query);

    // Calculate skip and limit values for pagination
    const skip = (page - 1) * pageSize;
    const limit = parseInt(pageSize);

    // Fetch the total number of posts matching the query
    const totalPosts = await Models.Post.countDocuments(query);

    // Fetch the posts with pagination
    const posts = await Models.Post.find(query)
      .populate('postDetailId')
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
      .populate('postDetailId')
      .populate({
        path: 'userId',
        select: {
          avatar: true,
          phone: true,
          name: true,
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
      postDetailId: postDetail._id
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

async function getLatestPost(request, response) {
  try {
    const latestPosts = await Models.Post.find()
      .populate({
        path: 'userId',
        select: {
          avatar: true,
          name: true,
        },
      })
      .sort({ createdAt: -1 })
      .limit(10); //Limit 10 post could render
    response.status(200).json({
      posts: latestPosts,
      success: true,
    });
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
