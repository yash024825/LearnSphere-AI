import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCourseProgress } from '../hooks/useCourseProgress'

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 11V7a4 4 0 118 0v4" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
}
function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function StepIcon({ status }) {
  if (status === 'complete') return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
      <CheckIcon />
    </span>
  )
  if (status === 'locked') return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-400">
      <LockIcon />
    </span>
  )
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-blue-500 bg-white" />
  )
}

function stepHref(courseId, step) {
  if (step.type === 'module') return `/courses/${courseId}/modules/${step.id}`
  if (step.type === 'exam') return `/courses/${courseId}/exam`
  return '/certificates'
}

export default function ModulePlayer() {
  const { courseId, moduleId } = useParams()
  const navigate = useNavigate()
  const { isAuthed } = useAuth()
  const { course, modules, steps, loaded, error } = useCourseProgress(courseId, isAuthed)

  if (error) return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <div className="rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">{error}</div>
    </div>
  )

  if (!loaded) return (
    <div className="flex items-center justify-center py-32">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
    </div>
  )

  const module = modules.find((m) => m._id === moduleId)
  const currentStep = steps.find((s) => s.type === 'module' && s.id === moduleId)

  if (!module || !currentStep) return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <div className="rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
        Could not find this module in the course.
      </div>
    </div>
  )

  const isComplete = currentStep.status === 'complete'
  const isLocked = currentStep.status === 'locked'

  // Check if it's a YouTube embed URL
  const isYouTube = module.videoUrl?.includes('youtube.com/embed')

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* ── Sidebar ─────────────────────────────────────────────── */}
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-72 shrink-0 overflow-y-auto border-r border-gray-200 bg-white lg:flex lg:flex-col">
        {/* Course header */}
        <div className="border-b border-gray-100 p-5">
          <Link
            to={`/courses/${courseId}`}
            className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-gray-600 transition"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to course
          </Link>
          <h2 className="font-display text-sm font-bold leading-snug text-gray-900 line-clamp-2">
            {course.title}
          </h2>
        </div>

        {/* Steps nav */}
        <nav className="flex-1 overflow-y-auto py-3">
          {steps.map((s) => {
            const active = s.type === 'module' && s.id === moduleId
            const clickable = s.status !== 'locked'
            const content = (
              <div className={`flex items-start gap-3 px-5 py-3 transition-colors ${
                active ? 'border-l-2 border-blue-600 bg-blue-50' : 'border-l-2 border-transparent hover:bg-gray-50'
              } ${!clickable ? 'opacity-50' : ''}`}>
                <StepIcon status={s.status} />
                <div className="min-w-0">
                  <p className={`truncate text-sm font-medium ${active ? 'text-blue-700' : 'text-gray-800'}`}>
                    {s.title}
                  </p>
                  {s.sublabel && (
                    <p className="mt-0.5 truncate text-xs text-gray-400">{s.sublabel}</p>
                  )}
                </div>
              </div>
            )
            return clickable ? (
              <Link key={`${s.type}-${s.id}`} to={stepHref(courseId, s)}>{content}</Link>
            ) : (
              <div key={`${s.type}-${s.id}`}>{content}</div>
            )
          })}
        </nav>
      </aside>

      {/* ── Main content ────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">

        {/* Mobile back link */}
        <div className="border-b border-gray-200 bg-white px-6 py-3 lg:hidden">
          <Link to={`/courses/${courseId}`} className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-gray-600">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {course.title}
          </Link>
        </div>

        <div className="mx-auto max-w-4xl px-6 py-8 sm:px-10">

          {/* Module label + title */}
          <div className="mb-6">
            <span className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-700">
              Module {String(module.order ?? 0).padStart(2, '0')}
            </span>
            <h1 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">
              {module.title}
            </h1>
          </div>

          {/* ── Video player ──────────────────────────────────── */}
          {module.videoUrl && (
            <div className="overflow-hidden rounded-xl bg-black shadow-xl">
              {isYouTube ? (
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={`${module.videoUrl}?rel=0&modestbranding=1`}
                    title={module.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              ) : (
                <video controls className="w-full" preload="metadata">
                  <source src={module.videoUrl} type="video/mp4" />
                </video>
              )}
            </div>
          )}

          {/* ── Lecture notes ─────────────────────────────────── */}
          {(module.lectureContent || module.content) && (
            <div className="mt-8 rounded-xl border border-gray-200 bg-white p-7 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-blue-600">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h2 className="font-display text-base font-bold text-gray-900">Lecture Notes</h2>
              </div>
              <p className="leading-relaxed text-gray-600 whitespace-pre-wrap">
                {module.lectureContent || module.content}
              </p>
            </div>
          )}

          {/* ── Bottom action ─────────────────────────────────── */}
          <div className="mt-8">
            {isLocked ? (
              <div className="rounded-xl border border-orange-200 bg-orange-50 px-5 py-4">
                <p className="text-sm font-medium text-orange-700">
                  🔒 Complete the previous module's exam first to unlock this module.
                </p>
              </div>
            ) : isComplete ? (
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-5 py-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-green-600">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M7 12.5l3.5 3.5 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-semibold text-green-700">Module complete — mini-exam passed!</span>
                </div>
                <button
                  onClick={() => navigate(`/courses/${courseId}`)}
                  className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition"
                >
                  Back to track →
                </button>
              </div>
            ) : (
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
                <p className="mb-4 text-sm text-blue-700">
                  📺 Watch the video and read the notes above, then take the mini-exam to complete this module and unlock the next one.
                </p>
                <button
                  onClick={() => navigate(`/courses/${courseId}/modules/${moduleId}/exam`)}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
                >
                  Take mini-exam
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}