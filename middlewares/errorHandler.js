const errorHandler = (req, res, next) => {
  console.log("Error handler Middleware");
  next();
};

export default errorHandler;
