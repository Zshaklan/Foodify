import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import {
  getAllUsers,
  getAllOrders,
  updateOrderStatus,
  getDashboardStats,
  toggleUserStatus,
  deleteUser,
} from "../controller/admin.controller.js";

const router = express.Router();

// All routes require authentication and admin privileges
router.use(authMiddleware);
router.use(isAdmin);

// Admin routes
router.get("/users", getAllUsers);
router.patch("/users/:userId/toggle-status", toggleUserStatus);
router.delete("/users/:userId/delete", deleteUser);
router.get("/orders", getAllOrders);
router.patch("/orders/:orderId/status", updateOrderStatus);
router.get("/dashboard", getDashboardStats);

export default router;
