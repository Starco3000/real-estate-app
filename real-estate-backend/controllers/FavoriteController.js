const mongoose = require('mongoose');
const Models = require('../models/Models');

async function getFavorites(request, response) {
  const userId = request.userId;

  try {
    const favorites = await Models.Favorite.find({ userId }).populate('postId');
    const favoriteCount = favorites.length;
    response.status(200).json({ favorites, favoriteCount, success: true });
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
     const existingFavorite = await Models.Favorite.findOne({ tokenUserId, postId });
     if (existingFavorite) {
       return response.status(400).json({ message: 'Post is already in favorites!', success: false });
     }
    const favorite = new Models.Favorite({
      _id: new mongoose.Types.ObjectId(),
      userId: tokenUserId,
      postId
    });
    await favorite.save();
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
