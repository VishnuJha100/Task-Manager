export const BASE_URL = import.meta.env.VITE_BASE_URL

export const API_PATH = {
    AUTH: {
        REGISTER: "/api/auth/register",     // Register a new user (Admin or Member)
        LOGIN: "/api/auth/login",           // Authenticate user and return JWT token
        GET_PROFILE: "/api/auth/profile"    // Get logged-in user details
    },

    USERS: {
        GET_ALL_USERS: "/api/users",        // Get all users (Admin only)
        GET_USER_BY_ID: (userId) => `/api/users/${userId}`,     // Get user by ID
        CREATE_USER: "/api/users",           // Create a new user (Admin-Only)
        UPDATE_USER: (userId) => `/api/users/${userId}`,    // Update user details
        DELETE_USER: (userId) => `/api/users/${userId}`     // Delete a user
    },

    TASKS: {
        GET_DASHBOARD_DATA: "/api/tasks/dashboard-data",    // Get dashboard data
        GET_USER_DASHBOARD_DATA: "/api/tasks/user-dashboard-data",  // Get user dashboard data
        GET_ALL_TASKS: "/api/tasks",        // Get all tasks (admin: all, user: assigned only)
        GET_TASK_BY_ID: (taskId) => `/api/tasks/${taskId}`,     // Get task by Id
        CREATE_TASK: "/api/tasks",           // Create a task (admin only)
        UPDATE_TASK: (taskId) => `/api/tasks/${taskId}`,        // Update task details
        DELETE_TASK: (taskId) => `/api/tasks/${taskId}`,        // Delete a task (admin only)

        UPDATE_TASK_STATUS: (taskId) => `/api/tasks/${taskId}/status`,  // Update task status
        UPDATE_TODO_CHECKLIST: (taskId) => `/api/tasks/${taskId}/todo`,     // Update todo checklist
    },

    REPORTS: {
        EXPORT_TASKS: "/api/reports/export/tasks",     // Download all tasks an excel data,
        EXPORT_USERS: "/api/reports/export/users",     // Download user-task report
    },

    IMAGE: {
        UPLOAD_IMAGE: "/api/auth/upload-image"
    },
}