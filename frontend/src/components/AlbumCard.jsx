import { Link } from 'react-router-dom'
import Cover from './Cover'

export default function AlbumCard({ album }) {
  return (
    <Link to={`/albums/${album._id}`} className="card">
      <div className="card-cover">
        <Cover seed={album.title} size={160} />
      </div>
      <div className="card-title ellipsis">{album.title}</div>
      <div className="muted small ellipsis">
        {album.artist?.username || 'Unknown artist'} · {album.musics?.length || 0} songs
      </div>
    </Link>
  )
}
