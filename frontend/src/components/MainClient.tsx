'use client'

import { useEffect, useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { LoginScreen } from '@/components/auth/LoginScreen'
import { useAppStore } from '@/lib/store/uiStore'

export function MainClient() {
  const [mounted, setMounted] = useState(false)
  const isAuthenticated = useAppStore((state) => state.isAuthenticated)
  const login = useAppStore((state) => state.login)

  useEffect(() => {
    // Check for stored token on mount
    const token = localStorage.getItem('token')
    const userStr = localStorage.getItem('user')

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr)
        login(user.username)
      } catch (error) {
        // Invalid stored data, clear it
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }

    setMounted(true)
  }, [login])

  if (!mounted) {
    return null
  }

  return isAuthenticated ? <AppShell /> : <LoginScreen />
}
