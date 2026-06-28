const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswerIndex: { type: Number, required: true },
});

const examSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true, unique: true },
    title: { type: String, default: "Final Exam" },
    questions: { type: [questionSchema], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exam", examSchema);