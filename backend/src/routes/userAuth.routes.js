import express from "express";
import multer from "multer";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  editUserData,
} from "../controller/user.controller.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.post("/user/logout", logoutUser);
router.post(
  "/user/edit",
  authMiddleware,
  upload.single("imageFile"),
  editUserData
);
router.get("/user/me", authMiddleware, getCurrentUser);

export default router;
