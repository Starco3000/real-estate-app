const Models = require('../models/Models');
const bcryptjs = require('bcryptjs');

async function getUsers(request, response) {
  try {
    const { keyword, page = 1, limit = 20 } = request.query;

    const query = {};
    if (keyword) {
      query.$or = [
        { email: { $regex: keyword, $options: 'i' } },
        { name: { $regex: keyword, $options: 'i' } },
        { phone: { $regex: keyword, $options: 'i' } },
      ];
    }

    const users = await Models.User.find(query)
      .populate({
        path: 'posts',
        populate: {
          path: 'postDetailId',
          model: 'PostDetail',
        },
      })
      .populate('favorites')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    // console.log('Users:', users);
    // Lặp qua từng user và đếm số lượng bài post của họ
    const usersWithPostCount = await Promise.all(
      users.map(async (user) => {
        const postCount = await Models.Post.countDocuments({
          userId: user._id,
        });
        return {
          ...user.toObject(),
          totalPosts: postCount,
        };
      }),
    );

    const totalUsers = await Models.User.countDocuments(query);

    response.status(200).json({
      users: usersWithPostCount,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: parseInt(page),
      success: true,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: 'Failed to get users!', error: true });
  }
}

async function getUser(request, response) {
  const _id = request.params.id;
  try {
    const user = await Models.User.findById(_id);
    response.status(200).json({ user, success: true });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: 'Failed to get user!', error: true });
  }
}

async function updateUser(request, response) {
  const _id = request.params.id;
  const tokenUserId = request.userId;
  const { password, avatar, ...inputs } = request.body;

  if (_id !== tokenUserId) {
    return response
      .status(403)
      .json({ message: 'Not Authorized!', error: true });
  }

  let updateNewPassword = null;
  try {
    if (password) {
      updateNewPassword = await bcryptjs.hash(password, 10);
    }
    const updateUser = await Models.User.findByIdAndUpdate(
      _id,
      {
        ...inputs,
        ...(updateNewPassword && { password: updateNewPassword }),
        ...(avatar && { avatar }),
      },
      { new: true },
    );

    const { password: userPassword, ...user } = updateUser.toObject();

    response
      .status(200)
      .json({ message: 'User update success', user, success: true });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: 'Failed to update user!', error: true });
  }
}

// async function deleteUser(request, response) {
//   const _id = request.params.id;
//   const tokenUserId = request.userId;
//   if (_id !== tokenUserId) {
//     return response
//       .status(403)
//       .json({ message: 'Not Authorized!', error: true });
//   }
//   try {
//     await Models.User.findByIdAndDelete(_id);
//     response.status(200).json({ message: 'User deleted', success: true });
//   } catch (error) {
//     console.log(error);
//     response
//       .status(500)
//       .json({ message: 'Failed to delete user!', error: true });
//   }
// }

async function deleteUser(request, response) {
  const _id = request.params.id;
  const tokenUserId = request.userId;
  const tokenUserRole = request.userRole;
  console.log('Token User RoleRole:', tokenUserRole);
  console.log('Token User id:', tokenUserId);

  // Check if the user is either the account owner or an admin
  if (_id !== tokenUserId && tokenUserRole !== 'admin') {
    return response
      .status(403)
      .json({ message: 'Not Authorized!', error: true });
  }

  try {
    // Find all posts created by the user
    const posts = await Models.Post.find({ userId: _id });

    // Delete the postDetail of each post
    await Promise.all(
      posts.map(async (post) => {
        await Models.PostDetail.findByIdAndDelete(post.postDetailId);
      }),
    );

    // Delete all posts created by the user
    await Models.Post.deleteMany({ userId: _id });

    //Delete images from cloudinary
    const images = posts.map((post) => post.postDetailId.images).flat();
    images.forEach((image) => {
      const publicId = image.split('/').pop().split('.')[0];
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          console.log('Error deleting image:', error);
        }
        console.log('Image deleted:', result);
      });
    });

    // Delete the user's favorites
    await Models.Favorite.deleteMany({ userId: _id });

    // Delete the user account
    await Models.User.findByIdAndDelete(_id);

    response
      .status(200)
      .json({ message: 'User and their posts deleted', success: true });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: 'Failed to delete user and their posts!', error: true });
  }
}

// async function userPosts(request, response) {
//   const tokenUserId = request.userId;
//   const tokenUserRole = request.userRole;
//   const userId = tokenUserRole === 'admin' ? request.params.id : tokenUserId;

//   console.log('tokenUserId:', tokenUserId);
//   console.log('Token User Role:', tokenUserRole);
//   console.log('User ID:', userId);
//   try {
//     const {
//       status,
//       province,
//       district,
//       ward,
//       type,
//       keyword,
//       page = 1,
//       pageSize = 10,
//     } = request.query;

//     const query = { userId };
//     if (status) query.status = status;
//     if (province) query.province = province;
//     if (district) query.district = district;
//     if (ward) query.ward = ward;
//     if (type) query.type = type;
//     if (keyword) {
//       query.$or = [
//         { title: { $regex: keyword, $options: 'i' } },
//         { address: { $regex: keyword, $options: 'i' } },
//         { province: { $regex: keyword, $options: 'i' } },
//         { district: { $regex: keyword, $options: 'i' } },
//         { ward: { $regex: keyword, $options: 'i' } },
//         { type: { $regex: keyword, $options: 'i' } },
//         { status: { $regex: keyword, $options: 'i' } },
//         { direction: { $regex: keyword, $options: 'i' } },
//       ];
//     }

//     // Calculate skip and limit values for pagination
//     const skip = (page - 1) * pageSize;
//     const limit = parseInt(pageSize);

//     // Fetch the total number of posts matching the query
//     const totalPosts = await Models.Post.countDocuments(query);

//     // Fetch the posts with pagination
//     const posts = await Models.Post.find(query)
//       .populate('postDetailId', 'description images')
//       .populate('userId', 'avatar name phone')
//       .skip(skip)
//       .limit(limit);

//     // Calculate the total number of page
//     const totalPages = Math.ceil(totalPosts / pageSize);

//     response.status(200).json({
//       posts,
//       totalPages,
//       totalPosts,
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//     response
//       .status(500)
//       .json({ message: 'Failed to get user posts!', error: true });
//   }
// }

// async function userPosts(request, response) {
//   const tokenUserId = request.userId;
//   const tokenUserRole = request.userRole;
//   const specifiedUserId = request.params.id;

//   console.log('tokenUserId:', tokenUserId);
//   console.log('Token User Role:', tokenUserRole);
//   console.log('Specified User ID:', specifiedUserId);

//   try {
//     const {
//       status,
//       province,
//       district,
//       ward,
//       type,
//       keyword,
//       page = 1,
//       pageSize = 10,
//     } = request.query;

//     // Build the query object
//     const query = {
//       $or: [
//         { userId: tokenUserId },
//         ...(tokenUserRole === 'admin' && specifiedUserId
//           ? [{ userId: specifiedUserId }]
//           : []),
//       ],
//     };

//     if (status) query.status = status;
//     if (province) query.province = province;
//     if (district) query.district = district;
//     if (ward) query.ward = ward;
//     if (type) query.type = type;
//     if (keyword) {
//       query.$or.push(
//         { title: { $regex: keyword, $options: 'i' } },
//         { address: { $regex: keyword, $options: 'i' } },
//         { province: { $regex: keyword, $options: 'i' } },
//         { district: { $regex: keyword, $options: 'i' } },
//         { ward: { $regex: keyword, $options: 'i' } },
//         { type: { $regex: keyword, $options: 'i' } },
//         { status: { $regex: keyword, $options: 'i' } },
//         { direction: { $regex: keyword, $options: 'i' } },
//       );
//     }

//     // Calculate skip and limit values for pagination
//     const skip = (page - 1) * pageSize;
//     const limit = parseInt(pageSize);

//     // Fetch the total number of posts matching the query
//     const totalPosts = await Models.Post.countDocuments(query);

//     // Fetch the posts with pagination
//     const posts = await Models.Post.find(query)
//       .populate('postDetailId', 'description images')
//       .populate('userId', 'avatar name phone')
//       .skip(skip)
//       .limit(limit);

//     // Calculate the total number of pages
//     const totalPages = Math.ceil(totalPosts / pageSize);

//     response.status(200).json({
//       posts,
//       totalPages,
//       totalPosts,
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//     response
//       .status(500)
//       .json({ message: 'Failed to get user posts!', error: true });
//   }
// }
async function userPostsForUser(request, response) {
  const tokenUserId = request.userId;

  console.log('tokenUserId:', tokenUserId);

  try {
    const {
      status,
      province,
      district,
      ward,
      type,
      keyword,
      page = 1,
      pageSize = 10,
    } = request.query;

    // Build the query object
    const query = { userId: tokenUserId };

    if (status) query.status = status;
    if (province) query.province = province;
    if (district) query.district = district;
    if (ward) query.ward = ward;
    if (type) query.type = type;
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

    // Calculate skip and limit values for pagination
    const skip = (page - 1) * pageSize;
    const limit = parseInt(pageSize);

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

    response.status(200).json({
      posts,
      totalPages,
      totalPosts,
      success: true,
    });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: 'Failed to get user posts!', error: true });
  }
}

async function userPostsForAdmin(request, response) {
  const specifiedUserId = request.params.id;

  console.log('Specified User ID:', specifiedUserId);

  try {
    const { keyword, page = 1, pageSize = 10 } = request.query;

    // Build the query object
    const query = { userId: specifiedUserId };
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

    // Calculate skip and limit values for pagination
    const skip = (page - 1) * pageSize;
    const limit = parseInt(pageSize);

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

    response.status(200).json({
      posts,
      totalPages,
      totalPosts,
      success: true,
    });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: 'Failed to get user posts!', error: true });
  }
}

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  // userPosts,
  userPostsForUser,
  userPostsForAdmin,
};
