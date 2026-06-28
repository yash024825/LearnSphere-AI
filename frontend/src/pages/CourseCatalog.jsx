import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import * as api from '../api/client'
import { useAuth } from '../context/AuthContext'

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

// Inline SVG logos — no external requests, always render
const CourseThumbnail = ({ title }) => {
  const thumbnails = {
    'Intro to React': (
      <div className="flex h-full w-full items-center justify-center bg-[#20232a]">
        <svg viewBox="0 0 100 100" width="80" height="80">
          <circle cx="50" cy="50" r="8" fill="#61DAFB"/>
          <ellipse cx="50" cy="50" rx="42" ry="16" fill="none" stroke="#61DAFB" strokeWidth="3"/>
          <ellipse cx="50" cy="50" rx="42" ry="16" fill="none" stroke="#61DAFB" strokeWidth="3" transform="rotate(60 50 50)"/>
          <ellipse cx="50" cy="50" rx="42" ry="16" fill="none" stroke="#61DAFB" strokeWidth="3" transform="rotate(120 50 50)"/>
        </svg>
      </div>
    ),
    'JavaScript Fundamentals': (
      <div className="flex h-full w-full items-center justify-center bg-[#f7df1e]">
        <svg viewBox="0 0 100 100" width="80" height="80">
          <rect width="100" height="100" fill="#f7df1e"/>
          <text x="12" y="78" fontSize="72" fontWeight="bold" fontFamily="Arial" fill="#000">JS</text>
        </svg>
      </div>
    ),
    'Python for Beginners': (
      <div className="flex h-full w-full items-center justify-center bg-[#1e3a5f]">
        <svg viewBox="0 0 100 100" width="80" height="80">
          <path d="M50 10 C30 10 22 18 22 32 L22 42 L50 42 L50 48 L16 48 C10 48 6 54 6 64 C6 76 12 88 28 88 L34 88 L34 76 C34 68 40 62 50 62 L72 62 C80 62 86 56 86 48 L86 32 C86 18 76 10 50 10 Z" fill="#306998"/>
          <path d="M50 90 C70 90 78 82 78 68 L78 58 L50 58 L50 52 L84 52 C90 52 94 46 94 36 C94 24 88 12 72 12 L66 12 L66 24 C66 32 60 38 50 38 L28 38 C20 38 14 44 14 52 L14 68 C14 82 24 90 50 90 Z" fill="#ffd343"/>
          <circle cx="36" cy="30" r="5" fill="white"/>
          <circle cx="64" cy="70" r="5" fill="white"/>
        </svg>
      </div>
    ),
    'Node.js & Express': (
      <div className="flex h-full w-full items-center justify-center bg-[#1a1a1a]">
        <svg viewBox="0 0 120 60" width="110" height="55">
          <text x="4" y="46" fontSize="42" fontWeight="bold" fontFamily="Arial" fill="#68A063">Node</text>
          <text x="88" y="46" fontSize="42" fontWeight="bold" fontFamily="Arial" fill="#404137">.</text>
          <text x="96" y="46" fontSize="42" fontWeight="bold" fontFamily="Arial" fill="#68A063">js</text>
        </svg>
      </div>
    ),
    'MongoDB Essentials': (
      <div className="flex h-full w-full items-center justify-center bg-[#001e2b]">
        <svg viewBox="0 0 80 100" width="50" height="65">
          <path d="M40 5 C40 5 12 35 12 58 C12 74 24 88 40 92 C56 88 68 74 68 58 C68 35 40 5 40 5 Z" fill="#00ED64"/>
          <rect x="37" y="60" width="6" height="35" fill="#00684A"/>
          <path d="M40 5 C40 5 40 60 40 92" stroke="#00684A" strokeWidth="2" fill="none"/>
        </svg>
      </div>
    ),
    'Data Structures & Algorithms': (
      <div className="flex h-full w-full items-center justify-center bg-[#4f46e5]">
        <svg viewBox="0 0 100 100" width="80" height="80">
          <circle cx="50" cy="15" r="10" fill="white"/>
          <circle cx="20" cy="55" r="10" fill="white"/>
          <circle cx="80" cy="55" r="10" fill="white"/>
          <circle cx="35" cy="85" r="10" fill="white"/>
          <circle cx="65" cy="85" r="10" fill="white"/>
          <line x1="50" y1="25" x2="22" y2="45" stroke="white" strokeWidth="3"/>
          <line x1="50" y1="25" x2="78" y2="45" stroke="white" strokeWidth="3"/>
          <line x1="22" y1="65" x2="33" y2="75" stroke="white" strokeWidth="3"/>
          <line x1="78" y1="65" x2="63" y2="75" stroke="white" strokeWidth="3"/>
        </svg>
      </div>
    ),
    'Git & GitHub Basics': (
      <div className="flex h-full w-full items-center justify-center bg-[#f05032]">
        <svg viewBox="0 0 100 100" width="72" height="72">
          <path d="M92 46 L54 8 C52 6 49 6 47 8 L39 16 L49 26 C51 25 54 25 56 27 C58 29 58 32 57 34 L66 43 C68 42 71 42 73 44 C76 47 76 52 73 55 C70 58 65 58 62 55 C60 53 59 50 60 47 L52 39 L52 61 C53 62 54 63 54 65 C54 68 51 71 48 71 C45 71 42 68 42 65 C42 63 43 61 45 60 L45 37 C43 36 42 34 42 32 C42 29 44 27 46 26 L36 16 L8 44 C6 46 6 49 8 51 L46 89 C48 91 51 91 53 89 L92 50 C94 48 94 48 92 46 Z" fill="white"/>
        </svg>
      </div>
    ),
    'REST API Design': (
      <div className="flex h-full w-full items-center justify-center bg-[#0f766e]">
        <svg viewBox="0 0 110 50" width="100" height="46">
          <rect x="2" y="8" width="106" height="34" rx="6" fill="none" stroke="white" strokeWidth="3"/>
          <text x="10" y="32" fontSize="20" fontWeight="bold" fontFamily="monospace" fill="#34d399">GET</text>
          <text x="52" y="32" fontSize="14" fontFamily="monospace" fill="white">/api/v1</text>
        </svg>
      </div>
    ),
    'Docker Fundamentals': (
      <div className="flex h-full w-full items-center justify-center bg-[#0db7ed]">
        <svg viewBox="0 0 120 80" width="100" height="67">
          {/* Docker whale simplified */}
          <rect x="10" y="30" width="16" height="12" rx="2" fill="white"/>
          <rect x="30" y="22" width="16" height="20" rx="2" fill="white"/>
          <rect x="50" y="30" width="16" height="12" rx="2" fill="white"/>
          <rect x="70" y="22" width="16" height="20" rx="2" fill="white"/>
          <rect x="90" y="30" width="16" height="12" rx="2" fill="white"/>
          <rect x="10" y="46" width="96" height="14" rx="3" fill="white"/>
          <path d="M30 60 Q60 75 100 60" fill="white"/>
          <text x="28" y="73" fontSize="22" fontWeight="bold" fontFamily="Arial" fill="white">docker</text>
        </svg>
      </div>
    ),
    'Cloud Computing with AWS': (
      <div className="flex h-full w-full items-center justify-center bg-[#232f3e]">
        <svg viewBox="0 0 120 70" width="110" height="64">
          {/* AWS smile logo */}
          <text x="8" y="44" fontSize="38" fontWeight="bold" fontFamily="Arial" fill="white">aws</text>
          <path d="M8 54 Q60 72 112 54" fill="none" stroke="#FF9900" strokeWidth="5" strokeLinecap="round"/>
          <polygon points="108,48 116,54 108,60" fill="#FF9900"/>
        </svg>
      </div>
    ),
  }

  return thumbnails[title] || (
    <div className="flex h-full w-full items-center justify-center bg-slate-700">
      <svg viewBox="0 0 60 60" width="48" height="48">
        <rect x="8" y="8" width="44" height="44" rx="6" fill="none" stroke="white" strokeWidth="3"/>
        <path d="M20 30h20M20 22h20M20 38h12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

const CATEGORY_COLORS = {
  'Web Development':     { bg: 'bg-blue-100',   text: 'text-blue-700',   dot: 'bg-blue-500' },
  'Backend Development': { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' },
  'Programming':         { bg: 'bg-green-100',  text: 'text-green-700',  dot: 'bg-green-500' },
  'Databases':           { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500' },
  'Computer Science':    { bg: 'bg-indigo-100', text: 'text-indigo-700', dot: 'bg-indigo-500' },
  'Developer Tools':     { bg: 'bg-rose-100',   text: 'text-rose-700',   dot: 'bg-rose-500' },
  'DevOps':              { bg: 'bg-cyan-100',   text: 'text-cyan-700',   dot: 'bg-cyan-500' },
  'Cloud Computing':     { bg: 'bg-sky-100',    text: 'text-sky-700',    dot: 'bg-sky-500' },
}

const ALL_CATEGORIES = [
  'All', 'Web Development', 'Backend Development', 'Programming',
  'Databases', 'Computer Science', 'Developer Tools', 'DevOps', 'Cloud Computing',
]

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  )
}

export default function CourseCatalog() {
  const { isAuthed, user } = useAuth()
  const [courses, setCourses] = useState(null)
  const [enrollments, setEnrollments] = useState([])
  const [error, setError] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchParams] = useSearchParams()
  const q = (searchParams.get('q') || '').toLowerCase()

  useEffect(() => {
    api.getCourses()
      .then((data) => setCourses(Array.isArray(data) ? data : data.courses || []))
      .catch(() => setError('Could not load the catalog. Confirm the backend is running.'))
    if (isAuthed) {
      api.getMyEnrollments()
        .then((data) => setEnrollments(data.enrollments || []))
        .catch(() => setEnrollments([]))
    }
  }, [isAuthed])

  const progressFor = (courseId) => {
    const enr = enrollments.find((e) => (e.courseId?._id || e.courseId) === courseId)
    return enr?.progress || null
  }

  const filtered = courses?.filter((c) => {
    const matchQ = !q || c.title?.toLowerCase().includes(q) || c.category?.toLowerCase().includes(q) || c.description?.toLowerCase().includes(q)
    const matchCat = activeCategory === 'All' || c.category === activeCategory
    return matchQ && matchCat
  })

  const firstName = (user?.name || user?.email || '').split(/\s|@/)[0]
  const getCatStyle = (cat) => CATEGORY_COLORS[cat] || { bg: 'bg-slate-100', text: 'text-slate-700', dot: 'bg-slate-500' }

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero (logged out) ─────────────────────────────────────── */}
      {!isAuthed && (
        <section className="bg-gradient-to-b from-slate-900 to-slate-800 px-6 py-20 text-white">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="font-display text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
              Learn to code.<br />
              <span className="text-blue-400">Earn real certificates.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/60">
              Structured video courses with mini-exams after every module, a final exam, and a certificate the moment you pass.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/signup" className="rounded-md bg-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-900/40 transition hover:bg-blue-500">
                Start for free
              </Link>
              <Link to="/login" className="rounded-md border border-white/20 bg-white/10 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-white/20">
                Sign in
              </Link>
            </div>
            <div className="mt-14 flex flex-wrap justify-center gap-10 border-t border-white/10 pt-10">
              {[['10', 'Courses'], ['30', 'Video modules'], ['190', 'Practice questions'], ['100%', 'Free']].map(([n, l]) => (
                <div key={l} className="text-center">
                  <p className="font-display text-3xl font-bold text-white">{n}</p>
                  <p className="mt-1 text-sm text-white/50">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Logged-in greeting ────────────────────────────────────── */}
      {isAuthed && (
        <div className="border-b border-gray-200 bg-white px-6 py-6">
          <div className="mx-auto max-w-6xl flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white text-lg">
              {firstName?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-gray-900">
                {greeting()}, {firstName || 'there'} 👋
              </h1>
              <p className="text-sm text-gray-500">Pick up where you left off, or start something new.</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Category filter bar ───────────────────────────────────── */}
      <div className="sticky top-16 z-10 border-b border-gray-200 bg-white px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeCategory === cat ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Course grid ───────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="font-display text-2xl font-bold text-gray-900">
            {activeCategory === 'All' ? 'All courses' : activeCategory}
          </h2>
          {filtered && (
            <span className="text-sm text-gray-500">{filtered.length} course{filtered.length !== 1 ? 's' : ''}</span>
          )}
        </div>

        {q && <p className="mb-6 text-sm text-gray-500">Results for <span className="font-semibold text-gray-800">"{q}"</span></p>}
        {error && <div className="rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">{error}</div>}

        {!error && courses === null && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => <div key={i} className="animate-pulse rounded-xl bg-gray-100 h-64" />)}
          </div>
        )}

        {filtered?.length === 0 && (
          <div className="rounded-xl border border-gray-200 py-20 text-center">
            <p className="text-lg font-semibold text-gray-700">{q ? 'No results found.' : 'No courses yet.'}</p>
            <p className="mt-1 text-sm text-gray-400">{q ? 'Try a different search term.' : 'Check back soon.'}</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered?.map((course) => {
            const progress = progressFor(course._id)
            const cs = getCatStyle(course.category)
            const pct = progress?.percent ?? 0

            return (
              <Link
                key={course._id}
                to={`/courses/${course._id}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                {/* Branded inline-SVG thumbnail */}
                <div className="relative h-40 overflow-hidden">
                  <CourseThumbnail title={course.title} />
                  {pct === 100 && (
                    <span className="absolute right-2 top-2 rounded-md bg-green-500 px-2 py-0.5 text-[11px] font-bold text-white z-10">
                      ✓ Done
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-4">
                  <span className={`mb-2 inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${cs.bg} ${cs.text}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${cs.dot}`} />
                    {course.category || 'Course'}
                  </span>

                  <h3 className="font-display text-sm font-bold leading-snug text-gray-900 group-hover:text-blue-600 line-clamp-2">
                    {course.title}
                  </h3>

                  {course.description && (
                    <p className="mt-1.5 line-clamp-2 text-xs text-gray-500">{course.description}</p>
                  )}

                  <div className="mt-2 flex items-center gap-1">
                    <span className="text-xs font-bold text-amber-600">4.8</span>
                    <div className="flex">{[...Array(5)].map((_, i) => <StarIcon key={i} />)}</div>
                    <span className="text-xs text-gray-400">(3 modules)</span>
                  </div>

                  <div className="mt-auto pt-3">
                    {progress ? (
                      <>
                        <div className="mb-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                          <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${pct}%` }} />
                        </div>
                        <p className="text-[11px] text-gray-500">{pct}% complete · {progress.completed}/{progress.total} modules</p>
                      </>
                    ) : (
                      <span className="text-xs font-semibold text-blue-600 group-hover:underline">View course →</span>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}