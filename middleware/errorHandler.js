import ErrorResponse from "../utilis/ErrorResponse.js";

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for dev
  console.log(err);

  let message = "";
  switch (err.name) {
    case "CastError":
      // Mongoose bad ObjectI
      message = `Bootcamp not found with id of ${err.value}`;
      error = new ErrorResponse(message, 404);
      break;

    case "MongoServerError":
      // Mongoose duplicate key
      message = `Duplicate value ${Object.values(err.keyValue)}`;
      error = new ErrorResponse(message, 400);
      break;

    case "ValidationError":
      // Mongoose validation error
      message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorResponse(message, 400);
      break;

    default:
      break;
  }

  // Mongoose bad ObjectI
  //   if (err.name === "CastError") {
  //     const message = `Bootcamp not found with id of ${err.value}`;
  //     error = new ErrorResponse(message, 404);
  //   }

  //   // Mongoose duplicate key
  //   if (err.name === "MongoServerError") {
  //     const message = `Duplicate value ${Object.values(err.keyValue)}`;
  //     error = new ErrorResponse(message, 400);
  //   }

  //   // Mongoose validation error
  //   if (err.name === "ValidationError") {
  //     const message = Object.values(err.errors).map((value) => value.message);
  //     error = new ErrorResponse(message, 400);
  //   }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

export default errorHandler;
