const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    completedModuleIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module" }],
    status: { type: String, enum: ["in-progress", "completed"], default: "in-progress" },
    enrolledAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// A user can only enroll once per course
enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model("Enrollment", enrollmentSchema);
