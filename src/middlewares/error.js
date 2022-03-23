import ErrorHandler from "../utils/errorHandler.js";

export default (error, req, res, next) => {
  console.log(error);
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Internal Server error";

  //wrong mongodb id error -> for cast error
  if (error.name === "Casterror") {
    const message = `Resource not found. Invalid: ${error.path}`;
    error = new ErrorHandler(message, 400);
  }

  // Wrong JWT error
  if (error.name === "JsonWebTokenerror") {
    const message = `Json Web Token is invalid, Try again `;
    error = new ErrorHandler(message, 400);
  }

  // JWT EXPIRE error
  if (error.name === "TokenExpirederror") {
    const message = `Json Web Token is Expired, Try again `;
    error = new ErrorHandler(message, 400);
  }

  res.status(error.statusCode).json({
    success: false,
    // error: error.stack, //stack gives the exact path where the erroror has occured
    message: error.message,
  });
};
