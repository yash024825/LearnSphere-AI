// debugCert2.js — node debugCert2.js
require("dotenv").config();
const connectDB = require("./config/db");

async function run() {
  await connectDB();

  const Certificate = require("./models/Certificate");
  const User = require("./models/User");
  const Exam = require("./models/Exam");

  const user = await User.findOne({});
  const exam = await Exam.findOne({});

  console.log("\nTrying to create a certificate WITH certificateCode...");
  try {
    const certificateCode = `CERT-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    const cert = await Certificate.create({
      userId: user._id,
      courseId: exam.courseId,
      certificateCode,
      issuedAt: new Date(),
    });
    console.log("✅ Certificate created:", cert._id, "| code:", cert.certificateCode);
    await Certificate.deleteOne({ _id: cert._id });
    console.log("   (deleted)");
  } catch (err) {
    console.error("❌ Still failing:", err.message);
  }

  // Also confirm which examRoutes.js is loaded
  console.log("\nChecking examRoutes.js for certificateCode...");
  const fs = require("fs");
  const content = fs.readFileSync("./routes/examRoutes.js", "utf8");
  if (content.includes("certificateCode")) {
    console.log("✅ examRoutes.js contains certificateCode fix");
  } else {
    console.log("❌ examRoutes.js does NOT have the fix yet — replace the file and retry");
  }

  process.exit(0);
}
run().catch((err) => { console.error(err); process.exit(1); });