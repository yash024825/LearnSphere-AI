const mongoose = require("mongoose");

const moduleExamAttemptSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module", required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    answers: [
      {
        questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
        selectedIndex: { type: Number, required: true },
      },
    ],
    scorePercent: { type: Number, required: true },
    passed: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ModuleExamAttempt", moduleExamAttemptSchema);