// debugSubmit.js — node debugSubmit.js
require("dotenv").config();
const connectDB = require("./config/db");

async function run() {
  await connectDB();

  // 1. Check Certificate model
  console.log("\n1. Testing Certificate model...");
  try {
    const Certificate = require("./models/Certificate");
    console.log("   ✅ Certificate model loaded OK");
    const fields = Object.keys(Certificate.schema.paths);
    console.log("   Fields:", fields.join(", "));
  } catch (err) {
    console.error("   ❌ Certificate model FAILED:", err.message);
  }

  // 2. Check server.js routes registration
  console.log("\n2. Checking route files...");
  const fs = require("fs");
  const routeFiles = ["examRoutes", "moduleExamRoutes", "enrollmentRoutes", "certificateRoutes"];
  routeFiles.forEach((f) => {
    try {
      require(`./routes/${f}`);
      console.log(`   ✅ routes/${f}.js loaded OK`);
    } catch (err) {
      console.error(`   ❌ routes/${f}.js FAILED: ${err.message}`);
    }
  });

  // 3. Check what server.js maps to /api/exams
  console.log("\n3. Reading server.js for /api/exams registration...");
  try {
    const content = fs.readFileSync("./server.js", "utf8");
    const lines = content.split("\n").filter(l => l.includes("exam") || l.includes("Exam"));
    lines.forEach(l => console.log("  ", l.trim()));
  } catch (err) {
    console.error("   Could not read server.js:", err.message);
  }

  process.exit(0);
}

run().catch((err) => { console.error(err); process.exit(1); });