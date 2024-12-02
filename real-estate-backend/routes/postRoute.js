const express = require('express');
const { verifyToken } = require('../middleware/verifyToken');
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

router.post('/', verifyToken, addPost);

router.put('/:id', verifyToken, updatePost);

router.delete('/:id', verifyToken, deletePost);

module.exports = router;
