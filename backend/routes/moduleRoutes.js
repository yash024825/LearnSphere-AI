const express = require("express");
const Module = require("../models/Module");
const Enrollment = require("../models/Enrollment");
const ModuleExam = require("../models/Exam");
const ModuleExamAttempt = require("../models/ExamAttempt");
const { protect, adminOnly } = require("../middleware/auth");
const { uploadVideo } = require("../middleware/upload");

const router = express.Router();

// POST /api/modules - admin adds a module to a course
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { courseId, title, order, lectureContent, contentType, resources } = req.body;
    if (!courseId || !title || order === undefined || !lectureContent) {
      return res
        .status(400)
        .json({ message: "courseId, title, order, and lectureContent are required" });
    }

    const module = await Module.create({
      courseId,
      title,
      order,
      lectureContent,
      contentType,
      resources,
    });

    res.status(201).json({ module });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ message: "A module with this order already exists for this course" });
    }
    res.status(500).json({ message: "Failed to create module", error: err.message });
  }
});

// POST /api/modules/:id/video - admin uploads/replaces the video file for a module
router.post("/:id/video", protect, adminOnly, uploadVideo.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No video file uploaded (field name must be 'video')" });
    }

    const module = await Module.findById(req.params.id);
    if (!module) return res.status(404).json({ message: "Module not found" });

    module.videoUrl = `/uploads/videos/${req.file.filename}`;
    await module.save();

    res.json({ module });
  } catch (err) {
    res.status(500).json({ message: "Failed to upload video", error: err.message });
  }
});

// PUT /api/modules/:id - admin edits a module
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const module = await Module.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!module) return res.status(404).json({ message: "Module not found" });
    res.json({ module });
  } catch (err) {
    res.status(500).json({ message: "Failed to update module", error: err.message });
  }
});

// DELETE /api/modules/:id - admin removes a module
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const module = await Module.findByIdAndDelete(req.params.id);
    if (!module) return res.status(404).json({ message: "Module not found" });
    res.json({ message: "Module deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete module", error: err.message });
  }
});

// PATCH /api/modules/:id/complete - logged-in user marks a module complete
// Enforces strict sequential order AND, if this module has a mini-exam,
// requires a passing attempt on it first.
router.patch("/:id/complete", protect, async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) return res.status(404).json({ message: "Module not found" });

    const enrollment = await Enrollment.findOne({
      userId: req.user._id,
      courseId: module.courseId,
    });
    if (!enrollment) {
      return res.status(403).json({ message: "You are not enrolled in this course" });
    }

    const alreadyDone = enrollment.completedModuleIds.some(
      (id) => id.toString() === module._id.toString()
    );
    if (alreadyDone) {
      return res.json({ message: "Module already marked complete", enrollment });
    }

    const earlierModules = await Module.find({
      courseId: module.courseId,
      order: { $lt: module.order },
    }).select("_id");

    const completedSet = new Set(enrollment.completedModuleIds.map((id) => id.toString()));
    const allEarlierDone = earlierModules.every((m) => completedSet.has(m._id.toString()));

    if (!allEarlierDone) {
      return res.status(400).json({
        message: "Complete the earlier modules in this course before this one",
      });
    }

    // New: require a passing mini-exam attempt, if this module has one
    const moduleExam = await ModuleExam.findOne({ moduleId: module._id });
    if (moduleExam) {
      const passedAttempt = await ModuleExamAttempt.findOne({
        userId: req.user._id,
        moduleId: module._id,
        passed: true,
      });
      if (!passedAttempt) {
        return res.status(400).json({
          message: "Pass this module's mini-exam before marking it complete",
        });
      }
    }

    enrollment.completedModuleIds.push(module._id);

    const totalModules = await Module.countDocuments({ courseId: module.courseId });
    if (enrollment.completedModuleIds.length >= totalModules) {
      enrollment.status = "completed";
    }

    await enrollment.save();
    res.json({ message: "Module marked complete", enrollment });
  } catch (err) {
    res.status(500).json({ message: "Failed to mark module complete", error: err.message });
  }
});

module.exports = router;