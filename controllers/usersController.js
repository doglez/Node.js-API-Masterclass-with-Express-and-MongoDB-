import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/User.js";
import ErrorResponse from "../utilis/ErrorResponse.js";

/**
 * Get all users
 * @route GET /api/v1/auth/users
 * @access Private/Admin
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const index = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

/**
 * Get single user
 * @route GET /api/v1/auth/users/:id
 * @access Private/Admin
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const show = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * Create user
 * @route POST /api/v1/auth/users
 * @access Private/Admin
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const store = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});

/**
 * Update user
 * @route PUT /api/v1/auth/users/:id
 * @access Private/Admin
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const update = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }

  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * Delete user
 * @route DELETE /api/v1/auth/users/:id
 * @access Private/Admin
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const destroy = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }

  await user.remove();

  res.status(200).json({
    success: true,
  });
});
