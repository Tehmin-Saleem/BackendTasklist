const Task = require("../models/taskModel");

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single task by title
exports.getTaskByTitle = async (req, res) => {
  const { title } = req.params;
  try {
    const task = await Task.findOne({ title });
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, status, attachment, startDate, endDate } = req.body;
  const task = new Task({
    title,
    description,
    status,
    attachment,
    startDate,
    endDate,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a task by title
exports.updateTaskByTitle = async (req, res) => {
  const { title } = req.params;
  try {
    const task = await Task.findOne({ title });
    if (task) {
      task.title = req.body.title || task.title;
      task.description = req.body.description || task.description;
      task.status = req.body.status || task.status;
      task.attachment = req.body.attachment || task.attachment;
      task.startDate = req.body.startDate || task.startDate;
      task.endDate = req.body.endDate || task.endDate;

      const updatedTask = await task.save();
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a task by title
exports.deleteTaskByTitle = async (req, res) => {
  const { title } = req.params;
  try {
    const task = await Task.findOneAndDelete({ title });
    if (task) {
      res.json({ message: "Task deleted" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
