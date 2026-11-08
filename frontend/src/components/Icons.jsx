const I = ({ d, size = 20, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d={d} />
  </svg>
)

export const HomeIcon = (p) => <I {...p} d="M12 3 2 11h3v10h6v-6h2v6h6V11h3L12 3z" />
export const AlbumIcon = (p) => (
  <I {...p} d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
)
export const UploadIcon = (p) => <I {...p} d="M5 20h14v-2H5v2zm7-16-6 6h4v6h4v-6h4l-6-6z" />
export const PlusIcon = (p) => <I {...p} d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z" />
export const PlayIcon = (p) => <I {...p} d="M8 5v14l11-7z" />
export const PauseIcon = (p) => <I {...p} d="M6 5h4v14H6zm8 0h4v14h-4z" />
export const NextIcon = (p) => <I {...p} d="M6 6l8.5 6L6 18V6zm10 0h2v12h-2z" />
export const PrevIcon = (p) => <I {...p} d="M6 6h2v12H6zm3.5 6L18 18V6z" />
export const VolumeIcon = (p) => (
  <I {...p} d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z" />
)
export const LogoIcon = (p) => (
  <I
    {...p}
    d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.6 14.4a.6.6 0 0 1-.9.2c-2.4-1.5-5.4-1.8-9-1a.6.6 0 1 1-.3-1.2c3.9-.9 7.2-.5 9.9 1.1.3.2.4.6.3.9zm1.2-2.7a.8.8 0 0 1-1.1.3c-2.7-1.7-6.9-2.2-10.1-1.2a.8.8 0 1 1-.5-1.5c3.7-1.1 8.3-.6 11.4 1.3.4.3.5.8.3 1.1zm.1-2.8C14.7 9 9.4 8.8 6.3 9.7a1 1 0 1 1-.6-1.8c3.5-1.1 9.4-.9 13.1 1.3a1 1 0 0 1-.9 1.7z"
  />
)
