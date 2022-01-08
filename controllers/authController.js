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

  res.status(201).json({
    success: true,
  });
});
