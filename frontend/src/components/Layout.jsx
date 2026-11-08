import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { usePlayer } from '../context/PlayerContext'
import PlayerBar from './PlayerBar'
import { AlbumIcon, HomeIcon, LogoIcon, PlusIcon, UploadIcon } from './Icons'

export default function Layout() {
  const { user, logout } = useAuth()
  const { stop } = usePlayer()
  const navigate = useNavigate()
  const isArtist = user?.role === 'artist'

  const onLogout = async () => {
    stop()
    await logout().catch(() => {})
    navigate('/login')
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="panel brand">
          <LogoIcon size={32} />
          <span>Spotify Clone</span>
        </div>
        <nav className="panel nav">
          {isArtist ? (
            <>
              <p className="nav-title">Artist studio</p>
              <NavLink to="/studio/upload"><UploadIcon /> Upload song</NavLink>
              <NavLink to="/studio/album"><PlusIcon /> Create album</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/" end><HomeIcon /> Home</NavLink>
              <NavLink to="/albums"><AlbumIcon /> Albums</NavLink>
            </>
          )}
        </nav>
        <div className="panel account">
          <div className="avatar">{user?.username?.charAt(0).toUpperCase()}</div>
          <div className="account-info">
            <strong>{user?.username}</strong>
            <span className={`role-badge ${user?.role}`}>{user?.role}</span>
          </div>
          <button className="btn-ghost small" onClick={onLogout}>Log out</button>
        </div>
      </aside>

      <main className="main panel">
        <Outlet />
      </main>

      <PlayerBar />
    </div>
  )
}
