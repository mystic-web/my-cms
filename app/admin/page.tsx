'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Stats {
  pages: number
  blogs: number
  media: number
  published: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ pages: 0, blogs: 0, media: 0, published: 0 })

  useEffect(() => {
    Promise.all([
      fetch('/api/pages').then(r => r.json()),
      fetch('/api/blogs').then(r => r.json()),
      fetch('/api/media').then(r => r.json()),
    ]).then(([pages, blogs, media]) => {
      setStats({
        pages: pages.length || 0,
        blogs: blogs.length || 0,
        media: media.length || 0,
        published: [...(pages || []), ...(blogs || [])].filter((i: any) => i.status === 'published').length,
      })
    })
  }, [])

  const cards = [
    { label: 'Total Pages', value: stats.pages, href: '/admin/pages', color: 'border-blue-400', icon: '□' },
    { label: 'Blog Posts', value: stats.blogs, href: '/admin/blogs', color: 'border-green-400', icon: '✎' },
    { label: 'Media Files', value: stats.media, href: '/admin/media', color: 'border-purple-400', icon: '⊡' },
    { label: 'Published', value: stats.published, href: '/admin/pages', color: 'border-accent', icon: '✓' },
  ]

  const quickLinks = [
    { label: 'New Page', href: '/admin/pages/new', desc: 'Create a page with visual + code editor' },
    { label: 'New Blog Post', href: '/admin/blogs/new', desc: 'Write and publish a blog post' },
    { label: 'Upload Media', href: '/admin/media', desc: 'Upload images and files' },
  ]

  return (
    <div className="p-8 animate-fadeIn">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-ink-900 font-bold">Dashboard</h1>
        <p className="text-ink-500 font-body mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map(card => (
          <Link
            key={card.label}
            href={card.href}
            className={`bg-white rounded-lg p-5 border-l-4 ${card.color} hover:shadow-md transition-shadow`}
          >
            <div className="text-ink-400 text-2xl mb-2">{card.icon}</div>
            <div className="font-display text-3xl font-bold text-ink-900">{card.value}</div>
            <div className="text-ink-500 text-sm font-body mt-1">{card.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
        <h2 className="font-display text-xl text-ink-800 font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              className="bg-white rounded-lg p-5 border border-ink-200 hover:border-accent hover:shadow-sm transition-all group"
            >
              <div className="font-display text-lg font-semibold text-ink-800 group-hover:text-accent transition-colors">
                {link.label} →
              </div>
              <div className="text-ink-500 text-sm font-body mt-1">{link.desc}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="bg-accent-light border border-accent/20 rounded-lg p-5">
        <h3 className="font-display font-semibold text-accent mb-2">💡 How to use your CMS</h3>
        <ul className="text-sm font-body text-ink-700 space-y-1 list-disc list-inside">
          <li>Go to <strong>Pages</strong> to create static pages with visual editor or raw HTML/CSS/JS</li>
          <li>Go to <strong>Blog Posts</strong> to write articles with rich text editing</li>
          <li>Go to <strong>Media</strong> to upload and manage images</li>
          <li>Published pages are accessible at <code className="font-mono text-xs bg-ink-100 px-1 rounded">/pages/[slug]</code></li>
        </ul>
      </div>
    </div>
  )
}
