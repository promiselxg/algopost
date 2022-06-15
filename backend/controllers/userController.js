const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const User = require('../models/userModel');
const Ads = require('../models/adsModel');
const ROLES = require('../utils/roles');
const { cloudinary } = require('../utils/cloudinary');

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
      generateCookieResponse(200, res, user.id, ROLES.user);
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
  const { email, password } = req.body;

  //  check user credentials
  if (!email || !password) {
    res.status(400);
    throw new Error('Please enter your email or password');
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const roles = Object.values(user.role);
    generateCookieResponse(200, res, user.id, roles);
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

//@desc     GET all registered users / verified accounts / unverified accounts
//@route    GET /api/auth/users
//@access   Private
const registeredUsers = asyncHandler(async (req, res) => {
  const query = req.query.activated;
  try {
    //  check if activated query is provided
    if (query) {
      //  select all email activated[true/false] except admin
      const allUsers = await User.find({
        activated: query,
        role: { $ne: ROLES.admin },
      })
        .sort({ _id: -1 })
        .select('-__v -password');
      if (allUsers) {
        res.status(200).json({ count: allUsers.length, users: allUsers });
      }
    } else {
      //  select all users except admin
      const allUsers = await User.find({ role: { $ne: ROLES.admin } })
        .sort({ _id: -1 })
        .select('-__v -password');
      if (allUsers) {
        res.status(200).json({ count: allUsers.length, users: allUsers });
      }
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

//@desc     Upload Ad
//@route    POST /api/auth/upload
//@access   Private
const uploadImage = asyncHandler(async (req, res) => {
  const { url } = req.body;
  try {
    if (req.file.filename.toString() !== '') {
      if (req.file.size > process.env.IMAGE_MAX_SIZE) {
        res.status(400);
        throw new Error('image too big');
      }
      // upload image to cloudinary
      const fileStr = req.file.path;
      const uploadImageResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: 'ads',
      });
      if (!uploadImageResponse) {
        res.status(400);
        throw new Error('Image upload failed');
      } else {
        //  poplutate db
        const newAd = await Ads.create({
          user_id: req.user.id,
          url,
          image_url: uploadImageResponse.secure_url,
          image_id: uploadImageResponse.public_id.split('/')[1],
        });
        if (newAd) {
          res.status(201).json({
            status: true,
            message: 'Ad uploaded successfully.',
          });
        }
      }
      // res.status(200).json(req.file);
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//  Get token from Model and create cookie
const generateCookieResponse = (statusCode, res, userId, userRole) => {
  const token = generateToken(userId, userRole);
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};

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
  uploadImage,
};
