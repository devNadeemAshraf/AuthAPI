const errorHandler = (error, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = error.message;

  // This condition is specifically to check for mongodb error
  if (error.name === "CastError" && error.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode);
  res.json({
    message,
    stack: process.env.NODE_ENV === "prod" ? null : error.stack,
  });
};

export default errorHandler;
