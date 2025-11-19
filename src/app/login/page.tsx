"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await res.json()
      if (res.ok) {
        router.replace('/')
      } else {
        setError(data?.error || 'Login failed')
      }
    } catch (err: any) {
      setError(err?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0b1020' }}>
      <form onSubmit={handleSubmit} style={{ width: 360, background: '#121a36', padding: 24, borderRadius: 12, boxShadow: '0 8px 30px rgba(0,0,0,0.25)', color: '#e6e8f0' }}>
        <h1 style={{ marginBottom: 16, fontSize: 24 }}>Sign in to ThinkSpark</h1>
        <p style={{ marginBottom: 24, color: '#a9b1c6' }}>Enter your credentials to continue.</p>

        <label style={{ display: 'block', marginBottom: 8 }}>Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #2a355b', background: '#0f1630', color: '#e6e8f0', marginBottom: 12 }}
        />

        <label style={{ display: 'block', marginBottom: 8 }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #2a355b', background: '#0f1630', color: '#e6e8f0', marginBottom: 16 }}
        />

        {error && (
          <div style={{ background: '#3d1f2b', color: '#f2b5c9', padding: 10, borderRadius: 8, marginBottom: 12 }}>{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#5b7cfa', border: 'none', color: 'white', cursor: 'pointer' }}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
