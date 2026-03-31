'use client'
import { useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (session) router.push('/admin')
  }, [session])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (res?.error) {
      setError('Invalid email or password')
      setLoading(false)
    } else {
      router.push('/admin')
    }
  }

  return (
    <div className="min-h-screen bg-ink-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-accent rounded-sm flex items-center justify-center">
              <span className="text-white font-display font-bold text-lg">C</span>
            </div>
            <span className="text-white font-display text-2xl font-bold">CMS</span>
          </div>
          <p className="text-ink-400 font-body">Sign in to your dashboard</p>
        </div>

        {/* Form */}
        <div className="bg-ink-800 border border-ink-700 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-ink-300 text-sm font-body mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-ink-900 border border-ink-600 rounded px-4 py-3 text-white font-body focus:outline-none focus:border-accent transition-colors"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="block text-ink-300 text-sm font-body mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-ink-900 border border-ink-600 rounded px-4 py-3 text-white font-body focus:outline-none focus:border-accent transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-700 rounded px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-accent-hover text-white font-body font-semibold py-3 rounded transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center text-ink-500 text-sm">
            First time?{' '}
            <a href="/setup" className="text-accent hover:underline">
              Setup admin account
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
