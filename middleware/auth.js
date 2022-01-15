import asyncHandler from "./asyncHandler.js";
import ErrorResponse from "../utilis/ErrorResponse.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Protect routes
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]; // Set toekn from Bearer token in header
  }
  //
  // else if (req.cookies.token) { // Use this if you use Cookie
  //   token = req.cookies.token; // Set token from cookie
  // }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse("Not autorized to access this route", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    return next(new ErrorResponse("Not autorized to access this route", 401));
  }
});

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not autorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
