const express = require('express');
const connectDB = require('./config/db');
const corsMiddleware = require('./config/cors');
const app = express();
const PORT = process.env.PORT || 3000;
const multer= require('multer')
const path = require('path')
// Call the connectDB function to establish the connection
connectDB();

// Middleware
// Apply CORS middleware
app.use(corsMiddleware);
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/notifications', notificationRoutes);

// Include the /api/enduser route
// app.use('/api/enduser', userRoutes);



// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Specify the destination folder for uploaded files
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname); // Generate a unique filename
//   },
// });
// const upload = multer({ storage: storage });
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/uploads", express.static(("uploads")));
// app.post("/upload", upload.single("file"), function (req, res, next) {
//   // req.file contains the uploaded file
//   res.send("File uploaded successfully!");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Generate a unique filename
  },
});
const upload = multer({ storage: storage });
// app.use("/api/users", userRoutes);
// app.use("/api/tasks", taskRoutes);
// app.use("/api/notifications", notificationRoutes);
app.use("/uploads", express.static("uploads"));
app.post("/upload", upload.single("file"), function (req, res, next) {
  // req.file contains the uploaded file
  res.send("File uploaded successfully!");
});







// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
