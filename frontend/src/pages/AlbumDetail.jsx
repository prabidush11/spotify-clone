import { Link, useParams } from 'react-router-dom'
import { usePlayer } from '../context/PlayerContext'
import { useApi } from '../hooks/useApi'
import { loadLibrary } from '../utils/library'
import Cover, { coverColor } from '../components/Cover'
import TrackList from '../components/TrackList'
import { PlayIcon } from '../components/Icons'

export default function AlbumDetail() {
  const { id } = useParams()
  const { playList } = usePlayer()
  const { data, error, loading } = useApi(loadLibrary)

  if (loading) return <div className="page"><p className="muted">Loading…</p></div>
  if (error) return <div className="page"><p className="error">{error}</p></div>

  const album = data.albums.find((a) => a._id === id)
  if (!album) {
    return (
      <div className="page">
        <p className="muted">Album not found.</p>
        <Link to="/albums">Back to albums</Link>
      </div>
    )
  }

  // album.musics is a list of ids, so match them against the full song list
  const byId = Object.fromEntries(data.musics.map((m) => [m._id, m]))
  const tracks = (album.musics || []).map((mid) => byId[mid]).filter(Boolean)

  return (
    <div className="page">
      <header className="album-head" style={{ '--tint': coverColor(album.title) }}>
        <Cover seed={album.title} size={200} />
        <div>
          <p className="small">Album</p>
          <h1 className="album-title">{album.title}</h1>
          <p className="small">
            <strong>{album.artist?.username || 'Unknown artist'}</strong> · {tracks.length} songs
          </p>
        </div>
      </header>

      <div className="section-head">
        <button
          className="play-btn big"
          onClick={() => playList(tracks, 0)}
          disabled={!tracks.length}
          aria-label="Play album"
        >
          <PlayIcon size={24} />
        </button>
      </div>
      <TrackList tracks={tracks} />
    </div>
  )
}
