import { useCallback, useEffect, useState } from 'react'
import * as api from '../api/client'

// Centralizes "what's locked, what's current, what's done" so CourseDetail
// (the overview track) and ModulePlayer (the sidebar course player) derive
// identical lock-state from one place instead of duplicating the logic.
export function useCourseProgress(courseId, isAuthed) {
  const [course, setCourse] = useState(null)
  const [modules, setModules] = useState(null)
  const [enrollment, setEnrollment] = useState(null)
  const [progress, setProgress] = useState(null)
  const [exam, setExam] = useState(null)
  const [certificate, setCertificate] = useState(null)
  const [error, setError] = useState('')
  const [enrolling, setEnrolling] = useState(false)

  const load = useCallback(async () => {
    setError('')
    try {
      const courseData = await api.getCourse(courseId)
      setCourse(courseData.course || courseData)

      const list = courseData.modules || []
      setModules(list.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0)))

      if (isAuthed) {
        try {
          const enr = await api.getEnrollmentForCourse(courseId)
          setEnrollment(enr.enrollment || null)
          setProgress(enr.progress || null)
        } catch {
          setEnrollment(null)
          setProgress(null)
        }
        try {
          const examData = await api.getExamForCourse(courseId)
          setExam(examData.exam || examData)
        } catch {
          setExam(null)
        }
        try {
          const certData = await api.getMyCertificates()
          const certs = Array.isArray(certData) ? certData : certData.certificates || []
          const match = certs.find(
            (c) => (c.courseId?._id || c.courseId || c.course?._id || c.course) === courseId,
          )
          setCertificate(match || null)
        } catch {
          setCertificate(null)
        }
      }
    } catch {
      setError('Could not load this course. It may not exist or the backend is unreachable.')
    }
  }, [courseId, isAuthed])

  useEffect(() => {
    load()
  }, [load])

  const enroll = async () => {
    setEnrolling(true)
    try {
      await api.enroll(courseId)
      await load()
      return true
    } catch (err) {
      setError(err.response?.data?.message || 'Could not enroll in this course.')
      return false
    } finally {
      setEnrolling(false)
    }
  }

  const loaded = !!course && modules !== null

  const completedIds = new Set(
    (enrollment?.completedModuleIds || []).map((m) => (typeof m === 'string' ? m : m._id)),
  )
  const isEnrolled = !!enrollment
  const allModulesComplete =
    progress?.allModulesComplete ??
    (loaded && modules.length > 0 && modules.every((m) => completedIds.has(m._id)))
  const examPassed = !!certificate

  let steps = []
  if (loaded) {
    let nextUnlockedFound = false
    const moduleSteps = modules.map((m) => {
      const complete = completedIds.has(m._id)
      let status = 'locked'
      if (complete) status = 'complete'
      else if (!nextUnlockedFound && isEnrolled) {
        status = 'current'
        nextUnlockedFound = true
      }
      return {
        type: 'module',
        id: m._id,
        title: m.title,
        sublabel: m.summary || m.description || (m.contentType ? `${m.contentType} lesson` : undefined),
        status,
        order: m.order,
      }
    })

    const examStatus = examPassed ? 'complete' : allModulesComplete ? 'current' : 'locked'
    const certStatus = examPassed ? 'complete' : 'locked'

    steps = [
      ...moduleSteps,
      {
        type: 'exam',
        id: 'exam',
        title: 'Final exam',
        sublabel: exam ? `${exam.questions?.length ?? ''} questions` : 'Unlocks after all modules',
        status: examStatus,
      },
      {
        type: 'certificate',
        id: 'certificate',
        title: 'Certificate',
        sublabel: examPassed ? 'Issued on passing score' : 'Unlocks after passing the exam',
        status: certStatus,
      },
    ]
  }

  return {
    course,
    modules,
    enrollment,
    progress,
    exam,
    certificate,
    error,
    loaded,
    isEnrolled,
    allModulesComplete,
    examPassed,
    completedIds,
    steps,
    enroll,
    enrolling,
    reload: load,
  }
}
