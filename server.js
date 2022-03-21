const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./backend/middleware/errorMiddleware');
const PORT = process.env.PORT || 5000;

//  initialize app
const app = express();
//  accept form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//  mount routes
app.use('/api/coins', require('./backend/routes/coinRoutes'));
//  custom error handler
app.use(errorHandler);
//  server conncetion
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
