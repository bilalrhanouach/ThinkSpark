"use client"

export function SignOutButton() {
  const handleSignOut = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' })
      window.location.href = '/login'
    } catch (e) {
      console.error('Failed to sign out', e)
    }
  }

  return (
    <button
      onClick={handleSignOut}
      title="Sign out"
      style={{
        position: 'fixed',
        top: 16,
        right: 16,
        padding: '10px 14px',
        borderRadius: 10,
        border: '1px solid #e5e7eb',
        background: '#111827',
        color: '#fff',
        fontWeight: 600,
        boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
        cursor: 'pointer',
        zIndex: 50
      }}
    >
      Sign out
    </button>
  )
}
