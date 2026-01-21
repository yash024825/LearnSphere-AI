import Quiz from "../models/Quiz.js";
import axios from "axios";

// Submit a quiz
export const submitQuiz = async (req, res) => {
  try {
    const { topic, questions } = req.body;
    const user = req.user;

    let score = 0;
    questions.forEach((q) => {
      if (q.userAnswer === q.answer) score++;
    });

    // Save quiz
    const quiz = await Quiz.create({ user: user._id, topic, questions, score });

    // Update user stats
    user.quizzesTaken += 1;
    user.totalScore += score;
    user.totalQuestions += questions.length;
    user.topicsLearned = Math.max(user.topicsLearned, 1); // Simplified
    await user.save();

    res.json({ message: "Quiz submitted", quiz });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all quizzes for user
export const getUserQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ user: req.user._id });
    res.json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// ===== AI-Powered Question Generation =====
export const generateQuestions = async (req, res) => {
  const { topic } = req.query;

  // Fallback questions if AI fails
  const fallbackQuestions = [
    {
      question: `What is the core concept of ${topic}?`,
      options: ["Basic principles", "Advanced frameworks", "Unrelated theory", "None of the above"],
      answer: "Basic principles",
    },
    {
      question: `Why is ${topic} important in real-world applications?`,
      options: ["Industry usage", "Academic relevance", "Technological growth", "All of the above"],
      answer: "All of the above",
    },
  ];

  try {
    // Replace with your AI provider: Groq API / Gemini API
    const aiResponse = await axios.post(
      "https://api.groq.com/v1/query", // Example Groq endpoint
      {
        model: "groq-qa",
        prompt: `Generate 2 multiple-choice questions with 4 options for the topic: ${topic}`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.AI_API_KEY}`, // From your .env
          "Content-Type": "application/json",
        },
      }
    );

    const generatedQuestions = aiResponse.data?.results || fallbackQuestions;

    res.json({ topic, questions: generatedQuestions });
  } catch (err) {
    console.error("AI question generation error:", err);
    res.json({ topic, questions: fallbackQuestions }); // fallback
  }
};
