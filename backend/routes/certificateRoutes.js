const express = require("express");
const Certificate = require("../models/Certificate");
const Course = require("../models/Course");
const { protect } = require("../middleware/auth");
const { streamCertificatePDF } = require("../utils/certificateGenerator");

const router = express.Router();

// GET /api/certificates/me - list all certificates earned by the logged-in user
router.get("/me", protect, async (req, res) => {
  try {
    const certificates = await Certificate.find({ userId: req.user._id }).populate(
      "courseId",
      "title category"
    );
    res.json({ certificates });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch certificates", error: err.message });
  }
});

// GET /api/certificates/:id/download - download the certificate as a PDF
router.get("/:id/download", protect, async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) return res.status(404).json({ message: "Certificate not found" });

    // Only the certificate owner can download it
    if (certificate.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to download this certificate" });
    }

    const course = await Course.findById(certificate.courseId);

    streamCertificatePDF({
      res,
      userName: req.user.name,
      courseTitle: course ? course.title : "Course",
      certificateCode: certificate.certificateCode,
      issuedAt: certificate.issuedAt,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to generate certificate", error: err.message });
  }
});

// GET /api/certificates/verify/:code - public verification by certificate code
router.get("/verify/:code", async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ certificateCode: req.params.code })
      .populate("userId", "name")
      .populate("courseId", "title");

    if (!certificate) {
      return res.status(404).json({ valid: false, message: "Certificate not found" });
    }

    res.json({
      valid: true,
      userName: certificate.userId.name,
      courseTitle: certificate.courseId.title,
      issuedAt: certificate.issuedAt,
    });
  } catch (err) {
    res.status(500).json({ message: "Verification failed", error: err.message });
  }
});

module.exports = router;
