const express = require('express');
const cors = require('cors');
require('dotenv').config();
const postRoute = require('./routes/postRoute.js');
const authRoute = require('./routes/authRoute.js');
const testRoute = require('./routes/testRoute.js');
const userRoute = require('./routes/userRoute.js');
const favoriteRoute = require('./routes/favoriteRoute.js');
const cookiesParser = require('cookie-parser');
const connectDB = require('./config/connectDB');

const app = express();

const allowedOrigins = [
  process.env.CLIENT_FRONTEND_URL,
  process.env.ADMIN_FRONTEND_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookiesParser());

const PORT = process.env.PORT || 5000;

//api customer endpoints
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/test', testRoute);
app.use('/api/favorites', favoriteRoute);

//api admin endpoints
app.use('/api/admin/posts', postRoute);
// app.use('/api/admin/posts', postRoute);
// app.use('/api/admin/posts', postRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
