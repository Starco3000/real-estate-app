const express = require('express');
const { verifyUserToken } = require('../middleware/verifyToken');
const {
  addFavorite,
  removeFavorite,
  getFavorites,
} = require('../controllers/FavoriteController.js');

const router = express.Router();

router.get('/', verifyUserToken, getFavorites);
router.post('/:id', verifyUserToken, addFavorite);
router.delete('/:id', verifyUserToken, removeFavorite);

module.exports = router;
