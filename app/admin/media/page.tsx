'use client'
import { useState, useEffect, useRef } from 'react'

interface Media {
  _id: string
  filename: string
  originalName: string
  url: string
  mimeType: string
  size: number
  alt: string
  createdAt: string
}

export default function MediaPage() {
  const [media, setMedia] = useState<Media[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selected, setSelected] = useState<Media | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const fetchMedia = () => {
    fetch('/api/media').then(r => r.json()).then(data => {
      setMedia(data)
      setLoading(false)
    })
  }

  useEffect(() => { fetchMedia() }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return
    setUploading(true)

    for (const file of Array.from(files)) {
      const fd = new FormData()
      fd.append('file', file)
      await fetch('/api/media', { method: 'POST', body: fd })
    }

    fetchMedia()
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  const deleteMedia = async (id: string) => {
    if (!confirm('Delete this file?')) return
    await fetch(`/api/media/${id}`, { method: 'DELETE' })
    setSelected(null)
    fetchMedia()
  }

  const updateAlt = async (id: string, alt: string) => {
    await fetch(`/api/media/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alt }),
    })
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  }

  return (
    <div className="p-8 animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-ink-900 font-bold">Media Library</h1>
          <p className="text-ink-500 font-body mt-1">Upload and manage your images and files</p>
        </div>
        <div>
          <input
            ref={fileRef}
            type="file"
            multiple
            accept="image/*,video/*,.pdf,.doc,.docx"
            onChange={handleUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className={`cursor-pointer bg-accent hover:bg-accent-hover text-white font-body font-semibold px-5 py-2.5 rounded transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {uploading ? 'Uploading...' : '+ Upload Files'}
          </label>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="text-ink-400 font-body">Loading...</div>
          ) : media.length === 0 ? (
            <div className="bg-white rounded-lg border border-dashed border-ink-300 p-16 text-center">
              <div className="text-5xl mb-4">⊡</div>
              <h3 className="font-display text-xl text-ink-700 mb-2">No files yet</h3>
              <p className="text-ink-500 font-body mb-5">Upload images and files to use in your content</p>
              <label htmlFor="file-upload" className="bg-accent text-white font-body px-5 py-2.5 rounded cursor-pointer">
                Upload Files
              </label>
            </div>
          ) : (
            <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {media.map(item => (
                <button
                  key={item._id}
                  onClick={() => setSelected(item)}
                  className={`bg-white rounded-lg border overflow-hidden hover:shadow-md transition-all text-left ${
                    selected?._id === item._id ? 'border-accent ring-2 ring-accent/30' : 'border-ink-200'
                  }`}
                >
                  {item.mimeType.startsWith('image/') ? (
                    <img
                      src={item.url}
                      alt={item.alt || item.originalName}
                      className="w-full h-32 object-cover"
                    />
                  ) : (
                    <div className="w-full h-32 bg-ink-100 flex items-center justify-center text-4xl text-ink-400">
                      📄
                    </div>
                  )}
                  <div className="p-2">
                    <p className="text-xs font-body text-ink-600 truncate">{item.originalName}</p>
                    <p className="text-xs text-ink-400 font-body">{formatSize(item.size)}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="w-72 bg-white border border-ink-200 rounded-lg p-5 h-fit sticky top-4 space-y-4">
            <div>
              {selected.mimeType.startsWith('image/') ? (
                <img src={selected.url} alt={selected.alt} className="w-full rounded-lg border border-ink-200 object-cover max-h-40" />
              ) : (
                <div className="w-full h-32 bg-ink-100 rounded-lg flex items-center justify-center text-4xl">📄</div>
              )}
            </div>
            <div>
              <p className="font-body font-semibold text-ink-800 text-sm">{selected.originalName}</p>
              <p className="text-ink-500 text-xs font-body">{formatSize(selected.size)} • {selected.mimeType}</p>
            </div>
            <div>
              <label className="text-ink-500 text-xs font-body block mb-1 uppercase tracking-wider">Alt Text</label>
              <input
                defaultValue={selected.alt}
                onBlur={e => updateAlt(selected._id, e.target.value)}
                className="w-full border border-ink-200 rounded px-3 py-2 text-sm font-body focus:outline-none focus:border-accent"
                placeholder="Describe the image..."
              />
            </div>
            <div>
              <label className="text-ink-500 text-xs font-body block mb-1 uppercase tracking-wider">URL</label>
              <div className="flex gap-2">
                <input
                  value={selected.url}
                  readOnly
                  className="flex-1 border border-ink-200 rounded px-3 py-2 text-xs font-mono bg-ink-50 text-ink-600"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(selected.url)}
                  className="border border-ink-200 rounded px-3 py-2 text-xs font-body hover:bg-ink-50"
                  title="Copy URL"
                >
                  📋
                </button>
              </div>
            </div>
            <button
              onClick={() => deleteMedia(selected._id)}
              className="w-full border border-red-200 text-red-500 hover:bg-red-50 font-body text-sm py-2 rounded transition-colors"
            >
              Delete File
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
