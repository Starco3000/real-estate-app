const express = require('express');
const {
  shouldBeLoggedIn,
  shouldBeAdmin,
} = require('../controllers/TestController.js');
const { verifyToken } = require('../middleware/verifyToken.js');

const router = express.Router();

router.get('/should-be-logged-in', verifyToken, shouldBeLoggedIn);

router.get('/should-be-admin', shouldBeAdmin);

module.exports = router;
