const express = require('express');
const cors = require('cors');
require('dotenv').config();
const postRoute = require('./routes/postRoute.js');
const authRoute = require('./routes/authRoute.js');
const testRoute = require('./routes/testRoute.js');
const userRoute = require('./routes/userRoute.js');
const favoriteRoute = require('./routes/favoriteRoute.js');
const newsRoute = require('./routes/newsRoute.js');
const adminRoute = require('./routes/adminRoute.js');
const cookiesParser = require('cookie-parser');
const connectDB = require('./config/connectDB');

const app = express();

const allowedOrigins = [
  'https://kimdienhomes.onrender.com',
  'https://kimdienhomes-admin.onrender.com',
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

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookiesParser());

const port = process.env.PORT || 4000;

//api customer endpoints
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/test', testRoute);
app.use('/api/favorites', favoriteRoute);
app.use('/api/news', newsRoute);

//api admin endpoints
app.use('/api/admin/posts', postRoute);
app.use('/api/admin/users', userRoute);
app.use('/api/admin/news', newsRoute);
app.use('/api/admin', adminRoute);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
