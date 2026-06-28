const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswerIndex: { type: Number, required: true },
});

const moduleExamSchema = new mongoose.Schema(
  {
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module", required: true, unique: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    questions: {
      type: [questionSchema],
      validate: {
        validator: (qs) => qs.length >= 3 && qs.length <= 4,
        message: "A module mini-exam must have 3 or 4 questions",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ModuleExam", moduleExamSchema);