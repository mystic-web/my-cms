'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SetupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/setup').then(r => r.json()).then(data => {
      if (!data.setupRequired) router.push('/login')
      else setChecking(false)
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/setup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
      setLoading(false)
    } else {
      router.push('/login')
    }
  }

  if (checking) return (
    <div className="min-h-screen bg-ink-900 flex items-center justify-center">
      <div className="text-ink-400">Loading...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-ink-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-accent rounded-sm flex items-center justify-center">
              <span className="text-white font-display font-bold text-lg">C</span>
            </div>
            <span className="text-white font-display text-2xl font-bold">CMS</span>
          </div>
          <h1 className="text-white font-display text-2xl mb-2">First Time Setup</h1>
          <p className="text-ink-400 font-body">Create your admin account</p>
        </div>

        <div className="bg-ink-800 border border-ink-700 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { label: 'Your Name', value: name, set: setName, type: 'text', placeholder: 'John Doe' },
              { label: 'Email', value: email, set: setEmail, type: 'email', placeholder: 'admin@example.com' },
              { label: 'Password', value: password, set: setPassword, type: 'password', placeholder: '••••••••' },
            ].map(field => (
              <div key={field.label}>
                <label className="block text-ink-300 text-sm font-body mb-2">{field.label}</label>
                <input
                  type={field.type}
                  value={field.value}
                  onChange={(e) => field.set(e.target.value)}
                  required
                  className="w-full bg-ink-900 border border-ink-600 rounded px-4 py-3 text-white font-body focus:outline-none focus:border-accent transition-colors"
                  placeholder={field.placeholder}
                />
              </div>
            ))}

            {error && (
              <div className="bg-red-900/30 border border-red-700 rounded px-4 py-3 text-red-400 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-accent-hover text-white font-body font-semibold py-3 rounded transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Admin Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
