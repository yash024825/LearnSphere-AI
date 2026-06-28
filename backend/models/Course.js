const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    thumbnail: { type: String, default: "" },
    category: { type: String, default: "General", trim: true },
    isPublished: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    passingScorePercent: { type: Number, default: 60 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
