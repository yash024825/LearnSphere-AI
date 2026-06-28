import { createContext, useContext, useState, useCallback } from 'react'
import * as api from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  })
  const [token, setToken] = useState(() => localStorage.getItem('token'))

  const persist = (data) => {
    // tolerate either { token, user } or { token, data: user }
    const t = data.token
    const u = data.user || data.data || null
    if (t) localStorage.setItem('token', t)
    if (u) localStorage.setItem('user', JSON.stringify(u))
    setToken(t)
    setUser(u)
    return u
  }

  const login = useCallback(async (credentials) => {
    const data = await api.login(credentials)
    return persist(data)
  }, [])

  const signup = useCallback(async (details) => {
    const data = await api.signup(details)
    return persist(data)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, isAuthed: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
