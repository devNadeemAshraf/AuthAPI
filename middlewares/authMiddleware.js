// import dotenv from "dotenv";
// dotenv.config();

import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// Update this code as per need
const authMiddleware = asyncHandler(async (req, res, next) => {
  let token = req.body.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, Invalid Token");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, No Token");
  }
});

export default authMiddleware;
