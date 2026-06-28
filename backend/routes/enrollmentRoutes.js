const express = require("express");
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const Module = require("../models/Module");
const { protect } = require("../middleware/auth");

const router = express.Router();

// POST /api/enrollments - enroll the logged-in user in a course (always free)
router.post("/", protect, async (req, res) => {
  try {
    const { courseId } = req.body;
    if (!courseId) return res.status(400).json({ message: "courseId is required" });

    const course = await Course.findById(courseId);
    if (!course || !course.isPublished) {
      return res.status(404).json({ message: "Course not found or not published" });
    }

    const existing = await Enrollment.findOne({ userId: req.user._id, courseId });
    if (existing) {
      return res.status(200).json({ message: "Already enrolled", enrollment: existing });
    }

    const enrollment = await Enrollment.create({ userId: req.user._id, courseId });
    res.status(201).json({ enrollment });
  } catch (err) {
    res.status(500).json({ message: "Failed to enroll", error: err.message });
  }
});

// GET /api/enrollments/me - logged-in user's enrollments with progress info
router.get("/me", protect, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.user._id }).populate(
      "courseId",
      "title thumbnail category"
    );

    const withProgress = await Promise.all(
      enrollments.map(async (e) => {
        const totalModules = await Module.countDocuments({ courseId: e.courseId._id });
        return {
          ...e.toObject(),
          progress: {
            completed: e.completedModuleIds.length,
            total: totalModules,
            percent: totalModules
              ? Math.round((e.completedModuleIds.length / totalModules) * 100)
              : 0,
          },
        };
      })
    );

    res.json({ enrollments: withProgress });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch enrollments", error: err.message });
  }
});

// GET /api/enrollments/:courseId - check enrollment + progress for one course
router.get("/:courseId", protect, async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      userId: req.user._id,
      courseId: req.params.courseId,
    });
    if (!enrollment) return res.status(404).json({ message: "Not enrolled in this course" });

    const totalModules = await Module.countDocuments({ courseId: req.params.courseId });
    res.json({
      enrollment,
      progress: {
        completed: enrollment.completedModuleIds.length,
        total: totalModules,
        allModulesComplete: enrollment.completedModuleIds.length >= totalModules && totalModules > 0,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch enrollment", error: err.message });
  }
});

module.exports = router;
