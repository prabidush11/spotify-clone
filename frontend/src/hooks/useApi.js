import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Loads data once. If the cookie is missing/invalid (401), signs the user out locally.
export function useApi(fn) {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const { clear } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    let alive = true
    fn()
      .then((d) => alive && setData(d))
      .catch((e) => {
        if (!alive) return
        if (e.status === 401) {
          clear()
          navigate('/login')
        } else setError(e.message)
      })
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { data, error, loading }
}
