import mongoose from "mongoose";

const demoSchema = new mongoose.Schema({
  fname: { type: String },
  lname: { type: String },
  email: { type: String },
  company: { type: String },
  country: { type: String },
  categories: { type: [String] },
  phoneNumber: { type: String },
  submittedAt: { type: Date, default: Date.now },
});

export const Demo = mongoose.model("Demo", demoSchema);
