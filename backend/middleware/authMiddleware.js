const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

//  Verify user token
const verifyToken = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      //    Get token from header
      token = authHeader.split(' ')[1];
      //    Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //    Get user from the token
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(403);
      throw new Error('Unauthorized Access');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Unauthorized Access, Token required.');
  }
});

module.exports = {
  verifyToken,
};
