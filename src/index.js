// import dotenv from "dotenv";
// dotenv.config();

import connectDB from "./db.js";
import express from "express";
import formRoutes from "./routes/formRoutes.js";
import chatBotRoutes from "./routes/chatBotRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const uri = process.env.DB_URI || "mongodb://localhost:27017/db";

// Initialize the database connection
connectDB(uri);

// Initialize the database connection
const app = express();

// Middleware to parse JSON data from requests
app.use(express.json());

app.use("/api/forms", formRoutes);
app.use("/api/chat", chatBotRoutes);
app.use("/api/auth", authRoutes);

// Initialize the port for application
const port = 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`App listening on port ${port}`);
});
