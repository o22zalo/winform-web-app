'use client'

import CssBaseline from '@mui/material/CssBaseline'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { AppThemeProvider } from '@/components/theme/AppThemeProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  useEffect(() => {
    setMounted(true)

    if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) {
      return undefined
    }

    const registerServiceWorker = () => {
      navigator.serviceWorker.register('/sw.js').catch(() => undefined)
    }

    if (document.readyState === 'complete') {
      registerServiceWorker()
      return undefined
    }

    window.addEventListener('load', registerServiceWorker)
    return () => window.removeEventListener('load', registerServiceWorker)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <CssBaseline />
        {children}
      </AppThemeProvider>
    </QueryClientProvider>
  )
}
