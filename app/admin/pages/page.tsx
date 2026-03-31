'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'

interface Page {
  _id: string
  title: string
  slug: string
  status: 'draft' | 'published'
  updatedAt: string
}

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPages = () => {
    fetch('/api/pages')
      .then(r => r.json())
      .then(data => { setPages(data); setLoading(false) })
  }

  useEffect(() => { fetchPages() }, [])

  const deletePage = async (id: string) => {
    if (!confirm('Delete this page?')) return
    await fetch(`/api/pages/${id}`, { method: 'DELETE' })
    fetchPages()
  }

  return (
    <div className="p-8 animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-ink-900 font-bold">Pages</h1>
          <p className="text-ink-500 font-body mt-1">Create and manage your website pages</p>
        </div>
        <Link
          href="/admin/pages/new"
          className="bg-accent hover:bg-accent-hover text-white font-body font-semibold px-5 py-2.5 rounded transition-colors"
        >
          + New Page
        </Link>
      </div>

      {loading ? (
        <div className="text-ink-400 font-body">Loading...</div>
      ) : pages.length === 0 ? (
        <div className="bg-white rounded-lg border border-ink-200 p-12 text-center">
          <div className="text-5xl mb-4">□</div>
          <h3 className="font-display text-xl text-ink-700 mb-2">No pages yet</h3>
          <p className="text-ink-500 font-body mb-5">Create your first page to get started</p>
          <Link href="/admin/pages/new" className="bg-accent text-white font-body px-5 py-2.5 rounded">
            Create Page
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-ink-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink-100 bg-ink-50">
                <th className="text-left px-5 py-3 text-ink-600 font-body text-sm font-semibold">Title</th>
                <th className="text-left px-5 py-3 text-ink-600 font-body text-sm font-semibold">Slug</th>
                <th className="text-left px-5 py-3 text-ink-600 font-body text-sm font-semibold">Status</th>
                <th className="text-left px-5 py-3 text-ink-600 font-body text-sm font-semibold">Updated</th>
                <th className="text-left px-5 py-3 text-ink-600 font-body text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map(page => (
                <tr key={page._id} className="border-b border-ink-100 hover:bg-ink-50 transition-colors">
                  <td className="px-5 py-3">
                    <span className="font-body font-semibold text-ink-800">{page.title}</span>
                  </td>
                  <td className="px-5 py-3">
                    <code className="font-mono text-xs bg-ink-100 px-2 py-1 rounded text-ink-600">
                      /{page.slug}
                    </code>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-body font-semibold ${
                      page.status === 'published' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        page.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                      {page.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-ink-500 font-body text-sm">
                    {format(new Date(page.updatedAt), 'MMM d, yyyy')}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/pages/${page._id}`}
                        className="text-accent hover:underline font-body text-sm"
                      >
                        Edit
                      </Link>
                      <a
                        href={`/pages/${page.slug}`}
                        target="_blank"
                        className="text-ink-400 hover:text-ink-700 font-body text-sm"
                      >
                        View
                      </a>
                      <button
                        onClick={() => deletePage(page._id)}
                        className="text-red-400 hover:text-red-600 font-body text-sm"
                      >
                        Delete
                      </button>
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
