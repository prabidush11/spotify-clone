// All requests go through the Vite proxy (/api -> http://localhost:3000)
async function request(path, options = {}) {
  const res = await fetch(`/api${path}`, { credentials: 'include', ...options })
  let data = {}
  try {
    data = await res.json()
  } catch {
    // empty or non-JSON body
  }
  if (!res.ok) {
    const err = new Error(data.message || `Request failed (${res.status})`)
    err.status = res.status
    throw err
  }
  return data
}

const post = (body) => ({
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
})

export const api = {
  register: (body) => request('/auth/register', post(body)),
  login: (body) => request('/auth/login', post(body)),
  logout: () => request('/auth/logout', { method: 'POST' }),

  getMusics: () => request('/music'),
  getAlbums: () => request('/music/albums'),

  uploadMusic: (title, file) => {
    const fd = new FormData()
    fd.append('title', title)
    fd.append('music', file)
    return request('/music/upload', { method: 'POST', body: fd })
  },
  createAlbum: (title, musics) => request('/music/album', post({ title, musics })),
}
