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

const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Retrieve token from cookies or Authorization header

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Not Authenticated!' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      console.log('Token verification failed:', err);
      return res.status(403).json({ message: 'Token is not Valid!' });
    }
    req.user = payload; // Set the req.user object with the payload from the token
    next();
  });
};

const verifyAdminToken = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Retrieve token from cookies or Authorization header

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
      const admin = await Models.Admin.findById(payload._id);
      if (!admin) {
        console.log('Admin not found:', payload._id);
        return res.status(404).json({ message: 'Admin not found!' });
      }

      req.user = admin; // Set the req.user object
      next();
    } catch (error) {
      console.log('Error fetching admin:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });
};

module.exports = { verifyToken, verifyAdminToken };
