const Models = require('../models/Models');
const bcryptjs = require('bcryptjs');

async function getUsers(request, response) {
  try {
    const users = await Models.User.find()
      .populate({
        path: 'posts',
        populate: {
          path: 'postDetailId',
          model: 'PostDetail',
        },
      })
      .populate('favorites');
    console.log('Users:', users);
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

    response.status(200).json({ users: usersWithPostCount, success: true });
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

async function deleteUser(request, response) {
  const _id = request.params.id;
  const tokenUserId = request.userId;
  if (_id !== tokenUserId) {
    return response
      .status(403)
      .json({ message: 'Not Authorized!', error: true });
  }
  try {
    await Models.User.findByIdAndDelete(_id);
    response.status(200).json({ message: 'User deleted', success: true });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: 'Failed to delete user!', error: true });
  }
}

async function userPosts(request, response) {
  const tokenUserId = request.userId;
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

    // Calculate the total number of page
    const totalPages = Math.ceil(totalPosts / pageSize);

    response.status(200).json({
      posts,
      totalPages,
      success: true,
    });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: 'Failed to get user posts!', error: true });
  }
}

// async function userPostsByAdmin(request, response) {
//   try {
//     const userId = request.params._id;
//     console.log('User id:', userId);
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

//     response.status(200).json({ posts, totalPages, success: true, message: 'Call from userPostsByAdmin' });
//   } catch (error) {
//     console.log(error);
//     response
//       .status(500)
//       .json({ message: 'Failed to get user posts!', error: true });
//   }
// }
// async function userPostsByAdmin(request, response) {
//   try {
//     const userId = request.params.id;
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

//     const match = { userId: userId };
//     if (status) match.status = status;
//     if (province) match.province = province;
//     if (district) match.district = district;
//     if (ward) match.ward = ward;
//     if (type) match.type = type;
//     if (keyword) {
//       match.$or = [
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

//     const skip = (page - 1) * pageSize;
//     const limit = parseInt(pageSize);

//     const posts = await Models.Post.aggregate([
//       { $match: match },
//       { $skip: skip },
//       { $limit: limit },
//       {
//         $lookup: {
//           from: 'postdetails',
//           localField: 'postDetailId',
//           foreignField: '_id',
//           as: 'postDetailId',
//         },
//       },
//       { $unwind: '$postDetailId' },
//       {
//         $lookup: {
//           from: 'users',
//           localField: 'userId',
//           foreignField: '_id',
//           as: 'userId',
//         },
//       },
//       { $unwind: '$userId' },
//       {
//         $project: {
//           title: 1,
//           address: 1,
//           province: 1,
//           district: 1,
//           ward: 1,
//           type: 1,
//           status: 1,
//           direction: 1,
//           postDetailId: {
//             description: 1,
//             images: 1,
//           },
//           userId: {
//             avatar: 1,
//             name: 1,
//             phone: 1,
//           },
//         },
//       },
//     ]);

//     const totalPosts = await Models.Post.countDocuments(match);
//     const totalPages = Math.ceil(totalPosts / pageSize);

//     response
//       .status(200)
//       .json({
//         posts,
//         totalPages,
//         success: true,
//         message: 'Call from userPostsByAdmin',
//       });
//   } catch (error) {
//     console.log(error);
//     response
//       .status(500)
//       .json({ message: 'Failed to get user posts!', error: true });
//   }
// }

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  userPosts,
  // userPostsByAdmin,
};
