import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
  userAnswer: String,
});

const quizSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  topic: String,
  questions: [questionSchema],
  score: Number,
}, { timestamps: true });

export default mongoose.model("Quiz", quizSchema);
