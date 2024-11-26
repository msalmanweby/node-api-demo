import mongoose from "mongoose";

const ContactScheme = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  message: { type: String },
  submittedAt: { type: Date, default: Date.now },
});

export const Contact = mongoose.model("Contact", ContactScheme);
