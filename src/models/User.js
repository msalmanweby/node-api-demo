import mongoose from "mongoose";

// Define the User schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true }, // 'required: true' ensures this field must be provided
  email: { type: String, required: true, unique: true }, // 'unique: true' ensures no duplicate emails
  password: { type: String, required: true }, // Corrected the spelling of 'password'
  createdAt: { type: Date, default: Date.now }, // Default value for created date
  isAdmin: { type: Boolean, default: false }, // Added type and default for 'isAdmin'
});

const User = mongoose.model("User", UserSchema);

export { User };
