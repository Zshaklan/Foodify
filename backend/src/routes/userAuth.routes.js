import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
} from "../controller/userController.js";

const route = express.Router();

route.post("/user/register", registerUser);
route.post("/user/login", loginUser);
route.post("/user/logout", logoutUser);
route.get("/user/me", getCurrentUser);

export default route;
