// Zustand store for theme management

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ThemeMode = 'light' | 'dark'
type Density = 'comfortable' | 'compact' | 'spacious'

interface ThemeStore {
  mode: ThemeMode
  density: Density
  sidebarCollapsed: boolean
  toggleMode: () => void
  setDensity: (density: Density) => void
  toggleSidebar: () => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      mode: 'light',
      density: 'comfortable',
      sidebarCollapsed: false,

      toggleMode: () => set(state => ({
        mode: state.mode === 'light' ? 'dark' : 'light'
      })),

      setDensity: (density) => set({ density }),

      toggleSidebar: () => set(state => ({
        sidebarCollapsed: !state.sidebarCollapsed
      })),
    }),
    {
      name: 'theme-storage',
    }
  )
)
