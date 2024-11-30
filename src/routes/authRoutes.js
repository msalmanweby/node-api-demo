import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const router = express.Router();

// Environment variable for JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Replace with a strong key in production

router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Create a JWT token
    const token = jwt.sign(
      {
        id: user._id, // Include the user ID or other data in the payload
        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    return res.status(200).json({
      success: true,
      message: "Authentication successful",
      token,
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    return res.status(500).json({ error: "An error occurred during sign-in" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ error: "An error occurred during signup" });
  }
});

export default router;
