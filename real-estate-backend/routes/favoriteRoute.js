const express = require('express');
const { verifyToken } = require('../middleware/verifyToken');
const {
  addFavorite,
  removeFavorite,
  getFavorites,
} = require('../controllers/FavoriteController.js');

const router = express.Router();

router.get('/', verifyToken, getFavorites);
router.post('/:id', verifyToken, addFavorite);
router.delete('/:id', verifyToken, removeFavorite);

module.exports = router;
