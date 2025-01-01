const express = require('express');
const { verifyUserToken, verifyAdminToken } = require('../middleware/verifyToken');
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  userPostsForUser,
  userPostsForAdmin,
} = require('../controllers/UserController');

const router = express.Router();

//Customer
router.get('/:id', verifyUserToken, getUser);
router.put('/:id', verifyUserToken, updateUser);
router.delete('/:id', verifyUserToken, deleteUser);
router.get('/posts/userPosts', verifyUserToken, userPostsForUser);

//Admin
router.get('/', verifyAdminToken, getUsers);
router.get('/user/:id', verifyAdminToken, getUser);
router.put('/update-user/:id', verifyAdminToken, updateUser);
router.delete('/user/:id', verifyAdminToken, deleteUser);
router.get('/user/:id/posts', verifyAdminToken, userPostsForAdmin);

module.exports = router;
