// No cover images in the backend, so generate a gradient from the title
function hash(str = '') {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0
  return Math.abs(h)
}

export function coverColor(seed) {
  return `hsl(${hash(seed) % 360} 55% 42%)`
}

export default function Cover({ seed, label, size = 48, round = false }) {
  const h = hash(seed) % 360
  return (
    <div
      className="cover"
      style={{
        width: size,
        height: size,
        borderRadius: round ? '50%' : size > 100 ? 8 : 4,
        background: `linear-gradient(135deg, hsl(${h} 60% 45%), hsl(${(h + 60) % 360} 55% 25%))`,
        fontSize: size * 0.38,
      }}
    >
      {(label || seed || '?').trim().charAt(0).toUpperCase()}
    </div>
  )
}
