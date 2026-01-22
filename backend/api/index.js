import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Backend running 🚀" });
});

app.post("/api/login", (req, res) => {
  res.json({ success: true });
});

export default app;
