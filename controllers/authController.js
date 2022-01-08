import ErrorResponse from "../utilis/ErrorResponse.js";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/User.js";

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

  // Create token
  const token = user.getSignedJwtToken();

  res.status(201).json({
    success: true,
    token,
  });
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

  // Create token
  const token = user.getSignedJwtToken();

  res.status(201).json({
    success: true,
    token,
  });
});
