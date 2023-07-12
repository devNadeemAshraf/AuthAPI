import express from "express";

import {
  handleGetAllUser,
  handleGetUser,
  handleGetUserProfile,
  handleUpdateUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", handleGetAllUser);
router.get("/:userId", handleGetUser);
router
  .route("/profile/:userId")
  .get(handleGetUserProfile)
  .post(handleUpdateUserProfile);

export default router;
