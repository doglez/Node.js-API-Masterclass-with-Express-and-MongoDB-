/**
 * Get all bootcamps
 * @route GET /api/v1/bootcamps
 * @access Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const index = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: "Show all bootcamps",
  });
};

/**
 * Get just one bootcamp
 * @route GET /api/v1/bootcamps/:id
 * @access Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const show = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Show one bootcamp ${req.params.id}`,
  });
};

/**
 * Create a bootcamp
 * @route POST /api/v1/bootcamps
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const store = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: "Create one bootcamp",
  });
};

/**
 * Update a bootcamp
 * @route PUT /api/v1/bootcamps/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const update = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Update one bootcamp ${req.params.id}`,
  });
};

/**
 * Delete a bootcamp
 * @route DELETE /api/v1/bootcamps/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const destroy = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Delete one bootcamp ${req.params.id}`,
  });
};
