import express from "express";
import { getAllMeals, getMealById } from "../controller/meals.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const route = express.Router();

route.get("/", getAllMeals);
route.get("/:id", getMealById);

export default route;
