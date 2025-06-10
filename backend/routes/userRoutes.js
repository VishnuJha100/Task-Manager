import express from 'express'
import { adminOnly, protect } from '../middlewares/uploadMiddleware.js'
import { getUsers, getUserById } from '../controllers/userControllers.js'

const router = express.Router()

// User management routes
router.get("/", protect, adminOnly, getUsers)   // Get all users (admin-only)
router.get("/:id", protect, getUserById)    // Get specific user

export default router