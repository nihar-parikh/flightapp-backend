function ErrorHandler(message, statusCode) {
  // console.log(message);
  this.message = message;
  this.statusCode = statusCode;
  Error.captureStackTrace(this);
}

export default ErrorHandler;
