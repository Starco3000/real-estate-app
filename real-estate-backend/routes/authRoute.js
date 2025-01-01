const express = require('express');
const { register, login, logout, adminLogin, adminLogout } = require('../controllers/AuthController');

const router = express.Router();

//Customer
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);


//Admin
router.post('/admin/login', adminLogin);
router.post('/admin/logout', adminLogout);

module.exports = router;
