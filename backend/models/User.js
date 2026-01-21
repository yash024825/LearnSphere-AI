import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  topicsLearned: { type: Number, default: 0 },
  quizzesTaken: { type: Number, default: 0 },
  totalScore: { type: Number, default: 0 },
  totalQuestions: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
