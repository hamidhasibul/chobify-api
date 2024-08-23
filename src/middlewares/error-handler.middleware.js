const errorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.success = error.success || false;
  error.message = error.message || "Internal Server Error";

  if (process.env.NODE_ENV === "development") {
    console.log(error.stack);
  }

  res.status(error.statusCode).json({
    success: error.success,
    message: error.message,
  });
};

export default errorHandler;
