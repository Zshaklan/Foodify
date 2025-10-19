import express from "express";
import multer from "multer";
import { authMiddleware } from "../middleware/auth.middleware.js";
import handler, {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  editUserData,
} from "../controller/userController.js";

const route = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// test route
route.post("/user/testdb", handler);
///////////////////////////////////////////

route.post("/user/register", registerUser);
route.post("/user/login", loginUser);
route.post("/user/logout", logoutUser);
route.post(
  "/user/edit",
  authMiddleware,
  upload.single("imageFile"),
  editUserData
);
route.get("/user/me", getCurrentUser);

export default route;
