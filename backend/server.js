// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import quizRoutes from "./routes/quiz.js";
import { verifyToken } from "./middleware/authMiddleware.js"; // named export

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes); // login/signup
app.use("/api/user", verifyToken, userRoutes); // profile & stats (protected)
app.use("/api/quiz", verifyToken, quizRoutes); // quiz submission & retrieval (protected)

// AI Example Route for generating questions dynamically
app.post("/api/ai/generate-quiz", verifyToken, async (req, res) => {
  const { topic } = req.body;

  try {
    // Node 24 has global fetch
    const response = await fetch("https://api.groq.com/v1/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: `Generate 5 multiple choice questions for the topic: ${topic}`,
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    res.json({ topic, generatedQuestions: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating AI quiz" });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("LearnSphere AI Backend Running!");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
