import { useRef, useState } from 'react'
import { api } from '../api/api'
import { useAuth } from '../context/AuthContext'
import { addUpload, getUploads } from '../utils/uploads'
import Cover from '../components/Cover'
import { UploadIcon } from '../components/Icons'

export default function Upload() {
  const { user } = useAuth()
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState({ type: '', text: '' })
  const [uploads, setUploads] = useState(() => getUploads(user.id))
  const fileRef = useRef(null)

  const submit = async (e) => {
    e.preventDefault()
    if (!file) return setMsg({ type: 'error', text: 'Choose an audio file' })
    setBusy(true)
    setMsg({ type: '', text: '' })
    try {
      const d = await api.uploadMusic(title.trim(), file)
      setUploads(addUpload(user.id, d.music))
      setMsg({ type: 'ok', text: `"${d.music.title}" uploaded` })
      setTitle('')
      setFile(null)
      if (fileRef.current) fileRef.current.value = ''
    } catch (err) {
      setMsg({ type: 'error', text: err.message })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="page">
      <header className="page-head gradient">
        <h1>Upload a song</h1>
        <p className="muted">Share your music with listeners.</p>
      </header>

      <form className="form-card" onSubmit={submit}>
        <label>
          Song title
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>

        <label className={`dropzone ${file ? 'has-file' : ''}`}>
          <UploadIcon size={28} />
          <span>{file ? file.name : 'Click to choose an audio file'}</span>
          <input
            ref={fileRef}
            type="file"
            accept="audio/*"
            onChange={(e) => setFile(e.target.files[0] || null)}
            hidden
          />
        </label>

        {msg.text && <p className={msg.type === 'error' ? 'error' : 'success'}>{msg.text}</p>}

        <button className="btn-primary" disabled={busy}>{busy ? 'Uploading…' : 'Upload'}</button>
      </form>

      <section>
        <h2>Your uploads</h2>
        <p className="muted small">Songs uploaded from this browser.</p>
        {uploads.length === 0 ? (
          <p className="muted">Nothing uploaded yet.</p>
        ) : (
          <div className="upload-list">
            {uploads.map((m) => (
              <div key={m.id} className="upload-item">
                <Cover seed={m.title} size={40} />
                <span className="ellipsis grow">{m.title}</span>
                <audio src={m.uri} controls preload="none" />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
