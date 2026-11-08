import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import AuthPage from './pages/AuthPage'
import Home from './pages/Home'
import Albums from './pages/Albums'
import AlbumDetail from './pages/AlbumDetail'
import Upload from './pages/Upload'
import CreateAlbum from './pages/CreateAlbum'

const homeFor = (user) => (user?.role === 'artist' ? '/studio/upload' : '/')

// Mirrors the backend: listeners (role "user") can browse, artists can upload/create albums
function Protected({ role, children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (role && user.role !== role) return <Navigate to={homeFor(user)} replace />
  return children
}

export default function App() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to={homeFor(user)} replace /> : <AuthPage mode="login" />} />
      <Route path="/register" element={user ? <Navigate to={homeFor(user)} replace /> : <AuthPage mode="register" />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Protected role="user"><Home /></Protected>} />
        <Route path="/albums" element={<Protected role="user"><Albums /></Protected>} />
        <Route path="/albums/:id" element={<Protected role="user"><AlbumDetail /></Protected>} />
        <Route path="/studio/upload" element={<Protected role="artist"><Upload /></Protected>} />
        <Route path="/studio/album" element={<Protected role="artist"><CreateAlbum /></Protected>} />
      </Route>
      <Route path="*" element={<Navigate to={user ? homeFor(user) : '/login'} replace />} />
    </Routes>
  )
}
