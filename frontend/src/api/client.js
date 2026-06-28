import axios from 'axios'

// Base URL for the backend. Override by creating a .env file with
// VITE_API_URL=http://localhost:5000/api
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const client = axios.create({ baseURL: API_URL })

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
    return Promise.reject(err)
  },
)

// ---- Auth ----
export const signup = (data) =>
  client.post('/auth/signup', data).then((r) => r.data)

export const login = (data) =>
  client.post('/auth/login', data).then((r) => r.data)

// ---- Courses ----
export const getCourses = () =>
  client.get('/courses').then((r) => r.data)

export const getCourse = (courseId) =>
  client.get(`/courses/${courseId}`).then((r) => r.data)

export const createCourse = (data) => client.post('/courses', data).then((r) => r.data)

export const publishCourse = (courseId) =>
  client.patch(`/courses/${courseId}/publish`).then((r) => r.data)

// ---- Modules ----
export const getModule = (moduleId) =>
  client.get(`/modules/${moduleId}`).then((r) => r.data)

export const createModule = (data) => client.post('/modules', data).then((r) => r.data)

export const completeModule = (moduleId) =>
  client.patch(`/modules/${moduleId}/complete`).then((r) => r.data)

// ---- Module Exams ----
export const getModuleExam = (moduleId) =>
  // GET /api/module-exams/module/:moduleId
  // Returns { moduleExam: { _id, moduleId, questions: [{_id, question, options}] } }
  // correctAnswerIndex is stripped server-side — safe to render directly.
  client.get(`/module-exams/module/${moduleId}`).then((r) => r.data)

export const submitModuleExam = (examId, answers) =>
  // POST /api/module-exams/:id/submit { answers: [{questionId, selectedIndex}] }
  // Returns { attempt: { scorePercent, passed, answers, ... } }
  client.post(`/module-exams/${examId}/submit`, { answers }).then((r) => r.data)

// ---- Enrollments ----
export const enroll = (courseId) =>
  client.post('/enrollments', { courseId }).then((r) => r.data)

export const getMyEnrollments = () =>
  client.get('/enrollments/me').then((r) => r.data)

export const getEnrollmentForCourse = (courseId) =>
  client.get(`/enrollments/${courseId}`).then((r) => r.data)

// ---- Exams ----
export const getExamForCourse = (courseId) =>
  client.get(`/exams/course/${courseId}`).then((r) => r.data)

export const createExam = (data) => client.post('/exams', data).then((r) => r.data)

export const submitExam = (examId, answers) =>
  client.post(`/exams/${examId}/submit`, { answers }).then((r) => r.data)

// ---- Certificates ----
export const getMyCertificates = () =>
  client.get('/certificates/me').then((r) => r.data)

export const downloadCertificate = (certificateId) =>
  client.get(`/certificates/${certificateId}/download`, { responseType: 'blob' }).then((r) => r.data)

export default client