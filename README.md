# 🎓 LearnSphere AI

**A full-stack structured learning platform with sequential courses, gated exams, and verifiable certificates — live and deployed.**

[![Live Demo](frontend/src/assets/homepage.webp)](https://learn-sphere-ai-lilac.vercel.app/)
[![Backend](https://img.shields.io/badge/API-Render-46E3B7?logo=render)](https://learnsphere-ai-zt5x.onrender.com/)
[![License](https://img.shields.io/badge/License-Educational%20Use-blue.svg)](#-license)

🔗 **Live App:** [learn-sphere-ai-lilac.vercel.app](https://learn-sphere-ai-lilac.vercel.app/)
🔗 **Backend API:** [learnsphere-ai-zt5x.onrender.com](https://learnsphere-ai-zt5x.onrender.com/)

> ⚠️ **Note:** The backend is hosted on Render's free tier, so the first request after a period of inactivity may take 30–60 seconds while the server spins up.

---

## 📖 Overview

LearnSphere AI is a full-stack e-learning platform built around a **structured, sequential course model**: courses are broken into ordered modules, each with a lecture (video + notes) and a short mini-exam that gates progress to the next module. After completing every module, a learner unlocks a course-wide final exam, and passing it issues a **real, downloadable, verifiable PDF certificate** with a unique certificate code.

Every gate — module unlocking, final exam access, certificate issuance — is enforced **server-side**, not just hidden behind disabled buttons in the UI.

---

## 📸 Screenshots

### Course Catalog & Dashboard
Browse all courses, track progress, and pick up where you left off.

![Dashboard & Catalog](frontend/src/assets/homepage.webp)

### Course Detail Page
Course overview with modules, learning outcomes, and enrollment.

![Course Detail](frontend/src/assets/coursepage.webp)

### Module Lesson View
Video lessons paired with lecture notes for each module.

![Module Lesson](frontend/src/assets/modulepage.webp)

### Mini-Exam
Quick module-level checks to unlock the next lesson.

![Mini Exam](frontend/src/assets/miniexampage.webp)

### Final Exam
Comprehensive assessment covering all course modules.

![Final Exam](frontend/src/assets/finalexampage.webp)

### Certificates
Verified, downloadable PDF certificates upon course completion.

![Certificates](frontend/src/assets/certificatepage.webp)

---

## ✨ Features

- 🔐 **Authentication** — email/password (bcrypt-hashed) and Google Sign-In, both issuing the same signed JWT session token
- 🛡️ **Role-based access control** — `admin` vs `user` roles enforced via JWT middleware; only admins can create/edit/publish courses, modules, and exams
- 📚 **Structured course catalog** — courses with title, description, category, thumbnail, and a configurable passing score (default 60%)
- 🎬 **Sequential modules** — ordered lessons with video (uploaded via Multer, 500MB cap) or text content, unlocked strictly in order
- 📝 **Mini-exams per module** — 3–4 question MCQ checks; a module can't be marked complete without a passing mini-exam attempt
- 🏁 **Course-wide final exam** — unlocked only once every module is completed; scored server-side against admin-authored answer keys
- 🎓 **PDF certificate generation** — a fully custom-designed certificate (PDFKit) streamed on download, with a unique verification code
- 🔎 **Public certificate verification** — a public endpoint looks up any certificate by code, independent of the PDF itself
- 📊 **Progress tracking** — enrollment records track completed modules per user per course
- 🧾 **Full attempt history** — every exam and mini-exam attempt is logged (score, pass/fail, timestamp), separate from current progress

---

## 🧠 Core Learning Flow

```
Enroll in course
   → Complete Module 1 (video/notes) → Pass Module 1 mini-exam (≥60%)
   → Complete Module 2 (video/notes) → Pass Module 2 mini-exam (≥60%)
   → ... (repeats for every module, strictly in order)
   → All modules complete → Final Exam unlocks
   → Pass Final Exam (≥60%) → Certificate issued automatically
   → Download certificate as PDF / verify it publicly by its unique code
```

Modules must be completed in order — a user cannot jump ahead to a later module before finishing and passing the mini-exam for every earlier one in that course.

---

## 🏗️ System Architecture

```
LearnSphere-AI/
├── frontend/                # React.js frontend (Vite)
│   └── src/
│       ├── pages/            # CourseCatalog, CourseDetail, ModulePlayer,
│       │                     # ModuleExam, Exam, Certificates, Login, Signup
│       ├── api/               # Axios client
│       ├── context/           # AuthContext (JWT session state)
│       └── hooks/              # useCourseProgress
├── backend/                  # Node.js / Express backend
│   ├── models/                 # User, Course, Module, Exam, ModuleExam,
│   │                           # Enrollment, ExamAttempt, ModuleExamAttempt, Certificate
│   ├── routes/                  # authRoutes, courseRoutes, moduleRoutes,
│   │                            # examRoutes, moduleExamRoutes, enrollmentRoutes, certificateRoutes
│   ├── middleware/               # auth.js (JWT protect + adminOnly), upload.js (Multer)
│   ├── config/                    # firebaseAdmin.js, db.js
│   └── utils/                      # certificateGenerator.js (PDFKit)
├── screenshots/
└── README.md
```

---

## 🌐 Live Deployment

| Service | Platform | URL |
|---------|----------|-----|
| Frontend | Vercel | https://learn-sphere-ai-lilac.vercel.app/ |
| Backend / API | Render | https://learnsphere-ai-zt5x.onrender.com/ |

---

## 🎨 Frontend (React.js)

### 🔹 Tech Stack
- React.js, React Router
- Tailwind CSS
- Axios (API communication)
- Deployed on **Vercel**

### 🔹 Key Pages
- `Login` / `Signup` — email/password and Google Sign-In
- `CourseCatalog` — browse published courses
- `CourseDetail` — course overview, modules list, enrollment
- `ModulePlayer` — video/notes viewer with a sidebar showing locked/complete/current step status across the whole course
- `ModuleExam` — mini-exam UI with per-question correct/incorrect review after submission
- `Exam` — final exam UI, same review pattern, triggers certificate issuance on a pass
- `Certificates` — lists earned certificates and downloads them as PDFs

---

## ⚙️ Backend (Node.js + Express)

### 🔹 Tech Stack
- Node.js, Express
- MongoDB + Mongoose
- JWT (`jsonwebtoken`) for session tokens, `bcryptjs` for password hashing
- Firebase Admin SDK — verifies Google Sign-In ID tokens server-side (Firebase is used only for verifying Google identity; the platform's own session token is a self-issued JWT for **all** auth methods)
- Multer — video upload handling
- PDFKit — certificate PDF generation
- dotenv for environment variables
- Deployed on **Render**

### 🔹 Authentication
Three ways to get a session, all resulting in the same JWT:
1. **Email/password** — `POST /api/auth/signup`, `POST /api/auth/login` (bcrypt-hashed passwords)
2. **Google Sign-In** — `POST /api/auth/google`, verifies the Firebase ID token server-side via Firebase Admin before issuing the platform's own JWT
3. Every protected route uses `protect` middleware (verifies the JWT, attaches `req.user`) and `adminOnly` middleware where relevant (checks `req.user.role === "admin"`)

### 🔹 API Overview

| Area | Route | Access |
|---|---|---|
| Auth | `POST /api/auth/signup`, `/login`, `/google`, `GET /me` | Public / self |
| Courses | `GET /api/courses`, `GET /api/courses/:id` | Public |
| Courses | `POST/PUT/DELETE /api/courses/:id`, `PATCH /:id/publish` | Admin only |
| Modules | `POST/PUT/DELETE /api/modules`, `POST /:id/video` | Admin only |
| Modules | `PATCH /api/modules/:id/complete` | Enrolled user |
| Mini-exams | `POST /api/module-exams` | Admin only |
| Mini-exams | `GET /api/module-exams/module/:id`, `POST /:id/submit` | Enrolled user |
| Final exam | `POST /api/exams` | Admin only |
| Final exam | `GET /api/exams/course/:id`, `POST /:id/submit` | Enrolled user (all modules complete) |
| Enrollment | `POST /api/enrollments`, `GET /me`, `GET /:courseId` | Authenticated user |
| Certificates | `GET /api/certificates/me`, `GET /:id/download` | Certificate owner |
| Certificates | `GET /api/certificates/verify/:code` | Public |

### 🔹 Certificate Generation
On a passing final-exam score, the backend generates a unique certificate code (`CERT-<timestamp>-<random>`), stores a `Certificate` document (one per user per course, enforced by a unique compound index), and streams a fully custom-designed landscape PDF via PDFKit — no template image, every element (branding, seal, signature lines, recipient name, course title) is drawn programmatically. Certificates can be verified independently of the PDF via a public lookup on the certificate code.

---

## 🔐 Environment Variables

Sensitive keys are stored securely using environment variables — never committed to the repo. Required variables include `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, and the Firebase Admin service account credentials (`FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`).

---

## 📦 Local Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yash024825/LearnSphere-AI.git
cd LearnSphere-AI
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, and your Firebase Admin credentials, then:

```bash
npm start
```

Backend will run at: `http://localhost:5000`

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

Frontend will run at: `http://localhost:3000`

---

## 🎯 Use Cases

- Structured e-learning platforms with sequential, gated content
- College & school LMS enhancements
- Corporate training platforms needing verifiable completion certificates
- Hackathons & academic projects

---

## 🌟 Future Enhancements

- Fix a known bug where the module-completion route imports the final-exam model instead of the module-exam model, which currently lets the server-side mini-exam-passing requirement be silently skipped (frontend still gates it correctly)
- Student analytics dashboard
- Teacher/admin content-management panel in the UI (currently API-only)
- Multi-language support
- Optional AI-assisted quiz generation and free-text answer evaluation as an enhancement to the current static, admin-authored exam bank

---

## 🛡️ Security Practices

- Passwords hashed with bcrypt, never stored in plaintext
- Google Sign-In tokens verified server-side via Firebase Admin SDK — never trusted from the client
- All session auth uses signed JWTs; admin-only routes enforced via middleware, not client-side checks alone
- Exam answer keys (`correctAnswerIndex`) are stripped from every response before a learner submits — only revealed after a submission is scored and saved
- API keys and secrets stored in `.env`, gitignored, never committed

---

## 👨‍💻 Author

**Yashwanth Tatikonda**
B.Tech Student | Full Stack Developer
GitHub: [https://github.com/yash024825](https://github.com/yash024825)

---

## 📄 License

This project is for **educational and academic use**. You are free to modify and extend it for learning purposes.

---

## ⭐ Support

If you found this project helpful:

- ⭐ Star the repository
- 🍴 Fork it
- 🧠 Build something amazing!

**LearnSphere AI – Structured learning, verified progress, real certificates 🎓**