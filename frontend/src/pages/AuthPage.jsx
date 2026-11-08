import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogoIcon } from '../components/Icons'

export default function AuthPage({ mode }) {
  const isLogin = mode === 'login'
  const { login, register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ identifier: '', username: '', email: '', password: '', role: 'user' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      let user
      if (isLogin) {
        // backend accepts username OR email
        const id = form.identifier.trim()
        const body = id.includes('@') ? { email: id } : { username: id }
        user = await login({ ...body, password: form.password })
      } else {
        user = await register({
          username: form.username.trim(),
          email: form.email.trim(),
          password: form.password,
          role: form.role,
        })
      }
      navigate(user.role === 'artist' ? '/studio/upload' : '/')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <LogoIcon size={44} className="auth-logo" />
        <h1>{isLogin ? 'Log in to Spotify Clone' : 'Sign up to start listening'}</h1>

        {isLogin ? (
          <label>
            Email or username
            <input value={form.identifier} onChange={set('identifier')} required autoFocus />
          </label>
        ) : (
          <>
            <label>
              Username
              <input value={form.username} onChange={set('username')} required autoFocus />
            </label>
            <label>
              Email
              <input type="email" value={form.email} onChange={set('email')} required />
            </label>
          </>
        )}

        <label>
          Password
          <input type="password" value={form.password} onChange={set('password')} required />
        </label>

        {!isLogin && (
          <fieldset className="role-pick">
            <legend>I am a</legend>
            {['user', 'artist'].map((r) => (
              <label key={r} className={form.role === r ? 'on' : ''}>
                <input type="radio" name="role" value={r} checked={form.role === r} onChange={set('role')} />
                {r === 'user' ? 'Listener' : 'Artist'}
              </label>
            ))}
          </fieldset>
        )}

        {error && <p className="error">{error}</p>}

        <button className="btn-primary" disabled={busy}>
          {busy ? 'Please wait…' : isLogin ? 'Log in' : 'Sign up'}
        </button>

        <p className="muted switch">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <Link to={isLogin ? '/register' : '/login'}>{isLogin ? 'Sign up' : 'Log in'}</Link>
        </p>
      </form>
    </div>
  )
}
