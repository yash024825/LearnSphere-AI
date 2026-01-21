import express from "express";
import { submitQuiz, getUserQuizzes, generateQuestions } from "../controllers/quizController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes — user must be logged in
router.post("/submit", verifyToken, submitQuiz);
router.get("/my-quizzes", verifyToken, getUserQuizzes);
router.get("/generate", verifyToken, generateQuestions);

export default router;
