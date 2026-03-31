'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'

export default function AudioPage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const fetchItems = () => fetch('/api/audio').then(r => r.json()).then(d => { setItems(d); setLoading(false) })
  useEffect(() => { fetchItems() }, [])
  const deleteItem = async (id: string) => {
    if (!confirm('Delete this item?')) return
    await fetch(`/api/audio/${id}`, { method: 'DELETE' })
    fetchItems()
  }

  return (
    <div className="p-8 animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-ink-900 font-bold">Audio</h1>
          <p className="text-ink-500 font-body mt-1">Manage audio entries</p>
        </div>
        <Link href="/admin/audio/new" className="bg-accent hover:bg-accent-hover text-white font-body font-semibold px-5 py-2.5 rounded transition-colors">
          + Add New
        </Link>
      </div>
      {loading ? (
        <div className="text-ink-400 font-body">Loading...</div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-lg border border-ink-200 p-12 text-center">
          <div className="text-5xl mb-4">🎵</div>
          <h3 className="font-display text-xl text-ink-700 mb-2">No audio yet</h3>
          <Link href="/admin/audio/new" className="bg-accent text-white font-body px-5 py-2.5 rounded inline-block mt-3">
            Add First
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-ink-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink-100 bg-ink-50">
                <th className="text-left px-5 py-3 text-ink-600 font-body text-sm font-semibold">Title / Name</th>
                <th className="text-left px-5 py-3 text-ink-600 font-body text-sm font-semibold">Category</th>
                <th className="text-left px-5 py-3 text-ink-600 font-body text-sm font-semibold">Status</th>
                <th className="text-left px-5 py-3 text-ink-600 font-body text-sm font-semibold">Date</th>
                <th className="text-left px-5 py-3 text-ink-600 font-body text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item._id} className="border-b border-ink-100 hover:bg-ink-50 transition-colors">
                  <td className="px-5 py-3">
                    <span className="font-body font-semibold text-ink-800">
                      {item.title || item.name || item.question}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm font-body text-ink-600">
                    {item.category || item.category || '—'}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-body font-semibold ${
                      item.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-ink-500 font-body text-sm">
                    {format(new Date(item.createdAt), 'MMM d, yyyy')}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Link href={`/admin/audio/${item._id}`} className="text-accent hover:underline font-body text-sm">Edit</Link>
                      <button onClick={() => deleteItem(item._id)} className="text-red-400 hover:text-red-600 font-body text-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
