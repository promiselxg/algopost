const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errorHandler } = require('./backend/middleware/errorMiddleware');
const connectDB = require('./backend/config/db');
const PORT = process.env.PORT || 5000;

// DB connection
connectDB();
//  initialize app
const app = express();
//  accept form data
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//  mount routes
app.use('/api/coins', require('./backend/routes/coinRoutes'));
app.use('/api/auth', require('./backend/routes/authRoutes'));
//  404 route
app.use('*', (req, res) =>
  res.status(404).json({ message: 'The requested route does not exist' })
);
//  custom error handler
app.use(errorHandler);
//  server conncetion
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
