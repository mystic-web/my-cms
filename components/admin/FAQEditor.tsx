'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface FAQEditorProps { faqId?: string }

export default function FAQEditor({ faqId }: FAQEditorProps) {
  const router = useRouter()
  const isNew = !faqId
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    question: '', answer: '', category: 'General', subcategory: '',
    order: 0, status: 'draft' as 'draft' | 'published',
  })

  useEffect(() => {
    if (faqId) fetch(`/api/faqs/${faqId}`).then(r => r.json()).then(data => setForm(data))
  }, [faqId])

  const setField = (field: string, value: any) => setForm(f => ({ ...f, [field]: value }))

  const save = async (status?: 'draft' | 'published') => {
    setSaving(true)
    const payload = { ...form, ...(status ? { status } : {}) }
    const res = await fetch(isNew ? '/api/faqs' : `/api/faqs/${faqId}`, {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) { const data = await res.json(); if (isNew) router.push(`/admin/faqs/${data._id}`) }
    setSaving(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="border-b border-ink-200 bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/faqs')} className="text-ink-500 hover:text-ink-800 font-body text-sm">← FAQs</button>
          <span className="text-ink-300">|</span>
          <h1 className="font-display font-semibold text-ink-800">{isNew ? 'New FAQ' : 'Edit FAQ'}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => save('draft')} disabled={saving} className="border border-ink-200 text-ink-700 hover:bg-ink-50 font-body text-sm px-4 py-2 rounded disabled:opacity-50">Save Draft</button>
          <button onClick={() => save('published')} disabled={saving} className="bg-accent hover:bg-accent-hover text-white font-body text-sm px-5 py-2 rounded disabled:opacity-50">{saving ? 'Saving...' : 'Publish'}</button>
        </div>
      </div>

      <div className="flex-1 p-8 max-w-2xl">
        <div className="space-y-5 bg-white rounded-lg border border-ink-200 p-6">
          <div>
            <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Question *</label>
            <input type="text" value={form.question} onChange={e => setField('question', e.target.value)}
              placeholder="What is your question?"
              className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent" />
          </div>
          <div>
            <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Answer *</label>
            <textarea value={form.answer} onChange={e => setField('answer', e.target.value)}
              placeholder="Write the answer here..." rows={6}
              className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Category</label>
              <input type="text" value={form.category} onChange={e => setField('category', e.target.value)}
                className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent" />
            </div>
            <div>
              <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Subcategory</label>
              <input type="text" value={form.subcategory} onChange={e => setField('subcategory', e.target.value)}
                className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Order</label>
              <input type="number" value={form.order} onChange={e => setField('order', parseInt(e.target.value) || 0)}
                className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent" />
            </div>
            <div>
              <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Status</label>
              <select value={form.status} onChange={e => setField('status', e.target.value)}
                className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
