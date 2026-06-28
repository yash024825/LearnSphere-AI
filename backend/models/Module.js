const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true, trim: true },
    order: { type: Number, required: true },
    lectureContent: { type: String, required: true },
    contentType: { type: String, enum: ["video", "text"], default: "video" },
    videoUrl: { type: String, default: "" }, // path to the uploaded video file, e.g. /uploads/videos/xyz.mp4
    resources: [{ label: String, url: String }],
  },
  { timestamps: true }
);

moduleSchema.index({ courseId: 1, order: 1 }, { unique: true });

module.exports = mongoose.model("Module", moduleSchema);