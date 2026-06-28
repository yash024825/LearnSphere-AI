const express = require("express");
const ModuleExam = require("../models/ModuleExam");
const ModuleExamAttempt = require("../models/ModuleExamAttempt");
const Module = require("../models/Module");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

// POST /api/module-exams - admin creates/replaces the mini-exam for a module
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { moduleId, questions } = req.body;
    if (!moduleId || !questions || questions.length < 3 || questions.length > 4) {
      return res.status(400).json({ message: "moduleId and 3-4 questions are required" });
    }
    for (const q of questions) {
      if (
        !q.question ||
        !Array.isArray(q.options) ||
        q.options.length < 2 ||
        q.correctAnswerIndex === undefined ||
        q.correctAnswerIndex < 0 ||
        q.correctAnswerIndex >= q.options.length
      ) {
        return res.status(400).json({ message: "Each question needs valid options and a correctAnswerIndex" });
      }
    }

    const moduleDoc = await Module.findById(moduleId);
    if (!moduleDoc) return res.status(404).json({ message: "Module not found" });

    const moduleExam = await ModuleExam.findOneAndUpdate(
      { moduleId },
      { moduleId, courseId: moduleDoc.courseId, questions },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(201).json({ moduleExam });
  } catch (err) {
    res.status(500).json({ message: "Failed to create module exam", error: err.message });
  }
});

// GET /api/module-exams/module/:moduleId - fetch mini-exam for taking it (answers stripped)
router.get("/module/:moduleId", protect, async (req, res) => {
  try {
    const moduleDoc = await Module.findById(req.params.moduleId);
    if (!moduleDoc) return res.status(404).json({ message: "Module not found" });

    const enrollment = await Enrollment.findOne({ userId: req.user._id, courseId: moduleDoc.courseId });
    if (!enrollment) {
      return res.status(403).json({ message: "You must be enrolled in this course" });
    }

    const moduleExam = await ModuleExam.findOne({ moduleId: req.params.moduleId });
    if (!moduleExam) return res.status(404).json({ message: "No mini-exam found for this module" });

    // Strip correctAnswerIndex — never send to client before submission
    const sanitized = {
      _id: moduleExam._id,
      moduleId: moduleExam.moduleId,
      questions: moduleExam.questions.map((q) => ({
        _id: q._id,
        question: q.question,
        options: q.options,
      })),
    };

    res.json({ moduleExam: sanitized });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch module exam", error: err.message });
  }
});

// POST /api/module-exams/:id/submit - scored server-side.
// Returns the attempt plus correctAnswers so the frontend can show right/wrong per question.
router.post("/:id/submit", protect, async (req, res) => {
  try {
    const { answers } = req.body;
    if (!Array.isArray(answers)) {
      return res.status(400).json({ message: "answers array is required" });
    }

    const moduleExam = await ModuleExam.findById(req.params.id);
    if (!moduleExam) return res.status(404).json({ message: "Module exam not found" });

    const enrollment = await Enrollment.findOne({
      userId: req.user._id,
      courseId: moduleExam.courseId,
    });
    if (!enrollment) {
      return res.status(403).json({ message: "You must be enrolled in this course" });
    }

    let correctCount = 0;
    for (const q of moduleExam.questions) {
      const submitted = answers.find((a) => a.questionId === q._id.toString());
      if (submitted && submitted.selectedIndex === q.correctAnswerIndex) {
        correctCount += 1;
      }
    }
    const scorePercent = Math.round((correctCount / moduleExam.questions.length) * 100);

    const course = await Course.findById(moduleExam.courseId);
    const passed = scorePercent >= (course?.passingScorePercent ?? 60);

    const attempt = await ModuleExamAttempt.create({
      userId: req.user._id,
      moduleId: moduleExam.moduleId,
      courseId: moduleExam.courseId,
      answers,
      scorePercent,
      passed,
    });

    // Return correctAnswers so frontend can highlight right/wrong per option.
    // This is safe to reveal only after submission is saved.
    const correctAnswers = moduleExam.questions.map((q) => ({
      questionId: q._id.toString(),
      correctAnswerIndex: q.correctAnswerIndex,
    }));

    res.status(201).json({ attempt, correctAnswers });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit module exam", error: err.message });
  }
});

module.exports = router;