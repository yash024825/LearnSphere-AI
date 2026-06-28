import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form)
      navigate(location.state?.from?.pathname || '/', { replace: true })
    } catch (err) {
      setError(err.response?.data?.message || 'Could not sign in. Check your details and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col gap-8 px-6 py-20">
      <div>
        <p className="eyebrow mb-3">Sign in</p>
        <h1 className="font-display text-3xl font-semibold text-ink">Welcome back</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Field
          label="Email"
          type="email"
          value={form.email}
          onChange={(v) => setForm({ ...form, email: v })}
          required
        />
        <Field
          label="Password"
          type="password"
          value={form.password}
          onChange={(v) => setForm({ ...form, password: v })}
          required
        />

        {error && (
          <p className="rounded-sm border border-clay/30 bg-clay/10 px-3 py-2 text-sm text-clay">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-sm bg-ink px-4 py-2.5 text-sm font-medium text-parchment transition-colors hover:bg-ink/90 disabled:opacity-60"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="text-sm text-ink/60">
        New here?{' '}
        <Link to="/signup" className="font-medium text-ink underline underline-offset-2">
          Create an account
        </Link>
      </p>
    </div>
  )
}

export function Field({ label, type = 'text', value, onChange, required, hint }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="eyebrow">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="hairline rounded-sm bg-white/60 px-3 py-2.5 text-ink outline-none focus:border-ink"
      />
      {hint && <span className="text-xs text-ink/50">{hint}</span>}
    </label>
  )
}
