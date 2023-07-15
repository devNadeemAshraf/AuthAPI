import fs from "fs";
const logAuthUserFilePath = "../logs/authUsers.json";

// Create a logger to maintain the list of users that joined on per day basis
// This should include
// - New Users per day
// - User App Retention
// - Number of Times a user visits per day
const logAuthUsers = (req, res, next) => {
  console.log("Log User Middleware");
  next();
};

export default logAuthUsers;
