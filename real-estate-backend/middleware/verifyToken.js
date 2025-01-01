const jwt = require('jsonwebtoken');
const Models = require('../models/Models');

// const verifyToken = (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) return res.status(401).json({ message: 'Not Authenticated!' });

//   jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
//     if (err) return res.status(403).json({ message: 'Token is not Valid!' });
//     req.userId = payload.id;

//     next();
//   });
// };

const verifyUserToken = (req, res, next) => {
  const token = req.cookies.userToken || req.headers['x-user-token'];
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Not Authenticated!' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      console.log('Token verification failed:', err);
      return res.status(403).json({ message: 'Token is not Valid!' });
    }
    req.userId = payload.id; // Set the req.user object with the payload from the token
    req.userRole = payload.role; // Set the req.userRole object with the role from the token
    next();
  });
};

const verifyAdminToken = async (req, res, next) => {
  const token = req.cookies.adminToken || req.headers['x-admin-token'];
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Not Authenticated!' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) {
      console.log('Token verification failed:', err);
      return res.status(403).json({ message: 'Token is not Valid!' });
    }
    try {
      const admin = await Models.Admin.findById(payload?.id);
      if (!admin) {
        console.log('Admin not found:', payload.id);
        return res.status(404).json({ message: 'Admin not found!' });
      }
      req.userId = admin.id; // Set the req.user object
      req.userRole = admin.role; // Set the req.userRole object
      next();
    } catch (error) {
      console.log('Error fetching admin:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });
};

module.exports = { verifyUserToken, verifyAdminToken };
