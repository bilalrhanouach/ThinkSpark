'use client'

import { useCallback } from 'react'
import confetti from 'canvas-confetti'

export function useConfetti() {
  const celebrate = useCallback(() => {
    // Fire confetti from multiple directions
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
    })

    // Additional burst after a short delay
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#3b82f6', '#10b981', '#f59e0b']
      })
    }, 250)

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ef4444', '#8b5cf6', '#06b6d4']
      })
    }, 400)
  }, [])

  return { celebrate }
}