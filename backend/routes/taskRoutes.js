import express from "express";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import {
  getDashboardData,
  getUserDashboardData,
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskChecklist,
} from "../controllers/taskControllers.js";

const router = express.Router();

router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData);
router.get("/", protect, getTasks); // Get all tasks (admin: all, user: assigned)
router.get("/:id", protect, getTaskById); // Get task by id
router.post("/", protect, adminOnly, createTask); // Create task (admin-only)
router.put("/:id", protect, updateTask); // Update task details
router.delete("/:id", protect, adminOnly, deleteTask); // Delete task (admin-only)
router.put("/:id/status", protect, updateTaskStatus); // Update task status
router.put("/:id/todo", protect, updateTaskChecklist); //Update task checklist

export default router;
