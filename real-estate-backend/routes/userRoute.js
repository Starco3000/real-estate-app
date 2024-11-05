const express = require('express');
const { verifyToken } = require('../middleware/verifyToken');
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/UserController');

const router = express.Router();

//Customer
router.get('/', getUsers);

router.get('/:id', verifyToken, getUser);

router.put('/:id', verifyToken, updateUser);

router.delete('/:id', verifyToken, deleteUser);

module.exports = router;
