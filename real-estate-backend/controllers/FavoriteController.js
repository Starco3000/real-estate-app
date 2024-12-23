const mongoose = require('mongoose');
const Models = require('../models/Models');

async function getFavorites(request, response) {
  const tokenUserId = request.userId;

  try {
    const { keyword, page = 1, pageSize = 10 } = request.query;
    const query = { userId: tokenUserId };

    // Calculate skip and limit values for pagination
    const skip = (page - 1) * pageSize;
    const limit = parseInt(pageSize);

    // Fetch the total number of posts matching the query
    const totalPosts = await Models.Post.countDocuments(query);

    // Fetch the posts with pagination
    const favorites = await Models.Favorite.find(query)
      .populate({
        path: 'postId',
        populate: {
          path: 'postDetailId',
          select: 'images description',
        },
        match: {
          ...(keyword && {
            $or: [
              { title: { $regex: keyword, $options: 'i' } },
              { address: { $regex: keyword, $options: 'i' } },
              { province: { $regex: keyword, $options: 'i' } },
              { district: { $regex: keyword, $options: 'i' } },
              { ward: { $regex: keyword, $options: 'i' } },
              { type: { $regex: keyword, $options: 'i' } },
              { status: { $regex: keyword, $options: 'i' } },
              { direction: { $regex: keyword, $options: 'i' } },
            ],
          }),
        },
      })
      .skip(skip)
      .limit(limit);

    // Filter out favorites where postId is null due to match conditions
    const filteredFavorites = favorites.filter((fav) => fav.postId !== null);

    const favoriteCount = favorites.length;

    // Calculate the total number of page
    const totalPages = Math.ceil(totalPosts / pageSize);

    response.status(200).json({
      favorites: filteredFavorites,
      favoriteCount,
      totalPages,
      success: true,
    });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: 'Failed to get favorites!', error: true });
  }
}

async function addFavorite(request, response) {
  const postId = request.params.id;
  console.log('Add favorite:', postId);
  const tokenUserId = request.userId;

  if (!tokenUserId || !postId) {
    return response
      .status(400)
      .json({ message: 'userId and postId are required!', success: false });
  }

  try {
    // Check if the post is already in favorites to avoid duplicates
    const existingFavorite = await Models.Favorite.findOne({
      tokenUserId,
      postId,
    });
    if (existingFavorite) {
      return response
        .status(400)
        .json({ message: 'Post is already in favorites!', success: false });
    }
    const favorite = new Models.Favorite({
      _id: new mongoose.Types.ObjectId(),
      userId: tokenUserId,
      postId,
    });
    await favorite.save();

     // Update user's favorites in UserSchema
     await Models.User.findByIdAndUpdate(tokenUserId, {
      $push: { favorites: postId },
    });
    response
      .status(201)
      .json({ message: 'Post added to favorites!', success: true });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: 'Failed to add post to favorites!', error: true });
  }
}

async function removeFavorite(request, response) {
  const postId = request.params.id;
  const userId = request.userId;

  try {
    await Models.Favorite.findOneAndDelete({ userId, postId });
     // Update user's favorites in UserSchema
     await Models.User.findByIdAndUpdate(userId, {
      $pull: { favorites: postId },
    });
    response
      .status(200)
      .json({ message: 'Post removed from favorites!', success: true });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: 'Failed to remove post from favorites!', error: true });
  }
}

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
};
 