import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend running on Vercel 🚀" });
});

// Example API
app.post("/api/evaluate", (req, res) => {
  res.json({ score: 8, feedback: "Good job!" });
});

export default app;
