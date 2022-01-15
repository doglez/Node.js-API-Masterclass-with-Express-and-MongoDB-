import ErrorResponse from "../utilis/ErrorResponse.js";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/User.js";
import sendEmail from "../utilis/sendEmail.js";
import crypto from "crypto";
// import dotenv from "dotenv";

// dotenv.config({ path: "./env" });

/**
 * Register User
 * @route POST /api/v1/auth/register
 * @access Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Create a user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  sendTokenResponse(user, 200, res);
});

/**
 * Login User
 * @route POST /api/v1/auth/login
 * @access Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return next(new ErrorResponse(`Please provide an email and password`, 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse(`Invalid credentials`, 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse(`Invalid credentials`, 401));
  }

  sendTokenResponse(user, 200, res);
});

/**
 * Log out User / clear cookie
 * @route GET /api/v1/auth/logout
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: true,
  });
});

/**
 * Get current logged in user
 * @route GET /api/v1/auth/me
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * Forgot password
 * @route POST /api/v1/auth/forgotpassword
 * @access Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse(`There is no user with that email`, 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/resetpassword/${resetToken}`;

  const message = `You are reciving this email beacause you (or some else) has requested the reset of password. Please make a PUT request to:\n\n${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message,
    });

    res.status(200).json({
      success: true,
      data: "Email sent",
    });
  } catch (error) {
    console.error(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse(`Email could not be sent`, 500));
  }
});

/**
 * Reset password
 * @route PUT /api/v1/auth/resetpassword/:resettoken
 * @access Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse(`Invalid token`, 400));
  }

  // Set new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendTokenResponse(user, 200, res);
});

/**
 * Update user details
 * @route PUT /api/v1/auth/updatedetails
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * Update password
 * @route PUT /api/v1/auth/updatepassword
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse(`Password is incorrect`, 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

/**
 * Get token from model, create cookie
 * @param {*} user
 * @param {*} statusCode
 * @param {*} res
 */
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};
