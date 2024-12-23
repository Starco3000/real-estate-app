const express = require('express');
const { verifyToken, verifyAdminToken } = require('../middleware/verifyToken');
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  userPosts,
} = require('../controllers/UserController');

const router = express.Router();

//Customer
router.get('/', getUsers);
router.get('/:id', verifyToken, getUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);
router.get('/posts/userPosts', verifyToken, userPosts);

//Admin
router.get('/', verifyAdminToken, getUsers);
router.get('/:id', verifyAdminToken, getUser);
router.put('/:id', verifyAdminToken, updateUser);
router.delete('/:id', verifyAdminToken, deleteUser);
router.get('/:id/posts', verifyAdminToken, userPosts);

module.exports = router;
