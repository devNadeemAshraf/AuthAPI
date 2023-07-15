import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { checkIfValidField } from "../utils/helper.js";

// Get All User Code
export const handleGetAllUser = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    if (users) {
      res.status(200).json({
        status: "ok",
        message: "Fetched All Users",
        data: users,
        error: null,
      });
    } else {
      res.status(404);
      throw new Error("Something went wrong while fetching users");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// Get User Code
export const handleGetUser = expressAsyncHandler(async (req, res) => {
  const userID = req.params.userId;
  if (checkIfValidField(userID)) {
    try {
      if (userID) {
        const user = await User.findById(userID);
        if (user) {
          res.status(200).json({
            status: "ok",
            message: "Fetched User",
            data: user,
            error: null,
          });
        } else {
          res.status(404);
          throw new Error("Something went wrong while fetching user");
        }
      } else {
        res.status(404);
        throw new Error("Something is wrong with the UserID provided");
      }
    } catch (error) {
      res.status(400);
      throw new Error(error);
    }
  } else {
    res.status(404).json({
      status: "error",
      message: "One of the fields are missing or invalid",
      data: null,
      error: null,
    });
    throw new Error("One of the fields are missing or invalid");
  }
});

// Get User Profile Code
export const handleGetUserProfile = expressAsyncHandler(async (req, res) => {
  const userID = req.params.userID;
  if (checkIfValidField(userID)) {
    try {
      if (userID) {
        const user = await User.findById(userID);
        if (user) {
          res.status(200).json({
            status: "ok",
            message: "Fetched User",
            data: user,
            error: null,
          });
        } else {
          res.status(404);
          throw new Error("Something went wrong while fetching user");
        }
      } else {
        res.status(404);
        throw new Error("Something is wrong with the UserID provided");
      }
    } catch (error) {
      res.status(400);
      throw new Error(error);
    }
  } else {
    res.status(404).json({
      status: "error",
      message: "One of the fields are missing or invalid",
      data: null,
      error: null,
    });
    throw new Error("One of the fields are missing or invalid");
  }
});

// Update User Profile Code
export const handleUpdateUserProfile = expressAsyncHandler(async (req, res) => {
  const userID = req.params.userID;
  const updates = req.body.updates;

  if (checkIfValidField(userID) && checkIfValidField(updates)) {
    try {
      if (userID) {
        const user = await User.findByIdAndUpdate(userID, updates);
        res.status(200).json({
          status: "ok",
          message: "Updated Successfully",
          data: user,
          error: null,
        });
      } else {
        res.status(404);
        throw new Error("Something is wrong with Updating the user");
      }
    } catch (error) {
      res.status(400);
      throw new Error(error);
    }
  } else {
    res.status(404).json({
      status: "error",
      message: "One of the fields are missing or invalid",
      data: null,
      error: null,
    });
    throw new Error("One of the fields are missing or invalid");
  }
});
