const mongoose = require("mongoose");
const crypto = require("crypto");

const certificateSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    certificateCode: { type: String, required: true, unique: true },
    issuedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// One certificate per user per course
certificateSchema.index({ userId: 1, courseId: 1 }, { unique: true });

certificateSchema.statics.generateCode = function () {
  return crypto.randomBytes(6).toString("hex").toUpperCase(); // e.g. "A1B2C3D4E5F6"
};

module.exports = mongoose.model("Certificate", certificateSchema);
