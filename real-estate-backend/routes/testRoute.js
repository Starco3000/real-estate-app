const express = require('express');
const {
  shouldBeLoggedIn,
  shouldBeAdmin,
} = require('../controllers/TestController.js');
const { verifyUserToken } = require('../middleware/verifyToken.js');

const router = express.Router();

router.get('/should-be-logged-in', verifyUserToken, shouldBeLoggedIn);

router.get('/should-be-admin', shouldBeAdmin);

module.exports = router;
