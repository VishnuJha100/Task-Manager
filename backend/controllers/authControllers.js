
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

// @desc    register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async(req, res) => {
    try {
        const { name, email, password, profileImageUrl, adminInviteToken } = req.body

        const user = await User.findOne({email})
        if(user) {
            return res.status(400).json({ message: "Email already exists" })
        }

        // determine user role: Admin if correct token is provided, otherwise member
        let role = 'member'
        if(adminInviteToken && adminInviteToken === process.env.ADMIN_INVITE_TOKEN){
            role = 'admin'
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create a new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
            role
        })

        // Return user data with JWT
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            profileImageUrl: newUser.profileImageUrl,
            role: newUser.role,
            token: generateToken(newUser._id)
        })
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}

// @desc    login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if(!user){
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" })
        }
        
        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id)
        })
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}

// @desc    get user profile
// @route   GET /api/auth/profile
// @access  Private (requires JWT)
const getUserProfile = async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        if(!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}

// @desc    update user profile
// @route   PUT /api/auth/profile
// @access  Private (requires JWT)
const updateUserProfile = async(req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if(!user) {
            return res.status(404).json({ message: "User not found" })
        }

        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(req.body.password, salt)
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            token: generateToken(updatedUser._id)
        })
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}

export {registerUser, loginUser, getUserProfile, updateUserProfile}