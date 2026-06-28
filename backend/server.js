require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const moduleRoutes = require("./routes/moduleRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const examRoutes = require("./routes/examRoutes");
const certificateRoutes = require("./routes/certificateRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Serves uploaded module videos at http://localhost:5000/uploads/videos/<filename>
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/module-exams", require("./routes/moduleExamRoutes"));
app.use("/api/certificates", certificateRoutes);

// Fallback error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong on the server" });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});