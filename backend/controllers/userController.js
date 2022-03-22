const asyncHandler = require('express-async-handler');

//@desc     Register User
//@route    GET /api/auth
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Register User' });
});

module.exports = {
  registerUser,
};
