const express = require('express');
const { verifyUserToken, verifyAdminToken } = require('../middleware/verifyToken');
const {
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
  getLatestPost,
  getTopProvinces,
  getPopularPosts,
} = require('../controllers/PostController.js');

const router = express.Router();

// Customer routes
router.get('/latest-posts', getLatestPost);
router.get('/top-provinces', getTopProvinces);
router.get('/popular', getPopularPosts);
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', verifyUserToken, addPost);
router.put('/:id', verifyUserToken, updatePost);
router.delete('/:id', verifyUserToken, deletePost);

// Admin routes
router.get('/', verifyAdminToken, getPosts);
router.get('/:id', verifyAdminToken, getPost);
// router.post('/add-post', verifyAdminToken, addPost);
router.put('/:id', verifyAdminToken, updatePost);
router.delete('/:id', verifyAdminToken, deletePost);

module.exports = router;
