import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import CourseCatalog from './pages/CourseCatalog'
import CourseDetail from './pages/CourseDetail'
import ModulePlayer from './pages/ModulePlayer'
import ModuleExam from './pages/ModuleExam'
import Exam from './pages/Exam'
import Certificates from './pages/Certificates'
import Login from './pages/Login'
import Signup from './pages/Signup'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<CourseCatalog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
          <Route
            path="/courses/:courseId/modules/:moduleId"
            element={
              <ProtectedRoute>
                <ModulePlayer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/:courseId/modules/:moduleId/exam"
            element={
              <ProtectedRoute>
                <ModuleExam />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/:courseId/exam"
            element={
              <ProtectedRoute>
                <Exam />
              </ProtectedRoute>
            }
          />
          <Route
            path="/certificates"
            element={
              <ProtectedRoute>
                <Certificates />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  )
}