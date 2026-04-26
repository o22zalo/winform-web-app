'use client'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useEffect, useMemo, type ReactNode } from 'react'
import { APP_CONFIG } from '@/lib/config/appConfig'
import { useAppStore } from '@/lib/store/uiStore'

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const mode = useAppStore((state) => state.mode)

  useEffect(() => {
    const root = document.documentElement
    if (mode === 'dark') {
      // Dark mode colors
      root.style.setProperty('--app-primary', '#4a9eff')
      root.style.setProperty('--app-sidebar-bg', '#1e2936')
      root.style.setProperty('--app-accent', '#ffc107')
      root.style.setProperty('--app-bg', '#121820')
      root.style.setProperty('--app-panel', '#1e2936')
      root.style.setProperty('--app-grid-header', '#2d3748')
      root.style.setProperty('--app-border', '#374151')
      root.style.setProperty('--app-status', '#1e2936')
      document.body.style.backgroundColor = '#121820'
      document.body.style.color = '#e2e8f0'
    } else {
      // Light mode colors
      root.style.setProperty('--app-primary', APP_CONFIG.theme.primary)
      root.style.setProperty('--app-sidebar-bg', APP_CONFIG.theme.sidebar)
      root.style.setProperty('--app-accent', APP_CONFIG.theme.accent)
      root.style.setProperty('--app-bg', '#edf4fb')
      root.style.setProperty('--app-panel', '#ffffff')
      root.style.setProperty('--app-grid-header', '#dfe8f5')
      root.style.setProperty('--app-border', '#c5d0df')
      root.style.setProperty('--app-status', '#f6f8fb')
      document.body.style.backgroundColor = '#edf4fb'
      document.body.style.color = '#16314f'
    }
  }, [mode])

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'dark' ? '#4a9eff' : APP_CONFIG.theme.primary,
            contrastText: '#ffffff'
          },
          secondary: {
            main: mode === 'dark' ? '#ffc107' : APP_CONFIG.theme.accent,
            contrastText: mode === 'dark' ? '#000000' : '#ffffff'
          },
          background: {
            default: mode === 'dark' ? '#121820' : '#edf4fb',
            paper: mode === 'dark' ? '#1e2936' : '#ffffff',
          },
          text: {
            primary: mode === 'dark' ? '#e2e8f0' : '#16314f',
            secondary: mode === 'dark' ? '#94a3b8' : '#6a839a',
          },
          divider: mode === 'dark' ? '#374151' : '#c5d0df',
          error: {
            main: mode === 'dark' ? '#f87171' : '#dc2626',
          },
          success: {
            main: mode === 'dark' ? '#4ade80' : '#16a34a',
          },
        },
        shape: { borderRadius: 4 },
        typography: {
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: 13,
          allVariants: {
            color: mode === 'dark' ? '#e2e8f0' : '#16314f',
          },
        },
        components: {
          MuiButton: {
            defaultProps: {
              size: 'small',
              variant: 'outlined',
            },
            styleOverrides: {
              root: {
                textTransform: 'none',
                color: mode === 'dark' ? '#e2e8f0' : '#16314f',
                borderColor: mode === 'dark' ? '#374151' : '#c5d0df',
                '&:hover': {
                  borderColor: mode === 'dark' ? '#4a9eff' : '#1a6fc4',
                  backgroundColor: mode === 'dark' ? 'rgba(74, 158, 255, 0.08)' : 'rgba(26, 111, 196, 0.04)',
                },
              },
              contained: {
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: mode === 'dark' ? '#3b82f6' : '#1559a0',
                },
              },
            },
          },
          MuiTextField: {
            defaultProps: {
              size: 'small',
              fullWidth: true,
            },
            styleOverrides: {
              root: {
                '& .MuiInputBase-root': {
                  color: mode === 'dark' ? '#e2e8f0' : '#16314f',
                  backgroundColor: mode === 'dark' ? '#1e2936' : '#ffffff',
                },
                '& .MuiInputLabel-root': {
                  color: mode === 'dark' ? '#94a3b8' : '#6a839a',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: mode === 'dark' ? '#374151' : '#c5d0df',
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
                backgroundColor: mode === 'dark' ? '#1e2936' : '#ffffff',
                color: mode === 'dark' ? '#e2e8f0' : '#16314f',
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: mode === 'dark' ? '#1e2936' : '#f6f8fb',
                color: mode === 'dark' ? '#e2e8f0' : '#16314f',
              },
            },
          },
          MuiAccordion: {
            styleOverrides: {
              root: {
                backgroundColor: mode === 'dark' ? '#1e2936' : 'transparent',
                color: mode === 'dark' ? '#e2e8f0' : '#16314f',
              },
            },
          },
          MuiTab: {
            styleOverrides: {
              root: {
                color: mode === 'dark' ? '#94a3b8' : '#6a839a',
                '&.Mui-selected': {
                  color: mode === 'dark' ? '#4a9eff' : '#1a6fc4',
                },
              },
            },
          },
        },
      }),
    [mode],
  )

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
