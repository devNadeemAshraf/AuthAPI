import express from "express";
import {
  handleLoginUser,
  handleRegisterUser,
  handleVerifyToken,
  handleLogoutUser,
  handleUpdatePassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", handleLoginUser);
router.post("/register", handleRegisterUser);
router.post("/verify/:verificationToken", handleVerifyToken);
router.post("/logout", handleLogoutUser);
router.post("/updatePassword", handleUpdatePassword);

export default router;
