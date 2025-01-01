const express = require('express');
const { verifyAdminToken } = require('../middleware/verifyToken');
const {
  getNews,
  getSingleNews,
  addNews,
  updateNews,
  deleteNews,
  getLatestNews,
  getMostViewedNews,
} = require('../controllers/NewsController.js');

const router = express.Router();


//Admin
router.get('/all-news', verifyAdminToken, getNews);
router.get('/single-news/:id', verifyAdminToken, getSingleNews);
router.post('/add-news', verifyAdminToken, addNews);
router.put('/update-news/:id', verifyAdminToken, updateNews);
router.delete('/delete-news/:id', verifyAdminToken, deleteNews);

//Customer
router.get('/latest-news', getLatestNews);
router.get('/most-viewed-news', getMostViewedNews);
router.get('/', getNews);
router.get('/:id', getSingleNews);
module.exports = router;
