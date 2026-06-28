import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Field } from './Login'

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signup(form)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create your account. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col gap-8 px-6 py-20">
      <div>
        <p className="eyebrow mb-3">Create account</p>
        <h1 className="font-display text-3xl font-semibold text-ink">Start learning</h1>
        <p className="mt-2 text-sm text-ink/60">
          New accounts are enrolled as students. To create courses, ask an admin to upgrade
          your role.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
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
          hint="At least 8 characters."
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
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="text-sm text-ink/60">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-ink underline underline-offset-2">
          Sign in
        </Link>
      </p>
    </div>
  )
}
