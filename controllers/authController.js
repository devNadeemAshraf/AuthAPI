import expressAsyncHandler from "express-async-handler";
import { checkIfValidField, hashPassword, verifyJWT } from "../utils/helper.js";
import User from "../models/userModel.js";

// Login User Code
export const handleLoginUser = expressAsyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (checkIfValidField(username) && checkIfValidField(password)) {
    // Check if User already exists
    const user = await User.findOne({ username });
    // Check if user was created successfully
    if (user && (await user.matchPassword(password))) {
      // Set our logged in user session
      await user.setSession();
      await user.save();

      // Set HTTP Only JWT Cookie
      res.cookie("jwt", user.session.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "dev",
        sameSite: "strict",
        maxAge: user.session.expires_in,
      });

      res.status(201).json({
        status: "ok",
        message: "Logged In Successfully",
        data: user,
        error: null,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Username or Password");
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

// Register User Code
export const handleRegisterUser = expressAsyncHandler(async (req, res) => {
  const { name, username, password } = req.body;

  if (
    checkIfValidField(name) &&
    checkIfValidField(username) &&
    checkIfValidField(password)
  ) {
    // Check if User already exists
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      res.status(400);
      throw new Error("User Already Exists");
    }

    try {
      const user = await User.create({
        name,
        username,
        password: await hashPassword(password),
      });

      if (user) {
        // Perform Necessary Actions
        await user.setSession();
        await user.performPostRegisterOperations();
        await user.save();

        // Set HTTP Only JWT Cookie
        res.cookie("jwt", user.session.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "dev",
          sameSite: "strict",
          maxAge: user.session.expires_in,
        });

        // Set Response Status
        res.status(200).json({
          status: "ok",
          message: "Created Successfully",
          data: user,
          error: null,
        });
      }
    } catch (error) {
      res.status(404);
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

// Verify Token Code
export const handleVerifyToken = expressAsyncHandler(async (req, res) => {
  let token = req.params.verificationToken;
  if (checkIfValidField(token)) {
    try {
      const verifiedToken = await verifyJWT(token);

      if (verifiedToken?.name == "JsonWebTokenError") {
        // Set Response Status
        res.status(400).json({
          status: "ok",
          message: "Verification Complete",
          data: null,
          error: verifiedToken?.message,
        });
      } else {
        // Set Response Status
        res.status(200).json({
          status: "ok",
          message: "Verification Complete",
          data: verifiedToken,
          error: null,
        });
      }
    } catch (error) {
      res.status(404);
      throw new Error(error);
    }
  } else {
    res.status(404).json({
      status: "error",
      message: "Missing token",
      data: null,
      error: null,
    });
    throw new Error("Missing token");
  }
});

// Logout User Code
export const handleLogoutUser = expressAsyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    status: "ok",
    message: "Logged Out Successfully",
    data: null,
    error: null,
  });
});

// Update Password
export const handleUpdatePassword = expressAsyncHandler(async (req, res) => {
  const currentPassword = req.body.current_password?.trim();
  const newPassword = req.body.new_password?.trim();
  const userID = req.body.user_id;

  if (
    checkIfValidField(currentPassword) &&
    checkIfValidField(newPassword) &&
    checkIfValidField(userID)
  ) {
    try {
      const user = await User.findById(userID);

      if (user) {
        const isOldPasswordMatching = await user.matchPassword(currentPassword);
        if (isOldPasswordMatching) {
          // Update our new Password
          user.password = await hashPassword(newPassword);
          await user.save();

          res.status(200).json({
            status: "ok",
            message: "Password Update Successful",
            data: null,
            error: null,
          });
        } else {
          res.status(200).json({
            status: "error",
            message: "You entered a wrong password, please try again",
            data: null,
            error: "Current Password mismatch",
          });
          throw new Error("You entered a wrong password, please try again");
        }
      } else {
        res.status(404).json({
          status: "error",
          message: "User not found",
          data: null,
          error: "User not found",
        });
        throw new Error("User not found");
      }
    } catch (error) {
      res.status(404);
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
