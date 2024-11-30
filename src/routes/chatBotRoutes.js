import express from "express";
const router = express.Router();
import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";

// API route for handling the queryBot answers
router.post("/bot", async (req, res) => {
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
      "You are a project manager and marketing agent of Meetaicoders, a software company specializing in technology solutions. You will answer general questions only about technology within your expertise. For irrelevant or out-of-scope questions, politely excuse yourself by stating you do not have an answer, and follow up with a related question about Meetaicoders' services or expertise. Keep responses short, concise and focused. Donot generate lengthy responses. Strictly follow the guidelines";

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", systemPrompt],
      ["human", "{input}"],
    ]);

    const chain = prompt.pipe(llm);

    const chainResponse = await chain.invoke({
      input: query,
    });
    return res
      .status(200)
      .json({ AiResponse: chainResponse.content, state: "Helllo" });
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
