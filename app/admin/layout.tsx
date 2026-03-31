'use client'
import { useSession, signOut } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '⊞' },
  { href: '/admin/pages', label: 'Pages', icon: '□' },
  { href: '/admin/blogs', label: 'Blog Posts', icon: '✎' },
  { href: '/admin/news', label: 'News', icon: '📰' },
  { href: '/admin/photos', label: 'Photos', icon: '🖼️' },
  { href: '/admin/videos', label: 'Videos', icon: '🎥' },
  { href: '/admin/audio', label: 'Audio', icon: '🎵' },
  { href: '/admin/partners', label: 'Partners', icon: '🤝' },
  { href: '/admin/faqs', label: 'FAQ', icon: '❓' },
  { href: '/admin/testimonials', label: 'Testimonials', icon: '💬' },
  { href: '/admin/staff', label: 'Our Staff', icon: '👥' },
  { href: '/admin/branches', label: 'Branches', icon: '🏢' },
  { href: '/admin/media', label: 'Media', icon: '⊡' },
  { href: '/admin/eligibility', label: 'Check Your Eligibility', icon: '□' },
  { href: '/admin/consultation', label: 'Free Consultation', icon: '□' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status])

  if (status === 'loading') return (
    <div className="min-h-screen bg-ink-900 flex items-center justify-center">
      <div className="text-ink-400 font-body">Loading...</div>
    </div>
  )

  if (!session) return null

  return (
    <div className="min-h-screen flex bg-ink-50">
      {/* Sidebar */}
      <aside className="w-60 bg-ink-900 flex flex-col fixed top-0 left-0 h-full z-20">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-ink-700">
          <div className="flex items-center gap-2">
            <div className="bg-white p-2 rounded inline-block">
              <img 
                src="https://go-globalimmigration.com/public/uploads/settings/17226197901585.png" 
                alt="CMS Logo" 
                className="h-12 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Nav — overflow-y-auto added for scroll */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md font-body text-sm transition-all ${
                  isActive 
                    ? 'bg-accent text-white' 
                    : 'text-ink-400 hover:text-white hover:bg-ink-700'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-ink-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-accent-light text-accent flex items-center justify-center font-bold font-display text-sm">
              {session.user?.name?.[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-body truncate">{session.user?.name}</p>
              <p className="text-ink-500 text-xs truncate">{session.user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="w-full text-left text-ink-500 hover:text-red-400 text-sm font-body transition-colors"
          >
            Sign out →
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-60 min-h-screen">
        {children}
      </main>
    </div>
  )
}