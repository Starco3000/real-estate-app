const express = require('express');
const { verifyAdminToken } = require('../middleware/verifyToken');
const { updateAdmin } = require('../controllers/AdminController');

const router = express.Router();

router.put('/:id', verifyAdminToken, updateAdmin);

module.exports = router;
