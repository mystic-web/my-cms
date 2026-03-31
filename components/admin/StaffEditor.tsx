'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface StaffEditorProps { staffId?: string }

export default function StaffEditor({ staffId }: StaffEditorProps) {
  const router = useRouter()
  const isNew = !staffId
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: '', role: '', department: 'General', bio: '', avatar: '',
    email: '', phone: '', order: 0,
    socialLinks: [] as { platform: string; url: string }[],
    status: 'draft' as 'draft' | 'published',
  })

  useEffect(() => {
    if (staffId) fetch(`/api/staff/${staffId}`).then(r => r.json()).then(data => setForm(data))
  }, [staffId])

  const setField = (field: string, value: any) => setForm(f => ({ ...f, [field]: value }))

  const addSocialLink = () => setForm(f => ({ ...f, socialLinks: [...f.socialLinks, { platform: '', url: '' }] }))
  const removeSocialLink = (idx: number) => setForm(f => ({ ...f, socialLinks: f.socialLinks.filter((_, i) => i !== idx) }))
  const updateSocialLink = (idx: number, field: 'platform' | 'url', value: string) => {
    setForm(f => ({ ...f, socialLinks: f.socialLinks.map((l, i) => i === idx ? { ...l, [field]: value } : l) }))
  }

  const save = async (status?: 'draft' | 'published') => {
    setSaving(true)
    const payload = { ...form, ...(status ? { status } : {}) }
    const res = await fetch(isNew ? '/api/staff' : `/api/staff/${staffId}`, {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) { const data = await res.json(); if (isNew) router.push(`/admin/staff/${data._id}`) }
    setSaving(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="border-b border-ink-200 bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/staff')} className="text-ink-500 hover:text-ink-800 font-body text-sm">← Staff</button>
          <span className="text-ink-300">|</span>
          <h1 className="font-display font-semibold text-ink-800">{isNew ? 'New Staff Member' : 'Edit Staff Member'}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => save('draft')} disabled={saving} className="border border-ink-200 text-ink-700 hover:bg-ink-50 font-body text-sm px-4 py-2 rounded disabled:opacity-50">Save Draft</button>
          <button onClick={() => save('published')} disabled={saving} className="bg-accent hover:bg-accent-hover text-white font-body text-sm px-5 py-2 rounded disabled:opacity-50">{saving ? 'Saving...' : 'Publish'}</button>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="flex-1 p-8 space-y-5">
          <div className="bg-white rounded-lg border border-ink-200 p-6 space-y-4">
            <h3 className="font-display font-semibold text-ink-800">Basic Info</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Full Name *</label>
                <input type="text" value={form.name} onChange={e => setField('name', e.target.value)}
                  className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent" />
              </div>
              <div>
                <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Role / Position</label>
                <input type="text" value={form.role} onChange={e => setField('role', e.target.value)}
                  placeholder="Manager, Developer, etc."
                  className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Email</label>
                <input type="email" value={form.email} onChange={e => setField('email', e.target.value)}
                  className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent" />
              </div>
              <div>
                <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Phone</label>
                <input type="text" value={form.phone} onChange={e => setField('phone', e.target.value)}
                  className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Bio</label>
              <textarea value={form.bio} onChange={e => setField('bio', e.target.value)} rows={4}
                className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent resize-none" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-ink-200 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold text-ink-800">Social Links</h3>
              <button onClick={addSocialLink} className="text-accent font-body text-sm hover:underline">+ Add Link</button>
            </div>
            {form.socialLinks.map((link, idx) => (
              <div key={idx} className="flex gap-2">
                <input type="text" placeholder="Platform (Twitter, LinkedIn...)" value={link.platform} onChange={e => updateSocialLink(idx, 'platform', e.target.value)}
                  className="w-32 border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent" />
                <input type="text" placeholder="URL" value={link.url} onChange={e => updateSocialLink(idx, 'url', e.target.value)}
                  className="flex-1 border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent" />
                <button onClick={() => removeSocialLink(idx)} className="text-red-400 hover:text-red-600 px-2">×</button>
              </div>
            ))}
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
            <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Department</label>
            <input type="text" value={form.department} onChange={e => setField('department', e.target.value)}
              className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent bg-white" />
          </div>
          <div>
            <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Order</label>
            <input type="number" value={form.order} onChange={e => setField('order', parseInt(e.target.value) || 0)}
              className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent bg-white" />
          </div>
          <div>
            <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Avatar URL</label>
            <input type="text" placeholder="https://..." value={form.avatar} onChange={e => setField('avatar', e.target.value)}
              className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent bg-white" />
            {form.avatar && <img src={form.avatar} alt="" className="mt-2 w-20 h-20 rounded-full object-cover border border-ink-200" />}
          </div>
        </div>
      </div>
    </div>
  )
}
