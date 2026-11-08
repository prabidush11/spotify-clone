import { usePlayer } from '../context/PlayerContext'
import Cover from './Cover'
import { NextIcon, PauseIcon, PlayIcon, PrevIcon, VolumeIcon } from './Icons'

export const fmt = (s) => {
  if (!s || !isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export default function PlayerBar() {
  const { current, playing, time, duration, volume, setVolume, toggle, next, prev, seek } = usePlayer()

  return (
    <footer className="player">
      <div className="player-track">
        {current ? (
          <>
            <Cover seed={current.title} size={56} />
            <div className="ellipsis">
              <div className="player-title ellipsis">{current.title}</div>
              <div className="muted small ellipsis">{current.artistName || 'Unknown artist'}</div>
            </div>
          </>
        ) : (
          <span className="muted small">Nothing playing</span>
        )}
      </div>

      <div className="player-center">
        <div className="player-controls">
          <button className="icon-btn" onClick={prev} disabled={!current} aria-label="Previous"><PrevIcon /></button>
          <button className="play-btn" onClick={toggle} disabled={!current} aria-label={playing ? 'Pause' : 'Play'}>
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button className="icon-btn" onClick={next} disabled={!current} aria-label="Next"><NextIcon /></button>
        </div>
        <div className="progress">
          <span className="time">{fmt(time)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={Math.min(time, duration || 0)}
            onChange={(e) => seek(Number(e.target.value))}
            disabled={!current}
            style={{ '--pct': `${duration ? (time / duration) * 100 : 0}%` }}
          />
          <span className="time">{fmt(duration)}</span>
        </div>
      </div>

      <div className="player-volume">
        <VolumeIcon size={18} />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          style={{ '--pct': `${volume * 100}%` }}
          aria-label="Volume"
        />
      </div>
    </footer>
  )
}
