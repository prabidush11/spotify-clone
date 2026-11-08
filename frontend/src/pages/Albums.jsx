import { api } from '../api/api'
import { useApi } from '../hooks/useApi'
import AlbumCard from '../components/AlbumCard'

export default function Albums() {
  const { data, error, loading } = useApi(api.getAlbums)
  const albums = data?.albums || []

  return (
    <div className="page">
      <header className="page-head">
        <h1>Albums</h1>
      </header>
      {loading && <p className="muted">Loading…</p>}
      {error && <p className="error">{error}</p>}
      {data && !albums.length && <p className="muted">No albums yet.</p>}
      <div className="grid">
        {albums.map((a) => <AlbumCard key={a._id} album={a} />)}
      </div>
    </div>
  )
}
