import { usePlayer } from '../context/PlayerContext'
import Cover from './Cover'
import { PauseIcon, PlayIcon } from './Icons'

export default function TrackList({ tracks }) {
  const { current, playing, playList, toggle } = usePlayer()

  if (!tracks.length) return <p className="muted">No songs yet.</p>

  return (
    <div className="tracklist">
      <div className="track-row head">
        <span>#</span>
        <span>Title</span>
      </div>
      {tracks.map((t, i) => {
        const active = current?._id === t._id
        return (
          <div
            key={t._id}
            className={`track-row ${active ? 'active' : ''}`}
            onDoubleClick={() => playList(tracks, i)}
          >
            <span className="track-num">
              <span className="num">{active && playing ? '♫' : i + 1}</span>
              <button
                className="row-play"
                onClick={() => (active ? toggle() : playList(tracks, i))}
                aria-label={active && playing ? 'Pause' : 'Play'}
              >
                {active && playing ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
              </button>
            </span>
            <span className="track-main">
              <Cover seed={t.title} size={40} />
              <span className="ellipsis">
                <span className="track-title ellipsis">{t.title}</span>
                <span className="muted small ellipsis">{t.artistName || 'Unknown artist'}</span>
              </span>
            </span>
          </div>
        )
      })}
    </div>
  )
}
