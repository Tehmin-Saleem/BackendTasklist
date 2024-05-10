const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// const auth = require("../middleware/auth.middleware.js");
// router.post("/", userController.createUser);
// Signup route
router.post("/signup", userController.signupUser);

// Login route
router.post("/login", userController.loginUser);

// Create a new user route (for regular user creation)


// Middleware for authentication
// router.use(auth);

// Get all users route
router.get("/", userController.getAllUsers);

// Get a single user by name route
router.get("/:customerName", userController.getUserByName);

// Update a user by name route
router.patch("/:customerName", userController.updateUserByName);

// Delete a user by name route
router.delete("/:id", userController.deleteUser);

module.exports = router;
