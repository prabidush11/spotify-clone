import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { usePlayer } from '../context/PlayerContext'
import { useApi } from '../hooks/useApi'
import { loadLibrary } from '../utils/library'
import TrackList from '../components/TrackList'
import AlbumCard from '../components/AlbumCard'
import { PlayIcon } from '../components/Icons'

function greeting() {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
}

export default function Home() {
  const { user } = useAuth()
  const { playList } = usePlayer()
  const { data, error, loading } = useApi(loadLibrary)

  return (
    <div className="page">
      <header className="page-head gradient">
        <h1>{greeting()}, {user.username}</h1>
      </header>

      {loading && <p className="muted">Loading…</p>}
      {error && <p className="error">{error}</p>}

      {data && (
        <>
          {data.albums.length > 0 && (
            <section>
              <div className="section-head">
                <h2>Albums</h2>
                <Link to="/albums" className="muted small">Show all</Link>
              </div>
              <div className="grid">
                {data.albums.slice(0, 6).map((a) => <AlbumCard key={a._id} album={a} />)}
              </div>
            </section>
          )}

          <section>
            <div className="section-head">
              <h2>All songs</h2>
              {data.musics.length > 0 && (
                <button className="play-btn big" onClick={() => playList(data.musics, 0)} aria-label="Play all">
                  <PlayIcon size={24} />
                </button>
              )}
            </div>
            <TrackList tracks={data.musics} />
          </section>
        </>
      )}
    </div>
  )
}
