const mongoose = require("mongoose");

const examAttemptSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    answers: [{ questionId: mongoose.Schema.Types.ObjectId, selectedIndex: Number }],
    scorePercent: { type: Number, required: true },
    passed: { type: Boolean, required: true },
    attemptedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    validate: {
      validator(doc) {
        return !!(doc.examId || doc.moduleId);
      },
      message: "Either examId or moduleId is required",
    },
  }
);

module.exports = mongoose.model("ExamAttempt", examAttemptSchema);
