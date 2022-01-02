import ErrorResponse from "../utilis/ErrorResponse.js";
import Bootcamp from "../models/Bootcamp.js";
import asyncHandler from "../middleware/asyncHandler.js";
import geocoder from "../utilis/geocoder.js";

/**
 * Get all bootcamps
 * @route GET /api/v1/bootcamps
 * @access Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const index = asyncHandler(async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ["select", "sort"];

  // Loop over removeFields and delete then from reqQuery
  removeFields.forEach((params) => delete reqQuery[params]);

  // Create query string
  let queryString = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc) Referencia https://docs.mongodb.com/manual/reference/operator/query-comparison/
  queryString = queryString.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Finding resource
  query = Bootcamp.find(JSON.parse(queryString));

  // SELECT FIELDS
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("createdAt");
  }

  const bootcamps = await query;

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

/**
 * Get bootcamps within a radius
 * @route GET /api/v1/bootcamps/radius/:zipcode/:distance
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get latitude / longitude from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calculate radius using radians, divide distances by radius of earth (6,371km or 3,959mi)
  const radius = distance / 3959;
  const bootcamps = await Bootcamp.find({
    location: {
      $geoWithin: { $centerSphere: [[lng, lat], radius] },
    },
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});
