'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface PhotoEditorProps { photoId?: string }

export default function PhotoEditor({ photoId }: PhotoEditorProps) {
  const router = useRouter()
  const isNew = !photoId
  const [saving, setSaving] = useState(false)
  const [newImageUrl, setNewImageUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState({
    title: '', description: '', coverImage: '', album: 'General',
    tags: '', status: 'draft' as 'draft' | 'published',
    images: [] as { url: string; caption: string }[],
  })

  useEffect(() => {
    if (photoId) {
      fetch(`/api/photos/${photoId}`).then(r => r.json())
        .then(data => setForm({ ...data, tags: data.tags?.join(', ') || '' }))
    }
  }, [photoId])

  const setField = (field: string, value: any) => setForm(f => ({ ...f, [field]: value }))

  const addImage = () => {
    if (!newImageUrl.trim()) return
    setForm(f => ({ ...f, images: [...f.images, { url: newImageUrl.trim(), caption: '' }] }))
    setNewImageUrl('')
  }

  // Handle file upload - uploads to your /api/upload endpoint and gets back a URL
  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setUploading(true)

    const uploadedImages: { url: string; caption: string }[] = []

    for (const file of Array.from(files)) {
      // Validate file type
      const allowed = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/svg+xml', 'image/webp']
      if (!allowed.includes(file.type)) {
        alert(`File "${file.name}" is not a supported image type.`)
        continue
      }

      try {
        const formData = new FormData()
        formData.append('file', file)

        // POST to your upload API — adjust endpoint if needed
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (res.ok) {
          const data = await res.json()
          // Adjust based on your API response shape — common patterns:
          const url = data.url || data.path || data.secure_url || data.fileUrl
          if (url) {
            uploadedImages.push({ url, caption: file.name.replace(/\.[^.]+$/, '') })
          }
        } else {
          alert(`Failed to upload "${file.name}".`)
        }
      } catch (err) {
        alert(`Error uploading "${file.name}".`)
      }
    }

    if (uploadedImages.length > 0) {
      setForm(f => ({ ...f, images: [...f.images, ...uploadedImages] }))
    }

    setUploading(false)
    // Reset file input so same file can be re-uploaded if needed
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // Handle cover image file upload
  const handleCoverUpload = async (file: File | null) => {
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      if (res.ok) {
        const data = await res.json()
        const url = data.url || data.path || data.secure_url || data.fileUrl
        if (url) setField('coverImage', url)
      }
    } catch (err) {
      alert('Error uploading cover image.')
    }
    setUploading(false)
  }

  // Drag & drop support
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    handleFileUpload(e.dataTransfer.files)
  }

  const removeImage = (idx: number) => setForm(f => ({ ...f, images: f.images.filter((_, i) => i !== idx) }))
  const updateCaption = (idx: number, caption: string) => {
    setForm(f => ({ ...f, images: f.images.map((img, i) => i === idx ? { ...img, caption } : img) }))
  }

  const save = async (status?: 'draft' | 'published') => {
    if (!form.title.trim()) {
    alert('Please enter a gallery title before saving!')
    return
  }
    setSaving(true)
    const payload = { ...form, tags: form.tags.split(',').map((t: string) => t.trim()).filter(Boolean), ...(status ? { status } : {}) }
    const res = await fetch(isNew ? '/api/photos' : `/api/photos/${photoId}`, {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) { const data = await res.json(); if (isNew) router.push(`/admin/photos/${data._id}`) }
    setSaving(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="border-b border-ink-200 bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/photos')} className="text-ink-500 hover:text-ink-800 font-body text-sm">← Photos</button>
          <span className="text-ink-300">|</span>
          <h1 className="font-display font-semibold text-ink-800">{isNew ? 'New Gallery' : 'Edit Gallery'}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => save('draft')} disabled={saving || uploading} className="border border-ink-200 text-ink-700 hover:bg-ink-50 font-body text-sm px-4 py-2 rounded disabled:opacity-50">Save Draft</button>
          <button onClick={() => save('published')} disabled={saving || uploading} className="bg-accent hover:bg-accent-hover text-white font-body text-sm px-5 py-2 rounded disabled:opacity-50">{saving ? 'Saving...' : 'Publish'}</button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Main Content */}
        <div className="flex-1 p-8 space-y-6">
          <input type="text" placeholder="Gallery title..." value={form.title} onChange={e => setField('title', e.target.value)}
            className="w-full font-display text-3xl font-bold text-ink-900 border-none outline-none bg-transparent placeholder-ink-300" />
          <textarea placeholder="Description..." value={form.description} onChange={e => setField('description', e.target.value)} rows={3}
            className="w-full font-body text-ink-700 border border-ink-200 rounded-lg p-3 resize-none focus:outline-none focus:border-accent text-sm" />

          {/* Gallery Images */}
          <div className="bg-white rounded-lg border border-ink-200 p-5">
            <h3 className="font-display font-semibold text-ink-800 mb-4">
              Gallery Images ({form.images.length})
              {uploading && <span className="ml-2 text-xs text-accent font-body font-normal">Uploading...</span>}
            </h3>

            {/* URL Input Row */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Paste image URL..."
                value={newImageUrl}
                onChange={e => setNewImageUrl(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addImage()}
                className="flex-1 border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent"
              />
              <button onClick={addImage} className="bg-accent text-white px-4 py-2 rounded font-body text-sm hover:bg-accent-hover whitespace-nowrap">Add URL</button>
            </div>

            {/* File Upload Row */}
            <div className="flex gap-2 mb-4">
              <label
                className="flex-1 flex items-center gap-2 border border-dashed border-ink-300 rounded px-3 py-2 cursor-pointer hover:border-accent hover:bg-ink-50 transition-colors"
                onDragOver={e => e.preventDefault()}
                onDrop={handleDrop}
              >
                <svg className="w-4 h-4 text-ink-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-body text-sm text-ink-500">
                  {uploading ? 'Uploading...' : 'Choose files or drag & drop'}
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".png,.jpg,.jpeg,.gif,.svg,.webp"
                  className="hidden"
                  onChange={e => handleFileUpload(e.target.files)}
                  disabled={uploading}
                />
              </label>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="border border-ink-200 text-ink-700 hover:bg-ink-50 px-4 py-2 rounded font-body text-sm whitespace-nowrap disabled:opacity-50"
              >
                Browse
              </button>
            </div>

            <p className="text-xs text-ink-400 font-body mb-4">Extensions: .png, .jpg, .jpeg, .gif, .svg, .webp</p>

            {/* Image Grid */}
            {form.images.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {form.images.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img src={img.url} alt="" className="w-full h-28 object-cover rounded-lg" />
                    <button
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >×</button>
                    <input
                      type="text"
                      placeholder="Caption..."
                      value={img.caption}
                      onChange={e => updateCaption(idx, e.target.value)}
                      className="mt-1 w-full border border-ink-200 rounded px-2 py-1 text-xs font-body focus:outline-none focus:border-accent"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {form.images.length === 0 && (
              <div className="text-center py-8 text-ink-400 font-body text-sm border border-dashed border-ink-200 rounded-lg">
                No images yet. Add via URL or upload files above.
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-72 border-l border-ink-200 p-6 bg-ink-50 space-y-5">
          <div>
            <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Status</label>
            <select value={form.status} onChange={e => setField('status', e.target.value)}
              className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent bg-white">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Album</label>
            <input type="text" value={form.album} onChange={e => setField('album', e.target.value)}
              className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent bg-white" />
          </div>
          <div>
            <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Cover Image</label>
            {/* Cover URL input */}
            <input
              type="text"
              placeholder="https://..."
              value={form.coverImage}
              onChange={e => setField('coverImage', e.target.value)}
              className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent bg-white mb-2"
            />
            {/* Cover file upload */}
            <label className="flex items-center gap-2 border border-dashed border-ink-300 rounded px-3 py-2 cursor-pointer hover:border-accent hover:bg-white transition-colors">
              <svg className="w-3 h-3 text-ink-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-body text-xs text-ink-500">Upload cover image</span>
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.gif,.svg,.webp"
                className="hidden"
                onChange={e => handleCoverUpload(e.target.files?.[0] || null)}
                disabled={uploading}
              />
            </label>
            {form.coverImage && <img src={form.coverImage} alt="" className="mt-2 rounded w-full object-cover h-32" />}
          </div>
          <div>
            <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Tags</label>
            <input type="text" placeholder="tag1, tag2" value={form.tags} onChange={e => setField('tags', e.target.value)}
              className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent bg-white" />
          </div>
        </div>
      </div>
    </div>
  )
}