import express from "express";
const router = express.Router();
import { Contact } from "../models/Contact.js";
import { Demo } from "../models/Demo.js";

// API route for handling the contact form data
router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const contact = new Contact({ name: name, email: email, message: message });

    await contact.save();

    return res.status(200).json({
      success: false,
      message: "Request Processed Successfully",
    });
  } catch (error) {
    // Handle errors gracefully
    console.error("Error occurred:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
});

// API route for handling the demo form data
router.post("/demo", async (req, res) => {
  try {
    const {
      fname,
      lname,
      email,
      company,
      categories,
      country,
      phone_number,
      message,
    } = req.body;

    const demo = new Demo({
      fname: fname,
      lname: lname,
      email: email,
      company: company,
      categories: categories,
      country: country,
      phone_number: phone_number,
      message: message,
    });

    await demo.save();

    return res.status(200).json({
      message: "Request Processed Successfully",
    });
  } catch (error) {
    // Handle errors gracefully
    console.error("Error occurred:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
});

// Export the router to be used in the main server file
export default router;
