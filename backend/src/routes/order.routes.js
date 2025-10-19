import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { saveUserOrder } from "../controller/order.controller.js";

const router = express.Router();

router.post("/", authMiddleware, saveUserOrder);

export default router;
