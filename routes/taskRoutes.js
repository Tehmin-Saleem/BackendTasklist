const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Get all tasks
router.get("/", taskController.getAllTasks);

// Get a single task by title
router.get("/:id", taskController.getTaskById);

// Create a new task
// router.post("/", taskController.createTask);
router.post("/addTasks", taskController.createTask);
// Update a task by title
router.patch("/:id", taskController.updateTaskById);

// Delete a task by title
router.delete("/:id", taskController.deleteTaskById);

module.exports = router;
