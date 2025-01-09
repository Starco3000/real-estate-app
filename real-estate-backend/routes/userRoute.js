const express = require('express');
const {
  verifyUserToken,
  verifyAdminToken,
} = require('../middleware/verifyToken');
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  userPostsForUser,
  userPostsForAdmin,
  disableUser,
  enableUser,
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
router.put('/user/:id/disable', verifyAdminToken, disableUser);
router.put('/user/:id/enable', verifyAdminToken, enableUser);

module.exports = router;
