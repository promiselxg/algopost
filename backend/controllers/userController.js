const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const User = require('../models/userModel');

//@desc     Register User
//@route    POST /api/auth
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
  const hashedPassword = await bcrypt.hash(password, salt);

  //  create new user
  const user = await User.create({
    username,
    firstname,
    lastname,
    email,
    password: hashedPassword,
    //token: generateToken(user._id, user.isAdmin),
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
});

//@desc     Login User
//@route    POST /api/auth
//@access   Public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  //  check user credentials
  if (!username || !password) {
    res.status(400);
    throw new Error('Please enter your username or password');
  }
  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200);
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id, user.isAdmin),
    });
  } else {
    res.status(400);
    throw new Error('Incorrect username or password.');
  }
});

//@desc     Get User Profile
//@route    POST /api/auth/
//@access   Private
const userProfile = asyncHandler(async (req, res) => {
  const { _id, username, email } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    username,
    email,
  });
});

//@desc     Update User Profile
//@route    PUT /api/auth/:id/update
//@access   Private
const updateProfile = asyncHandler(async (req, res) => {
  try {
    if (req.user.id === req.params.id) {
      //  check if user is changing his password
      if (req.body.password) {
        //  compare password
        if (req.body.password != req.body.confirm_password) {
          res.status(409);
          throw new Error('Password Mismatch');
        }
        //  check DB to know id user really exist
        if (!(await User.findById(req.params.id))) {
          res.status(403);
          throw new Error('Invalid user credentials');
        }
        //  hash user password
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      //  Update user info
      await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({ status: true, message: 'Updated successfully' });
    } else {
      res.status(401);
      throw new Error('Unauthorized access');
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//  Generate JWT
const generateToken = (id, isAdmin) => {
  return JWT.sign({ id, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

//  export controllers
module.exports = {
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
};
