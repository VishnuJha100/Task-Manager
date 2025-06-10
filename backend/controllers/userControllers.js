import Task from '../models/Task.js'
import User from '../models/User.js'

// @desc    get all users
// @route   GET /api/users/
// @access  Private(admin)
const getUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'member' }).select("-password")

        // add task counts to each user
        const usersWithTaskCounts = await Promise.all(users.map(async(user) => {
            const pendingTasks = await Task.countDocuments({ assignedTo: user._id, status: "Pending" })
            const inProgressTasks = await Task.countDocuments({ assignedTo: user._id, status: "In Progress"})
            const completedTasks = await Task.countDocuments({ assignedTo: user._id, status: "Completed" })

            return {
                ...user._doc, // Includes all existing user data
                pendingTasks,
                inProgressTasks,
                completedTasks
            };
        }))

        res.json(usersWithTaskCounts)


    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  private
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password")
        if(!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}

export { getUsers, getUserById}