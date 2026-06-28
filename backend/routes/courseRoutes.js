const express = require("express");
const Course = require("../models/Course");
const Module = require("../models/Module");
const Exam = require("../models/Exam");
const Enrollment = require("../models/Enrollment");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

// GET /api/courses - public catalog of published courses
router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = { isPublished: true };
    if (category) filter.category = category;
    if (search) filter.title = { $regex: search, $options: "i" };

    const courses = await Course.find(filter).sort({ createdAt: -1 });
    res.json({ courses });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch courses", error: err.message });
  }
});

// GET /api/courses/:id - course detail + its modules (published only, unless admin)
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const modules = await Module.find({ courseId: course._id }).sort({ order: 1 });
    res.json({ course, modules });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch course", error: err.message });
  }
});

// POST /api/courses - admin creates a new course
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { title, description, thumbnail, category, passingScorePercent } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "title and description are required" });
    }

    const course = await Course.create({
      title,
      description,
      thumbnail,
      category,
      passingScorePercent,
      createdBy: req.user._id,
      isPublished: false,
    });

    res.status(201).json({ course });
  } catch (err) {
    res.status(500).json({ message: "Failed to create course", error: err.message });
  }
});

// PUT /api/courses/:id - admin edits a course
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ course });
  } catch (err) {
    res.status(500).json({ message: "Failed to update course", error: err.message });
  }
});

// PATCH /api/courses/:id/publish - admin publishes a course (requires modules + exam to exist)
router.patch("/:id/publish", protect, adminOnly, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const moduleCount = await Module.countDocuments({ courseId: course._id });
    const exam = await Exam.findOne({ courseId: course._id });

    if (moduleCount === 0) {
      return res.status(400).json({ message: "Cannot publish a course with no modules" });
    }
    if (!exam) {
      return res.status(400).json({ message: "Cannot publish a course with no final exam" });
    }

    course.isPublished = true;
    await course.save();
    res.json({ course });
  } catch (err) {
    res.status(500).json({ message: "Failed to publish course", error: err.message });
  }
});

// DELETE /api/courses/:id - admin deletes a course and its related data
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    await Promise.all([
      Module.deleteMany({ courseId: course._id }),
      Exam.deleteMany({ courseId: course._id }),
      Enrollment.deleteMany({ courseId: course._id }),
      course.deleteOne(),
    ]);

    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete course", error: err.message });
  }
});

module.exports = router;
