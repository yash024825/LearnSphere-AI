import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCourseProgress } from '../hooks/useCourseProgress'
import ProgressRail from '../components/ProgressRail'
import StatusBadge from '../components/StatusBadge'

// Inline SVG logos — no external requests, always render
const CourseLogo = ({ title, size = 96 }) => {
  const logos = {
    'Intro to React': (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r="8" fill="#61DAFB"/>
        <ellipse cx="50" cy="50" rx="42" ry="16" fill="none" stroke="#61DAFB" strokeWidth="3"/>
        <ellipse cx="50" cy="50" rx="42" ry="16" fill="none" stroke="#61DAFB" strokeWidth="3" transform="rotate(60 50 50)"/>
        <ellipse cx="50" cy="50" rx="42" ry="16" fill="none" stroke="#61DAFB" strokeWidth="3" transform="rotate(120 50 50)"/>
      </svg>
    ),
    'JavaScript Fundamentals': (
      <svg viewBox="0 0 80 80" width={size} height={size}>
        <rect width="80" height="80" rx="8" fill="#f7df1e"/>
        <text x="8" y="62" fontSize="58" fontWeight="bold" fontFamily="Arial" fill="#000">JS</text>
      </svg>
    ),
    'Python for Beginners': (
      <svg viewBox="0 0 80 100" width={size * 0.8} height={size}>
        <path d="M40 5 C30 5 22 12 22 24 L22 36 L40 36 L40 40 L18 40 C12 40 6 46 6 56 C6 68 12 78 24 78 L30 78 L30 68 C30 60 36 56 46 56 L62 56 C68 56 74 50 74 42 L74 24 C74 12 64 5 40 5 Z" fill="#306998"/>
        <path d="M40 95 C50 95 58 88 58 76 L58 64 L40 64 L40 60 L62 60 C68 60 74 54 74 44 C74 32 68 22 56 22 L50 22 L50 32 C50 40 44 44 34 44 L18 44 C12 44 6 50 6 58 L6 76 C6 88 16 95 40 95 Z" fill="#ffd343"/>
        <circle cx="32" cy="24" r="4" fill="white"/>
        <circle cx="48" cy="76" r="4" fill="white"/>
      </svg>
    ),
    'Node.js & Express': (
      <svg viewBox="0 0 130 50" width={size * 1.4} height={size * 0.5}>
        <text x="0" y="40" fontSize="44" fontWeight="bold" fontFamily="Arial" fill="#68A063">Node.js</text>
      </svg>
    ),
    'MongoDB Essentials': (
      <svg viewBox="0 0 80 100" width={size * 0.8} height={size}>
        <path d="M40 5 C40 5 14 34 14 56 C14 72 25 86 40 90 C55 86 66 72 66 56 C66 34 40 5 40 5 Z" fill="#00ED64"/>
        <rect x="37" y="58" width="6" height="30" fill="#00684A"/>
      </svg>
    ),
    'Data Structures & Algorithms': (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="14" r="10" fill="white"/>
        <circle cx="18" cy="54" r="10" fill="white"/>
        <circle cx="82" cy="54" r="10" fill="white"/>
        <circle cx="32" cy="86" r="10" fill="white"/>
        <circle cx="68" cy="86" r="10" fill="white"/>
        <line x1="50" y1="24" x2="20" y2="44" stroke="white" strokeWidth="3"/>
        <line x1="50" y1="24" x2="80" y2="44" stroke="white" strokeWidth="3"/>
        <line x1="20" y1="64" x2="30" y2="76" stroke="white" strokeWidth="3"/>
        <line x1="80" y1="64" x2="66" y2="76" stroke="white" strokeWidth="3"/>
      </svg>
    ),
    'Git & GitHub Basics': (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <path d="M92 46 L54 8 C52 6 49 6 47 8 L39 16 L49 26 C51 25 54 25 56 27 C58 29 58 32 57 34 L66 43 C68 42 71 42 73 44 C76 47 76 52 73 55 C70 58 65 58 62 55 C60 53 59 50 60 47 L52 39 L52 61 C53 62 54 63 54 65 C54 68 51 71 48 71 C45 71 42 68 42 65 C42 63 43 61 45 60 L45 37 C43 36 42 34 42 32 C42 29 44 27 46 26 L36 16 L8 44 C6 46 6 49 8 51 L46 89 C48 91 51 91 53 89 L92 50 C94 48 94 48 92 46 Z" fill="white"/>
      </svg>
    ),
    'REST API Design': (
      <svg viewBox="0 0 130 50" width={size * 1.4} height={size * 0.55}>
        <rect x="2" y="4" width="126" height="42" rx="8" fill="none" stroke="white" strokeWidth="3"/>
        <text x="10" y="34" fontSize="24" fontWeight="bold" fontFamily="monospace" fill="#34d399">GET</text>
        <text x="68" y="34" fontSize="18" fontFamily="monospace" fill="white">/api/v1</text>
      </svg>
    ),
    'Docker Fundamentals': (
      <svg viewBox="0 0 130 80" width={size * 1.4} height={size * 0.85}>
        <rect x="4"  y="28" width="18" height="14" rx="2" fill="white"/>
        <rect x="26" y="18" width="18" height="24" rx="2" fill="white"/>
        <rect x="48" y="28" width="18" height="14" rx="2" fill="white"/>
        <rect x="70" y="18" width="18" height="24" rx="2" fill="white"/>
        <rect x="92" y="28" width="18" height="14" rx="2" fill="white"/>
        <rect x="4"  y="46" width="106" height="14" rx="3" fill="white"/>
        <text x="22" y="74" fontSize="22" fontWeight="bold" fontFamily="Arial" fill="white">docker</text>
      </svg>
    ),
    'Cloud Computing with AWS': (
      <svg viewBox="0 0 130 70" width={size * 1.4} height={size * 0.75}>
        <text x="4" y="48" fontSize="44" fontWeight="bold" fontFamily="Arial" fill="white">aws</text>
        <path d="M4 56 Q65 76 126 56" fill="none" stroke="#FF9900" strokeWidth="6" strokeLinecap="round"/>
        <polygon points="120,48 128,56 120,64" fill="#FF9900"/>
      </svg>
    ),
  }
  return logos[title] || (
    <svg viewBox="0 0 60 60" width={size} height={size}>
      <rect x="8" y="8" width="44" height="44" rx="6" fill="none" stroke="white" strokeWidth="3"/>
      <path d="M20 30h20M20 22h20M20 38h12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
}



const COURSE_OUTCOMES = {
  'Intro to React':               ['Build reusable UI components', 'Manage state with hooks', 'Understand unidirectional data flow', 'Use useEffect for side effects'],
  'JavaScript Fundamentals':      ['Write modern ES6+ code', 'Work with arrays, objects & closures', 'Handle async with Promises & async/await', 'Understand scope and the event loop'],
  'Python for Beginners':         ['Write Python scripts from scratch', 'Use control flow and functions', 'Work with lists, dicts and tuples', 'Import and use modules'],
  'Node.js & Express':            ['Build REST APIs with Express', 'Handle middleware and routing', 'Work with async/await patterns', 'Connect to MongoDB via Mongoose'],
  'MongoDB Essentials':           ['Model data with flexible documents', 'Run CRUD and aggregation queries', 'Index fields for query performance', 'Use Mongoose schema validation'],
  'Data Structures & Algorithms': ['Understand Big O complexity', 'Implement arrays, stacks, queues', 'Apply sorting and binary search', 'Solve problems with recursion & DP'],
  'Git & GitHub Basics':          ['Track changes with commits', 'Branch, merge and resolve conflicts', 'Collaborate via pull requests', 'Understand git fetch vs pull'],
  'REST API Design':              ['Design clean, predictable endpoints', 'Use correct HTTP methods & status codes', 'Secure APIs with JWTs', 'Version your API without breaking clients'],
  'Docker Fundamentals':          ['Build and run containers', 'Write Dockerfiles with layer caching', 'Orchestrate services with Compose', 'Persist data with volumes'],
  'Cloud Computing with AWS':     ['Understand IaaS, PaaS, SaaS', 'Work with EC2, S3 and IAM', 'Design for high availability with multi-AZ', 'Monitor with CloudWatch'],
}

const CATEGORY_COLORS = {
  'Web Development':     'bg-blue-100 text-blue-700',
  'Backend Development': 'bg-purple-100 text-purple-700',
  'Programming':         'bg-green-100 text-green-700',
  'Databases':           'bg-orange-100 text-orange-700',
  'Computer Science':    'bg-indigo-100 text-indigo-700',
  'Developer Tools':     'bg-rose-100 text-rose-700',
  'DevOps':              'bg-cyan-100 text-cyan-700',
  'Cloud Computing':     'bg-sky-100 text-sky-700',
}

function CheckCircle({ className = '' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
      <path d="M7 12.5l3.5 3.5 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function InfoRow({ icon, children }) {
  return (
    <div className="flex items-center gap-2 text-sm text-white/70">
      {icon}
      {children}
    </div>
  )
}

export default function CourseDetail() {
  const { courseId } = useParams()
  const { isAuthed } = useAuth()
  const navigate = useNavigate()

  const { course, error, loaded, isEnrolled, steps, enroll, enrolling } = useCourseProgress(courseId, isAuthed)

  const handleEnroll = async () => {
    if (!isAuthed) return navigate('/login')
    await enroll()
  }

  if (error) return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">{error}</p>
    </div>
  )

  if (!loaded) return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-sm text-gray-400">Loading course…</p>
    </div>
  )

  const coverBgColors = {
    'Intro to React': '#20232a', 'JavaScript Fundamentals': '#1a1a1a',
    'Python for Beginners': '#1e3a5f', 'Node.js & Express': '#1a1a1a',
    'MongoDB Essentials': '#001e2b', 'Data Structures & Algorithms': '#312e81',
    'Git & GitHub Basics': '#7c1f0f', 'REST API Design': '#0f4c4c',
    'Docker Fundamentals': '#0369a1', 'Cloud Computing with AWS': '#232f3e',
  }
  const coverBg = coverBgColors[course.title] || '#1e293b'
  const outcomes = COURSE_OUTCOMES[course.title] || []
  const catStyle = CATEGORY_COLORS[course.category] || 'bg-gray-100 text-gray-700'
  const totalModules = steps.filter((s) => s.type === 'module').length
  const completedModules = steps.filter((s) => s.type === 'module' && s.status === 'complete').length
  const pct = totalModules ? Math.round((completedModules / totalModules) * 100) : 0

  const stations = steps.map((s) => {
    const linkTo = s.type === 'module' ? `/courses/${courseId}/modules/${s.id}` : s.type === 'exam' ? `/courses/${courseId}/exam` : '/certificates'
    const actionText = s.type === 'module' ? (s.status === 'complete' ? 'Review' : 'Start module') : s.type === 'exam' ? (s.status === 'complete' ? 'Review result' : 'Take exam') : 'View certificate'
    const label = s.status === 'current' ? 'ready' : s.status
    return {
      key: s.id,
      label: s.title,
      sublabel: s.sublabel,
      status: s.status,
      badge: <StatusBadge status={s.status}>{s.type === 'exam' && s.status === 'current' ? label : s.status}</StatusBadge>,
      action: s.status !== 'locked' ? (
        <Link to={linkTo} className="text-sm font-medium text-blue-600 hover:underline">{actionText} →</Link>
      ) : null,
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero banner ──────────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ backgroundColor: coverBg }}>
        {/* Subtle dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

        <div className="relative mx-auto max-w-6xl px-6 py-12 sm:px-10 sm:py-16">
          <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-white/50 hover:text-white/80 transition">
            ← Back to catalog
          </Link>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Logo + text side */}
            <div className="flex items-center gap-8 max-w-2xl">
              {/* Inline SVG tech logo — no external requests */}
              <div className="shrink-0 hidden sm:flex items-center justify-center">
                <CourseLogo title={course.title} size={96} />
              </div>
              {/* Course info */}
              <div>
                <span className={`mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold ${catStyle}`}>
                  {course.category || 'Course'}
                </span>
                <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                  {course.title}
                </h1>
                {course.description && (
                  <p className="mt-4 text-base text-white/60 leading-relaxed">{course.description}</p>
                )}
                {/* Meta row */}
                <div className="mt-6 flex flex-wrap gap-5">
                  <InfoRow icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>}>
                    {totalModules} video modules
                  </InfoRow>
                  <InfoRow icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>}>
                    Mini-exam after each module
                  </InfoRow>
                  <InfoRow icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>}>
                    Certificate on passing
                  </InfoRow>
                </div>
                {/* Progress bar if enrolled */}
                {isEnrolled && totalModules > 0 && (
                  <div className="mt-6 max-w-sm">
                    <div className="mb-1.5 flex justify-between text-xs text-white/50">
                      <span>Your progress</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-blue-400 transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="mt-1 text-xs text-white/40">{completedModules} of {totalModules} modules complete</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: enroll card */}
            <div className="shrink-0 lg:min-w-[240px]">
              {!isEnrolled ? (
                <div className="rounded-xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
                  <p className="mb-1 text-2xl font-bold text-white">Free</p>
                  <p className="mb-5 text-xs text-white/50">Full access · No credit card</p>
                  <button
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="w-full rounded-lg bg-blue-600 py-3 text-sm font-bold text-white shadow-xl shadow-blue-900/50 transition hover:bg-blue-500 disabled:opacity-60"
                  >
                    {enrolling ? 'Enrolling…' : isAuthed ? 'Enroll now' : 'Sign in to enroll'}
                  </button>
                  <ul className="mt-5 flex flex-col gap-2.5">
                    {['Video lessons', 'Module mini-exams', 'Final exam', 'Downloadable certificate'].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-white/60">
                        <CheckCircle className="text-blue-400" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="rounded-xl border border-green-400/30 bg-green-500/10 p-6 backdrop-blur-sm">
                  <div className="mb-3 flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-green-400">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M7 12.5l3.5 3.5 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm font-bold text-green-400">Enrolled</span>
                  </div>
                  <p className="text-xs text-white/50">{pct}% complete · {completedModules}/{totalModules} modules done</p>
                  {completedModules < totalModules && (
                    <Link
                      to={steps.find(s => s.status === 'current' && s.type === 'module') ? `/courses/${courseId}/modules/${steps.find(s => s.status === 'current' && s.type === 'module')?.id}` : '#'}
                      className="mt-4 block w-full rounded-lg bg-blue-600 py-2.5 text-center text-sm font-bold text-white transition hover:bg-blue-500"
                    >
                      Continue learning →
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* What you'll learn */}
          {outcomes.length > 0 && (
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 font-display text-base font-bold text-gray-900">What you'll learn</h2>
                <ul className="flex flex-col gap-3">
                  {outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <CheckCircle className="mt-0.5 shrink-0 text-blue-600" /> {o}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-gray-100 pt-5">
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">This course includes</h3>
                  <ul className="flex flex-col gap-2.5">
                    {[
                      { icon: '🎬', text: `${totalModules} video lessons` },
                      { icon: '📝', text: `${totalModules} mini-exams` },
                      { icon: '🏆', text: '1 final exam' },
                      { icon: '🎓', text: 'Certificate of completion' },
                    ].map(({ icon, text }) => (
                      <li key={text} className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{icon}</span> {text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Course track */}
          <div className={outcomes.length > 0 ? 'lg:col-span-2' : 'lg:col-span-3'}>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 font-display text-lg font-bold text-gray-900">Course content</h2>
              <ProgressRail stations={stations} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}