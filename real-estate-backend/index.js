const express = require('express');
const cors = require('cors');
require('dotenv').config();
const postRoute = require('./routes/postRoute.js');
const authRoute = require('./routes/authRoute.js');
const testRoute = require('./routes/testRoute.js');
const userRoute = require('./routes/userRoute.js');
const cookiesParser = require('cookie-parser');
const connectDB = require('./config/connectDB');

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookiesParser());

const PORT = process.env.PORT || 5000;

// app.get('/', (request, response) => {
//   response.json({ message: `Server running at ${PORT}` });
// });

//api endpoints
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/test', testRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
