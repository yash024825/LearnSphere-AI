export const getProfile = async (req, res) => {
  const user = req.user;
  res.json({
    name: user.name,
    email: user.email,
    topicsLearned: user.topicsLearned,
    quizzesTaken: user.quizzesTaken,
    totalScore: user.totalScore,
    totalQuestions: user.totalQuestions,
  });
};

export const updateProfile = async (req, res) => {
  try {
    const user = req.user;
    const { name, email, password } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const bcrypt = await import("bcryptjs");
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.json({ message: "Profile updated", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
