const express = require("express");
const Exam = require("../models/Exam");
const ExamAttempt = require("../models/ExamAttempt");
const Module = require("../models/Module");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

// Lazy-load Certificate to avoid issues if the model file doesn't exist yet
function getCertificate() {
  try { return require("../models/Certificate"); } catch { return null; }
}

// POST /api/exams - admin creates a final exam for a course
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { courseId, title, questions } = req.body;
    if (!courseId || !questions || questions.length < 1) {
      return res.status(400).json({ message: "courseId and at least one question are required" });
    }
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const exam = await Exam.findOneAndUpdate(
      { courseId },
      { courseId, title: title || "Final Exam", questions },
      { new: true, upsert: true, runValidators: true }
    );
    res.status(201).json({ exam });
  } catch (err) {
    res.status(500).json({ message: "Failed to create exam", error: err.message });
  }
});

// GET /api/exams/course/:courseId
// Returns sanitized exam (no correct answers) if enrolled + all modules complete
router.get("/course/:courseId", protect, async (req, res) => {
  try {
    const { courseId } = req.params;

    const enrollment = await Enrollment.findOne({ userId: req.user._id, courseId });
    if (!enrollment) {
      return res.status(403).json({ message: "You must be enrolled in this course." });
    }

    const totalModules = await Module.countDocuments({ courseId });
    const completedCount = enrollment.completedModuleIds?.length ?? 0;

    if (completedCount < totalModules) {
      return res.status(403).json({
        message: `Complete all modules first. You have finished ${completedCount} of ${totalModules}.`,
        progress: { completed: completedCount, total: totalModules },
      });
    }

    const exam = await Exam.findOne({ courseId });
    if (!exam || exam.questions.length === 0) {
      return res.status(404).json({ message: "No final exam found for this course." });
    }

    const sanitized = {
      _id: exam._id,
      title: exam.title,
      courseId: exam.courseId,
      questions: exam.questions.map((q) => ({
        _id: q._id,
        question: q.question,
        options: q.options,
      })),
    };

    res.json({ exam: sanitized });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch exam", error: err.message });
  }
});

// POST /api/exams/:id/submit
// Scores the final exam. Issues certificate if passed.
router.post("/:id/submit", protect, async (req, res) => {
  try {
    const { answers } = req.body;
    if (!Array.isArray(answers)) {
      return res.status(400).json({ message: "answers array is required" });
    }

    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    const enrollment = await Enrollment.findOne({
      userId: req.user._id,
      courseId: exam.courseId,
    });
    if (!enrollment) {
      return res.status(403).json({ message: "You must be enrolled in this course." });
    }

    // Score
    let correctCount = 0;
    for (const q of exam.questions) {
      const submitted = answers.find((a) => a.questionId === q._id.toString());
      if (submitted && submitted.selectedIndex === q.correctAnswerIndex) {
        correctCount++;
      }
    }
    const scorePercent = Math.round((correctCount / exam.questions.length) * 100);
    const course = await Course.findById(exam.courseId);
    const passed = scorePercent >= (course?.passingScorePercent ?? 60);

    // Save attempt — use examId field, not moduleId
    const attempt = await ExamAttempt.create({
      userId: req.user._id,
      examId: exam._id,        // final exam uses examId
      courseId: exam.courseId,
      answers,
      scorePercent,
      passed,
    });

    // Issue certificate if passed
    let certificate = null;
    const Certificate = getCertificate();
    if (passed && Certificate) {
      certificate = await Certificate.findOne({
        userId: req.user._id,
        courseId: exam.courseId,
      });
      if (!certificate) {
        const certificateCode = `CERT-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
        certificate = await Certificate.create({
          userId: req.user._id,
          courseId: exam.courseId,
          examAttemptId: attempt._id,
          certificateCode,
          issuedAt: new Date(),
        });
      }
    }

    // Return correct answers for result review
    const correctAnswers = exam.questions.map((q) => ({
      questionId: q._id.toString(),
      correctAnswerIndex: q.correctAnswerIndex,
    }));

    res.status(201).json({ attempt, certificate, correctAnswers });
  } catch (err) {
    console.error("Exam submit error:", err);
    res.status(500).json({ message: "Failed to submit exam", error: err.message });
  }
});

module.exports = router;