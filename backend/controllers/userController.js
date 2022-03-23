const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const User = require('../model/userModel');

//@desc     Register User
//@route    GET /api/auth
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
  //  accept incoming variable
  const { username, firstname, lastname, email, password, confirm_password } =
    req.body;
  //  validate incoming variables
  if (!firstname || !username || !email || !password || !confirm_password) {
    res.status(400);
    throw new Error('Please fill out the required fields.');
  }
  //  check if passwords match
  if (password != confirm_password) {
    res.status(400);
    throw new Error('Password Mismatch');
  }
  //  check if user already exist
  const userExist = await User.findOne({ $or: [{ email }, { username }] });
  if (userExist) {
    res.status(400);
    throw new Error('Username or Email address already exist.');
  }
  //  hash user password
  const salt = await bcrypt.genSalt(10);
  const hasedPassword = await bcrypt.hash(password, salt);

  //  create new user
  const user = await User.create({
    username,
    firstname,
    lastname,
    email,
    password: hasedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
    });
  } else {
    res.status(400);
    throw new Error('Inavlid Credentials');
  }

  res.status(200).json({ message: 'Register User' });
});

//@desc     Login User
//@route    GET /api/auth
//@access   Public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200);
    res.json({
      _id: user.id,
      username: user.username,
    });
  } else {
    res.status(400);
    throw new Error('Inavlid Credentials');
  }
});
//  export controllers
module.exports = {
  registerUser,
  loginUser,
};
