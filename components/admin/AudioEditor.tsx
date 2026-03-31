'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface AudioEditorProps { audioId?: string }

export default function AudioEditor({ audioId }: AudioEditorProps) {
  const router = useRouter()
  const isNew = !audioId
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: '', description: '', audioUrl: '', coverImage: '',
    category: 'General', subcategory: '', duration: '', artist: 'Admin', tags: '', status: 'draft' as 'draft' | 'published',
  })

  useEffect(() => {
    if (audioId) {
      fetch(`/api/audio/${audioId}`).then(r => r.json())
        .then(data => setForm({ ...data, tags: data.tags?.join(', ') || '' }))
    }
  }, [audioId])

  const setField = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }))

  const save = async (status?: 'draft' | 'published') => {
    setSaving(true)
    const payload = { ...form, tags: form.tags.split(',').map((t: string) => t.trim()).filter(Boolean), ...(status ? { status } : {}) }
    const res = await fetch(isNew ? '/api/audio' : `/api/audio/${audioId}`, {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) { const data = await res.json(); if (isNew) router.push(`/admin/audio/${data._id}`) }
    setSaving(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="border-b border-ink-200 bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/audio')} className="text-ink-500 hover:text-ink-800 font-body text-sm">← Audio</button>
          <span className="text-ink-300">|</span>
          <h1 className="font-display font-semibold text-ink-800">{isNew ? 'New Audio' : 'Edit Audio'}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => save('draft')} disabled={saving} className="border border-ink-200 text-ink-700 hover:bg-ink-50 font-body text-sm px-4 py-2 rounded disabled:opacity-50">Save Draft</button>
          <button onClick={() => save('published')} disabled={saving} className="bg-accent hover:bg-accent-hover text-white font-body text-sm px-5 py-2 rounded disabled:opacity-50">{saving ? 'Saving...' : 'Publish'}</button>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="flex-1 p-8 space-y-5">
          <input type="text" placeholder="Audio title..." value={form.title} onChange={e => setField('title', e.target.value)}
            className="w-full font-display text-3xl font-bold text-ink-900 border-none outline-none bg-transparent placeholder-ink-300" />
          <textarea placeholder="Description..." value={form.description} onChange={e => setField('description', e.target.value)} rows={4}
            className="w-full font-body text-ink-700 border border-ink-200 rounded-lg p-3 resize-none focus:outline-none focus:border-accent text-sm" />

          <div className="bg-white rounded-lg border border-ink-200 p-5 space-y-4">
            <h3 className="font-display font-semibold text-ink-800">Audio File</h3>
            <div>
              <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Audio URL</label>
              <input type="text" placeholder="https://... (mp3, wav, ogg)" value={form.audioUrl} onChange={e => setField('audioUrl', e.target.value)}
                className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent" />
            </div>
            {form.audioUrl && (
              <div className="mt-2">
                <audio controls src={form.audioUrl} className="w-full" />
              </div>
            )}
          </div>
        </div>

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
            <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Artist</label>
            <input type="text" value={form.artist} onChange={e => setField('artist', e.target.value)}
              className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent bg-white" />
          </div>
          <div>
            <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Category</label>
            <input type="text" value={form.category} onChange={e => setField('category', e.target.value)}
              className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent bg-white" />
          </div>
          <div>
            <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Subcategory</label>
            <input type="text" value={form.subcategory} onChange={e => setField('subcategory', e.target.value)}
              className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent bg-white" />
          </div>
          <div>
            <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Duration</label>
            <input type="text" placeholder="e.g. 3:45" value={form.duration} onChange={e => setField('duration', e.target.value)}
              className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent bg-white" />
          </div>
          <div>
            <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Cover Image URL</label>
            <input type="text" placeholder="https://..." value={form.coverImage} onChange={e => setField('coverImage', e.target.value)}
              className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent bg-white" />
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
