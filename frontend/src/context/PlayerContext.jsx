import { createContext, useContext, useEffect, useRef, useState } from 'react'

const PlayerContext = createContext(null)

export function PlayerProvider({ children }) {
  const audioRef = useRef(null)
  if (!audioRef.current) audioRef.current = new Audio()

  const [queue, setQueue] = useState([])
  const [index, setIndex] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)

  const current = index >= 0 ? queue[index] : null

  useEffect(() => {
    const a = audioRef.current
    const onTime = () => setTime(a.currentTime)
    const onMeta = () => setDuration(a.duration || 0)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    a.addEventListener('timeupdate', onTime)
    a.addEventListener('loadedmetadata', onMeta)
    a.addEventListener('play', onPlay)
    a.addEventListener('pause', onPause)
    return () => {
      a.removeEventListener('timeupdate', onTime)
      a.removeEventListener('loadedmetadata', onMeta)
      a.removeEventListener('play', onPlay)
      a.removeEventListener('pause', onPause)
    }
  }, [])

  // go to the next track when one ends
  useEffect(() => {
    const a = audioRef.current
    const onEnded = () => setIndex((i) => (i + 1 < queue.length ? i + 1 : i))
    a.addEventListener('ended', onEnded)
    return () => a.removeEventListener('ended', onEnded)
  }, [queue.length])

  useEffect(() => {
    const a = audioRef.current
    if (!current) return
    if (a.src !== current.uri) {
      a.src = current.uri
      setTime(0)
      setDuration(0)
    }
    a.play().catch(() => {})
  }, [current])

  useEffect(() => {
    audioRef.current.volume = volume
  }, [volume])

  const playList = (tracks, start = 0) => {
    setQueue(tracks)
    setIndex(start)
  }
  const toggle = () => {
    const a = audioRef.current
    if (!current) return
    if (a.paused) a.play().catch(() => {})
    else a.pause()
  }
  const next = () => setIndex((i) => (i + 1 < queue.length ? i + 1 : i))
  const prev = () => {
    const a = audioRef.current
    if (a.currentTime > 3) a.currentTime = 0
    else setIndex((i) => (i > 0 ? i - 1 : i))
  }
  const seek = (t) => {
    audioRef.current.currentTime = t
  }
  const stop = () => {
    const a = audioRef.current
    a.pause()
    a.removeAttribute('src')
    setQueue([])
    setIndex(-1)
  }

  return (
    <PlayerContext.Provider
      value={{ current, playing, time, duration, volume, setVolume, playList, toggle, next, prev, seek, stop }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => useContext(PlayerContext)
