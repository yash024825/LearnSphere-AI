const PDFDocument = require("pdfkit");

function streamCertificatePDF({ res, userName, courseTitle, certificateCode, issuedAt }) {
  const doc = new PDFDocument({
    layout: "landscape",
    size: "A4",
    margins: { top: 0, bottom: 0, left: 0, right: 0 },
  });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="certificate-${certificateCode}.pdf"`);
  doc.pipe(res);

  const W = doc.page.width;   // 841.89
  const H = doc.page.height;  // 595.28

  // ── Background ──────────────────────────────────────────────────────
  // Deep navy base
  doc.rect(0, 0, W, H).fill("#0f172a");

  // Top-left decorative gradient block
  doc.rect(0, 0, W * 0.38, H).fill("#1e293b");

  // Accent stripe
  doc.rect(W * 0.38, 0, 4, H).fill("#3b82f6");

  // Decorative circles (top right)
  doc.circle(W - 80, 60, 120).fillOpacity(0.06).fill("#ffffff");
  doc.circle(W - 50, 30, 70).fillOpacity(0.04).fill("#3b82f6");

  // Bottom-left circle
  doc.circle(60, H - 60, 90).fillOpacity(0.05).fill("#3b82f6");

  // Reset opacity
  doc.fillOpacity(1);

  // ── Left panel — branding ────────────────────────────────────────────
  const leftCX = W * 0.19;  // center of left panel

  // Graduation cap icon (drawn with shapes)
  const capY = 110;
  const capCX = leftCX;

  // Cap board (trapezoid approximation with rect + rotate)
  doc.save();
  doc.translate(capCX, capY);

  // Board top
  doc.moveTo(-45, 0).lineTo(0, -18).lineTo(45, 0).lineTo(0, 18).closePath()
    .fillOpacity(1).fill("#3b82f6");

  // Left side of cap body
  doc.moveTo(-30, 5).lineTo(-30, 28).lineTo(0, 38).lineTo(0, 15).closePath()
    .fill("#1d4ed8");

  // Right side of cap body
  doc.moveTo(30, 5).lineTo(30, 28).lineTo(0, 38).lineTo(0, 15).closePath()
    .fill("#2563eb");

  // Tassel string
  doc.moveTo(45, 0).lineTo(45, 30).strokeColor("#f59e0b").lineWidth(2).stroke();
  doc.circle(45, 35, 4).fill("#f59e0b");

  doc.restore();

  // Platform name
  doc
    .font("Helvetica-Bold")
    .fontSize(18)
    .fillColor("#3b82f6")
    .text("LearnSphere", leftCX - 80, capY + 65, { width: 160, align: "center" });

  doc
    .font("Helvetica-Bold")
    .fontSize(18)
    .fillColor("#60a5fa")
    .text("AI", leftCX + 45, capY + 65, { width: 40, align: "left" });

  // Decorative horizontal rule under logo
  doc
    .moveTo(leftCX - 60, capY + 92)
    .lineTo(leftCX + 60, capY + 92)
    .strokeColor("#3b82f6")
    .lineWidth(1)
    .stroke();

  // "Certificate of" label
  doc
    .font("Helvetica")
    .fontSize(11)
    .fillColor("#94a3b8")
    .text("CERTIFICATE OF", 0, capY + 106, { width: W * 0.38, align: "center" });

  doc
    .font("Helvetica-Bold")
    .fontSize(13)
    .fillColor("#e2e8f0")
    .text("COMPLETION", 0, capY + 122, { width: W * 0.38, align: "center" });

  // Stars row
  const starY = capY + 152;
  const starCX = leftCX;
  const stars = 5;
  const starSpacing = 16;
  for (let i = 0; i < stars; i++) {
    const sx = starCX - ((stars - 1) * starSpacing) / 2 + i * starSpacing;
    drawStar(doc, sx, starY, 5, "#f59e0b");
  }

  // Issue date block
  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor("#64748b")
    .text("DATE ISSUED", 0, H - 140, { width: W * 0.38, align: "center" });

  doc
    .font("Helvetica-Bold")
    .fontSize(11)
    .fillColor("#cbd5e1")
    .text(
      issuedAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      0, H - 124, { width: W * 0.38, align: "center" }
    );

  // Verification code
  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor("#475569")
    .text("VERIFICATION CODE", 0, H - 95, { width: W * 0.38, align: "center" });

  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor("#64748b")
    .text(certificateCode, 0, H - 80, { width: W * 0.38, align: "center" });

  // ── Right panel — content ────────────────────────────────────────────
  const rightX = W * 0.38 + 4 + 50;  // start of right content area
  const rightW = W - rightX - 50;
  const contentCX = rightX + rightW / 2;

  // "This certifies that"
  doc
    .font("Helvetica")
    .fontSize(13)
    .fillColor("#94a3b8")
    .text("This certifies that", rightX, 90, { width: rightW, align: "center" });

  // Decorative line before name
  const lineY1 = 118;
  doc
    .moveTo(contentCX - 100, lineY1)
    .lineTo(contentCX + 100, lineY1)
    .strokeColor("#334155")
    .lineWidth(0.5)
    .stroke();

  // Recipient name — large and prominent
  doc
    .font("Helvetica-Bold")
    .fontSize(42)
    .fillColor("#f1f5f9")
    .text(userName || "Graduate", rightX, 128, { width: rightW, align: "center" });

  // Decorative line after name
  const nameTextH = 42 * 1.2;
  const lineY2 = 128 + nameTextH + 8;
  doc
    .moveTo(contentCX - 100, lineY2)
    .lineTo(contentCX + 100, lineY2)
    .strokeColor("#334155")
    .lineWidth(0.5)
    .stroke();

  // "has successfully completed"
  doc
    .font("Helvetica")
    .fontSize(13)
    .fillColor("#94a3b8")
    .text("has successfully completed the course", rightX, lineY2 + 22, { width: rightW, align: "center" });

  // Course title pill background
  const courseY = lineY2 + 56;
  const pillW = Math.min(rightW - 40, 420);
  const pillX = contentCX - pillW / 2;
  const pillH = 52;

  doc
    .roundedRect(pillX, courseY, pillW, pillH, 8)
    .fill("#1e3a5f");

  // Blue left accent on pill
  doc
    .roundedRect(pillX, courseY, 4, pillH, 2)
    .fill("#3b82f6");

  // Course title text
  doc
    .font("Helvetica-Bold")
    .fontSize(20)
    .fillColor("#60a5fa")
    .text(courseTitle, pillX + 16, courseY + 14, { width: pillW - 24, align: "center" });

  // "with distinction" sub-label
  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor("#64748b")
    .text("with distinction", rightX, courseY + pillH + 18, { width: rightW, align: "center" });

  // Bottom signature area
  const sigY = H - 110;

  // Signature line — left
  const sig1X = rightX + 30;
  doc
    .moveTo(sig1X, sigY)
    .lineTo(sig1X + 130, sigY)
    .strokeColor("#334155")
    .lineWidth(1)
    .stroke();

  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor("#e2e8f0")
    .text("Yeshwanth Tatikonda", sig1X, sigY + 6, { width: 130, align: "center" });

  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor("#64748b")
    .text("Founder, LearnSphereAI", sig1X, sigY + 20, { width: 130, align: "center" });

  // Signature line — right
  const sig2X = rightX + rightW - 160;
  doc
    .moveTo(sig2X, sigY)
    .lineTo(sig2X + 130, sigY)
    .strokeColor("#334155")
    .lineWidth(1)
    .stroke();

  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor("#e2e8f0")
    .text("LearnSphereAI", sig2X, sigY + 6, { width: 130, align: "center" });

  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor("#64748b")
    .text("Certification Authority", sig2X, sigY + 20, { width: 130, align: "center" });

  // Seal circle (center bottom)
  const sealX = contentCX;
  const sealY = sigY + 8;

  doc.circle(sealX, sealY, 28).fill("#1e3a5f");
  doc.circle(sealX, sealY, 28).strokeColor("#3b82f6").lineWidth(1.5).stroke();
  doc.circle(sealX, sealY, 22).strokeColor("#3b82f6").lineWidth(0.5).stroke();

  // Checkmark in seal
  doc
    .moveTo(sealX - 10, sealY)
    .lineTo(sealX - 3, sealY + 8)
    .lineTo(sealX + 12, sealY - 10)
    .strokeColor("#3b82f6")
    .lineWidth(2.5)
    .lineJoin("round")
    .stroke();

  doc.end();
}

// Helper: draw a filled 5-point star
function drawStar(doc, cx, cy, r, color) {
  const points = 5;
  const outer = r;
  const inner = r * 0.4;
  doc.save();
  doc.translate(cx, cy);
  doc.moveTo(0, -outer);
  for (let i = 0; i < points; i++) {
    const outerAngle = (Math.PI * 2 * i) / points - Math.PI / 2;
    const innerAngle = outerAngle + Math.PI / points;
    doc.lineTo(
      Math.cos(outerAngle) * outer,
      Math.sin(outerAngle) * outer
    );
    doc.lineTo(
      Math.cos(innerAngle) * inner,
      Math.sin(innerAngle) * inner
    );
  }
  doc.closePath().fill(color);
  doc.restore();
}

module.exports = { streamCertificatePDF };