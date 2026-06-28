require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://learn-sphere-ai-indol.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options("*", cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// TEMPORARY SEED ROUTE - DELETE AFTER SEEDING
app.get("/api/seed", async (req, res) => {
  const { execFile } = require("child_process");
  execFile("node", ["seed.js"], { cwd: __dirname }, (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: err.message, stderr });
    res.json({ success: true, output: stdout });
  });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/modules", require("./routes/moduleRoutes"));
app.use("/api/enrollments", require("./routes/enrollmentRoutes"));
app.use("/api/exams", require("./routes/examRoutes"));
app.use("/api/module-exams", require("./routes/moduleExamRoutes"));
app.use("/api/certificates", require("./routes/certificateRoutes"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong on the server" });
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});