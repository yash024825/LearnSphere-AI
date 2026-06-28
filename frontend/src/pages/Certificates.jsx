import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as api from '../api/client'

const COURSE_COLORS = {
  'Intro to React':               { bg: 'from-[#20232a] to-[#1a3a4a]', accent: '#61DAFB' },
  'JavaScript Fundamentals':      { bg: 'from-[#1a1a00] to-[#3a3a00]', accent: '#f7df1e' },
  'Python for Beginners':         { bg: 'from-[#1e3a5f] to-[#0d2137]', accent: '#ffd343' },
  'Node.js & Express':            { bg: 'from-[#0d1f0d] to-[#1a3a1a]', accent: '#68A063' },
  'MongoDB Essentials':           { bg: 'from-[#001e2b] to-[#003a2b]', accent: '#00ED64' },
  'Data Structures & Algorithms': { bg: 'from-[#1e1b4b] to-[#312e81]', accent: '#a5b4fc' },
  'Git & GitHub Basics':          { bg: 'from-[#3a0a00] to-[#7c1f0f]', accent: '#f05032' },
  'REST API Design':              { bg: 'from-[#0f2a2a] to-[#0f4c4c]', accent: '#34d399' },
  'Docker Fundamentals':          { bg: 'from-[#003a4a] to-[#0369a1]', accent: '#0db7ed' },
  'Cloud Computing with AWS':     { bg: 'from-[#1a1f2e] to-[#232f3e]', accent: '#FF9900' },
}

function CertificateCard({ cert, onDownload, downloading }) {
  const title = cert.courseId?.title || 'Course certificate'
  const theme = COURSE_COLORS[title] || { bg: 'from-slate-800 to-slate-700', accent: '#60a5fa' }
  const issuedDate = cert.issuedAt
    ? new Date(cert.issuedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    : '—'
  const category = cert.courseId?.category || 'Course'

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-xl hover:-translate-y-0.5">
      {/* Certificate preview banner */}
      <div className={`relative bg-gradient-to-br ${theme.bg} px-8 py-10 text-white`}>
        {/* Decorative circles */}
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-10" style={{ background: theme.accent }} />
        <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full opacity-10" style={{ background: theme.accent }} />

        {/* Certificate icon */}
        <div className="relative mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: `${theme.accent}20`, border: `1px solid ${theme.accent}40` }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 15l-3 6 3-1.5 3 1.5-3-6z" fill={theme.accent}/>
              <circle cx="12" cy="9" r="6" stroke={theme.accent} strokeWidth="2"/>
              <path d="M9 9l2 2 4-4" stroke={theme.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: theme.accent }}>
              Certificate of Completion
            </p>
            <p className="text-xs text-white/50">{category}</p>
          </div>
        </div>

        <h3 className="font-display text-xl font-bold leading-tight text-white">
          {title}
        </h3>

        {/* Decorative line */}
        <div className="mt-4 h-px w-full opacity-20" style={{ background: theme.accent }} />

        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-white/50">Issued {issuedDate}</p>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full" style={{ background: theme.accent }} />
            <p className="font-mono text-[10px] text-white/40">{cert.certificateCode}</p>
          </div>
        </div>
      </div>

      {/* Card footer */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-green-500">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M7 12.5l3.5 3.5 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xs font-semibold text-green-600">Verified</span>
        </div>

        <button
          onClick={() => onDownload(cert)}
          disabled={downloading}
          className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-gray-700 disabled:opacity-50"
        >
          {downloading ? (
            <>
              <div className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Downloading…
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M12 3v13M7 11l5 5 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 21h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              Download PDF
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default function Certificates() {
  const [certs, setCerts] = useState(null)
  const [error, setError] = useState('')
  const [downloadingId, setDownloadingId] = useState(null)
  const [downloadError, setDownloadError] = useState('')

  useEffect(() => {
    api
      .getMyCertificates()
      .then((data) => setCerts(Array.isArray(data) ? data : data.certificates || []))
      .catch(() => setError('Could not load your certificates.'))
  }, [])

  const handleDownload = async (cert) => {
    setDownloadError('')
    setDownloadingId(cert._id)
    try {
      const blob = await api.downloadCertificate(cert._id)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      const title = cert.courseId?.title || 'certificate'
      a.download = `${title.replace(/[^\w\- ]+/g, '')}-certificate.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch {
      setDownloadError('Could not download this certificate. Try again.')
    } finally {
      setDownloadingId(null)
    }
  }

  const earnedCount = certs?.length ?? 0

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="border-b border-gray-200 bg-white px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-600">
                Your achievements
              </p>
              <h1 className="font-display text-4xl font-bold text-gray-900">
                Certificates
              </h1>
              <p className="mt-3 text-gray-500">
                Every certificate you earn is verified and downloadable as a PDF.
              </p>
            </div>
            {earnedCount > 0 && (
              <div className="shrink-0 rounded-2xl border border-blue-100 bg-blue-50 px-6 py-4 text-center">
                <p className="font-display text-4xl font-bold text-blue-600">{earnedCount}</p>
                <p className="mt-1 text-xs font-semibold text-blue-500">
                  {earnedCount === 1 ? 'Certificate' : 'Certificates'} earned
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-6 py-10">

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">{error}</div>
        )}
        {downloadError && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">{downloadError}</div>
        )}

        {!error && certs === null && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl bg-gray-200 h-52" />
            ))}
          </div>
        )}

        {certs?.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white py-20 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                <path d="M12 15l-3 6 3-1.5 3 1.5-3-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <circle cx="12" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M9 9l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="font-display text-xl font-bold text-gray-700">No certificates yet</h2>
            <p className="mt-2 text-sm text-gray-400">
              Complete all modules and pass a course's final exam to earn one.
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-blue-500"
            >
              Browse courses →
            </Link>
          </div>
        )}

        {certs && certs.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certs.map((cert) => (
              <CertificateCard
                key={cert._id}
                cert={cert}
                onDownload={handleDownload}
                downloading={downloadingId === cert._id}
              />
            ))}
          </div>
        )}

        {/* Keep learning CTA */}
        {certs && certs.length > 0 && (
          <div className="mt-12 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-8">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-display text-lg font-bold text-gray-900">Keep learning</h3>
                <p className="mt-1 text-sm text-gray-500">
                  There are more courses waiting. Earn your next certificate.
                </p>
              </div>
              <Link
                to="/"
                className="shrink-0 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-blue-500"
              >
                Browse catalog →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}