import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import { Contact } from "./models/Contact.js";
import { Demo } from "./models/Demo.js";
import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";

mongoose
  .connect(
    process.env.NODE_ENV === "production"
      ? process.env.PROD_DB_URI
      : "mongodb://localhost:27017/localdb",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log(
      `Connected to MongoDB (${
        process.env.NODE_ENV === "production" ? "Production" : "Local"
      })`
    );
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const app = express();
const port = 3000;

// Middleware to parse JSON data from requests
app.use(express.json());

app.post("/api/queryBot", async (req, res) => {
  try {
    const { query } = req.body;

    // Initialize the LLM with the provided API key and model
    const llm = new ChatGroq({
      model: "llama3-70b-8192",
      temperature: 0,
      apiKey: process.env.GROQ_API_KEY, // Default value.
      temperature: 0,
    });

    const systemPrompt =
      "You are a project manager and marketing agent of Meetaicoders, a software company specializing in technology solutions. You will answer general questions only about technology within your expertise. For irrelevant or out-of-scope questions, politely excuse yourself by stating you do not have an answer, and follow up with a related question about Meetaicoders' services or expertise. Keep responses concise and focused.";

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", systemPrompt],
      ["human", "{input}"],
    ]);

    const chain = prompt.pipe(llm);

    const chainResponse = await chain.invoke({
      input: query,
    });
    return res.status(200).json({ AiResponse: chainResponse.content });
  } catch (error) {
    // Handle errors gracefully
    console.error("Error occurred:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
});

// API route for handling the contact form data
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Simulate saving the data or handling it
  console.log("Contact Data Received:", { name, email, message });

  // Respond to the client
  res.status(200).json({
    success: true,
    message: "Thank you for reaching out!",
    data: { name, email, message },
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
