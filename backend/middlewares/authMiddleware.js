import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// Middleware to protect routes
const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization

        if(token && token.startsWith("Bearer")) {
            token = token.split(" ")[1] //Extract token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select("-password")
            next()
        } else {
            res.status(401).json({ message: "Not authorized, no token" })
        }
    } catch (error) {
        res.status(401).json({ message: "Token failed", error: error.message })
    }
}

// Middleware for Admin-Only access
const adminOnly = (req, res, next) => {
    if(req.user && req.user.role === "admin") {
        next()
    } else {
        res.status(403).json({ message: "Access denied, Admin only"})
    }
}

export { protect, adminOnly }
