const express = require('express');
const { verifyToken, verifyAdminToken } = require('../middleware/verifyToken');
const {
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
  getLatestPost,
  getTopProvinces,
} = require('../controllers/PostController.js');

const router = express.Router();

// Customer routes
router.get('/latest-posts', getLatestPost);
router.get('/top-provinces', getTopProvinces);
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', verifyToken, addPost);
router.put('/:id', verifyToken, updatePost);
router.delete('/:id', verifyToken, deletePost);

// Admin routes
router.get('/', verifyAdminToken, getPosts);
router.get('/:id', verifyAdminToken, getPost);
// router.post('/', verifyAdminToken, addPost);
router.put('/:id', verifyAdminToken, updatePost);
router.delete('/:id', verifyAdminToken, deletePost);

module.exports = router;
