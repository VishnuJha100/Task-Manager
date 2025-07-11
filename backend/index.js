import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import reportRoutes from './routes/reportRoutes.js'
import { fileURLToPath } from 'url'

dotenv.config()

const app = express()

// Middleware to handle CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
)

// Connect MongoDB
connectDB()

// Middleware
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/reports', reportRoutes)

app.get('/', (req, res) => {
  res.send("Server is running.")
})

// Server uploads folder
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// Start Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))