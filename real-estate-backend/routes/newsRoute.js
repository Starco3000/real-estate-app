const express = require('express');
const { verifyAdminToken } = require('../middleware/verifyToken');
const {
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
  getLatestPost,
} = require('../controllers/PostController.js');

const router = express.Router();

router.get('/latest-posts', getLatestPost);
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', verifyAdminToken, addPost);
router.put('/:id', verifyAdminToken, updatePost);
router.delete('/:id', verifyAdminToken, deletePost);

module.exports = router;
