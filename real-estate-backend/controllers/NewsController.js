const mongoose = require('mongoose');
const Models = require('../models/Models');

async function getNews(request, response) {
  try {
    const { keyword, page = 1, pageSize = 10 } = request.query;
    const query = {};
    console.log(request.query);
    if (keyword) {
      query.$or = [{ title: { $regex: keyword, $options: 'i' } }];
    }
    // Calculate skip and limit values for pagination
    const skip = (page - 1) * pageSize;
    const limit = parseInt(pageSize);

    // Fetch the total number of news matching the query
    // const totalNews = await Models.News.countDocuments(query);

    // Fetch the news with pagination
    const news = await Models.News.find(query)
      .populate('authorId', 'name avatar')
      .skip(skip)
      .limit(limit);

    // Calculate the total number of pages
    const totalPages = Math.ceil(news.length / pageSize);

    // Return the news and total pages to the frontend

    response.status(200).json({
      news,
      totalNews: news.length,
      totalPages,
      success: true,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: 'Failed to get news!', error: true });
  }
}

async function getSingleNews(request, response) {
  const newsId = request.params.id;
  try {
    // Find the news article by ID and increment the views field
    const news = await Models.News.findByIdAndUpdate(
      newsId,
      { $inc: { views: 1 } },
      { new: true },
    ).populate('authorId', 'name avatar');

    if (!news) {
      return response
        .status(404)
        .json({ message: 'News not found!', error: true });
    }

    response.status(200).json({ news, success: true });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: 'Failed to get news!', error: true });
  }
}

async function addNews(request, response) {
  const { title, thumbnail, description } = request.body;
  const authorId = request.userId;

  try {
    // Validate required fields
    if (!title || !thumbnail || !description) {
      return response
        .status(400)
        .json({ message: 'All fields are required', success: false });
    }

    // Check if a news item with the same title already exists
    const existingNews = await Models.News.findOne({ title: title });
    if (existingNews) {
      return response
        .status(400)
        .json({ message: 'News title already exists', success: false });
    }

    const news = await Models.News.create({
      _id: new mongoose.Types.ObjectId(),
      title,
      thumbnail,
      description,
      authorId,
    });

    await news.save();
    console.log('News:', news);
    response.status(201).json({ message: 'News added!', news, success: true });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: 'Failed to add news!', error: true });
  }
}

async function updateNews(request, response) {
  try {
    const newsId = request.params.id;
    const updateData = request.body;

    const updateNews = await Models.News.findByIdAndUpdate(newsId, updateData, {
      new: true,
    });
    response
      .status(200)
      .json({ updateNews, message: 'News updated!', success: true });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: 'Failed to update news!', error: true });
  }
}

async function deleteNews(request, response) {
  const newsId = request.params.id;
  const authorId = request.userId;
  try {
    const news = await Models.News.findById(newsId);
    if (!news) {
      return response
        .status(404)
        .json({ message: 'News not found!', error: true });
    }

    if (news.authorId.toString() !== authorId) {
      return response
        .status(403)
        .json({ message: 'You are not authorized!', error: true });
    }

    await Models.News.findByIdAndDelete(newsId);
    response.status(200).json({ message: 'News deleted!', success: true });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: 'Failed to update news!', error: true });
  }
}

async function getLatestNews(request, response) {
  try {
    const news = await Models.News.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('authorId', 'name');
    response.status(200).json({ news, success: true });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: 'Failed to update news!', error: true });
  }
}

async function getMostViewedNews(request, response) {
  try {
    const news = await Models.News.find()
      .sort({ views: -1 })
      .limit(5)
      .populate('authorId', 'name');
    response.status(200).json({ news, success: true });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: 'Failed to fetch most viewed news!', error: true });
  }
}

module.exports = {
  getNews,
  getSingleNews,
  addNews,
  updateNews,
  deleteNews,
  getLatestNews,
  getMostViewedNews,
};
