# LearnSphere Backend

Free course platform backend: courses → modules → final exam → certificate.
Admin uploads courses/modules/exams. Users enroll free, complete modules in
strict order, then unlock the final exam, and get a downloadable PDF
certificate on passing.

## Setup

```bash
cd learnsphere-backend
npm install
cp .env.example .env
# edit .env: set MONGO_URI to your local or Atlas connection string,
# and set JWT_SECRET to a long random string
npm run dev
```

Server runs at `http://localhost:5000`. Health check: `GET /api/health`.

## Creating the first admin user

There's no public "become admin" endpoint (by design). After signing up
normally via `/api/auth/signup`, manually flip that user's role in MongoDB:

```js
// in mongosh, connected to your DB
db.users.updateOne({ email: "you@example.com" }, { $set: { role: "admin" } })
```

## API Overview

### Auth
- `POST /api/auth/signup` — { name, email, password }
- `POST /api/auth/login` — { email, password } → returns JWT
- `GET /api/auth/me` — current user (requires Bearer token)

### Courses
- `GET /api/courses` — public catalog (published only). Query: `?category=`, `?search=`
- `GET /api/courses/:id` — course detail + its modules
- `POST /api/courses` — admin only, create course (starts unpublished)
- `PUT /api/courses/:id` — admin only, edit course
- `PATCH /api/courses/:id/publish` — admin only, publish (requires modules + exam to exist first)
- `DELETE /api/courses/:id` — admin only

### Modules
- `POST /api/modules` — admin only — { courseId, title, order, lectureContent, contentType, resources }
- `PUT /api/modules/:id` — admin only
- `DELETE /api/modules/:id` — admin only
- `PATCH /api/modules/:id/complete` — logged-in user marks a module complete.
  **Enforced sequential order**: fails with 400 if any earlier module (lower `order`) isn't completed yet.

### Enrollments
- `POST /api/enrollments` — { courseId } — enroll (always free, no payment logic exists)
- `GET /api/enrollments/me` — all of the user's enrollments with progress %
- `GET /api/enrollments/:courseId` — single enrollment + progress + `allModulesComplete` flag

### Exams
- `POST /api/exams` — admin only — { courseId, title, questions: [{question, options, correctAnswerIndex}] }
- `GET /api/exams/course/:courseId` — fetch exam to take it. **Blocked (403) unless all modules are completed.** Answers are stripped from the response.
- `POST /api/exams/:examId/submit` — { answers: [{questionId, selectedIndex}] }. Scored server-side. Issues a certificate automatically if passed.

### Certificates
- `GET /api/certificates/me` — list user's earned certificates
- `GET /api/certificates/:id/download` — streams a PDF certificate
- `GET /api/certificates/verify/:code` — public endpoint to verify a certificate code

## Design notes / what's intentionally simple

- Certificates are plain PDFs (pdfkit), not blockchain/cryptographically signed — matches what you asked for.
- No payment integration anywhere — every course is free by design.
- Module unlock is **strictly sequential**, enforced server-side in two places (mark-complete, and again at exam-submit time) so it can't be bypassed by calling the API directly.
- Admin role is set manually in the DB rather than via a public signup flag, to avoid anyone self-promoting to admin.

## Not built yet (frontend / next steps)

This is backend only. The frontend (React) needs to be updated to:
- Replace the old "Teach Topic" AI-framed page with a real Course Catalog + Course Detail page
- Add a Module Player view with a "Mark Complete" button calling `PATCH /api/modules/:id/complete`
- Gate the Exam page behind the `allModulesComplete` flag from `GET /api/enrollments/:courseId`
- Add an Admin panel (course/module/exam CRUD forms)
- Add a Certificates list + download button on the Profile page
