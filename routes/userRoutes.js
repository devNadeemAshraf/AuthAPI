import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  handleGetAllUser,
  handleGetUserProfile,
  handleUpdateUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", authMiddleware, handleGetAllUser);
router
  .route("/:userID")
  .get(authMiddleware, handleGetUserProfile)
  .post(authMiddleware, handleUpdateUserProfile);

export default router;
