import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getAllMeals, getMealById } from "../controller/meals.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getAllMeals);
router.get("/:id", getMealById);

export default router;
