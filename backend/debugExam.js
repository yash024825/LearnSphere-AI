// debugExam.js — run from backend folder: node debugExam.js
// Shows exactly what's in the Exam collection and tests ExamAttempt creation
require("dotenv").config();
const connectDB = require("./config/db");
const Exam = require("./models/Exam");
const ExamAttempt = require("./models/ExamAttempt");
const User = require("./models/User");
const mongoose = require("mongoose");

async function run() {
  await connectDB();

  // List all exams
  const exams = await Exam.find({}).select("_id title courseId questions").lean();
  console.log(`\nFound ${exams.length} exams:`);
  exams.forEach((e) => {
    console.log(`  - ${e.title} | courseId: ${e.courseId} | questions: ${e.questions.length}`);
  });

  if (exams.length === 0) {
    console.log("\nNo exams found — run node seed.js first.");
    process.exit(0);
  }

  // Try creating a dummy ExamAttempt to see if the model validates correctly
  const exam = exams[0];
  const user = await User.findOne({});
  console.log(`\nTesting ExamAttempt creation with exam: ${exam._id}`);

  try {
    const attempt = await ExamAttempt.create({
      userId: user._id,
      examId: exam._id,
      courseId: exam.courseId,
      answers: [],
      scorePercent: 50,
      passed: false,
    });
    console.log("✅ ExamAttempt created successfully:", attempt._id);
    // Clean up
    await ExamAttempt.deleteOne({ _id: attempt._id });
    console.log("   (test attempt deleted)");
  } catch (err) {
    console.error("❌ ExamAttempt creation failed:", err.message);
    if (err.errors) {
      Object.entries(err.errors).forEach(([k, v]) => console.error(`   ${k}: ${v.message}`));
    }
  }

  process.exit(0);
}

run().catch((err) => { console.error(err); process.exit(1); });