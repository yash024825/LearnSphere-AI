require("dotenv").config();
const connectDB = require("./config/db");

const User = require("./models/User");
const Course = require("./models/Course");
const Module = require("./models/Module");
const ModuleExam = require("./models/ModuleExam");
const ModuleExamAttempt = require("./models/ModuleExamAttempt");
const Exam = require("./models/Exam");
const ExamAttempt = require("./models/ExamAttempt");
const Enrollment = require("./models/Enrollment");
const Certificate = require("./models/Certificate");

const COURSES = require("./seedData");

async function run() {
  await connectDB();

  const admin = await User.findOne({ role: "admin" });
  if (!admin) {
    console.error("No admin user found. Flip a user's role to 'admin' in MongoDB first.");
    process.exit(1);
  }
  console.log(`Using admin user: ${admin.email}`);

  console.log("Wiping existing course data...");
  await Promise.all([
    Course.deleteMany({}), Module.deleteMany({}),
    ModuleExam.deleteMany({}), ModuleExamAttempt.deleteMany({}),
    Exam.deleteMany({}), ExamAttempt.deleteMany({}),
    Enrollment.deleteMany({}), Certificate.deleteMany({}),
  ]);

  let courseCount = 0, moduleCount = 0, questionCount = 0;

  for (const courseDef of COURSES) {
    const course = await Course.create({
      title: courseDef.title,
      description: courseDef.description,
      category: courseDef.category,
      isPublished: true,
      createdBy: admin._id,
      passingScorePercent: 60,
    });
    courseCount++;

    let order = 1;
    for (const moduleDef of courseDef.modules) {
      const moduleDoc = await Module.create({
        courseId: course._id,
        title: moduleDef.title,
        order,
        lectureContent: moduleDef.lectureContent,
        contentType: "video",
        videoUrl: moduleDef.videoUrl,   // ← real topic-matched YouTube embed URL
      });
      moduleCount++;
      order++;

      await ModuleExam.create({
        moduleId: moduleDoc._id,
        courseId: course._id,
        questions: moduleDef.questions,
      });
      questionCount += moduleDef.questions.length;
    }

    await Exam.create({
      courseId: course._id,
      title: "Final Exam",
      questions: courseDef.finalExam,
    });
    questionCount += courseDef.finalExam.length;

    console.log(`Seeded: ${courseDef.title}`);
  }

  console.log(`\nDone. Courses: ${courseCount} | Modules: ${moduleCount} | Questions: ${questionCount}`);
  process.exit(0);
}

run().catch((err) => { console.error("Seed failed:", err); process.exit(1); });