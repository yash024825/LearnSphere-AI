import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as api from '../api/client'

function CorrectIcon() {
  return (
    <svg className="inline-block shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#16a34a"/>
      <path d="M7 13l3.5 3.5L17 8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function WrongIcon() {
  return (
    <svg className="inline-block shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#dc2626"/>
      <path d="M8 8l8 8M16 8l-8 8" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  )
}

export default function Exam() {
  const { courseId } = useParams()
  const navigate = useNavigate()

  const [exam, setExam] = useState(null)
  const [selections, setSelections] = useState({})   // { [questionId]: selectedIndex }
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Result state
  const [result, setResult] = useState(null)          // { scorePercent, passed }
  const [correctAnswers, setCorrectAnswers] = useState({}) // { [questionId]: correctAnswerIndex }
  const [certificate, setCertificate] = useState(null)

  useEffect(() => {
    api
      .getExamForCourse(courseId)
      .then((data) => setExam(data.exam || data))
      .catch(() => setError('Could not load the exam. It may not be unlocked yet, or has no questions.'))
  }, [courseId])

  const questions = exam?.questions || []
  const allAnswered = questions.length > 0 && questions.every((q) => {
    const qid = q._id?.toString?.() ?? q._id
    return selections[qid] !== undefined
  })

  const handleSelect = (questionId, idx) => {
    if (result) return
    setSelections((prev) => ({ ...prev, [questionId.toString()]: idx }))
  }

  const handleSubmit = async () => {
    if (!allAnswered || submitting) return
    setSubmitting(true)
    setError('')
    try {
      const payload = questions.map((q) => ({
        questionId: q._id?.toString?.() ?? q._id,
        selectedIndex: selections[q._id?.toString?.() ?? q._id],
      }))

      const data = await api.submitExam(exam._id, payload)

      // Build correctAnswers map
      const caMap = {}
      if (Array.isArray(data.correctAnswers)) {
        data.correctAnswers.forEach(({ questionId, correctAnswerIndex }) => {
          caMap[questionId] = correctAnswerIndex
        })
      }
      setCorrectAnswers(caMap)
      setResult(data.attempt)
      if (data.certificate) setCertificate(data.certificate)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleRetry = () => {
    setSelections({})
    setResult(null)
    setCorrectAnswers({})
    setCertificate(null)
    setError('')
  }

  // ── Loading / error ──────────────────────────────────────────────────
  if (error && !exam) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20">
        <div className="rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">{error}</div>
        <Link to={`/courses/${courseId}`} className="mt-4 inline-block text-sm text-blue-600 hover:underline">
          ← Back to course
        </Link>
      </div>
    )
  }

  if (!exam) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
      </div>
    )
  }

  // ── Result screen ────────────────────────────────────────────────────
  if (result) {
    const passed = result.passed
    const score = result.scorePercent
    const correctCount = Math.round((score / 100) * questions.length)

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-2xl px-6 py-12">
          <Link to={`/courses/${courseId}`} className="mb-8 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-gray-600">
            ← Back to course
          </Link>

          {/* Score banner */}
          <div className={`rounded-xl border p-8 ${passed ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
            <p className={`mb-1 text-xs font-bold uppercase tracking-widest ${passed ? 'text-green-600' : 'text-red-600'}`}>
              {passed ? '🎉 Passed' : '❌ Not quite'}
            </p>
            <h1 className="font-display text-4xl font-bold text-gray-900">{score}%</h1>
            <p className="mt-2 text-sm text-gray-600">
              {correctCount} of {questions.length} correct
              {passed
                ? ' — you passed the final exam!'
                : ` — you need ${Math.ceil(0.6 * questions.length)} correct to pass.`}
            </p>
            {passed && certificate && (
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-green-300 bg-green-100 px-4 py-2.5">
                <span className="text-lg">🎓</span>
                <p className="text-sm font-semibold text-green-800">Certificate issued! Check your Certificates page.</p>
              </div>
            )}
          </div>

          {/* Per-question review */}
          <div className="mt-8 flex flex-col gap-5">
            {questions.map((q, qi) => {
              const qid = q._id?.toString?.() ?? q._id
              const chosen = selections[qid]
              const correct = correctAnswers[qid]
              const isCorrect = chosen === correct

              return (
                <div key={qid} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-gray-900">
                      <span className="mr-2 text-gray-400">Q{qi + 1}.</span>
                      {q.question}
                    </p>
                    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>

                  <ul className="flex flex-col gap-2">
                    {q.options.map((opt, oi) => {
                      const wasChosen = chosen === oi
                      const isCorrectOption = correct !== undefined && correct === oi
                      const isWrongChoice = wasChosen && !isCorrectOption

                      let rowStyle = 'bg-gray-50 text-gray-500'
                      if (isCorrectOption) rowStyle = 'bg-green-50 text-green-800 border border-green-200'
                      if (isWrongChoice) rowStyle = 'bg-red-50 text-red-800 border border-red-200'

                      return (
                        <li key={oi} className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm ${rowStyle}`}>
                          <span className="font-mono text-xs opacity-50">{String.fromCharCode(65 + oi)}.</span>
                          <span className="flex-1">{opt}</span>
                          <span className="flex shrink-0 items-center gap-1.5">
                            {isCorrectOption && !wasChosen && (
                              <><CorrectIcon /><span className="text-xs font-semibold text-green-700">Correct answer</span></>
                            )}
                            {isWrongChoice && (
                              <><WrongIcon /><span className="text-xs font-semibold text-red-700">Your answer</span></>
                            )}
                            {wasChosen && isCorrectOption && (
                              <><CorrectIcon /><span className="text-xs font-semibold text-green-700">Correct ✓</span></>
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
          <div className="mt-8 flex flex-wrap gap-3">
            {passed ? (
              <button
                onClick={() => navigate('/certificates')}
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-blue-500"
              >
                View certificate →
              </button>
            ) : (
              <button
                onClick={handleRetry}
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-blue-500"
              >
                Retry exam
              </button>
            )}
            <Link
              to={`/courses/${courseId}`}
              className="rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition"
            >
              Back to course
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ── Exam screen ──────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <Link to={`/courses/${courseId}`} className="mb-8 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-gray-600">
          ← Back to course
        </Link>

        {/* Header */}
        <div className="mb-8 rounded-xl border border-blue-100 bg-blue-50 p-6">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-blue-600">Final Exam</p>
          <h1 className="font-display text-2xl font-bold text-gray-900">{exam.title || 'Final Exam'}</h1>
          <p className="mt-2 text-sm text-gray-500">
            {questions.length} questions · 60% to pass · answers locked on submit
          </p>
        </div>

        {/* Questions */}
        <div className="flex flex-col gap-8">
          {questions.map((q, qi) => {
            const qid = q._id?.toString?.() ?? q._id
            return (
              <div key={qid} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="mb-4 font-semibold text-gray-900">
                  <span className="mr-2 font-mono text-sm text-gray-400">{qi + 1}.</span>
                  {q.question}
                </p>
                <ul className="flex flex-col gap-2">
                  {q.options.map((opt, oi) => {
                    const selected = selections[qid] === oi
                    return (
                      <li key={oi}>
                        <button
                          onClick={() => handleSelect(qid, oi)}
                          className={`w-full rounded-lg px-4 py-3 text-left text-sm transition-colors ${
                            selected
                              ? 'bg-blue-600 text-white font-medium'
                              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
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
            )
          })}
        </div>

        {/* Submit */}
        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">{error}</div>
        )}

        <div className="mt-8 flex items-center gap-4">
          <button
            onClick={handleSubmit}
            disabled={!allAnswered || submitting}
            className="rounded-lg bg-blue-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:opacity-50"
          >
            {submitting ? 'Submitting…' : 'Submit exam'}
          </button>
          {!allAnswered && (
            <p className="text-xs text-gray-400">
              {questions.length - Object.keys(selections).length} question{questions.length - Object.keys(selections).length !== 1 ? 's' : ''} remaining
            </p>
          )}
        </div>
      </div>
    </div>
  )
}