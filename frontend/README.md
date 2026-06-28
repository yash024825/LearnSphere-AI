# LMS Frontend

React + Vite + Tailwind frontend for the course platform: catalog, course detail
(with the sequential-unlock track), module player, exam, and certificates.

## Setup

```bash
cd frontend
npm install
cp .env.example .env   # adjust VITE_API_URL if your API isn't on :5000
npm run dev
```

Opens on `http://localhost:5173`. Make sure your backend (port 5000) is running
and CORS allows that origin.

## Pages

| Route | Page |
|---|---|
| `/` | Course catalog |
| `/login`, `/signup` | Auth |
| `/courses/:courseId` | Course detail + progress track |
| `/courses/:courseId/modules/:moduleId` | Module player |
| `/courses/:courseId/exam` | Exam |
| `/certificates` | Earned certificates, PDF download |

## One file to check first: `src/api/client.js`

Every request the frontend makes lives in this one file. Most of it is now
**confirmed** against your actual routes/models (see comments inline), not
guessed. The two things still worth a real test pass:

- **`createExam`** (`POST /exams`) and **`createModule`** (`POST /modules`)
  are only used if you build an admin UI later — they just forward whatever
  object you pass, so make sure you send `courseId` (not `course`) and
  `correctAnswerIndex` (not `correctAnswer`) on questions, per your schema.
- **`completeModule`** (`PATCH /modules/:id/complete`) — this is the
  sequential-unlock gate and hasn't been exercised against your real backend
  yet. Test it by trying to complete module 2 before module 1.

Confirmed during testing:
- `GET /courses/:id` → `{ course, modules }` — modules come embedded,
  already sorted by `order`. There's no separate modules-list endpoint.
- Module fields: `courseId`, `lectureContent`, `contentType`, `order`.
- `GET /enrollments/:courseId` (not `/enrollments/course/:id`) →
  `{ enrollment, progress: { completed, total, allModulesComplete } }`,
  404s if not enrolled. `enrollment.completedModuleIds` is the array of
  completed module IDs.
- `GET /enrollments/me` → `{ enrollments: [...] }`, each with `courseId`
  populated as `{title, thumbnail, category}` and a computed `progress`.
- `GET /exams/course/:courseId` → `{ exam: { questions: [{_id, question,
  options}] } }`. `correctAnswerIndex` is stripped server-side — good,
  no fix needed. 403s if not enrolled or modules aren't all complete.
- `POST /exams/:id/submit` → `{ attempt: { scorePercent, passed }, certificate
  }`. Enrollment itself has **no** pass/certificate field — "already passed"
  is derived by checking `GET /certificates/me` for a cert matching the
  course, which is what `CourseDetail.jsx` now does on load.
- `GET /certificates/me` → `{ certificates: [...] }`, `courseId` populated
  as `{title, category}`.
- `GET /certificates/:id/download` is behind `protect` middleware — it
  needs the Bearer token, which a plain `<a href>` can't send. The
  Certificates page now fetches it as an authenticated blob and triggers
  the save itself (`api.downloadCertificate` + `handleDownload` in
  `Certificates.jsx`) instead of linking straight to the URL.

Still worth double-checking once you can click through the full flow:
- Signup/login response shape (`{ token, user }`) — not yet pasted back to
  confirm.
- `GET /courses` (catalog list) — not yet pasted back to confirm it returns
  an array vs. `{ courses: [] }`.

## Design notes

Palette and type lean academic ledger rather than generic SaaS dashboard —
a cool paper background, hairline rules, a structural grotesk display face
(Space Grotesk) instead of a default serif, and numbered/lettered markers
that are justified here because the content really is a fixed sequence.
The core idea — a gated sequence — is literally the page's structure on
`CourseDetail` (the vertical track component, `ProgressRail.jsx`).
