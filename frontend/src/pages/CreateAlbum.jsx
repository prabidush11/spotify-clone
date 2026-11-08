import { useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/api'
import { useAuth } from '../context/AuthContext'
import { getUploads } from '../utils/uploads'
import Cover from '../components/Cover'

export default function CreateAlbum() {
  const { user } = useAuth()
  const uploads = getUploads(user.id)
  const [title, setTitle] = useState('')
  const [selected, setSelected] = useState([])
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState({ type: '', text: '' })

  const toggle = (id) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setMsg({ type: '', text: '' })
    try {
      const d = await api.createAlbum(title.trim(), selected)
      setMsg({ type: 'ok', text: `Album "${d.album.title}" created with ${d.album.musics.length} songs` })
      setTitle('')
      setSelected([])
    } catch (err) {
      setMsg({ type: 'error', text: err.message })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="page">
      <header className="page-head gradient">
        <h1>Create an album</h1>
        <p className="muted">Group your uploaded songs into an album.</p>
      </header>

      <form className="form-card" onSubmit={submit}>
        <label>
          Album title
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>

        <div>
          <p className="label">Songs ({selected.length} selected)</p>
          {uploads.length === 0 ? (
            <p className="muted small">
              No uploads found in this browser. <Link to="/studio/upload">Upload a song</Link> first.
            </p>
          ) : (
            <div className="upload-list">
              {uploads.map((m) => (
                <label key={m.id} className={`upload-item pick ${selected.includes(m.id) ? 'on' : ''}`}>
                  <input type="checkbox" checked={selected.includes(m.id)} onChange={() => toggle(m.id)} />
                  <Cover seed={m.title} size={40} />
                  <span className="ellipsis grow">{m.title}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {msg.text && <p className={msg.type === 'error' ? 'error' : 'success'}>{msg.text}</p>}

        <button className="btn-primary" disabled={busy}>{busy ? 'Creating…' : 'Create album'}</button>
      </form>
    </div>
  )
}
