import ErrorResponse from "../utilis/ErrorResponse.js";
import Bootcamp from "../models/Bootcamp.js";
import asyncHandler from "../middleware/asyncHandler.js";

/**
 * Get all bootcamps
 * @route GET /api/v1/bootcamps
 * @access Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const index = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();

  return res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});

/**
 * Get just one bootcamp
 * @route GET /api/v1/bootcamps/:id
 * @access Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const show = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

/**
 * Create a bootcamp
 * @route POST /api/v1/bootcamps
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const store = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

/**
 * Update a bootcamp
 * @route PUT /api/v1/bootcamps/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const update = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

/**
 * Delete a bootcamp
 * @route DELETE /api/v1/bootcamps/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const destroy = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: bootcamp.value,
  });
});
