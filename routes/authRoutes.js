import express from "express";
import {
  handleLoginUser,
  handleRegisterUser,
  handleVerifyToken,
  handleLogoutUser,
} from "../controllers/authController";

const router = express.Router();

router.post("/login", handleLoginUser);
router.post("/register", handleRegisterUser);
router.post("/verify/:verificationToken", handleVerifyToken);
router.post("/logout", handleLogoutUser);

export default router;
