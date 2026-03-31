'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface NewsEditorProps { newsId?: string }

export default function NewsEditor({ newsId }: NewsEditorProps) {
  const router = useRouter()
  const isNew = !newsId
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: '', excerpt: '', content: '', featuredImage: '',
    tags: '', category: 'General', author: 'Admin', source: '', status: 'draft' as 'draft' | 'published',
  })

  useEffect(() => {
    if (newsId) {
      fetch(`/api/news/${newsId}`).then(r => r.json())
        .then(data => setForm({ ...data, tags: data.tags?.join(', ') || '' }))
    }
  }, [newsId])

  const setField = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }))

  const save = async (status?: 'draft' | 'published') => {
    setSaving(true)
    const payload = { ...form, tags: form.tags.split(',').map((t: string) => t.trim()).filter(Boolean), ...(status ? { status } : {}) }
    const res = await fetch(isNew ? '/api/news' : `/api/news/${newsId}`, {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      const data = await res.json()
      if (isNew) router.push(`/admin/news/${data._id}`)
    }
    setSaving(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="border-b border-ink-200 bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/news')} className="text-ink-500 hover:text-ink-800 font-body text-sm transition-colors">← News</button>
          <span className="text-ink-300">|</span>
          <h1 className="font-display font-semibold text-ink-800">{isNew ? 'New News Article' : 'Edit Article'}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => save('draft')} disabled={saving} className="border border-ink-200 text-ink-700 hover:bg-ink-50 font-body text-sm px-4 py-2 rounded transition-colors disabled:opacity-50">Save Draft</button>
          <button onClick={() => save('published')} disabled={saving} className="bg-accent hover:bg-accent-hover text-white font-body text-sm px-5 py-2 rounded transition-colors disabled:opacity-50">
            {saving ? 'Saving...' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Main */}
        <div className="flex-1 p-8">
          <input
            type="text" placeholder="Article title..."
            value={form.title} onChange={e => setField('title', e.target.value)}
            className="w-full font-display text-3xl font-bold text-ink-900 border-none outline-none bg-transparent placeholder-ink-300 mb-6"
          />
          <textarea
            placeholder="Excerpt / summary..."
            value={form.excerpt} onChange={e => setField('excerpt', e.target.value)}
            rows={2}
            className="w-full font-body text-ink-600 border border-ink-200 rounded-lg p-3 mb-4 resize-none focus:outline-none focus:border-accent"
          />
          <textarea
            placeholder="Write your news content here..."
            value={form.content} onChange={e => setField('content', e.target.value)}
            rows={20}
            className="w-full font-body text-ink-800 border border-ink-200 rounded-lg p-4 resize-none focus:outline-none focus:border-accent text-sm leading-relaxed"
          />
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
            <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Category</label>
            <input type="text" value={form.category} onChange={e => setField('category', e.target.value)}
              className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent bg-white" />
          </div>
          <div>
            <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Author</label>
            <input type="text" value={form.author} onChange={e => setField('author', e.target.value)}
              className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent bg-white" />
          </div>
          <div>
            <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Source</label>
            <input type="text" placeholder="Source name or URL" value={form.source} onChange={e => setField('source', e.target.value)}
              className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent bg-white" />
          </div>
          <div>
            <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Featured Image URL</label>
            <input type="text" placeholder="https://..." value={form.featuredImage} onChange={e => setField('featuredImage', e.target.value)}
              className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent bg-white" />
            {form.featuredImage && <img src={form.featuredImage} alt="" className="mt-2 rounded w-full object-cover h-32" />}
          </div>
          <div>
            <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Tags (comma separated)</label>
            <input type="text" placeholder="politics, economy, local" value={form.tags} onChange={e => setField('tags', e.target.value)}
              className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent bg-white" />
          </div>
        </div>
      </div>
    </div>
  )
}
