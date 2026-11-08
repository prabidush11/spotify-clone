// Artists can't call GET /api/music (it only allows role "user"), so the songs an
// artist uploads are remembered in this browser to choose from when making an album.
const key = (userId) => `sc_uploads_${userId}`

export function getUploads(userId) {
  try {
    return JSON.parse(localStorage.getItem(key(userId))) || []
  } catch {
    return []
  }
}

export function addUpload(userId, music) {
  const list = [music, ...getUploads(userId).filter((m) => m.id !== music.id)]
  try {
    localStorage.setItem(key(userId), JSON.stringify(list))
  } catch {
    // storage unavailable
  }
  return list
}
