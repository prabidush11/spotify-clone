import { createContext, useContext, useState } from 'react'
import { api } from '../api/api'

const AuthContext = createContext(null)
const KEY = 'sc_user'

// The backend has no "who am I" endpoint, so the user object returned by
// login/register is remembered in localStorage. The real auth is the token cookie.
function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY))
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(load)

  const save = (u) => {
    setUser(u)
    try {
      if (u) localStorage.setItem(KEY, JSON.stringify(u))
      else localStorage.removeItem(KEY)
    } catch {
      // storage unavailable
    }
  }

  const login = async (body) => {
    const d = await api.login(body)
    save(d.user)
    return d.user
  }
  const register = async (body) => {
    const d = await api.register(body)
    save(d.user)
    return d.user
  }
  const logout = async () => {
    try {
      await api.logout()
    } finally {
      save(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, clear: () => save(null) }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
