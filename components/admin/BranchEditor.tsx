'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface BranchEditorProps { branchId?: string }

export default function BranchEditor({ branchId }: BranchEditorProps) {
  const router = useRouter()
  const isNew = !branchId
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: '', address: '', city: '', state: '', country: '', zipCode: '',
    phone: '', email: '', mapUrl: '', image: '', workingHours: '',
    isHeadquarters: false, order: 0, status: 'draft' as 'draft' | 'published',
  })

  useEffect(() => {
    if (branchId) fetch(`/api/branches/${branchId}`).then(r => r.json()).then(data => setForm(data))
  }, [branchId])

  const setField = (field: string, value: any) => setForm(f => ({ ...f, [field]: value }))

  const save = async (status?: 'draft' | 'published') => {
    setSaving(true)
    const payload = { ...form, ...(status ? { status } : {}) }
    const res = await fetch(isNew ? '/api/branches' : `/api/branches/${branchId}`, {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) { const data = await res.json(); if (isNew) router.push(`/admin/branches/${data._id}`) }
    setSaving(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="border-b border-ink-200 bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/branches')} className="text-ink-500 hover:text-ink-800 font-body text-sm">← Branches</button>
          <span className="text-ink-300">|</span>
          <h1 className="font-display font-semibold text-ink-800">{isNew ? 'New Branch' : 'Edit Branch'}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => save('draft')} disabled={saving} className="border border-ink-200 text-ink-700 hover:bg-ink-50 font-body text-sm px-4 py-2 rounded disabled:opacity-50">Save Draft</button>
          <button onClick={() => save('published')} disabled={saving} className="bg-accent hover:bg-accent-hover text-white font-body text-sm px-5 py-2 rounded disabled:opacity-50">{saving ? 'Saving...' : 'Publish'}</button>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="flex-1 p-8 space-y-5">
          <div className="bg-white rounded-lg border border-ink-200 p-6 space-y-4">
            <h3 className="font-display font-semibold text-ink-800">Branch Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Branch Name *</label>
                <input type="text" value={form.name} onChange={e => setField('name', e.target.value)}
                  className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Address</label>
                <input type="text" value={form.address} onChange={e => setField('address', e.target.value)}
                  className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent" />
              </div>
              <div>
                <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">City</label>
                <input type="text" value={form.city} onChange={e => setField('city', e.target.value)}
                  className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent" />
              </div>
              <div>
                <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">State / Province</label>
                <input type="text" value={form.state} onChange={e => setField('state', e.target.value)}
                  className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent" />
              </div>
              <div>
                <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Country</label>
                <input type="text" value={form.country} onChange={e => setField('country', e.target.value)}
                  className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent" />
              </div>
              <div>
                <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Zip / Postal Code</label>
                <input type="text" value={form.zipCode} onChange={e => setField('zipCode', e.target.value)}
                  className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-ink-200 p-6 space-y-4">
            <h3 className="font-display font-semibold text-ink-800">Contact & Hours</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Phone</label>
                <input type="text" value={form.phone} onChange={e => setField('phone', e.target.value)}
                  className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent" />
              </div>
              <div>
                <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Email</label>
                <input type="email" value={form.email} onChange={e => setField('email', e.target.value)}
                  className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Working Hours</label>
                <input type="text" placeholder="Mon-Fri 9am-6pm" value={form.workingHours} onChange={e => setField('workingHours', e.target.value)}
                  className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Google Maps Embed URL</label>
                <input type="text" placeholder="https://www.google.com/maps/embed?..." value={form.mapUrl} onChange={e => setField('mapUrl', e.target.value)}
                  className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent" />
                {form.mapUrl && (
                  <iframe src={form.mapUrl} className="mt-2 w-full h-40 rounded border border-ink-200" loading="lazy" />
                )}
              </div>
            </div>
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
          <div className="flex items-center gap-2">
            <input type="checkbox" id="isHQ" checked={form.isHeadquarters} onChange={e => setField('isHeadquarters', e.target.checked)}
              className="rounded border-ink-300" />
            <label htmlFor="isHQ" className="text-sm font-body text-ink-700">Headquarters</label>
          </div>
          <div>
            <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Order</label>
            <input type="number" value={form.order} onChange={e => setField('order', parseInt(e.target.value) || 0)}
              className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent bg-white" />
          </div>
          <div>
            <label className="block text-xs font-body font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Branch Image URL</label>
            <input type="text" placeholder="https://..." value={form.image} onChange={e => setField('image', e.target.value)}
              className="w-full border border-ink-200 rounded px-3 py-2 font-body text-sm focus:outline-none focus:border-accent bg-white" />
            {form.image && <img src={form.image} alt="" className="mt-2 rounded w-full object-cover h-32" />}
          </div>
        </div>
      </div>
    </div>
  )
}
