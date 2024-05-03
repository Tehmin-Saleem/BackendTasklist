// userController.js
const { User, UserLogin, UserSignUp } = require("../models/userModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single user by name
exports.getUserByName = async (req, res) => {
  const { customerName } = req.params;
  try {
    const user = await User.findOne({ customerName });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Create a new user
exports.createUser = async (req, res) => {
  const { customerName, projectName, startDate, endDate, overdueDays } = req.body;

  try {
    const user = new User({
      customerName,
      projectName,
      startDate,
      endDate,
      overdueDays,
    });

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a user by name
exports.updateUserByName = async (req, res) => {
  const { customerName } = req.params;
  try {
    const user = await User.findOne({ customerName });
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      // Update other fields as needed
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Delete a user by name
exports.deleteUser = async (req, res) => {
  const { customerName } = req.params;
  try {
    const user = await User.findOneAndDelete({ customerName });
    if (user) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await UserSignUp.findOne({ email });

    // If user is not found, return 404
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords match, generate JWT token
    if (passwordMatch) {
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        "your-secret-key-youcanothackme2232323@*#*###",
        {
          expiresIn: "1h",
        }
      );
      return res.json({ token });
    } else {
      // If passwords don't match, return 401 Unauthorized
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Signup a new user
exports.signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await UserSignUp.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds parameter

    // Create a new user with the hashed password
    const newUser = new UserSignUp({
      name,
      email,
      password: hashedPassword, // Use the hashed password
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


