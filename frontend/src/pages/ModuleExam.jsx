import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as api from '../api/client'
import { useAuth } from '../context/AuthContext'
import { useCourseProgress } from '../hooks/useCourseProgress'

function CorrectIcon() {
  return (
    <svg className="inline-block shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#16a34a" />
      <path d="M7 13l3.5 3.5L17 8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function WrongIcon() {
  return (
    <svg className="inline-block shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#dc2626" />
      <path d="M8 8l8 8M16 8l-8 8" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

export default function ModuleExam() {
  const { courseId, moduleId } = useParams()
  const navigate = useNavigate()
  const { isAuthed } = useAuth()
  const { modules, reload } = useCourseProgress(courseId, isAuthed)

  const [exam, setExam] = useState(null)
  const [examId, setExamId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  const [selections, setSelections] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)
  // correctAnswers: { [questionId]: correctAnswerIndex }
  const [correctAnswers, setCorrectAnswers] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [completing, setCompleting] = useState(false)

  const module = modules?.find((m) => m._id === moduleId)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setFetchError('')

    api
      .getModuleExam(moduleId)
      .then((data) => {
        if (cancelled) return
        setExam(data.moduleExam.questions)
        setExamId(data.moduleExam._id)
      })
      .catch((err) => {
        if (cancelled) return
        setFetchError(err.response?.data?.message || 'Could not load the mini-exam. Try again later.')
      })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [moduleId])

  const allAnswered = exam && exam.every((q) => selections[q._id?.toString?.() ?? q._id] !== undefined)

  const handleSelect = (questionId, idx) => {
    if (result) return
    setSelections((prev) => ({ ...prev, [questionId.toString()]: idx }))
  }

  const handleSubmit = async () => {
    if (!allAnswered || submitting || !examId) return
    setSubmitting(true)
    setSubmitError('')

    const answers = exam.map((q) => ({
      questionId: q._id?.toString?.() ?? q._id,
      selectedIndex: selections[q._id?.toString?.() ?? q._id],
    }))

    try {
      const data = await api.submitModuleExam(examId, answers)
      const { scorePercent, passed } = data.attempt

      // Build a lookup map from the correctAnswers array returned by backend
      const caMap = {}
      if (Array.isArray(data.correctAnswers)) {
        data.correctAnswers.forEach(({ questionId, correctAnswerIndex }) => {
          caMap[questionId] = correctAnswerIndex
        })
      }
      setCorrectAnswers(caMap)

      setResult({
        scorePercent,
        passed,
        correctCount: Math.round((scorePercent / 100) * exam.length),
        total: exam.length,
      })

      if (passed) {
        setCompleting(true)
        try {
          await api.completeModule(moduleId)
          await reload()
        } catch {
          // non-fatal
        } finally {
          setCompleting(false)
        }
      }
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Failed to submit. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleRetry = () => {
    setSelections({})
    setResult(null)
    setCorrectAnswers({})
    setSubmitError('')
  }

  // ── Loading / error ─────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20">
        <p className="text-sm text-ink/50">Loading mini-exam…</p>
      </div>
    )
  }

  if (fetchError) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20">
        <p className="rounded-sm border border-clay/30 bg-clay/10 px-4 py-3 text-sm text-clay">{fetchError}</p>
        <Link to={`/courses/${courseId}/modules/${moduleId}`} className="mt-4 inline-block text-sm text-action hover:underline">
          ← Back to module
        </Link>
      </div>
    )
  }

  // ── Result screen ───────────────────────────────────────────────────────
  if (result) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16">
        <Link to={`/courses/${courseId}/modules/${moduleId}`} className="eyebrow mb-8 inline-block hover:text-ink">
          ← Back to module
        </Link>

        {/* Score banner */}
        <div className={`rounded-sm border p-8 ${result.passed ? 'border-forest/30 bg-forest/5' : 'border-clay/30 bg-clay/5'}`}>
          <p className="eyebrow mb-2">{result.passed ? 'Passed' : 'Not quite'}</p>
          <h1 className="font-display text-3xl font-semibold text-ink">{result.scorePercent}%</h1>
          <p className="mt-2 text-sm text-ink/60">
            {result.correctCount} of {result.total} correct
            {result.passed ? ' — module complete!' : ` — you need ${Math.ceil(0.6 * result.total)} to pass.`}
          </p>
        </div>

        {/* Per-question review with correct/wrong highlighting */}
        <div className="mt-8 flex flex-col gap-6">
          {exam.map((q, qi) => {
            const qid = q._id?.toString?.() ?? q._id
            const chosen = selections[qid]
            const correct = correctAnswers[qid]
            const isQuestionCorrect = chosen === correct

            return (
              <div key={q._id} className="rounded-sm border border-hairline bg-white/60 p-6">
                {/* Question header with result badge */}
                <div className="mb-4 flex items-start justify-between gap-3">
                  <p className="text-sm font-medium text-ink">
                    <span className="mr-2 text-ink/40">Q{qi + 1}.</span>
                    {q.question}
                  </p>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    isQuestionCorrect
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {isQuestionCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>

                <ul className="flex flex-col gap-2">
                  {q.options.map((opt, oi) => {
                    const wasChosen = chosen === oi
                    const isCorrectOption = correct !== undefined && correct === oi
                    const isWrongChoice = wasChosen && !isCorrectOption

                    let rowStyle = 'bg-parchment/40 text-ink/60'
                    if (isCorrectOption) rowStyle = 'bg-green-50 text-green-800 border border-green-200'
                    if (isWrongChoice) rowStyle = 'bg-red-50 text-red-800 border border-red-200'

                    return (
                      <li
                        key={oi}
                        className={`flex items-center gap-3 rounded-sm px-4 py-2.5 text-sm ${rowStyle}`}
                      >
                        <span className="font-mono text-xs opacity-50">{String.fromCharCode(65 + oi)}.</span>
                        <span className="flex-1">{opt}</span>

                        {/* Right side labels */}
                        <span className="flex shrink-0 items-center gap-1.5">
                          {isCorrectOption && (
                            <>
                              <CorrectIcon />
                              <span className="text-xs font-medium text-green-700">Correct answer</span>
                            </>
                          )}
                          {isWrongChoice && (
                            <>
                              <WrongIcon />
                              <span className="text-xs font-medium text-red-700">Your answer</span>
                            </>
                          )}
                          {wasChosen && isCorrectOption && (
                            <span className="ml-1 text-xs text-green-600 opacity-70">(your answer)</span>
                          )}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex gap-3">
          {result.passed ? (
            completing ? (
              <p className="text-sm text-ink/50">Saving progress…</p>
            ) : (
              <button
                onClick={() => navigate(`/courses/${courseId}`)}
                className="rounded-full bg-action px-6 py-2.5 text-sm font-medium text-white hover:bg-action/90"
              >
                Continue to track →
              </button>
            )
          ) : (
            <button
              onClick={handleRetry}
              className="rounded-full bg-action px-6 py-2.5 text-sm font-medium text-white hover:bg-action/90"
            >
              Retry exam
            </button>
          )}
          <Link
            to={`/courses/${courseId}/modules/${moduleId}`}
            className="rounded-full border border-hairline px-6 py-2.5 text-sm font-medium text-ink hover:bg-parchment-dim"
          >
            Review module
          </Link>
        </div>
      </div>
    )
  }

  // ── Exam screen ─────────────────────────────────────────────────────────
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <Link to={`/courses/${courseId}/modules/${moduleId}`} className="eyebrow mb-8 inline-block hover:text-ink">
        ← Back to module
      </Link>

      <p className="eyebrow mb-2">Mini-exam</p>
      <h1 className="font-display text-2xl font-semibold text-ink">
        {module?.title ?? 'Module exam'}
      </h1>
      <p className="mt-2 text-sm text-ink/50">
        {exam.length} questions · 60% to pass · answers locked on submit
      </p>

      <div className="mt-10 flex flex-col gap-8">
        {exam.map((q, qi) => (
          <div key={q._id}>
            <p className="mb-4 font-medium text-ink">
              <span className="mr-2 font-mono text-sm text-ink/40">{qi + 1}.</span>
              {q.question}
            </p>
            <ul className="flex flex-col gap-2">
              {q.options.map((opt, oi) => {
                const selected = selections[q._id?.toString?.() ?? q._id] === oi
                return (
                  <li key={oi}>
                    <button
                      onClick={() => handleSelect(q._id?.toString?.() ?? q._id, oi)}
                      className={`w-full rounded-sm px-4 py-3 text-left text-sm transition-colors ${
                        selected
                          ? 'bg-action text-white'
                          : 'bg-parchment/60 text-ink hover:bg-parchment-dim'
                      }`}
                    >
                      <span className="mr-3 font-mono text-xs opacity-60">
                        {String.fromCharCode(65 + oi)}.
                      </span>
                      {opt}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      {submitError && (
        <p className="mt-6 rounded-sm border border-clay/30 bg-clay/10 px-4 py-3 text-sm text-clay">
          {submitError}
        </p>
      )}

      <div className="mt-10 flex items-center gap-4">
        <button
          onClick={handleSubmit}
          disabled={!allAnswered || submitting}
          className="rounded-full bg-action px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-action/90 disabled:opacity-50"
        >
          {submitting ? 'Submitting…' : 'Submit answers'}
        </button>
        {!allAnswered && (
          <p className="text-xs text-ink/40">Answer all questions to submit.</p>
        )}
      </div>
    </div>
  )
}