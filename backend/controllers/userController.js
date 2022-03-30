const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const User = require('../models/userModel');
const ROLES = require('../config/roles');
//@desc     Register User
//@route    POST /api/auth/register
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
  try {
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
      role: [ROLES.user],
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
  } catch (error) {
    res.status(401);
    throw new Error(error);
  }
});

//@desc     Login User
//@route    POST /api/auth/login
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
    const roles = Object.values(user.role);
    res.status(200);
    res.json({
      userInfo: {
        _id: user.id,
        username: user.username,
        email: user.email,
        role: roles,
        token: generateToken(user._id, roles),
      },
    });
  } else {
    res.status(400);
    throw new Error('Incorrect username or password.');
  }
});

//@desc     Get User Profile
//@route    POST /api/auth/profile
//@access   Private
const userProfile = asyncHandler(async (req, res) => {
  const { _id, username, email } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    username,
    email,
  });
});

//@desc     GET all registered users
//@route    GET /api/auth/users
//@access   Private
const registeredUsers = asyncHandler(async (req, res) => {
  try {
    //  select all users except admin
    const allUsers = await User.find({ role: { $ne: ROLES.admin } })
      .sort({ _id: -1 })
      .select('-__v -password');
    if (allUsers) {
      res.status(200).json({ count: allUsers.length, users: allUsers });
    }
  } catch (error) {
    throw new Error(error);
  }
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

//@desc     DELET User Profile
//@route    DELETE  /api/auth/users/:id
//@access   Private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error('Invalid User ID');
  }
  try {
    //  check if user exist in DB
    const userExist = await User.findById(id);
    if (!userExist) {
      res.status(401);
      throw new Error('Invalid User ID: User does not exist.');
    }
    //  check if user id is equal to logged in user OR if logged user is an Admin.
    if (req.user.id !== userExist.id && req.user.role[1] !== ROLES.admin) {
      res.status(401);
      throw new Error('Unauthorized Access!!!');
    }
    //  delete user account
    if (await User.findByIdAndDelete(id)) {
      res
        .status(200)
        .json({ status: 'success', message: 'account successfully removed' });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
//  Generate JWT
const generateToken = (id, role) => {
  return JWT.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

//  export controllers
module.exports = {
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
  registeredUsers,
  deleteUser,
};
