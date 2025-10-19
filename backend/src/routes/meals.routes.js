import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getAllMeals, getMealById } from "../controller/meals.controller.js";

const route = express.Router();

route.get("/", authMiddleware, getAllMeals);
route.get("/:id", authMiddleware, getMealById);

export default route;
