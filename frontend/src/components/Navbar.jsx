import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const navLink = ({ isActive }) =>
  `text-sm font-medium transition-colors ${
    isActive ? 'text-ink' : 'text-ink/60 hover:text-ink'
  }`

function initials(nameOrEmail) {
  if (!nameOrEmail) return '?'
  const namePart = nameOrEmail.includes('@') ? nameOrEmail.split('@')[0] : nameOrEmail
  const parts = namePart.trim().split(/\s+/)
  return (parts[0]?.[0] || '').toUpperCase() + (parts[1]?.[0] || '').toUpperCase()
}

export default function Navbar() {
  const { isAuthed, user, logout } = useAuth()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(query.trim() ? `/?q=${encodeURIComponent(query.trim())}` : '/')
  }

  return (
    <header className="hairline-b sticky top-0 z-30 bg-parchment/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-3.5">
        <Link to="/" className="flex shrink-0 items-baseline gap-2">
          <span className="font-display text-xl font-semibold tracking-tight text-ink">
            Coursework
          </span>
        </Link>

        <NavLink to="/" className={navLink} end>
          Catalog
        </NavLink>
        {isAuthed && (
          <NavLink to="/certificates" className={navLink}>
            Certificates
          </NavLink>
        )}

        <form onSubmit={handleSearch} className="ml-2 hidden flex-1 max-w-md sm:block">
          <div className="flex items-center gap-2 rounded-full border border-hairline bg-parchment px-4 py-2 transition-colors focus-within:border-action">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0 text-ink/40">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What do you want to learn?"
              className="w-full bg-transparent text-sm text-ink placeholder:text-ink/40 focus:outline-none"
            />
          </div>
        </form>

        <div className="ml-auto flex shrink-0 items-center gap-4">
          {isAuthed ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                onBlur={() => setTimeout(() => setMenuOpen(false), 150)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-action text-xs font-semibold text-white transition-transform hover:scale-105"
                title={user?.name || user?.email}
              >
                {initials(user?.name || user?.email)}
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-11 w-48 rounded-md border border-hairline bg-parchment py-2 shadow-lg">
                  <p className="truncate px-4 py-1.5 text-xs font-medium text-ink/50">
                    {user?.name || user?.email}
                  </p>
                  <button
                    onClick={() => {
                      logout()
                      navigate('/login')
                    }}
                    className="block w-full px-4 py-1.5 text-left text-sm text-clay hover:bg-clay/5"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className={navLink({ isActive: false })}>
                Log in
              </Link>
              <Link
                to="/signup"
                className="rounded-full bg-action px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-action/90"
              >
                Join for free
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
