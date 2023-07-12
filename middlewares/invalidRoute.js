const invalidRoute = (req, res, next) => {
  console.log("Invalid Route Middleware");
  next();
};

export default invalidRoute;
