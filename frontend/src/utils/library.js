import { api } from '../api/api'

// GET /api/music returns songs with only the artist's id, while GET /api/music/albums
// populates the artist. Load both and use the albums to put artist names on songs.
export async function loadLibrary() {
  const [m, a] = await Promise.all([api.getMusics(), api.getAlbums()])
  const albums = a.albums || []

  const artistNames = {}
  for (const al of albums) {
    if (al.artist && typeof al.artist === 'object') artistNames[al.artist._id] = al.artist.username
  }

  const musics = (m.musics || []).map((t) => ({ ...t, artistName: artistNames[t.artist] }))
  return { musics, albums }
}
