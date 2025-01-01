const bcryptjs = require('bcryptjs');
const Models = require('../models/Models');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// User
async function register(request, response) {
  const { username, phone, email, password } = request.body;

  try {
    //Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    console.log(hashedPassword);

    //Create a new user
    const newUser = await Models.User.create({
      _id: new mongoose.Types.ObjectId(),
      username,
      phone,
      email,
      password: hashedPassword,
    });

    return response.status(201).json({
      message: 'User created successfully',
      data: newUser,
      success: true,
    });
  } catch (error) {
    console.error(error);
    let errorMessage = 'Internal server error';

    // Kiểm tra lỗi cụ thể và tùy chỉnh thông báo lỗi
    if (error.name === 'ValidationError') {
      errorMessage = '';
      for (let field in error.errors) {
        errorMessage += `${field} is required.`;
      }
    } else if (error.code === 11000) {
      errorMessage = '';
      if (error.keyPattern.email) {
        errorMessage += 'Email already exists.';
      }
      if (error.keyPattern.username) {
        errorMessage += 'Username already exists.';
      }
    }
    return response.status(500).json({
      message: errorMessage,
      error: true,
    });
  }
}

async function active(request, response) {
  console.log('Active endpoint');
}

async function login(request, response) {
  const { email, password } = request.body;
  try {
    //Check if the user already exists
    const user = await Models.User.findOne({ email });
    console.log(user);
    if (!user) {
      return response.status(401).json({
        message: 'Invalid Credentials',
        error: true,
      });
    }

    //Check if the password is correct
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return response.status(401).json({
        message: 'Invalid Credentials',
        error: true,
      });
    }

    //Generate a token and send it to the user
    const tokenExpriesIn = 1000 * 60 * 60 * 24 * 7; // 1 week
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: tokenExpriesIn,
      },
    );

    response
      .cookie('userToken', token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production', // Chỉ sử dụng thuộc tính Secure trong môi trường production
        sameSite: 'lax', // Bảo vệ chống lại CSRF
        maxAge: tokenExpriesIn,
      })
      .status(200)
      .json({ message: 'Login successful', success: true, token, user });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: 'Failed to login',
      error: true,
    });
  }
}

async function logout(request, response) {
  response
    .clearCookie('userToken')
    .status(200)
    .json({ message: 'Logout successful' });
}

// Admin
async function adminLogin(request, response) {
  const { username, password } = request.body;
  try {
    //Check if the user already exists
    const admin = await Models.Admin.findOne({ username });
    console.log('admin username check:', admin);
    if (!admin || !(await bcryptjs.compare(password, admin.password))) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });
    }

    //Generate a token and send it to the user
    const tokenExpriesIn = 1000 * 60 * 60 * 24 * 7; // 1 week
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: tokenExpriesIn,
      },
    );

    // Exclude password from the response
    const { password: _, ...adminWithoutPassword } = admin.toObject();

    response
      .cookie('adminToken', token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production', // Chỉ sử dụng thuộc tính Secure trong môi trường production
        sameSite: 'lax', // Bảo vệ chống lại CSRF
        maxAge: tokenExpriesIn,
      })
      .status(200)
      .json({
        message: 'Login successful',
        success: true,
        token,
        admin: adminWithoutPassword,
      });
  } catch (error) {
    console.log('there are error here:', error);
    return response.status(500).json({
      message: 'Failed to login',
      error: true,
    });
  }
}

async function adminLogout(request, response) {
  response
    .clearCookie('adminToken')
    .status(200)
    .json({ message: 'Logout successful' });
}


module.exports = { register, login, logout, adminLogin, adminLogout, active};
